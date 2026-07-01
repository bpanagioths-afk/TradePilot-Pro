from fastapi import APIRouter

from app.services.mt5_sync import (
    sync_mt5_history
)

router = APIRouter(
    prefix="/mt5",
    tags=["MT5"]
)


@router.post("/sync")
def sync_mt5():

    return sync_mt5_history()


@router.get("/status")
def mt5_status():

    return {
        "service": "MT5 Sync",
        "status": "ready"
    }