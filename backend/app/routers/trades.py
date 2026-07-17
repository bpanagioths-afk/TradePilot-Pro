from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session
import os
import shutil
from uuid import uuid4

from app.core.deps import (
    get_current_user,
    get_db,
)
from app.models.trade import Trade
from app.models.user import User
from app.schemas.trade import TradeCreate
from app.utils.trade_stats import (
    calculate_duration,
    calculate_pips,
    calculate_rr,
)

router = APIRouter(
    prefix="/trades",
    tags=["Trades"],
)


def apply_trade_calculations(trade_obj):
    if trade_obj.exit_price is not None:
        trade_obj.profit_pips = calculate_pips(
            trade_obj.direction,
            trade_obj.entry_price,
            trade_obj.exit_price,
        )

        trade_obj.is_win = 1 if trade_obj.profit_pips > 0 else 0

    if trade_obj.stop_loss is not None and trade_obj.take_profit is not None:
        trade_obj.risk_reward = calculate_rr(
            trade_obj.entry_price,
            trade_obj.stop_loss,
            trade_obj.take_profit,
        )

    if trade_obj.open_time is not None and trade_obj.close_time is not None:
        trade_obj.duration_minutes = calculate_duration(
            trade_obj.open_time,
            trade_obj.close_time,
        )


@router.post("/")
def create_trade(
    trade: TradeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_trade = Trade(
        user_id=current_user.id,
        symbol=trade.symbol,
        direction=trade.direction,
        entry_price=trade.entry_price,
        stop_loss=trade.stop_loss,
        take_profit=trade.take_profit,
        exit_price=trade.exit_price,
        lot_size=trade.lot_size,
        profit_money=trade.profit_money,
        open_time=trade.open_time,
        close_time=trade.close_time,
        session_name=trade.session_name,
        trading_system_id=trade.trading_system_id,
        psychology_state_id=trade.psychology_state_id,
        tradingview_link=trade.tradingview_link,
        screenshot_path=trade.screenshot_path,
        notes=trade.notes,
    )

    apply_trade_calculations(new_trade)

    db.add(new_trade)
    db.commit()
    db.refresh(new_trade)

    return new_trade


@router.get("/")
def get_trades(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Trade)
        .filter(Trade.user_id == current_user.id)
        .order_by(Trade.id.desc())
        .all()
    )


@router.get("/{trade_id}")
def get_trade(
    trade_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trade = (
        db.query(Trade)
        .filter(
            Trade.id == trade_id,
            Trade.user_id == current_user.id,
        )
        .first()
    )

    if not trade:
        raise HTTPException(
            status_code=404,
            detail="Trade not found",
        )

    return trade


@router.put("/{trade_id}")
def update_trade(
    trade_id: int,
    trade_data: TradeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trade = (
        db.query(Trade)
        .filter(
            Trade.id == trade_id,
            Trade.user_id == current_user.id,
        )
        .first()
    )

    if not trade:
        raise HTTPException(
            status_code=404,
            detail="Trade not found",
        )

    trade.symbol = trade_data.symbol
    trade.direction = trade_data.direction
    trade.entry_price = trade_data.entry_price
    trade.stop_loss = trade_data.stop_loss
    trade.take_profit = trade_data.take_profit
    trade.exit_price = trade_data.exit_price
    trade.lot_size = trade_data.lot_size
    trade.profit_money = trade_data.profit_money
    trade.open_time = trade_data.open_time
    trade.close_time = trade_data.close_time
    trade.session_name = trade_data.session_name
    trade.trading_system_id = trade_data.trading_system_id
    trade.psychology_state_id = trade_data.psychology_state_id
    trade.tradingview_link = trade_data.tradingview_link
    trade.screenshot_path = trade_data.screenshot_path
    trade.notes = trade_data.notes

    apply_trade_calculations(trade)

    db.commit()
    db.refresh(trade)

    return trade


@router.post("/{trade_id}/screenshot")
def upload_screenshot(
    trade_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trade = (
        db.query(Trade)
        .filter(
            Trade.id == trade_id,
            Trade.user_id == current_user.id,
        )
        .first()
    )

    if not trade:
        raise HTTPException(
            status_code=404,
            detail="Trade not found",
        )

    upload_dir = "uploads/screenshots"

    os.makedirs(upload_dir, exist_ok=True)

    file_extension = os.path.splitext(file.filename)[1]

    allowed_extensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    ]

    if file_extension.lower() not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Unsupported image format",
        )

    new_filename = f"{trade_id}_{uuid4().hex}{file_extension}"

    file_path = os.path.join(
        upload_dir,
        new_filename,
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    trade.screenshot_path = f"/uploads/screenshots/{new_filename}"

    db.commit()
    db.refresh(trade)

    return {
        "message": "Screenshot uploaded successfully",
        "screenshot_path": trade.screenshot_path,
    }


@router.delete("/{trade_id}")
def delete_trade(
    trade_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trade = (
        db.query(Trade)
        .filter(
            Trade.id == trade_id,
            Trade.user_id == current_user.id,
        )
        .first()
    )

    if not trade:
        raise HTTPException(
            status_code=404,
            detail="Trade not found",
        )

    db.delete(trade)
    db.commit()

    return {
        "message": "Trade deleted successfully",
    }
