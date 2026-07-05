# D-041 — Sprint Execution Process

Status: ACCEPTED

---

## Context

During Sprint 20, several small corrections were needed because implementation started before the full source tree and documentation structure were fully reviewed.

To reduce rework, TradePilot Pro needs a more explicit sprint workflow.

---

## Decision

From Sprint 21 onward, major sprint work follows:

```text
Sprint Planning
        ↓
Architecture Review
        ↓
Implementation
        ↓
Verification
        ↓
Documentation Update
        ↓
Git Release
```

Before coding a major feature, prepare a Sprint Design Pack covering:

1. Goal
2. Files that will change
3. New folders
4. New components
5. API changes
6. Database changes
7. Documentation impact
8. Verification steps

---

## Consequences

This reduces:

- repeated edits to the same files,
- accidental architecture drift,
- documentation mismatch,
- risky refactoring during feature work.

---

## Future Notes

Small bug fixes may remain lightweight.

Large features should always start with a design pass.

---
