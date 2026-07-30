from sqlalchemy.orm import Session

from app.features.settings.schemas import UserSettingsUpdateRequest
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