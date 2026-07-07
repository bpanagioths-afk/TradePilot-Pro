def calculate_summary(trades):
    """
    Calculates core portfolio summary and performance metrics.
    """

    total_trades = len(trades)

    winning_trades = sum(
        1 for trade in trades
        if trade.is_win
    )

    losing_trades = total_trades - winning_trades

    win_rate = (
        round((winning_trades / total_trades) * 100, 2)
        if total_trades > 0
        else 0
    )

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
        "total_trades": total_trades,
        "winning_trades": winning_trades,
        "losing_trades": losing_trades,
        "win_rate": win_rate,
        "total_profit": round(total_profit, 2),
        "total_loss": round(total_loss, 2),
        "net_profit": round(net_profit, 2),
        "profit_factor": profit_factor
    }