# D-058 — Backend Is The Single Business Logic Authority

## Status
Accepted

## Category
Architecture

## Date
2026-07-15

## Decision
Business logic must live in the backend. The frontend is responsible only for presentation and user interaction.

## Rules
- Calculations belong in backend engines/services.
- Frontend must not calculate statistics, pips/points, allocations or aggregations.
- APIs expose already computed business data.

## Motivation
Keeps one source of truth and avoids duplicated logic.

## Consequences
- Consistent results across Dashboard, Portfolio, Analytics and Reports.
- Easier testing and maintenance.
