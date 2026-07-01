from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers.trades import router as trades_router
from app.routers.dashboard import router as dashboard_router
from app.routers.mt5 import router as mt5_router
from app.routers.exports import router as exports_router

from app.core.database import Base, engine

from app.services.scheduler import (
    start_scheduler
)

app = FastAPI(
    title="Trading Journal"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

app.include_router(trades_router)
app.include_router(dashboard_router)
app.include_router(mt5_router)
app.include_router(exports_router)


@app.on_event("startup")
def startup():

    start_scheduler()


@app.get("/")
def home():

    return {
        "status": "ok"
    }