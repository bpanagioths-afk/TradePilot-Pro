## MT5 Account Manager

Status: Sprint 19 completed

The MT5 module is no longer only an import tool.

It is now the first Professional MT5 Trading Widget foundation inside TradePilot Pro.

---

## Evolution

### Sprint 17

Initial MT5 Account Manager foundation.

### Sprint 18

Multi-account architecture, account-aware sync, MT5 Account CRUD, and Settings-based account management UI were completed.

### Sprint 19

The MT5 Account Manager was upgraded into a professional trading widget foundation.

Completed Sprint 19 additions:

- Account Summary API
- Live MT5 account metrics
- Balance
- Equity
- Floating Profit / Loss
- Open Positions
- Connection Health
- Import Statistics
- Relative Last Sync
- Professional MT5 Widget UI
- Sync Engine Foundation
- Reusable MetricCard integration

---

## Current Role

The MT5 Account Manager is now the reference implementation for future TradePilot widgets.

It defines the pattern for:

- Data summary endpoint
- Service layer aggregation
- Live external-system health check
- Widget-level frontend data integration
- Metric presentation
- Status presentation
- Manual sync action
- Auto Sync foundation

---

## Backend Scope

Backend responsibilities now include:

- MT5 account CRUD
- Manual account-aware MT5 sync
- Account summary endpoint
- Live MT5 metrics retrieval
- Safe fallback when MT5 is unavailable
- Sync status calculation through the Sync Engine foundation

Related files:

- `backend/app/models/mt5_account.py`
- `backend/app/schemas/mt5_account.py`
- `backend/app/services/mt5_account_service.py`
- `backend/app/services/mt5_sync.py`
- `backend/app/services/sync_engine.py`
- `backend/app/routers/mt5.py`

---

## Frontend Scope

Frontend responsibilities now include:

- MT5 Accounts page inside Settings
- Account cards
- Add / edit account dialogs
- Disable / activate account actions
- Manual sync action
- Summary loading per account
- Professional MT5 Widget UI
- KPI display through `MetricCard`
- Connection badge
- Relative Last Sync
- Floating P/L visual status

Related files:

- `frontend/src/api/mt5AccountsApi.js`
- `frontend/src/components/settings/mt5/MT5AccountsManager.jsx`
- `frontend/src/components/settings/mt5/MT5AccountCard.jsx`
- `frontend/src/components/common/MetricCard.jsx`

---

## Architecture Rule

The MT5 Account Manager must keep the following separation:

```text
Router
↓
Service
↓
Schema
↓
React API
↓
React Manager
↓
React Card / Widget
```

The manager coordinates data loading and user actions.

The card displays the professional widget.

The sync engine calculates sync readiness and future scheduling status.

---

## Future Direction

Future MT5 work should extend this module without breaking the current foundation.

Planned future work:

- Real background Auto Sync
- More advanced connection diagnostics
- Demo / Live classification
- Prop firm account metadata
- Per-account risk settings
- Per-account portfolio grouping
- MT5 open-position details
- Professional dashboard integration

---
