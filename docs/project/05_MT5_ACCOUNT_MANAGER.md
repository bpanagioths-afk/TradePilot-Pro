# 05 - MT5 Account Manager

Status: Sprint 17 completed

The MT5 module is no longer just an import tool.

It is now the first version of a full MT5 Account Manager.

---

## Backend Completed

Implemented:

* `MT5Account` backend model
* `mt5_accounts` table
* `MT5Account` backend CRUD
* `GET /mt5/accounts`
* `POST /mt5/accounts`
* `PUT /mt5/accounts/{account_id}`
* `DELETE /mt5/accounts/{account_id}` as soft delete / disable
* `POST /mt5/sync?account_id=...`
* `backend/app/schemas/mt5_account.py`
* `backend/app/services/mt5_account_service.py`
* `get_db()` dependency in `app/core/database.py`

Architecture:

* MT5 Account APIs use Pydantic schemas
* Routers call services
* Services handle database logic
* MT5 account delete means disable, not hard delete
* MT5 sync duplicate detection uses `(mt5_account_id, mt5_ticket)`
* MT5 ticket is never used as internal Trade primary key
* Every imported MT5 trade belongs to one MT5 account

Temporary note:

* Scheduler startup was temporarily disabled until Auto Sync becomes multi-account aware.

---

## Frontend Completed

Implemented:

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

Refactor:

* `Settings.jsx` cleaned and reduced
* `MT5AccountsManager.jsx` extracted
* `MT5AccountCard.jsx` extracted
* MT5 UI moved to `components/settings/mt5/`
* Stable sorting by internal `id` added to avoid UI action confusion after Activate / Disable

Tested:

* Add account works
* Edit account works
* Disable account works
* Activate account works
* Sync selected account works
* Real MT5 account sync imported trades
* Last Sync refresh works

---

## Sprint 19 Direction

Sprint 19 starts from:

```text
Professional MT5 Account Widget
```

Goal:

Να μετατραπεί η υπάρχουσα κάρτα MT5 σε πλήρες trading widget.

Planned additions:

* Balance
* Equity
* Floating Profit
* Open Positions
* Connection Health
* Demo / Live
* Prop Firm
* Auto Sync
* Import Statistics
* Relative Last Sync
