# 06 - TradePilot UI Framework

# Sprint 18 - TradePilot UI Framework v1

Status: Completed

## Vision Update

Sprint 18 marks the evolution of the frontend architecture.

TradePilot Pro is no longer developed as a collection of independent React pages.

The application now follows a layered frontend architecture based on the TradePilot UI Framework.

---

# Frontend Architecture

```text
Material UI
        ↓
TradePilot UI Framework
        ↓
Application Modules
```

Material UI provides the rendering engine.

TradePilot UI Framework provides the reusable application components.

Business modules should use TradePilot components whenever available.

---

# Current Reusable Components

* Theme
* TradePilotCard
* TradePilotButton
* StatusBadge
* SectionHeader
* InfoRow

---

# Planned Reusable Components

* MetricCard
* EmptyState
* LoadingOverlay
* ConfirmDialog
* PageContainer
* TradePilotDialog
* TradePilotTable
* WidgetHeader
* WidgetFooter
* StatisticCard
* SearchToolbar
* FilterBar

---

# Widget Philosophy

TradePilot Pro is designed around reusable trading widgets.

Examples:

* MT5 Account Widget
* Dashboard Widgets
* Portfolio Widget
* Trading Plan Widget
* AI Coach Widget
* Psychology Widget
* Market Widget

Widgets should share:

* Header
* Status
* Body
* Actions

This guarantees a consistent user experience across the application.

---

# Product Identity

TradePilot Pro is not intended to look like a generic Material UI application.

The objective is to create a recognizable professional trading platform with its own visual identity.

The desired characteristics are:

* clean
* modern
* dark
* consistent
* dashboard oriented
* widget based
* trading terminal inspired

A user should eventually recognize TradePilot Pro from a single screenshot.

---

# Development Philosophy

Frontend development now follows:

```text
Design
↓
Review
↓
Implementation
```

Large UI modules should not be implemented before their visual structure has been agreed.

---

# Future UI Direction

Planned future capabilities include:

* Light Theme
* Dark Theme
* Accent Color selection
* Saved appearance preferences
* Compact / Comfortable layouts
* Per-user appearance settings (future SaaS version)
