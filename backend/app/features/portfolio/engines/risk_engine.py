def calculate(trades):
    """
    Risk Engine

    Responsible for:

    - Average Win
    - Average Loss
    - Average RR
    - Average Pips
    - Average Duration
    - Largest Win
    - Largest Loss
    """

    winning_profit_values = [
        trade.profit_money
        for trade in trades
        if trade.profit_money is not None and trade.profit_money > 0
    ]

    losing_profit_values = [
        trade.profit_money
        for trade in trades
        if trade.profit_money is not None and trade.profit_money < 0
    ]

    rr_values = [
        trade.risk_reward
        for trade in trades
        if trade.risk_reward is not None
    ]

    pips_values = [
        trade.profit_pips
        for trade in trades
        if (
            trade.profit_pips is not None
            and (
                trade.movement_unit == "pips"
                or (
                    trade.movement_unit is None
                    and trade.asset_class in (
                        None,
                        "forex",
                    )
                )
            )
        )
    ]
    duration_values = [
        trade.duration_minutes
        for trade in trades
        if trade.duration_minutes is not None
    ]

    average_win = (
        round(sum(winning_profit_values) / len(winning_profit_values), 2)
        if winning_profit_values
        else 0
    )

    average_loss = (
        round(abs(sum(losing_profit_values)) / len(losing_profit_values), 2)
        if losing_profit_values
        else 0
    )

    average_rr = (
        round(sum(rr_values) / len(rr_values), 2)
        if rr_values
        else 0
    )

    average_pips = (
        round(sum(pips_values) / len(pips_values), 2)
        if pips_values
        else 0
    )

    average_duration = (
        round(sum(duration_values) / len(duration_values), 2)
        if duration_values
        else 0
    )

    largest_win = (
        round(max(winning_profit_values), 2)
        if winning_profit_values
        else 0
    )

    largest_loss = (
        round(abs(min(losing_profit_values)), 2)
        if losing_profit_values
        else 0
    )

    return {
        "average_win": average_win,
        "average_loss": average_loss,
        "average_rr": average_rr,
        "average_pips": average_pips,
        "average_duration": average_duration,
        "largest_win": largest_win,
        "largest_loss": largest_loss,
    }