from sqlalchemy.orm import Session

from app.features.settings.schemas import (
    BackupExportResponse,
    BackupImportSectionPreview,
    BackupImportSectionResult,
)
from app.models.user import User


def _normalize_text(
    value: str | None,
) -> str:
    return str(value or "").strip().casefold()


class AccountSettingsImporter:
    section_name = "account_settings"

    def preview(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionPreview:
        del db

        account_matches = (
            _normalize_text(
                backup.account_settings.username
            )
            == _normalize_text(
                current_user.username
            )
            and _normalize_text(
                backup.account_settings.email
            )
            == _normalize_text(
                current_user.email
            )
        )

        return BackupImportSectionPreview(
            backup_count=1,
            existing_count=1,
            insert_count=0,
            duplicate_count=(
                1 if account_matches else 0
            ),
            conflict_count=(
                0 if account_matches else 1
            ),
        )

    def import_data(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionResult:
        del db

        settings = backup.account_settings

        current_user.trader_name = (
            settings.trader_name
        )
        current_user.base_currency = (
            settings.base_currency
        )
        current_user.theme_mode = (
            settings.theme_mode
        )
        current_user.timezone = (
            settings.timezone
        )
        current_user.time_format = (
            settings.time_format
        )
        current_user.date_format = (
            settings.date_format
        )

        return BackupImportSectionResult(
            updated_count=1,
        )
