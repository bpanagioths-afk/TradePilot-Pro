from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.portfolio import PortfolioSummary, PortfolioOverview
from app.services.portfolio_service import (
    get_portfolio_summary,
    get_portfolio_overview,
)

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"],
)


@router.get("/summary", response_model=PortfolioSummary)
def portfolio_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_portfolio_summary(
        db,
        current_user.id,
    )


@router.get("/overview", response_model=PortfolioOverview)
def portfolio_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_portfolio_overview(
        db,
        current_user.id,
    )