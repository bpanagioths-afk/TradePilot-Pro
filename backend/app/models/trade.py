from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)

from app.core.database import Base


class Trade(Base):

    __tablename__ = "trades"

    id = Column(
        Integer,
        primary_key=True,
    )

    symbol = Column(String)

    direction = Column(String)

    entry_price = Column(Float)

    stop_loss = Column(Float)

    take_profit = Column(Float)

    exit_price = Column(Float)

    lot_size = Column(Float)

    profit_money = Column(Float)

    profit_pips = Column(Float)

    movement_value = Column(
        Float,
        nullable=True,
    )

    movement_unit = Column(
        String,
        nullable=True,
    )

    asset_class = Column(
        String,
        nullable=True,
    )

    symbol_digits = Column(
        Integer,
        nullable=True,
    )

    symbol_point = Column(
        Float,
        nullable=True,
    )

    tick_size = Column(
        Float,
        nullable=True,
    )

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

    mt5_account_id = Column(
        Integer,
        ForeignKey("mt5_accounts.id"),
        nullable=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    mt5_ticket = Column(
        BigInteger,
        nullable=True,
    )

    mt5_position_id = Column(
        BigInteger,
        nullable=True,
        index=True,
    )

    imported_from_mt5 = Column(
        Boolean,
        default=False,
    )

    is_archived = Column(
        Boolean,
        default=False,
    )