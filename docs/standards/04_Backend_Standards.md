# Backend Standards

## Required Flow

All new backend modules must follow:

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

## Routers

Routers must stay thin.

Routers should:

* define endpoints
* receive request data
* call services
* return responses
* raise HTTP exceptions when needed

Routers should not contain heavy business logic.

## Services

Services contain business logic.

Services should:

* query the database
* create records
* update records
* apply rules
* perform validation that belongs to business logic
* return models or clean results

## Schemas

All new CRUD APIs must use Pydantic schemas.

Required schema types when useful:

* `Create`
* `Update`
* `Response`

Example:

* `MT5AccountCreate`
* `MT5AccountUpdate`
* `MT5AccountResponse`

## Database Sessions

New routers should use:

```python
db: Session = Depends(get_db)
```

Avoid opening `SessionLocal()` directly inside routers.

Service-only background tasks may still use `SessionLocal()` when needed.

---

## Sprint 19 Backend Additions

Sprint 19 confirmed the backend standard through the MT5 Summary flow.

The accepted summary pattern is:

```text
Schema
↓
Service
↓
Router
↓
Frontend API
↓
Widget
```

Implemented examples:

* `MT5AccountSummary`
* `get_mt5_account_summary`
* `GET /mt5/accounts/{account_id}/summary`
* `get_mt5_sync_status`
* `GET /mt5/accounts/{account_id}/sync-status`

## External Integration Rule

External integrations such as MT5 must be wrapped in services.

Routers must not call external APIs directly.

When an external service is unavailable, the backend should return a safe response instead of crashing the application.

Examples:

* MT5 terminal closed
* MetaTrader5 Python package missing
* account information unavailable

## Sync Engine Rule

Manual import logic and sync scheduling logic must stay separate.

Accepted separation:

```text
Sync Engine
↓
Provider Sync Service
↓
Database
```

`mt5_sync.py` should remain focused on MT5 history import.

`sync_engine.py` should own sync status, next sync and future scheduler readiness.

---
