from collections import defaultdict

from app.services.mt5.models import (
    DealData,
    OrderData,
    PositionData,
)


def _weighted_average_price(
    deals: list[DealData],
) -> float | None:
    total_volume = sum(
        deal.volume
        for deal in deals
    )

    if total_volume <= 0:
        return None

    weighted_total = sum(
        deal.price * deal.volume
        for deal in deals
    )

    return weighted_total / total_volume


def group_deals_by_position(
    deals: list[DealData],
) -> dict[int, list[DealData]]:
    grouped_deals = defaultdict(list)

    for deal in deals:
        grouped_deals[
            deal.position_id
        ].append(deal)

    return dict(grouped_deals)


def group_orders_by_position(
    orders: list[OrderData],
) -> dict[int, list[OrderData]]:
    grouped_orders = defaultdict(list)

    for order in orders:
        grouped_orders[
            order.position_id
        ].append(order)

    return dict(grouped_orders)


def aggregate_positions(
    account_id: int,
    deals: list[DealData],
    orders: list[OrderData],
    open_positions: list[PositionData],
) -> list[PositionData]:
    deals_by_position = group_deals_by_position(
        deals,
    )

    orders_by_position = group_orders_by_position(
        orders,
    )

    open_positions_by_id = {
        position.position_id: position
        for position in open_positions
    }

    position_ids = (
        set(deals_by_position)
        | set(open_positions_by_id)
    )

    aggregates = []

    for position_id in position_ids:
        position_deals = deals_by_position.get(
            position_id,
            [],
        )

        entry_deals = [
            deal
            for deal in position_deals
            if deal.entry_type == "ENTRY"
        ]

        exit_deals = [
            deal
            for deal in position_deals
            if deal.entry_type in (
                "EXIT",
                "EXIT_BY",
            )
        ]

        open_position = open_positions_by_id.get(
            position_id,
        )

        first_deal = (
            min(
                position_deals,
                key=lambda deal: deal.time,
            )
            if position_deals
            else None
        )

        if open_position is None and first_deal is None:
            continue

        symbol = (
            open_position.symbol
            if open_position is not None
            else first_deal.symbol
        )

        direction = (
            open_position.direction
            if open_position is not None
            else (
                entry_deals[0].direction
                if entry_deals
                else first_deal.direction
            )
        )

        open_time = (
            min(
                deal.time
                for deal in entry_deals
            )
            if entry_deals
            else (
                open_position.open_time
                if open_position is not None
                else None
            )
        )

        close_time = (
            max(
                deal.time
                for deal in exit_deals
            )
            if exit_deals
            and open_position is None
            else None
        )

        aggregate = PositionData(
            position_id=position_id,
            account_id=account_id,
            symbol=symbol,
            direction=direction,
            entry_deals=entry_deals,
            exit_deals=exit_deals,
            orders=orders_by_position.get(
                position_id,
                [],
            ),
            is_open=open_position is not None,
            open_time=open_time,
            close_time=close_time,
            live_ticket=(
                open_position.live_ticket
                if open_position is not None
                else None
            ),
            live_entry_price=(
                open_position.live_entry_price
                if open_position is not None
                else None
            ),
            live_volume=(
                open_position.live_volume
                if open_position is not None
                else None
            ),
            live_stop_loss=(
                open_position.live_stop_loss
                if open_position is not None
                else None
            ),
            live_take_profit=(
                open_position.live_take_profit
                if open_position is not None
                else None
            ),
            live_profit=(
                open_position.live_profit
                if open_position is not None
                else None
            ),
        )

        aggregates.append(
            aggregate,
        )

    return aggregates


def calculate_entry_price(
    position: PositionData,
) -> float | None:
    if position.entry_deals:
        return _weighted_average_price(
            position.entry_deals,
        )

    return position.live_entry_price


def calculate_exit_price(
    position: PositionData,
) -> float | None:
    return _weighted_average_price(
        position.exit_deals,
    )


def calculate_entry_volume(
    position: PositionData,
) -> float:
    if position.entry_deals:
        return sum(
            deal.volume
            for deal in position.entry_deals
        )

    return position.live_volume or 0.0


def calculate_exit_volume(
    position: PositionData,
) -> float:
    return sum(
        deal.volume
        for deal in position.exit_deals
    )


def calculate_remaining_volume(
    position: PositionData,
) -> float:
    if position.is_open and position.live_volume is not None:
        return round(
            position.live_volume,
            8,
        )

    remaining_volume = (
        calculate_entry_volume(position)
        - calculate_exit_volume(position)
    )

    return max(
        round(remaining_volume, 8),
        0.0,
    )


def calculate_profit_money(
    position: PositionData,
) -> float:
    realized_profit = sum(
        deal.profit
        + deal.commission
        + deal.swap
        + deal.fee
        for deal in position.entry_deals
        + position.exit_deals
    )

    if position.is_open:
        return round(
            realized_profit
            + (position.live_profit or 0.0),
            2,
        )

    return round(
        realized_profit,
        2,
    )


def get_stop_loss(
    position: PositionData,
) -> float | None:
    if position.live_stop_loss is not None:
        return position.live_stop_loss

    for order in reversed(position.orders):
        if order.stop_loss is not None:
            return order.stop_loss

    return None


def get_take_profit(
    position: PositionData,
) -> float | None:
    if position.live_take_profit is not None:
        return position.live_take_profit

    for order in reversed(position.orders):
        if order.take_profit is not None:
            return order.take_profit

    return None