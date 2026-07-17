from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.mt5_account import MT5Account
from app.models.trade import Trade


def _round(value, digits=2):
    return round(value or 0, digits)


def _percentage(value, total):
    if not total:
        return 0

    return round((value / total) * 100, 2)


def get_portfolio_summary(
    db: Session,
    user_id: int,
):
    overview = get_portfolio_overview(
        db,
        user_id,
    )

    return overview["summary"]


def get_portfolio_overview(
    db: Session,
    user_id: int,
):
    total_accounts = (
        db.query(MT5Account)
        .filter(MT5Account.user_id == user_id)
        .count()
    )

    active_accounts = (
        db.query(MT5Account)
        .filter(
            MT5Account.user_id == user_id,
            MT5Account.is_active.is_(True),
        )
        .count()
    )

    disabled_accounts = total_accounts - active_accounts

    trade_query = db.query(Trade).filter(
        Trade.user_id == user_id,
    )

    total_trades = trade_query.count()

    winning_trades = trade_query.filter(
        Trade.is_win == 1,
    ).count()

    losing_trades = total_trades - winning_trades

    win_rate = _percentage(
        winning_trades,
        total_trades,
    )

    total_profit = (
        db.query(func.sum(Trade.profit_money))
        .filter(Trade.user_id == user_id)
        .scalar()
        or 0
    )

    total_pips = (
        db.query(func.sum(Trade.profit_pips))
        .filter(Trade.user_id == user_id)
        .scalar()
        or 0
    )

    gross_profit = (
        db.query(func.sum(Trade.profit_money))
        .filter(
            Trade.user_id == user_id,
            Trade.profit_money > 0,
        )
        .scalar()
        or 0
    )

    gross_loss = (
        db.query(func.sum(Trade.profit_money))
        .filter(
            Trade.user_id == user_id,
            Trade.profit_money < 0,
        )
        .scalar()
        or 0
    )

    average_profit_per_trade = 0
    average_pips_per_trade = 0

    if total_trades > 0:
        average_profit_per_trade = total_profit / total_trades
        average_pips_per_trade = total_pips / total_trades

    winning_amounts = [
        value[0]
        for value in (
            db.query(Trade.profit_money)
            .filter(
                Trade.user_id == user_id,
                Trade.profit_money > 0,
            )
            .all()
        )
        if value[0] is not None
    ]

    losing_amounts = [
        value[0]
        for value in (
            db.query(Trade.profit_money)
            .filter(
                Trade.user_id == user_id,
                Trade.profit_money < 0,
            )
            .all()
        )
        if value[0] is not None
    ]

    average_win = (
        sum(winning_amounts) / len(winning_amounts)
        if winning_amounts
        else 0
    )

    average_loss = (
        sum(losing_amounts) / len(losing_amounts)
        if losing_amounts
        else 0
    )

    largest_win = (
        max(winning_amounts)
        if winning_amounts
        else 0
    )

    largest_loss = (
        min(losing_amounts)
        if losing_amounts
        else 0
    )

    profit_factor = 0

    if gross_loss != 0:
        profit_factor = gross_profit / abs(gross_loss)

    expectancy = average_profit_per_trade

    average_rr = (
        db.query(func.avg(Trade.risk_reward))
        .filter(Trade.user_id == user_id)
        .scalar()
        or 0
    )

    trades = (
        db.query(Trade)
        .filter(Trade.user_id == user_id)
        .order_by(Trade.id.asc())
        .all()
    )

    cumulative_profit = 0
    peak = 0
    max_drawdown = 0

    for trade in trades:
        cumulative_profit += trade.profit_money or 0
        peak = max(peak, cumulative_profit)
        drawdown = peak - cumulative_profit
        max_drawdown = max(max_drawdown, drawdown)

    symbol_rows = (
        db.query(
            Trade.symbol,
            func.sum(Trade.profit_money),
        )
        .filter(Trade.user_id == user_id)
        .group_by(Trade.symbol)
        .all()
    )

    direction_rows = (
        db.query(
            Trade.direction,
            func.count(Trade.id),
        )
        .filter(Trade.user_id == user_id)
        .group_by(Trade.direction)
        .all()
    )

    by_symbol = [
        {
            "name": symbol or "Unknown",
            "value": _round(value),
            "percentage": _percentage(
                abs(value or 0),
                abs(total_profit),
            ),
        }
        for symbol, value in symbol_rows
    ]

    by_direction = [
        {
            "name": direction or "Unknown",
            "value": float(count or 0),
            "percentage": _percentage(
                count or 0,
                total_trades,
            ),
        }
        for direction, count in direction_rows
    ]

    return {
        "summary": {
            "total_accounts": total_accounts,
            "active_accounts": active_accounts,
            "disabled_accounts": disabled_accounts,
            "total_trades": total_trades,
            "winning_trades": winning_trades,
            "losing_trades": losing_trades,
            "win_rate": win_rate,
            "total_profit": _round(total_profit),
            "total_pips": _round(total_pips),
        },
        "statistics": {
            "gross_profit": _round(gross_profit),
            "gross_loss": _round(gross_loss),
            "net_profit": _round(total_profit),
            "average_profit_per_trade": _round(
                average_profit_per_trade,
            ),
            "average_pips_per_trade": _round(
                average_pips_per_trade,
            ),
        },
        "allocation": {
            "by_symbol": by_symbol,
            "by_direction": by_direction,
        },
        "performance": {
            "win_rate": win_rate,
            "profit_factor": _round(profit_factor),
            "expectancy": _round(expectancy),
            "average_win": _round(average_win),
            "average_loss": _round(average_loss),
            "largest_win": _round(largest_win),
            "largest_loss": _round(largest_loss),
            "average_rr": _round(average_rr),
            "max_drawdown": _round(max_drawdown),
        },
    }
