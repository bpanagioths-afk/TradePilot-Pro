# TradePilot Pro - Architecture Decisions

Official index for all accepted architecture decisions.

See `docs/decisions/README.md`.

---

# Decision - Sync Engine Foundation

Status: Accepted

Date: 2026-07-05

Decision:

TradePilot Pro will use a separate Sync Engine service layer instead of placing scheduling and auto-sync logic directly inside `mt5_sync.py`.

Reason:

`mt5_sync.py` must remain focused on MT5 trade import. Auto-sync, sync status, future scheduling and multi-source synchronization need their own service layer to keep the architecture clean and SaaS-ready.

Current implementation:

- `backend/app/services/sync_engine.py`
- `GET /mt5/accounts/{account_id}/sync-status`

Future expansion:

The Sync Engine can later support:

- MT5 scheduled sync
- TradingView sync
- Economic Calendar sync
- Portfolio refresh
- Windows Service scheduler
- APScheduler
- SaaS background workers

Architecture direction:

```text
Sync Engine
↓
Source-specific Sync Services
↓
Application Modules
```

---

# Decision - MetricCard reusable component

Status: Accepted

Date: 2026-07-05

Decision:

KPI display blocks must use a reusable `MetricCard` component instead of local one-off metric boxes inside modules.

Reason:

Professional widgets will repeatedly need KPI cards for Balance, Equity, Win Rate, Profit Factor, Risk, Drawdown, Portfolio metrics and AI Coach summaries. A reusable component keeps visual consistency and reduces duplicated UI code.

---

# Decision - Portfolio Feature Module Reference Implementation

Status: Accepted

Date: 2026-07-06

Decision:

Sprint 22 establishes the Portfolio module as the first full reference implementation of the Feature Module pattern.

The frontend Portfolio module now follows:

```text
frontend/src/features/portfolio/
├── components/
├── hooks/
├── services/
└── index.js
```

Reason:

TradePilot Pro is growing beyond individual pages and widgets. Future modules such as Risk, Analytics, Psychology, AI Coach, Trading Plan, Economic Calendar and Prop Firm tools need a consistent implementation pattern.

Consequence:

New feature modules should prefer this structure unless a clear architectural reason exists to deviate.

---

# Decision - Widget Infrastructure v3

Status: Accepted

Date: 2026-07-06

Decision:

Sprint 22 extends the Widget Infrastructure layer with reusable metric layout and rendering components:

- `WidgetMetricGrid`
- `WidgetMetrics`

Reason:

Multiple widgets require repeated KPI grid layouts. Centralizing metric grid rendering reduces duplicated UI, improves consistency, and keeps feature components smaller.

Consequence:

Feature widgets should use `WidgetMetrics` / `WidgetMetricGrid` when presenting KPI groups instead of recreating grid layout manually.

---

# Decision - Modular Portfolio Overview API

Status: Accepted

Date: 2026-07-06

Decision:

The Portfolio API should expose a modular overview response through:

```text
GET /portfolio/overview
```

The response is grouped into:

```text
summary
statistics
allocation
performance
```

The existing `/portfolio/summary` endpoint remains available for backward compatibility.

Reason:

A flat `PortfolioSummary` schema would grow too large as Portfolio analytics expands. A modular response keeps the API contract easier to extend and reuse across dashboard widgets and future Portfolio pages.

Consequence:

New Portfolio analytics should extend the modular overview response instead of adding unrelated fields to a single flat summary object.

---

# Decision - Source Structure Audit Before Routing Changes

Status: Accepted

Date: 2026-07-06

Decision:

Before adding pages, routes or navigation entries, TradePilot Pro development must first inspect the real frontend routing and layout files.

Reason:

During Sprint 22, a `pages/index.js` file was assumed but did not exist. The project uses direct page imports in the routing layer. Future routing work should be based on actual source structure, not assumptions.

Consequence:

Routing / navigation changes require a short source-structure audit before implementation.


---

# Decision - Single Touch Rule

See: `docs/decisions/D-051_Single_Touch_Rule.md`

# Decision - Package First Development

See: `docs/decisions/D-052_Package_First_Development.md`

# Decision - Shared Widget System

See: `docs/decisions/D-053_Shared_Widget_System.md`

# Decision - Portfolio Reference UI

See: `docs/decisions/D-054_Portfolio_Reference_UI.md`

# Decision - Multi-Asset MT5 Engine

See: `docs/decisions/D-055_Multi_Asset_MT5_Engine.md`
