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
