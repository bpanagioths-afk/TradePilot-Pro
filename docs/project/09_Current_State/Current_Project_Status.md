# Current Project Status

Status synchronized with branch `feature/multi-user-rebuild` after Sprint 34 on 2026-07-31.

## Release State

```text
Product: TradePilot Pro
Version: 1.0 — Multi-User Foundation
Active Branch: feature/multi-user-rebuild
Current State: Sprint 34 regression recovery completed
Next Package: Sprint 35 final Version 1 validation and release readiness
Merge State: Pending final full regression, Git diff review and user-approved commit
```

## Implemented Version 1 Foundation

### Authentication and Security

- JWT access-token authentication.
- Centralized password hashing and token validation.
- Current-user and administrator dependencies.
- Login, authenticated-user and inactive-user protection.
- Account recovery and password reset flows.

### Administration

- Admin-only user list, create, update and password-reset operations.
- Administrator frontend page and route protection.
- Self-protection against accidental administrator lockout.

### Ownership and Isolation

- User ownership for trades, dashboard, portfolio and MT5 accounts.
- Backend-enforced user scoping.
- Existing Version 0.9 Portfolio and MT5 business logic reused rather than duplicated.

### Dashboard and Command Center

- Home Command Center.
- Trading Sessions and Today's Mission.
- Dashboard summary, Psychology, Risk, Market Events and AI Coach roadmap widgets.
- Shared Widget and Chart infrastructure preserved.

## Sprint 34 Regression Recovery

### BUG-001 — Duplicate Trade After MT5 Sync

Status: **Closed**

- Manual trades can be linked to the canonical MT5 position through `mt5_position_id` exposed as `MT5 Εισιτήριο`.
- MT5 Sync reuses and updates the manual record instead of creating a duplicate.
- Ticket duplication is rejected in the backend and reported visibly in the frontend.
- PostgreSQL partial unique indexes protect synced and pre-sync manual identities.
- Seven automated MT5 repository regression tests pass.

### BUG-002 — Manual Trades Missing From Portfolio

Status: **Closed**

- Portfolio remains a realized-performance view and correctly uses closed trades.
- Manual trade creation/editing now supports Open Time and Close Time.
- A manually entered real trade appears in Portfolio after Close Time is supplied.
- No Portfolio repository, engine or aggregation redesign was required.

### BUG-003 — Market Alerts Actual Values

Status: **Closed as provider limitation**

- Frontend rendering and backend mapping preserve Actual values when supplied.
- The configured free weekly Forex Factory JSON payload returned 92 events and no `actual` field/value.
- Current free provider remains for Version 1.
- Website scraping is rejected.
- Licensed/freemium Economic Calendar provider evaluation is deferred to commercial-release planning.

## Current Database Protection

The `trades` table includes partial unique indexes for canonical MT5 identity:

```text
uq_trades_user_account_position
(user_id, mt5_account_id, mt5_position_id)
when mt5_account_id and mt5_position_id are present

uq_trades_user_manual_position
(user_id, mt5_position_id)
when mt5_account_id is null and mt5_position_id is present
```

The indexes were verified in PostgreSQL after confirming no existing duplicate identities.

## Current Validation Evidence

### Completed During Sprint 34

- Backend `compileall` passed for changed packages.
- Frontend production builds passed for changed packages.
- Manual-to-MT5 reconciliation was functionally verified.
- Duplicate manual ticket rejection was functionally verified.
- Manual closed trade visibility in Portfolio was functionally verified.
- MT5 repository tests: `Ran 7 tests — OK`.
- Market Alerts provider/mapping diagnostic completed.

### Required Before Version 1 Merge

1. Run the complete backend regression checklist, not only Sprint 34 tests.
2. Run a final frontend production build from the final working tree.
3. Reconfirm authentication, recovery, admin and inactive-user behavior.
4. Reconfirm cross-user isolation for trades, dashboard, portfolio and MT5.
5. Reconfirm MT5 Sync on the final working tree.
6. Review database schema/index state and ownership migration assumptions.
7. Review `git status` and the full diff.
8. Remove unintended temporary files.
9. Commit only after documentation and validation are confirmed by the user.

## Known Limitations / Deferred Work

- The current free Economic Calendar provider does not supply Actual values in its weekly JSON payload.
- A licensed or commercially suitable provider must be evaluated before commercial release.
- Billing, subscriptions, licensing and advanced RBAC remain outside Version 1.
- Cloud-hosted MT5 execution and broker credential-vault redesign remain future work.

## Workspace Ownership

```text
Home       → Welcome / Command Center
Dashboard  → User-scoped Executive Overview
Trades     → User-scoped Trading Journal for real MT5 orders/positions
MT5        → User-scoped Trading Connections
Portfolio  → User-scoped realized Portfolio Analysis
Analytics  → Historical Analysis
Psychology → Trader Journal
Reports    → Reports & Export
Settings   → User Profile, Preferences and Security
Admin      → Administrative User Management
```
