# 11 — Active Sprint

# Sprint 31B — Administrative Frontend and User Management UI

Status: Active package, ready for source audit and implementation.

## Version

```text
Version 1.0 — In progress
Active branch: feature/multi-user-rebuild
Completed package: Sprint 31A backend
Active package: Sprint 31B frontend
```

## Primary Goal

Implement the complete Administrative Frontend by consuming the verified Sprint 31A backend contracts and reusing the existing React architecture and design system.

## Mandatory Reading

Start from `docs/START_HERE.md`, then follow its Mandatory Reading Order.

Current continuation file:

`docs/project/09_Current_State/NEXT_CHAT_PROMPT_SPRINT32.md`

## In Scope

- Audit the real frontend tree and existing routing, navigation, API, authentication, form, dialog, loading, error and notification patterns.
- User list.
- Create user.
- Edit user.
- Reset password.
- Activate and deactivate user through the existing update contract.
- Correct authorization-aware navigation and page access.
- Loading, empty, error and success states.
- Production build and end-to-end validation.
- Documentation update and Git release steps.

## Conditional Scope

Safe delete is included only if an actual backend endpoint and approved service rules exist. The currently verified Sprint 31A API does not expose delete. Do not invent the contract in the frontend.

## Locked Scope

- Sprint 31A backend business logic, unless a verified defect or required missing contract is proven.
- Version 0.9 MT5 synchronization and movement contracts.
- Shared Widget System.
- Shared Chart Infrastructure.
- Portfolio reference implementation.
- Explicit MT5 terminal connection policy.

## Out of Scope

- Subscription management.
- Billing and licensing.
- Tenant isolation redesign.
- Credential vaults.
- Cloud MT5 connector.
- Broker or Manager APIs.
- Broad roles and permissions redesign.

## Mandatory Rules

- D-061 — verify entry point, repository, branch, version, sprint and package.
- D-062 — audit tree and existing implementation before editing.
- D-063 — define exact editable and locked files; deliver complete files when the user applies changes.
- D-058 — backend remains the single business-logic authority.
- D-059 — Portfolio remains the reference module.
- Reuse existing components and patterns before creating new ones.
- Treat `οκ ετοιμο` as confirmation and continue immediately.

## Definition of Done

- Administrative page is accessible only to authorized administrators.
- User list loads from `GET /admin/users`.
- Create, edit and reset-password flows use the verified API contracts.
- Active-state changes obey backend protections.
- No frontend-only business rules duplicate backend authority.
- Loading, errors and success notifications work.
- Frontend production build passes.
- Relevant documentation is synchronized.
- Git diff is reviewed, committed and pushed.
