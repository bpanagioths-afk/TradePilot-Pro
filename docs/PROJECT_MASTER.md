# TradePilot Pro - Project Master

## Vision

Το TradePilot Pro είναι ένα Trading Command Center για Forex, Metals και Prop Firm traders.

Δεν είναι απλό Trading Journal.

Στόχος είναι να βοηθά τον trader να:

* καταγράφει trades
* αναλύει την απόδοση
* ελέγχει την πειθαρχία
* ακολουθεί Trading Plan
* αποφεύγει λάθη
* αξιολογεί κάθε trade με βάση τη διαδικασία και όχι μόνο το κέρδος
* διαχειρίζεται πολλούς trading λογαριασμούς
* χτίζει portfolio εικόνα για personal accounts και prop firms

Βασική φιλοσοφία:

```text
Process over Profit
```

Νέα προϊοντική φιλοσοφία μετά το Sprint 17:

```text
Functionality
↓
Architecture
↓
Professional UX
```

Το TradePilot Pro αναπτύσσεται ως επαγγελματικό Windows Trading Command Center και όχι ως απλή εφαρμογή.

\---

## Tech Stack

### Backend

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy
* Pydantic
* Uvicorn
* MetaTrader5 Python API
* ReportLab για PDF

### Frontend

* React
* Vite
* Material UI
* Axios
* DataGrid
* Recharts / charts later

### Version Control

* Git
* Clean `.gitignore`
* No `venv`
* No `node\_modules`
* No `.env`
* No uploads in Git

\---

## Current Modules

### Trading Journal Engine

Implemented

* Trades CRUD
* Add/Edit Trade Dialog
* Trade Details Dialog
* Screenshot upload
* Search
* Filters
* CSV Export
* PDF Export
* Trade Score UI

Core decision

Trade result is not enough.

A trade is evaluated based on execution quality, process and discipline.

\---

### Dashboard

Implemented

* KPI Cards
* Equity Curve
* Better card UI
* Icons
* Full dashboard API

Planned

* Portfolio View
* Multi Account Statistics
* Equity Curve PRO
* Drawdown
* Profit Factor
* Calendar View
* Heatmap

\---

### Home Command Center

Implemented static/widgets

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

### Trading Plan Engine

Implemented

* `trading\_plans` table
* `trading\_plan\_history` table
* `User` model
* `TradingPlan` model
* `TradingPlanHistory` model
* Schemas
* Router
* CRUD API
* Frontend Trading Plan page
* Save Trading Plan
* Snackbar success message
* NumericField component accepting `,` and `.`

Architecture decision

Trading Plans must support multiple plans per user.

Examples

* Forex Conservative
* Gold Intraday
* FTMO Challenge
* The5ers Challenge
* Swing Trading

\---

### Rule Engine

Implemented

* `backend/app/services/rule\_engine.py`
* Test endpoint
* Real trade evaluation endpoint
* Trade Score Card in UI

Current rules v1

* Minimum RR
* Allowed session
* Maximum trades per day
* High impact news placeholder
* Risk per trade placeholder

Important philosophy

Trade Score is not Profit.

A losing trade can have high score if execution was correct.

A winning trade can have low score if rules were violated.

\---

## MT5 Account Manager

Status: Sprint 17 completed

The MT5 module is no longer just an import tool.

It is now the first version of a full MT5 Account Manager.

\---

### Backend Completed

Implemented

* `MT5Account` backend model
* `mt5\_accounts` table
* `MT5Account` backend CRUD
* `GET /mt5/accounts`
* `POST /mt5/accounts`
* `PUT /mt5/accounts/{account\_id}`
* `DELETE /mt5/accounts/{account\_id}` as soft delete / disable
* `POST /mt5/sync?account\_id=...`
* `backend/app/schemas/mt5\_account.py`
* `backend/app/services/mt5\_account\_service.py`
* `get\_db()` dependency in `app/core/database.py`

Architecture

* MT5 Account APIs use Pydantic schemas
* Routers call services
* Services handle database logic
* MT5 account delete means disable, not hard delete
* MT5 sync duplicate detection uses `(mt5\_account\_id, mt5\_ticket)`
* MT5 ticket is never used as internal Trade primary key
* Every imported MT5 trade belongs to one MT5 account

Temporary note

* Scheduler startup was temporarily disabled until Auto Sync becomes multi-account aware.

\---

### Frontend Completed

Implemented

* `frontend/src/api/mt5AccountsApi.js`
* MT5 Accounts UI inside Settings
* Account list
* Add Account dialog
* Edit Account dialog
* Disable Account action
* Activate Account action
* Sync selected account button
* Active / Disabled badge
* Login display
* Last Sync display
* Snackbar notifications
* Sync loading state
* Actions Menu (`⋮`)
* Professional card Phase 1
* Hover effects

Refactor

* `Settings.jsx` cleaned and reduced
* `MT5AccountsManager.jsx` extracted
* `MT5AccountCard.jsx` extracted
* MT5 UI moved to `components/settings/mt5/`
* Stable sorting by internal `id` added to avoid UI action confusion after Activate / Disable

Tested

* Add account works
* Edit account works
* Disable account works
* Activate account works
* Sync selected account works
* Real MT5 account sync imported trades
* Last Sync refresh works

\---

## Current Frontend Architecture Standard

New frontend modules should prefer small reusable components.

Target guideline:

```text
React component size: ideally below 200-250 lines
```

When a component grows too much, extract:

* Card components
* Dialog components
* Toolbar components
* Helper functions
* API layer

\---

## Current Backend Architecture Standard

All new backend modules must follow:

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

Rules

* Routers stay thin
* Business logic goes into services
* Pydantic schemas are used for request / response
* Database sessions use `Depends(get\_db)` in routers
* External system IDs are never primary keys
* Historical data is protected

\---

## Future SaaS / Subscription Direction

The current project remains local-first.

However, development must avoid decisions that block future SaaS support.

Future commercial version may support:

* User login
* Password
* Monthly subscription pass key
* Subscription validation
* Per-user MT5 accounts
* Secure broker credentials
* Provider license system
* Multi-user isolation

This is a future direction, not current Sprint 18 scope.

\---

## Future Trading Connections Direction

Long-term, MT5 Account Manager may evolve into a more generic Trading Connections module supporting:

* MT5
* cTrader
* DXTrade
* MatchTrader
* Interactive Brokers
* Binance
* Bybit
* TradingView Bridge

Current decision

Do not rename MT5 modules yet.

Generalization should happen only when a second real platform is implemented.

\---

## Sprint 18 - Next Active Sprint

### Sprint 18.0 - TradePilot Design System Foundation

Goal

Create the foundation for a consistent professional UI across all TradePilot Pro modules.

Planned

* Shared card style
* Shared button patterns
* Shared badge/status patterns
* Shared spacing rules
* Shared typography rules
* Shared status colors
* Shared hover effects
* Reusable professional UI components

First application

Apply the new Design System to MT5 Account Manager.

Reason

TradePilot Pro is growing into a professional Trading Command Center and needs consistent UX before the UI expands further.

---

# Sprint 18 - TradePilot UI Framework v1

Status: Completed

## Vision Update

Sprint 18 marks the evolution of the frontend architecture.

TradePilot Pro is no longer developed as a collection of independent React pages.

The application now follows a layered frontend architecture based on the TradePilot UI Framework.

---

# Frontend Architecture

```
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

# TradePilot UI Framework

Current reusable components:

- Theme
- TradePilotCard
- TradePilotButton
- StatusBadge
- SectionHeader
- InfoRow

Planned reusable components:

- MetricCard
- EmptyState
- LoadingOverlay
- ConfirmDialog
- PageContainer
- TradePilotDialog
- TradePilotTable
- WidgetHeader
- WidgetFooter
- StatisticCard
- SearchToolbar
- FilterBar

---

# Design System

Official reference:

```
docs/DESIGN_SYSTEM.md
```

This document defines:

- visual identity
- typography
- spacing
- color language
- card philosophy
- widget philosophy
- dialogs
- buttons
- badges
- loading states
- empty states

Every new frontend module should follow this guide.

---

# Widget Philosophy

TradePilot Pro is designed around reusable trading widgets.

Examples:

- MT5 Account Widget
- Dashboard Widgets
- Portfolio Widget
- Trading Plan Widget
- AI Coach Widget
- Psychology Widget
- Market Widget

Widgets should share:

- Header
- Status
- Body
- Actions

This guarantees a consistent user experience across the application.

---

# Product Identity

TradePilot Pro is not intended to look like a generic Material UI application.

The objective is to create a recognizable professional trading platform with its own visual identity.

The desired characteristics are:

- clean
- modern
- dark
- consistent
- dashboard oriented
- widget based
- trading terminal inspired

A user should eventually recognize TradePilot Pro from a single screenshot.

---

# Development Philosophy

Frontend development now follows:

Design

↓

Review

↓

Implementation

Large UI modules should not be implemented before their visual structure has been agreed.

---

# Future UI Direction

Planned future capabilities include:

- Light Theme
- Dark Theme
- Accent Color selection
- Saved appearance preferences
- Compact / Comfortable layouts
- Per-user appearance settings (future SaaS version)

---

# Current Product Direction

TradePilot Pro continues evolving toward a complete Trading Command Center.

Major pillars are:

- Portfolio Management
- MT5 Integration
- Trading Plans
- Rule Engine
- AI Coach
- Psychology
- Analytics
- Economic Calendar
- Risk Management
- Professional Dashboard

Sprint 18 establishes the frontend foundation that all future modules will follow.


# TradePilot Pro συνέχεια

Πριν απαντήσεις:

1. Διάβασε πρώτα το PROJECT_MASTER.md.
2. Διάβασε το CHANGELOG.md.
3. Διάβασε το BACKLOG.md.
4. Διάβασε το DECISIONS.md.
5. Διάβασε το DEVELOPMENT_STANDARDS.md.
6. Διάβασε το docs/DESIGN_SYSTEM.md.
7. Ακολούθησε αυστηρά όλες τις αρχιτεκτονικές αποφάσεις.
8. Συνέχισε από το τελευταίο ενεργό Sprint.

---

# Τρόπος συνεργασίας

- Μιλάμε στα Ελληνικά.
- Ο κώδικας είναι πάντα στα Αγγλικά.
- Οι οδηγίες πρέπει να είναι εξαιρετικά συγκεκριμένες.

Πάντα χρησιμοποίησε την παρακάτω μορφή:

✓ Αρχείο

✓ Βρες αυτό

✓ Βάλε ακριβώς από κάτω αυτό

✓ Αντικατάστησε μόνο αυτό

Όχι γενικές οδηγίες.

Προτιμώνται μικρά ασφαλή βήματα.

Μεγάλα rewrites επιτρέπονται μόνο όταν συμφωνηθούν εκ των προτέρων.

---

# Current Project Status

Sprint 18 ολοκληρώθηκε.

Ολοκληρώθηκαν:

## Backend

- Multi-account MT5 architecture
- MT5 Account CRUD
- Account-aware MT5 Sync
- Service layer architecture
- Stable duplicate detection
- Archive strategy

## Frontend

- MT5 Account Manager
- TradePilot Theme
- TradePilotCard
- TradePilotButton
- StatusBadge
- SectionHeader
- InfoRow
- MT5 UI migration
- Design System foundation

---

# Official UI Framework

Το frontend πλέον ακολουθεί:

Material UI

↓

TradePilot UI Framework

↓

Application Modules

Το Material UI θεωρείται rendering layer.

Όλα τα modules χρησιμοποιούν πρώτα TradePilot reusable components.

---

# Official Design Guide

Official document:

docs/DESIGN_SYSTEM.md

Όλα τα νέα frontend modules πρέπει να ακολουθούν το Design Guide.

---

# Product Philosophy

TradePilot Pro ΔΕΝ είναι πλέον μόνο Trading Journal.

Είναι:

Professional Trading Command Center.

Το UI σχεδιάζεται ως σύνολο από widgets.

---

# Sprint 19

Ξεκινάμε από:

Professional MT5 Account Widget

Στόχος:

Να μετατραπεί η υπάρχουσα κάρτα MT5 σε πλήρες trading widget.

Planned additions:

- Balance
- Equity
- Floating Profit
- Open Positions
- Connection Health
- Demo / Live
- Prop Firm
- Auto Sync
- Import Statistics
- Relative Last Sync

---

# Long Term Vision

TradePilot Pro στοχεύει να εξελιχθεί σε πλήρη desktop trading platform για:

- Forex
- Metals
- Indices
- Crypto
- Prop Firms

με:

- Portfolio Management
- MT5 Integration
- AI Coach
- Trading Plans
- Rule Engine
- Psychology
- Analytics
- Risk Management
- Economic Calendar
- Professional Dashboard

---

Continue development from Sprint 19.
