# TradePilot Pro -- COMPONENT\_LIBRARY

> Official Component Library for the TradePilot UI Framework.

\---

# Purpose

This document defines every reusable UI component used across TradePilot
Pro.

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

Base container for all widgets and information panels.

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

Display one KPI with emphasis.

Examples:

* Balance
* Equity
* Win Rate
* Profit Factor

\---

# StatisticCard

Purpose:

Display statistical summaries.

\---

# WidgetHeader

Contains:

* Title
* Status
* Actions

\---

# WidgetFooter

Contains:

* Last Update
* Secondary Actions
* Extra Information

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

\---

# Naming Convention

Reusable components:

TradePilot\*

Examples:

* TradePilotCard
* TradePilotButton
* TradePilotTable

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

