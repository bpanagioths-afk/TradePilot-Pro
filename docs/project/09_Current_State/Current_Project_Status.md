# Current Project Status

Status updated after Sprint 24.

---

## Completed Through Sprint 24

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

---

## Sprint 24 Completed

Sprint 24 completed:

- Portfolio page integration.
- Sidebar v2 grouped navigation.
- Page layout foundation.
- Dashboard and Portfolio migration to `PageLayout`.
- Portfolio charts component.
- MT5 Dashboard Widget live account summary integration.
- Frontend workflow correction after global widget regression.

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
Dashboard Widgets / Feature Components
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
Services / Engines
↓
Models / Schemas
↓
Database
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
```

Change these only when the change is intentionally system-wide and after checking Dashboard, Portfolio and MT5.

---

## Current Product Direction

TradePilot Pro continues moving from:

```text
Trading Journal
```

toward:

```text
Professional Trading Command Center
```

The Dashboard now acts as the command center host. Portfolio is now a full analytics page. MT5 data is now visible in the Dashboard using existing live account summary infrastructure.

---

## Next Sprint Direction

Sprint 25 should focus on real trading features and avoid unnecessary UI refactoring.

Recommended direction:

1. Continue MT5 live account intelligence.
2. Add Open Positions / Daily P&L when backend data is available.
3. Improve Analytics using existing Portfolio/Dashboard patterns.
4. Keep UI changes feature-specific unless a true global bug exists.

Sprint 25 must start with a small audit before coding:

```text
Does this already exist?
Can we reuse it?
Is it global or feature-specific?
What is the smallest safe change?
```
