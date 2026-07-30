from datetime import datetime

from pydantic import BaseModel, Field


class MarketAlertEventResponse(BaseModel):
    id: str
    date: datetime
    country: str
    currency: str
    category: str
    event: str
    importance: int = Field(ge=1, le=3)
    impact: str
    actual: str | None = None
    forecast: str | None = None
    previous: str | None = None
    reference: str | None = None
    source: str | None = None


class MarketAlertsResponse(BaseModel):
    timezone: str
    time_format: str
    date_format: str
    from_date: str
    to_date: str
    total: int
    currencies: list[str]
    categories: list[str]
    events: list[MarketAlertEventResponse]
