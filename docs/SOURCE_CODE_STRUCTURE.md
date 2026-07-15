# TradePilot Pro - Source Code Structure

> Current source-code structure for TradePilot Pro at the end of Sprint 26.
>
> Purpose: this file is the developer onboarding map for the project. It documents the real folder structure, the responsibility of each area, and the architectural rules that should be followed in future development.

---

# 1. Architecture Version

```text
Project: TradePilot Pro
Architecture Version: 2.0
Current Sprint Context: Sprint 26 - MT5 Trading Center and Core UI Cleanup
```

TradePilot Pro currently follows this high-level architecture:

```text
Application Pages
        ↓
Feature Modules
        ↓
Dashboard / Workspace Components
        ↓
Widget Infrastructure
        ↓
TradePilot UI Framework
        ↓
Material UI
        ↓
Backend API
        ↓
Service Layer
        ↓
Database / External Providers
```

Current workspace responsibilities:

```text
Home
    ↓
Welcome / Command Center

Dashboard
    ↓
Executive Overview

MT5
    ↓
Live Trading Center

Portfolio
    ↓
Portfolio Analysis

Analytics
    ↓
Historical Analysis

Psychology
    ↓
Trader Journal

Reports
    ↓
Exports and Reports
```

---

# 2. Root Project Structure

```text
TradingJournal/
│
├── backend/
├── database/
├── docs/
├── frontend/
├── uploads/
│
├── .gitignore
└── CHANGELOG.md
```

## Root Responsibilities

| Path | Purpose |
|---|---|
| `backend/` | FastAPI backend application. |
| `frontend/` | React + Vite frontend application. |
| `database/` | SQL bootstrap / database initialization scripts. |
| `docs/` | Modular project documentation pack. |
| `uploads/` | Runtime uploaded files. Not core source code. |
| `.gitignore` | Git exclusion rules. |
| `CHANGELOG.md` | Root-level changelog file. Long-term source of truth should remain under `docs/CHANGELOG.md` and `docs/changelog/`. |

## Excluded / Generated Local Folders

These folders can exist locally but are not considered source-code architecture:

```text
venv/
node_modules/
__pycache__/
.pytest_cache/
.idea/
.vscode/
dist/
```

Rules:

- Do not commit `venv/`.
- Do not commit `node_modules/`.
- Do not commit `__pycache__/`.
- Do not commit `.env` files.
- Do not commit frontend build output from `dist/`.
- Runtime uploads should not become application source code.
- Temporary ZIP transfer files should not remain inside the repository.

---

# 3. Backend Structure

```text
backend/
│
├── app/
├── uploads/
├── venv/                  # local only, excluded
├── node_modules/          # generated/local only, excluded
│
├── .env                   # local configuration, excluded
└── requirements.txt
```

## Backend Root Responsibilities

| Path | Purpose |
|---|---|
| `backend/app/` | Main FastAPI application code. |
| `backend/uploads/` | Backend runtime uploads. |
| `backend/requirements.txt` | Python dependencies. |
| `backend/.env` | Local environment variables. Must not be committed. |

---

## 3.1 Backend Application Tree

```text
backend/app/
│
├── core/
│   ├── database.py
│   └── deps.py
│
├── features/
│   └── portfolio/
│       ├── __init__.py
│       ├── api.py
│       ├── calculations.py
│       └── engines/
│
├── jobs/                  # currently empty placeholder
│
├── models/
│   ├── mt5_account.py
│   ├── trade.py
│   ├── trading_plan.py
│   └── user.py
│
├── reports/
│   └── pdf_report.py
│
├── routers/
│   ├── dashboard.py
│   ├── exports.py
│   ├── mt5.py
│   ├── portfolio.py
│   ├── rule_engine.py
│   ├── trades.py
│   └── trading_plans.py
│
├── schemas/
│   ├── mt5_account.py
│   ├── portfolio.py
│   ├── trade.py
│   └── trading_plan.py
│
├── services/
│   ├── mt5_account_service.py
│   ├── mt5_sync.py
│   ├── portfolio_service.py
│   ├── rule_engine.py
│   ├── scheduler.py
│   └── sync_engine.py
│
├── utils/
│   └── trade_stats.py
│
└── main.py
```

---

## 3.2 Backend Layer Responsibilities

### `backend/app/main.py`

Purpose:

- FastAPI application entry point.
- Registers routers.
- Configures application-level middleware such as CORS.

Rules:

- Keep `main.py` thin.
- Do not place business logic here.
- Do not place SQL logic here.
- New endpoints should be registered through routers, not implemented directly in `main.py`.

---

### `backend/app/core/`

Purpose:

- Core backend configuration.
- Shared application dependencies.
- Database session management.

Current files:

| File | Purpose |
|---|---|
| `database.py` | Database engine and session configuration. |
| `deps.py` | Shared FastAPI dependencies. |

Rules:

- Database session handling belongs here.
- Shared dependency helpers belong here.
- Business logic does not belong here.

---

### `backend/app/features/`

Purpose:

- Domain-specific backend feature modules.
- Groups related APIs, calculations and engines around a business capability.

Current feature:

```text
features/portfolio/
├── __init__.py
├── api.py
├── calculations.py
└── engines/
```

Portfolio feature responsibility:

- Portfolio overview calculations.
- Portfolio performance calculations.
- Portfolio allocation.
- Portfolio analytics foundation.
- Domain-specific calculation engines.

Rules:

- Feature-specific backend logic belongs inside the corresponding feature module when a module already exists.
- Do not duplicate portfolio logic in routers or unrelated services.
- Reuse and extend an existing feature module before creating another implementation.

---

### `backend/app/models/`

Purpose:

- SQLAlchemy ORM models.
- Database table definitions and relationships.

Current files:

| File | Purpose |
|---|---|
| `user.py` | User model. |
| `trade.py` | Trade model. |
| `trading_plan.py` | Trading Plan model. |
| `mt5_account.py` | MT5 Account model. |

Rules:

- Models define database shape.
- Do not put business logic in models.
- Do not put API response formatting in models.
- External system IDs should not replace internal database primary keys.

---

### `backend/app/schemas/`

Purpose:

- Pydantic request and response schemas.
- Input and output validation.
- API contract definitions.

Current files:

| File | Purpose |
|---|---|
| `trade.py` | Trade request and response DTOs. |
| `trading_plan.py` | Trading Plan request and response DTOs. |
| `mt5_account.py` | MT5 account request, response and summary schemas. |
| `portfolio.py` | Portfolio response and analytics schemas. |

Rules:

- Schemas define API contracts.
- No business logic.
- No SQLAlchemy session usage.
- Response shape changes must be coordinated with frontend consumers.

---

### `backend/app/routers/`

Purpose:

- FastAPI route layer.
- HTTP endpoints only.
- Delegates work to services or feature modules.

Current files:

| File | Purpose |
|---|---|
| `dashboard.py` | Dashboard summary and equity endpoints. |
| `exports.py` | Export endpoints. |
| `mt5.py` | MT5 sync, account management and live MT5 endpoints. |
| `portfolio.py` | Portfolio overview endpoints. |
| `rule_engine.py` | Rule Engine endpoints. |
| `trades.py` | Trade CRUD endpoints. |
| `trading_plans.py` | Trading Plan endpoints. |

Rules:

- Routers stay thin.
- Routers validate request flow and call services.
- Business logic belongs in `services/` or `features/`.
- Database sessions should use dependencies from `core/`.
- Existing endpoints must be audited before creating new ones.
- Never duplicate an endpoint because its current location was overlooked.

#### Current MT5 Router Capabilities

```text
POST /mt5/sync
GET  /mt5/status
GET  /mt5/open-positions
GET  /mt5/pending-orders
GET  /mt5/account-health
GET  /mt5/today-performance
GET  /mt5/connection-health
GET  /mt5/accounts
POST /mt5/accounts
PUT  /mt5/accounts/{account_id}
DELETE /mt5/accounts/{account_id}
GET  /mt5/accounts/{account_id}/summary
GET  /mt5/accounts/{account_id}/sync-status
```

---

### `backend/app/services/`

Purpose:

- Backend business logic layer.
- External integrations.
- Sync logic.
- Live MT5 data access.
- Rule calculations.

Current files:

| File | Purpose |
|---|---|
| `mt5_account_service.py` | MT5 account management, summaries, live metrics, open positions, pending orders, account health, daily performance and connection health. |
| `mt5_sync.py` | MT5 closed-trade import and history synchronization. |
| `sync_engine.py` | Sync readiness and sync status foundation. |
| `scheduler.py` | Future scheduling foundation. |
| `rule_engine.py` | Rule Engine evaluation logic. |
| `portfolio_service.py` | Portfolio service compatibility and data access. |

Rules:

- Services own business rules.
- Routers should call services instead of implementing logic directly.
- MT5 import logic stays separate from live MT5 information.
- Sync scheduling logic should not be mixed into trade import logic.
- Do not reorganize working services during an active feature sprint without measurable value.
- The MT5 service may be refactored into domain files only when the growth of the service justifies a dedicated refactor sprint.

#### Current MT5 Service Responsibilities

```text
mt5_account_service.py
    ↓
MT5 account CRUD support
Live account metrics
Live open positions
Live pending orders
Live account health
Live today's performance
Live connection health
Account summary

mt5_sync.py
    ↓
Imports closed MT5 trades into the database

sync_engine.py
    ↓
Determines sync readiness and sync status

scheduler.py
    ↓
Future recurring/background execution foundation
```

#### Current Live MT5 Functions

```text
get_live_mt5_metrics()
get_live_mt5_open_positions()
get_live_mt5_pending_orders()
get_live_mt5_account_health()
get_live_mt5_today_performance()
get_live_mt5_connection_health()
```

---

### `backend/app/reports/`

Purpose:

- Report generation.

Current files:

| File | Purpose |
|---|---|
| `pdf_report.py` | PDF report generation logic. |

Rules:

- Report rendering logic belongs here.
- Routers should call report functions or services instead of building PDFs inline.

---

### `backend/app/utils/`

Purpose:

- Small utility functions that are not large business services.

Current files:

| File | Purpose |
|---|---|
| `trade_stats.py` | Trade statistics helpers. |

Rules:

- Utilities should stay small and focused.
- If utility logic grows into business logic, move it into `services/` or the appropriate feature module.

---

### `backend/app/jobs/`

Status:

```text
Currently empty placeholder.
```

Purpose:

- Future background or scheduled jobs.

Rules:

- Do not add business logic here until background execution is formally introduced.
- Scheduler-related work should remain aligned with `sync_engine.py` and `scheduler.py`.

---

# 4. Frontend Structure

```text
frontend/
│
├── public/
├── src/
├── node_modules/          # generated/local only, excluded
├── dist/                  # generated build output, excluded
│
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Frontend Root Responsibilities

| Path | Purpose |
|---|---|
| `public/` | Static public assets. |
| `src/` | React application source code. |
| `package.json` | Frontend dependencies and scripts. |
| `package-lock.json` | Locked dependency versions. |
| `vite.config.js` | Vite configuration. |
| `.oxlintrc.json` | Lint configuration. |
| `index.html` | Vite HTML entry. |
| `dist/` | Generated production build output. Not source code. |

Rules:

- Do not commit `node_modules/`.
- Do not treat `dist/` as source code.
- React source code belongs in `src/`.
- Reusable UI belongs under `src/components/`.
- Feature-specific UI remains inside the relevant feature or workspace folder.

---

## 4.1 Frontend Source Tree

```text
frontend/src/
│
├── api/
│   ├── api.js
│   └── mt5AccountsApi.js
│
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
├── features/
│   └── portfolio/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── index.js
│
├── hooks/                 # shared hooks placeholder
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Analytics.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── MT5.jsx
│   ├── Portfolio.jsx
│   ├── Psychology.jsx
│   ├── Reports.jsx
│   ├── Settings.jsx
│   ├── Trades.jsx
│   └── TradingPlan.jsx
│
├── services/
│   ├── dashboardService.js
│   ├── ruleEngineService.js
│   ├── tradeService.js
│   └── tradingPlanService.js
│
├── theme/
│   └── theme.js
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## 4.2 Frontend Layer Responsibilities

### `frontend/src/api/`

Purpose:

- Low-level API helpers.
- Dedicated backend API functions.
- Shared endpoint access.

Current files:

| File | Purpose |
|---|---|
| `api.js` | Base API and Axios configuration. |
| `mt5AccountsApi.js` | MT5 account management, sync and live MT5 API functions. |

Current MT5 API helpers include:

```text
getMT5Accounts()
createMT5Account()
updateMT5Account()
disableMT5Account()
syncMT5Account()
getMT5AccountSummary()
getMT5OpenPositions()
getMT5PendingOrders()
getMT5AccountHealth()
getMT5TodayPerformance()
getMT5ConnectionHealth()
```

Rules:

- API endpoint functions should live here when shared or module-specific.
- Components should not hardcode backend URLs when an API file exists.
- Existing API helpers must be reused before creating new data-access functions.
- API response field names must be verified from existing working consumers before being reused.

---

### `frontend/src/services/`

Purpose:

- Frontend service layer.
- Organizes API access for pages and modules.

Current files:

| File | Purpose |
|---|---|
| `dashboardService.js` | Dashboard summary and equity data access. |
| `ruleEngineService.js` | Rule Engine API access. |
| `tradeService.js` | Trades API access. |
| `tradingPlanService.js` | Trading Plan API access. |

Rules:

- Pages should call services or API functions, not hardcode data access.
- UI components should not know endpoint URLs.
- Shared data-access logic should be extracted here or into the appropriate feature module.
- Do not create duplicate service functions when an API helper already exists.

---

### `frontend/src/pages/`

Purpose:

- Top-level application pages.
- Workspace composition.
- Page-level data loading and navigation.

Current pages:

| Page | Purpose |
|---|---|
| `Home.jsx` | Welcome and Command Center. Contains no fake trading values. |
| `Dashboard.jsx` | Executive Overview. Shows summaries, not detailed workspace data. |
| `MT5.jsx` | MT5 Trading Center with sync, connection health, account health, daily performance, open positions and pending orders. |
| `Portfolio.jsx` | Full Portfolio Analysis workspace. |
| `Trades.jsx` | Trades page. |
| `TradingPlan.jsx` | Trading Plan page. |
| `Analytics.jsx` | Analytics page and Sprint 27 target workspace. |
| `Psychology.jsx` | Psychology and trader-journal page. |
| `Reports.jsx` | Reports and export page. |
| `Settings.jsx` | Application and MT5 account settings. |

Rules:

- Pages compose modules and widgets.
- Pages may load data and pass prepared props to widgets.
- Pages should not become large business-logic files.
- When a page grows, extract widgets, cards, dialogs, toolbars, hooks or services.
- Detailed information belongs to one primary workspace.
- Other pages may show only summaries or navigation links.
- Do not redesign working pages during an active sprint unless required by a bug or measurable product value.

Current application page flow:

```text
App.jsx
        ↓
MainLayout.jsx
        ↓
Sidebar.jsx
        ↓
Page / Workspace
        ↓
Feature components and widgets
```

Current MT5 Trading Center flow:

```text
MT5.jsx
        ↓
Connection / Sync panel
ConnectionHealthWidget
AccountHealthWidget
TodayPerformanceWidget
OpenPositionsWidget
PendingOrdersWidget
        ↓
MT5 API helpers
        ↓
FastAPI MT5 router
        ↓
MT5 service layer
        ↓
MetaTrader 5 terminal
```

---

### `frontend/src/features/`

Purpose:

- Reusable frontend feature modules.
- Groups feature-specific components, hooks and services.

Current feature module:

```text
features/portfolio/
├── components/
├── hooks/
├── services/
└── index.js
```

Portfolio feature responsibilities:

- Portfolio data loading.
- Portfolio summary metrics.
- Portfolio statistics.
- Portfolio allocation.
- Portfolio performance.
- Portfolio charts.

Rules:

- Feature-specific code stays inside the feature module.
- Use the feature barrel export where available.
- Do not import deep internal files when the feature exposes them through `index.js`.
- Extend an existing feature module instead of creating parallel implementations.

---

### `frontend/src/layouts/`

Purpose:

- Application shell structure.

Current files:

| File | Purpose |
|---|---|
| `MainLayout.jsx` | Main application shell and page layout. |

Rules:

- Layouts handle shell structure, not business logic.
- Sidebar and Topbar may be composed by the layout layer.
- Do not redesign the application shell during active feature work.

---

### `frontend/src/theme/`

Purpose:

- TradePilot visual theme.
- Material UI theme configuration.
- Light and dark mode foundation.

Current files:

| File | Purpose |
|---|---|
| `theme.js` | Theme colors, typography and component-style foundation. |

Rules:

- Prefer semantic theme colors over hardcoded colors.
- Design changes should be centralized in the theme or reusable components when system-wide.
- Feature-specific styling should remain inside feature components.
- Do not modify global theme behavior for a single page-specific visual issue.

---

### `frontend/src/hooks/`

Status:

```text
Shared hooks placeholder.
```

Purpose:

- Future reusable React hooks that are not owned by a specific feature.

Rules:

- Feature-owned hooks stay inside the corresponding feature module.
- Place hooks here only when they are reused across multiple domains.
- Do not create hooks for one-off logic unless they significantly improve clarity.

---

# 5. Frontend Components

```text
frontend/src/components/
│
├── common/
├── dashboard/
├── home/
├── layout/
├── settings/
├── widgets/
│
├── EquityChart.jsx
├── KPICard.jsx
├── NumericField.jsx
├── Sidebar.jsx
├── Topbar.jsx
├── TradeDetailsDialog.jsx
├── TradeDialog.jsx
└── TradeScoreCard.jsx
```

## Component Folder Responsibilities

| Path | Purpose |
|---|---|
| `components/common/` | Reusable TradePilot UI Framework components. |
| `components/widgets/` | Generic professional widget infrastructure. |
| `components/dashboard/` | Dashboard and workspace widgets. |
| `components/home/` | Home-specific components. |
| `components/layout/` | Reusable page-layout components. |
| `components/settings/` | Settings-specific components. |

Rules:

- Generic UI belongs in `common/` or `widgets/`.
- Feature-specific components remain in the feature or workspace folder.
- Do not duplicate a UI pattern when a reusable component already exists.
- Protected global components must not be modified for one feature-specific visual requirement.
- Documentation and audit files belong in `docs/`, not in source-code folders.

---

## 5.1 Common Components

```text
frontend/src/components/common/
│
├── InfoRow.jsx
├── MetricCard.jsx
├── SectionHeader.jsx
├── StatusBadge.jsx
├── TradePilotButton.jsx
└── TradePilotCard.jsx
```

Purpose:

- Core TradePilot UI Framework components.
- Reusable across application modules and workspaces.

Current files:

| Component | Purpose |
|---|---|
| `TradePilotCard.jsx` | Branded reusable base card. |
| `TradePilotButton.jsx` | Standard TradePilot button. |
| `StatusBadge.jsx` | Consistent status and connection badge. |
| `SectionHeader.jsx` | Reusable section title and action header. |
| `InfoRow.jsx` | Label/value information row. |
| `MetricCard.jsx` | Generic reusable metric card. |

Rules:

- Use these components before raw MUI when the required pattern already exists.
- Keep them generic and reusable.
- Do not add MT5, Portfolio or other domain-specific business logic here.
- System-wide visual changes may be implemented here only when intentionally global.

---

## 5.2 Widget Infrastructure

```text
frontend/src/components/widgets/
│
├── WidgetContainer.jsx
├── WidgetEmptyState.jsx
├── WidgetErrorState.jsx
├── WidgetFooter.jsx
├── WidgetHeader.jsx
├── WidgetLoading.jsx
├── WidgetMetric.jsx
├── WidgetMetricGrid.jsx
├── WidgetMetrics.jsx
└── index.js
```

Purpose:

- Generic widget infrastructure layer.
- Shared by Dashboard widgets, Portfolio components and MT5 Trading Center widgets.

Current files:

| Component | Purpose |
|---|---|
| `WidgetContainer.jsx` | Base container for professional widgets. |
| `WidgetHeader.jsx` | Standard widget title, subtitle and action area. |
| `WidgetFooter.jsx` | Standard widget footer and actions. |
| `WidgetMetric.jsx` | Individual metric presentation. |
| `WidgetMetricGrid.jsx` | Reusable responsive metric grid. |
| `WidgetMetrics.jsx` | Reusable collection of widget metrics. |
| `WidgetLoading.jsx` | Standard widget loading state. |
| `WidgetErrorState.jsx` | Standard widget error state. |
| `WidgetEmptyState.jsx` | Standard widget empty/disconnected state. |
| `index.js` | Barrel exports for widget infrastructure. |

Rules:

- Widget infrastructure must not know about backend APIs.
- Widget infrastructure must not contain feature-specific business logic.
- Professional widgets should reuse this layer before writing custom infrastructure.
- Do not change these components to solve a visual problem belonging to one page or feature.
- Feature-specific variations belong inside the feature widget.

Layering rule:

```text
Material UI
        ↓
TradePilot UI Framework / Common Components
        ↓
Widget Infrastructure
        ↓
Feature and Workspace Widgets
        ↓
Pages
```

Protected status:

```text
frontend/src/components/widgets/
```

This folder is protected during active feature work unless:

- A confirmed bug exists.
- The required change is intentionally global.
- All dependent pages and widgets have been audited.

---

## 5.3 Layout Components

```text
frontend/src/components/layout/
│
├── PageHeader.jsx
└── PageLayout.jsx
```

Purpose:

- Reusable page-level structure.
- Consistent title, subtitle, actions and content spacing.

Current files:

| Component | Purpose |
|---|---|
| `PageHeader.jsx` | Standard page title, subtitle and action area. |
| `PageLayout.jsx` | Standard page content wrapper and spacing. |

Rules:

- Layout components contain no business logic.
- They must not call APIs.
- They must remain reusable across pages.
- Do not change layout components for a single feature-specific requirement.
- Pages should use these components where they already fit the established page pattern.

Protected status:

```text
frontend/src/components/layout/
```

---

## 5.4 Dashboard Components

```text
frontend/src/components/dashboard/
│
├── ai/
│   ├── AICoachWidget.jsx
│   └── index.js
│
├── calendar/
│   ├── EconomicCalendarWidget.jsx
│   └── index.js
│
├── mt5/
│   ├── AccountHealthWidget.jsx
│   ├── ConnectionHealthWidget.jsx
│   ├── MT5Widget.jsx
│   ├── OpenPositionsWidget.jsx
│   ├── PendingOrdersWidget.jsx
│   ├── TodayPerformanceWidget.jsx
│   └── index.js
│
├── portfolio/
│   ├── PortfolioWidget.jsx
│   └── index.js
│
├── psychology/
│   ├── PsychologyWidget.jsx
│   └── index.js
│
├── risk/
│   ├── RiskWidget.jsx
│   └── index.js
│
├── summary/
│   └── DashboardSummaryWidget.jsx
│
├── DashboardLayout.jsx
├── DashboardPlaceholderWidget.jsx
└── WidgetGrid.jsx
```

Purpose:

- Professional Dashboard foundation.
- Reusable Dashboard widgets.
- MT5 Trading Center widgets currently remain under the existing MT5 dashboard component folder.

Current files:

| File | Purpose |
|---|---|
| `DashboardLayout.jsx` | Main Dashboard widget composition. |
| `WidgetGrid.jsx` | Dashboard grid layout. |
| `DashboardPlaceholderWidget.jsx` | Placeholder wrapper for planned widgets. |
| `DashboardSummaryWidget.jsx` | Dashboard KPI and equity summary. |
| `MT5Widget.jsx` | Compact MT5 summary widget for Dashboard overview. |
| `PortfolioWidget.jsx` | Compact Portfolio summary widget. |
| `RiskWidget.jsx` | Risk placeholder widget. |
| `AICoachWidget.jsx` | AI Coach placeholder widget. |
| `PsychologyWidget.jsx` | Psychology placeholder widget. |
| `EconomicCalendarWidget.jsx` | Economic Calendar placeholder widget. |
| `index.js` files | Barrel exports for cleaner imports. |

Rules:

- Dashboard widgets use the generic widget infrastructure.
- Dashboard layout must not contain business logic.
- Dashboard shows summaries only.
- Detailed MT5 information belongs in the MT5 Trading Center.
- Detailed Portfolio information belongs in the Portfolio page.
- Placeholder widgets remain lightweight until their real feature sprint.
- Do not add detailed workspace tables directly to Dashboard.

Protected status:

```text
frontend/src/components/dashboard/DashboardLayout.jsx
frontend/src/components/dashboard/WidgetGrid.jsx
```

---

## 5.5 MT5 Trading Center Widgets

```text
frontend/src/components/dashboard/mt5/
│
├── AccountHealthWidget.jsx
├── ConnectionHealthWidget.jsx
├── MT5Widget.jsx
├── OpenPositionsWidget.jsx
├── PendingOrdersWidget.jsx
├── TodayPerformanceWidget.jsx
└── index.js
```

Purpose:

- Reusable MT5 presentation components.
- Provides both compact Dashboard summary and detailed Trading Center panels.

### `MT5Widget.jsx`

Purpose:

- Compact MT5 summary for Dashboard.
- Uses existing account summary API.
- Must remain an overview widget.

It may show summary metrics such as:

- Balance
- Equity
- Floating P/L
- Open Positions
- Imported Trades
- Connection Status

It must not become a detailed positions or orders workspace.

### `OpenPositionsWidget.jsx`

Purpose:

- Displays live MT5 open positions.
- Used inside the MT5 Trading Center.
- Auto-refreshes live data.

Displayed information includes:

- Ticket
- Symbol
- Direction
- Volume
- Open price
- Current price
- Stop Loss
- Take Profit
- Floating profit
- Swap

### `PendingOrdersWidget.jsx`

Purpose:

- Displays live MT5 pending orders.
- Used inside the MT5 Trading Center.
- Auto-refreshes live data.

Displayed information includes:

- Ticket
- Symbol
- Order type
- Initial/current volume
- Entry price
- Stop Loss
- Take Profit
- Setup time
- Comment

### `AccountHealthWidget.jsx`

Purpose:

- Displays live MT5 account financial health.

Displayed information includes:

- Balance
- Equity
- Margin
- Free Margin
- Margin Level
- Leverage
- Currency
- Login
- Connection status

### `TodayPerformanceWidget.jsx`

Purpose:

- Displays closed MT5 trading activity for the current day.

Displayed information includes:

- Profit Today
- Trades Today
- Win Rate Today
- Lots Today
- Commission
- Swap

### `ConnectionHealthWidget.jsx`

Purpose:

- Displays live MT5 terminal and account connection health.

Displayed information includes:

- Terminal online/offline status
- Trading allowed/disabled
- Terminal build
- Terminal version
- Account server
- Account company

Rules:

- These widgets call existing MT5 API helpers.
- They must not contain hardcoded demo trading data.
- They must preserve standard loading, error and empty states.
- Detailed MT5 widgets belong only in the MT5 Trading Center.
- Dashboard may use only the compact `MT5Widget`.
- Auto-refresh intervals must be cleaned up when components unmount.
- Do not create duplicate widgets for the same live MT5 information.

Current MT5 workspace composition:

```text
MT5.jsx
│
├── Trading Account / Sync panel
├── ConnectionHealthWidget
├── AccountHealthWidget
├── TodayPerformanceWidget
├── OpenPositionsWidget
└── PendingOrdersWidget
```

---

## 5.6 Portfolio Dashboard Widget

```text
frontend/src/components/dashboard/portfolio/
├── PortfolioWidget.jsx
└── index.js
```

Purpose:

- Provides a compact Portfolio summary inside Dashboard.
- Links the user to the full Portfolio workspace.

Current summary information:

- Total Trades
- Net Profit
- Link to Portfolio page

Important data rule:

```text
portfolio.performance.net_profit
```

is the current source for Portfolio Net Profit.

Rules:

- The Dashboard Portfolio widget remains summary-only.
- Allocation, drawdown, statistics and detailed performance belong in the Portfolio page.
- Do not duplicate the complete Portfolio workspace inside Dashboard.
- Reuse the working Portfolio feature data structure instead of guessing field names.

---

## 5.7 Home Components

```text
frontend/src/components/home/
│
├── MarketAlerts.jsx
├── TodayMission.jsx
└── TradingSessions.jsx
```

Purpose:

- Home / Command Center components.

Rules:

- Home components must not contain fake trading performance values presented as real data.
- Future live values must come from real services or APIs.
- Home may provide welcome information, shortcuts, market context and mission guidance.
- Home must remain compatible with the future multi-user login and personal workspace direction.

Current Home page role:

```text
Welcome
↓
Platform overview
↓
Navigation shortcuts
↓
Market / session information
↓
Today mission
```

---

## 5.8 Settings Components

```text
frontend/src/components/settings/
└── mt5/
    ├── MT5AccountCard.jsx
    └── MT5AccountsManager.jsx
```

Purpose:

- Settings module components.
- MT5 account management.

Current files:

| File | Purpose |
|---|---|
| `MT5AccountsManager.jsx` | Manager/container for MT5 accounts. |
| `MT5AccountCard.jsx` | Professional MT5 account card. |

Rules:

- Manager components may own data loading and actions.
- Card components receive prepared props.
- MT5 account UI should continue using reusable TradePilot components.
- Account management remains under Settings.
- Live trading information remains under the MT5 Trading Center.

---

## 5.9 Root-Level Components

```text
frontend/src/components/
│
├── EquityChart.jsx
├── KPICard.jsx
├── NumericField.jsx
├── Sidebar.jsx
├── Topbar.jsx
├── TradeDetailsDialog.jsx
├── TradeDialog.jsx
└── TradeScoreCard.jsx
```

Purpose:

- Existing shared or feature-related components that predate the newer feature organization.

Current files:

| Component | Purpose |
|---|---|
| `EquityChart.jsx` | Equity curve chart. |
| `KPICard.jsx` | Dashboard KPI card. |
| `NumericField.jsx` | Numeric input supporting comma/dot behavior. |
| `Sidebar.jsx` | Application navigation sidebar. |
| `Topbar.jsx` | Application top bar. |
| `TradeDialog.jsx` | Add/edit trade dialog. |
| `TradeDetailsDialog.jsx` | Trade details dialog. |
| `TradeScoreCard.jsx` | Trade score presentation. |

Rules:

- Do not move these during active feature work without a clear migration plan.
- `Sidebar.jsx` is protected.
- Sidebar structure remains frozen until Version 1.0 unless fixing a confirmed bug.
- New feature code should prefer feature folders rather than adding more unrelated root-level components.

---

# 6. Database Structure

```text
database/
└── init.sql
```

Purpose:

- Database bootstrap and initial schema setup.

Current files:

| File | Purpose |
|---|---|
| `init.sql` | Database initialization script. |

Rules:

- Do not store production backups here.
- Do not store temporary exports here.
- Schema changes must be documented.
- Future migrations should use a clear migration strategy.
- Live MT5 positions and pending orders are currently read directly from MT5 and are not stored as new database entities by Sprint 26.

---

# 7. Uploads

```text
uploads/
backend/uploads/
```

Purpose:

- Runtime uploaded files.

Rules:

- Uploads are not source code.
- Do not treat user-uploaded files as architecture files.
- Large or sensitive uploads should not be committed.
- Temporary project ZIP files must be removed before commit.
- Git status should be clean before a feature or sprint is considered complete.

---

# 8. Documentation Folder Summary

```text
docs/
│
├── backlog/
├── changelog/
├── decisions/
├── history/
├── project/
├── roadmap/
├── standards/
│
├── BACKLOG.md
├── CHANGELOG.md
├── COMPONENT_LIBRARY.md
├── DECISIONS.md
├── DESIGN_SYSTEM.md
├── DEVELOPMENT_STANDARDS.md
├── DEVELOPMENT_STANDARDS_MANIFEST.md
├── DOCUMENTATION_MAP.md
├── MANIFEST.md
├── PROJECT_HISTORY.md
├── PROJECT_MASTER.md
├── README.md
├── README_ORIGINAL_BEFORE_REFACTOR.md
└── SOURCE_CODE_STRUCTURE.md
```

Purpose:

- Modular documentation pack.
- Project source of truth.

Important rule:

```text
Root docs/*.md files are entry points, indexes or major project references.
Detailed content belongs in the appropriate modular subfolders.
```

Examples:

| Index / Main File | Detailed Content Folder |
|---|---|
| `PROJECT_MASTER.md` | `project/` |
| `DEVELOPMENT_STANDARDS.md` | `standards/` |
| `DECISIONS.md` | `decisions/` |
| `PROJECT_HISTORY.md` | `history/` |
| `CHANGELOG.md` | `changelog/` |
| `BACKLOG.md` | `backlog/` |

Documentation rules:

- Documentation is the project source of truth.
- Read the documentation tree before assuming a source-code path.
- Update only affected documentation files.
- Do not regenerate the entire documentation architecture during an active sprint.
- Keep Sprint 25 and Sprint 26 history together in the current Version 0.8 documentation update.
- The next sprint prompt belongs under:

```text
docs/project/09_Current_State/
```

---

# 9. Main Data Flow

## Frontend to Backend

```text
Page / Workspace
        ↓
Feature Component or Widget
        ↓
Frontend Service or API Helper
        ↓
FastAPI Router
        ↓
Backend Service or Feature Module
        ↓
Database or External Provider
```

Rules:

- Pages and components do not own backend business logic.
- Routers do not contain large business logic.
- Services and feature modules own calculations and integration logic.
- UI components do not hardcode endpoint URLs when helpers exist.
- Existing consumers should be checked before assuming response field names.

---

## 9.1 Live MT5 Data Flow

```text
MT5 Trading Center Widget
        ↓
mt5AccountsApi.js
        ↓
backend/app/routers/mt5.py
        ↓
backend/app/services/mt5_account_service.py
        ↓
MetaTrader 5 Python API
        ↓
Running MT5 Terminal
```

Current live MT5 data categories:

```text
Account Health
Connection Health
Today's Performance
Open Positions
Pending Orders
```

Rules:

- MT5 terminal must be open and logged in.
- Live data is not replaced by hardcoded values.
- Each endpoint handles unavailable MT5 state without crashing the application.
- Widgets must display professional loading, error and empty states.

---

## 9.2 MT5 History Sync Flow

```text
MT5.jsx / Settings Account Action
        ↓
syncMT5Account()
        ↓
POST /mt5/sync?account_id={id}
        ↓
sync_mt5_history()
        ↓
MT5 history_deals_get()
        ↓
Trade model
        ↓
PostgreSQL
```

Rules:

- Closed-trade import remains separate from live MT5 data.
- Duplicate trades are checked before insertion.
- Account `last_sync` is updated after successful synchronization.

---

# 10. Dashboard Flow

```text
Dashboard.jsx
        ↓
DashboardLayout.jsx
        ↓
WidgetGrid.jsx
        ↓
DashboardSummaryWidget
MT5Widget
PortfolioWidget
RiskWidget
AICoachWidget
PsychologyWidget
EconomicCalendarWidget
        ↓
Widget Infrastructure
        ↓
TradePilot UI Components
        ↓
Material UI
```

Current Dashboard responsibility:

```text
Executive Overview Only
```

Dashboard rules:

- Show summaries.
- Do not display full Open Positions tables.
- Do not display full Pending Orders tables.
- Do not reproduce the complete Portfolio page.
- Link users to the relevant primary workspace for detail.
- Preserve compact, readable overview behavior.

Primary information ownership:

| Information | Primary Workspace |
|---|---|
| Live MT5 details | MT5 Trading Center |
| Portfolio details | Portfolio |
| Historical performance analysis | Analytics |
| Psychology journal | Psychology |
| Reports and exports | Reports |
| Cross-platform summary | Dashboard |

Single-source rule:

> Each business-domain detail has one primary workspace. Other pages may show only a summary or a link to that workspace.

---

# 11. Feature Module Direction

TradePilot Pro continues moving toward feature-module architecture.

Recommended conceptual structure:

```text
feature-module/
│
├── api/
├── services/
├── hooks/
├── components/
├── widgets/
├── dialogs/
├── constants/
└── index.js
```

Current reference implementation:

```text
frontend/src/features/portfolio/
├── components/
├── hooks/
├── services/
└── index.js
```

Rules:

- Reuse an existing feature module before creating parallel code.
- Feature-specific UI belongs inside the corresponding feature.
- Feature-owned hooks and services remain inside the feature module.
- Use barrel exports where they already exist.
- Do not force every small feature into a full module prematurely.
- Do not reorganize working code during an active sprint unless the change has measurable value.
- Architecture discussions belong between sprints, not during active implementation.

Current direction:

```text
Reusable Widgets
        ↓
Reusable Feature Modules
        ↓
Dedicated Workspaces
        ↓
Professional Trading Platform
```

---

# 12. Workspace Responsibility Model

TradePilot Pro uses clear responsibility boundaries between application pages.

## Home

Role:

```text
Welcome / Command Center
```

Responsibilities:

- Platform introduction.
- Navigation shortcuts.
- Market context.
- Trading sessions.
- Today Mission.
- Future multi-user welcome experience.

Rules:

- No fake trading results presented as real data.
- No detailed MT5 or Portfolio analysis.
- Future login and user-specific welcome behavior may be introduced in a later version.

---

## Dashboard

Role:

```text
Executive Overview
```

Responsibilities:

- Cross-platform summaries.
- Key performance indicators.
- Compact MT5 summary.
- Compact Portfolio summary.
- Quick navigation toward detailed workspaces.

Rules:

- No full Open Positions table.
- No full Pending Orders table.
- No complete Portfolio analysis.
- No duplicated detailed information.
- Dashboard remains a summary page.

---

## MT5 Trading Center

Role:

```text
Live Trading Workspace
```

Responsibilities:

- Active MT5 account status.
- Account synchronization.
- Connection health.
- Account health.
- Today’s performance.
- Live open positions.
- Live pending orders.

Rules:

- Detailed live MT5 information belongs here.
- MT5 account management remains under Settings.
- Closed trade synchronization remains separate from live data retrieval.
- The existing `/mt5` route remains unchanged.
- Sidebar structure remains unchanged until Version 1.0.

---

## Portfolio

Role:

```text
Portfolio Analysis Workspace
```

Responsibilities:

- Portfolio summary.
- Performance.
- Allocation.
- Statistics.
- Equity curve.
- Drawdown.
- Detailed portfolio analysis.

Rules:

- Dashboard shows only a compact summary.
- Portfolio remains the primary location for detailed portfolio information.
- Working Portfolio feature components and data structures must be reused.

---

## Analytics

Role:

```text
Historical Analysis Workspace
```

Sprint 27 target responsibilities:

- Equity and balance analysis.
- Drawdown.
- Monthly performance.
- Pair analysis.
- Session analysis.
- Risk and performance charts.

Rules:

- Analytics does not replace Reports.
- Analytics focuses on historical interpretation and comparison.
- Existing charts, services and feature components must be audited before new code is created.

---

## Psychology

Role:

```text
Trader Journal and Psychology Workspace
```

Responsibilities:

- Psychology tracking.
- Emotional state review.
- Discipline and behavior analysis.
- Future coaching support.

Rules:

- Psychology-specific information remains in this workspace.
- Do not duplicate Psychology detail inside Dashboard.

---

## Reports

Role:

```text
Reports and Export Workspace
```

Responsibilities:

- PDF reports.
- Excel exports.
- Printable summaries.
- Future scheduled reports.

Rules:

- Reports are not the primary analytics workspace.
- Reports consume verified application data.
- Report rendering logic belongs in the report layer.

---

# 13. Current Cleanup and Future Notes

These notes are not immediate implementation requirements.

## Frontend

- Continue using `PageLayout` and `PageHeader` where already established.
- Keep Dashboard summary-only.
- Keep detailed MT5 widgets inside MT5 Trading Center.
- Keep detailed Portfolio information inside Portfolio.
- Avoid adding more unrelated root-level components.
- Existing placeholder widgets should be implemented only in their dedicated sprint.
- Do not redesign Sidebar again before Version 1.0.
- Do not modify protected global widgets for feature-specific visual issues.
- Remove temporary ZIP files before commit.
- Keep generated `dist/` and `node_modules/` outside Git.

## Backend

- `mt5_account_service.py` now contains several live MT5 functions.
- This is acceptable for Version 0.8.
- Do not refactor it during active feature development only for code organization.
- A future dedicated MT5 service refactor may be considered when measurable value exists.
- `backend/app/jobs/` remains a future placeholder.
- Live MT5 positions and pending orders are not persisted as new database entities in Sprint 25-26.
- Today’s Performance currently reads closed deals from the current MT5 trading day.

Possible future service organization:

```text
services/
├── dashboard/
├── mt5/
├── reports/
├── rules/
└── trading_plan/
```

This must not be implemented without a dedicated audit and refactor plan.

## Documentation

- Keep root index files concise.
- Keep detailed content in modular subfolders.
- Update only files affected by the sprint.
- Do not redesign the documentation architecture during active Version 0.8 work.
- Keep Sprint 25 and Sprint 26 together in the current documentation update.
- Create the next sprint prompt before starting the next sprint.
- Documentation must reflect the real project tree.
- Source paths must never be assumed when the documentation tree already provides them.

---

# 14. Protected Components and Infrastructure

The following areas are protected during active feature work:

```text
frontend/src/components/widgets/
frontend/src/components/layout/
frontend/src/components/Sidebar.jsx
frontend/src/components/dashboard/DashboardLayout.jsx
frontend/src/components/dashboard/WidgetGrid.jsx
frontend/src/theme/
```

Protection rule:

Do not modify protected infrastructure unless:

1. A confirmed bug exists.
2. The change is intentionally system-wide.
3. Importers and dependents have been audited.
4. Build and regression checks are completed.

Feature-specific styling or behavior must be implemented inside:

- The feature component.
- The workspace widget.
- The page-level composition.

---

# 15. Development Workflow

Every feature follows this sequence:

```text
Audit
↓
Design
↓
Reuse Existing Implementation
↓
Implementation
↓
Build
↓
Test
↓
Commit
↓
Push
↓
Documentation
↓
Clean Git Status
```

Rules:

1. One feature at a time.
2. Audit the real files before editing.
3. Check existing pages, components, services, hooks and endpoints.
4. Reuse first.
5. Extend second.
6. Create new code only when necessary.
7. Do not redesign working code without measurable value.
8. Do not leave duplicate UI after moving a feature.
9. Do not leave temporary transfer files inside the repository.
10. A feature is complete only after build, test, commit, push and clean Git status.
11. When the user says `οκ ετοιμο`, the previous action is confirmed and work continues immediately.
12. Documentation is updated only after the implementation is stable.

---

# 16. Development Rules Summary

1. Small and safe implementation steps.
2. Documentation is the source of truth.
3. Read the real project tree before assuming paths.
4. Audit before implementation.
5. Reuse before creating new code.
6. Pages compose.
7. Services decide.
8. Routers route.
9. Models define database structure.
10. Schemas define API contracts.
11. Generic UI remains separate from feature business logic.
12. Protected infrastructure remains stable.
13. Detailed information belongs to one primary workspace.
14. Dashboard shows summaries only.
15. Do not leave duplicated UI or abandoned temporary implementations.
16. Do not commit generated or temporary files.
17. Build and test before continuing.
18. Commit and push completed features.
19. Update only affected documentation.
20. Finish each sprint with a clean working tree.

---

# 17. Sprint 22 Source Structure Update

Sprint 22 introduced the frontend Portfolio Feature Module:

```text
frontend/src/features/
└── portfolio/
    ├── components/
    ├── hooks/
    ├── services/
    └── index.js
```

This remains the current reference implementation for reusable frontend feature modules.

---

# 18. Sprint 24 Source Structure Update

Sprint 24 added the shared layout folder:

```text
frontend/src/components/layout/
├── PageHeader.jsx
└── PageLayout.jsx
```

The layout layer is responsible only for:

- Page title.
- Page subtitle.
- Page action area.
- Content spacing.
- Page width and structure.

It must not contain:

- Business logic.
- API calls.
- Feature-specific state.

Sprint 24 also added:

```text
frontend/src/features/portfolio/components/PortfolioChartsCard.jsx
```

and connected the compact Dashboard MT5 widget to existing MT5 account summary infrastructure.

No duplicate MT5 summary endpoint was created.

---

# 19. Sprint 25 Source Structure Update

Sprint 25 added live MT5 Open Positions support.

Backend additions:

```text
backend/app/services/mt5_account_service.py
    get_live_mt5_open_positions()

backend/app/routers/mt5.py
    GET /mt5/open-positions
```

Frontend additions:

```text
frontend/src/api/mt5AccountsApi.js
    getMT5OpenPositions()

frontend/src/components/dashboard/mt5/OpenPositionsWidget.jsx
```

The widget introduced:

- Live MT5 position retrieval.
- Automatic refresh.
- Standard loading state.
- Standard error state.
- Standard disconnected/empty state.
- Detailed open-position presentation.

The detailed Open Positions widget was initially integrated into Dashboard and later moved to the MT5 Trading Center during Sprint 26.

---

# 20. Sprint 26 Source Structure Update

Sprint 26 completed the MT5 Trading Center and cleaned duplicated information from core pages.

## Backend Additions

New functions inside:

```text
backend/app/services/mt5_account_service.py
```

```text
get_live_mt5_pending_orders()
get_live_mt5_account_health()
get_live_mt5_today_performance()
get_live_mt5_connection_health()
```

New endpoints inside:

```text
backend/app/routers/mt5.py
```

```text
GET /mt5/pending-orders
GET /mt5/account-health
GET /mt5/today-performance
GET /mt5/connection-health
```

## Frontend API Additions

New helpers inside:

```text
frontend/src/api/mt5AccountsApi.js
```

```text
getMT5PendingOrders()
getMT5AccountHealth()
getMT5TodayPerformance()
getMT5ConnectionHealth()
```

## Frontend Widget Additions

```text
frontend/src/components/dashboard/mt5/
├── AccountHealthWidget.jsx
├── ConnectionHealthWidget.jsx
├── OpenPositionsWidget.jsx
├── PendingOrdersWidget.jsx
└── TodayPerformanceWidget.jsx
```

## MT5 Page Evolution

```text
frontend/src/pages/MT5.jsx
```

evolved from a simple synchronization page into the full:

```text
MT5 Trading Center
```

Current composition:

```text
Trading Account / Sync
Connection Health
Account Health
Today's Performance
Open Positions
Pending Orders
```

## Dashboard Cleanup

Detailed Open Positions and Pending Orders were removed from Dashboard.

Dashboard now remains:

```text
Executive Overview
```

The compact `MT5Widget.jsx` remains the Dashboard MT5 summary.

## Portfolio Cleanup

```text
frontend/src/components/dashboard/portfolio/PortfolioWidget.jsx
```

was converted into a compact summary widget.

It currently shows:

- Total Trades.
- Net Profit.
- Navigation to Portfolio.

Detailed Portfolio data remains in:

```text
frontend/src/pages/Portfolio.jsx
frontend/src/features/portfolio/
```

## Home Cleanup

```text
frontend/src/pages/Home.jsx
```

was converted from a demo-data page into:

```text
Welcome / Command Center
```

Removed:

- Hardcoded P/L.
- Fake trade counts.
- Fake win rate.
- Fake latest trades.
- Hardcoded personal greeting.

Added:

- Platform introduction.
- Feature overview.
- Dashboard shortcut.
- MT5 Trading Center shortcut.
- Version 0.8 focus.

## Product Responsibility Result

```text
Home
    ↓
Welcome / Command Center

Dashboard
    ↓
Executive Overview

MT5
    ↓
Live Trading Center

Portfolio
    ↓
Portfolio Analysis

Analytics
    ↓
Historical Analysis
```

This is the active responsibility model for the remainder of Version 0.8.

---

# Closing Note

`SOURCE_CODE_STRUCTURE.md` is a living developer handbook.

It must be read near the beginning of every TradePilot Pro development session together with:

```text
docs/PROJECT_MASTER.md
docs/DEVELOPMENT_STANDARDS.md
docs/DECISIONS.md
docs/CHANGELOG.md
docs/BACKLOG.md
docs/DESIGN_SYSTEM.md
docs/COMPONENT_LIBRARY.md
docs/project/09_Current_State/Current_Project_Status.md
docs/project/11_ACTIVE_SPRINT.md
```

Current project context:

```text
Sprint 25: Completed
Sprint 26: Completed
Sprint 27: Analytics Center
Sprint 28: Version 0.8 Completion
```

The source-code structure must remain aligned with:

- The real repository tree.
- The current architecture decisions.
- The protected infrastructure rules.
- The single-primary-workspace rule.
- The active sprint scope.

---

# Sprint 27-28 Source Structure Update

## Analytics Feature

```text
frontend/src/features/analytics/
└── hooks/
    └── useAnalytics.js

frontend/src/services/
└── analyticsService.js

frontend/src/pages/
└── Analytics.jsx
```

Analytics must reuse the shared Widget System and existing backend data sources.

## MT5 Synchronization Engine v2

```text
backend/app/services/mt5/
├── __init__.py
├── models.py
├── builder.py
├── aggregator.py
├── validator.py
├── repository.py
└── sync_service.py
```

Responsibilities:

- `models.py`: normalized synchronization data objects.
- `builder.py`: conversion from raw MetaTrader 5 objects.
- `aggregator.py`: position-level aggregation of deals and orders.
- `validator.py`: lifecycle and volume validation.
- `repository.py`: database lookup, create, save, commit and rollback.
- `sync_service.py`: synchronization orchestration and Trade mapping.

Compatibility entry point:

```text
backend/app/services/mt5_sync.py
```

The existing router continues importing `sync_mt5_history()` from this compatibility layer.

## Canonical MT5 Identity

```text
mt5_account_id + mt5_position_id
```

A deal ticket is traceability data, not the canonical Trade identity.

## Shared Frontend Infrastructure

Dashboard, Portfolio and Analytics must compose:

```text
PageLayout
↓
WidgetContainer / WidgetHeader
↓
WidgetMetric / WidgetMetricGrid / WidgetMetrics
↓
Theme tokens
```

Do not create page-specific KPI design systems.


## Sprint 29 Multi-Asset Additions

```text
backend/app/services/mt5/movement.py
    Canonical broker-metadata-driven movement calculation.

backend/app/features/portfolio/engines/movement_engine.py
    Shared movement grouping and unit totals.

backend/app/features/portfolio/engines/analytics_engine.py
    Symbol, hour, system and psychology movement aggregation.

backend/app/routers/dashboard.py
    Dashboard and Analytics movement-breakdown endpoints.

frontend/src/features/portfolio/components/PortfolioAllocationCard.jsx
    Allocation presentation by asset class.
```

Canonical data flow:

```text
MT5 symbol metadata
→ services/mt5/movement.py
→ Trade movement fields
→ portfolio movement/analytics engines
→ Dashboard / Portfolio APIs
→ Dashboard / Analytics / Reports / Psychology / Trades UI
```
