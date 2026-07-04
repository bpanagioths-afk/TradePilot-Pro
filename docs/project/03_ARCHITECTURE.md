# 03 - Architecture Standards

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

Rules:

* Routers stay thin
* Business logic goes into services
* Pydantic schemas are used for request / response
* Database sessions use `Depends(get_db)` in routers
* External system IDs are never primary keys
* Historical data is protected

---

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

---

## Official UI Framework Layering

Το frontend πλέον ακολουθεί:

```text
Material UI
↓
TradePilot UI Framework
↓
Application Modules
```

Το Material UI θεωρείται rendering layer.

Όλα τα modules χρησιμοποιούν πρώτα TradePilot reusable components.
