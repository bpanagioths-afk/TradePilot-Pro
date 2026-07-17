import csv
import io

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.core.database import SessionLocal
from app.core.deps import get_current_user
from app.models.trade import Trade
from app.models.user import User
from app.reports.pdf_report import build_trades_pdf_report

router = APIRouter(
    prefix="/exports",
    tags=["Exports"],
)


@router.get("/trades/csv")
def export_trades_csv(
    current_user: User = Depends(get_current_user),
):
    db = SessionLocal()

    try:
        trades = (
            db.query(Trade)
            .filter(Trade.user_id == current_user.id)
            .order_by(Trade.id.desc())
            .all()
        )

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
            "notes",
        ])

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
                trade.notes,
            ])

        output.seek(0)

        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={
                "Content-Disposition": (
                    "attachment; filename=trades_export.csv"
                ),
            },
        )

    finally:
        db.close()


@router.get("/trades/pdf")
def export_trades_pdf(
    current_user: User = Depends(get_current_user),
):
    db = SessionLocal()

    try:
        trades = (
            db.query(Trade)
            .filter(Trade.user_id == current_user.id)
            .order_by(Trade.id.desc())
            .all()
        )

        pdf_buffer = build_trades_pdf_report(trades)

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": (
                    "attachment; filename=tradepilot_report.pdf"
                ),
            },
        )

    finally:
        db.close()
