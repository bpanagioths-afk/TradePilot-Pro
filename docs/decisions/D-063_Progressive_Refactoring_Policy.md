# D-063 — Progressive Refactoring Policy

## Status

Accepted — 2026-08-02

## Context

TradePilot Pro has reached a size where several frontend pages and backend services can accumulate unrelated responsibilities. Large files reduce audit quality, increase copy/paste risk, make regressions harder to isolate and slow future feature work.

A strict line limit alone is not sufficient, but files approaching or materially exceeding approximately 500 lines require review when they also contain multiple responsibilities.

## Decision

Progressive refactoring is mandatory when an existing file:

- contains more than one primary responsibility,
- becomes difficult to audit safely,
- grows materially beyond the preferred reviewable size,
- repeatedly receives unrelated feature additions,
- or causes changes to become risky or difficult to test.

Refactoring must:

1. Preserve existing behavior unless a separately documented bug fix is included.
2. Reuse existing APIs, services, repositories, models and components.
3. Avoid duplicate logic and parallel architectures.
4. Proceed in small packages.
5. Run compile/build/tests after each package.
6. Keep orchestration at the page/service boundary and move focused responsibilities into feature-owned modules.
7. Record new files and ownership in affected documentation.

## Preferred Size Guidance

Approximately 500 lines is a review threshold, not an automatic failure.

A file may exceed 500 lines when its responsibility remains cohesive and extraction would reduce clarity. A smaller file may still require refactoring when it contains unrelated responsibilities.

Responsibility and auditability take priority over raw line count.

## Frontend Application

Large pages should primarily coordinate:

- state,
- API calls,
- composition,
- navigation,
- top-level error/loading behavior.

Focused visual and interaction responsibilities should be extracted into feature-owned components.

## Backend Application

General services must not become containers for unrelated domain operations.

Feature-specific export, preview, identity, import, validation and persistence logic should be separated into cohesive modules while retaining the existing public API contract where possible.

## Enforcement

Before adding a new feature to a large or multi-responsibility file:

```text
Audit responsibilities
Evaluate extraction
Refactor if required
Compile/build/test
Then add the feature
```

Any exception must be explicitly justified in the active Sprint documentation.

## Initial Application

Sprint 36 applied this decision to:

- `frontend/src/pages/TradingPlan.jsx`
- `backend/app/features/settings/service.py`
- Backup/Import section-specific responsibilities
