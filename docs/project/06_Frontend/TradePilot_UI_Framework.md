# TradePilot UI Framework

Current reusable components:

- Theme
- TradePilotCard
- TradePilotButton
- StatusBadge
- SectionHeader
- InfoRow
- MetricCard

---

## Widget Infrastructure

Sprint 20 introduced the official Widget Infrastructure layer:

```text
frontend/src/components/widgets/
├── WidgetContainer.jsx
├── WidgetHeader.jsx
├── WidgetFooter.jsx
├── WidgetMetric.jsx
└── index.js
```

Purpose:

- provide consistent widget structure
- avoid duplicated widget layout code
- support Professional Trading Command Center UI
- prepare Portfolio, Risk, AI, Psychology, Calendar and future widgets

---

## Current Layering

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

## Component Meaning

| Component | Layer | Purpose |
|---|---|---|
| `TradePilotCard` | UI Framework | Branded base card component. |
| `TradePilotButton` | UI Framework | Standard application button. |
| `StatusBadge` | UI Framework | Consistent status indicator. |
| `SectionHeader` | UI Framework | Section title/header. |
| `InfoRow` | UI Framework | Label/value data row. |
| `MetricCard` | UI Framework | Generic reusable KPI/metric card. |
| `WidgetContainer` | Widget Infrastructure | Standard professional widget wrapper. |
| `WidgetHeader` | Widget Infrastructure | Widget title/subtitle/action layout. |
| `WidgetFooter` | Widget Infrastructure | Widget footer/action layout. |
| `WidgetMetric` | Widget Infrastructure | Metric display inside professional widgets. |

---

## Rule

When a TradePilot UI or Widget Infrastructure component exists, use it before creating new local Material UI layout code.

---
