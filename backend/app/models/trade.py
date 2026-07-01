from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    DateTime
)

from app.core.database import Base


class Trade(Base):

    __tablename__ = "trades"

    id = Column(Integer, primary_key=True)

    symbol = Column(String)

    direction = Column(String)

    entry_price = Column(Float)

    stop_loss = Column(Float)

    take_profit = Column(Float)

    exit_price = Column(Float)

    lot_size = Column(Float)

    profit_money = Column(Float)

    profit_pips = Column(Float)

    risk_reward = Column(Float)

    duration_minutes = Column(Integer)

    is_win = Column(Integer)

    open_time = Column(DateTime)

    close_time = Column(DateTime)

    session_name = Column(String)

    trading_system_id = Column(Integer)

    psychology_state_id = Column(Integer)

    tradingview_link = Column(Text)

    screenshot_path = Column(Text)

    notes = Column(Text)