from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.features.settings.schemas import (
    BackupAccountSettings,
    BackupExportResponse,
    BackupMetadata,
    BackupTrade,
    BackupTradingPlan,
)
from app.models.trade import Trade
from app.models.trading_plan import TradingPlan
from app.models.user import User


def _build_backup_account_settings(
    current_user: User,
) -> BackupAccountSettings:
    return BackupAccountSettings(
        username=current_user.username,
        email=current_user.email,
        trader_name=current_user.trader_name,
        base_currency=current_user.base_currency,
        theme_mode=current_user.theme_mode,
        timezone=current_user.timezone,
        time_format=current_user.time_format,
        date_format=current_user.date_format,
    )


def _build_backup_trade(
    trade: Trade,
) -> BackupTrade:
    return BackupTrade(
        symbol=trade.symbol,
        direction=trade.direction,
        entry_price=trade.entry_price,
        stop_loss=trade.stop_loss,
        take_profit=trade.take_profit,
        exit_price=trade.exit_price,
        lot_size=trade.lot_size,
        profit_money=trade.profit_money,
        profit_pips=trade.profit_pips,
        movement_value=trade.movement_value,
        movement_unit=trade.movement_unit,
        asset_class=trade.asset_class,
        symbol_digits=trade.symbol_digits,
        symbol_point=trade.symbol_point,
        tick_size=trade.tick_size,
        risk_reward=trade.risk_reward,
        duration_minutes=trade.duration_minutes,
        is_win=trade.is_win,
        open_time=trade.open_time,
        close_time=trade.close_time,
        session_name=trade.session_name,
        trading_system_id=trade.trading_system_id,
        psychology_state_id=trade.psychology_state_id,
        tradingview_link=trade.tradingview_link,
        notes=trade.notes,
        mt5_ticket=trade.mt5_ticket,
        mt5_position_id=trade.mt5_position_id,
        imported_from_mt5=bool(
            trade.imported_from_mt5
        ),
        is_archived=bool(
            trade.is_archived
        ),
    )


def _build_backup_trading_plan(
    trading_plan: TradingPlan,
) -> BackupTradingPlan:
    return BackupTradingPlan(
        name=trading_plan.name,
        description=trading_plan.description,
        is_default=bool(
            trading_plan.is_default
        ),
        risk_per_trade=trading_plan.risk_per_trade,
        maximum_daily_loss=(
            trading_plan.maximum_daily_loss
        ),
        maximum_weekly_loss=(
            trading_plan.maximum_weekly_loss
        ),
        minimum_rr=trading_plan.minimum_rr,
        maximum_trades_day=(
            trading_plan.maximum_trades_day
        ),
        maximum_trades_week=(
            trading_plan.maximum_trades_week
        ),
        allow_forex=bool(
            trading_plan.allow_forex
        ),
        allow_metals=bool(
            trading_plan.allow_metals
        ),
        allow_crypto=bool(
            trading_plan.allow_crypto
        ),
        allow_indices=bool(
            trading_plan.allow_indices
        ),
        session_asia=bool(
            trading_plan.session_asia
        ),
        session_london=bool(
            trading_plan.session_london
        ),
        session_newyork=bool(
            trading_plan.session_newyork
        ),
        session_overlap=bool(
            trading_plan.session_overlap
        ),
        avoid_news_before=bool(
            trading_plan.avoid_news_before
        ),
        avoid_news_after=bool(
            trading_plan.avoid_news_after
        ),
        constitution=trading_plan.constitution,
    )


def build_user_backup(
    db: Session,
    current_user: User,
) -> BackupExportResponse:
    trades = (
        db.query(Trade)
        .filter(
            Trade.user_id == current_user.id,
        )
        .order_by(
            Trade.open_time.asc(),
            Trade.id.asc(),
        )
        .all()
    )

    trading_plans = (
        db.query(TradingPlan)
        .filter(
            TradingPlan.user_id == current_user.id,
        )
        .order_by(
            TradingPlan.id.asc(),
        )
        .all()
    )

    return BackupExportResponse(
        metadata=BackupMetadata(
            exported_at=datetime.now(
                timezone.utc
            ),
        ),
        account_settings=(
            _build_backup_account_settings(
                current_user
            )
        ),
        trades=[
            _build_backup_trade(trade)
            for trade in trades
        ],
        trading_plans=[
            _build_backup_trading_plan(
                trading_plan
            )
            for trading_plan in trading_plans
        ],
    )
