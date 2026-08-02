from sqlalchemy.orm import Session

from app.features.settings.schemas import (
    BackupExportResponse,
    BackupImportSectionPreview,
    BackupImportSectionResult,
)
from app.models.trading_plan import TradingPlan
from app.models.user import User


def _normalize_text(
    value: str | None,
) -> str:
    return str(value or "").strip().casefold()


class TradingPlansImporter:
    section_name = "trading_plans"

    def preview(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionPreview:
        existing_plans = (
            db.query(TradingPlan)
            .filter(
                TradingPlan.user_id
                == current_user.id
            )
            .all()
        )

        existing_names = {
            _normalize_text(plan.name)
            for plan in existing_plans
        }

        duplicate_count = 0
        conflict_count = 0
        seen_backup_names = set()

        for backup_plan in backup.trading_plans:
            normalized_name = _normalize_text(
                backup_plan.name
            )

            if not normalized_name:
                conflict_count += 1
                continue

            if normalized_name in seen_backup_names:
                conflict_count += 1
                continue

            seen_backup_names.add(
                normalized_name
            )

            if normalized_name in existing_names:
                duplicate_count += 1

        insert_count = (
            len(backup.trading_plans)
            - duplicate_count
            - conflict_count
        )

        return BackupImportSectionPreview(
            backup_count=len(
                backup.trading_plans
            ),
            existing_count=len(
                existing_plans
            ),
            insert_count=max(
                insert_count,
                0,
            ),
            duplicate_count=duplicate_count,
            conflict_count=conflict_count,
        )

    def import_data(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionResult:
        existing_plans = (
            db.query(TradingPlan)
            .filter(
                TradingPlan.user_id
                == current_user.id
            )
            .all()
        )

        existing_by_name = {
            _normalize_text(plan.name): plan
            for plan in existing_plans
        }

        inserted_count = 0
        updated_count = 0
        skipped_count = 0
        conflict_count = 0
        seen_backup_names = set()

        default_plan_name = None

        for backup_plan in backup.trading_plans:
            normalized_name = _normalize_text(
                backup_plan.name
            )

            if not normalized_name:
                conflict_count += 1
                continue

            if normalized_name in seen_backup_names:
                conflict_count += 1
                continue

            seen_backup_names.add(
                normalized_name
            )

            if (
                backup_plan.is_default
                and default_plan_name is None
            ):
                default_plan_name = normalized_name

            payload = backup_plan.model_dump()
            payload["is_default"] = False

            existing_plan = existing_by_name.get(
                normalized_name
            )

            if existing_plan is None:
                new_plan = TradingPlan(
                    user_id=current_user.id,
                    **payload,
                )
                db.add(new_plan)
                inserted_count += 1
                continue

            changed = False

            for field, value in payload.items():
                if getattr(
                    existing_plan,
                    field
                ) != value:
                    setattr(
                        existing_plan,
                        field,
                        value,
                    )
                    changed = True

            if changed:
                updated_count += 1
            else:
                skipped_count += 1

        if default_plan_name is not None:
            for existing_plan in existing_plans:
                existing_plan.is_default = (
                    _normalize_text(
                        existing_plan.name
                    )
                    == default_plan_name
                )

        return BackupImportSectionResult(
            inserted_count=inserted_count,
            updated_count=updated_count,
            skipped_count=skipped_count,
            conflict_count=conflict_count,
        )
