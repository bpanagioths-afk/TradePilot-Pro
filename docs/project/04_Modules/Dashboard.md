# Dashboard

## Purpose

The Dashboard is the Professional Command Center surface of TradePilot Pro.

It is not a simple page with loose cards. Starting Sprint 20, the Dashboard is the host area for professional trading widgets.

## Sprint 20 Status

Status: Foundation implemented

Sprint 20 created the first Professional Dashboard Foundation.

Completed:

- `frontend/src/components/dashboard/WidgetGrid.jsx`
- `frontend/src/components/dashboard/DashboardLayout.jsx`
- `frontend/src/components/dashboard/summary/DashboardSummaryWidget.jsx`
- `frontend/src/components/dashboard/mt5/MT5Widget.jsx`
- `frontend/src/components/dashboard/risk/RiskWidget.jsx`
- `frontend/src/components/dashboard/portfolio/PortfolioWidget.jsx`
- `frontend/src/components/dashboard/ai/AICoachWidget.jsx`
- `frontend/src/components/dashboard/psychology/PsychologyWidget.jsx`
- `frontend/src/components/dashboard/calendar/EconomicCalendarWidget.jsx`
- `frontend/src/components/dashboard/DashboardPlaceholderWidget.jsx`

## Dashboard Architecture

```text
Dashboard.jsx
↓
DashboardLayout
↓
WidgetGrid
↓
Dashboard Widgets
```

## Dashboard Page Responsibility

`Dashboard.jsx` should act as the page/controller layer.

It may own:

- page title
- page-level loading state
- API calls needed by the dashboard
- state passed into dashboard widgets

It should not own:

- widget layout details
- widget card styling
- duplicated KPI UI
- feature-specific widget internals

## Dashboard Layout Responsibility

`DashboardLayout.jsx` owns dashboard composition.

It decides which widgets appear on the dashboard and how they are arranged.

It should not own:

- API calls
- business calculations
- MT5 sync logic
- portfolio/risk/AI business logic

## WidgetGrid Responsibility

`WidgetGrid.jsx` owns the responsive dashboard grid.

It provides:

- consistent gaps
- desktop-first widget alignment
- responsive fallback for smaller screens
- a shared layout pattern for all command-center widgets

## Current Dashboard Widgets

Current Sprint 20 widgets:

- Dashboard Summary Widget
- MT5 Trading Widget Foundation
- Portfolio Widget placeholder
- Risk Widget placeholder
- AI Coach Widget placeholder
- Psychology Widget placeholder
- Economic Calendar Widget placeholder

## Future Dashboard Widgets

Planned:

- Portfolio Widget
- Risk Widget
- AI Coach Widget
- Psychology Widget
- Economic Calendar Widget
- Prop Firm Widget
- Rule Engine Widget
- Trading Plan Widget
- Market News Widget

## Rule

New dashboard widgets should be created as independent feature widgets and should use the shared Widget Infrastructure before using raw Material UI styling.
