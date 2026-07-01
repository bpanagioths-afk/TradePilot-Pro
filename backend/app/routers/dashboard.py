from fastapi import APIRouter
from sqlalchemy import func, extract

from app.core.database import SessionLocal
from app.models.trade import Trade

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def summary():

    db = SessionLocal()

    try:
        total = db.query(Trade).count()

        wins = db.query(Trade).filter(
            Trade.is_win == 1
        ).count()

        losses = total - wins

        win_rate = 0

        if total > 0:
            win_rate = round(
                wins / total * 100,
                2
            )

        total_pips = db.query(
            func.sum(Trade.profit_pips)
        ).scalar() or 0

        total_profit = db.query(
            func.sum(Trade.profit_money)
        ).scalar() or 0

        average_pips = 0

        if total > 0:
            average_pips = round(
                total_pips / total,
                2
            )

        best_pair = db.query(
            Trade.symbol,
            func.sum(Trade.profit_pips)
        ).group_by(
            Trade.symbol
        ).order_by(
            func.sum(Trade.profit_pips).desc()
        ).first()

        return {
            "total_trades": total,
            "wins": wins,
            "losses": losses,
            "win_rate": win_rate,
            "total_pips": round(total_pips, 2),
            "average_pips": average_pips,
            "total_profit": round(total_profit, 2),
            "best_pair": best_pair[0] if best_pair else None
        }

    finally:
        db.close()


@router.get("/pairs")
def pair_statistics():

    db = SessionLocal()

    try:
        rows = db.query(
            Trade.symbol,
            func.count(Trade.id),
            func.sum(Trade.profit_pips)
        ).group_by(
            Trade.symbol
        ).all()

        result = []

        for row in rows:
            result.append({
                "symbol": row[0],
                "trades": row[1],
                "total_pips": round(row[2] or 0, 2)
            })

        return result

    finally:
        db.close()


@router.get("/psychology")
def psychology_statistics():

    db = SessionLocal()

    try:
        rows = db.query(
            Trade.psychology_state_id,
            func.count(Trade.id),
            func.sum(Trade.profit_pips)
        ).group_by(
            Trade.psychology_state_id
        ).all()

        result = []

        for row in rows:
            result.append({
                "psychology_state_id": row[0],
                "trades": row[1],
                "total_pips": round(row[2] or 0, 2)
            })

        return result

    finally:
        db.close()


@router.get("/systems")
def system_statistics():

    db = SessionLocal()

    try:
        rows = db.query(
            Trade.trading_system_id,
            func.count(Trade.id),
            func.sum(Trade.profit_pips)
        ).group_by(
            Trade.trading_system_id
        ).all()

        result = []

        for row in rows:
            result.append({
                "trading_system_id": row[0],
                "trades": row[1],
                "total_pips": round(row[2] or 0, 2)
            })

        return result

    finally:
        db.close()


@router.get("/hours")
def hour_statistics():

    db = SessionLocal()

    try:
        rows = db.query(
            extract("hour", Trade.open_time),
            func.count(Trade.id),
            func.avg(Trade.profit_pips)
        ).filter(
            Trade.open_time.isnot(None)
        ).group_by(
            extract("hour", Trade.open_time)
        ).order_by(
            extract("hour", Trade.open_time)
        ).all()

        result = []

        for row in rows:
            if row[0] is None:
                continue

            result.append({
                "hour": int(row[0]),
                "trades": row[1],
                "avg_pips": round(float(row[2] or 0), 2)
            })

        return result

    finally:
        db.close()


@router.get("/equity")
def equity_curve():

    db = SessionLocal()

    try:
        trades = db.query(
            Trade
        ).order_by(
            Trade.id
        ).all()

        equity = 0

        result = []

        for trade in trades:
            equity += trade.profit_money or 0

            result.append({
                "trade_id": trade.id,
                "equity": round(equity, 2)
            })

        return result

    finally:
        db.close()

@router.get("/full")
def dashboard_full():

    db = SessionLocal()

    try:

        total = db.query(Trade).count()

        wins = db.query(
            Trade
        ).filter(
            Trade.is_win == 1
        ).count()

        losses = total - wins

        win_rate = 0

        if total > 0:
            win_rate = round(
                wins / total * 100,
                2
            )

        total_profit = db.query(
            func.sum(Trade.profit_money)
        ).scalar() or 0

        total_pips = db.query(
            func.sum(Trade.profit_pips)
        ).scalar() or 0

        equity = 0

        equity_curve = []

        trades = db.query(
            Trade
        ).order_by(
            Trade.id
        ).all()

        for trade in trades:

            equity += trade.profit_money or 0

            equity_curve.append({
                "trade_id": trade.id,
                "equity": round(equity, 2)
            })

        pairs = []

        rows = db.query(
            Trade.symbol,
            func.count(Trade.id),
            func.sum(Trade.profit_pips)
        ).group_by(
            Trade.symbol
        ).all()

        for row in rows:

            pairs.append({
                "symbol": row[0],
                "trades": row[1],
                "total_pips": round(row[2] or 0, 2)
            })

        return {

            "summary": {

                "total_trades": total,

                "wins": wins,

                "losses": losses,

                "win_rate": win_rate,

                "total_profit": round(total_profit, 2),

                "total_pips": round(total_pips, 2)

            },

            "equity": equity_curve,

            "pairs": pairs

        }

    finally:

        db.close()