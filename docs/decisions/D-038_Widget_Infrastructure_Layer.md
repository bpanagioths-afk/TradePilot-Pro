# D-038 — Widget Infrastructure Layer

Status: ACCEPTED

---

## Context

Sprint 19 created the first Professional MT5 Trading Widget.

Sprint 20 expanded the Dashboard and introduced multiple planned professional widgets:

- MT5
- Portfolio
- Risk
- AI Coach
- Psychology
- Economic Calendar

The project needed a reusable widget structure to avoid duplicated layout code.

---

## Decision

TradePilot Pro introduces a dedicated Widget Infrastructure layer:

```text
frontend/src/components/widgets/
├── WidgetContainer.jsx
├── WidgetHeader.jsx
├── WidgetFooter.jsx
├── WidgetMetric.jsx
└── index.js
```

This layer sits between the TradePilot UI Framework and feature widgets.

```text
Material UI
        ↓
TradePilot UI Framework
        ↓
Widget Infrastructure
        ↓
Professional Widgets
        ↓
Application Modules
```

---

## Consequences

Professional widgets should use this layer before writing local card/header/footer/metric layout.

Dashboard-specific widgets remain under:

```text
frontend/src/components/dashboard/
```

Generic widget structure remains under:

```text
frontend/src/components/widgets/
```

---

## Future Notes

Additional infrastructure components may be added later:

- WidgetToolbar
- WidgetActions
- WidgetEmptyState
- WidgetLoading
- WidgetErrorState
- WidgetRefreshButton

These should be added only when repeated patterns appear.

---
