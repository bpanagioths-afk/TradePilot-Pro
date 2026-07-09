# D-046 - Protected Global Widgets

Status: Accepted

## Decision

Global widget infrastructure must not be changed for a single page-specific visual issue.

Protected components include:

- `WidgetContainer`
- `WidgetHeader`
- `WidgetFooter`
- `WidgetMetric`
- `WidgetMetricGrid`
- `WidgetMetrics`
- `PageHeader`
- `PageLayout`
- `Sidebar`
- `DashboardLayout`

## Reason

During Sprint 24, changes to global widgets caused visual regressions in Dashboard and Portfolio.

## Rule

If one page needs a different layout, fix the page or create a feature-specific component. Do not change the shared widget system unless the change is intentionally global.
