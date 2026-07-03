from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.models.trading_plan import TradingPlan
from app.schemas.trading_plan import (
    TradingPlanCreate,
    TradingPlanUpdate
)

router = APIRouter(
    prefix="/trading-plans",
    tags=["Trading Plans"]
)


@router.get("/")
def get_trading_plans(
    db: Session = Depends(get_db)
):

    return db.query(TradingPlan).order_by(TradingPlan.id.desc()).all()


@router.post("/")
def create_trading_plan(
    plan_data: TradingPlanCreate,
    db: Session = Depends(get_db)
):

    plan = TradingPlan(**plan_data.model_dump())

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return plan


@router.get("/{plan_id}")
def get_trading_plan(
    plan_id: int,
    db: Session = Depends(get_db)
):

    plan = db.query(TradingPlan).filter(
        TradingPlan.id == plan_id
    ).first()

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Trading plan not found"
        )

    return plan


@router.put("/{plan_id}")
def update_trading_plan(
    plan_id: int,
    plan_data: TradingPlanUpdate,
    db: Session = Depends(get_db)
):

    plan = db.query(TradingPlan).filter(
        TradingPlan.id == plan_id
    ).first()

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Trading plan not found"
        )

    for field, value in plan_data.model_dump().items():
        setattr(plan, field, value)

    db.commit()
    db.refresh(plan)

    return plan


@router.delete("/{plan_id}")
def delete_trading_plan(
    plan_id: int,
    db: Session = Depends(get_db)
):

    plan = db.query(TradingPlan).filter(
        TradingPlan.id == plan_id
    ).first()

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Trading plan not found"
        )

    db.delete(plan)
    db.commit()

    return {
        "message": "Trading plan deleted successfully"
    }