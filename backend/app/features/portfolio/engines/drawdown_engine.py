def calculate(equity_data):
    """
    Drawdown Engine

    Responsible for:

    - Maximum Drawdown
    - Current Drawdown
    - Drawdown Curve
    """

    peak = 0
    max_drawdown = 0

    drawdown_curve = []

    for point in equity_data["equity_curve"]:

        equity = point["equity"]

        if equity > peak:
            peak = equity

        drawdown = peak - equity

        if drawdown > max_drawdown:
            max_drawdown = drawdown

        drawdown_curve.append(
            {
                "trade": point["trade"],
                "drawdown": round(drawdown, 2)
            }
        )

    current_drawdown = (
        drawdown_curve[-1]["drawdown"]
        if drawdown_curve
        else 0
    )

    return {
        "max_drawdown": round(max_drawdown, 2),
        "current_drawdown": round(current_drawdown, 2),
        "drawdown_curve": drawdown_curve
    }