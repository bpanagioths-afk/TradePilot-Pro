# D-043 — Widget Infrastructure v3

## Status

Accepted

## Date

2026-07-06

## Context

Sprint 20 introduced the first Widget Infrastructure layer.

Sprint 21 upgraded it with shared loading, error and empty states.

Sprint 22 showed that multiple widgets will repeatedly need the same metric grid layout and KPI rendering pattern.

## Decision

Widget Infrastructure v3 adds reusable metric layout and rendering components:

```text
WidgetMetricGrid
WidgetMetrics
```

These components sit alongside:

```text
WidgetContainer
WidgetHeader
WidgetFooter
WidgetMetric
WidgetLoading
WidgetErrorState
WidgetEmptyState
```

## Reason

Metric grids should not be recreated manually inside every feature widget.

A shared metric renderer keeps the visual system consistent and reduces duplicated UI code.

## Consequences

Feature components should prefer:

```jsx
<WidgetMetrics metrics={metrics} />
```

or:

```jsx
<WidgetMetricGrid>
    <WidgetMetric />
</WidgetMetricGrid>
```

instead of defining the same Material UI grid layout repeatedly.

## Future Notes

A future Widget Infrastructure v4 may introduce configuration-driven metrics, but only after the pattern is proven across multiple modules.

## Related Documents

- `docs/COMPONENT_LIBRARY.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/SOURCE_CODE_STRUCTURE.md`
