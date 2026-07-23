from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AdminUserListItem(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: int

    username: str

    email: str

    is_admin: bool

    created_at: datetime | None = None

    mt5_accounts_count: int

    trades_count: int