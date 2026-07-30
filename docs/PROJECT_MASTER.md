# TradePilot Pro — Project Master

## Product State

TradePilot Pro is a FastAPI + React trading journal and analytics platform. The active Version 1.0 work converts the completed local single-user foundation into an authenticated multi-user platform while preserving the Version 0.9 MT5, portfolio, analytics and UI architecture.

## Active Source of Truth

```text
Repository: bpanagioths-afk/TradePilot-Pro
Branch: feature/multi-user-rebuild
Version: 1.0 — Multi-User Foundation
```

Use this authority order:

1. Active Git branch source code.
2. Database schema/migrations.
3. `project/09_Current_State/Current_Project_Status.md`.
4. `project/11_ACTIVE_SPRINT.md`.
5. Active decision registry.
6. Historical documentation.

## Architecture

```text
React Pages and Components
        ↓
Frontend API / Service Layer
        ↓
FastAPI Routers / Feature APIs
        ↓
Authorization Dependencies
        ↓
Service Layer
        ↓
Repository Layer
        ↓
PostgreSQL / MT5 Provider
```

Authentication and ownership are cross-cutting backend concerns. The frontend may hide or redirect UI routes, but backend dependencies and scoped queries are the security authority.

## Current Product Modules

- Authentication and account recovery.
- Administrative User Management.
- Trading Journal and trade ownership.
- Dashboard and analytics.
- MT5 account management and synchronization.
- Portfolio analysis.
- Trading plans and rule engine.
- Psychology journal.
- Reports and exports.
- Settings and per-user preferences.

## Version 1.0 Multi-User Capabilities

- JWT login.
- Active/inactive account enforcement.
- Administrator/user distinction.
- Administrator user lifecycle tools.
- Per-user trades, dashboard, portfolio and MT5 data.
- Profile name, base currency and theme preference fields.
- Forgot username, forgot password and reset password.
- Authorization-aware application navigation.

## Protected Foundations

- Backend single business-logic authority.
- Audit-before-code workflow.
- Reuse before new implementation.
- Portfolio reference module.
- Shared widgets and charts.
- Multi-asset MT5 movement engine.
- Explicit terminal connection policy.

## Documentation Entry Points

1. `START_HERE.md`
2. `PROJECT_BOOTSTRAP.md`
3. `project/09_Current_State/Current_Project_Status.md`
4. `project/11_ACTIVE_SPRINT.md`
5. `SOURCE_CODE_STRUCTURE.md`
6. `decisions/DECISION_STATUS_REGISTRY.md`
