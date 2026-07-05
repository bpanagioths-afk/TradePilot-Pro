## Current Backend Architecture Standard

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

Rules

* Routers stay thin
* Business logic goes into services
* Pydantic schemas are used for request / response
* Database sessions use `Depends(get_db)` in routers
* External system IDs are never primary keys
* Historical data is protected

---

## Sprint 19 Backend Pattern

Sprint 19 confirmed the backend standard through the MT5 Summary API and Sync Engine Foundation.

Implemented flow:

```text
MT5Account model
↓
MT5AccountSummary schema
↓
mt5_account_service.py
↓
mt5.py router
↓
mt5AccountsApi.js
↓
MT5AccountsManager
↓
MT5AccountCard
```

---

## Summary Service Rule

Summary endpoints should aggregate module state for professional widgets.

A summary service may combine:

* database state
* external system state
* calculated statistics
* health / connection status
* last update status
* UI-ready values

For MT5:

* account identity comes from PostgreSQL
* imported trade statistics come from PostgreSQL
* live metrics come from MetaTrader5
* connection health comes from MT5 initialization / account info
* fallback state protects the UI when MT5 is unavailable

---

## External System Rule

External systems must be isolated behind services.

Routers should not directly call:

* MT5 Python API
* TradingView integration
* future calendar APIs
* prop firm APIs
* broker APIs

Instead, routers call service functions.

---

## Sync Engine Rule

Sprint 19 introduced:

```text
backend/app/services/sync_engine.py
```

Purpose:

* calculate sync readiness
* calculate next sync time
* keep scheduling logic separate from import logic
* prepare for future background sync

The manual MT5 import service remains:

```text
backend/app/services/mt5_sync.py
```

`mt5_sync.py` should continue to focus on importing MT5 trade history.

`sync_engine.py` should own sync status / scheduling foundation.

---

## Future Scheduler Direction

The project may later use one of the following:

* APScheduler
* Windows Service
* Celery
* SaaS scheduler
* cloud job runner

The Sync Engine should remain the abstraction layer before any concrete scheduler implementation.

---
