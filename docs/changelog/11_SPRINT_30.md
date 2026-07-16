# Sprint 30 — Shared Chart Infrastructure and MT5 Explicit Connection Policy

Status: Completed

Version: 0.9 completed

## Objective

Create one shared frontend chart infrastructure, reduce route bundle loading through lazy-loaded pages and prevent TradePilot Pro from starting the local MT5 terminal without an explicit user action.

## Frontend

- Added route-level lazy loading in `frontend/src/App.jsx` with React `lazy()` and `Suspense`.
- Reused the existing `WidgetLoading` component as the route loading state.
- Added shared chart infrastructure:
  - `frontend/src/components/charts/ChartContainer.jsx`
  - `frontend/src/components/charts/ChartTooltip.jsx`
  - `frontend/src/components/charts/index.js`
- Centralized `ResponsiveContainer` usage inside `ChartContainer`.
- Migrated chart consumers:
  - Dashboard Equity Chart
  - Portfolio Equity and Drawdown charts
  - Analytics charts
  - Psychology charts
  - Reports charts
- Corrected Reports chart mapping to consume the validated backend `movement_breakdown` contract.
- Preserved separate display of Forex pips and non-Forex points.
- Confirmed the Dashboard chart flow:

```text
DashboardSummaryWidget
        ↓
EquityChart
        ↓
Shared ChartContainer / ChartTooltip
```

## Backend / MT5

- Added an explicit MT5 terminal connection policy.
- Added `backend/app/services/mt5/terminal_connection.py` as the shared terminal-availability guard.
- Updated live MT5 services so status and widget polling do not start the MT5 terminal automatically.
- Updated synchronization so `Sync Now` uses an already-running terminal and returns a clear unavailable message when MT5 is closed.
- Preserved the current local connector model for Version 0.9.
- Deferred cloud connector, credential vault, broker API and commercial multi-user connection architecture to a future commercial release.

## Validation

- Frontend production build: passed.
- Shared `ResponsiveContainer` audit: only `ChartContainer.jsx` contains direct usage.
- Dashboard chart dependency audit: passed.
- Reports Pair Performance and Hourly Performance verified with real `/dashboard/pairs` and `/dashboard/hours` response contracts.
- Backend compile (`python -m compileall app`): passed.
- Manual MT5 behavior validation:
  - TradePilot Pro does not open MT5 on application start.
  - MT5 page polling does not open MT5.
  - Live widgets work when MT5 is opened manually.
  - Sync works with the already-running terminal.

## Product Result

Version 0.9 now has a shared chart foundation, route-level page loading and a safer local MT5 integration. TradePilot Pro no longer launches the MT5 terminal as a side effect of opening the application or loading live widgets.
