# NEXT CHAT PROMPT --- SPRINT 25

Read before coding:

1. `SOURCE_CODE_STRUCTURE.md`
2. `PROJECT_MASTER.md`
3. `DEVELOPMENT_STANDARDS.md`
4. `COMPONENT_LIBRARY.md`
5. `DESIGN_SYSTEM.md`
6. `docs/project/09_Current_State/Current_Project_Status.md`
7. `docs/project/09_Current_State/FRONTEND_COMPONENT_AUDIT.md`
8. This file

---

## Sprint 24 Completed

Sprint 24 completed:

- Portfolio page route and Sidebar entry.
- `PageHeader` and `PageLayout` shared layout foundation.
- Dashboard and Portfolio migrated to `PageLayout`.
- `PortfolioChartsCard` added for Equity Curve and Drawdown.
- Dashboard MT5 Widget connected to existing MT5 live summary API.
- Sidebar v2 grouped navigation.
- Workflow correction: no global widget refactor for page-specific issues.

---

## Important Context Before Sprint 25

A Sprint 24 regression happened after global widget files were changed for a page-specific UI issue.

Do not repeat this.

Protected files:

```text
frontend/src/components/widgets/WidgetContainer.jsx
frontend/src/components/widgets/WidgetMetric.jsx
frontend/src/components/widgets/WidgetMetricGrid.jsx
frontend/src/components/widgets/WidgetMetrics.jsx
frontend/src/components/layout/PageLayout.jsx
frontend/src/components/layout/PageHeader.jsx
frontend/src/components/Sidebar.jsx
```

Only change these if the task is explicitly a system-wide infrastructure task and the user agrees.

---

## Sprint 25 Focus

Sprint 25 should focus on real trading functionality, not broad UI refactoring.

Recommended first feature candidates:

1. MT5 Open Positions widget / page section.
2. Daily P/L and current account risk metrics.
3. Dashboard live trading intelligence using existing MT5 API/service functions.
4. Analytics improvements using existing Portfolio/Dashboard patterns.

---

## Required Workflow

Before creating any new component or endpoint, check:

1. Does it already exist?
2. Is there an existing service/API function?
3. Can an existing component be reused?
4. Is the target file global/protected or feature-specific?
5. What is the smallest safe change?

Development workflow:

```text
Audit
↓
Plan one small feature
↓
Modify only required files
↓
Build
↓
Test
↓
Commit
↓
Push
↓
Clean git status
```

---

## User Workflow Rule

When the user says:

```text
οκ έτοιμο
```

It means:

- the previous change was applied,
- it worked,
- build/test was acceptable,
- continue directly to the next step.

Do not ask for the same confirmation again.

---

## Instruction Style

Use exact Greek step-by-step instructions.

Preferred format:

```text
Άνοιξε:
<file path>

Κάνε ολόκληρο replace με:
<full file content>

Μην αλλάξεις τίποτα άλλο.
```

Avoid placeholders like:

```jsx
{/* existing content here */}
```

Use whole-file replacement, whole-function replacement, or exact block replacement only.
