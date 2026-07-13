from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass(slots=True)
class DealData:
    ticket: int
    position_id: int
    symbol: str
    direction: str
    entry_type: str
    volume: float
    price: float
    profit: float
    commission: float
    swap: float
    fee: float
    time: datetime


@dataclass(slots=True)
class OrderData:
    ticket: int
    position_id: int
    stop_loss: Optional[float]
    take_profit: Optional[float]


@dataclass(slots=True)
class PositionData:
    position_id: int
    account_id: int
    symbol: str
    direction: str

    entry_deals: list[DealData] = field(default_factory=list)
    exit_deals: list[DealData] = field(default_factory=list)
    orders: list[OrderData] = field(default_factory=list)

    is_open: bool = False

    open_time: Optional[datetime] = None
    close_time: Optional[datetime] = None

    live_ticket: Optional[int] = None
    live_entry_price: Optional[float] = None
    live_volume: Optional[float] = None
    live_stop_loss: Optional[float] = None
    live_take_profit: Optional[float] = None
    live_profit: Optional[float] = None