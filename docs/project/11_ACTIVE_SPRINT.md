# 11 — Active Sprint

# Sprint 31 — Version 1.0 Foundation Audit and Planning

Status: Ready to start in a new conversation

## Starting Point

Version 0.9 and Sprint 30 are completed.

Completed foundation includes:

- Multi-asset MT5 movement model.
- Shared movement and analytics contracts.
- Shared Widget System.
- Shared Chart Infrastructure.
- Route-level frontend lazy loading.
- Explicit MT5 terminal connection policy.
- Successful backend compile and frontend production build.

## Primary Goal

```text
Version 1.0 Foundation Audit
+
Multi-User / Commercial Architecture Plan
```

## Important Scope Rule

Sprint 31 begins with audit and architecture planning only.

Do not immediately implement:

- login,
- subscriptions,
- credential vaults,
- cloud MT5 connectors,
- billing,
- tenant isolation,
- broker APIs.

These require a verified package plan first.

## Priority Order

1. Read all documentation and decisions D-001 through D-059.
2. Read the real backend and frontend trees.
3. Audit the current `User`, `MT5Account`, Trade and database relationships.
4. Audit current authentication, dependency and security foundations.
5. Audit all APIs for future user/account ownership boundaries.
6. Define the Version 1.0 package roadmap.
7. Separate local-development connection behavior from future commercial connector behavior.
8. Approve architecture before implementation.

## Protected Version 0.9 Contracts

Do not change without a verified bug:

- MT5 position aggregation and idempotent synchronization.
- Multi-asset movement semantics.
- `movement_value`, `movement_unit` and `asset_class`.
- `movement_breakdown` API contract.
- Portfolio Average Pips Forex-only behavior.
- Portfolio Allocation by asset class.
- Shared Widget System.
- Shared Chart Infrastructure.
- Explicit MT5 terminal connection policy.

## Mandatory Rules

- D-001 through D-059 are binding.
- Read the real tree before every path instruction.
- Audit before new code.
- Reuse before creation.
- Complete package design before editing.
- One complete change per file per package.
- Provide full files when requested.
- `οκ ετοιμο` means the previous action succeeded; continue immediately.
- Documentation, build validation and clean Git status are required before sprint closure.

## Success Criteria

- Current identity and account ownership architecture is fully documented.
- Version 1.0 package boundaries are approved.
- Local MT5 behavior and future commercial connector behavior are clearly separated.
- No Version 0.9 regression is introduced.
