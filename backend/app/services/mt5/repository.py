from sqlalchemy.orm import Session

from app.models.trade import Trade


def get_trade_by_position(
    db: Session,
    account_id: int,
    position_id: int,
    user_id: int,
) -> Trade | None:
    return (
        db.query(Trade)
        .filter(
            Trade.mt5_account_id == account_id,
            Trade.mt5_position_id == position_id,
            Trade.user_id == user_id,
        )
        .first()
    )


def create_trade(
    db: Session,
    *,
    account_id: int,
    position_id: int,
    user_id: int,
) -> Trade:
    trade = Trade(
        mt5_account_id=account_id,
        mt5_position_id=position_id,
        user_id=user_id,
        imported_from_mt5=True,
        is_archived=False,
    )

    db.add(trade)

    return trade


def get_or_create_trade(
    db: Session,
    *,
    account_id: int,
    position_id: int,
    user_id: int,
) -> tuple[Trade, bool]:
    trade = get_trade_by_position(
        db=db,
        account_id=account_id,
        position_id=position_id,
        user_id=user_id,
    )

    if trade is not None:
        return trade, False

    trade = create_trade(
        db=db,
        account_id=account_id,
        position_id=position_id,
        user_id=user_id,
    )

    return trade, True


def save_trade(
    db: Session,
    trade: Trade,
) -> Trade:
    db.add(trade)
    db.flush()

    return trade


def commit_sync(
    db: Session,
) -> None:
    db.commit()


def rollback_sync(
    db: Session,
) -> None:
    db.rollback()