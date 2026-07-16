# Current Project Status

Status updated after Sprint 30.

## Release State

```text
Version 0.9 — Completed
Sprint 30 — Completed
Next: Version 1.0 / Sprint 31 planning and audit
```

## Completed Through Sprint 30

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
- Explicit MT5 terminal connection policy prevents automatic terminal startup.
- Live MT5 endpoints and sync use only an already-running local terminal.

### Frontend

- Shared TradePilot Theme, PageLayout and Widget System.
- Portfolio remains the reference UI implementation.
- Route-level lazy loading through React `lazy()` and `Suspense`.
- Shared chart infrastructure through `ChartContainer` and `ChartTooltip`.
- Direct `ResponsiveContainer` usage centralized in one file.
- Dashboard Equity Chart uses the shared chart infrastructure.
- Portfolio, Analytics, Psychology and Reports charts use the shared chart infrastructure.
- Reports consumes the canonical `movement_breakdown` contract.
- Dashboard displays Forex Pips and Non-Forex Points separately.
- Trades and Trade Details show the correct movement unit.
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
Shared Widget + Shared Chart UI
```

Current local MT5 connection model:

```text
TradePilot Pro
        ↓ explicit user action
Already-running local MT5 terminal
        ↓
Broker
```

TradePilot Pro must not start MT5 automatically.

## Mandatory Decisions

D-001 through D-059 remain binding, with special enforcement of:

- D-049 — Single Source of Information
- D-050 — Audit Before New Code
- D-051 — Single Touch Rule
- D-052 — Package First Development
- D-053 — Shared Widget System
- D-054 — Portfolio Reference UI
- D-055 — Multi-Asset MT5 Engine
- D-056 — Tree Verification Before File Modification
- D-057 — Exact Edit Instructions
- D-058 — Backend Is the Single Business Logic Authority
- D-059 — Portfolio Is the Reference Module

## Validation State

- Real MT5 synchronization: passed.
- Backend compile: passed.
- Frontend production build: passed.
- Shared chart audit: passed.
- Reports real-contract regression check: passed.
- MT5 automatic-launch regression check: passed.

## Deferred Commercial Architecture

The following are intentionally deferred beyond Version 0.9:

- User authentication and authorization.
- Roles and subscription validation.
- Secure credential storage.
- Cloud or local TradePilot MT5 Connector service.
- Broker API / Manager API integration.
- Multi-user tenant isolation.
- Commercial licensing and billing.

## Next Sprint Direction

Sprint 31 starts Version 1.0 with audit and planning first. No commercial or multi-user implementation should begin before the existing user, account, database, API and security foundations are fully audited.

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
