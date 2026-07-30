# TradePilot Pro -- COMPONENT_LIBRARY

> Official Component Library for the TradePilot UI Framework.

---

# Purpose

This document defines every reusable UI component used across TradePilot Pro.

Goals:

- Consistency
- Reusability
- Professional UX
- Faster development
- Easier maintenance
- Stable reusable infrastructure
- Single source of UI patterns

---

# Component Standards

Every component should:

- Have a single responsibility.
- Be reusable.
- Support Material UI theming.
- Be documented.
- Be predictable.
- Avoid duplicated logic.
- Avoid duplicated business responsibility.
- Prefer composition over duplication.

Before creating a new component always verify:

- Does a similar component already exist?
- Can an existing component be extended safely?
- Is the change feature-specific or global?

---

# TradePilotCard

## Purpose

Base container for general cards and information panels.

## Usage

- MT5
- Portfolio
- Dashboard
- AI Coach
- Trading Plan
- Statistics
- Reports

## Rules

- One logical entity per card.
- Consistent spacing.
- Optional header/actions.
- No feature-specific business logic.

---

# TradePilotButton

## Purpose

Standard application button.

## Variants

- Primary
- Secondary
- Danger
- Loading

## Rules

- One primary action per section.
- Loading state for async operations.
- Consistent styling across the application.

---

# StatusBadge

## Purpose

Persistent status indicator.

## Current Uses

- Active
- Disabled
- Connected
- Disconnected
- Syncing
- Failed
- Demo
- Live
- Prop Firm
- Planned
- Foundation
- Healthy
- Warning

## Rules

- Status colors must remain consistent.
- Feature pages should reuse StatusBadge before creating custom status chips.

---

# SectionHeader

## Purpose

Reusable section title.

Contains:

- Title
- Subtitle (optional)
- Actions (optional)

Usage:

- Dashboard sections
- Portfolio sections
- Settings sections
- Future Analytics sections

---

# InfoRow

## Purpose

Display label/value pairs consistently.

Examples:

- Broker
- Login
- Balance
- Equity
- Margin
- Server
- Last Sync

Rules:

- Keep presentation consistent.
- Avoid local label/value layouts when InfoRow already fits.

---

# MetricCard

Purpose:

Display one reusable KPI with emphasis.

Examples:

- Balance
- Equity
- Win Rate
- Profit Factor
- Net Profit
- Trades

Rules:

- One KPI per card.
- Keep styling reusable.
- Business calculations remain outside the component.

---

# Widget Infrastructure

Sprint 20 introduced the dedicated Widget Infrastructure layer.

Current structure:

```text
frontend/src/components/widgets/
├── WidgetContainer.jsx
├── WidgetHeader.jsx
├── WidgetFooter.jsx
├── WidgetMetric.jsx
├── WidgetMetricGrid.jsx
├── WidgetMetrics.jsx
├── WidgetLoading.jsx
├── WidgetErrorState.jsx
├── WidgetEmptyState.jsx
└── index.js
```

Purpose:

Provide one reusable infrastructure for every professional widget inside TradePilot Pro.

The infrastructure is shared by:

- Dashboard
- MT5 Trading Center
- Portfolio
- Future Analytics
- Future Reports

Rules:

- Infrastructure contains presentation only.
- No backend calls.
- No feature business logic.
- No MT5-specific code.
- No Portfolio-specific code.

---

# WidgetContainer

Purpose:

Base container for professional widgets.

Responsibilities:

- Consistent spacing.
- Consistent elevation.
- Common widget appearance.

Rules:

- Used by professional widgets.
- Never contains feature-specific logic.

---

# WidgetHeader

Purpose:

Standard widget header.

Contains:

- Title
- Subtitle
- Optional action
- Optional StatusBadge

Rules:

- All professional widgets should use WidgetHeader.

---

# WidgetFooter

Purpose:

Standard widget footer.

Contains:

- Primary action.
- Secondary actions.
- Footer controls.

Rules:

- Footer actions remain lightweight.
- Business logic belongs outside the footer.

---

# WidgetMetric

Purpose:

Display a single metric inside a professional widget.

Examples:

- Balance
- Equity
- Margin
- Net Profit
- Trades
- Floating Profit
- Today's Profit

Rules:

- Display only.
- No calculations.
- Receives prepared values.

---

# WidgetMetricGrid

Purpose:

Responsive grid for multiple WidgetMetric components.

Usage:

- Portfolio
- MT5 Trading Center
- Future Analytics widgets

Rules:

- Layout only.
- No business logic.

---

# WidgetMetrics

Purpose:

Reusable collection wrapper for WidgetMetric groups.

Rules:

- Used when several metrics belong together.
- Avoid repeating layout code.

---

# KPI / Metric Naming

Current metric components have different responsibilities:

| Component | Responsibility |
|-----------|----------------|
| `KPICard` | Existing dashboard KPI card. |
| `MetricCard` | Generic reusable metric card. |
| `WidgetMetric` | Metric presentation inside professional widgets. |

Rules:

- Do not introduce additional KPI components without a clearly different responsibility.
- Reuse the existing metric hierarchy whenever possible.

---

# StatisticCard

Purpose:

Display statistical summaries.

Examples:

- Win Rate
- Profit Factor
- Average Win
- Average Loss
- Average RR

Rules:

- Presentation only.
- Receives prepared data.

---

# PageContainer

Purpose:

Provides:

- Standard page spacing.
- Consistent maximum width.
- Shared layout behavior.

---

# LoadingOverlay

Purpose:

Display background processing without blocking the application unexpectedly.

Examples:

- Long imports.
- Report generation.
- Future scheduled operations.

---

# EmptyState

Purpose:

Friendly message when no data exists.

Should include:

- Icon
- Message
- Suggested action

Used by:

- Dashboard widgets
- MT5 widgets
- Portfolio widgets

---

# ConfirmDialog

Purpose:

Reusable confirmation dialog.

Used for:

- Delete
- Disable
- Reset
- Dangerous actions

---

# SearchToolbar

Purpose:

Reusable search and action toolbar.

Contains:

- Search
- Filters
- Quick actions

---

# FilterBar

Purpose:

Reusable filtering component.

Supports:

- Dropdowns
- Chips
- Date filters
- Reset

---

# MT5 Trading Center Components

Sprint 25 and Sprint 26 introduced the first complete MT5 Trading Center component family.

Current location:

```text
frontend/src/components/dashboard/mt5/
```

Current components:

```text
MT5Widget.jsx
AccountHealthWidget.jsx
TodayPerformanceWidget.jsx
ConnectionHealthWidget.jsx
OpenPositionsWidget.jsx
PendingOrdersWidget.jsx
```

---

## MT5Widget

Purpose:

Compact Dashboard summary widget.

Displays:

- Balance
- Equity
- Floating P/L
- Open Positions
- Connection
- Account
- Broker

Rules:

- Dashboard overview only.
- Must not become a detailed trading workspace.
- Uses existing MT5 summary APIs.

---

## AccountHealthWidget

Purpose:

Displays live MT5 account financial health.

Current metrics:

- Balance
- Equity
- Margin
- Free Margin
- Margin Level
- Leverage
- Currency

Rules:

- Live data only.
- Uses Widget Infrastructure.
- Uses standard loading/error/empty states.

---

## TodayPerformanceWidget

Purpose:

Displays today's MT5 trading activity.

Current metrics:

- Profit Today
- Trades Today
- Win Rate Today
- Lots
- Commission
- Swap

Rules:

- Uses live MT5 data.
- Auto-refresh support.
- Standard widget states.

---

## ConnectionHealthWidget

Purpose:

Displays MT5 connection status.

Current metrics:

- Terminal status
- Trading allowed
- Terminal build
- Terminal version
- Server
- Company

Rules:

- Connection information only.
- No account statistics.
- Uses StatusBadge.

---

## OpenPositionsWidget

Purpose:

Displays live MT5 open positions.

Current information:

- Ticket
- Symbol
- Direction
- Volume
- Open Price
- Current Price
- Stop Loss
- Take Profit
- Floating Profit
- Swap

Rules:

- Detailed MT5 workspace component.
- Automatic refresh.
- No duplicated Dashboard version.

---

## PendingOrdersWidget

Purpose:

Displays MT5 pending orders.

Current information:

- Ticket
- Symbol
- Order Type
- Volume
- Entry Price
- Stop Loss
- Take Profit
- Setup Time
- Comment

Rules:

- Detailed MT5 workspace component.
- Automatic refresh.
- Live MT5 data only.

---

# Portfolio Components

## PortfolioWidget

Purpose:

Compact Dashboard Portfolio summary.

Displays:

- Total Trades
- Net Profit
- Navigation to Portfolio

Rules:

- Summary only.
- Detailed Portfolio analysis belongs to the Portfolio workspace.
- Uses the existing Portfolio feature module.

---

## PortfolioChartsCard

Purpose:

Feature-specific Portfolio chart component.

Displays:

- Equity Curve
- Drawdown

Rules:

- Portfolio feature component.
- Not a global widget.

---

# Layout Components

## PageHeader

Purpose:

Reusable page title and subtitle.

Used by:

- Dashboard
- Portfolio
- MT5
- Future Analytics
- Future Reports

---

## PageLayout

Purpose:

Reusable page wrapper.

Provides:

- Common width.
- Common spacing.
- Standard page composition.

Rules:

- No business logic.
- No API calls.
- No feature-specific behavior.

---

# Protected Components

The following components are considered protected infrastructure:

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

PageHeader
PageLayout

Sidebar
DashboardLayout
WidgetGrid
```

Rules:

- Do not modify these for a page-specific issue.
- Feature-specific requirements should be solved inside the feature.
- Global changes require an architecture review.

---

# Future Components

Planned:

- TradePilotTable
- DashboardGrid
- KPIGrid
- NotificationCenter
- Timeline
- ActivityFeed
- MarketWidget
- RiskWidget
- WidgetToolbar

These remain part of the roadmap and are intentionally kept for future development.

---

# Naming Convention

Reusable components:

```text
TradePilot*
Widget*
```

Feature components:

```text
AccountHealthWidget
TodayPerformanceWidget
ConnectionHealthWidget
OpenPositionsWidget
PendingOrdersWidget
PortfolioChartsCard
```

Rules:

- Component names should clearly describe responsibility.
- Avoid generic names such as `Card2` or `Panel`.

---

# Review Checklist

Before adding a component verify:

- Is it reusable?
- Is it documented?
- Does it follow the Design System?
- Can another module reuse it?
- Does it duplicate an existing component?
- Can an existing component be extended safely?
- Does it belong to a feature or to the global UI framework?

---

# Related Documents

- DESIGN_SYSTEM.md
- DEVELOPMENT_STANDARDS.md
- PROJECT_MASTER.md
- DECISIONS.md
- SOURCE_CODE_STRUCTURE.md

---

# Sprint 22 Additions

## Widget Infrastructure v3

Added:

- WidgetMetricGrid
- WidgetMetrics

## Portfolio Feature Module

Added:

- PortfolioSummaryMetrics
- PortfolioPerformanceMetrics
- PortfolioStatisticsCard
- PortfolioAllocationCard

Portfolio became the reference implementation for frontend Feature Modules.

---

# Sprint 24 Additions

Added:

- PageHeader
- PageLayout
- PortfolioChartsCard

MT5Widget became connected to the real MT5 account summary instead of placeholder data.

Protected Global Widgets rule introduced.

---

# Sprint 25 Additions

Added:

- OpenPositionsWidget

Introduced:

- Live MT5 open position presentation.
- Standard loading/error/empty widget behavior.
- Automatic refresh.

---

# Sprint 26 Additions

Added:

- AccountHealthWidget
- TodayPerformanceWidget
- ConnectionHealthWidget
- PendingOrdersWidget

Updated:

- MT5Widget now acts as Dashboard summary only.
- PortfolioWidget now acts as Dashboard summary only.

Established responsibilities:

```text
Dashboard
    ↓
Summary Widgets

MT5
    ↓
Detailed Trading Widgets

Portfolio
    ↓
Detailed Portfolio Widgets
```

These responsibilities remain active for the remainder of Version 0.8.

---

# Sprint 27-28 Additions

## Shared Widget System — Mandatory UI Foundation

The following components are the canonical metric and widget infrastructure:

- `WidgetContainer`
- `WidgetHeader`
- `WidgetFooter`
- `WidgetMetric`
- `WidgetMetricGrid`
- `WidgetMetrics`
- `WidgetLoading`
- `WidgetErrorState`
- `WidgetEmptyState`

Usage rules:

- Dashboard, Portfolio, Analytics, Reports and future workspaces must reuse these components.
- Page-specific KPI card implementations are not allowed when `WidgetMetric` can satisfy the requirement.
- Positive, negative, warning and informational colors must be expressed through widget `status` values.
- Components must use theme tokens rather than hard-coded colors.
- Global widget changes require an impact audit of all dependent pages.

## Analytics Feature Components

Analytics uses:

- `useAnalytics`
- `analyticsService`
- shared Widget System components
- `PageLayout`
- Recharts visualizations wrapped in shared widget containers

## Portfolio Reference UI

Portfolio remains the reference implementation for:

- feature-module structure
- shared widget usage
- loading/error/empty states
- metrics and charts composition
- responsive page layout

New feature pages should follow Portfolio unless an Architecture Review approves a deviation.

---

# Version 1.0 Multi-User Components

## `PasswordField`

Path: `frontend/src/components/common/PasswordField.jsx`

Reusable password input with show/hide behavior for login, recovery, reset and administrative password workflows.

## Authentication Pages

- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/ForgotUsername.jsx`
- `frontend/src/pages/ForgotPassword.jsx`
- `frontend/src/pages/ResetPassword.jsx`

These pages use the centralized authentication service and must remain outside the protected application layout where appropriate.

## `AdminUsers`

Path: `frontend/src/pages/AdminUsers.jsx`

Administrative User Management workspace. It consumes `adminService.js` and is protected by both frontend route visibility and backend administrator authorization. Backend rules remain authoritative.

## Authentication-Aware Navigation

- `Sidebar.jsx` conditionally exposes administrator navigation.
- `Topbar.jsx` reflects authenticated-user state and logout behavior.
- `App.jsx` owns PublicOnlyRoute, ProtectedRoute and AdminRoute composition.
