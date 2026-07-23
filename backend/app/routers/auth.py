from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db
from app.core.security import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    create_password_reset_token,
    decode_password_reset_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.auth import (
    ChangePasswordRequest,
    ChangePasswordResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ForgotUsernameRequest,
    ForgotUsernameResponse,
    LoginRequest,
    LogoutResponse,
    RegisterRequest,
    ResetPasswordRequest,
    ResetPasswordResponse,
    TokenResponse,
    UserResponse,
)
from app.services.email_service import (
    send_password_reset_email,
    send_username_recovery_email,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(registration_data: RegisterRequest, db: Session = Depends(get_db)):
    normalized_username = registration_data.username.strip()
    normalized_email = registration_data.email.lower()

    existing_user = db.query(User).filter(
        or_(
            func.lower(User.username) == normalized_username.lower(),
            func.lower(User.email) == normalized_email,
        )
    ).first()

    if existing_user is not None:
        raise HTTPException(status_code=409, detail="Username or email is already registered")

    try:
        password_hash = hash_password(registration_data.password)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    user = User(
        username=normalized_username,
        email=normalized_email,
        password_hash=password_hash,
    )
    db.add(user)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Username or email is already registered") from exc

    db.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
def login_user(login_data: LoginRequest, db: Session = Depends(get_db)):
    identity = login_data.username_or_email.strip().lower()
    user = db.query(User).filter(
        or_(
            func.lower(User.username) == identity,
            func.lower(User.email) == identity,
        )
    ).first()

    if user is None or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(user.id)
    return TokenResponse(
        access_token=access_token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=UserResponse.model_validate(user),
    )


@router.post("/forgot-username", response_model=ForgotUsernameResponse)
def forgot_username(request_data: ForgotUsernameRequest, db: Session = Depends(get_db)):
    normalized_email = request_data.email.strip().lower()
    user = db.query(User).filter(func.lower(User.email) == normalized_email).first()

    generic_message = (
        "If an account matches the provided email, "
        "a username recovery email has been sent."
    )

    if user is None:
        return ForgotUsernameResponse(message=generic_message)

    try:
        send_username_recovery_email(
            recipient_email=user.email,
            username=user.username,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Username recovery email could not be sent",
        ) from exc

    return ForgotUsernameResponse(message=generic_message)


@router.post("/forgot-password", response_model=ForgotPasswordResponse)
def forgot_password(request_data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    identity = request_data.username_or_email.strip().lower()
    user = db.query(User).filter(
        or_(
            func.lower(User.username) == identity,
            func.lower(User.email) == identity,
        )
    ).first()

    generic_message = (
        "If an account matches the provided information, "
        "a password reset email has been sent."
    )

    if user is None:
        return ForgotPasswordResponse(message=generic_message)

    reset_token = create_password_reset_token(user.id)

    try:
        send_password_reset_email(user.email, reset_token)
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Password reset email could not be sent") from exc

    return ForgotPasswordResponse(message=generic_message)


@router.post("/reset-password", response_model=ResetPasswordResponse)
def reset_password(request_data: ResetPasswordRequest, db: Session = Depends(get_db)):
    try:
        user_id = decode_password_reset_token(request_data.token)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        user.password_hash = hash_password(request_data.new_password)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    db.commit()
    return ResetPasswordResponse(message="Password updated successfully")


@router.post("/change-password", response_model=ChangePasswordResponse)
def change_password(
    request_data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not verify_password(request_data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    if verify_password(request_data.new_password, current_user.password_hash):
        raise HTTPException(
            status_code=400,
            detail="New password must be different from the current password",
        )

    try:
        current_user.password_hash = hash_password(request_data.new_password)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    db.add(current_user)
    db.commit()
    return ChangePasswordResponse(message="Password changed successfully")


@router.get("/me", response_model=UserResponse)
def get_authenticated_user(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/logout", response_model=LogoutResponse)
def logout_user(current_user: User = Depends(get_current_user)):
    return LogoutResponse(
        message="Logout confirmed. Remove the access token from the client session."
    )
