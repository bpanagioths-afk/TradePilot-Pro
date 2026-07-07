# TradePilot Pro - Project History

Official index for the project history.

The full history is split into smaller files inside `docs/history/` so the project knowledge stays readable and easier to maintain.

## Sections

1. [Foundation](history/01_FOUNDATION.md)
2. [MT5 Evolution](history/02_MT5_EVOLUTION.md)
3. [Product Evolution](history/03_PRODUCT_EVOLUTION.md)
4. [UI Framework](history/04_UI_FRAMEWORK.md)
5. [Sprint History](history/05_SPRINT_HISTORY.md)
6. [Timeline](history/06_TIMELINE.md)
7. [Full Legacy Archive](history/99_FULL_HISTORY_ARCHIVE.md)

## Current Status

Sprint 22 is completed.

Sprint 23 starts with the Portfolio Analytics Dashboard foundation.

The project now follows:

```text
Application Pages
↓
Feature Modules
↓
Dashboard Components
↓
Widget Infrastructure v3
↓
TradePilot UI Framework
↓
Material UI
```

Core product direction:

```text
Functionality
↓
Architecture
↓
Professional UX
↓
Product Identity
```

\---

# Sprint 19 History - Professional MT5 Trading Widget

Sprint 19 marked the transition from an MT5 Account Manager into the first professional widget of the TradePilot Pro Command Center.

The project moved from simple account management toward live account intelligence by introducing MT5 account summaries, live balance/equity data, floating profit/loss, open position counts, connection health and import statistics.

A new Sync Engine Foundation was introduced as a separate service layer so future synchronization workflows can support MT5, TradingView, Economic Calendar, Portfolio data and SaaS schedulers without overloading the existing MT5 import service.

On the frontend, the MT5 account card became a Professional MT5 Trading Widget using the TradePilot UI Framework. A reusable `MetricCard` component was introduced, making this widget the first implementation of the future widget-based dashboard architecture.

Sprint 19 also reinforced the project direction:

```text
Material UI
↓
TradePilot UI Framework
↓
Professional Widgets
↓
Trading Command Center
```

Sprint 19 completed the foundation for future widgets including Portfolio, Risk, AI Coach, Psychology, Economic Calendar and Prop Firm modules.

---

# Sprint 22 History - Portfolio Feature Module and Widget Infrastructure v3

Sprint 22 marked the transition from reusable dashboard widgets to reusable feature modules.

The Portfolio module became the first reference implementation of the Feature Module pattern:

```text
features/portfolio/
├── components/
├── hooks/
├── services/
└── index.js
```

Backend Portfolio logic evolved from a single summary endpoint into a modular overview API:

```text
GET /portfolio/overview

summary
statistics
allocation
performance
```

The old `/portfolio/summary` endpoint remained available for backward compatibility.

On the frontend, Portfolio data loading moved into `usePortfolio()`, and Portfolio presentation was split into reusable feature components:

- `PortfolioSummaryMetrics`
- `PortfolioPerformanceMetrics`
- `PortfolioStatisticsCard`
- `PortfolioAllocationCard`

Sprint 22 also introduced Widget Infrastructure v3 through:

- `WidgetMetricGrid`
- `WidgetMetrics`

This reduced repeated KPI grid code and created a stronger foundation for future modules such as Risk, Analytics, Psychology, AI Coach, Economic Calendar and Prop Firm tools.

A routing and navigation audit was also completed. Portfolio page integration was intentionally postponed until the page is fully production-ready, preventing premature navigation changes and avoiding architecture drift.

Sprint 22 reinforced the product direction:

```text
Reusable Widgets
↓
Reusable Feature Modules
↓
Professional Trading Command Center
```



## Sprint 23
Sprint 23 established the portfolio analytics foundation and completed backend analytics integration with frontend migration. Remaining visualization work moved to Sprint 24.
