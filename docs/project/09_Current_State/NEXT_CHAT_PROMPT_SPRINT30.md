# NEXT CHAT PROMPT — SPRINT 30

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

## Completed in Sprint 29

- Canonical multi-asset movement engine.
- Forex and JPY pair movement in pips.
- Indices, metals, stocks, crypto and CFDs in broker points.
- Trade movement metadata fields.
- Dashboard separation of pips and points.
- Movement and analytics engines.
- Multi-asset Analytics, Trades, Trade Details, Reports and Psychology.
- Portfolio Average Pips corrected to Forex only.
- Portfolio Allocation redesigned by asset class.
- Backend compile and Vulture audit passed.
- Frontend production build passed.

## Sprint 30 Focus

Primary objective:

```text
Shared Widget Chart Infrastructure
```

Secondary objective:

```text
Frontend Bundle and Route Performance
```

## Required Workflow

```text
Read Real Tree
↓
Audit Existing Charts
↓
Complete Package Design
↓
Dependency and Impact Analysis
↓
Reuse Existing Widget System
↓
Implementation
↓
Build and Regression Test
↓
Documentation
↓
Commit / Push
↓
Clean Git Status
```

## Protected Sprint 29 Contracts

- Do not reintroduce mixed pips/points totals.
- Do not replace the validated MT5 movement engine without a verified bug.
- Keep Portfolio Allocation grouped by asset class.
- Keep Average Pips Forex-only.
- Preserve the `movement_breakdown` API contract.

## User Workflow Rule

When the user says `οκ ετοιμο`, the previous step and its test succeeded. Continue directly.

## Instruction Style

Use exact Greek instructions:

```text
Άνοιξε:
<path>

Βρες ακριβώς:
<existing block>

Αμέσως κάτω/πάνω από αυτό βάλε:
<complete code>
```

or:

```text
Άνοιξε:
<path>

Κάνε ολόκληρο replace με:
<complete content>

Μην αλλάξεις τίποτα άλλο.
```

Never guess file paths. Read the tree first.
