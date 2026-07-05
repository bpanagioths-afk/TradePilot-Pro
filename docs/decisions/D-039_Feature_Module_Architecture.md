# D-039 — Feature Module Architecture Direction

Status: ACCEPTED

---

## Context

TradePilot Pro is evolving from a trading journal into a professional trading platform.

Future product areas such as Portfolio, Risk, AI Coach, Psychology, Economic Calendar and Prop Firm support will become larger than simple React components.

---

## Decision

Future major product areas should be treated as Feature Modules.

Conceptual structure:

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

The existing codebase does not need immediate migration.

This decision defines the direction for new large features starting from Sprint 21.

---

## Consequences

New major features should start with a Sprint Design Pack.

A feature module may include:

- backend endpoints
- frontend API/service functions
- dashboard widget
- page component
- dialogs
- shared hooks
- constants
- documentation

Small one-off components do not require a full feature module.

---

## Future Notes

Sprint 21 Portfolio work should use this decision as guidance.

Do not perform a large folder migration only for cosmetic reasons.

---
