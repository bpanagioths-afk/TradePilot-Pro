# D-042 — Portfolio Feature Module Reference Implementation

## Status

Accepted

## Date

2026-07-06

## Context

Sprint 22 completed the first mature frontend feature module pattern inside TradePilot Pro.

Before Sprint 22, the application had reusable widgets and dashboard components, but feature-specific logic still risked growing directly inside widgets or pages.

The Portfolio module became the first module to separate:

```text
data loading
↓
feature components
↓
widget infrastructure
↓
page / dashboard composition
```

## Decision

The Portfolio module is accepted as the reference implementation for future feature modules.

The preferred feature module structure is:

```text
frontend/src/features/<module>/
├── components/
├── hooks/
├── services/
└── index.js
```

For Portfolio specifically:

```text
frontend/src/features/portfolio/
├── components/
│   ├── PortfolioSummaryMetrics.jsx
│   ├── PortfolioPerformanceMetrics.jsx
│   ├── PortfolioStatisticsCard.jsx
│   └── PortfolioAllocationCard.jsx
├── hooks/
│   └── usePortfolio.js
├── services/
└── index.js
```

## Reason

TradePilot Pro is moving toward a professional Trading Command Center with many modules.

A consistent feature structure makes future modules easier to build, test, document and maintain.

## Consequences

Future modules should follow this structure unless there is a clear reason not to.

Examples:

```text
features/risk/
features/analytics/
features/psychology/
features/aiCoach/
features/tradingPlan/
```

Each feature should keep its own hooks, components and module-specific services inside its feature folder.

## Related Documents

- `docs/SOURCE_CODE_STRUCTURE.md`
- `docs/COMPONENT_LIBRARY.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/project/09_Current_State/Current_Project_Status.md`
