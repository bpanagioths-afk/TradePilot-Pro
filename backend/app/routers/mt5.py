from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    status,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.mt5_account import MT5Account
from app.models.user import User
from app.schemas.mt5_account import (
    MT5AccountCreate,
    MT5AccountResponse,
    MT5AccountUpdate,
)
from app.services.mt5_account_service import (
    create_account,
    disable_account,
    get_accounts,
    get_live_mt5_account_health,
    get_live_mt5_connection_health,
    get_live_mt5_open_positions,
    get_live_mt5_pending_orders,
    get_live_mt5_today_performance,
    get_mt5_account_summary,
    update_account,
)
from app.services.mt5_sync import sync_mt5_history
from app.services.sync_engine import get_mt5_sync_status


router = APIRouter(
    prefix="/mt5",
    tags=["MT5"],
)


def _get_owned_active_account(
    db: Session,
    account_id: int,
    user_id: int,
) -> MT5Account:
    account = (
        db.query(MT5Account)
        .filter(
            MT5Account.id == account_id,
            MT5Account.user_id == user_id,
            MT5Account.is_active == True,
        )
        .first()
    )

    if account is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Active MT5 account not found",
        )

    return account


def _verify_terminal_matches_account(
    account: MT5Account,
) -> dict:
    connection_health = get_live_mt5_connection_health()

    if not connection_health.get("connected"):
        return connection_health

    terminal_login = connection_health.get("account_login")

    if str(terminal_login) != str(account.login):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "The open MT5 terminal does not match the selected "
                "MT5 account"
            ),
        )

    return connection_health


@router.post("/sync")
def sync_mt5(
    account_id: int = Query(...),
    current_user: User = Depends(get_current_user),
):
    return sync_mt5_history(
        account_id=account_id,
        user_id=current_user.id,
    )


@router.get("/status")
def mt5_status(
    current_user: User = Depends(get_current_user),
):
    return {
        "service": "MT5 Sync",
        "status": "ready",
    }


@router.get("/open-positions")
def read_mt5_open_positions(
    account_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = _get_owned_active_account(
        db=db,
        account_id=account_id,
        user_id=current_user.id,
    )
    connection_health = _verify_terminal_matches_account(account)

    if not connection_health.get("connected"):
        return {
            "connected": False,
            "positions": [],
            "total_positions": 0,
            "floating_profit_loss": 0.0,
            "message": connection_health.get("message"),
        }

    return get_live_mt5_open_positions()


@router.get("/pending-orders")
def read_mt5_pending_orders(
    account_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = _get_owned_active_account(
        db=db,
        account_id=account_id,
        user_id=current_user.id,
    )
    connection_health = _verify_terminal_matches_account(account)

    if not connection_health.get("connected"):
        return {
            "connected": False,
            "orders": [],
            "total_orders": 0,
            "message": connection_health.get("message"),
        }

    return get_live_mt5_pending_orders()


@router.get("/account-health")
def read_mt5_account_health(
    account_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = _get_owned_active_account(
        db=db,
        account_id=account_id,
        user_id=current_user.id,
    )
    connection_health = _verify_terminal_matches_account(account)

    if not connection_health.get("connected"):
        return {
            "connected": False,
            "balance": None,
            "equity": None,
            "margin": None,
            "free_margin": None,
            "margin_level": None,
            "leverage": None,
            "currency": None,
            "server": None,
            "company": None,
            "login": None,
            "message": connection_health.get("message"),
        }

    return get_live_mt5_account_health()


@router.get("/today-performance")
def read_mt5_today_performance(
    account_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = _get_owned_active_account(
        db=db,
        account_id=account_id,
        user_id=current_user.id,
    )
    connection_health = _verify_terminal_matches_account(account)

    if not connection_health.get("connected"):
        return {
            "connected": False,
            "profit_today": 0.0,
            "trades_today": 0,
            "winning_trades_today": 0,
            "losing_trades_today": 0,
            "win_rate_today": 0.0,
            "lots_today": 0.0,
            "commission_today": 0.0,
            "swap_today": 0.0,
            "message": connection_health.get("message"),
        }

    return get_live_mt5_today_performance()


@router.get("/connection-health")
def read_mt5_connection_health(
    account_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = _get_owned_active_account(
        db=db,
        account_id=account_id,
        user_id=current_user.id,
    )
    return _verify_terminal_matches_account(account)


@router.get(
    "/accounts",
    response_model=list[MT5AccountResponse],
)
def get_mt5_accounts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_accounts(
        db=db,
        user_id=current_user.id,
    )


@router.post(
    "/accounts",
    response_model=MT5AccountResponse,
)
def create_mt5_account(
    data: MT5AccountCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_account(
        db=db,
        data=data,
        user_id=current_user.id,
    )


@router.put(
    "/accounts/{account_id}",
    response_model=MT5AccountResponse,
)
def update_mt5_account(
    account_id: int,
    data: MT5AccountUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = update_account(
        db=db,
        account_id=account_id,
        data=data,
        user_id=current_user.id,
    )

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="MT5 account not found",
        )

    return account


@router.delete(
    "/accounts/{account_id}",
    response_model=MT5AccountResponse,
)
def disable_mt5_account(
    account_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        account = disable_account(
            db=db,
            account_id=account_id,
            user_id=current_user.id,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
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
    current_user: User = Depends(get_current_user),
):
    summary = get_mt5_account_summary(
        db=db,
        account_id=account_id,
        user_id=current_user.id,
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
    current_user: User = Depends(get_current_user),
):
    sync_status = get_mt5_sync_status(
        db=db,
        account_id=account_id,
        user_id=current_user.id,
    )

    if sync_status is None:
        raise HTTPException(
            status_code=404,
            detail="MT5 account not found",
        )

    return sync_status
