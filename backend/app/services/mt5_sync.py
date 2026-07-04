import MetaTrader5 as mt5

from datetime import datetime, timedelta

from app.core.database import SessionLocal
from app.models.trade import Trade
from app.models.mt5_account import MT5Account


def sync_mt5_history(account_id: int):

    if not mt5.initialize():

        return {
            "success": False,
            "message": "MT5 initialization failed"
        }

    db = SessionLocal()

    try:

        account = db.query(
            MT5Account
        ).filter(
            MT5Account.id == account_id
        ).first()

        if account is None:

            return {
                "success": False,
                "message": "MT5 account not found"
            }

        date_to = datetime.now()

        date_from = date_to - timedelta(days=365)

        deals = mt5.history_deals_get(
            date_from,
            date_to
        )

        if deals is None:

            return {
                "success": False,
                "message": "No deals returned"
            }

        imported = 0

        skipped = 0

        for deal in deals:

            existing = db.query(
                Trade
            ).filter(
                Trade.mt5_account_id == account_id,
                Trade.mt5_ticket == deal.ticket
            ).first()

            if existing:

                skipped += 1
                continue

            trade = Trade(

                mt5_account_id=account_id,

                mt5_ticket=deal.ticket,

                imported_from_mt5=True,

                is_archived=False,

                symbol=deal.symbol,

                direction="BUY"
                if deal.type == 0
                else "SELL",

                entry_price=deal.price,

                exit_price=deal.price,

                lot_size=deal.volume,

                profit_money=deal.profit,

                open_time=datetime.fromtimestamp(
                    deal.time
                ),

                close_time=datetime.fromtimestamp(
                    deal.time
                ),

                notes="Imported from MT5"
            )

            trade.is_win = 1 if deal.profit > 0 else 0

            db.add(trade)

            imported += 1

        account.last_sync = datetime.now()

        db.commit()

        return {
            "success": True,
            "imported": imported,
            "skipped": skipped
        }

    finally:

        db.close()

        mt5.shutdown()