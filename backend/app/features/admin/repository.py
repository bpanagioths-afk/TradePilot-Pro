from sqlalchemy import func
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
            User.created_at,
            func.count(func.distinct(MT5Account.id)).label(
                "mt5_accounts_count"
            ),
            func.count(func.distinct(Trade.id)).label(
                "trades_count"
            ),
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
            User.created_at,
        )
        .order_by(User.id)
        .all()
    )