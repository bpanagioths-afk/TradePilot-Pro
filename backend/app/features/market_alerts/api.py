from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.deps import get_current_user
from app.features.market_alerts.providers.forex_factory import (
    ProviderRequestError,
)
from app.features.market_alerts.schemas import MarketAlertsResponse
from app.features.market_alerts.service import get_market_alerts
from app.models.user import User


router = APIRouter(
    prefix="/market-alerts",
    tags=["Market Alerts"],
)


@router.get(
    "",
    response_model=MarketAlertsResponse,
)
def get_market_alerts_endpoint(
    from_date: date | None = Query(default=None),
    to_date: date | None = Query(default=None),
    currencies: str | None = Query(default=None),
    impacts: str | None = Query(default=None),
    categories: str | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=200),
    current_user: User = Depends(get_current_user),
):
    try:
        return get_market_alerts(
            current_user=current_user,
            from_date=from_date,
            to_date=to_date,
            currencies=currencies,
            impacts=impacts,
            categories=categories,
            limit=limit,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    except ProviderRequestError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(exc),
        ) from exc
