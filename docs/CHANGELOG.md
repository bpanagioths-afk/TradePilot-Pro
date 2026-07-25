# TradePilot Pro - Changelog

Official index for project changelog.

See the `docs/changelog/` folder.

Sections:

* [Sprint 1-14](changelog/01_SPRINT_01_14.md)
* [Sprint 15](changelog/02_SPRINT_15.md)
* [Sprint 16](changelog/03_SPRINT_16.md)
* [Sprint 17](changelog/04_SPRINT_17.md)
* [Sprint 18](changelog/05_SPRINT_18.md)
* [Sprint 19](changelog/06_SPRINT_19.md)
* [Sprint 24](changelog/08_SPRINT_24.md)
* [Sprint 27-28](changelog/09_SPRINT_27_28.md)
* [Sprint 29](changelog/10_SPRINT_29.md)
* [Sprint 30](changelog/11_SPRINT_30.md)
* [Full Changelog Archive](changelog/99_FULL_CHANGELOG_ARCHIVE.md)

Rule:

The archive keeps the original changelog content so no historical information is lost.

\---

# Sprint 19 - Professional MT5 Trading Widget

Status: Completed

Sprint 19 transformed the MT5 Account Manager into the first Professional Trading Widget of TradePilot Pro.

Completed backend work:

* Added MT5 Account Summary schema.
* Added Account Summary endpoint: `GET /mt5/accounts/{account\_id}/summary`.
* Added live MT5 metrics foundation:

  * Balance
  * Equity
  * Floating Profit / Loss
  * Open Positions
  * Connection Health
  * Import Statistics
* Added safe fallback behavior when MT5 is unavailable or disconnected.
* Added Sync Engine Foundation through `sync\_engine.py`.
* Added Sync Status endpoint: `GET /mt5/accounts/{account\_id}/sync-status`.

Completed frontend work:

* Added `getMT5AccountSummary()` frontend API function.
* Integrated account summaries into `MT5AccountsManager`.
* Converted `MT5AccountCard` into a Professional MT5 Trading Widget.
* Added KPI display for Balance, Equity, Floating P/L and Open Positions.
* Added Connection Status and health messaging.
* Added reusable `MetricCard` component.
* Added Relative Last Sync display.
* Added Floating P/L color feedback.
* Fixed CORS origin support for Vite ports `5173` and `5174`.

Product result:

The MT5 Widget is now the reference pattern for future professional widgets such as Portfolio, Risk, AI Coach, Psychology, Economic Calendar and Prop Firm widgets.



## Sprint 22 - Portfolio Feature Module Completion

Status: Completed

Highlights:

* Portfolio Feature Module architecture completed.
* Modular `/portfolio/overview` API.
* Portfolio statistics, allocation and performance sections.
* React Feature Module pattern (`components/hooks/services/index.js`).
* Widget Infrastructure v3 (`WidgetMetricGrid`, `WidgetMetrics`).
* Portfolio dashboard widget refactored to use shared hooks and reusable components.



## Sprint 23 (Completed)

* Portfolio backend modularized (Repository/Service/Engines).
* Added Summary, Performance, Risk, Equity and Drawdown engines.
* Added /api/portfolio/overview compatibility endpoint.
* Frontend portfolio migration started and aligned with new backend contract.
* Known backlog: MT5 pips calculation, Allocation engine, Equity/Drawdown charts.

## Sprint 24 (Completed)

Status: Completed

Highlights:

* Added Portfolio page route and Sidebar navigation entry.
* Added `PageHeader` and `PageLayout` as shared layout foundation.
* Migrated Dashboard and Portfolio pages to `PageLayout`.
* Added `PortfolioChartsCard` for Equity Curve and Drawdown charts.
* Connected Dashboard MT5 widget to existing live MT5 account summary data.
* Reused existing MT5 API functions instead of creating duplicate endpoints.
* Established protected global widget rule after Sprint 24 UI regression.
* Established one-feature-one-commit workflow.

See: `docs/changelog/08\_SPRINT\_24.md`.



\---



\# Sprint 25 - MT5 Open Positions



Status: Completed



Sprint 25 introduced live MT5 open positions into TradePilot Pro.



Completed backend work:



\- Added live MT5 open positions service.

\- Added GET /mt5/open-positions endpoint.

\- Reused the existing MT5 account service and router.

\- Added automatic MT5 connection handling for live positions.



Completed frontend work:



\- Added getMT5OpenPositions API helper.

\- Created OpenPositionsWidget.

\- Added automatic refresh every 10 seconds.

\- Displayed:

&#x20; - Ticket

&#x20; - Symbol

&#x20; - Direction

&#x20; - Volume

&#x20; - Open Price

&#x20; - Current Price

&#x20; - Stop Loss

&#x20; - Take Profit

&#x20; - Floating Profit

&#x20; - Swap

\- Integrated the widget into the Dashboard during the initial implementation.



Git:



\- Commit: Sprint 25 - Add MT5 open positions widget



Product result:



TradePilot Pro gained its first real-time MT5 trading view and established the base pattern for future live MT5 widgets.



\---



\# Sprint 26 - MT5 Trading Center \& Core UI Cleanup



Status: Completed



Sprint 26 completed the first full MT5 Trading Center implementation and cleaned duplicated information across the core application pages.



Completed backend work:



\- Added live MT5 Pending Orders service.

\- Added live MT5 Account Health service.

\- Added live Today's Performance service.

\- Added live Connection Health service.

\- Added MT5 API endpoints for:

&#x20; - Pending Orders

&#x20; - Account Health

&#x20; - Today's Performance

&#x20; - Connection Health



Completed frontend work:



\- Created PendingOrdersWidget.

\- Created AccountHealthWidget.

\- Created TodayPerformanceWidget.

\- Created ConnectionHealthWidget.

\- Expanded the existing MT5 page into MT5 Trading Center.

\- Integrated:

&#x20; - Account Sync

&#x20; - Connection Health

&#x20; - Account Health

&#x20; - Today's Performance

&#x20; - Open Positions

&#x20; - Pending Orders

\- Added automatic refresh for live MT5 data.

\- Reduced the MT5 connection panel height.

\- Removed the permanent MT5 guide section.



Dashboard cleanup:



\- Removed detailed Open Positions and Pending Orders widgets from Dashboard.

\- Dashboard now keeps an overview role instead of duplicating detailed MT5 information.

\- Portfolio widget was reduced to summary-only information.



Portfolio cleanup:



\- Detailed portfolio information remains inside the Portfolio page.

\- Dashboard Portfolio widget now shows only:

&#x20; - Total Trades

&#x20; - Net Profit

&#x20; - Link to Portfolio



Home cleanup:



\- Removed hardcoded demo trading results.

\- Removed fake latest trades.

\- Replaced the personal hardcoded greeting.

\- Converted Home into a Welcome / Command Center page.

\- Added shortcuts to Dashboard and MT5 Trading Center.



Product and UI decisions:



\- Dashboard = Executive Overview.

\- MT5 = primary live trading workspace.

\- Portfolio = primary portfolio analysis workspace.

\- Detailed information belongs to one primary page.

\- Other pages may show only summaries or links.

\- Sidebar structure remains unchanged until Version 1.0.

\- No further redesign during the remaining Version 0.8 work unless required for a bug.



Product result:



TradePilot Pro Version 0.8 now includes a complete live MT5 Trading Center with account health, connection status, daily performance, open positions and pending orders.



---

# Sprint 27-28 — Analytics Center and MT5 Synchronization Engine v2

Status: Completed

Highlights:

- Analytics Center implemented using existing Portfolio and Dashboard data sources.
- Analytics migrated to shared Widget Infrastructure and PageLayout.
- MT5 Synchronization Engine v2 introduced with position aggregation and idempotent upsert.
- Open, partially closed and closed MT5 positions now follow one Trade lifecycle.
- Recent closing deals are reconciled safely.
- Dashboard, Portfolio and Analytics now share one Design System.
- Trade lifecycle and synchronization architecture documented.

See: `docs/changelog/09_SPRINT_27_28.md`.


---

# Sprint 29 — Multi-Asset Movement and Analytics

Status: Completed

Highlights:

- Canonical multi-asset movement engine for Forex, JPY pairs, indices, metals, stocks, crypto and CFDs.
- Pips and non-Forex points separated across Dashboard and Analytics.
- Shared movement and analytics engines added to the Portfolio feature.
- Trades, Trade Details, Reports and Psychology migrated to semantic movement units.
- Portfolio Allocation changed from per-symbol exposure to asset-class exposure.
- Backend compile, static dead-code audit and frontend production build passed.

See: `docs/changelog/10_SPRINT_29.md`.

---

# Sprint 31A — Multi-User Foundation and Admin Backend

Status: Completed

Highlights:

- Version 1.0 multi-user backend foundation.
- JWT authentication and centralized admin authorization verified.
- Administrative user list, create, update and password-reset endpoints.
- Duplicate-account and self-protection business rules.
- Sprint 31B Administrative Frontend established as the active package.
- No verified delete-user endpoint; deletion remains contract-gated.

See: `docs/changelog/12_SPRINT_31.md`.
