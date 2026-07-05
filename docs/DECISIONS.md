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
