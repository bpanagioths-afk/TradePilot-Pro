def _normalize_asset_class(value):
    if not value:
        return "other"

    normalized = str(value).strip().lower()

    aliases = {
        "indices": "index",
        "stocks": "stock",
        "metals": "metal",
        "cryptocurrency": "crypto",
    }

    return aliases.get(
        normalized,
        normalized,
    )


def calculate(trades):
    """
    Portfolio Allocation Engine

    Groups trades by asset class and calculates
    allocation based on total lot size.
    """

    asset_groups = {}

    for trade in trades:
        lot_size = float(
            trade.lot_size or 0
        )

        if lot_size <= 0:
            continue

        asset_class = _normalize_asset_class(
            trade.asset_class
        )

        if asset_class not in asset_groups:
            asset_groups[asset_class] = {
                "asset_class": asset_class,
                "lot_size": 0.0,
                "trades": 0,
            }

        asset_groups[asset_class]["lot_size"] += lot_size
        asset_groups[asset_class]["trades"] += 1

    total_lots = sum(
        item["lot_size"]
        for item in asset_groups.values()
    )

    if total_lots <= 0:
        return []

    result = []

    for item in asset_groups.values():
        lot_size = round(
            item["lot_size"],
            2,
        )

        allocation_percentage = round(
            item["lot_size"] / total_lots * 100,
            2,
        )

        result.append({
            "asset_class": item["asset_class"],
            "lot_size": lot_size,
            "trades": item["trades"],
            "allocation_percentage": allocation_percentage,
        })

    return sorted(
        result,
        key=lambda item: item["allocation_percentage"],
        reverse=True,
    )