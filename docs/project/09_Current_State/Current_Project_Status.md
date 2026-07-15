# Current Project Status

Status updated after Sprint 29.

## Completed Through Sprint 29

### Backend

- FastAPI, PostgreSQL, SQLAlchemy and Pydantic foundation.
- MT5 multi-account management and live Trading Center.
- Modular MT5 Synchronization Engine v2 with position-level aggregation and idempotent upsert.
- Canonical multi-asset movement engine using MT5 symbol metadata.
- Supported movement semantics:
  - Forex and JPY pairs → pips
  - Indices, metals, stocks, crypto and CFDs → broker points
- Trade model stores movement value, movement unit, asset class and symbol metadata.
- Shared Portfolio movement and analytics engines.
- Dashboard summary separates Forex pips from non-Forex points.
- Portfolio Average Pips includes Forex trades only.
- Portfolio Allocation groups exposure by asset class.
- Legacy `mt5_sync.py` retained only as a compatibility wrapper.

### Frontend

- Shared TradePilot Theme, PageLayout and Widget System.
- Portfolio remains the reference UI implementation.
- Dashboard displays Forex Pips and Non-Forex Points separately.
- Analytics uses the shared movement-breakdown contract.
- Trades and Trade Details show the correct movement unit.
- Reports and Psychology support multi-asset movement values.
- Portfolio Allocation displays exposure by asset class.
- Production build succeeds.

## Current Architecture

```text
MT5 Symbol Metadata
↓
Movement Engine
↓
Trade movement_value + movement_unit + asset_class
↓
Movement / Analytics Engines
↓
Dashboard, Portfolio and Analytics APIs
↓
Shared Widget UI
```

## Mandatory Decisions

D-001 through D-055 remain binding, with special enforcement of:

- D-049 — Single Source of Information
- D-050 — Audit Before New Code
- D-051 — Single Touch Rule
- D-052 — Package First Development
- D-053 — Shared Widget System
- D-054 — Portfolio Reference UI
- D-055 — Multi-Asset MT5 Engine

## Validation State

- Real MT5 synchronization: passed.
- Backend compile: passed.
- Vulture 100% confidence audit: no findings.
- Frontend production build: passed.
- Known non-blocking warning: frontend bundle exceeds the default 500 kB warning threshold.

## Next Sprint Direction

Sprint 30 focuses on Shared Chart Infrastructure and frontend performance cleanup without changing the validated multi-asset movement contract.

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
