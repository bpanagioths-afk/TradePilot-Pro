# Current Project Status

Status updated after Sprint 28.

## Completed Through Sprint 28

### Backend

- FastAPI, PostgreSQL, SQLAlchemy and Pydantic foundation.
- MT5 multi-account management and live Trading Center.
- Portfolio Repository / Service / Engine architecture.
- Portfolio summary, performance, risk, equity and drawdown engines.
- MT5 Synchronization Engine v2 under `backend/app/services/mt5/`.
- Position-level aggregation using `mt5_position_id`.
- Open-position, partial-close and closed-position lifecycle support.
- Idempotent upsert: repeated sync updates existing Trades.
- Recently closed-position reconciliation.
- Open positions excluded from historical Portfolio and Analytics calculations.

### Frontend

- Shared TradePilot Theme and PageLayout foundation.
- Shared Widget System:
  - WidgetContainer
  - WidgetHeader
  - WidgetFooter
  - WidgetMetric
  - WidgetMetricGrid
  - WidgetMetrics
  - WidgetLoading
  - WidgetErrorState
  - WidgetEmptyState
- Dashboard migrated to shared metric widgets.
- Portfolio remains the reference UI implementation.
- Analytics Center implemented and migrated to shared widgets.
- MT5 Trading Center operational.

## Current Architecture

```text
Frontend Routes / Pages
↓
Feature Modules
↓
Shared Widget System
↓
TradePilot Theme
↓
Material UI
```

```text
FastAPI Routers
↓
Services / Feature Modules
↓
MT5 Builder / Aggregator / Validator / Repository
↓
SQLAlchemy Models
↓
PostgreSQL / MetaTrader 5
```

## Mandatory Decisions

- D-049 — Single Source of Information
- D-050 — Audit Before New Code
- D-051 — Single Touch Rule
- D-052 — Package First Development
- D-053 — Shared Widget System
- D-054 — Portfolio Reference UI
- D-055 — Multi-Asset MT5 Engine

## Known Sprint 29 Work

1. Complete canonical multi-asset movement/pips calculations.
2. Distinguish Forex pips from non-Forex points/ticks where required.
3. Add a shared chart wrapper using the Widget System.
4. Improve empty states for unassigned systems and psychology states.
5. Continue responsive layout and theme-personalization work.
6. Audit and remove obsolete compatibility code only after replacement paths are fully tested.

## Workspace Ownership

```text
Home       → Welcome / Command Center
Dashboard  → Executive Overview
MT5        → Live Trading Center
Portfolio  → Portfolio Analysis
Analytics  → Historical Analysis
Psychology → Trader Journal
Reports    → Reports & Export
```
