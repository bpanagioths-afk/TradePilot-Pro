# NEXT CHAT PROMPT — Sprint 31B Continuation

> Transitional continuation file. The permanent entry point is `docs/START_HERE.md`.

Use this instruction in a new conversation:

> Continue TradePilot Pro from `docs/START_HERE.md`. Use repository `bpanagioths-afk/TradePilot-Pro` and branch `feature/multi-user-rebuild`. Follow the complete Mandatory Reading Order, verify Version 1.0 / Sprint 31B, audit the real frontend source and existing admin backend contracts, then implement only the locked Administrative Frontend package. Do not modify the completed Sprint 31A backend unless a verified defect or a missing approved contract is demonstrated. Do not invent a delete-user API.

## Current State

- Version: 1.0 in progress.
- Sprint 31A: backend completed.
- Active package: Sprint 31B.
- Target: Administrative Frontend and User Management UI.
- Locked: Sprint 31A backend and all protected Version 0.9 contracts.

## Verified Backend Contracts

- `GET /admin/users`
- `POST /admin/users`
- `PUT /admin/users/{user_id}`
- `POST /admin/users/{user_id}/reset-password`

No verified delete-user endpoint currently exists.

## Required Frontend Result

- User list.
- Create user.
- Edit user.
- Reset password.
- Activate / deactivate user.
- Authorization-aware access.
- Loading, empty, error and success states.
- Successful production build.
- Updated documentation and Git release.

The authoritative status files are:

- `docs/project/09_Current_State/Current_Project_Status.md`
- `docs/project/11_ACTIVE_SPRINT.md`
- `docs/decisions/DECISION_STATUS_REGISTRY.md`
