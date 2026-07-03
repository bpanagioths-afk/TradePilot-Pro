from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal


class TradingPlanBase(BaseModel):

    user_id: Optional[int] = None

    name: str

    description: Optional[str] = None

    is_default: Optional[bool] = False

    risk_per_trade: Optional[Decimal] = None

    maximum_daily_loss: Optional[Decimal] = None

    maximum_weekly_loss: Optional[Decimal] = None

    minimum_rr: Optional[Decimal] = None

    maximum_trades_day: Optional[int] = None

    maximum_trades_week: Optional[int] = None

    allow_forex: Optional[bool] = True

    allow_metals: Optional[bool] = True

    allow_crypto: Optional[bool] = False

    allow_indices: Optional[bool] = False

    session_asia: Optional[bool] = False

    session_london: Optional[bool] = True

    session_newyork: Optional[bool] = True

    session_overlap: Optional[bool] = True

    avoid_news_before: Optional[bool] = True

    avoid_news_after: Optional[bool] = True

    constitution: Optional[str] = None


class TradingPlanCreate(TradingPlanBase):
    pass


class TradingPlanUpdate(TradingPlanBase):
    pass


class TradingPlanResponse(TradingPlanBase):

    id: int

    created_at: Optional[datetime] = None

    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True