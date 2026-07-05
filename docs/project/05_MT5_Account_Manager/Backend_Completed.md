### Backend Completed

Implemented through Sprint 18:

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

Architecture through Sprint 18:

* MT5 Account APIs use Pydantic schemas
* Routers call services
* Services handle database logic
* MT5 account delete means disable, not hard delete
* MT5 sync duplicate detection uses `(mt5_account_id, mt5_ticket)`
* MT5 ticket is never used as internal Trade primary key
* Every imported MT5 trade belongs to one MT5 account

---

## Sprint 19 Backend Additions

Sprint 19 expanded the MT5 backend from account CRUD and manual import into a professional account summary backend.

Implemented:

* `MT5AccountSummary` response schema
* `GET /mt5/accounts/{account_id}/summary`
* Balance field
* Equity field
* Floating Profit / Loss field
* Open Positions field
* Connection Status field
* Health Message field
* Imported Trades Count field
* Safe fallback when MT5 is not installed or unavailable
* Live MT5 account info loading through the MetaTrader5 Python package
* Live MT5 position count
* Floating P/L calculation from open positions
* Summary service inside `mt5_account_service.py`

---

## Sync Engine Foundation

Sprint 19 introduced a new backend service:

```text
backend/app/services/sync_engine.py
```

Purpose:

* keep sync scheduling logic outside `mt5_sync.py`
* calculate account sync status
* calculate next sync time
* expose Auto Sync readiness without running a background scheduler yet

Implemented endpoint:

```text
GET /mt5/accounts/{account_id}/sync-status
```

Current sync statuses:

* `disabled`
* `ready`
* `waiting`
* `due`

---

## Current Backend Rule

`mt5_sync.py` remains responsible only for importing MT5 historical trades.

`sync_engine.py` is responsible for sync status / scheduling foundation.

This keeps the import service clean and prepares the project for future:

* APScheduler
* Windows Service
* SaaS Scheduler
* multi-source sync
* TradingView sync
* Economic Calendar sync

---

## Temporary Note

Scheduler startup remains disabled until the future Auto Sync implementation becomes fully multi-account aware.

---
