from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.trade import Trade


MANUAL_MATCH_TIME_TOLERANCE = timedelta(
    seconds=60,
)

MANUAL_MATCH_PRICE_TOLERANCE = 0.00000001

MANUAL_MATCH_VOLUME_TOLERANCE = 0.00000001


def get_trade_by_position(
    db: Session,
    user_id: int,
    account_id: int,
    position_id: int,
) -> Trade | None:
    return (
        db.query(Trade)
        .filter(
            Trade.user_id == user_id,
            Trade.mt5_account_id == account_id,
            Trade.mt5_position_id == position_id,
        )
        .first()
    )


def get_manual_trade_by_position_id(
    db: Session,
    *,
    user_id: int,
    position_id: int,
) -> Trade | None:
    """
    Find a manual trade that already contains the MT5 position
    identifier entered by the user.

    The match is accepted only when exactly one eligible trade exists.
    """

    matches = (
        db.query(Trade)
        .filter(
            Trade.user_id == user_id,
            Trade.mt5_position_id == position_id,
            Trade.imported_from_mt5 == False,
            Trade.mt5_account_id.is_(None),
        )
        .order_by(Trade.id)
        .all()
    )

    if len(matches) != 1:
        return None

    return matches[0]


def _values_match(
    first_value: float | None,
    second_value: float | None,
    tolerance: float,
) -> bool:
    if first_value is None or second_value is None:
        return False

    return abs(
        float(first_value)
        - float(second_value)
    ) <= tolerance


def _times_match(
    first_value: datetime | None,
    second_value: datetime | None,
) -> bool:
    if first_value is None or second_value is None:
        return False

    return abs(
        first_value
        - second_value
    ) <= MANUAL_MATCH_TIME_TOLERANCE


def get_manual_trade_match(
    db: Session,
    *,
    user_id: int,
    symbol: str,
    direction: str,
    entry_price: float | None,
    lot_size: float | None,
    open_time: datetime | None,
) -> Trade | None:
    """
    Legacy fallback for manual trades without an MT5 position ID.

    The fallback is intentionally strict. If zero or multiple
    records match, no automatic reconciliation is performed.
    """

    if (
        not symbol
        or not direction
        or entry_price is None
        or lot_size is None
        or open_time is None
    ):
        return None

    candidates = (
        db.query(Trade)
        .filter(
            Trade.user_id == user_id,
            Trade.imported_from_mt5 == False,
            Trade.mt5_position_id.is_(None),
            Trade.symbol == symbol,
            Trade.direction == direction,
            Trade.open_time.isnot(None),
            Trade.open_time >= (
                open_time
                - MANUAL_MATCH_TIME_TOLERANCE
            ),
            Trade.open_time <= (
                open_time
                + MANUAL_MATCH_TIME_TOLERANCE
            ),
        )
        .order_by(Trade.id)
        .all()
    )

    matches = [
        trade
        for trade in candidates
        if (
            _times_match(
                trade.open_time,
                open_time,
            )
            and _values_match(
                trade.entry_price,
                entry_price,
                MANUAL_MATCH_PRICE_TOLERANCE,
            )
            and _values_match(
                trade.lot_size,
                lot_size,
                MANUAL_MATCH_VOLUME_TOLERANCE,
            )
        )
    ]

    if len(matches) != 1:
        return None

    return matches[0]


def create_trade(
    db: Session,
    *,
    user_id: int,
    account_id: int,
    position_id: int,
) -> Trade:
    trade = Trade(
        user_id=user_id,
        mt5_account_id=account_id,
        mt5_position_id=position_id,
        imported_from_mt5=True,
        is_archived=False,
    )

    db.add(trade)

    return trade


def _connect_manual_trade(
    trade: Trade,
    *,
    account_id: int,
    position_id: int,
) -> Trade:
    trade.mt5_account_id = account_id
    trade.mt5_position_id = position_id
    trade.imported_from_mt5 = True
    trade.is_archived = False

    return trade


def get_or_create_trade(
    db: Session,
    *,
    user_id: int,
    account_id: int,
    position_id: int,
    symbol: str,
    direction: str,
    entry_price: float | None,
    lot_size: float | None,
    open_time: datetime | None,
) -> tuple[Trade, bool]:
    trade = get_trade_by_position(
        db=db,
        user_id=user_id,
        account_id=account_id,
        position_id=position_id,
    )

    if trade is not None:
        return trade, False

    manual_trade = get_manual_trade_by_position_id(
        db=db,
        user_id=user_id,
        position_id=position_id,
    )

    if manual_trade is not None:
        return (
            _connect_manual_trade(
                manual_trade,
                account_id=account_id,
                position_id=position_id,
            ),
            False,
        )

    manual_trade = get_manual_trade_match(
        db=db,
        user_id=user_id,
        symbol=symbol,
        direction=direction,
        entry_price=entry_price,
        lot_size=lot_size,
        open_time=open_time,
    )

    if manual_trade is not None:
        return (
            _connect_manual_trade(
                manual_trade,
                account_id=account_id,
                position_id=position_id,
            ),
            False,
        )

    trade = create_trade(
        db=db,
        user_id=user_id,
        account_id=account_id,
        position_id=position_id,
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