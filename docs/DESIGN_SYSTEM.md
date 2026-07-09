# TradePilot Pro -- DESIGN_SYSTEM v3

> UI Bible for the TradePilot UI Framework

---

# 1. Product Identity

TradePilot Pro is a **Professional Trading Command Center**.

Keywords:

- Professional
- Fast
- Reliable
- Information Rich
- Desktop First
- Widget Based
- Trading Terminal Inspired

---

# 2. Core Principles

1. Functionality
2. Architecture
3. Professional UX
4. Product Identity

Every new module must satisfy all four stages.

---

# 3. Design Tokens

## Semantic Colors

- Primary
- Secondary
- Success
- Warning
- Error
- Info
- Background
- Surface
- Border
- Text Primary
- Text Secondary

Use semantic names instead of hardcoded colors.

## Radius

Use one border-radius scale throughout the application.

## Elevation

Three shadow levels:

- Low
- Medium
- High

## Spacing

Single spacing scale across the application.

Never invent custom spacing.

---

# 4. Typography

Hierarchy:

- Display
- Page Title
- Section Title
- Card Title
- Body
- Caption

Readable over decorative.

---

# 5. Desktop Grid

Desktop-first.

Recommended layout:

- Left navigation
- Top toolbar
- Widget area
- Detail dialogs

Widgets align to a common grid.

---

# 6. Widget Philosophy

Pages are collections of widgets.

Each widget contains:

- Header
- Status
- Main metrics
- Actions
- Optional footer

Examples:

- MT5 Widget
- Portfolio Widget
- AI Coach Widget
- Risk Widget
- Trading Plan Widget

---

# 7. Professional Widget Structure

Sprint 20 introduced the Widget Infrastructure layer.

Professional widgets should follow:

```text
WidgetContainer
↓
WidgetHeader
↓
WidgetMetric / InfoRow / body content
↓
WidgetFooter
```

Current Widget Infrastructure:

- WidgetContainer
- WidgetHeader
- WidgetFooter
- WidgetMetric

Rules:

- Do not duplicate widget card/header/footer layout.
- Do not put business logic inside widget infrastructure components.
- Use StatusBadge for widget status.
- Use TradePilotButton for widget actions.

---

# 8. Component Library

Core:

- TradePilotCard
- TradePilotButton
- StatusBadge
- SectionHeader
- InfoRow
- MetricCard
- WidgetContainer
- WidgetHeader
- WidgetFooter
- WidgetMetric
- StatisticCard
- PageContainer
- EmptyState
- LoadingOverlay
- ConfirmDialog
- SearchToolbar
- FilterBar

---

# 9. Data Presentation

Tables must support:

- Sorting
- Search
- Filters
- Empty State
- Loading State

KPIs should always be presented with visual hierarchy.

---

# 10. Interaction Rules

Primary action: Contained button.

Secondary action: Outlined button.

Dangerous action: Warning/Error styling.

Long operation: Loading state.

Never use browser alerts.

---

# 11. States

Every screen defines:

- Loading
- Empty
- Error
- Success

No undefined states.

---

# 12. Accessibility

- Keyboard friendly
- Visible focus
- Good contrast
- Consistent navigation

---

# 13. Naming

Reusable components start with:

```text
TradePilot*
Widget*
```

Examples:

- TradePilotCard
- TradePilotButton
- TradePilotTable
- WidgetContainer
- WidgetHeader
- WidgetMetric

---

# 14. Design Review Checklist

Before merging a UI module verify:

- Uses reusable components
- Uses semantic colors
- Uses spacing system
- Uses typography hierarchy
- No duplicated UI
- Stable state
- Snackbar notifications
- Responsive desktop layout
- Professional widget structure when applicable

---

# 15. Future Evolution

Planned:

- Theme presets
- Accent colors
- User personalization
- Component documentation
- Design Playground
- Visual regression testing
- Widget loading/error/empty states

---

# 16. Related Documentation

- PROJECT_MASTER.md
- DEVELOPMENT_STANDARDS.md
- DECISIONS.md
- PROJECT_HISTORY.md
- CHANGELOG.md
- BACKLOG.md
- COMPONENT_LIBRARY.md
- SOURCE_CODE_STRUCTURE.md

---

# Closing Note

The Design System is the single source of truth for the visual identity of TradePilot Pro.

All future frontend development should follow this document.


---

# Widget Infrastructure v3

Sprint 22 introduces:
- WidgetMetricGrid
- WidgetMetrics

Design goals:
- Reduce duplicated KPI layouts
- Standardize metric presentation
- Shared infrastructure for Portfolio, MT5, Risk, Analytics, Psychology and future modules.

# Sprint 24 UI Guardrails

Sprint 24 established an important UI stability rule.

## Do Not Refactor Global Widgets For Page-Specific Problems

Global widgets are shared by Dashboard, Portfolio, MT5 and future pages. A visual change in one global widget can affect many screens.

Protected visual infrastructure:

```text
WidgetContainer
WidgetMetric
WidgetMetricGrid
WidgetMetrics
WidgetHeader
WidgetFooter
PageLayout
PageHeader
Sidebar
```

Rules:

1. If only one page looks wrong, fix that page or feature component.
2. Do not change global widgets unless the issue is truly global.
3. Before global visual changes, test Dashboard, Portfolio and MT5.
4. Prefer feature-specific polish over system-wide refactor.

---

## Page Structure Standard

Major pages should follow:

```text
PageLayout
↓
PageHeader
↓
Feature widgets / page sections
```

Current implemented pages:

- Dashboard
- Portfolio

Future pages should follow this pattern when they are touched for feature work.

---

## Reuse Before Build

Before creating a new component, check whether an existing component already solves the same problem.

Examples from Sprint 24:

- MT5 account summary API already existed.
- Dashboard MT5 widget reused existing MT5 API functions.
- Portfolio charts were added as feature-specific because they did not exist elsewhere.

This prevents duplicate components and reduces future maintenance.
