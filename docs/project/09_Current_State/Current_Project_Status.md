# Current Project Status

Status updated after Sprint 26.

---

## Completed Through Sprint 26

### Backend

- FastAPI backend foundation.
- PostgreSQL + SQLAlchemy foundation.
- MT5 multi-account architecture.
- MT5 Account CRUD.
- Account-aware MT5 sync.
- MT5 account summary endpoint:
  - `GET /mt5/accounts/{account_id}/summary`
- MT5 sync status endpoint.
- Portfolio backend modularization.
- Portfolio overview / analytics API foundation.
- Portfolio engines for summary, performance, risk, equity and drawdown.
- Live MT5 Open Positions endpoint.
- Live MT5 Pending Orders endpoint.
- Live MT5 Account Health endpoint.
- Live MT5 Today's Performance endpoint.
- Live MT5 Connection Health endpoint.

---

### Frontend

- React + Vite + Material UI foundation.
- TradePilot Theme foundation.
- Sidebar navigation.
- Dashboard layout and widget grid.
- Widget Infrastructure:
  - `WidgetContainer`
  - `WidgetHeader`
  - `WidgetFooter`
  - `WidgetMetric`
  - `WidgetMetricGrid`
  - `WidgetMetrics`
  - `WidgetLoading`
  - `WidgetErrorState`
  - `WidgetEmptyState`
- Shared layout foundation:
  - `PageHeader`
  - `PageLayout`
- Portfolio Feature Module:
  - `usePortfolio`
  - `PortfolioSummaryMetrics`
  - `PortfolioPerformanceMetrics`
  - `PortfolioStatisticsCard`
  - `PortfolioAllocationCard`
  - `PortfolioChartsCard`
- Full Portfolio page route:
  - `/portfolio`
- Dashboard MT5 Widget connected to live MT5 account summary data.
- MT5 Trading Center completed.
- Open Positions widget.
- Pending Orders widget.
- Account Health widget.
- Today's Performance widget.
- Connection Health widget.
- Dashboard cleanup completed.
- Portfolio Dashboard widget converted to summary view.
- Home page converted into Welcome / Command Center.

---

## Sprint 25 Completed

Sprint 25 completed:

- Live MT5 Open Positions.
- Backend MT5 Open Positions API.
- Frontend Open Positions widget.
- Automatic refresh support.
- Professional MT5 position presentation.

---

## Sprint 26 Completed

Sprint 26 completed:

- MT5 Trading Center.
- Pending Orders.
- Account Health.
- Today's Performance.
- Connection Health.
- Dashboard cleanup.
- Portfolio summary widget redesign.
- Home page cleanup.
- Removal of duplicated MT5 information.
- Clear workspace responsibility model.

---

## Current Architecture Status

Frontend now follows:

```text
App / Routes
↓
MainLayout
↓
Sidebar
↓
PageLayout
↓
Pages / Feature Modules
↓
Dashboard Widgets / Workspace Widgets
↓
Widget Infrastructure
↓
TradePilot UI Framework
↓
Material UI
```

Backend continues to follow:

```text
Routers
↓
Services / Feature Modules
↓
Models / Schemas
↓
Database
↓
MetaTrader 5
```

---

## Protected Components

The following components are considered shared infrastructure and must not be changed for a single page-specific visual issue:

```text
frontend/src/components/widgets/WidgetContainer.jsx
frontend/src/components/widgets/WidgetHeader.jsx
frontend/src/components/widgets/WidgetFooter.jsx
frontend/src/components/widgets/WidgetMetric.jsx
frontend/src/components/widgets/WidgetMetricGrid.jsx
frontend/src/components/widgets/WidgetMetrics.jsx
frontend/src/components/layout/PageHeader.jsx
frontend/src/components/layout/PageLayout.jsx
frontend/src/components/Sidebar.jsx
frontend/src/components/dashboard/DashboardLayout.jsx
frontend/src/components/dashboard/WidgetGrid.jsx
```

Change these only when the change is intentionally system-wide and after auditing all dependent pages.

---

## Current Product Direction

TradePilot Pro continues moving from:

```text
Trading Journal
```

toward:

```text
Professional Multi-Workspace Trading Platform
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
Reports & Export
```

---

## Next Sprint Direction

Sprint 27 will focus on the Analytics Center.

Recommended direction:

1. Build Analytics workspace.
2. Reuse Portfolio calculations where possible.
3. Reuse Dashboard widget infrastructure.
4. Avoid unnecessary UI refactoring.
5. Continue following the Audit → Reuse → Build workflow.

Sprint 27 must always begin with:

```text
Audit
↓
Reuse Existing Code
↓
Small Safe Change
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
```