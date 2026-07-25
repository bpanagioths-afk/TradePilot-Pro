from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.deps import get_current_admin, get_db
from app.features.admin.schemas import (
    AdminResetPasswordRequest,
    AdminUserCreateRequest,
    AdminUserListItem,
    AdminUserResponse,
    AdminUserUpdateRequest,
)
from app.features.admin.service import (
    create_admin_user,
    delete_admin_user,
    list_users,
    reset_admin_user_password,
    update_admin_user,
)
from app.models.user import User


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get(
    "/users",
    response_model=list[AdminUserListItem],
)
def get_admin_users(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return list_users(db)


@router.post(
    "/users",
    response_model=AdminUserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user_endpoint(
    user_data: AdminUserCreateRequest,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return create_admin_user(
        db=db,
        user_data=user_data,
    )


@router.put(
    "/users/{user_id}",
    response_model=AdminUserResponse,
)
def update_user_endpoint(
    user_id: int,
    user_data: AdminUserUpdateRequest,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return update_admin_user(
        db=db,
        user_id=user_id,
        user_data=user_data,
        current_admin=current_admin,
    )


@router.post(
    "/users/{user_id}/reset-password",
    response_model=AdminUserResponse,
)
def reset_user_password_endpoint(
    user_id: int,
    password_data: AdminResetPasswordRequest,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return reset_admin_user_password(
        db=db,
        user_id=user_id,
        password_data=password_data,
    )


@router.delete(
    "/users/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user_endpoint(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    delete_admin_user(
        db=db,
        user_id=user_id,
        current_admin=current_admin,
    )

    return Response(
        status_code=status.HTTP_204_NO_CONTENT
    )
