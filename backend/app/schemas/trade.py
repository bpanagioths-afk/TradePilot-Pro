from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TradeCreate(BaseModel):

    symbol: str

    direction: str

    entry_price: float

    stop_loss: Optional[float] = None

    take_profit: Optional[float] = None

    exit_price: Optional[float] = None

    lot_size: Optional[float] = None

    profit_money: Optional[float] = None

    open_time: Optional[datetime] = None

    close_time: Optional[datetime] = None

    trading_system_id: Optional[int] = None

    psychology_state_id: Optional[int] = None

    tradingview_link: Optional[str] = None

    screenshot_path: Optional[str] = None

    session_name: Optional[str] = None

    notes: Optional[str] = None


class TradeResponse(BaseModel):

    id: int

    symbol: str

    direction: str

    entry_price: float

    stop_loss: Optional[float] = None

    take_profit: Optional[float] = None

    exit_price: Optional[float] = None

    lot_size: Optional[float] = None

    profit_money: Optional[float] = None

    profit_pips: Optional[float] = None

    movement_value: Optional[float] = None

    movement_unit: Optional[str] = None

    asset_class: Optional[str] = None

    symbol_digits: Optional[int] = None

    symbol_point: Optional[float] = None

    tick_size: Optional[float] = None

    risk_reward: Optional[float] = None

    duration_minutes: Optional[int] = None

    is_win: Optional[int] = None

    open_time: Optional[datetime] = None

    close_time: Optional[datetime] = None

    trading_system_id: Optional[int] = None

    psychology_state_id: Optional[int] = None

    tradingview_link: Optional[str] = None

    screenshot_path: Optional[str] = None

    session_name: Optional[str] = None

    notes: Optional[str] = None

    class Config:
        from_attributes = True