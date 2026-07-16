# NEXT CHAT PROMPT — SPRINT 31 / VERSION 1.0

TradePilot Pro

Version 1.0 — Sprint 31

Read first, in this exact order:

1. All `docs/`
2. All `backend/app/`
3. All `frontend/src/`
4. The real tree files before proposing paths

Mandatory decisions:

```text
D-001 through D-059
```

## Completed in Version 0.9

- MT5 multi-account local foundation.
- Position-based MT5 Synchronization Engine v2.
- Multi-asset movement model with pips and points separation.
- Shared Portfolio and Analytics engines.
- Shared Widget System.
- Shared Chart Infrastructure.
- Route-level page lazy loading.
- Reports corrected against the real `movement_breakdown` API contract.
- MT5 no longer starts automatically from page loading, polling or Sync Now.
- Backend compile and frontend production build passed.

## Sprint 31 Objective

```text
Audit the current identity, account ownership, security and API boundaries
before designing the Version 1.0 multi-user / commercial architecture.
```

Do not start by adding login screens or authentication code.

First audit:

- `User` model and relationships.
- `MT5Account` ownership fields.
- Trade ownership and account boundaries.
- Database migrations and constraints.
- FastAPI dependencies and security placeholders.
- Frontend routing and future protected-route needs.
- Current local MT5 connection model.
- Future connector, credential and subscription requirements.

## Deferred Commercial Features

These are future Version 1.x packages, not automatic Sprint 31 implementation:

- Username/password authentication.
- Monthly subscription pass key.
- Roles and permissions.
- Tenant isolation.
- Secure credential vault.
- TradePilot MT5 Connector agent.
- Cloud synchronization.
- Broker API / Manager API integration.
- Billing and commercial licensing.

## Protected Contracts

- Do not change Version 0.9 movement calculations without a verified bug.
- Do not combine pips and points.
- Preserve `movement_breakdown`.
- Preserve Portfolio Average Pips Forex-only behavior.
- Preserve Portfolio Allocation by asset class.
- Preserve shared charts and shared widgets.
- Preserve the rule that TradePilot must not open MT5 automatically.

## Required Workflow

```text
Read Real Tree
↓
Audit Existing Implementation
↓
Dependency and Ownership Map
↓
Complete Package Design
↓
User Approval
↓
Implementation
↓
Compile / Build / Regression Test
↓
Documentation
↓
Git Commit / Push
```

## Instruction Style

Use Greek instructions only in this format:

```text
Άνοιξε:
<path>

Βρες ακριβώς:
<existing block>

Κάνε replace με:
<complete code>
```

or provide the complete ready file for copy/paste.

Never guess a path. Never ask again after `οκ ετοιμο`; continue directly.
