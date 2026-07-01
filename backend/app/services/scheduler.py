from apscheduler.schedulers.background import BackgroundScheduler

from app.services.mt5_sync import sync_mt5_history

scheduler = BackgroundScheduler()


def start_scheduler():

    scheduler.add_job(
        sync_mt5_history,
        "interval",
        minutes=15
    )

    scheduler.start()

    print("MT5 Scheduler Started")