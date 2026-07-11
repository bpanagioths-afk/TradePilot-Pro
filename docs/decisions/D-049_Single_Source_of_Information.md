\# D-049 - Single Source of Information



Status: Accepted



Date: 2026-07-11



\---



\## Decision



Every business domain inside TradePilot Pro must have one and only one primary workspace where detailed information is maintained.



Other pages may present only:



\- Summary information

\- KPIs

\- Navigation shortcuts

\- Links to the primary workspace



They must not duplicate complete functionality or detailed business information.



\---



\## Current Workspace Ownership



```text

Home

&#x20;   ↓

Welcome / Command Center



Dashboard

&#x20;   ↓

Executive Overview



MT5

&#x20;   ↓

Live Trading Center



Portfolio

&#x20;   ↓

Portfolio Analysis



Analytics

&#x20;   ↓

Historical Analysis



Psychology

&#x20;   ↓

Trader Journal



Reports

&#x20;   ↓

Reports \& Export

```



\---



\## Reason



During Sprint 25 and Sprint 26 several pages temporarily displayed the same MT5 and Portfolio information.



Although useful during development, duplicated information:



\- increases maintenance effort,

\- creates inconsistent user experience,

\- introduces multiple sources of truth,

\- increases the probability of future bugs.



A single primary workspace keeps the product easier to understand and easier to maintain.



\---



\## Rule



Before adding a new widget, page or feature, verify:



1\. Does another page already own this information?

2\. Is the information detailed or summary?

3\. Should this page display only a summary?

4\. Should the user be redirected to the primary workspace instead?



\---



\## Consequences



Dashboard remains:



```text

Executive Overview

```



MT5 remains:



```text

Live Trading Center

```



Portfolio remains:



```text

Portfolio Analysis

```



Future workspaces will follow the same principle.



\---



\## Applies To



\- Frontend architecture

\- Backend architecture

\- Dashboard

\- Home

\- MT5

\- Portfolio

\- Analytics

\- Psychology

\- Reports

\- Future SaaS implementation

