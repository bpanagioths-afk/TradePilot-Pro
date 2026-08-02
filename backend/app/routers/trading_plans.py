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
from app.models.trading_plan import TradingPlan
from app.models.user import User
from app.schemas.trading_plan import (
    TradingPlanCreate,
    TradingPlanUpdate,
)


router = APIRouter(
    prefix="/trading-plans",
    tags=["Trading Plans"],
)


def _get_owned_plan(
    db: Session,
    *,
    plan_id: int,
    user_id: int,
) -> TradingPlan:
    plan = (
        db.query(TradingPlan)
        .filter(
            TradingPlan.id == plan_id,
            TradingPlan.user_id == user_id,
        )
        .first()
    )

    if plan is None:
        raise HTTPException(
            status_code=404,
            detail="Trading plan not found",
        )

    return plan


def _clear_other_default_plans(
    db: Session,
    *,
    user_id: int,
    excluded_plan_id: int | None = None,
) -> None:
    query = (
        db.query(TradingPlan)
        .filter(
            TradingPlan.user_id == user_id,
            TradingPlan.is_default.is_(True),
        )
    )

    if excluded_plan_id is not None:
        query = query.filter(
            TradingPlan.id != excluded_plan_id,
        )

    query.update(
        {
            TradingPlan.is_default: False,
        },
        synchronize_session=False,
    )


@router.get("/")
def get_trading_plans(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return (
        db.query(TradingPlan)
        .filter(
            TradingPlan.user_id
            == current_user.id
        )
        .order_by(
            TradingPlan.is_default.desc(),
            TradingPlan.id.desc(),
        )
        .all()
    )


@router.post("/")
def create_trading_plan(
    plan_data: TradingPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    existing_plan_count = (
        db.query(TradingPlan)
        .filter(
            TradingPlan.user_id
            == current_user.id
        )
        .count()
    )

    payload = plan_data.model_dump()

    should_be_default = (
        bool(payload.get("is_default"))
        or existing_plan_count == 0
    )

    payload["is_default"] = (
        should_be_default
    )

    if should_be_default:
        _clear_other_default_plans(
            db,
            user_id=current_user.id,
        )

    plan = TradingPlan(
        **payload,
        user_id=current_user.id,
    )

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return plan


@router.get("/{plan_id}")
def get_trading_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return _get_owned_plan(
        db,
        plan_id=plan_id,
        user_id=current_user.id,
    )


@router.put("/{plan_id}")
def update_trading_plan(
    plan_id: int,
    plan_data: TradingPlanUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    plan = _get_owned_plan(
        db,
        plan_id=plan_id,
        user_id=current_user.id,
    )

    payload = plan_data.model_dump(
        exclude_unset=True
    )

    if payload.get("is_default") is True:
        _clear_other_default_plans(
            db,
            user_id=current_user.id,
            excluded_plan_id=plan.id,
        )

    for field, value in payload.items():
        setattr(
            plan,
            field,
            value,
        )

    plan.user_id = current_user.id

    db.commit()
    db.refresh(plan)

    return plan


@router.delete("/{plan_id}")
def delete_trading_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    plan = _get_owned_plan(
        db,
        plan_id=plan_id,
        user_id=current_user.id,
    )

    was_default = bool(
        plan.is_default
    )

    db.delete(plan)
    db.flush()

    if was_default:
        replacement_plan = (
            db.query(TradingPlan)
            .filter(
                TradingPlan.user_id
                == current_user.id
            )
            .order_by(
                TradingPlan.id.desc()
            )
            .first()
        )

        if replacement_plan is not None:
            replacement_plan.is_default = True

    db.commit()

    return {
        "message": (
            "Trading plan deleted successfully"
        )
    }