# TradePilot Pro - Source Code Structure

> Current source-code structure for TradePilot Pro at the end of Sprint 20.
>
> Purpose: this file is the developer onboarding map for the project. It documents the real folder structure, the responsibility of each area, and the architectural rules that should be followed in future development.

\---

# 1\. Architecture Version

```text
Project: TradePilot Pro
Architecture Version: 2.0
Current Sprint Context: Sprint 20 - Professional Dashboard / Widget Infrastructure Foundation
```

TradePilot Pro currently follows this high-level architecture:

```text
Application Pages
        ↓
Feature Modules
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
Database
```

\---

# 2\. Root Project Structure

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

|Path|Purpose|
|-|-|
|`backend/`|FastAPI backend application.|
|`frontend/`|React + Vite frontend application.|
|`database/`|SQL bootstrap / database initialization scripts.|
|`docs/`|Modular project documentation pack.|
|`uploads/`|Runtime uploaded files. Not core source code.|
|`.gitignore`|Git exclusion rules.|
|`CHANGELOG.md`|Root-level changelog file. Long-term source of truth should remain under `docs/CHANGELOG.md` / `docs/changelog/`.|

## Excluded / Generated Local Folders

These folders can exist locally but are not considered source-code architecture:

```text
venv/
node\_modules/
\_\_pycache\_\_/
.pytest\_cache/
.idea/
.vscode/
```

Rules:

* Do not commit `venv/`.
* Do not commit `node\_modules/`.
* Do not commit `\_\_pycache\_\_/`.
* Do not commit `.env` files.
* Runtime uploads should not become application source code.

\---

# 3\. Backend Structure

```text
backend/
│
├── app/
├── uploads/
├── venv/                  # local only, excluded
├── node\_modules/          # generated/local only, excluded
│
├── .env                   # local configuration, excluded
└── requirements.txt
```

## Backend Root Responsibilities

|Path|Purpose|
|-|-|
|`backend/app/`|Main FastAPI application code.|
|`backend/uploads/`|Backend runtime uploads.|
|`backend/requirements.txt`|Python dependencies.|
|`backend/.env`|Local environment variables. Must not be committed.|

\---

## 3.1 Backend Application Tree

```text
backend/app/
│
├── core/
│   ├── database.py
│   └── deps.py
│
├── jobs/                  # currently empty placeholder
│
├── models/
│   ├── mt5\_account.py
│   ├── trade.py
│   ├── trading\_plan.py
│   └── user.py
│
├── reports/
│   └── pdf\_report.py
│
├── routers/
│   ├── dashboard.py
│   ├── exports.py
│   ├── mt5.py
│   ├── rule\_engine.py
│   ├── trades.py
│   ├── trading\_plans.py
│   └── portfolio.py

│
├── schemas/
│   ├── mt5\_account.py
│   ├── trade.py
│   ├── trading\_plan.py
│   └── portfolio.py

│
├── services/
│   ├── mt5\_account\_service.py
│   ├── mt5\_sync.py
│   ├── rule\_engine.py
│   ├── scheduler.py
│   ├── sync\_engine.py

│   └── portfolio\_service.py
│
├── utils/
│   └── trade\_stats.py
│
└── main.py
```

\---

## 3.2 Backend Layer Responsibilities

### `backend/app/main.py`

Purpose:

* FastAPI application entry point.
* Registers routers.
* Configures application-level middleware such as CORS.

Rules:

* Keep `main.py` thin.
* Do not place business logic here.
* Do not place SQL logic here.

\---

### `backend/app/core/`

Purpose:

* Core backend configuration and shared dependencies.

Current files:

|File|Purpose|
|-|-|
|`database.py`|Database engine/session configuration.|
|`deps.py`|Shared FastAPI dependencies.|

Rules:

* Database session handling belongs here.
* Shared dependency helpers belong here.
* Business logic does not belong here.

\---

### `backend/app/models/`

Purpose:

* SQLAlchemy ORM models.
* Database table definitions and relationships.

Current files:

|File|Purpose|
|-|-|
|`user.py`|User model.|
|`trade.py`|Trade model.|
|`trading\_plan.py`|Trading Plan model.|
|`mt5\_account.py`|MT5 Account model.|

Rules:

* Models define database shape.
* Do not put business logic in models.
* Do not put API response formatting in models.
* External system IDs should not replace internal database primary keys.

\---

### `backend/app/schemas/`

Purpose:

* Pydantic request / response schemas.
* Input and output validation.

Current files:

|File|Purpose|
|-|-|
|`trade.py`|Trade request / response DTOs.|
|`trading\_plan.py`|Trading Plan request / response DTOs.|
|`mt5\_account.py`|MT5 account request / response DTOs and summary objects.|

Rules:

* Schemas define API contracts.
* No business logic.
* No SQLAlchemy session usage.

\---

### `backend/app/routers/`

Purpose:

* FastAPI route layer.
* HTTP endpoints only.

Current files:

|File|Purpose|
|-|-|
|`dashboard.py`|Dashboard summary and equity endpoints.|
|`exports.py`|Export endpoints.|
|`mt5.py`|MT5 account and sync endpoints.|
|`rule\_engine.py`|Rule Engine endpoints.|
|`trades.py`|Trade CRUD endpoints.|
|`trading\_plans.py`|Trading Plan endpoints.|

Rules:

* Routers stay thin.
* Routers validate request flow and call services.
* Business logic belongs in `services/`.
* Database sessions should use dependencies from `core/`.

\---

### `backend/app/services/`

Purpose:

* Backend business logic layer.
* External integrations.
* Sync logic.
* Rule calculations.

Current files:

|File|Purpose|
|-|-|
|`mt5\_account\_service.py`|MT5 account business logic and account summary support.|
|`mt5\_sync.py`|MT5 trade import / sync logic.|
|`sync\_engine.py`|Sync readiness and sync status foundation.|
|`scheduler.py`|Future scheduling foundation.|
|`rule\_engine.py`|Rule Engine evaluation logic.|

Rules:

* Services own business rules.
* Routers should call services instead of implementing logic directly.
* MT5 import logic should stay separated from scheduling logic.
* Sync scheduling logic should not be mixed into trade import logic.

Current sync responsibility split:

```text
mt5\_sync.py
    ↓
imports MT5 trades

sync\_engine.py
    ↓
determines sync readiness / sync status

scheduler.py
    ↓
future recurring/background execution foundation
```

\---

### `backend/app/reports/`

Purpose:

* Report generation.

Current files:

|File|Purpose|
|-|-|
|`pdf\_report.py`|PDF report generation logic.|

Rules:

* Report rendering logic belongs here.
* Routers should call report functions/services instead of building PDFs inline.

\---

### `backend/app/utils/`

Purpose:

* Small utility functions that are not large business services.

Current files:

|File|Purpose|
|-|-|
|`trade\_stats.py`|Trade statistics helpers.|

Rules:

* Utilities should stay small and focused.
* If utility logic grows into business logic, move it into `services/`.

\---

### `backend/app/jobs/`

Status:

```text
Currently empty placeholder.
```

Purpose:

* Future background or scheduled jobs.

Rules:

* Do not add business logic here until background execution is formally introduced.
* Scheduler-related work should remain aligned with `sync\_engine.py` and `scheduler.py`.

\---

# 4\. Frontend Structure

```text
frontend/
│
├── public/
├── src/
├── node\_modules/          # generated/local only, excluded
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

|Path|Purpose|
|-|-|
|`public/`|Static public assets.|
|`src/`|React application source code.|
|`package.json`|Frontend dependencies and scripts.|
|`package-lock.json`|Locked dependency versions.|
|`vite.config.js`|Vite configuration.|
|`.oxlintrc.json`|Lint configuration.|
|`index.html`|Vite HTML entry.|

Rules:

* Do not commit `node\_modules/`.
* React source code belongs in `src/`.
* Reusable UI belongs under `src/components/`.

\---

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
├── hooks/                 # currently empty placeholder
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Analytics.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── MT5.jsx
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

\---

## 4.2 Frontend Layer Responsibilities

### `frontend/src/api/`

Purpose:

* Low-level API helpers and dedicated backend API functions.

Current files:

|File|Purpose|
|-|-|
|`api.js`|Base API / Axios configuration.|
|`mt5AccountsApi.js`|MT5 account API functions.|

Rules:

* API endpoint functions should live here when they are shared or module-specific.
* Components should not hardcode backend URLs when an API file exists.

\---

### `frontend/src/services/`

Purpose:

* Frontend service layer.
* Organizes API access for pages and modules.

Current files:

|File|Purpose|
|-|-|
|`dashboardService.js`|Dashboard summary / equity data access.|
|`ruleEngineService.js`|Rule Engine API access.|
|`tradeService.js`|Trades API access.|
|`tradingPlanService.js`|Trading Plan API access.|

Rules:

* Pages should call services/API functions, not hardcode data access.
* UI components should not know endpoint URLs.
* Shared data-access logic should be extracted here.

\---

### `frontend/src/pages/`

Purpose:

* Top-level application pages.
* Page composition and data loading.

Current pages:

|Page|Purpose|
|-|-|
|`Dashboard.jsx`|Professional Dashboard / Command Center entry.|
|`Home.jsx`|Home page.|
|`MT5.jsx`|MT5 section page.|
|`Trades.jsx`|Trades page.|
|`TradingPlan.jsx`|Trading Plan page.|
|`Analytics.jsx`|Analytics page.|
|`Psychology.jsx`|Psychology page.|
|`Reports.jsx`|Reports page.|
|`Settings.jsx`|Settings page.|

Rules:

* Pages compose modules and widgets.
* Pages may load data and pass prepared props to widgets.
* Pages should not become large UI files.
* When a page grows too large, extract widgets, cards, dialogs, toolbars, hooks, or services.

Current Sprint 20 Dashboard pattern:

```text
Dashboard.jsx
        ↓
DashboardLayout.jsx
        ↓
WidgetGrid.jsx
        ↓
Dashboard widgets
```

\---

### `frontend/src/layouts/`

Purpose:

* Application layout structure.

Current files:

|File|Purpose|
|-|-|
|`MainLayout.jsx`|Main application shell / page layout.|

Rules:

* Layouts should handle shell structure, not business logic.
* Sidebar / Topbar may be used by layout layer.

\---

### `frontend/src/theme/`

Purpose:

* TradePilot visual theme.
* Material UI theme configuration.

Current files:

|File|Purpose|
|-|-|
|`theme.js`|Theme colors, typography, component style foundation.|

Rules:

* Prefer semantic theme colors over hardcoded colors.
* Design changes should be centralized in theme or reusable components when possible.

\---

### `frontend/src/hooks/`

Status:

```text
Currently empty placeholder.
```

Purpose:

* Future reusable React hooks.

Rules:

* Place reusable stateful logic here when it is shared by multiple components.
* Do not create a hook for one-off logic unless it improves clarity.

\---

# 5\. Frontend Components

```text
frontend/src/components/
│
├── common/
├── dashboard/
├── frontend/              # currently empty placeholder
├── home/
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
├── TradeScoreCard.jsx
└── COMPONENT\_AUDIT.md     # temporary audit file, should move to docs
```

## Component Folder Responsibilities

|Path|Purpose|
|-|-|
|`components/common/`|TradePilot UI Framework reusable components.|
|`components/widgets/`|Generic widget infrastructure introduced in Sprint 20.|
|`components/dashboard/`|Dashboard feature widgets and layout.|
|`components/home/`|Home page components.|
|`components/settings/`|Settings feature components.|
|`components/frontend/`|Empty placeholder. Needs future clarification before use.|

Rules:

* Generic UI goes to `common/` or `widgets/`.
* Feature-specific components stay in their feature folder.
* Do not duplicate UI patterns when reusable components exist.
* Documentation/audit files should eventually live in `docs/`, not inside `src/`.

\---

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

* Core TradePilot UI Framework components.
* These are reusable across application modules.

Current files:

|Component|Purpose|
|-|-|
|`TradePilotCard.jsx`|Branded base card component.|
|`TradePilotButton.jsx`|Standard TradePilot button.|
|`StatusBadge.jsx`|Consistent status badge.|
|`SectionHeader.jsx`|Reusable section title/header.|
|`InfoRow.jsx`|Label/value row component.|
|`MetricCard.jsx`|Generic reusable metric card from Sprint 19.|

Rules:

* Use these before raw MUI when the pattern exists.
* These components should remain generic and reusable.
* Avoid adding feature-specific logic here.

\---

## 5.2 Widget Infrastructure

```text
frontend/src/components/widgets/
│
├── WidgetContainer.jsx
├── WidgetFooter.jsx
├── WidgetHeader.jsx
├── WidgetMetric.jsx

├── WidgetLoading.jsx

├── WidgetErrorState.jsx

├── WidgetEmptyState.jsx
└── index.js
```

Purpose:

* Generic widget infrastructure layer introduced in Sprint 20.
* Shared by Dashboard widgets and future professional widgets.

Current files:

|Component|Purpose|
|-|-|
|`WidgetContainer.jsx`|Base container for all professional widgets.|
|`WidgetHeader.jsx`|Standard widget title/subtitle/action area.|
|`WidgetFooter.jsx`|Standard widget footer/action area.|
|`WidgetMetric.jsx`|Widget-level metric display.|
|`index.js`|Barrel exports for clean widget infrastructure imports.|

Rules:

* Widget infrastructure must not know about backend APIs.
* Widget infrastructure must not contain feature-specific business logic.
* Professional widgets should use this layer before writing local layout code.

Layering rule:

```text
Material UI
        ↓
TradePilot UI Framework / common components
        ↓
Widget Infrastructure
        ↓
Feature Widgets
        ↓
Pages
```

\---

## 5.3 Dashboard Components

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
│   ├── MT5Widget.jsx
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

* Professional Dashboard foundation.
* Host widget layout and dashboard feature widgets.

Current files:

|File|Purpose|
|-|-|
|`DashboardLayout.jsx`|Main dashboard widget layout composition.|
|`WidgetGrid.jsx`|Dashboard grid layout.|
|`DashboardPlaceholderWidget.jsx`|Placeholder wrapper for planned widgets.|
|`DashboardSummaryWidget.jsx`|Existing dashboard KPI + equity summary extracted from page.|
|`MT5Widget.jsx`|Sprint 20 MT5 dashboard widget foundation.|
|`PortfolioWidget.jsx`|Portfolio placeholder widget.|
|`RiskWidget.jsx`|Risk placeholder widget.|
|`AICoachWidget.jsx`|AI Coach placeholder widget.|
|`PsychologyWidget.jsx`|Psychology placeholder widget.|
|`EconomicCalendarWidget.jsx`|Economic Calendar placeholder widget.|
|`index.js` files|Barrel exports for cleaner imports.|

Rules:

* Dashboard feature widgets should use `components/widgets/` infrastructure.
* Dashboard layout should not contain business logic.
* Placeholder widgets should stay lightweight.
* Real widgets should eventually receive prepared data via props or hooks/services.

\---

## 5.4 Home Components

```text
frontend/src/components/home/
│
├── MarketAlerts.jsx
├── TodayMission.jsx
└── TradingSessions.jsx
```

Purpose:

* Home page dashboard-style widgets.

Rules:

* Future home widgets should follow widget infrastructure when upgraded.
* Home-specific logic should not be placed in common components.

\---

## 5.5 Settings Components

```text
frontend/src/components/settings/
└── mt5/
    ├── MT5AccountCard.jsx
    └── MT5AccountsManager.jsx
```

Purpose:

* Settings module components.
* Currently includes MT5 account management UI.

Current files:

|File|Purpose|
|-|-|
|`MT5AccountsManager.jsx`|Manager/container for MT5 accounts.|
|`MT5AccountCard.jsx`|Professional MT5 account card from Sprint 19.|

Rules:

* Manager components can own data loading and actions.
* Card components should receive prepared props.
* MT5 account UI should continue using TradePilot reusable components.

\---

## 5.6 Root-Level Components

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

* Existing shared or feature-related components that predate the latest folder organization.

Current files:

|Component|Purpose|
|-|-|
|`EquityChart.jsx`|Equity curve chart.|
|`KPICard.jsx`|Dashboard KPI card.|
|`NumericField.jsx`|Numeric input supporting comma/dot behavior.|
|`Sidebar.jsx`|App navigation sidebar.|
|`Topbar.jsx`|App top bar.|
|`TradeDialog.jsx`|Add/edit trade dialog.|
|`TradeDetailsDialog.jsx`|Trade details dialog.|
|`TradeScoreCard.jsx`|Trade score presentation.|

Future note:

* Some root-level components may later move into feature folders.
* Do not move them during active feature work unless there is a clear refactor plan.

\---

# 6\. Database Structure

```text
database/
└── init.sql
```

Purpose:

* Database bootstrap and initial schema setup.

Current files:

|File|Purpose|
|-|-|
|`init.sql`|Database initialization script.|

Rules:

* Do not store production backups here.
* Do not store temporary exports here.
* Schema changes should be documented.
* Future migrations should use a clear migration strategy.

\---

# 7\. Uploads

```text
uploads/
```

Purpose:

* Runtime uploaded files.

Rules:

* Uploads are not source code.
* Do not treat uploaded user files as architecture files.
* Large or sensitive uploads should not be committed to Git.

\---

# 8\. Documentation Folder Summary

```text
docs/
│
├── backlog/
├── changelog/
├── decisions/
├── docs/
├── history/
├── project/
├── roadmap/
├── standards/
│
├── BACKLOG.md
├── CHANGELOG.md
├── COMPONENT\_LIBRARY.md
├── DECISIONS.md
├── DESIGN\_SYSTEM.md
├── DEVELOPMENT\_STANDARDS.md
├── DEVELOPMENT\_STANDARDS\_MANIFEST.md
├── MANIFEST.md
├── NEXT\_CHAT\_PROMPT\_SPRINT20.md
├── PROJECT\_HISTORY.md
├── PROJECT\_MASTER.md
├── README.md
└── SOURCE\_CODE\_STRUCTURE.md
```

Purpose:

* Modular Documentation v2 pack.

Important documentation rule:

```text
Root docs/\*.md files are mostly indexes / entry points.
Real content belongs in the appropriate subfolders.
```

Examples:

|Index|Real content folder|
|-|-|
|`PROJECT\_MASTER.md`|`project/`|
|`DEVELOPMENT\_STANDARDS.md`|`standards/`|
|`DECISIONS.md`|`decisions/`|
|`PROJECT\_HISTORY.md`|`history/`|
|`CHANGELOG.md`|`changelog/`|
|`BACKLOG.md`|`backlog/`|

Note:

* `DESIGN\_SYSTEM..md` was identified as a mistaken duplicate and should be removed.
* Official design system file is `docs/DESIGN\_SYSTEM.md`.

\---

# 9\. Main Data Flow

## Frontend to Backend

```text
Page / Manager Component
        ↓
Frontend Service or API Function
        ↓
FastAPI Router
        ↓
Backend Service
        ↓
SQLAlchemy Model
        ↓
PostgreSQL Database
```

Rules:

* Pages and components do not directly own backend business logic.
* Routers should not contain large business logic.
* Services should own business decisions and calculations.

\---

# 10\. Dashboard Flow

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

Current Sprint 20 result:

* Dashboard page is cleaner.
* Dashboard summary is extracted into its own widget.
* Professional widget placeholders exist.
* Widget infrastructure exists under `components/widgets/`.
* MT5 dashboard widget foundation uses `WidgetContainer`, `WidgetHeader`, `WidgetMetric`, and `WidgetFooter`.

\---

# 11\. Feature Module Direction

TradePilot Pro is moving toward feature-module architecture.

Future modules should be structured conceptually as:

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

Current code is not fully migrated to this model yet. Sprint 20 established the foundation through dashboard widgets and widget infrastructure.

Rules:

* Do not create a large single component when a feature will grow.
* Prefer manager/container + small components.
* Prefer reusable widget infrastructure for widget-style UI.

\---

# 12\. Current Cleanup / Future Notes

These are not urgent changes, but should be reviewed in future sprints.

## Frontend

* Clarify the purpose of `frontend/src/components/frontend/` because it is currently empty.
* Consider moving old root-level components into feature folders only when there is a clear refactor plan.
* Continue converting professional widgets to use `components/widgets/`.
* Move `frontend/src/components/COMPONENT\_AUDIT.md` into `docs/project/09\_Current\_State/FRONTEND\_COMPONENT\_AUDIT.md` after Sprint 20 documentation is finalized.

## Backend

* `backend/app/jobs/` is currently empty. Keep it as a future placeholder unless background jobs are introduced.
* Future service organization may become nested by domain:

```text
services/
├── dashboard/
├── mt5/
├── reports/
├── rules/
└── trading\_plan/
```

Do not do this refactor until the service layer grows enough to justify it.

## Documentation

* Keep index files clean.
* Put real content into modular subfolders.
* Update `SOURCE\_CODE\_STRUCTURE.md` whenever folders/modules change.

\---

# 13\. Development Rules Summary

1. Small safe steps.
2. Documentation-first for architecture changes.
3. Pages compose; services decide; routers route.
4. Reusable UI before local custom UI.
5. Widget infrastructure before widget-specific layout duplication.
6. No business logic in UI infrastructure.
7. No SQL/business logic in routers.
8. No generated folders in Git.
9. Do not delete historical documentation; move completed work to changelog/history.
10. Update this file when folder structure changes.

\---

# Closing Note

`SOURCE\_CODE\_STRUCTURE.md` is a living developer handbook.

It should be one of the first files read at the start of a new TradePilot Pro development session, together with:

```text
docs/PROJECT\_MASTER.md
docs/DEVELOPMENT\_STANDARDS.md
docs/DECISIONS.md
docs/CHANGELOG.md
docs/BACKLOG.md
docs/DESIGN\_SYSTEM.md
```



---

## Sprint 22 Source Structure Update

Frontend Feature Module example:

```text
frontend/src/features/
└── portfolio/
    ├── components/
    ├── hooks/
    ├── services/
    └── index.js
```

This structure becomes the recommended template for future feature modules.
