# Widget Philosophy

TradePilot Pro is designed around reusable trading widgets.

Examples:

- MT5 Account Widget
- Dashboard Widgets
- Portfolio Widget
- Trading Plan Widget
- AI Coach Widget
- Psychology Widget
- Market Widget
- Economic Calendar Widget
- Risk Widget
- Prop Firm Widget

---

## Professional Widget Structure

Widgets should share:

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

This guarantees a consistent user experience across the application.

---

## Sprint 20 Widget Infrastructure

Sprint 20 introduced the first official Widget Infrastructure layer:

```text
WidgetContainer
WidgetHeader
WidgetMetric
WidgetFooter
```

Professional widgets should use this layer before building local widget layout.

---

## Widget Responsibility

A widget should:

- present a focused area of trading information,
- use shared widget structure,
- display clear loading / empty / error / success states when implemented,
- expose clear actions,
- stay small enough to maintain.

A widget should not:

- own unrelated business logic,
- duplicate layout patterns already handled by Widget Infrastructure,
- hardcode backend endpoint URLs,
- become a large page replacement.

---

## Dashboard Widget Pattern

Current Sprint 20 flow:

```text
Dashboard.jsx
        ↓
DashboardLayout.jsx
        ↓
WidgetGrid.jsx
        ↓
Dashboard Widgets
        ↓
Widget Infrastructure
        ↓
TradePilot UI Components
        ↓
Material UI
```

---
