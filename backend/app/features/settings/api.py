from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db
from app.features.settings.schemas import (
    BackupExportResponse,
    BackupImportPreviewResponse,
    BackupImportRequest,
    BackupImportResultResponse,
    UserSettingsResponse,
    UserSettingsUpdateRequest,
)
from app.features.settings.service import (
    build_user_backup,
    get_user_settings,
    import_user_backup,
    preview_user_backup_import,
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


@router.get(
    "/backup",
    response_model=BackupExportResponse,
)
def export_user_backup_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return build_user_backup(
        db=db,
        current_user=current_user,
    )


@router.post(
    "/backup/preview",
    response_model=BackupImportPreviewResponse,
)
def preview_user_backup_import_endpoint(
    import_request: BackupImportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return preview_user_backup_import(
        db=db,
        current_user=current_user,
        import_request=import_request,
    )


@router.post(
    "/backup/import",
    response_model=BackupImportResultResponse,
)
def import_user_backup_endpoint(
    import_request: BackupImportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return import_user_backup(
        db=db,
        current_user=current_user,
        import_request=import_request,
    )
