from sqlalchemy.orm import Session

from app.models.trade import Trade


def get_active_trades(db: Session):
    """
    Returns all active (non archived) trades.
    """

    return (
        db.query(Trade)
        .filter(Trade.is_archived == False)
        .all()
    )