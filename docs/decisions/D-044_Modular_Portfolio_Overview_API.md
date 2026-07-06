# D-044 — Modular Portfolio Overview API

## Status

Accepted

## Date

2026-07-06

## Context

Sprint 21 introduced the first Portfolio Summary API.

During Sprint 22, the Portfolio module needed more than a simple summary:

- statistics
- allocation
- performance
- future charts
- future Portfolio page support

A flat response schema would become too large and hard to maintain.

## Decision

The Portfolio API exposes a modular overview endpoint:

```text
GET /portfolio/overview
```

The response is grouped into:

```text
summary
statistics
allocation
performance
```

The existing endpoint remains available:

```text
GET /portfolio/summary
```

for backward compatibility.

## Reason

A modular response makes Portfolio analytics easier to extend without breaking existing dashboard widgets.

It also allows future Portfolio pages and charts to reuse the same API response.

## Consequences

New Portfolio analytics should extend the modular overview structure instead of adding unrelated fields to one flat summary object.

Routers remain thin and all calculation logic stays inside the Portfolio service layer.

## Related Documents

- `backend/app/routers/portfolio.py`
- `backend/app/services/portfolio_service.py`
- `backend/app/schemas/portfolio.py`
- `frontend/src/services/portfolioService.js`
