# TradePilot Pro -- DESIGN\_SYSTEM v3

> UI Bible for the TradePilot UI Framework

\---

# 1\. Product Identity

TradePilot Pro is a **Professional Trading Command Center**.

Keywords:

* Professional
* Fast
* Reliable
* Information Rich
* Desktop First
* Widget Based
* Trading Terminal Inspired

\---

# 2\. Core Principles

1. Functionality
2. Architecture
3. Professional UX
4. Product Identity

Every new module must satisfy all four stages.

\---

# 3\. Design Tokens

## Semantic Colors

* Primary
* Secondary
* Success
* Warning
* Error
* Info
* Background
* Surface
* Border
* Text Primary
* Text Secondary

Use semantic names instead of hardcoded colors.

## Radius

Use one border-radius scale throughout the application.

## Elevation

Three shadow levels:

* Low
* Medium
* High

## Spacing

Single spacing scale across the application.

Never invent custom spacing.

\---

# 4\. Typography

Hierarchy:

* Display
* Page Title
* Section Title
* Card Title
* Body
* Caption

Readable over decorative.

\---

# 5\. Desktop Grid

Desktop-first.

Recommended layout:

* Left navigation
* Top toolbar
* Widget area
* Detail dialogs

Widgets align to a common grid.

\---

# 6\. Widget Philosophy

Pages are collections of widgets.

Each widget contains:

* Header
* Status
* Main metrics
* Actions
* Optional footer

Examples:

* MT5 Widget
* Portfolio Widget
* AI Coach Widget
* Risk Widget
* Trading Plan Widget

\---

# 7\. Component Library

Core:

* TradePilotCard
* TradePilotButton
* StatusBadge
* SectionHeader
* InfoRow
* MetricCard
* StatisticCard
* WidgetHeader
* WidgetFooter
* PageContainer
* EmptyState
* LoadingOverlay
* ConfirmDialog
* SearchToolbar
* FilterBar

\---

# 8\. Data Presentation

Tables must support:

* Sorting
* Search
* Filters
* Empty State
* Loading State

KPIs should always be presented with visual hierarchy.

\---

# 9\. Interaction Rules

Primary action: Contained button.

Secondary action: Outlined button.

Dangerous action: Warning/Error styling.

Long operation: Loading state.

Never use browser alerts.

\---

# 10\. States

Every screen defines:

* Loading
* Empty
* Error
* Success

No undefined states.

\---

# 11\. Accessibility

* Keyboard friendly
* Visible focus
* Good contrast
* Consistent navigation

\---

# 12\. Naming

Reusable components start with:

TradePilot\*

Examples:

* TradePilotCard
* TradePilotButton
* TradePilotTable

\---

# 13\. Design Review Checklist

Before merging a UI module verify:

* Uses reusable components
* Uses semantic colors
* Uses spacing system
* Uses typography hierarchy
* No duplicated UI
* Stable state
* Snackbar notifications
* Responsive desktop layout

\---

# 14\. Future Evolution

Planned:

* Theme presets
* Accent colors
* User personalization
* Component documentation
* Design Playground
* Visual regression testing

\---

# 15\. Related Documentation

* PROJECT\_MASTER.md
* DEVELOPMENT\_STANDARDS.md
* DECISIONS.md
* PROJECT\_HISTORY.md
* CHANGELOG.md
* BACKLOG.md
* COMPONENT\_LIBRARY.md (future)

\---

# Closing Note

The Design System is the single source of truth for the visual identity
of TradePilot Pro.

All future frontend development should follow this document.

