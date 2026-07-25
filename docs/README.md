# TradePilot Pro Documentation

TradePilot Pro is a professional Trading Journal and Trading Command Center evolving toward a secure multi-user platform.

## Permanent Entry Point

Every new development conversation starts from:

`docs/START_HERE.md`

Follow its Mandatory Reading Order before auditing or modifying source code.

## Current Status

```text
Version 0.9 — Completed
Version 1.0 — In progress
Sprint 31A backend — Completed
Active package — Sprint 31B Administrative Frontend
Active branch — feature/multi-user-rebuild
```

Authoritative operational files:

- `docs/project/09_Current_State/Current_Project_Status.md`
- `docs/project/11_ACTIVE_SPRINT.md`
- `docs/decisions/DECISION_STATUS_REGISTRY.md`

## Product Direction

```text
Trading Journal
↓
Trading Command Center
↓
Secure Multi-User Trading Platform
```

Core philosophy:

```text
Process over Profit
```

## Architecture Principles

- Audit before modification.
- Backend is the single business-logic authority.
- Reuse before creating new services, APIs or components.
- Package-first implementation with locked scope.
- Portfolio remains the reference feature module and UI.
- Documentation is part of the Definition of Done.

## Documentation Areas

| Path | Purpose |
|---|---|
| `START_HERE.md` | Permanent startup entry point |
| `PROJECT_BOOTSTRAP.md` | Development workflow and source-of-truth order |
| `project/` | Product, architecture, current state and sprint scope |
| `decisions/` | Architecture decisions and authoritative status registry |
| `standards/` | Engineering and release standards |
| `changelog/` | Sprint release records |
| `history/` | Product evolution and timeline |
| `backlog/` | Priorities and long-term roadmap |
| `SOURCE_CODE_STRUCTURE.md` | Source structure handbook |
| `DESIGN_SYSTEM.md` | UI and UX reference |

## Current Sprint 31B Goal

Build the Administrative Frontend using the verified Sprint 31A backend contracts:

- List users.
- Create and edit users.
- Reset passwords.
- Activate and deactivate accounts.
- Enforce administrator access.
- Reuse loading, error, notification and form patterns.
- Validate the production build.

A delete-user operation must not be assumed because the currently verified admin API has no delete endpoint.
