# Current Project Status

Status synchronized with branch `feature/multi-user-rebuild` after Sprint 35 on 2026-08-02.

## Release State

```text
Product: TradePilot Pro
Version: 1.0 — Multi-User Foundation
Active Branch: feature/multi-user-rebuild
Current State: Sprint 35 functional hardening completed
Next Package: Final compile/build/test, documentation review and user-approved closing commit
Merge State: Pending final Git diff review and explicit user approval
```

## Implemented Version 1 Foundation

### Authentication and Public Entry

- JWT authentication and centralized authenticated Axios behavior.
- Login, registration, logout, recovery and password-reset flows.
- Shared public authentication layout.
- Protected and administrator route composition.
- Inactive-user protection.
- Administrator User Management and self-protection.

### Ownership and Isolation

Backend-enforced authenticated ownership now covers:

- Trades
- Dashboard
- Portfolio
- MT5 accounts and synchronization
- Trading Plans
- Rule Engine evaluation
- CSV, PDF and Excel trade exports

### Trading Journal and MT5

- Manual and MT5 trades follow the canonical Trade lifecycle.
- Manual MT5 position/ticket reconciliation prevents duplicate trades.
- PostgreSQL partial unique indexes protect canonical identity.
- Repeated MT5 Sync is idempotent.
- Manual Notes are preserved during Sync.
- MT5 synchronization status is appended without duplicate lines.
- Open/closed synchronization status replaces only the prior MT5 status line.

### Trading Plan

- Markets, Sessions and News Rules are controlled and persisted.
- Trading Constitution supports add, edit, delete and reorder.
- Trading Plan CRUD is scoped to the current user.
- Client payloads cannot assign another `user_id`.
- One default plan is maintained per user.
- Rule Engine uses the authenticated user's default plan.

### Rule Engine and Trade Score

- Rule Engine evaluates only the authenticated user's trade.
- Trades-per-day count is user-scoped and based on the trade date.
- Session aliases are normalized, including `Asia Session`.
- Trade Score has structured violations, warnings and successes.
- Risk per Trade remains a documented placeholder pending a future position-size/account-balance module.

### Reports and Exports

- Reports Summary is readable and uses the existing canonical data contracts.
- CSV, PDF and Excel exports are authenticated and user-scoped.
- Frontend downloads use JWT-authenticated blob requests.
- `openpyxl==3.1.5` is the Excel dependency.

### Safety and UX

- Trade deletion requires explicit confirmation.
- Confirmation has cancellation, loading and error states.
- Login/Register presentation is aligned through a shared auth layout.

### Local Startup

The Windows local launcher is implemented:

```text
Start TradePilot Pro.vbs
        ↓
start_tradepilot.ps1
        ↓
Backend + Frontend readiness checks
        ↓
One browser page
```

Runtime logs are written under `runtime_logs/` and are local artifacts.

## Sprint 35 Validation Evidence

- Starting branch synchronized with origin.
- Starting working tree clean.
- Backend compile passed.
- MT5 repository tests passed: `Ran 7 tests — OK`.
- Frontend production build passed.
- Authentication and registration validated.
- Administrator User Management validated.
- Cross-user trade isolation validated.
- MT5 repeated Sync validated without duplicates.
- Manual Trade create/edit validated.
- Safe Trade Delete validated.
- Dashboard, Portfolio, Analytics, Psychology and Reports validated.
- Trading Plan persistence validated.
- User-specific Rule Engine evaluation corrected.
- Session normalization validated with stored value `Asia Session`.
- Manual Notes preservation validated.
- CSV/PDF/Excel downloads validated.
- One-click launcher validated from stopped backend/frontend state.

A final compile/build/test must be run after the documentation files are copied into the working tree.

## Current Known Limitations / Deferred Work

- Settings Backup/Restore remains incomplete.
- Rule Engine Risk per Trade calculation remains pending.
- Current free Economic Calendar provider does not supply Actual values.
- Licensed/commercial Economic Calendar provider evaluation remains future work.
- Billing, subscriptions, licensing and advanced RBAC remain outside Version 1.
- Cloud-hosted MT5 execution and credential-vault redesign remain future work.

## Workspace Ownership

```text
Home         → Welcome / Command Center
Dashboard    → User-scoped Executive Overview
Trades       → User-scoped Trading Journal
MT5          → User-scoped Trading Connections
Portfolio    → User-scoped realized Portfolio Analysis
Analytics    → Historical Analysis
Psychology   → Trader Journal
Reports      → Reports and user-scoped exports
Trading Plan → User-scoped rules and constitution
Settings     → Profile, Preferences and Security
Admin        → Administrative User Management
```

## Required Closing Steps

1. Apply the Sprint 35 Documentation Package.
2. Run final backend compile and tests.
3. Run final frontend production build.
4. Review `git status`, full file list and diff statistics.
5. Confirm that `runtime_logs/` is not included.
6. Commit only after explicit user approval.
