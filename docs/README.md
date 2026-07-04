# TradePilot Pro

Professional Trading Journal \& Trading Command Center

\---

# Vision

Το TradePilot Pro δεν είναι απλώς Trading Journal.

Είναι ένα Windows Trading Command Center για:

* Forex
* Metals
* Prop Firm Traders
* Multi-account trading
* Process-based performance review

Βασική φιλοσοφία:

```text
Process over Profit
```

Το πρόγραμμα δεν αξιολογεί μόνο αν ένα trade κέρδισε ή έχασε.

Αξιολογεί αν ο trader ακολούθησε σωστή διαδικασία, κανόνες, πειθαρχία και Trading Plan.

\---

# Development Philosophy

TradePilot Pro αναπτύσσεται με τις παρακάτω αρχές:

* Small Safe Steps
* Documentation First
* Architecture Before Features
* Professional UX
* Reusable Components
* Data Protection First
* Future SaaS Ready
* Process over Profit

Κάθε σημαντικό module περνάει από 3 στάδια:

```text
Functionality
↓
Architecture
↓
Professional UX
```

\---

# Tech Stack

## Backend

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy
* Pydantic
* Uvicorn
* MetaTrader5 Python API
* ReportLab

## Frontend

* React
* Vite
* Material UI
* Axios
* DataGrid
* Recharts later

## Version Control

* Git
* Clean `.gitignore`
* No `venv`
* No `node\_modules`
* No `.env`
* No uploads in Git

\---

# Current Completed Features

## Trading Journal

* Trades CRUD
* Add/Edit Trade
* Trade Details
* Screenshot upload
* Filters
* Search
* CSV Export
* PDF Export
* Trade Score UI

\---

## Dashboard

* KPI Cards
* Equity Curve
* Dashboard API
* Better card UI
* Icons

\---

## Home Command Center

* Home page
* Today Mission widget
* Market Alerts widget
* Trading Sessions widget

Planned

* Latest Trades
* Mini Equity Curve
* Economic Calendar
* AI Coach
* Market Status
* MT5 Status
* Spread Monitor
* Watchlist
* Prop Firm Progress

\---

## Trading Plan Engine

* Multiple Trading Plans
* Trading Plan CRUD
* Trading Plan History
* Trading Plan UI
* Trading Plan Service
* NumericField support for comma and dot
* Snackbar success messages

Examples of supported plan types:

* Forex Conservative
* Gold Intraday
* FTMO Challenge
* The5ers Challenge
* Swing Trading

\---

## Rule Engine

* Rule Engine Service
* Test endpoint
* Real trade evaluation endpoint
* Trade Score Card

Current rule examples:

* Minimum RR
* Allowed session
* Maximum trades per day
* High impact news placeholder
* Risk per trade placeholder

Rule Engine philosophy:

```text
Execution > Profit
```

A losing trade can be good.

A winning trade can be bad.

\---

# MT5 Account Manager

Status: Completed through Sprint 17

The MT5 module is now a real Account Manager, not just an import tool.

\---

## Backend Completed

* MT5Account model
* `mt5\_accounts` table
* MT5 Account CRUD API
* `GET /mt5/accounts`
* `POST /mt5/accounts`
* `PUT /mt5/accounts/{account\_id}`
* `DELETE /mt5/accounts/{account\_id}` as soft delete / disable
* `POST /mt5/sync?account\_id=...`
* Pydantic schemas
* Service layer
* `get\_db()` dependency
* Account-aware MT5 sync
* Duplicate detection with `(mt5\_account\_id, mt5\_ticket)`
* MT5 ticket is external reference only
* Internal DB IDs remain primary keys

Temporary note

* Scheduler startup is temporarily disabled until Auto Sync becomes multi-account aware.

\---

## Frontend Completed

* React API layer
* MT5 Accounts UI inside Settings
* Account list
* Add Account Dialog
* Edit Account Dialog
* Disable account
* Activate account
* Sync selected account
* Active / Disabled badge
* Login display
* Last Sync display
* Snackbar notifications
* Sync loading state
* Actions menu
* Professional account card Phase 1
* Component extraction
* Stable sorting fix

Frontend structure:

```text
frontend/src/api/mt5AccountsApi.js
frontend/src/components/settings/mt5/MT5AccountsManager.jsx
frontend/src/components/settings/mt5/MT5AccountCard.jsx
```

\---

# Architecture Standards

Backend flow:

```text
Model
↓
Schema
↓
Service
↓
Router
↓
React API
↓
React UI
```

Frontend guidelines:

* React components should ideally stay under 200-250 lines
* Extract cards, dialogs, toolbars and helpers early
* Use Material UI
* Use Snackbar, not alert
* Use NumericField for numeric input
* Keep UI state stable
* Prefer reusable components

\---

# Important Architecture Decisions

* `Trade.id` is internal DB primary key
* MT5 ticket is stored as `mt5\_ticket`
* Duplicate detection uses `(mt5\_account\_id, mt5\_ticket)`
* MT5 trades are archived instead of hard-deleted
* MT5 accounts are disabled instead of hard-deleted
* Permanent delete of MT5 accounts is allowed only if no trades exist
* Business logic belongs in services
* Routers stay thin
* Documentation is updated after important Sprints
* Product quality pipeline is Functionality → Architecture → Professional UX

\---

# Future SaaS Direction

Current project is local-first.

Future commercial version may support:

* User login
* Password
* Monthly subscription pass key
* Subscription validation
* Per-user MT5 accounts
* Secure broker credentials
* Multi-user data isolation

Development should avoid decisions that block this future direction.

\---

# Future Trading Connections Direction

MT5 Account Manager may later evolve into a more general Trading Connections module.

Possible future platforms:

* MT5
* cTrader
* DXTrade
* MatchTrader
* Interactive Brokers
* Binance
* Bybit
* TradingView Bridge

Current decision:

Do not rename MT5 modules yet.

Generalization should happen when a second real platform is implemented.

\---

# Current Development Status

## Completed through Sprint 17

Sprint 17 completed the first full MT5 Account Manager.

Completed:

* Backend MT5 Account CRUD
* Account-aware MT5 Sync
* Frontend MT5 Account Manager UI
* Add/Edit/Disable/Activate/Sync
* Component extraction
* Professional card Phase 1
* Real MT5 sync tested

\---

# Next Active Sprint

## Sprint 18.0 - TradePilot Design System Foundation

Goal:

Create a shared Design System before the UI grows further.

Planned:

* Shared card styles
* Shared button patterns
* Shared badge/status patterns
* Shared colors
* Shared spacing
* Shared typography
* Hover effects
* Reusable UI primitives

First target:

Apply the Design System to MT5 Account Manager.

\---

# Long Term Goal

Να δημιουργηθεί το καλύτερο Trading Command Center για Windows,
με AI, Rule Engine, MT5 Manager, Portfolio Analytics, Prop Firm support,
Psychology, Trading Plans και επαγγελματικό UX.

