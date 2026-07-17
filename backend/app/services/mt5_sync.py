from app.services.mt5.sync_service import sync


def sync_mt5_history(
    account_id: int,
    user_id: int,
):
    return sync(
        account_id=account_id,
        user_id=user_id,
    )
