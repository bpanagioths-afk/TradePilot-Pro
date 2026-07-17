from sqlalchemy.orm import Session

from app.models.trade import Trade


def get_active_trades(
    db: Session,
    user_id: int,
):
    """
    Returns all non-archived closed trades
    belonging to the authenticated user.
    """

    return (
        db.query(Trade)
        .filter(
            Trade.user_id == user_id,
            Trade.is_archived == False,
            Trade.close_time.isnot(None),
        )
        .all()
    )