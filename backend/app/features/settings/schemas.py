from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from pydantic import BaseModel, ConfigDict, Field, field_validator


ALLOWED_TIME_FORMATS = {
    "12h",
    "24h",
}

ALLOWED_DATE_FORMATS = {
    "DD/MM/YYYY",
    "MM/DD/YYYY",
    "YYYY-MM-DD",
}


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