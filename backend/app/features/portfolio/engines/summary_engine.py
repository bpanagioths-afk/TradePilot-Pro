def calculate(trades):
    """
    Summary Engine

    Responsible for:

    - Total Trades
    - Winning Trades
    - Losing Trades
    - Win Rate
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

    return {
        "total_trades": total_trades,
        "winning_trades": winning_trades,
        "losing_trades": losing_trades,
        "win_rate": win_rate,
    }