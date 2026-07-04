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
