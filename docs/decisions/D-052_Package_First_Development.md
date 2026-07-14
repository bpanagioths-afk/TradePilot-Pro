# D-052 — Package First Development

Status: Accepted

Decision:

Before implementation begins, the complete package must be designed and reviewed.

Required order:

```text
Package Design
↓
Dependency Analysis
↓
Impact Analysis
↓
Reuse Audit
↓
Implementation
↓
Build / Test
```

Reason:

Writing files incrementally without a complete package plan creates duplicate work and architecture drift.
