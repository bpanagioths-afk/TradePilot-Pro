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
