from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.features.settings.schemas import BackupTrade
from app.models.trade import Trade


def manual_trade_exists(
    db: Session,
    *,
    user_id: int,
    backup_trade: BackupTrade,
) -> bool:
    query = (
        db.query(Trade.id)
        .filter(
            Trade.user_id == user_id,
            Trade.mt5_position_id.is_(None),
            Trade.symbol == backup_trade.symbol,
            Trade.direction == backup_trade.direction,
            Trade.open_time == backup_trade.open_time,
        )
    )

    optional_conditions = []

    if backup_trade.close_time is not None:
        optional_conditions.append(
            Trade.close_time
            == backup_trade.close_time
        )

    if backup_trade.entry_price is not None:
        optional_conditions.append(
            Trade.entry_price
            == backup_trade.entry_price
        )

    if backup_trade.exit_price is not None:
        optional_conditions.append(
            Trade.exit_price
            == backup_trade.exit_price
        )

    if backup_trade.lot_size is not None:
        optional_conditions.append(
            Trade.lot_size
            == backup_trade.lot_size
        )

    if optional_conditions:
        query = query.filter(
            and_(*optional_conditions)
        )

    return query.first() is not None


def backup_trade_exists(
    db: Session,
    *,
    user_id: int,
    backup_trade: BackupTrade,
) -> bool:
    if backup_trade.mt5_position_id is not None:
        return (
            db.query(Trade.id)
            .filter(
                Trade.user_id == user_id,
                Trade.mt5_position_id
                == backup_trade.mt5_position_id,
            )
            .first()
            is not None
        )

    if backup_trade.mt5_ticket is not None:
        ticket_match = (
            db.query(Trade.id)
            .filter(
                Trade.user_id == user_id,
                Trade.mt5_ticket
                == backup_trade.mt5_ticket,
            )
            .first()
        )

        if ticket_match is not None:
            return True

    return manual_trade_exists(
        db,
        user_id=user_id,
        backup_trade=backup_trade,
    )
