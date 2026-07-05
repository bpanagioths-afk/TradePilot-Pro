# Current Active Standard

Sprint 19 completed the first full Professional MT5 Trading Widget.

The current active standard is:

```text
Functionality
↓
Architecture
↓
Professional UX
↓
Product Identity
```

## Backend

New backend work must follow:

```text
Schema
↓
Service
↓
Router
```

Routers remain thin.

Business logic belongs in services.

External integrations must fail safely.

## Frontend

New frontend work must follow:

```text
API Layer
↓
Manager Component
↓
Reusable UI Components
↓
Application Widget
```

## UI Framework

New UI should use:

* TradePilotCard
* TradePilotButton
* StatusBadge
* InfoRow
* MetricCard

Do not duplicate these patterns locally.

## Current Widget Reference

The Professional MT5 Trading Widget is the current reference for future widgets.

Future widgets should follow the same structure unless there is a strong product reason not to.

## MT5 Naming Rule

Do not rename MT5 modules to Trading Connections yet.

Generalization should happen only when a second real platform is implemented.

---
