from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.core.database import Base


class MT5Account(Base):

    __tablename__ = "mt5_accounts"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    account_name = Column(
        String(100),
        nullable=False
    )

    broker = Column(
        String(100),
        nullable=False
    )

    login = Column(
        String(50),
        nullable=False
    )

    server = Column(
        String(100),
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    auto_sync = Column(
        Boolean,
        default=False
    )

    sync_interval_minutes = Column(
        Integer,
        default=5
    )

    last_sync = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )