# Design System Standards

Starting Sprint 18, TradePilot Pro should create and follow a Design System.

The Design System should define:

- card styles
- border radius
- hover shadow
- spacing
- typography
- button hierarchy
- badge styles
- status colors
- action menus
- widget structure

## Button Rules

- Primary action = contained button
- Secondary action = outlined button
- Dangerous action = warning or error color
- Repeated / async action = loading state

## Status Colors

- Success / green = Active / Connected / Completed
- Warning / yellow-orange = Attention / Disabled action / Risk
- Error / red = Failed / Dangerous
- Primary / blue = Main action
- Default / grey = Disabled / Inactive

## Status Badges

Use consistent badge patterns for:

- Active
- Disabled
- Syncing
- Connected
- Failed
- Demo
- Live
- Prop Firm
- Planned
- Foundation

---

## Sprint 19 Design System Additions

### MetricCard

`MetricCard` is now an implemented reusable component.

Purpose:

- display one KPI with visual emphasis
- keep metrics consistent across widgets
- avoid duplicated KPI styling

Examples:

- Balance
- Equity
- Floating P/L
- Open Positions
- Win Rate
- Profit Factor

### Professional Widget Structure

Major widgets should follow:

```text
Header
↓
Status / Badges
↓
Main Metrics
↓
Details
↓
Actions / Footer
```

The Professional MT5 Widget is the first reference implementation.

### Profit / Loss Color Rule

Financial result values should use semantic colors:

- Positive = success
- Negative = error
- Zero / unavailable = neutral

Do not hardcode custom colors when semantic theme colors exist.

### Component Reuse Rule

When a TradePilot UI component exists, use it before creating a new local pattern.

Current Sprint 19 relevant components:

- TradePilotCard
- TradePilotButton
- StatusBadge
- InfoRow
- MetricCard

---

## Sprint 20 Design System Additions

### Widget Infrastructure

Sprint 20 added the following widget infrastructure components:

- WidgetContainer
- WidgetHeader
- WidgetFooter
- WidgetMetric

These components define the standard shape of professional widgets.

### Widget Layout Rule

Professional widgets should use:

```text
WidgetContainer
↓
WidgetHeader
↓
WidgetMetric / InfoRow / content
↓
WidgetFooter
```

### Placeholder Widget Rule

Planned widgets may use `DashboardPlaceholderWidget` with a status badge until real data integration is implemented.

### Metric Naming Rule

Current metric components have different scopes:

| Component | Scope |
|---|---|
| `KPICard` | Existing dashboard KPI UI. |
| `MetricCard` | Generic reusable TradePilot metric card. |
| `WidgetMetric` | Metric display inside Widget Infrastructure. |

Do not create additional metric components unless the scope is clearly different.

---
