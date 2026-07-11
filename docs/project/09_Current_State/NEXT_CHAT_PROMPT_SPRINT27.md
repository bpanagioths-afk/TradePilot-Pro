\# NEXT CHAT PROMPT --- SPRINT 27



Read before coding:



1\. `SOURCE\_CODE\_STRUCTURE.md`

2\. `PROJECT\_MASTER.md`

3\. `DEVELOPMENT\_STANDARDS.md`

4\. `COMPONENT\_LIBRARY.md`

5\. `DESIGN\_SYSTEM.md`

6\. `docs/project/09\_Current\_State/Current\_Project\_Status.md`

7\. `docs/project/11\_ACTIVE\_SPRINT.md`

8\. `DECISIONS.md`

9\. This file



\---



\## Sprint 25-26 Completed



Sprint 25 completed:



\- Live MT5 Open Positions.

\- Backend MT5 Open Positions API.

\- Open Positions Widget.

\- Automatic live refresh.



Sprint 26 completed:



\- MT5 Trading Center.

\- Pending Orders.

\- Account Health.

\- Today's Performance.

\- Connection Health.

\- Dashboard cleanup.

\- Portfolio Dashboard summary redesign.

\- Home converted to Welcome / Command Center.

\- Single Source of Information product direction established.



\---



\## Important Context Before Sprint 27



TradePilot Pro now has clearly separated workspace responsibilities.



Current ownership:



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

Historical Analysis



Psychology

↓

Trader Journal



Reports

↓

Reports \& Export

```



Do not duplicate detailed information between workspaces.



Dashboard shows summaries.



Detailed functionality belongs only to its primary workspace.



\---



\## Important Architecture Rules



Before writing new code always verify:



1\. Does it already exist?

2\. Can it be reused?

3\. Can it be extended?

4\. Is there already a working service?

5\. Is there already a working API?

6\. Is there already a working component?

7\. Is there already a Feature Module for this domain?



Development order:



```text

Audit

↓

Reuse

↓

Extend

↓

Create New (only if necessary)

```



\---



\## Protected Infrastructure



Do not modify protected global infrastructure without a confirmed system-wide reason.



Protected areas include:



```text

frontend/src/components/widgets/

frontend/src/components/layout/

frontend/src/components/Sidebar.jsx

frontend/src/components/dashboard/DashboardLayout.jsx

frontend/src/components/dashboard/WidgetGrid.jsx

frontend/src/theme/

```



Always audit dependent pages before modifying protected infrastructure.



\---



\## Sprint 27 Focus



Primary objective:



```text

Analytics Center

```



Recommended implementation order:



1\. Analytics workspace foundation.

2\. Equity Curve analysis.

3\. Drawdown analysis.

4\. Monthly performance.

5\. Trading Pair statistics.

6\. Session statistics.

7\. Performance charts.



Reuse existing:



\- Portfolio calculations.

\- Widget Infrastructure.

\- Feature Modules.

\- TradePilot UI Framework.



Avoid unnecessary architectural refactoring during Sprint 27.



\---



\## Required Workflow



Every feature follows:



```text

Audit

↓

Design

↓

Reuse Existing Implementation

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

↓

Clean git status

```



\---



\## User Workflow Rule



When the user says:



```text

οκ ετοιμο

```



It means:



\- the previous step has been completed,

\- build/test succeeded,

\- continue directly with the next step,

\- do not ask for the same confirmation again.



\---



\## Instruction Style



Use exact Greek step-by-step instructions.



Preferred format:



```text

Άνοιξε:

<file path>



Κάνε ολόκληρο replace με:

<full file content>



Μην αλλάξεις τίποτα άλλο.

```



Avoid placeholders such as:



```jsx

{/\* existing code \*/}

```



Always provide:



\- Whole file replacement

\- Whole function replacement

\- Exact block replacement



Never require the user to infer missing code.



\---



\## Documentation Rule



At the end of every completed sprint:



1\. Update documentation.

2\. Update decisions if new architectural rules were introduced.

3\. Update Current Project Status.

4\. Update Active Sprint.

5\. Create the next `NEXT\_CHAT\_PROMPT`.

6\. Verify `git status` is clean before closing the sprint.



Documentation is considered part of the implementation, not an optional final step.

