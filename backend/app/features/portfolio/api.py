from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.features.portfolio.service import get_portfolio_dashboard
from app.models.user import User

router = APIRouter()


@router.get("/dashboard")
def portfolio_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_portfolio_dashboard(
        db,
        current_user.id,
    )


@router.get("/overview")
def portfolio_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_portfolio_dashboard(
        db,
        current_user.id,
    )