from datetime import datetime, timedelta

import MetaTrader5 as mt5

from app.core.database import SessionLocal
from app.models.mt5_account import MT5Account
from app.services.mt5.aggregator import (
    aggregate_positions,
    calculate_entry_price,
    calculate_entry_volume,
    calculate_exit_price,
    calculate_profit_money,
    get_stop_loss,
    get_take_profit,
)
from app.services.mt5.builder import (
    build_deal,
    build_open_position,
    build_order,
)
from app.services.mt5.movement import calculate_movement
from app.services.mt5.repository import (
    commit_sync,
    get_or_create_trade,
    rollback_sync,
    save_trade,
)
from app.services.mt5.validator import validate_positions
from app.services.mt5.terminal_connection import (
    initialize_mt5_if_running,
)
from app.utils.trade_stats import (
    calculate_duration,
    calculate_rr,
)


def _calculate_risk_reward(
    entry_price: float | None,
    stop_loss: float | None,
    take_profit: float | None,
) -> float | None:
    if (
        entry_price is None
        or stop_loss is None
        or take_profit is None
    ):
        return None

    return calculate_rr(
        entry_price,
        stop_loss,
        take_profit,
    )


def _clear_movement_fields(
    trade,
) -> None:
    trade.movement_value = None
    trade.movement_unit = None
    trade.asset_class = None
    trade.symbol_digits = None
    trade.symbol_point = None
    trade.tick_size = None
    trade.profit_pips = None


def _apply_movement_to_trade(
    trade,
    position,
    entry_price: float | None,
    exit_price: float | None,
) -> None:
    movement = calculate_movement(
        symbol=position.symbol,
        direction=position.direction,
        entry_price=entry_price,
        exit_price=exit_price,
    )

    trade.movement_value = movement.movement_value
    trade.movement_unit = movement.movement_unit
    trade.asset_class = movement.asset_class
    trade.symbol_digits = movement.symbol_digits
    trade.symbol_point = movement.symbol_point
    trade.tick_size = movement.tick_size
    trade.profit_pips = movement.legacy_profit_pips


def _apply_position_to_trade(
    trade,
    position,
) -> None:
    entry_price = calculate_entry_price(
        position,
    )

    exit_price = calculate_exit_price(
        position,
    )

    stop_loss = get_stop_loss(
        position,
    )

    take_profit = get_take_profit(
        position,
    )

    profit_money = calculate_profit_money(
        position,
    )

    trade.mt5_account_id = position.account_id
    trade.mt5_position_id = position.position_id
    trade.imported_from_mt5 = True
    trade.is_archived = False

    trade.mt5_ticket = (
        position.live_ticket
        if position.live_ticket is not None
        else (
            position.entry_deals[0].ticket
            if position.entry_deals
            else None
        )
    )

    trade.symbol = position.symbol
    trade.direction = position.direction
    trade.entry_price = entry_price
    trade.stop_loss = stop_loss
    trade.take_profit = take_profit
    trade.lot_size = calculate_entry_volume(
        position,
    )
    trade.open_time = position.open_time

    trade.risk_reward = _calculate_risk_reward(
        entry_price,
        stop_loss,
        take_profit,
    )

    if position.is_open:
        trade.exit_price = None
        trade.close_time = None
        trade.duration_minutes = None
        trade.is_win = None
        trade.profit_money = profit_money

        _clear_movement_fields(
            trade,
        )

        trade.notes = "Synced from MT5 - open position"
        return

    trade.exit_price = exit_price
    trade.close_time = position.close_time
    trade.profit_money = profit_money

    trade.duration_minutes = (
        calculate_duration(
            position.open_time,
            position.close_time,
        )
        if (
            position.open_time is not None
            and position.close_time is not None
        )
        else None
    )

    _apply_movement_to_trade(
        trade=trade,
        position=position,
        entry_price=entry_price,
        exit_price=exit_price,
    )

    trade.is_win = (
        1
        if profit_money > 0
        else 0
    )

    trade.notes = "Synced from MT5 - closed position"


def sync(
    account_id: int,
    user_id: int,
):
    initialized, initialization_message = (
        initialize_mt5_if_running()
    )

    if not initialized:
        return {
            "success": False,
            "message": initialization_message,
        }

    db = SessionLocal()

    try:
        account = (
            db.query(MT5Account)
            .filter(
                MT5Account.id == account_id,
            )
            .first()
        )

        if account is None:
            return {
                "success": False,
                "message": "MT5 account not found",
            }

        date_to = datetime.now()
        date_from = date_to - timedelta(
            days=365,
        )

        raw_deals = mt5.history_deals_get(
            date_from,
            date_to,
        )

        raw_orders = mt5.history_orders_get(
            date_from,
            date_to,
        )

        raw_positions = mt5.positions_get()

        if raw_deals is None:
            raw_deals = []

        if raw_orders is None:
            raw_orders = []

        if raw_positions is None:
            raw_positions = []

        deals = [
            build_deal(raw_deal)
            for raw_deal in raw_deals
            if (
                getattr(
                    raw_deal,
                    "position_id",
                    0,
                )
                and getattr(
                    raw_deal,
                    "symbol",
                    "",
                )
                and raw_deal.type in (
                    mt5.DEAL_TYPE_BUY,
                    mt5.DEAL_TYPE_SELL,
                )
                and raw_deal.entry in (
                    mt5.DEAL_ENTRY_IN,
                    mt5.DEAL_ENTRY_OUT,
                    mt5.DEAL_ENTRY_OUT_BY,
                )
            )
        ]

        orders = [
            build_order(raw_order)
            for raw_order in raw_orders
            if getattr(
                raw_order,
                "position_id",
                0,
            )
        ]

        open_positions = [
            build_open_position(
                account_id,
                raw_position,
            )
            for raw_position in raw_positions
        ]

        positions = aggregate_positions(
            account_id=account_id,
            deals=deals,
            orders=orders,
            open_positions=open_positions,
        )

        open_position_ids = {
            position.position_id
            for position in open_positions
        }

        known_deal_tickets = {
            deal.ticket
            for deal in deals
        }

        missing_exit_position_ids = [
            position.position_id
            for position in positions
            if (
                position.position_id not in open_position_ids
                and position.entry_deals
                and not position.exit_deals
            )
        ]

        additional_deals = []

        for position_id in missing_exit_position_ids:
            raw_position_deals = mt5.history_deals_get(
                position=position_id,
            )

            if raw_position_deals is None:
                continue

            for raw_deal in raw_position_deals:
                if (
                    raw_deal.ticket in known_deal_tickets
                    or not getattr(raw_deal, "symbol", "")
                    or raw_deal.type not in (
                        mt5.DEAL_TYPE_BUY,
                        mt5.DEAL_TYPE_SELL,
                    )
                    or raw_deal.entry not in (
                        mt5.DEAL_ENTRY_IN,
                        mt5.DEAL_ENTRY_OUT,
                        mt5.DEAL_ENTRY_OUT_BY,
                    )
                ):
                    continue

                additional_deals.append(
                    build_deal(raw_deal)
                )

                known_deal_tickets.add(
                    raw_deal.ticket
                )

        if additional_deals:
            deals.extend(additional_deals)

            positions = aggregate_positions(
                account_id=account_id,
                deals=deals,
                orders=orders,
                open_positions=open_positions,
            )

        validation_results = validate_positions(
            positions,
        )

        imported = 0
        updated = 0
        skipped = 0
        validation_errors = {}

        for position in positions:
            validation_result = validation_results[
                position.position_id
            ]

            if not validation_result.is_valid:
                skipped += 1
                validation_errors[
                    str(position.position_id)
                ] = validation_result.errors
                continue

            trade, is_new = get_or_create_trade(
                db=db,
                account_id=account_id,
                position_id=position.position_id,
                user_id=user_id,
            )

            _apply_position_to_trade(
                trade,
                position,
            )

            save_trade(
                db,
                trade,
            )

            if is_new:
                imported += 1
            else:
                updated += 1

        account.last_sync = datetime.now()

        commit_sync(
            db,
        )

        return {
            "success": True,
            "imported": imported,
            "updated": updated,
            "skipped": skipped,
            "positions_found": len(positions),
            "validation_errors": validation_errors,
        }

    except Exception:
        rollback_sync(
            db,
        )
        raise

    finally:
        db.close()
        mt5.shutdown()