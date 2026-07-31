# Sprint 34 — Regression Recovery

## Status

Completed on 2026-07-31.

## Scope

Sprint 34 was limited to the verified regressions BUG-001, BUG-002 and BUG-003. Work followed the audit-first workflow required by D-062: audit, documented cause, small package, compile/build/test, then the next package.

## BUG-001 — Duplicate Trade After MT5 Sync

### Confirmed Cause

The MT5 upsert path recognized only trades that already contained the canonical MT5 identity. A manually created journal record had no MT5 position identity, so a later MT5 Sync created a second `Trade` record for the same real position.

### Resolution

- Added manual-to-MT5 reconciliation through the existing `Trade.mt5_position_id` field.
- Added an `MT5 Εισιτήριο` field to manual trade creation and editing.
- Reused the MT5 position identifier shown by the terminal; no duplicate model field or parallel service was created.
- Preserved journal metadata when the manual record is connected to the MT5 position.
- Added backend duplicate-ticket validation and HTTP `409` handling.
- Added visible frontend error feedback while keeping the dialog open and preserving entered values.
- Added shared Trading System and Psychology option sources for the trade form and trade details.
- Added PostgreSQL partial unique indexes:
  - `uq_trades_user_account_position`
  - `uq_trades_user_manual_position`
- Added automated repository regression coverage in `backend/tests/test_mt5_repository.py`.

### Verification

- Backend compile passed.
- Frontend production build passed.
- Manual trade with the correct MT5 ticket was updated during Sync instead of duplicated.
- A second manual record with the same ticket was rejected.
- Seven repository regression tests passed:

```text
Ran 7 tests
OK
```

## BUG-002 — Manual Trades Missing From Portfolio

### Confirmed Cause

The Portfolio repository correctly includes authenticated-user trades that are closed. The regression was not an MT5-only or ownership filter. The manual trade form did not expose `open_time` and `close_time`, so a user could not mark a manually journaled real trade as closed. Such records correctly remained outside realized Portfolio performance metrics.

### Resolution

- Added `Open Time` and `Close Time` to the existing `TradeDialog`.
- Added validation preventing Close Time from preceding Open Time.
- Kept the existing Portfolio engine, repository and aggregation architecture unchanged.
- Preserved the rule that realized Portfolio metrics use closed trades only.

### Verification

A manual trade with a valid Close Time appeared in Portfolio performance immediately after save/refresh.

## BUG-003 — Market Alerts Actual Values

### Audit Result

No application mapping or frontend rendering defect was found.

A diagnostic run against the configured free Forex Factory weekly JSON feed returned:

```text
Raw events received: 92
Events with Actual: 0
Events without Actual: 92
```

The feed payload did not contain an `actual` key. A controlled backend event containing Actual, Forecast and Previous values passed normalization unchanged, proving that the current backend mapping and frontend display support Actual values when the provider supplies them.

### Product Decision

- Keep the current free provider for Version 1.
- Accept that Actual values are unavailable from the current upstream payload.
- Do not scrape the provider website.
- Evaluate a licensed or commercially suitable Economic Calendar API before commercial release, including providers that offer delayed Actual values.

BUG-003 is therefore closed as a confirmed provider limitation, not as an unresolved application regression.

## Files and Areas Affected

### Backend

- `backend/app/models/trade.py`
- `backend/app/schemas/trade.py`
- `backend/app/routers/trades.py`
- `backend/app/services/mt5/repository.py`
- `backend/app/services/mt5/sync_service.py`
- `backend/tests/test_mt5_repository.py`
- PostgreSQL indexes on `trades`

### Frontend

- `frontend/src/components/TradeDialog.jsx`
- `frontend/src/components/TradeDetailsDialog.jsx`
- `frontend/src/pages/Trades.jsx`
- `frontend/src/features/trades/tradeOptions.js`
- `frontend/src/features/psychology/psychologyUtils.js`

### Diagnostic

- `backend/scripts/diagnose_market_alerts.py`

## Sprint Result

- BUG-001: closed and regression-tested.
- BUG-002: closed and functionally verified.
- BUG-003: provider limitation confirmed and deferred to commercial-provider evaluation.
- No Portfolio architecture change was required.
- No duplicate MT5 service, repository, API or component was introduced.
