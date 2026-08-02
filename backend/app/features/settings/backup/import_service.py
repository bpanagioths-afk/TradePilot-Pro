from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.features.settings.backup.import_engine import (
    BackupImportEngine,
)
from app.features.settings.importers import (
    DEFAULT_BACKUP_IMPORTERS,
)
from app.features.settings.schemas import (
    BackupImportRequest,
    BackupImportResultResponse,
)
from app.models.user import User


def import_user_backup(
    db: Session,
    current_user: User,
    import_request: BackupImportRequest,
) -> BackupImportResultResponse:
    if import_request.mode != "merge":
        raise HTTPException(
            status_code=400,
            detail=(
                "Only merge import is currently supported."
            ),
        )

    backup = import_request.backup

    engine = BackupImportEngine(
        DEFAULT_BACKUP_IMPORTERS
    )

    section_results = engine.import_merge(
        db=db,
        current_user=current_user,
        backup=backup,
    )

    warnings = []

    account_settings_result = section_results[
        "account_settings"
    ]
    trades_result = section_results[
        "trades"
    ]
    trading_plans_result = section_results[
        "trading_plans"
    ]

    if trading_plans_result.conflict_count > 0:
        warnings.append(
            "Some Trading Plans were skipped because "
            "their names were empty or duplicated."
        )

    return BackupImportResultResponse(
        success=True,
        mode="merge",
        schema_version=(
            backup.metadata.schema_version
        ),
        account_settings=(
            account_settings_result
        ),
        trades=trades_result,
        trading_plans=(
            trading_plans_result
        ),
        warnings=warnings,
    )
