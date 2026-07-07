def calculate(trades):
    """
    Performance Engine

    Responsible for:

    - Total Profit
    - Total Loss
    - Net Profit
    - Profit Factor
    """

    total_profit = sum(
        trade.profit_money
        for trade in trades
        if trade.profit_money is not None and trade.profit_money > 0
    )

    total_loss = sum(
        abs(trade.profit_money)
        for trade in trades
        if trade.profit_money is not None and trade.profit_money < 0
    )

    net_profit = total_profit - total_loss

    profit_factor = (
        round(total_profit / total_loss, 2)
        if total_loss > 0
        else None
    )

    return {
        "total_profit": round(total_profit, 2),
        "total_loss": round(total_loss, 2),
        "net_profit": round(net_profit, 2),
        "profit_factor": profit_factor,
    }