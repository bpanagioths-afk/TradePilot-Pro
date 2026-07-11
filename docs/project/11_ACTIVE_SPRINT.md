# 11 - Active Sprint

# Sprint 27

Starting point:

```text
Sprint 25 completed:
- Live MT5 Open Positions

Sprint 26 completed:
- MT5 Trading Center
- Pending Orders
- Account Health
- Today's Performance
- Connection Health
- Dashboard cleanup
- Portfolio summary redesign
- Home Command Center
```

---

## Sprint 27 Goal

Primary focus:

```text
Analytics Center
```

The objective is to begin building the first complete historical analysis workspace while reusing the existing Portfolio calculations, Dashboard infrastructure and MT5 data already available.

---

## Recommended Sprint 27 Work

Priority order:

- Analytics Center foundation.
- Equity Curve analysis.
- Drawdown analysis.
- Monthly performance.
- Trading pair statistics.
- Session statistics.
- Performance charts.
- Continue using existing reusable components whenever possible.

---

## Required Sprint 27 Rules

1. Audit before coding.
2. Read the documentation before assuming project structure.
3. Reuse existing services, API functions and components.
4. Do not duplicate business logic.
5. Do not change protected infrastructure without a valid reason.
6. Keep Dashboard as Executive Overview.
7. Keep MT5 as the only live trading workspace.
8. Keep Portfolio as the only portfolio analysis workspace.
9. One feature at a time.
10. Commit after every completed feature.
11. Push after every stable commit.
12. Keep `git status` clean before moving to another feature.
13. Update documentation after every completed sprint.

---

## Development Workflow

```text
Audit
↓
Reuse Existing Code
↓
Implementation
↓
Build
↓
Test
↓
Commit
↓
Push
↓
Documentation
```

---

## Continue Development From

```text
Continue development from Sprint 27 using:

docs/project/09_Current_State/NEXT_CHAT_PROMPT_SPRINT27.md
```

---

## Current Product Status

```text
Home
↓
Welcome / Command Center

Dashboard
↓
Executive Overview

MT5
↓
Live Trading Center

Portfolio
↓
Portfolio Analysis

Analytics
↓
Current Active Sprint

Psychology
↓
Future Workspace

Reports
↓
Future Workspace
```

---

## Sprint Success Criteria

Sprint 27 is considered complete when:

- Analytics Center foundation is operational.
- Historical analysis widgets are working.
- Existing Portfolio calculations are reused where appropriate.
- No duplicated UI or business logic is introduced.
- Build succeeds.
- Git status is clean.
- Documentation is fully updated.