# 11 — Active Sprint

# Sprint 30 — Shared Chart Infrastructure and Frontend Performance

## Starting Point

Sprint 29 completed:

- Canonical multi-asset movement calculations.
- Forex pips and non-Forex points separation.
- Shared movement and analytics engines.
- Multi-asset Dashboard, Analytics, Trades, Reports and Psychology UI.
- Portfolio Allocation by asset class.
- Backend compile, dead-code audit and frontend production build.

## Primary Goal

```text
Shared Chart Infrastructure
+
Frontend Performance Cleanup
```

## Priority Order

1. Audit the real frontend tree and all Recharts usage.
2. Design one shared chart contract before creating components.
3. Reuse WidgetContainer, WidgetHeader, loading, error and empty states.
4. Introduce shared tooltip and movement-unit formatting.
5. Migrate charts package-by-package without page-specific design systems.
6. Evaluate route-level code splitting for the current Vite bundle warning.
7. Compile, build, test, document, commit and push.

## Protected Contracts

Do not change without a verified bug:

- MT5 movement calculation semantics.
- `movement_value`, `movement_unit` and `asset_class` fields.
- Dashboard `movement_breakdown` contract.
- Portfolio Average Pips Forex-only behavior.
- Portfolio Allocation by asset class.

## Mandatory Rules

- D-001 through D-055 are binding.
- Read the real tree before every path instruction.
- Audit before new code.
- Reuse before creation.
- Portfolio is the reference UI.
- Give exact instructions using complete replace blocks or precise above/below markers.
- `οκ ετοιμο` confirms the previous step succeeded.
- Documentation and clean Git status are required before sprint closure.

## Success Criteria

- Shared charts use one common wrapper and tooltip behavior.
- Movement units are displayed consistently.
- No page-specific chart design system is introduced.
- Existing Dashboard, Portfolio and Analytics behavior remains stable.
- Frontend build succeeds.
- Bundle-size warning is reduced or documented with an approved plan.
- Documentation is updated and Git status is clean.
