from pydantic import BaseModel
from typing import List


class PortfolioSummary(BaseModel):
    total_accounts: int
    active_accounts: int
    disabled_accounts: int
    total_trades: int
    winning_trades: int
    losing_trades: int
    win_rate: float
    total_profit: float
    total_pips: float


class PortfolioStatistics(BaseModel):
    gross_profit: float
    gross_loss: float
    net_profit: float
    average_profit_per_trade: float
    average_pips_per_trade: float


class PortfolioAllocationItem(BaseModel):
    name: str
    value: float
    percentage: float


class PortfolioAllocation(BaseModel):
    by_symbol: List[PortfolioAllocationItem]
    by_direction: List[PortfolioAllocationItem]


class PortfolioPerformance(BaseModel):
    win_rate: float
    profit_factor: float
    expectancy: float
    average_win: float
    average_loss: float
    largest_win: float
    largest_loss: float
    average_rr: float
    max_drawdown: float


class PortfolioOverview(BaseModel):
    summary: PortfolioSummary
    statistics: PortfolioStatistics
    allocation: PortfolioAllocation
    performance: PortfolioPerformance