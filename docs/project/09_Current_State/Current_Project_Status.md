# Current Project Status

Status updated after Sprint 31A.

## Release State

```text
Version 1.0 — In Progress
Sprint 31A — Completed
Next: Sprint 31B — Admin Frontend & User Management UI
```

## Completed Through Sprint 31A

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

### Multi-User Foundation

Sprint 31A introduced the backend foundation for Version 1.0.

Completed:

- Multi-user backend architecture.
- Administrative User Management module.
- JWT authentication integrated with admin authorization.
- Admin-only protected endpoints.
- User creation.
- User update.
- Password reset.
- User activation / deactivation.
- Duplicate username validation.
- Duplicate email validation.
- Password hashing.
- Protection against self-deactivation.
- Protection against self-admin privilege removal.
- Repository → Service → API architecture preserved.

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
Users
        ↓
JWT Authentication
        ↓
Authorization Dependencies
        ↓
Repository → Service → API
        ↓
PostgreSQL
        ↓
Dashboard / MT5 / Portfolio / Analytics
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

Completed successfully:

- Real MT5 synchronization.
- Backend compile.
- Frontend production build.
- Shared chart audit.
- Reports regression verification.
- MT5 automatic-launch regression verification.
- Swagger validation for Admin User Management.
- User listing.
- User creation.
- User update.
- Password reset.
- Authorization validation.

## Current Product Status

Completed:

- Version 0.9.
- MT5 Trading Center.
- Portfolio.
- Analytics.
- Multi-Asset Engine.
- Multi-user backend foundation.
- Administrative User Management backend.

In Progress:

- Version 1.0.

Next package:

- Admin Frontend.
- User Management UI.
- Safe User Delete.
- Roles & Permissions expansion.
- Subscription management.

## Deferred Commercial Architecture

The following remain intentionally deferred:

- Tenant isolation.
- Subscription billing.
- License management.
- Cloud MT5 Connector.
- Broker Manager APIs.
- Commercial SaaS infrastructure.

## Next Sprint Direction

Sprint 31B will implement the complete administrative frontend for User Management using the backend completed in Sprint 31A.

## Workspace Ownership

```text
Home       → Welcome / Command Center
Dashboard  → Executive Overview
MT5        → Live Trading Center
Portfolio  → Portfolio Analysis
Analytics  → Historical Analysis
Psychology → Trader Journal
Reports    → Reports
Admin      → User Administration
```