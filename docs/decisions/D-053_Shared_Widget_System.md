# D-053 — Shared Widget System

Status: Accepted

Decision:

Dashboard, Portfolio, Analytics, Reports and future workspaces must use the shared Widget System for metrics, containers and states.

Canonical components include:

- `WidgetContainer`
- `WidgetHeader`
- `WidgetFooter`
- `WidgetMetric`
- `WidgetMetricGrid`
- `WidgetMetrics`
- `WidgetLoading`
- `WidgetErrorState`
- `WidgetEmptyState`

Page-specific KPI card systems and hard-coded status colors are not allowed when the shared components can satisfy the requirement.

Reason:

A single component and theme system enables consistent UI and future per-user customization.
