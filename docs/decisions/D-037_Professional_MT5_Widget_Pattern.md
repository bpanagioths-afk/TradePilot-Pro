# D-037 - Professional MT5 Widget Pattern

## Status

Accepted

## Context

Sprint 19 converted the MT5 Account Card into the first full professional trading widget.

The widget combines:

- header
- connection status
- account badges
- KPI metrics
- account metadata
- health message
- sync action
- auto sync information

## Decision

The Professional MT5 Widget becomes the reference pattern for future widgets.

Widget structure:

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

The widget must use TradePilot reusable components before raw Material UI patterns.

## Consequences

Future widgets should follow the same structure where applicable:

- Portfolio Widget
- Risk Widget
- AI Coach Widget
- Psychology Widget
- Economic Calendar Widget
- Prop Firm Widget

## Future Notes

The MT5 widget pattern may later be extracted into generic `WidgetHeader`, `WidgetFooter`, `DashboardGrid` and `KPIGrid` components.

---
