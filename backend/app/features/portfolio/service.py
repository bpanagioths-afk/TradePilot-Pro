from sqlalchemy.orm import Session

from app.features.portfolio.repository import get_active_trades

from app.features.portfolio.engines.summary_engine import (
    calculate as calculate_summary,
)

from app.features.portfolio.engines.performance_engine import (
    calculate as calculate_performance,
)

from app.features.portfolio.engines.risk_engine import (
    calculate as calculate_risk,
)

from app.features.portfolio.engines.equity_engine import (
    calculate as calculate_equity,
)

from app.features.portfolio.engines.drawdown_engine import (
    calculate as calculate_drawdown,
)

from app.features.portfolio.engines.allocation_engine import (
    calculate as calculate_allocation,
)


def get_portfolio_dashboard(
    db: Session,
    user_id: int,
):
    """
    Portfolio Dashboard Orchestrator.

    All portfolio and analytics calculations are restricted
    to the authenticated user's closed, non-archived trades.
    """

    trades = get_active_trades(
        db=db,
        user_id=user_id,
    )

    summary = calculate_summary(trades)
    performance = calculate_performance(trades)
    risk = calculate_risk(trades)
    equity = calculate_equity(trades)
    drawdown = calculate_drawdown(equity)
    allocation = calculate_allocation(trades)

    return {
        "summary": summary,
        "performance": performance,
        "risk": risk,
        "equity": equity,
        "drawdown": drawdown,
        "allocation": allocation,
    }
