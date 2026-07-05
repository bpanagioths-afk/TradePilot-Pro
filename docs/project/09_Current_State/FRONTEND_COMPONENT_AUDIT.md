# Frontend Component Audit - Sprint 20.6

Status: Active Technical Audit

---

## Purpose

This document tracks the current frontend component structure and future cleanup plan.

It is not the component library. The component library defines reusable components and their purpose.

This audit records:

- which components are in transitional locations,
- which components may move later,
- why they should not be moved yet,
- and what cleanup rules apply after Sprint 20.

---

## Current Root Components

Current files in `frontend/src/components/`:

- `EquityChart.jsx`
- `KPICard.jsx`
- `NumericField.jsx`
- `Sidebar.jsx`
- `Topbar.jsx`
- `TradeDetailsDialog.jsx`
- `TradeDialog.jsx`
- `TradeScoreCard.jsx`

---

## Current Decision

Do not move root components during Sprint 20.6 unless there is a clear safety reason.

Reason:

- Moving components requires import updates.
- Sprint 20.6 focuses on cleanup and architecture lock, not risky refactoring.
- Existing pages are working.
- Feature folders will be introduced gradually from Sprint 21 onward.

---

## Keep Temporarily In Root

- `Sidebar.jsx`
- `Topbar.jsx`
- `NumericField.jsx`

Reason:

- Used across application layout or forms.
- Can be reorganized later when shared layout/forms folders are introduced.

---

## Future Move Candidates

### Dashboard / Analytics

- `EquityChart.jsx`
- `KPICard.jsx`

Possible future locations:

```text
frontend/src/components/dashboard/
frontend/src/components/analytics/
frontend/src/components/common/
frontend/src/components/widgets/
```

Final location should be decided after Portfolio / Analytics modules mature.

### Trades Module

- `TradeDialog.jsx`
- `TradeDetailsDialog.jsx`
- `TradeScoreCard.jsx`

Possible future location:

```text
frontend/src/components/trades/
```

or future feature-module structure:

```text
frontend/src/features/trades/components/
```

### Shared Form Components

- `NumericField.jsx`

Possible future location:

```text
frontend/src/components/common/
frontend/src/components/forms/
```

---

## Sprint 20.6 Rule

No component should be moved only for cosmetic reasons.

Move a component only when:

1. Its final owning feature is clear.
2. All imports can be updated safely.
3. The app runs without errors after the move.
4. Documentation is updated.

---

## Current Component Architecture

```text
frontend/src/components/
├── common/       # TradePilot UI Framework components
├── widgets/      # Widget Infrastructure
├── dashboard/    # Dashboard feature widgets and layout
├── home/         # Home page components
├── settings/     # Settings feature components
├── frontend/     # currently empty placeholder
└── root files    # legacy/shared components not yet moved
```

---

## Future Target

Long-term frontend component structure:

```text
frontend/src/components/
├── common/
├── widgets/
├── layout/
├── forms/
└── feature-specific modules
```

Possible future feature structure:

```text
frontend/src/features/
├── dashboard/
├── trades/
├── mt5/
├── portfolio/
├── risk/
├── psychology/
├── ai/
└── calendar/
```

---

## Notes

Sprint 20 introduced the first clear Widget Infrastructure layer:

```text
frontend/src/components/widgets/
├── WidgetContainer.jsx
├── WidgetHeader.jsx
├── WidgetFooter.jsx
├── WidgetMetric.jsx
└── index.js
```

This layer should remain stable and reusable.
