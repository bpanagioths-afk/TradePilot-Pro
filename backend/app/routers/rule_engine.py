from datetime import datetime

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.core.deps import (
    get_current_user,
    get_db,
)
from app.models.trade import Trade
from app.models.trading_plan import TradingPlan
from app.models.user import User
from app.services.rule_engine import (
    evaluate_trade,
)


router = APIRouter(
    prefix="/rule-engine",
    tags=["Rule Engine"],
)


def _get_user_default_plan(
    db: Session,
    user_id: int,
) -> TradingPlan | None:
    default_plan = (
        db.query(TradingPlan)
        .filter(
            TradingPlan.user_id == user_id,
            TradingPlan.is_default.is_(True),
        )
        .order_by(
            TradingPlan.id.desc()
        )
        .first()
    )

    if default_plan is not None:
        return default_plan

    return (
        db.query(TradingPlan)
        .filter(
            TradingPlan.user_id == user_id
        )
        .order_by(
            TradingPlan.id.desc()
        )
        .first()
    )


def _count_user_trades_on_trade_day(
    db: Session,
    *,
    user_id: int,
    trade: Trade,
) -> int:
    if trade.open_time is None:
        return 1

    trade_date = trade.open_time.date()

    day_start = datetime.combine(
        trade_date,
        datetime.min.time(),
    )

    day_end = datetime.combine(
        trade_date,
        datetime.max.time(),
    )

    return (
        db.query(Trade)
        .filter(
            Trade.user_id == user_id,
            Trade.open_time >= day_start,
            Trade.open_time <= day_end,
        )
        .count()
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

    return evaluate_trade(
        trade=FakeTrade(),
        trading_plan=FakeTradingPlan(),
        trades_today_count=3,
        has_high_impact_news=False,
    )


@router.get("/trade/{trade_id}")
def evaluate_real_trade(
    trade_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
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
        _get_user_default_plan(
            db,
            current_user.id,
        )
    )

    if trading_plan is None:
        raise HTTPException(
            status_code=404,
            detail=(
                "Trading plan not found "
                "for the current user"
            ),
        )

    trades_today_count = (
        _count_user_trades_on_trade_day(
            db,
            user_id=current_user.id,
            trade=trade,
        )
    )

    return evaluate_trade(
        trade=trade,
        trading_plan=trading_plan,
        trades_today_count=(
            trades_today_count
        ),
        has_high_impact_news=False,
    )