def calculate(trades):
    """
    Equity Engine

    Responsible for:

    - Current Equity
    - Peak Equity
    - Equity Curve
    """

    equity = 0
    peak_equity = 0

    equity_curve = []

    for index, trade in enumerate(trades, start=1):

        profit = trade.profit_money or 0

        equity += profit

        if equity > peak_equity:
            peak_equity = equity

        equity_curve.append(
            {
                "trade": index,
                "equity": round(equity, 2)
            }
        )

    return {
        "current_equity": round(equity, 2),
        "peak_equity": round(peak_equity, 2),
        "equity_curve": equity_curve
    }