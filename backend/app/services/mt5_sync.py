from app.services.mt5.sync_service import sync


def sync_mt5_history(
    account_id: int,
):
    return sync(account_id)