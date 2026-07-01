from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.core.database import SessionLocal
from app.models.trade import Trade

import csv
import io

router = APIRouter(
    prefix="/exports",
    tags=["Exports"]
)


@router.get("/trades/csv")
def export_trades_csv():

    db = SessionLocal()

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "id",
        "symbol",
        "direction",
        "entry_price",
        "stop_loss",
        "take_profit",
        "exit_price",
        "lot_size",
        "profit_money",
        "profit_pips",
        "risk_reward",
        "duration_minutes",
        "is_win",
        "session_name",
        "trading_system_id",
        "psychology_state_id",
        "tradingview_link",
        "screenshot_path",
        "notes"
    ])

    trades = db.query(Trade).order_by(Trade.id.desc()).all()

    for trade in trades:
        writer.writerow([
            trade.id,
            trade.symbol,
            trade.direction,
            trade.entry_price,
            trade.stop_loss,
            trade.take_profit,
            trade.exit_price,
            trade.lot_size,
            trade.profit_money,
            trade.profit_pips,
            trade.risk_reward,
            trade.duration_minutes,
            trade.is_win,
            trade.session_name,
            trade.trading_system_id,
            trade.psychology_state_id,
            trade.tradingview_link,
            trade.screenshot_path,
            trade.notes
        ])

    db.close()

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=trades_export.csv"
        }
    )