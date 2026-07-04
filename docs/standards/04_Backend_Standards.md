# Backend Standards

## Required Flow

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
db: Session = Depends(get\_db)
```

Avoid opening `SessionLocal()` directly inside routers.

Service-only background tasks may still use `SessionLocal()` when needed.

\---
