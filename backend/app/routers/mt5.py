from fastapi import (
    APIRouter,
    Query,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.services.mt5_sync import (
    sync_mt5_history,
)

from app.services.sync_engine import (
    get_mt5_sync_status,
)

from app.services.mt5_account_service import (
    get_accounts,
    create_account,
    update_account,
    disable_account,
    get_mt5_account_summary,
    get_live_mt5_open_positions,
    get_live_mt5_pending_orders,
)
from app.schemas.mt5_account import (
    MT5AccountCreate,
    MT5AccountUpdate,
    MT5AccountResponse,
)

router = APIRouter(
    prefix="/mt5",
    tags=["MT5"],
)


@router.post("/sync")
def sync_mt5(
    account_id: int = Query(...),
):
    return sync_mt5_history(account_id)


@router.get("/status")
def mt5_status():
    return {
        "service": "MT5 Sync",
        "status": "ready",
    }


@router.get("/open-positions")
def read_mt5_open_positions():
    return get_live_mt5_open_positions()

@router.get("/pending-orders")
def read_mt5_pending_orders():
    return get_live_mt5_pending_orders()

@router.get("/accounts", response_model=list[MT5AccountResponse])
def get_mt5_accounts(
    db: Session = Depends(get_db),
):
    return get_accounts(db)


@router.post("/accounts", response_model=MT5AccountResponse)
def create_mt5_account(
    data: MT5AccountCreate,
    db: Session = Depends(get_db),
):
    return create_account(
        db,
        data,
    )


@router.put("/accounts/{account_id}", response_model=MT5AccountResponse)
def update_mt5_account(
    account_id: int,
    data: MT5AccountUpdate,
    db: Session = Depends(get_db),
):
    account = update_account(
        db,
        account_id,
        data,
    )

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="MT5 account not found",
        )

    return account


@router.delete("/accounts/{account_id}", response_model=MT5AccountResponse)
def disable_mt5_account(
    account_id: int,
    db: Session = Depends(get_db),
):
    account = disable_account(
        db,
        account_id,
    )

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="MT5 account not found",
        )

    return account


@router.get("/accounts/{account_id}/summary")
def read_mt5_account_summary(
    account_id: int,
    db: Session = Depends(get_db),
):
    summary = get_mt5_account_summary(
        db,
        account_id,
    )

    if summary is None:
        raise HTTPException(
            status_code=404,
            detail="MT5 account not found",
        )

    return summary


@router.get("/accounts/{account_id}/sync-status")
def read_mt5_sync_status(
    account_id: int,
    db: Session = Depends(get_db),
):
    sync_status = get_mt5_sync_status(
        db,
        account_id,
    )

    if sync_status is None:
        raise HTTPException(
            status_code=404,
            detail="MT5 account not found",
        )

    return sync_status