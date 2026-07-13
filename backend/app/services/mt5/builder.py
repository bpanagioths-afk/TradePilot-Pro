from datetime import datetime

import MetaTrader5 as mt5

from app.services.mt5.models import (
    DealData,
    OrderData,
    PositionData,
)


def _to_datetime(timestamp: int) -> datetime:
    return datetime.fromtimestamp(timestamp)


def _optional_price(value) -> float | None:
    if value in (None, 0, 0.0):
        return None

    return float(value)


def _get_position_id(raw_item) -> int:
    position_id = getattr(raw_item, "position_id", None)

    if position_id:
        return int(position_id)

    identifier = getattr(raw_item, "identifier", None)

    if identifier:
        return int(identifier)

    return int(getattr(raw_item, "ticket", 0))


def _get_direction(raw_type: int) -> str:
    return (
        "BUY"
        if raw_type in (
            mt5.DEAL_TYPE_BUY,
            mt5.POSITION_TYPE_BUY,
        )
        else "SELL"
    )


def _get_entry_type(raw_entry: int) -> str:
    mapping = {
        mt5.DEAL_ENTRY_IN: "ENTRY",
        mt5.DEAL_ENTRY_OUT: "EXIT",
        mt5.DEAL_ENTRY_OUT_BY: "EXIT_BY",
    }

    return mapping.get(raw_entry, "UNKNOWN")


def build_deal(raw_deal) -> DealData:
    return DealData(
        ticket=int(raw_deal.ticket),
        position_id=_get_position_id(raw_deal),
        symbol=raw_deal.symbol,
        direction=_get_direction(raw_deal.type),
        entry_type=_get_entry_type(raw_deal.entry),
        volume=float(raw_deal.volume),
        price=float(raw_deal.price),
        profit=float(raw_deal.profit),
        commission=float(raw_deal.commission),
        swap=float(raw_deal.swap),
        fee=float(raw_deal.fee),
        time=_to_datetime(raw_deal.time),
    )


def build_order(raw_order) -> OrderData:
    return OrderData(
        ticket=int(raw_order.ticket),
        position_id=_get_position_id(raw_order),
        stop_loss=_optional_price(raw_order.sl),
        take_profit=_optional_price(raw_order.tp),
    )


def build_open_position(
    account_id: int,
    raw_position,
) -> PositionData:
    return PositionData(
        position_id=_get_position_id(raw_position),
        account_id=account_id,
        symbol=raw_position.symbol,
        direction=_get_direction(raw_position.type),
        is_open=True,
        open_time=_to_datetime(raw_position.time),
        live_ticket=int(raw_position.ticket),
        live_entry_price=float(raw_position.price_open),
        live_volume=float(raw_position.volume),
        live_stop_loss=_optional_price(raw_position.sl),
        live_take_profit=_optional_price(raw_position.tp),
        live_profit=float(raw_position.profit),
    )