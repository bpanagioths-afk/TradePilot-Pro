# TradePilot Pro Backlog

> Όλες οι ιδέες που δεν έχουν υλοποιηθεί ακόμα.
>
> Καμία ιδέα δεν διαγράφεται.
>
> Όλες ταξινομούνται ανά προτεραιότητα.

\---

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

# MEDIUM PRIORITY

## Dashboard

* \[ ] Portfolio View
* \[ ] Multi Account Statistics
* \[ ] Equity Curve PRO
* \[ ] Drawdown Chart
* \[ ] Profit Factor
* \[ ] Calendar View
* \[ ] Heatmap

\---

## Trading

* \[ ] Favorite Setups
* \[ ] Tags
* \[ ] Screenshot Gallery
* \[ ] Replay Mode
* \[ ] Timeline
* \[ ] Trade Checklist

\---

## Notifications

* \[ ] Telegram
* \[ ] Discord
* \[ ] Email
* \[ ] Desktop Notifications

\---

## Reports

* \[ ] Excel Export
* \[ ] Print Preview
* \[ ] Advanced PDF Reports
* \[ ] Monthly Report
* \[ ] Prop Firm Report

\---

# LOW PRIORITY

## Mobile

* \[ ] Android
* \[ ] iPhone

\---

## Cloud

* \[ ] Login
* \[ ] Backup
* \[ ] Cloud Sync

\---

## Future

* \[ ] Voice Notes
* \[ ] Market Scanner
* \[ ] Broker Comparison
* \[ ] TradingView Sync
* \[ ] Prop Firm API

\---

# COMPLETED IN SPRINT 17

## MT5 Account Manager Backend

* \[x] MT5 Account CRUD API
* \[x] `GET /mt5/accounts`
* \[x] `POST /mt5/accounts`
* \[x] `PUT /mt5/accounts/{account\_id}`
* \[x] `DELETE /mt5/accounts/{account\_id}` as soft delete / disable
* \[x] `POST /mt5/sync?account\_id=...`
* \[x] Pydantic schemas
* \[x] MT5 account service layer
* \[x] `get\_db()` dependency
* \[x] Account-aware MT5 sync
* \[x] Duplicate detection

## MT5 Account Manager Frontend

* \[x] React MT5 Accounts page inside Settings
* \[x] React API layer
* \[x] Account list
* \[x] Add account dialog
* \[x] Edit account dialog
* \[x] Disable account action
* \[x] Activate account action
* \[x] Sync selected account button
* \[x] Last Sync display
* \[x] Login display
* \[x] Active / Disabled badge
* \[x] Snackbar notifications
* \[x] Sync loading state
* \[x] Actions menu
* \[x] Component refactor
* \[x] Professional card Phase 1

\---

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

