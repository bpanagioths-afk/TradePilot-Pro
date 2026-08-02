from sqlalchemy.orm import Session

from app.features.settings.backup.import_engine import (
    BackupImportEngine,
)
from app.features.settings.importers import (
    DEFAULT_BACKUP_IMPORTERS,
)
from app.features.settings.schemas import (
    BackupImportPreviewResponse,
    BackupImportRequest,
)
from app.models.user import User


def _normalize_text(
    value: str | None,
) -> str:
    return str(value or "").strip().casefold()


def preview_user_backup_import(
    db: Session,
    current_user: User,
    import_request: BackupImportRequest,
) -> BackupImportPreviewResponse:
    backup = import_request.backup

    engine = BackupImportEngine(
        DEFAULT_BACKUP_IMPORTERS
    )

    section_previews = engine.preview(
        db=db,
        current_user=current_user,
        backup=backup,
    )

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

    warnings = []

    if not account_matches:
        warnings.append(
            "Το backup δημιουργήθηκε από διαφορετικό "
            "username ή email. Τα δεδομένα θα ανήκουν "
            "πάντα στον ενεργό λογαριασμό."
        )

    trading_plan_preview = (
        section_previews[
            "trading_plans"
        ]
    )

    if (
        trading_plan_preview.conflict_count
        > 0
    ):
        warnings.append(
            "Υπάρχουν Trading Plans χωρίς έγκυρο "
            "μοναδικό όνομα."
        )

    if import_request.mode == "replace":
        warnings.append(
            "Το Replace είναι καταστροφική λειτουργία "
            "και δεν έχει ακόμη ενεργοποιηθεί."
        )

    return BackupImportPreviewResponse(
        valid=True,
        schema_version=(
            backup.metadata.schema_version
        ),
        mode=import_request.mode,
        account_matches=account_matches,
        trades=section_previews[
            "trades"
        ],
        trading_plans=(
            trading_plan_preview
        ),
        warnings=warnings,
        destructive_confirmation_required=(
            import_request.mode
            == "replace"
        ),
    )
