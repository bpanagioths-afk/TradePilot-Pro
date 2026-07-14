# NEXT CHAT PROMPT — SPRINT 29

Read before coding:

1. `SOURCE_CODE_STRUCTURE.md`
2. `PROJECT_MASTER.md`
3. `DEVELOPMENT_STANDARDS.md`
4. `COMPONENT_LIBRARY.md`
5. `DESIGN_SYSTEM.md`
6. `docs/architecture/TRADE_LIFECYCLE.md`
7. `docs/project/09_Current_State/Current_Project_Status.md`
8. `docs/project/11_ACTIVE_SPRINT.md`
9. `DECISIONS.md`
10. This file

## Completed

### Sprint 27

- Analytics Center foundation.
- Summary, Performance, Risk, Equity and Drawdown analysis.
- Pair, Hourly, System and Psychology charts.
- Analytics service and hook.
- Shared Widget System adoption.

### Sprint 28

- Modular MT5 Synchronization Engine v2.
- Builder, Aggregator, Validator, Repository and Sync Service.
- One MT5 position maps to one Trade record.
- `mt5_position_id` added and used for idempotent upsert.
- Open positions update the same Trade until closing deals finalize it.
- Recently closed positions are reconciled through position-specific history lookup.
- Dashboard and Analytics migrated to the shared Widget System.
- Portfolio confirmed as the reference UI.

## Binding Decisions

- D-049 — Single Source of Information
- D-050 — Audit Before New Code
- D-051 — Single Touch Rule
- D-052 — Package First Development
- D-053 — Shared Widget System
- D-054 — Portfolio Reference UI
- D-055 — Multi-Asset MT5 Engine

## Sprint 29 Focus

Primary objective:

```text
Multi-Asset Movement / Pips Engine
```

Must support:

- Forex
- JPY pairs
- Indices
- Metals
- Stocks
- Crypto
- CFDs

Do not assume every instrument uses Forex pips. Use broker symbol metadata and define the correct unit semantics before changing Dashboard or Analytics.

Secondary objective:

```text
Shared Widget Chart Infrastructure
```

Do not create page-specific chart design systems. Reuse:

- WidgetContainer
- WidgetHeader
- WidgetLoading
- WidgetErrorState
- WidgetEmptyState
- Theme tokens

## Required Workflow

```text
Audit
↓
Complete Package Design
↓
Dependency and Impact Analysis
↓
Reuse Existing Code
↓
Implementation
↓
Compile / Build
↓
Real MT5 Test
↓
Commit / Push
↓
Documentation
↓
Clean Git Status
```

## User Workflow Rule

When the user says `οκ ετοιμο`, the previous step and its test succeeded. Continue directly without asking for the same output or confirmation again.

## Instruction Style

Use exact Greek instructions:

```text
Άνοιξε:
<path>

Κάνε ολόκληρο replace με:
<complete content>

Μην αλλάξεις τίποτα άλλο.
```

Never use placeholders or require the user to infer missing code.
