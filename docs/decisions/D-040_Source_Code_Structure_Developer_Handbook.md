# D-040 — Source Code Structure as Developer Handbook

Status: ACCEPTED

---

## Context

As TradePilot Pro grew through Sprints 18-20, the project required a reliable way to understand the real source tree before starting development.

The modular documentation pack explains product vision and standards, but developers also need a fast technical map of the current codebase.

---

## Decision

`docs/SOURCE_CODE_STRUCTURE.md` is accepted as a living developer handbook.

It documents:

- real folder structure
- folder responsibilities
- allowed / forbidden rules
- architecture layers
- data flow
- widget infrastructure
- future cleanup notes

It should be read at the start of new development sessions together with the main documentation indexes.

---

## Consequences

Whenever source folders, modules, or architecture layers change, update:

```text
docs/SOURCE_CODE_STRUCTURE.md
```

This file should not become a stale tree dump.

It must remain an accurate developer onboarding guide.

---

## Future Notes

If the documentation grows too large, split it later into:

```text
docs/SOURCE_CODE_STRUCTURE.md
docs/SOURCE_CODE_REFERENCE.md
```

Do not split until the single file becomes difficult to maintain.

---
