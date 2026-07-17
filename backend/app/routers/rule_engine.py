from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db
from app.models.trade import Trade
from app.models.trading_plan import TradingPlan
from app.models.user import User
from app.services.rule_engine import evaluate_trade

router = APIRouter(
    prefix="/rule-engine",
    tags=["Rule Engine"],
)


@router.get("/test")
def test_rule_engine():
    class FakeTrade:
        risk_reward = 1.5
        session_name = "Asia"

    class FakeTradingPlan:
        minimum_rr = 2
        session_asia = False
        session_london = True
        session_newyork = True
        session_overlap = True
        maximum_trades_day = 2

    result = evaluate_trade(
        trade=FakeTrade(),
        trading_plan=FakeTradingPlan(),
        trades_today_count=3,
        has_high_impact_news=False,
    )

    return result


@router.get("/trade/{trade_id}")
def evaluate_real_trade(
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

    if trade is None:
        raise HTTPException(
            status_code=404,
            detail="Trade not found",
        )

    trading_plan = (
        db.query(TradingPlan)
        .filter(
            TradingPlan.user_id == current_user.id,
            TradingPlan.is_default.is_(True),
        )
        .first()
    )

    if trading_plan is None:
        raise HTTPException(
            status_code=404,
            detail="Default trading plan not found",
        )

    result = evaluate_trade(
        trade=trade,
        trading_plan=trading_plan,
        trades_today_count=1,
        has_high_impact_news=False,
    )

    return result
