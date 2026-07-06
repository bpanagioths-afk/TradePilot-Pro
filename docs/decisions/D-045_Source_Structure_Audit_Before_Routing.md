# D-045 — Source Structure Audit Before Routing Changes

## Status

Accepted

## Date

2026-07-06

## Context

During Sprint 22, a `frontend/src/pages/index.js` file was assumed while preparing Portfolio page integration.

The actual project structure uses direct imports in the routing layer instead of a pages barrel export.

This showed that routing and navigation work must be based on the real source tree, not assumptions.

## Decision

Before adding or changing pages, routes, sidebars or navigation items, development must inspect the real routing and layout files.

Typical files include:

```text
frontend/src/App.jsx
frontend/src/main.jsx
frontend/src/layouts/MainLayout.jsx
frontend/src/components/Sidebar.jsx
```

## Reason

Routing mistakes can create duplicate patterns, broken imports or inconsistent navigation.

A short source-structure audit prevents architecture drift.

## Consequences

Portfolio page and Sidebar integration were intentionally postponed until the Portfolio page is production-ready and routing is updated using the actual application pattern.

## Related Documents

- `docs/SOURCE_CODE_STRUCTURE.md`
- `docs/project/09_Current_State/Current_Project_Status.md`
- `docs/project/09_Current_State/NEXT_CHAT_PROMPT_SPRINT23.md`
