from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.features.portfolio.service import get_portfolio_dashboard

router = APIRouter()


@router.get("/dashboard")
def portfolio_dashboard(
    db: Session = Depends(get_db)
):
    return get_portfolio_dashboard(db)

@router.get("/overview")
def portfolio_overview(
    db: Session = Depends(get_db)
):
    return get_portfolio_dashboard(db)