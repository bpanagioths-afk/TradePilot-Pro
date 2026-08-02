from datetime import datetime
from decimal import Decimal
from typing import Any, Literal
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
)


ALLOWED_TIME_FORMATS = {
    "12h",
    "24h",
}

ALLOWED_DATE_FORMATS = {
    "DD/MM/YYYY",
    "MM/DD/YYYY",
    "YYYY-MM-DD",
}

BACKUP_SCHEMA_VERSION = "1.0"


class UserSettingsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    timezone: str
    time_format: str
    date_format: str


class UserSettingsUpdateRequest(BaseModel):
    timezone: str = Field(
        min_length=1,
        max_length=100,
    )
    time_format: str
    date_format: str

    @field_validator("timezone")
    @classmethod
    def validate_timezone(
        cls,
        value: str,
    ) -> str:
        cleaned_value = value.strip()

        try:
            ZoneInfo(cleaned_value)
        except ZoneInfoNotFoundError as exc:
            raise ValueError(
                "Invalid IANA timezone"
            ) from exc

        return cleaned_value

    @field_validator("time_format")
    @classmethod
    def validate_time_format(
        cls,
        value: str,
    ) -> str:
        cleaned_value = value.strip()

        if cleaned_value not in ALLOWED_TIME_FORMATS:
            raise ValueError(
                "Time format must be 12h or 24h"
            )

        return cleaned_value

    @field_validator("date_format")
    @classmethod
    def validate_date_format(
        cls,
        value: str,
    ) -> str:
        cleaned_value = value.strip()

        if cleaned_value not in ALLOWED_DATE_FORMATS:
            raise ValueError(
                "Unsupported date format"
            )

        return cleaned_value


class BackupMetadata(BaseModel):
    schema_version: Literal["1.0"] = (
        BACKUP_SCHEMA_VERSION
    )
    application: Literal["TradePilot Pro"] = (
        "TradePilot Pro"
    )
    exported_at: datetime
    export_type: Literal["user_backup"] = (
        "user_backup"
    )


class BackupAccountSettings(BaseModel):
    username: str
    email: str
    trader_name: str | None = None
    base_currency: str
    theme_mode: str
    timezone: str
    time_format: str
    date_format: str


class BackupTrade(BaseModel):
    symbol: str | None = None
    direction: str | None = None

    entry_price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    exit_price: float | None = None
    lot_size: float | None = None

    profit_money: float | None = None
    profit_pips: float | None = None
    movement_value: float | None = None
    movement_unit: str | None = None
    asset_class: str | None = None

    symbol_digits: int | None = None
    symbol_point: float | None = None
    tick_size: float | None = None

    risk_reward: float | None = None
    duration_minutes: int | None = None
    is_win: int | None = None

    open_time: datetime | None = None
    close_time: datetime | None = None
    session_name: str | None = None

    trading_system_id: int | None = None
    psychology_state_id: int | None = None

    tradingview_link: str | None = None
    notes: str | None = None

    mt5_ticket: int | None = None
    mt5_position_id: int | None = None
    imported_from_mt5: bool = False
    is_archived: bool = False


class BackupTradingPlan(BaseModel):
    name: str
    description: str | None = None
    is_default: bool = False

    risk_per_trade: Decimal | None = None
    maximum_daily_loss: Decimal | None = None
    maximum_weekly_loss: Decimal | None = None
    minimum_rr: Decimal | None = None

    maximum_trades_day: int | None = None
    maximum_trades_week: int | None = None

    allow_forex: bool = True
    allow_metals: bool = True
    allow_crypto: bool = False
    allow_indices: bool = False

    session_asia: bool = False
    session_london: bool = True
    session_newyork: bool = True
    session_overlap: bool = True

    avoid_news_before: bool = True
    avoid_news_after: bool = True

    constitution: str | None = None


class BackupExportResponse(BaseModel):
    metadata: BackupMetadata
    account_settings: BackupAccountSettings
    trades: list[BackupTrade]
    trading_plans: list[BackupTradingPlan]

    excluded_data: list[str] = Field(
        default_factory=lambda: [
            "password_hash",
            "authentication_tokens",
            "administrator_permissions",
            "account_activation_state",
            "database_primary_keys",
            "database_user_ids",
            "mt5_account_connections",
            "uploaded_screenshot_files",
            "trading_plan_history",
        ]
    )

    deferred_sections: dict[str, Any] = Field(
        default_factory=lambda: {
            "mt5_accounts": (
                "Deferred until a documented "
                "sensitive-data policy exists."
            ),
            "psychology_definitions": (
                "No portable user-owned model "
                "has been confirmed."
            ),
            "trading_system_definitions": (
                "No portable user-owned model "
                "has been confirmed."
            ),
            "market_alerts": (
                "Deferred until ownership and "
                "backup eligibility are audited."
            ),
            "import": (
                "Import policy has not yet "
                "been approved."
            ),
        }
    )


class BackupImportRequest(BaseModel):
    mode: Literal["merge", "replace"]
    backup: BackupExportResponse


class BackupImportSectionPreview(BaseModel):
    backup_count: int
    existing_count: int
    insert_count: int
    duplicate_count: int
    conflict_count: int = 0


class BackupImportPreviewResponse(BaseModel):
    valid: bool
    schema_version: str
    mode: Literal["merge", "replace"]

    account_matches: bool

    trades: BackupImportSectionPreview
    trading_plans: BackupImportSectionPreview

    warnings: list[str] = Field(
        default_factory=list
    )

    destructive_confirmation_required: bool


class BackupImportSectionResult(BaseModel):
    inserted_count: int = 0
    updated_count: int = 0
    skipped_count: int = 0
    conflict_count: int = 0


class BackupImportResultResponse(BaseModel):
    success: bool
    mode: Literal["merge"]
    schema_version: str

    account_settings: BackupImportSectionResult
    trades: BackupImportSectionResult
    trading_plans: BackupImportSectionResult

    warnings: list[str] = Field(
        default_factory=list
    )
