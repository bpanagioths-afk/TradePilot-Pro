# D-036 - MetricCard as Reusable KPI Component

## Status

Accepted

## Context

Sprint 19 required Balance, Equity, Floating P/L and Open Positions to be displayed as professional KPIs.

A local `MetricBox` inside the MT5 widget would solve the immediate UI problem, but would create duplicated code later.

## Decision

Create `MetricCard` as a reusable TradePilot UI Framework component.

Accepted location:

```text
frontend/src/components/common/MetricCard.jsx
```

MetricCard is used for KPI presentation.

Examples:

* Balance
* Equity
* Floating P/L
* Open Positions
* Win Rate
* Profit Factor
* Risk
* Portfolio metrics

## Consequences

Application modules should not create duplicate KPI card implementations.

When KPI data is displayed, `MetricCard` should be preferred.

## Future Notes

MetricCard may later support:

* trend indicators
* icons
* compact mode
* loading state
* comparison value
* tooltip helper

\---

