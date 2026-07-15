def get_value(trade):
    if trade.movement_value is not None:
        return float(trade.movement_value)

    if trade.profit_pips is not None:
        return float(trade.profit_pips)

    return None


def get_unit(trade):
    if trade.movement_unit:
        return trade.movement_unit

    return "pips"


def get_asset_class(trade):
    if trade.asset_class:
        return trade.asset_class

    return "forex"


def calculate_breakdown(trades):
    """
    Multi-Asset Movement Engine

    Groups movement values without mixing incompatible
    units such as Forex pips and non-Forex points.
    """

    groups = {}

    for trade in trades:
        value = get_value(trade)

        if value is None:
            continue

        unit = get_unit(trade)
        asset_class = get_asset_class(trade)

        key = (
            asset_class,
            unit,
        )

        if key not in groups:
            groups[key] = {
                "asset_class": asset_class,
                "unit": unit,
                "total": 0.0,
                "trades": 0,
            }

        groups[key]["total"] += value
        groups[key]["trades"] += 1

    result = []

    for group in groups.values():
        trades_count = group["trades"]
        total = round(
            group["total"],
            2,
        )

        average = (
            round(
                total / trades_count,
                2,
            )
            if trades_count > 0
            else 0
        )

        result.append({
            "asset_class": group["asset_class"],
            "unit": group["unit"],
            "total": total,
            "average": average,
            "trades": trades_count,
        })

    return sorted(
        result,
        key=lambda item: (
            item["unit"],
            item["asset_class"],
        ),
    )


def calculate_unit_totals(trades):
    breakdown = calculate_breakdown(
        trades,
    )

    totals = {}

    for item in breakdown:
        unit = item["unit"]

        if unit not in totals:
            totals[unit] = {
                "unit": unit,
                "total": 0.0,
                "trades": 0,
            }

        totals[unit]["total"] += item["total"]
        totals[unit]["trades"] += item["trades"]

    result = {}

    for unit, data in totals.items():
        trades_count = data["trades"]
        total = round(
            data["total"],
            2,
        )

        result[unit] = {
            "total": total,
            "average": (
                round(
                    total / trades_count,
                    2,
                )
                if trades_count > 0
                else 0
            ),
            "trades": trades_count,
        }

    return result