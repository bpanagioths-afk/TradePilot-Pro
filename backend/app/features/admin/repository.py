from sqlalchemy import func, or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.mt5_account import MT5Account
from app.models.trade import Trade
from app.models.user import User


def get_users_with_statistics(db: Session):
    return (
        db.query(
            User.id,
            User.username,
            User.email,
            User.is_admin,
            User.is_active,
            User.created_at,
            User.updated_at,
            User.last_login_at,
            func.count(
                func.distinct(MT5Account.id)
            ).label("mt5_accounts_count"),
            func.count(
                func.distinct(Trade.id)
            ).label("trades_count"),
        )
        .outerjoin(
            MT5Account,
            MT5Account.user_id == User.id,
        )
        .outerjoin(
            Trade,
            Trade.user_id == User.id,
        )
        .group_by(
            User.id,
            User.username,
            User.email,
            User.is_admin,
            User.is_active,
            User.created_at,
            User.updated_at,
            User.last_login_at,
        )
        .order_by(User.id)
        .all()
    )


def get_user_by_id(
    db: Session,
    user_id: int,
) -> User | None:
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def get_user_by_username_or_email(
    db: Session,
    username: str,
    email: str,
    exclude_user_id: int | None = None,
) -> User | None:
    query = (
        db.query(User)
        .filter(
            or_(
                func.lower(User.username)
                == username.lower(),
                func.lower(User.email)
                == email.lower(),
            )
        )
    )

    if exclude_user_id is not None:
        query = query.filter(
            User.id != exclude_user_id
        )

    return query.first()


def create_user(
    db: Session,
    user: User,
) -> User:
    db.add(user)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise

    db.refresh(user)

    return user


def save_user(
    db: Session,
    user: User,
) -> User:
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise

    db.refresh(user)

    return user