from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.mt5_account import MT5Account


def get_mt5_sync_status(
    db: Session,
    account_id: int,
    user_id: int,
):
    account = (
        db.query(MT5Account)
        .filter(
            MT5Account.id == account_id,
            MT5Account.user_id == user_id,
        )
        .first()
    )

    if account is None:
        return None

    next_sync = None
    status = "disabled"

    if account.auto_sync and account.is_active:
        status = "waiting"

        if account.last_sync is not None:
            next_sync = account.last_sync + timedelta(
                minutes=account.sync_interval_minutes,
            )

            if next_sync <= datetime.now():
                status = "due"
        else:
            status = "ready"

    return {
        "account_id": account.id,
        "enabled": account.auto_sync,
        "is_active": account.is_active,
        "interval_minutes": account.sync_interval_minutes,
        "last_sync": account.last_sync,
        "next_sync": next_sync,
        "status": status,
        "message": get_sync_status_message(
            account.auto_sync,
            account.is_active,
            status,
        ),
    }


def get_sync_status_message(
    auto_sync: bool,
    is_active: bool,
    status: str,
):
    if not is_active:
        return "Account is disabled."

    if not auto_sync:
        return "Auto Sync is turned off."

    if status == "ready":
        return "Auto Sync is ready. No previous sync was found."

    if status == "due":
        return "Auto Sync is due and ready to run."

    return "Auto Sync is waiting for the next scheduled sync."