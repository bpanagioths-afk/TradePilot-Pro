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
