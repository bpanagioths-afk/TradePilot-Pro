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
