from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db
from app.features.settings.schemas import (
    UserSettingsResponse,
    UserSettingsUpdateRequest,
)
from app.features.settings.service import (
    get_user_settings,
    update_user_settings,
)
from app.models.user import User


router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


@router.get(
    "",
    response_model=UserSettingsResponse,
)
def get_settings_endpoint(
    current_user: User = Depends(get_current_user),
):
    return get_user_settings(current_user)


@router.put(
    "",
    response_model=UserSettingsResponse,
)
def update_settings_endpoint(
    settings_data: UserSettingsUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_user_settings(
        db=db,
        current_user=current_user,
        settings_data=settings_data,
    )