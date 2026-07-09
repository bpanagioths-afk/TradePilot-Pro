# TradePilot Pro -- COMPONENT\_LIBRARY

> Official Component Library for the TradePilot UI Framework.

\---

# Purpose

This document defines every reusable UI component used across TradePilot Pro.

Goals:

* Consistency
* Reusability
* Professional UX
* Faster development
* Easier maintenance

\---

# Component Standards

Every component should:

* Have a single responsibility
* Be reusable
* Support Material UI theming
* Be documented
* Be predictable
* Avoid duplicated logic

\---

# TradePilotCard

## Purpose

Base container for general cards and information panels.

## Usage

* MT5 Account
* Portfolio
* AI Coach
* Trading Plan
* Statistics

## Rules

* One logical entity per card
* Consistent padding
* Optional header/actions

\---

# TradePilotButton

## Purpose

Standard application button.

## Variants

* Primary
* Secondary
* Danger
* Loading

## Rules

* Primary action per section
* Loading state for async operations

\---

# StatusBadge

## Purpose

Persistent status indicator.

## Examples

* Active
* Disabled
* Connected
* Syncing
* Failed
* Demo
* Live
* Prop Firm
* Planned
* Foundation

\---

# SectionHeader

## Purpose

Reusable section title.

Contains:

* Title
* Subtitle (optional)
* Actions (optional)

\---

# InfoRow

## Purpose

Display label/value pairs consistently.

Examples:

* Broker
* Login
* Balance
* Equity
* Last Sync

\---

# MetricCard

Purpose:

Display one generic KPI with emphasis.

Examples:

* Balance
* Equity
* Win Rate
* Profit Factor

\---

# Widget Infrastructure

Sprint 20 introduced a dedicated widget infrastructure layer:

```text
frontend/src/components/widgets/
├── WidgetContainer.jsx
├── WidgetHeader.jsx
├── WidgetFooter.jsx
├── WidgetMetric.jsx

├── WidgetContainer

├── WidgetHeader

├── WidgetFooter

├── WidgetMetric v2

├── WidgetLoading

├── WidgetErrorState

├── WidgetEmptyState
└── index.js
```

\---

# WidgetContainer

Purpose:

Base container for professional widgets.

Rules:

* Use for dashboard/professional widgets.
* Should not contain feature-specific logic.
* Provides consistent widget structure.

\---

# WidgetHeader

Purpose:

Standard widget header.

Contains:

* Title
* Subtitle
* Optional action/status badge

\---

# WidgetFooter

Purpose:

Standard widget footer/action area.

Contains:

* Primary action
* Secondary actions
* Extra footer controls when needed

\---

# WidgetMetric

Purpose:

Display metric values inside professional widgets.

Examples:

* Balance
* Equity
* Floating P/L
* Open Positions

\---

# KPI / Metric Naming

Current metric components have different scopes:

|Component|Scope|
|-|-|
|`KPICard`|Existing dashboard KPI component.|
|`MetricCard`|Generic reusable metric card.|
|`WidgetMetric`|Widget infrastructure metric component.|

Do not create additional metric components unless the scope is clearly different.

\---

# StatisticCard

Purpose:

Display statistical summaries.

\---

# PageContainer

Provides:

* Page spacing
* Max width
* Consistent layout

\---

# LoadingOverlay

Purpose:

Indicate background processing.

\---

# EmptyState

Purpose:

Friendly message when no data exists.

Should include:

* Icon
* Message
* Suggested action

\---

# ConfirmDialog

Used for:

* Delete
* Disable
* Reset
* Dangerous actions

\---

# SearchToolbar

Contains:

* Search
* Filters
* Quick actions

\---

# FilterBar

Supports:

* Dropdowns
* Chips
* Date filters
* Reset

\---

# Future Components

Planned:

* TradePilotTable
* DashboardGrid
* KPIGrid
* NotificationCenter
* Timeline
* ActivityFeed
* MarketWidget
* RiskWidget
* PortfolioWidget
* WidgetToolbar
* WidgetEmptyState
* WidgetLoading
* WidgetErrorState

\---

# Naming Convention

Reusable components:

```text
TradePilot\*
Widget\*
```

Examples:

* TradePilotCard
* TradePilotButton
* TradePilotTable
* WidgetContainer
* WidgetHeader
* WidgetMetric

\---

# Review Checklist

Before adding a component verify:

* Is it reusable?
* Is it documented?
* Does it follow Design System?
* Can another module reuse it?
* Does it avoid duplicate UI?

\---

# Related Documents

* DESIGN\_SYSTEM.md
* DEVELOPMENT\_STANDARDS.md
* PROJECT\_MASTER.md
* DECISIONS.md
* SOURCE\_CODE\_STRUCTURE.md



---

# Sprint 22 Additions

## Widget Infrastructure v3

- WidgetMetricGrid
- WidgetMetrics

## Portfolio Feature Module

- PortfolioSummaryMetrics
- PortfolioPerformanceMetrics
- PortfolioStatisticsCard
- PortfolioAllocationCard

The Portfolio feature now follows the standard Feature Module pattern:
components/ • hooks/ • services/ • index.js

# Sprint 24 Additions - Layout and Reuse Rules

## PageHeader

Path:

```text
frontend/src/components/layout/PageHeader.jsx
```

Purpose:

Reusable page title/subtitle/action header for main application pages.

Usage:

- Dashboard
- Portfolio
- Future Analytics
- Future Reports
- Future MT5 pages

Rules:

- Do not duplicate page title/subtitle layout inside pages.
- Use `PageHeader` through `PageLayout` unless there is a special reason.

---

## PageLayout

Path:

```text
frontend/src/components/layout/PageLayout.jsx
```

Purpose:

Shared layout wrapper for major pages.

Provides:

- Common page width.
- Common vertical padding.
- Common header area.
- Common content spacing.

Usage:

```jsx
<PageLayout
    title="Portfolio"
    subtitle="Portfolio performance, allocation and risk overview."
>
    ...page content...
</PageLayout>
```

Rules:

- Main pages should use `PageLayout`.
- Do not create custom page spacing unless the page has a clear special purpose.
- Do not modify `PageLayout` for one page only.

---

## PortfolioChartsCard

Path:

```text
frontend/src/features/portfolio/components/PortfolioChartsCard.jsx
```

Purpose:

Feature-specific Portfolio chart widget.

Displays:

- Equity Curve
- Drawdown

Rules:

- This component belongs to the Portfolio feature.
- Do not move it to global widgets unless another feature needs the exact same chart behaviour.

---

## MT5Widget - Dashboard Live Summary

Path:

```text
frontend/src/components/dashboard/mt5/MT5Widget.jsx
```

Purpose:

Dashboard-level MT5 live summary widget.

Uses existing API functions:

- `getMT5Accounts()`
- `getMT5AccountSummary(accountId)`
- `syncMT5Account(accountId)`

Displays:

- Balance
- Equity
- Floating P/L
- Open Positions
- Connection
- Account
- Broker
- Server

Rule:

Do not create a second MT5 dashboard summary component unless the existing widget cannot be extended safely.

---

## Protected Global Widgets

The following are shared infrastructure:

```text
WidgetContainer
WidgetHeader
WidgetFooter
WidgetMetric
WidgetMetricGrid
WidgetMetrics
WidgetLoading
WidgetErrorState
WidgetEmptyState
```

Rules:

- Do not change these for a single page-specific visual issue.
- If a page needs a special layout, create a feature-specific component instead.
- Change global widgets only for true global design or bug fixes.
