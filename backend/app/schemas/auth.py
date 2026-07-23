from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=100)
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=8, max_length=128)

    @field_validator("username", "email")
    @classmethod
    def strip_text(cls, value: str) -> str:
        cleaned_value = value.strip()
        if not cleaned_value:
            raise ValueError("Value must not be empty")
        return cleaned_value

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized_email = value.lower()
        if normalized_email.count("@") != 1:
            raise ValueError("Invalid email address")
        local_part, domain_part = normalized_email.split("@")
        if not local_part or "." not in domain_part:
            raise ValueError("Invalid email address")
        return normalized_email


class LoginRequest(BaseModel):
    username_or_email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=1, max_length=128)

    @field_validator("username_or_email")
    @classmethod
    def strip_identity(cls, value: str) -> str:
        cleaned_value = value.strip()
        if not cleaned_value:
            raise ValueError("Username or email must not be empty")
        return cleaned_value


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    is_admin: bool = False
    created_at: datetime | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse


class LogoutResponse(BaseModel):
    message: str


class ForgotUsernameRequest(BaseModel):
    email: str = Field(min_length=5, max_length=255)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized_email = value.strip().lower()
        if normalized_email.count("@") != 1:
            raise ValueError("Invalid email address")
        local_part, domain_part = normalized_email.split("@")
        if not local_part or "." not in domain_part:
            raise ValueError("Invalid email address")
        return normalized_email


class ForgotUsernameResponse(BaseModel):
    message: str


class ForgotPasswordRequest(BaseModel):
    username_or_email: str = Field(min_length=3, max_length=255)

    @field_validator("username_or_email")
    @classmethod
    def strip_identity(cls, value: str) -> str:
        cleaned_value = value.strip()
        if not cleaned_value:
            raise ValueError("Username or email must not be empty")
        return cleaned_value


class ForgotPasswordResponse(BaseModel):
    message: str


class ResetPasswordRequest(BaseModel):
    token: str = Field(min_length=20)
    new_password: str = Field(min_length=8, max_length=128)


class ResetPasswordResponse(BaseModel):
    message: str


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(min_length=1, max_length=128)
    new_password: str = Field(min_length=8, max_length=128)


class ChangePasswordResponse(BaseModel):
    message: str
