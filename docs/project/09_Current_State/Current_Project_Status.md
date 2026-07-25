# Current Project Status

Status synchronized after completion of the Sprint 31A backend package.

## Release State

```text
Product: TradePilot Pro
Version: 1.0 — In progress
Active Branch: feature/multi-user-rebuild
Sprint 31A — Backend package completed
Active Package: Sprint 31B — Administrative Frontend
Next milestone: Complete and validate the User Management UI
```

## Completed Product Foundation

### Version 0.9

- MT5 multi-account management and Live Trading Center.
- MT5 Synchronization Engine v2 with position aggregation and idempotent upsert.
- Canonical multi-asset movement model.
- Shared Portfolio, Analytics, Widget and Chart infrastructure.
- Explicit MT5 terminal connection policy.
- Successful backend compile and frontend production build.

### Version 1.0 — Sprint 31A Backend

- JWT authentication and centralized authorization dependencies verified.
- Admin-only endpoint protection.
- Multi-user backend foundation.
- User lifecycle fields for active state, administrative permissions, update tracking and last login.
- Administrative User Management backend.
- Duplicate username and email validation.
- Password hashing and administrative password reset.
- Protection against self-deactivation and self-removal of administrator privileges.

Verified administrative endpoints:

- `GET /admin/users`
- `POST /admin/users`
- `PUT /admin/users/{user_id}`
- `POST /admin/users/{user_id}/reset-password`

The admin router is registered in `backend/app/main.py` under `/admin`.

## Active Package — Sprint 31B

Target: complete the Administrative Frontend and User Management UI.

Required scope:

- User list.
- Create user.
- Edit user.
- Reset password.
- Activate and deactivate user.
- Safe delete only after the backend contract exists and is verified.
- Loading indicators.
- Error handling.
- Success notifications.
- Frontend production build validation.

## Locked Scope

The completed Sprint 31A backend is locked unless a verified defect or a missing required contract is demonstrated.

Do not change without evidence:

- Authentication and JWT behavior.
- Authorization dependencies.
- Existing admin user endpoints and service rules.
- Version 0.9 MT5 synchronization and movement contracts.
- Shared Widget System and Shared Chart Infrastructure.
- Portfolio reference implementation.
- Explicit MT5 terminal connection policy.

## Known Contract Gap

The current verified admin API does not expose a delete-user endpoint. “Safe Delete User” must not be implemented as a frontend-only assumption. The backend contract and business rules must first be audited and approved if deletion remains part of Sprint 31B.

## Mandatory Decision Framework

Authority: `docs/decisions/DECISION_STATUS_REGISTRY.md`.

Specially enforced canonical decisions:

- D-053 — Shared Widget System.
- D-055 — Multi-Asset MT5 Engine.
- D-058 — Backend Is the Single Business Logic Authority.
- D-059 — Portfolio Is the Reference Module.
- D-061 — Single Entry Point and Startup Verification.
- D-062 — Audit-First Package Workflow.
- D-063 — Exact Delivery and Locked Scope.

Legacy workflow decisions that the registry marks as superseded remain historical records and are not separate active rules.

## Validation State

Completed and verified before Sprint 31B:

- Sprint 31A admin endpoints tested through Swagger.
- User list, create, update and password reset passed.
- Duplicate and permission validation passed.
- Version 0.9 regression-sensitive contracts remain protected.

Still required for Sprint 31B closure:

- Frontend implementation audit.
- Frontend production build.
- End-to-end admin workflow validation.
- Documentation update.
- Git diff review, commit and push.

## Workspace Ownership

```text
Home       → Welcome / Command Center
Dashboard  → Executive Overview
MT5        → Live Trading Center
Portfolio  → Portfolio Analysis
Analytics  → Historical Analysis
Psychology → Trader Journal
Reports    → Reports & Export
Admin      → Administrative User Management
```
