from datetime import datetime

from pydantic import BaseModel


class MT5AccountCreate(BaseModel):

    user_id: int

    account_name: str

    broker: str

    login: str

    server: str


class MT5AccountUpdate(BaseModel):

    account_name: str | None = None

    broker: str | None = None

    login: str | None = None

    server: str | None = None

    is_active: bool | None = None

    auto_sync: bool | None = None

    sync_interval_minutes: int | None = None


class MT5AccountResponse(BaseModel):

    id: int

    user_id: int

    account_name: str

    broker: str

    login: str

    server: str

    is_active: bool

    auto_sync: bool

    sync_interval_minutes: int

    last_sync: datetime | None = None

    class Config:

        from_attributes = True

from typing import Optional




class MT5AccountSummary(BaseModel):
    account_id: int
    account_name: str
    broker: Optional[str] = None
    login: Optional[str] = None
    server: Optional[str] = None

    is_active: bool
    auto_sync: bool
    sync_interval_minutes: int

    balance: Optional[float] = None
    equity: Optional[float] = None
    floating_profit_loss: Optional[float] = None
    open_positions: int = 0

    imported_trades_count: int = 0
    last_sync: Optional[datetime] = None
    connection_status: str = "unknown"
    health_message: str = "MT5 live summary is not connected yet."
