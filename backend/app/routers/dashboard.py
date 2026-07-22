from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db
from app.features.portfolio.engines.analytics_engine import (
    calculate_by_hour,
    calculate_by_psychology,
    calculate_by_symbol,
    calculate_by_system,
)
from app.features.portfolio.engines.movement_engine import (
    calculate_breakdown,
    calculate_unit_totals,
)
from app.models.trade import Trade
from app.models.user import User


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


def _get_trades(
    db: Session,
    user_id: int,
):
    return (
        db.query(Trade)
        .filter(Trade.user_id == user_id)
        .order_by(Trade.id)
        .all()
    )


def _build_summary(trades):
    total_trades = len(trades)

    wins = sum(
        1
        for trade in trades
        if trade.is_win == 1
    )

    losses = sum(
        1
        for trade in trades
        if trade.is_win == 0
    )

    win_rate = (
        round(
            wins / total_trades * 100,
            2,
        )
        if total_trades > 0
        else 0
    )

    total_profit = round(
        sum(
            float(trade.profit_money or 0)
            for trade in trades
        ),
        2,
    )

    movement_breakdown = calculate_breakdown(
        trades,
    )

    movement_totals = calculate_unit_totals(
        trades,
    )

    pips = movement_totals.get(
        "pips",
        {
            "total": 0,
            "average": 0,
            "trades": 0,
        },
    )

    points = movement_totals.get(
        "points",
        {
            "total": 0,
            "average": 0,
            "trades": 0,
        },
    )

    return {
        "total_trades": total_trades,
        "wins": wins,
        "losses": losses,
        "win_rate": win_rate,
        "total_profit": total_profit,
        "total_pips": pips["total"],
        "average_pips": pips["average"],
        "pips_trades": pips["trades"],
        "total_points": points["total"],
        "average_points": points["average"],
        "points_trades": points["trades"],
        "movement_breakdown": movement_breakdown,
    }


def _build_equity_curve(trades):
    equity = 0
    result = []

    for trade in trades:
        equity += float(
            trade.profit_money or 0
        )

        result.append({
            "trade_id": trade.id,
            "equity": round(
                equity,
                2,
            ),
        })

    return result


def _build_best_pair(trades):
    symbol_profit = {}

    for trade in trades:
        if not trade.symbol:
            continue

        symbol_profit[trade.symbol] = (
            symbol_profit.get(
                trade.symbol,
                0,
            )
            + float(
                trade.profit_money or 0
            )
        )

    if not symbol_profit:
        return None

    return max(
        symbol_profit,
        key=symbol_profit.get,
    )


@router.get("/summary")
def summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trades = _get_trades(
        db,
        current_user.id,
    )

    result = _build_summary(
        trades,
    )

    result["best_pair"] = _build_best_pair(
        trades,
    )

    return result


@router.get("/pairs")
def pair_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return calculate_by_symbol(
        _get_trades(
            db,
            current_user.id,
        ),
    )


@router.get("/hours")
def hour_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return calculate_by_hour(
        _get_trades(
            db,
            current_user.id,
        ),
    )


@router.get("/systems")
def system_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return calculate_by_system(
        _get_trades(
            db,
            current_user.id,
        ),
    )


@router.get("/psychology")
def psychology_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return calculate_by_psychology(
        _get_trades(
            db,
            current_user.id,
        ),
    )


@router.get("/equity")
def equity_curve(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return _build_equity_curve(
        _get_trades(
            db,
            current_user.id,
        ),
    )


@router.get("/full")
def dashboard_full(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trades = _get_trades(
        db,
        current_user.id,
    )

    summary_data = _build_summary(
        trades,
    )

    summary_data["best_pair"] = _build_best_pair(
        trades,
    )

    return {
        "summary": summary_data,
        "equity": _build_equity_curve(
            trades,
        ),
        "pairs": calculate_by_symbol(
            trades,
        ),
    }