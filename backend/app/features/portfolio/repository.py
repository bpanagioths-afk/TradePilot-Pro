from sqlalchemy.orm import Session

from app.models.trade import Trade


def get_active_trades(
    db: Session,
    user_id: int,
):
    """
    Return the authenticated user's non-archived closed trades.

    Open MT5 positions are excluded from historical portfolio
    and analytics calculations until they are closed.
    """

    return (
        db.query(Trade)
        .filter(
            Trade.user_id == user_id,
            Trade.is_archived == False,
            Trade.close_time.isnot(None),
        )
        .order_by(Trade.id)
        .all()
    )
