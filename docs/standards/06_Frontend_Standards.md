# Frontend Standards

## UI Quality

No ugly UI.

New modules must use:

- clean layout
- Material UI components
- reusable components
- consistent spacing
- professional cards / tables
- Snackbar notifications
- stable state and predictable sorting

## Component Size

React components should ideally stay under approximately 200-250 lines.

If a component grows too much, split it into:

- Manager component
- Card component
- Dialog component
- Toolbar component
- Helper file
- API file
- Hook
- Widget

Reason:

Large components become difficult to debug, reuse and extend.

## Reusable Components

Prefer reusable components when a UI pattern will grow.

Examples:

- Account cards
- Dialogs
- Toolbars
- Status badges
- Action menus
- Widget headers
- Widget metrics
- Widget footers

## Numeric Inputs

All numeric inputs must use:

```text
NumericField.jsx
```

Reason:

- supports comma and dot
- consistent validation
- easier Greek keyboard usage

## Notifications

Do not use:

```javascript
alert()
```

Use Snackbar.

## Stable Lists

Lists with actions should have stable sorting.

Use internal IDs when possible.

Reason:

Changing list order after an action can confuse menus, selected items and user expectations.

---

## Sprint 19 Frontend Additions

### API Layer First

Frontend modules should call backend endpoints through a dedicated API file.

Example:

```text
frontend/src/api/mt5AccountsApi.js
```

The component should not hardcode axios calls when an API layer already exists.

### Summary Integration Pattern

Professional widgets should receive prepared summary data.

Accepted pattern:

```text
Manager
↓
API
↓
summary state
↓
Card / Widget
```

For MT5:

```text
MT5AccountsManager
↓
getMT5AccountSummary(id)
↓
accountSummaries
↓
MT5AccountCard
```

### KPI Presentation

Use reusable metric components for KPI-style data.

Current distinction:

- `KPICard` = existing dashboard KPI component.
- `MetricCard` = generic reusable metric card.
- `WidgetMetric` = widget infrastructure metric component.

Do not create local KPI boxes inside every widget unless the pattern is truly one-off.

### Widget Actions

Primary widget actions should use `TradePilotButton`.

Long-running actions should expose loading state and should avoid repeated clicks while running.

### Relative Time

Where useful, timestamps displayed in widgets should be converted to user-friendly relative labels.

Example:

```text
Just now
5 min ago
2 hours ago
3 days ago
```

---

## Sprint 20 Frontend Additions

### Widget Infrastructure First

Professional widgets should use:

```text
frontend/src/components/widgets/
```

Current infrastructure:

```text
WidgetContainer
WidgetHeader
WidgetFooter
WidgetMetric
```

before writing one-off local widget layout code.

### Dashboard Feature Widgets

Dashboard-specific widgets live in:

```text
frontend/src/components/dashboard/
```

Each dashboard widget folder may include an `index.js` barrel export.

### Feature Module Direction

Future major features should be designed as modules instead of isolated components.

Conceptual target:

```text
feature-module/
├── api/
├── services/
├── hooks/
├── components/
├── widgets/
├── dialogs/
├── constants/
└── index.js
```

### Component Movement Rule

Do not move components only for cosmetic reasons.

Move a component only when:

1. Its final owning feature is clear.
2. All imports can be updated safely.
3. The app runs without errors after the move.
4. Documentation is updated.

---
