# Sprint 19 - Professional MT5 Trading Widget

Priority: HIGH

Status: Current Sprint / Planned

Goal

Transform the MT5 Account Card into a complete professional trading account widget using the TradePilot UI Framework.

Planned additions

- Balance
- Equity
- Floating Profit
- Open Positions
- Connection Health
- Demo / Live badge
- Prop Firm badge
- Auto Sync foundation
- Import Statistics
- Relative Last Sync
- Account Summary endpoint

Design rule

Use TradePilot reusable components first.


---

# HIGH PRIORITY

## Sprint 18 - TradePilot Design System Foundation

* \[ ] Shared card style
* \[ ] Shared action button patterns
* \[ ] Shared status badge patterns
* \[ ] Shared spacing rules
* \[ ] Shared typography rules
* \[ ] Shared hover effects
* \[ ] Shared status colors
* \[ ] Reusable UI primitives for professional desktop look
* \[ ] Apply first to MT5 Account Manager

\---

## MT5 Account Manager

Completed in Sprint 17

* \[x] Multi MT5 Accounts backend foundation
* \[x] MT5 Account CRUD API
* \[x] Account-aware MT5 Sync
* \[x] Duplicate Detection using `(mt5\_account\_id, mt5\_ticket)`
* \[x] Soft Delete / Disable account
* \[x] React API layer
* \[x] Account list
* \[x] Add account dialog
* \[x] Edit account dialog
* \[x] Disable account action
* \[x] Activate account action
* \[x] Sync selected account button
* \[x] Active / Disabled badge
* \[x] Last Sync display
* \[x] Login display
* \[x] Snackbar notifications
* \[x] Sync loading state
* \[x] Actions menu
* \[x] Component extraction
* \[x] Stable sorting fix

Next MT5 improvements

* \[ ] Professional MT5 card layout using Design System
* \[ ] Broker / platform icon
* \[ ] Demo / Live badge
* \[ ] Prop Firm badge
* \[ ] Relative Last Sync text
* \[ ] Connection Health status
* \[ ] Test Connection action
* \[ ] Import Preview
* \[ ] Conflict Resolution
* \[ ] Sync result summary
* \[ ] Trades imported count
* \[ ] Last imported trade display
* \[ ] Balance import
* \[ ] Equity import
* \[ ] Open positions import
* \[ ] Auto Sync
* \[ ] Sync Scheduler
* \[ ] Account-aware Auto Sync redesign
* \[ ] Permanent Delete only when no trades exist

\---

## Trading Connections - Future

* \[ ] Evaluate generic Trading Connections architecture
* \[ ] Add platform type field when needed
* \[ ] Support non-MT5 platforms later
* \[ ] cTrader integration idea
* \[ ] DXTrade integration idea
* \[ ] MatchTrader integration idea
* \[ ] TradingView Bridge idea
* \[ ] Interactive Brokers idea
* \[ ] Crypto exchange connection idea

Note

Do not rename MT5 modules to Trading Connections yet.

Generalization should happen when a second real platform is implemented.

\---

## SaaS / Subscription Future

* \[ ] User authentication
* \[ ] Password login
* \[ ] Subscription pass key
* \[ ] Monthly license validation
* \[ ] Per-user MT5 accounts
* \[ ] Secure broker credentials storage
* \[ ] Provider subscription management
* \[ ] Multi-user data isolation
* \[ ] Admin subscription dashboard

\---

## AI Coach

* \[ ] Trade Review
* \[ ] Daily Review
* \[ ] Weekly Review
* \[ ] Monthly Review
* \[ ] Psychology Analysis
* \[ ] Rule Engine Integration
* \[ ] Trading Plan Analysis
* \[ ] Personalized Suggestions

\---

## Economic Calendar

* \[ ] High Impact News
* \[ ] Currency Filters
* \[ ] News Countdown
* \[ ] Trading Plan Integration
* \[ ] Rule Engine Integration

\---

## Trading Playbook

* \[ ] Setup Library
* \[ ] Winning Examples
* \[ ] Losing Examples
* \[ ] Entry Checklist
* \[ ] Exit Checklist
* \[ ] AI Notes

\---

---

# NEXT SPRINT

## Sprint 18.0 - TradePilot Design System Foundation

* \[ ] Create Design System rules
* \[ ] Define shared card style
* \[ ] Define shared button style
* \[ ] Define shared badge style
* \[ ] Define status colors
* \[ ] Define spacing and typography rules
* \[ ] Apply first to MT5 Account Manager
* \[ ] Start Professional UX phase for TradePilot Pro

---

---

# TradePilot UI Framework

Priority: HIGH

Status: Planned

Description

Continue expanding the TradePilot UI Framework introduced in Sprint 18.

Planned reusable components:

- TradePilotCard
- TradePilotButton
- TradePilotTable
- TradePilotDialog
- TradePilotToolbar
- MetricCard
- EmptyState
- LoadingOverlay
- ConfirmDialog
- PageContainer
- StatisticCard
- WidgetHeader
- WidgetFooter
- SearchToolbar
- FilterBar

Goal

Every frontend module should be built primarily from reusable TradePilot UI components.

---

---

# Design Playground

Priority: HIGH

Status: Planned

Description

Create a dedicated internal page for developing and previewing reusable UI components.

Possible location:

frontend/src/design-system/

The page should display:

- Colors
- Typography
- Buttons
- Cards
- Badges
- Dialogs
- Tables
- Widgets
- Empty States
- Loading States

Goal

Every new component is designed and verified before being used inside production modules.

---

---

# MT5 Professional Widget

Priority: HIGH

Status: Planned

Future MT5 widget information:

- Balance
- Equity
- Floating Profit
- Open Positions
- Connection Status
- Last Import
- Auto Sync Status
- Broker Logo
- Demo / Live
- Prop Firm
- Relative Last Sync
- Import Statistics

Goal

Transform the MT5 Account Card into a complete trading account widget.

---



## MT5 Sync / Portfolio

### BUG-001 - Duplicate after MT5 Sync
If a trade is entered manually and then MT5 Sync is executed, the same trade is imported again instead of being matched.

Priority: High

---

### BUG-002 - Portfolio ignores manual trades
Portfolio statistics currently count imported MT5 trades but ignore manually entered trades.

Priority: High

