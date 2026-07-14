# 11 — Active Sprint

# Sprint 29 — Multi-Asset Metrics and Shared Chart Infrastructure

## Starting Point

Sprint 27 completed the Analytics Center.

Sprint 28 completed:

- MT5 Synchronization Engine v2.
- Position-level aggregation.
- Idempotent Trade upsert.
- Open/closed lifecycle reconciliation.
- Dashboard and Analytics migration to the shared Widget System.
- Portfolio confirmation as the reference UI.

## Primary Goal

```text
Reliable Multi-Asset Movement Metrics
+
Shared Chart Infrastructure
```

## Priority Order

1. Audit current `profit_pips` values and affected symbols.
2. Define a canonical movement model for Forex and non-Forex assets.
3. Implement broker-metadata-based calculations.
4. Update Dashboard and Analytics contracts only after backend metrics are verified.
5. Create/reuse a shared chart wrapper consistent with the Widget System.
6. Improve System and Psychology empty states.
7. Build, test, document, commit and push.

## Mandatory Rules

- D-049 through D-055 are binding.
- Audit the real source tree before requesting files or proposing paths.
- Reuse existing APIs, services, feature modules and widgets.
- Do not create a second Design System.
- Portfolio is the reference UI.
- One planned change per file per package.
- A second touch requires Architecture Review.
- `οκ ετοιμο` means the previous action and test succeeded; continue without requesting the same confirmation.
- Documentation and clean Git status are required before sprint closure.

## Success Criteria

- Forex pip calculations verified.
- Indices, metals, stocks, crypto and CFDs no longer report misleading Forex pips.
- Dashboard and Analytics show semantically correct units.
- Shared charts follow the common Widget System.
- Build and backend compile succeed.
- Sync remains idempotent.
- Documentation is updated and Git status is clean.
