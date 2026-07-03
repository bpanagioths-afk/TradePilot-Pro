from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    Numeric,
    DateTime,
    ForeignKey
)

from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func

from app.core.database import Base


class TradingPlan(Base):

    __tablename__ = "trading_plans"

    id = Column(Integer, primary_key=True)

    user_id = Column(
    Integer,
    ForeignKey("users.id", ondelete="CASCADE")
    )

    name = Column(String(100), nullable=False)

    description = Column(Text)

    is_default = Column(Boolean, default=False)

    risk_per_trade = Column(Numeric(5, 2))

    maximum_daily_loss = Column(Numeric(5, 2))

    maximum_weekly_loss = Column(Numeric(5, 2))

    minimum_rr = Column(Numeric(5, 2))

    maximum_trades_day = Column(Integer)

    maximum_trades_week = Column(Integer)

    allow_forex = Column(Boolean, default=True)

    allow_metals = Column(Boolean, default=True)

    allow_crypto = Column(Boolean, default=False)

    allow_indices = Column(Boolean, default=False)

    session_asia = Column(Boolean, default=False)

    session_london = Column(Boolean, default=True)

    session_newyork = Column(Boolean, default=True)

    session_overlap = Column(Boolean, default=True)

    avoid_news_before = Column(Boolean, default=True)

    avoid_news_after = Column(Boolean, default=True)

    constitution = Column(Text)

    created_at = Column(DateTime(timezone=False), server_default=func.now())

    updated_at = Column(DateTime(timezone=False), server_default=func.now())


class TradingPlanHistory(Base):

    __tablename__ = "trading_plan_history"

    id = Column(Integer, primary_key=True)

    trading_plan_id = Column(
        Integer,
        ForeignKey("trading_plans.id", ondelete="CASCADE")
    )

    changed_at = Column(DateTime(timezone=False), server_default=func.now())

    changed_by = Column(
    Integer,
    ForeignKey("users.id")
    )

    snapshot = Column(JSONB, nullable=False)