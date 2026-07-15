# Sprint 29 — Multi-Asset Movement and Analytics

Status: Completed

## Objective

Implement correct movement semantics for multiple MT5 asset classes without mixing incompatible units.

## Backend

- Added canonical MT5 movement engine: `backend/app/services/mt5/movement.py`.
- Added Trade fields:
  - `movement_value`
  - `movement_unit`
  - `asset_class`
  - `symbol_digits`
  - `symbol_point`
  - `tick_size`
- Forex and JPY pairs are calculated in pips.
- Indices, metals, stocks, crypto and CFDs are calculated in broker points.
- Preserved `profit_pips` as a compatibility field while storing the semantic unit separately.
- Consolidated legacy `mt5_sync.py` into a compatibility wrapper for the modular sync service.
- Added Portfolio movement and analytics engines.
- Refactored Dashboard analytics endpoints around one movement breakdown contract.
- Separated Forex pips from non-Forex points in summary metrics.
- Corrected Portfolio average pips so only Forex trades participate.
- Restored Portfolio allocation and changed it from symbol-level allocation to asset-class allocation.

## Frontend

- Dashboard shows Forex Pips and Non-Forex Points separately.
- Analytics charts consume movement breakdown data and display the correct unit.
- Trades and Trade Details display `movement_value` with `movement_unit`.
- Reports and Psychology no longer label non-Forex movement as pips.
- Portfolio Allocation now shows exposure by asset class instead of by individual symbol.

## Validation

- Real MT5 synchronization completed successfully.
- Backend `python -m compileall app`: passed.
- Vulture audit at 100% confidence: no findings.
- Frontend production build: passed.
- Vite reported a non-blocking bundle-size warning for future performance work.

## Product Result

TradePilot Pro now supports semantically correct movement metrics for Forex, JPY pairs, indices, metals, stocks, crypto and CFDs. Pips and points are no longer combined into misleading totals.
