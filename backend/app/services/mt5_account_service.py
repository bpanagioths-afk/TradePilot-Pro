from sqlalchemy.orm import Session

try:
    import MetaTrader5 as mt5
except ImportError:
    mt5 = None

from app.models.mt5_account import MT5Account
from app.models.trade import Trade

from app.schemas.mt5_account import (
    MT5AccountCreate,
    MT5AccountUpdate,
    MT5AccountSummary,
)


def get_accounts(db: Session):

    return db.query(MT5Account).all()


def create_account(db: Session, data: MT5AccountCreate):

    account = MT5Account(
        user_id=data.user_id,
        account_name=data.account_name,
        broker=data.broker,
        login=data.login,
        server=data.server,
        is_active=True,
    )

    db.add(account)
    db.commit()
    db.refresh(account)

    return account


def update_account(db: Session, account_id: int, data: MT5AccountUpdate):

    account = (
        db.query(MT5Account)
        .filter(MT5Account.id == account_id)
        .first()
    )

    if account is None:
        return None

    update_data = data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(account, field, value)

    db.commit()
    db.refresh(account)

    return account


def disable_account(db: Session, account_id: int):

    account = (
        db.query(MT5Account)
        .filter(MT5Account.id == account_id)
        .first()
    )

    if account is None:
        return None

    account.is_active = False

    db.commit()
    db.refresh(account)

    return account


def get_live_mt5_metrics():

    if mt5 is None:
        return {
            "connected": False,
            "balance": None,
            "equity": None,
            "floating_profit_loss": None,
            "open_positions": 0,
            "message": "MetaTrader5 Python package is not installed.",
        }

    initialized = mt5.initialize()

    if not initialized:
        return {
            "connected": False,
            "balance": None,
            "equity": None,
            "floating_profit_loss": None,
            "open_positions": 0,
            "message": f"MT5 terminal connection failed: {mt5.last_error()}",
        }

    try:
        account_info = mt5.account_info()

        if account_info is None:
            return {
                "connected": False,
                "balance": None,
                "equity": None,
                "floating_profit_loss": None,
                "open_positions": 0,
                "message": f"MT5 account info unavailable: {mt5.last_error()}",
            }

        positions = mt5.positions_get()

        open_positions = 0
        floating_profit_loss = 0.0

        if positions is not None:
            open_positions = len(positions)
            floating_profit_loss = sum(position.profit for position in positions)

        return {
            "connected": True,
            "balance": float(account_info.balance),
            "equity": float(account_info.equity),
            "floating_profit_loss": float(floating_profit_loss),
            "open_positions": open_positions,
            "message": "MT5 live metrics loaded successfully.",
        }

    finally:
        mt5.shutdown()

def get_live_mt5_open_positions():

    if mt5 is None:
        return {
            "connected": False,
            "positions": [],
            "total_positions": 0,
            "floating_profit_loss": 0.0,
            "message": "MetaTrader5 Python package is not installed.",
        }

    initialized = mt5.initialize()

    if not initialized:
        return {
            "connected": False,
            "positions": [],
            "total_positions": 0,
            "floating_profit_loss": 0.0,
            "message": f"MT5 terminal connection failed: {mt5.last_error()}",
        }

    try:
        positions = mt5.positions_get()

        if positions is None:
            return {
                "connected": False,
                "positions": [],
                "total_positions": 0,
                "floating_profit_loss": 0.0,
                "message": f"MT5 open positions unavailable: {mt5.last_error()}",
            }

        open_positions = []

        for position in positions:
            position_type = "BUY" if position.type == mt5.POSITION_TYPE_BUY else "SELL"

            open_positions.append(
                {
                    "ticket": position.ticket,
                    "symbol": position.symbol,
                    "type": position_type,
                    "volume": float(position.volume),
                    "price_open": float(position.price_open),
                    "price_current": float(position.price_current),
                    "stop_loss": float(position.sl),
                    "take_profit": float(position.tp),
                    "profit": float(position.profit),
                    "swap": float(position.swap),
                    "time": position.time,
                    "comment": position.comment,
                }
            )

        floating_profit_loss = sum(position["profit"] for position in open_positions)

        return {
            "connected": True,
            "positions": open_positions,
            "total_positions": len(open_positions),
            "floating_profit_loss": float(floating_profit_loss),
            "message": "MT5 open positions loaded successfully.",
        }

    finally:
        mt5.shutdown()
def get_live_mt5_pending_orders():

    if mt5 is None:
        return {
            "connected": False,
            "orders": [],
            "total_orders": 0,
            "message": "MetaTrader5 Python package is not installed.",
        }

    initialized = mt5.initialize()

    if not initialized:
        return {
            "connected": False,
            "orders": [],
            "total_orders": 0,
            "message": f"MT5 terminal connection failed: {mt5.last_error()}",
        }

    try:
        orders = mt5.orders_get()

        if orders is None:
            return {
                "connected": False,
                "orders": [],
                "total_orders": 0,
                "message": f"MT5 pending orders unavailable: {mt5.last_error()}",
            }

        pending_orders = []

        for order in orders:
            order_type_map = {
                mt5.ORDER_TYPE_BUY_LIMIT: "BUY LIMIT",
                mt5.ORDER_TYPE_SELL_LIMIT: "SELL LIMIT",
                mt5.ORDER_TYPE_BUY_STOP: "BUY STOP",
                mt5.ORDER_TYPE_SELL_STOP: "SELL STOP",
                mt5.ORDER_TYPE_BUY_STOP_LIMIT: "BUY STOP LIMIT",
                mt5.ORDER_TYPE_SELL_STOP_LIMIT: "SELL STOP LIMIT",
            }

            pending_orders.append(
                {
                    "ticket": order.ticket,
                    "symbol": order.symbol,
                    "type": order_type_map.get(order.type, "UNKNOWN"),
                    "volume_initial": float(order.volume_initial),
                    "volume_current": float(order.volume_current),
                    "price_open": float(order.price_open),
                    "stop_loss": float(order.sl),
                    "take_profit": float(order.tp),
                    "time_setup": order.time_setup,
                    "comment": order.comment,
                }
            )

        return {
            "connected": True,
            "orders": pending_orders,
            "total_orders": len(pending_orders),
            "message": "MT5 pending orders loaded successfully.",
        }

    finally:
        mt5.shutdown()

def get_mt5_account_summary(db: Session, account_id: int):

    account = (
        db.query(MT5Account)
        .filter(MT5Account.id == account_id)
        .first()
    )

    if account is None:
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

    stored_open_positions = (
        db.query(Trade)
        .filter(
            Trade.mt5_account_id == account_id,
            Trade.imported_from_mt5 == True,
            Trade.is_archived == False,
            Trade.close_time == None,
        )
        .count()
    )

    live_metrics = {
        "connected": False,
        "balance": None,
        "equity": None,
        "floating_profit_loss": None,
        "open_positions": stored_open_positions,
        "message": "Account is disabled.",
    }

    connection_status = "disabled"

    if account.is_active:
        live_metrics = get_live_mt5_metrics()

        if live_metrics["connected"]:
            connection_status = "connected"
        else:
            connection_status = "disconnected"

    return MT5AccountSummary(
        account_id=account.id,
        account_name=account.account_name,
        broker=account.broker,
        login=account.login,
        server=account.server,
        is_active=account.is_active,
        auto_sync=account.auto_sync,
        sync_interval_minutes=account.sync_interval_minutes,
        balance=live_metrics["balance"],
        equity=live_metrics["equity"],
        floating_profit_loss=live_metrics["floating_profit_loss"],
        open_positions=live_metrics["open_positions"],
        imported_trades_count=imported_trades_count,
        last_sync=account.last_sync,
        connection_status=connection_status,
        health_message=live_metrics["message"],
    )