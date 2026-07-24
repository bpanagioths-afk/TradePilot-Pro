from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class AdminUserListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    is_admin: bool
    is_active: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None
    last_login_at: datetime | None = None
    mt5_accounts_count: int
    trades_count: int


class AdminUserCreateRequest(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=100,
    )
    email: str = Field(
        min_length=5,
        max_length=255,
    )
    password: str = Field(
        min_length=8,
        max_length=72,
    )
    is_admin: bool = False
    is_active: bool = True

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        normalized_value = value.strip()

        if not normalized_value:
            raise ValueError("Username cannot be empty")

        return normalized_value

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized_value = value.strip().lower()

        if (
            "@" not in normalized_value
            or normalized_value.startswith("@")
            or normalized_value.endswith("@")
            or "." not in normalized_value.split("@")[-1]
        ):
            raise ValueError("Invalid email address")

        return normalized_value


class AdminUserUpdateRequest(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=100,
    )
    email: str = Field(
        min_length=5,
        max_length=255,
    )
    is_admin: bool
    is_active: bool

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        normalized_value = value.strip()

        if not normalized_value:
            raise ValueError("Username cannot be empty")

        return normalized_value

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized_value = value.strip().lower()

        if (
            "@" not in normalized_value
            or normalized_value.startswith("@")
            or normalized_value.endswith("@")
            or "." not in normalized_value.split("@")[-1]
        ):
            raise ValueError("Invalid email address")

        return normalized_value


class AdminResetPasswordRequest(BaseModel):
    password: str = Field(
        min_length=8,
        max_length=72,
    )


class AdminUserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    is_admin: bool
    is_active: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None
    last_login_at: datetime | None = None