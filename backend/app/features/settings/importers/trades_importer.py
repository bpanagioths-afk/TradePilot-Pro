from sqlalchemy.orm import Session

from app.features.settings.backup.trade_identity import (
    backup_trade_exists,
)
from app.features.settings.schemas import (
    BackupExportResponse,
    BackupImportSectionPreview,
    BackupImportSectionResult,
)
from app.models.trade import Trade
from app.models.user import User


class TradesImporter:
    section_name = "trades"

    def preview(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionPreview:
        existing_count = (
            db.query(Trade)
            .filter(
                Trade.user_id == current_user.id
            )
            .count()
        )

        duplicate_count = 0

        for backup_trade in backup.trades:
            if backup_trade_exists(
                db,
                user_id=current_user.id,
                backup_trade=backup_trade,
            ):
                duplicate_count += 1

        return BackupImportSectionPreview(
            backup_count=len(
                backup.trades
            ),
            existing_count=existing_count,
            insert_count=(
                len(backup.trades)
                - duplicate_count
            ),
            duplicate_count=duplicate_count,
            conflict_count=0,
        )

    def import_data(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionResult:
        inserted_count = 0
        skipped_count = 0

        for backup_trade in backup.trades:
            if backup_trade_exists(
                db,
                user_id=current_user.id,
                backup_trade=backup_trade,
            ):
                skipped_count += 1
                continue

            payload = backup_trade.model_dump()

            trade = Trade(
                user_id=current_user.id,
                **payload,
            )

            db.add(trade)
            inserted_count += 1

        return BackupImportSectionResult(
            inserted_count=inserted_count,
            skipped_count=skipped_count,
        )
