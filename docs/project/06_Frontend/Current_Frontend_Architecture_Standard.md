## Current Frontend Architecture Standard

New frontend modules should prefer small reusable components.

Target guideline:

```text
React component size: ideally below 200-250 lines
```

When a component grows too much, extract:

* Card components
* Dialog components
* Toolbar components
* Helper functions
* API layer

---

## Sprint 19 Active Standard

The MT5 Widget confirmed the current frontend architecture pattern:

```text
API file
↓
Manager component
↓
Card / Widget component
↓
Reusable TradePilot components
```

For MT5 accounts:

```text
mt5AccountsApi.js
↓
MT5AccountsManager.jsx
↓
MT5AccountCard.jsx
↓
TradePilotCard / MetricCard / StatusBadge / InfoRow / TradePilotButton
```

Rules:

* API calls stay in the API layer.
* Data loading and user actions stay in the manager component.
* Widget layout stays in the card component.
* Reusable visual patterns must be extracted into `components/common`.
* Local one-off metric boxes should become `MetricCard` when reusable.

---

## Widget Data Rule

A widget should receive prepared data through props when possible.

Example:

```text
MT5AccountsManager loads summary
↓
MT5AccountCard receives summary
```

This avoids hidden fetching inside display components and keeps UI behavior easier to test.

---
