from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers.auth import router as auth_router


from app.routers.trades import router as trades_router
from app.routers.dashboard import router as dashboard_router
from app.routers.mt5 import router as mt5_router
from app.routers.exports import router as exports_router
from app.routers.trading_plans import router as trading_plans_router
from app.routers.rule_engine import router as rule_engine_router
from app.routers.portfolio import router as portfolio_legacy_router

from app.features.portfolio.api import router as portfolio_router
from app.core.database import Base, engine

from app.models.trade import Trade
from app.models.user import User
from app.models.trading_plan import TradingPlan, TradingPlanHistory
from app.models.mt5_account import MT5Account

from app.services.scheduler import (
    start_scheduler
)



app = FastAPI(
    title="TradePilot Pro API",
    version="1.0.0",
    description="Professional Trading Journal Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
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

app.include_router(auth_router)
app.include_router(trades_router)
app.include_router(dashboard_router)
app.include_router(mt5_router)
app.include_router(exports_router)
app.include_router(trading_plans_router)
app.include_router(rule_engine_router)
app.include_router(portfolio_legacy_router)

app.include_router(
    portfolio_router,
    prefix="/api/portfolio",
    tags=["Portfolio"],
)

@app.on_event("startup")
def startup():

   # start_scheduler()
   pass

@app.get("/")
def home():

    return {
        "status": "ok"
    }