# TradePilot Pro Changelog

\---

# Sprint 1 - Sprint 14

Initial project

* FastAPI
* PostgreSQL
* React
* Dashboard
* Analytics
* Reports
* Psychology
* MT5 Sync
* Home

\---

# Sprint 15

Trading Plan Engine

Added

* Trading Plans
* Trading Plan History
* CRUD
* Trading Plan UI
* Multiple Plans
* Trading Plan Service

\---

# Sprint 16

Rule Engine

Added

* Rule Engine Service
* Rule Evaluation
* Trade Score
* Trade Score Card
* NumericField
* Snackbar
* Better UI

\---

# Sprint 17

MT5 Account Manager

Status: Completed

Sprint 17 created the first complete version of the MT5 Account Manager.

The project moved from a simple MT5 import tool to a multi-account, account-aware MT5 infrastructure.

\---

## Sprint 17.1 - MT5 Multi Account Architecture

Added

* `MT5Account` model
* `mt5\_accounts` table
* `trades.mt5\_account\_id`
* `trades.mt5\_ticket`
* `trades.imported\_from\_mt5`
* `trades.is\_archived`
* Foreign key from `trades.mt5\_account\_id` to `mt5\_accounts.id`

Architecture decisions applied

* `Trade.id` remains internal database primary key
* MT5 ticket is stored only as `mt5\_ticket`
* Duplicate detection uses `(mt5\_account\_id, mt5\_ticket)`
* MT5 trades are archived instead of hard-deleted

\---

## Sprint 17.2 - MT5 Account Manager Backend CRUD

Completed

* MT5 sync now accepts `account\_id`
* Duplicate detection uses `(mt5\_account\_id, mt5\_ticket)`
* MT5 trades no longer use MT5 ticket as internal `Trade.id`
* Added `get\_db()` database dependency
* Added `MT5Account` CRUD backend API
* Added `GET /mt5/accounts`
* Added `POST /mt5/accounts`
* Added `PUT /mt5/accounts/{account\_id}`
* Added `DELETE /mt5/accounts/{account\_id}` as soft delete / disable
* Added `POST /mt5/sync?account\_id=...`
* Added `backend/app/services/mt5\_account\_service.py`
* Added `backend/app/schemas/mt5\_account.py`
* Added Pydantic request / response schemas
* Added service layer pattern for MT5 Account Manager
* Temporarily disabled scheduler startup until Auto Sync is redesigned for multiple accounts

Tested

* `GET /mt5/accounts` returns accounts
* `POST /mt5/accounts` creates accounts
* `PUT /mt5/accounts/{account\_id}` updates accounts
* `DELETE /mt5/accounts/{account\_id}` sets `is\_active = false`
* `POST /mt5/sync?account\_id=2` returned success with duplicate protection

\---

## Sprint 17.3 - MT5 Account Manager UI

Completed

* Added React API layer for MT5 accounts
* Added `frontend/src/api/mt5AccountsApi.js`
* Connected frontend to backend endpoints:

  * `GET /mt5/accounts`
  * `POST /mt5/accounts`
  * `PUT /mt5/accounts/{account\_id}`
  * `DELETE /mt5/accounts/{account\_id}`
  * `POST /mt5/sync?account\_id=...`

UI added

* MT5 Accounts area inside Settings
* Account list
* Add Account dialog
* Edit Account dialog
* Disable account action
* Activate account action
* Sync selected account button
* Active / Disabled badge
* Login display
* Last Sync display
* Snackbar notifications
* Sync loading state with `Syncing...`
* Professional account card Phase 1
* Hover effect on account cards

Refactor completed

* `Settings.jsx` was reduced and cleaned
* MT5 account logic was extracted from Settings
* Added `components/settings/mt5/MT5AccountsManager.jsx`
* Added `components/settings/mt5/MT5AccountCard.jsx`
* Introduced reusable component structure for MT5 UI
* Added account sorting by internal database `id` to keep UI stable after Activate / Disable actions

UX improvements

* Added Actions Menu (`⋮`) for secondary actions
* Kept Sync as the primary visible action
* Edit / Disable / Activate moved into structured actions
* Disabled accounts cannot sync
* Loading state prevents repeated sync clicks
* Snackbar used for all notifications
* No `alert()` usage

Tested

* Add account works
* Edit account works
* Disable account works
* Activate account works
* Sync selected account works
* Real MT5 account sync was tested and imported trades
* Last Sync refresh works after account reload
* UI stable sorting fixed menu/action confusion after status changes

\---

# Sprint 18

Next active sprint

## Sprint 18.0 - TradePilot Design System Foundation

Goal

Create the first official TradePilot Pro Design System before the UI grows further.

Planned

* Shared card styles
* Shared button patterns
* Shared badge/status patterns
* Shared spacing rules
* Shared typography rules
* Shared colors for status and actions
* Reusable professional UI components
* Apply Design System first to MT5 Account Manager

Product direction

TradePilot Pro will now follow this product quality pipeline:

Functionality
↓
Architecture
↓
Professional UX

The goal is to evolve from a working application into a professional Windows Trading Command Center suitable for Forex, Metals and Prop Firm traders.

---

# Sprint 18 - TradePilot UI Framework v1

Status: Completed

## Goal

Create the first official TradePilot UI Framework and establish a consistent frontend design language before expanding the application.

---

## Technical Changes

Added

- TradePilot Theme
- ThemeProvider integration
- CssBaseline integration
- TradePilotCard
- TradePilotButton
- StatusBadge
- SectionHeader
- InfoRow
- docs/DESIGN_SYSTEM.md

---

## MT5 UI Migration

Completed

- MT5AccountCard migrated to TradePilotCard
- Active / Disabled status migrated to StatusBadge
- SectionHeader integrated into MT5AccountsManager
- Sync action migrated to TradePilotButton
- Information layout migrated to InfoRow
- Shared spacing and component patterns adopted

---

## Architecture Evolution

Frontend architecture now follows:

Material UI

↓

TradePilot UI Framework

↓

Application Modules

Material UI is now treated as the rendering layer.

Application modules should use TradePilot reusable components whenever available.

---

## UI / UX Philosophy

TradePilot Pro now follows the development pipeline:

Functionality

↓

Architecture

↓

Professional UX

↓

Product Identity

The application is evolving into a professional Trading Command Center rather than a collection of CRUD pages.

---

## Design System

Created:

docs/DESIGN_SYSTEM.md

The Design Guide defines:

- visual identity
- typography
- spacing
- reusable components
- button hierarchy
- card philosophy
- widget philosophy
- status colors
- dialog rules
- loading states
- empty states
- future personalization

---

## Widget First Direction

Major frontend modules will gradually evolve into reusable widgets.

Examples:

- MT5 Account Widget
- Dashboard Widgets
- AI Coach Widget
- Trading Plan Widget
- Portfolio Widget
- Market Widget

---

## Future Direction

Sprint 19 will continue with the first complete professional MT5 Account Widget built entirely on top of the TradePilot UI Framework.

Planned additions:

- Balance
- Equity
- Open Positions
- Connection Health
- Demo / Live
- Prop Firm
- Import Statistics
- Auto Sync Status
- Relative Last Sync

---

## Design Milestone

Sprint 18 marks the creation of the first official TradePilot UI Framework and Design Guide.

This milestone defines the frontend architecture and visual identity that future modules will follow.

