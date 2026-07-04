from sqlalchemy.orm import Session

from app.models.mt5_account import MT5Account

from app.schemas.mt5_account import (
    MT5AccountCreate,
    MT5AccountUpdate
)

def get_accounts(
    db: Session
):

    return db.query(
        MT5Account
    ).all()

def create_account(

    db: Session,

    data: MT5AccountCreate

):



    account = MT5Account(

        user_id=data.user_id,

        account_name=data.account_name,

        broker=data.broker,

        login=data.login,

        server=data.server,

        is_active=True

    )

    db.add(account)

    db.commit()

    db.refresh(account)

    return account

def update_account(

    db: Session,

    account_id: int,

    data

):

    account = db.query(
        MT5Account
    ).filter(
        MT5Account.id == account_id
    ).first()

    if account is None:

        return None

    update_data = data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():

        setattr(
            account,
            field,
            value
        )

    db.commit()

    db.refresh(account)

    return account


def disable_account(

    db: Session,

    account_id: int

):

    account = db.query(
        MT5Account
    ).filter(
        MT5Account.id == account_id
    ).first()

    if account is None:

        return None

    account.is_active = False

    db.commit()

    db.refresh(account)

    return account
from app.models.trade import Trade
from app.schemas.mt5_account import MT5AccountSummary


def get_mt5_account_summary(db: Session, account_id: int):
    account = get_mt5_account(db, account_id)

    if not account:
        return None

    imported_trades_count = (
        db.query(Trade)
        .filter(
            Trade.mt5_account_id == account_id,
            Trade.imported_from_mt5 == True,
            Trade.is_archived == False,
        )
        .count()
    )

    open_positions = (
        db.query(Trade)
        .filter(
            Trade.mt5_account_id == account_id,
            Trade.imported_from_mt5 == True,
            Trade.is_archived == False,
            Trade.close_time == None,
        )
        .count()
    )

    connection_status = "disabled"

    if account.is_active:
        connection_status = "ready"

    return MT5AccountSummary(
        account_id=account.id,
        account_name=account.account_name,
        broker=account.broker,
        login=account.login,
        server=account.server,
        is_active=account.is_active,
        auto_sync=account.auto_sync,
        sync_interval_minutes=account.sync_interval_minutes,
        balance=None,
        equity=None,
        floating_profit_loss=None,
        open_positions=open_positions,
        imported_trades_count=imported_trades_count,
        last_sync=account.last_sync,
        connection_status=connection_status,
        health_message="Account summary endpoint is ready. Live MT5 metrics will be connected in the next Sprint step.",
    )

