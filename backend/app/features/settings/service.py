from sqlalchemy.orm import Session

from app.features.settings.backup.export_service import (
    build_user_backup,
)
from app.features.settings.backup.import_service import (
    import_user_backup,
)
from app.features.settings.backup.preview_service import (
    preview_user_backup_import,
)
from app.features.settings.schemas import (
    UserSettingsUpdateRequest,
)
from app.models.user import User


def get_user_settings(
    current_user: User,
) -> User:
    return current_user


def update_user_settings(
    db: Session,
    current_user: User,
    settings_data: UserSettingsUpdateRequest,
) -> User:
    current_user.timezone = settings_data.timezone
    current_user.time_format = settings_data.time_format
    current_user.date_format = settings_data.date_format

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    db.refresh(current_user)

    return current_user


__all__ = [
    "build_user_backup",
    "get_user_settings",
    "import_user_backup",
    "preview_user_backup_import",
    "update_user_settings",
]
