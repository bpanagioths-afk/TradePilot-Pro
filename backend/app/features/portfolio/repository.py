from sqlalchemy.orm import Session

from app.models.trade import Trade


def get_active_trades(db: Session):
    """
    Returns all non-archived closed trades.

    Open MT5 positions are excluded from historical
    portfolio and analytics calculations until closed.
    """

    return (
        db.query(Trade)
        .filter(
            Trade.is_archived == False,
            Trade.close_time.isnot(None)
        )
        .all()
    )