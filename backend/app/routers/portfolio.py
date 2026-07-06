from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.schemas.portfolio import PortfolioSummary, PortfolioOverview
from app.services.portfolio_service import (
    get_portfolio_summary,
    get_portfolio_overview
)

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"]
)


@router.get("/summary", response_model=PortfolioSummary)
def portfolio_summary(
    db: Session = Depends(get_db)
):
    return get_portfolio_summary(db)


@router.get("/overview", response_model=PortfolioOverview)
def portfolio_overview(
    db: Session = Depends(get_db)
):
    return get_portfolio_overview(db)