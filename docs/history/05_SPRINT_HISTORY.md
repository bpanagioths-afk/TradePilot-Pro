# TradePilot History - Sprint History

# Sprint 1 - Sprint 14

Initial project foundation:

- FastAPI
- PostgreSQL
- React
- Dashboard
- Analytics
- Reports
- Psychology
- MT5 Sync
- Home

---

# Sprint 15

Trading Plan Engine:

- Trading Plans
- Trading Plan History
- CRUD
- Trading Plan UI
- Multiple Plans
- Trading Plan Service

---

# Sprint 16

Rule Engine:

- Rule Engine Service
- Rule Evaluation
- Trade Score
- Trade Score Card
- NumericField
- Snackbar
- Better UI

---

# Sprint 17

MT5 Account Manager:

- MT5 multi-account architecture
- Account-aware MT5 Sync
- MT5 Account CRUD
- Soft delete / disable account
- React MT5 Account Manager UI
- Add / Edit / Disable / Activate / Sync
- Component extraction
- Stable sorting fix

---

# Sprint 18

TradePilot UI Framework v1:

- TradePilot Theme
- ThemeProvider integration
- CssBaseline integration
- TradePilotCard
- TradePilotButton
- StatusBadge
- SectionHeader
- InfoRow
- docs/DESIGN_SYSTEM.md
- MT5 UI migration to TradePilot components

Sprint 18 completed the first official frontend design architecture.

---

# Sprint 19

Professional MT5 Trading Widget:

## Backend

- `MT5AccountSummary` schema
- `GET /mt5/accounts/{account_id}/summary`
- live MT5 connection check
- Balance
- Equity
- Floating Profit / Loss
- Open Positions
- Connection Health
- Import Statistics
- safe fallback when MT5 is unavailable
- Sync Engine foundation
- `GET /mt5/accounts/{account_id}/sync-status`

## Frontend

- `getMT5AccountSummary(accountId)` API function
- Summary integration in `MT5AccountsManager`
- summary prop passed to `MT5AccountCard`
- Professional MT5 Trading Widget UI
- Balance KPI
- Equity KPI
- Floating P/L KPI
- Open Positions KPI
- Imported Trades
- Relative Last Sync
- Connection badge
- reusable `MetricCard`
- Floating P/L color rules
- MUI Grid v2 compatibility fix
- CORS origins updated for Vite 5173 / 5174

## Architecture

- MT5 import logic remains inside `mt5_sync.py`
- Sync scheduling logic starts in separate `sync_engine.py`
- routers remain thin
- service layer owns business logic
- UI uses TradePilot reusable components first

Sprint 19 completed the first full professional trading widget and established the reference pattern for future widgets.

---

# Sprint 20

Professional Dashboard Foundation and Widget Infrastructure:

## Frontend

- Professional Dashboard foundation
- `DashboardLayout.jsx`
- `WidgetGrid.jsx`
- Dashboard feature widget folders
- `DashboardSummaryWidget.jsx`
- MT5 dashboard widget foundation
- Portfolio placeholder widget
- Risk placeholder widget
- AI Coach placeholder widget
- Psychology placeholder widget
- Economic Calendar placeholder widget
- Dashboard widget barrel exports

## Widget Infrastructure

- `WidgetContainer.jsx`
- `WidgetHeader.jsx`
- `WidgetFooter.jsx`
- `WidgetMetric.jsx`
- widgets barrel export

## Architecture

- introduced Widget Infrastructure layer
- introduced feature-module direction
- rebuilt `SOURCE_CODE_STRUCTURE.md` as developer handbook
- added frontend component audit
- locked Sprint Design / Architecture Review / Implementation / Verification / Documentation / Git Release process

Sprint 20 changed TradePilot Pro from page-based UI growth into a platform-style architecture for professional widgets and future feature modules.

---



# Sprint 21

Portfolio Feature Module Foundation:

## Backend

- Portfolio backend router
- Portfolio service layer
- Portfolio response schema
- Portfolio summary API

## Frontend

- Frontend portfolio service
- Professional Portfolio Dashboard Widget
- Real Portfolio metrics from backend
- PortfolioWidget connected to live backend data

## Widget Infrastructure v2

- `WidgetMetric` upgraded to v2
- `WidgetLoading`
- `WidgetErrorState`
- `WidgetEmptyState`
- shared widget loading / error / empty state patterns

Sprint 21 established Portfolio as a real backend-connected dashboard widget and prepared the ground for a full Portfolio Feature Module.

---

# Sprint 22

Portfolio Feature Module Completion and Widget Infrastructure v3:

## Backend

- `/portfolio/overview` endpoint
- modular Portfolio response structure
- `summary`
- `statistics`
- `allocation`
- `performance`
- backward compatibility through `/portfolio/summary`
- Portfolio statistics calculations
- allocation by symbol
- allocation by direction
- performance metrics foundation
- profit factor
- average win / average loss
- average RR
- max drawdown foundation

## Frontend

- `frontend/src/features/portfolio/` module structure
- `usePortfolio()` hook
- `PortfolioSummaryMetrics`
- `PortfolioPerformanceMetrics`
- `PortfolioStatisticsCard`
- `PortfolioAllocationCard`
- PortfolioWidget migrated to Feature Module pattern
- PortfolioWidget moved from summary endpoint to overview endpoint

## Widget Infrastructure v3

- `WidgetMetricGrid`
- `WidgetMetrics`
- reusable KPI grid pattern
- reusable metric renderer for future widgets

## Architecture

- Feature Module pattern accepted as a project standard
- Portfolio became the reference implementation for future modules
- routing / navigation audit completed before Sidebar integration
- Portfolio page integration postponed until production-ready
- no architecture regression introduced

Sprint 22 changed TradePilot Pro from a widget-based dashboard into a feature-module platform where future modules can be built consistently and reused across dashboard widgets and full pages.

---

# Sprint 24 - UI Foundation, Portfolio Page and MT5 Dashboard Integration

Sprint 24 completed:

- Portfolio page routing and navigation.
- Shared `PageHeader` and `PageLayout` components.
- Dashboard and Portfolio migration to `PageLayout`.
- Portfolio charts component for Equity Curve and Drawdown.
- Sidebar v2 grouped navigation.
- Dashboard MT5 widget live summary integration.
- Workflow correction: avoid global widget refactors for page-specific UI.

Key lesson:

```text
Reuse existing infrastructure before creating new components or endpoints.
```

Protected component rule was introduced after global widget changes caused unwanted visual side effects.
