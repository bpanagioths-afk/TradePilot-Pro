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