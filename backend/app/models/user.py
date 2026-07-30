from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Text,
)

from sqlalchemy.sql import func

from app.core.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
    )

    username = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
    )

    password_hash = Column(
        Text,
        nullable=False,
    )

    is_admin = Column(
        Boolean,
        nullable=False,
        default=False,
        server_default="false",
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
        server_default="true",
    )

    created_at = Column(
        DateTime(timezone=False),
        nullable=False,
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=False),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    trader_name = Column(
        String(100),
        nullable=True,
    )

    base_currency = Column(
        String(3),
        nullable=False,
        default="EUR",
        server_default="EUR",
    )

    theme_mode = Column(
        String(10),
        nullable=False,
        default="dark",
        server_default="dark",
    )

    timezone = Column(
        String(100),
        nullable=False,
        default="Europe/Athens",
        server_default="Europe/Athens",
    )

    time_format = Column(
        String(10),
        nullable=False,
        default="24h",
        server_default="24h",
    )

    date_format = Column(
        String(20),
        nullable=False,
        default="DD/MM/YYYY",
        server_default="DD/MM/YYYY",
    )

    last_login_at = Column(
        DateTime(timezone=False),
        nullable=True,
    )