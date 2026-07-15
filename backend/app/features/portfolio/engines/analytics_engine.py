from app.features.portfolio.engines.movement_engine import (
    calculate_breakdown,
)


def _build_group_result(
    label,
    trades,
):
    return {
        "label": label,
        "trades": len(trades),
        "movement_breakdown": calculate_breakdown(
            trades,
        ),
    }


def calculate_by_symbol(
    trades,
):
    groups = {}

    for trade in trades:
        groups.setdefault(
            trade.symbol,
            [],
        ).append(trade)

    return [
        _build_group_result(
            label=symbol,
            trades=groups[symbol],
        )
        for symbol in sorted(groups)
    ]


def calculate_by_hour(
    trades,
):
    groups = {}

    for trade in trades:
        if trade.open_time is None:
            continue

        hour = trade.open_time.hour

        groups.setdefault(
            hour,
            [],
        ).append(trade)

    return [
        _build_group_result(
            label=hour,
            trades=groups[hour],
        )
        for hour in sorted(groups)
    ]


def calculate_by_system(
    trades,
):
    groups = {}

    for trade in trades:
        system_id = trade.trading_system_id

        groups.setdefault(
            system_id,
            [],
        ).append(trade)

    return [
        {
            **_build_group_result(
                label=(
                    system_id
                    if system_id is not None
                    else "Unassigned"
                ),
                trades=groups[system_id],
            ),
            "trading_system_id": system_id,
        }
        for system_id in sorted(
            groups,
            key=lambda value: (
                value is None,
                value if value is not None else 0,
            ),
        )
    ]


def calculate_by_psychology(
    trades,
):
    groups = {}

    for trade in trades:
        psychology_state_id = (
            trade.psychology_state_id
        )

        groups.setdefault(
            psychology_state_id,
            [],
        ).append(trade)

    return [
        {
            **_build_group_result(
                label=(
                    psychology_state_id
                    if psychology_state_id is not None
                    else "Unassigned"
                ),
                trades=groups[
                    psychology_state_id
                ],
            ),
            "psychology_state_id": (
                psychology_state_id
            ),
        }
        for psychology_state_id in sorted(
            groups,
            key=lambda value: (
                value is None,
                value if value is not None else 0,
            ),
        )
    ]