# D-063 — Exact Delivery and Locked Scope

## Status

Active

## Decision

Before implementation, the active package must define:

- files or modules that may change,
- files or modules that are locked,
- the package Definition of Done,
- items explicitly out of scope.

User-applied code changes must be delivered as complete files with exact repository paths and all required imports.

Completed modules must not be modified unless a verified defect requires it.

## Supersedes as separate delivery rules

- D-013 Exact Code Instructions
- D-057 Exact Edit Instructions

## Related principles

- protected global infrastructure from D-046,
- backend business-logic authority from D-058,
- reference-module constraints from D-059.
