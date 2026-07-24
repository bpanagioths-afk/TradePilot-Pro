from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.features.admin.repository import (
    create_user,
    get_user_by_id,
    get_user_by_username_or_email,
    get_users_with_statistics,
    save_user,
)
from app.features.admin.schemas import (
    AdminResetPasswordRequest,
    AdminUserCreateRequest,
    AdminUserListItem,
    AdminUserUpdateRequest,
)
from app.models.user import User


def list_users(
    db: Session,
) -> list[AdminUserListItem]:
    users = get_users_with_statistics(db)

    return [
        AdminUserListItem(
            id=user.id,
            username=user.username,
            email=user.email,
            is_admin=user.is_admin,
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at,
            last_login_at=user.last_login_at,
            mt5_accounts_count=user.mt5_accounts_count,
            trades_count=user.trades_count,
        )
        for user in users
    ]


def create_admin_user(
    db: Session,
    user_data: AdminUserCreateRequest,
) -> User:
    normalized_username = user_data.username.strip()
    normalized_email = user_data.email.strip().lower()

    existing_user = get_user_by_username_or_email(
        db=db,
        username=normalized_username,
        email=normalized_email,
    )

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username or email is already registered",
        )

    try:
        password_hash = hash_password(
            user_data.password
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        ) from exc

    user = User(
        username=normalized_username,
        email=normalized_email,
        password_hash=password_hash,
        is_admin=user_data.is_admin,
        is_active=user_data.is_active,
    )

    try:
        return create_user(
            db=db,
            user=user,
        )
    except IntegrityError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username or email is already registered",
        ) from exc


def update_admin_user(
    db: Session,
    user_id: int,
    user_data: AdminUserUpdateRequest,
    current_admin: User,
) -> User:
    user = get_user_by_id(
        db=db,
        user_id=user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if user.id == current_admin.id:
        if not user_data.is_admin:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You cannot remove your own admin access",
            )

        if not user_data.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You cannot deactivate your own account",
            )

    normalized_username = user_data.username.strip()
    normalized_email = user_data.email.strip().lower()

    existing_user = get_user_by_username_or_email(
        db=db,
        username=normalized_username,
        email=normalized_email,
        exclude_user_id=user.id,
    )

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username or email is already registered",
        )

    user.username = normalized_username
    user.email = normalized_email
    user.is_admin = user_data.is_admin
    user.is_active = user_data.is_active

    try:
        return save_user(
            db=db,
            user=user,
        )
    except IntegrityError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username or email is already registered",
        ) from exc


def reset_admin_user_password(
    db: Session,
    user_id: int,
    password_data: AdminResetPasswordRequest,
) -> User:
    user = get_user_by_id(
        db=db,
        user_id=user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    try:
        user.password_hash = hash_password(
            password_data.password
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        ) from exc

    return save_user(
        db=db,
        user=user,
    )