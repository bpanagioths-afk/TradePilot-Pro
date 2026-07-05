### Frontend Completed

Implemented through Sprint 18:

* `frontend/src/api/mt5AccountsApi.js`
* MT5 Accounts UI inside Settings
* Account list
* Add Account dialog
* Edit Account dialog
* Disable Account action
* Activate Account action
* Sync selected account button
* Active / Disabled badge
* Login display
* Last Sync display
* Snackbar notifications
* Sync loading state
* Actions Menu (`⋮`)
* Professional card Phase 1
* Hover effects

Refactor through Sprint 18:

* `Settings.jsx` cleaned and reduced
* `MT5AccountsManager.jsx` extracted
* `MT5AccountCard.jsx` extracted
* MT5 UI moved to `components/settings/mt5/`
* Stable sorting by internal `id` added to avoid UI action confusion after Activate / Disable

Tested through Sprint 18:

* Add account works
* Edit account works
* Disable account works
* Activate account works
* Sync selected account works
* Real MT5 account sync imported trades
* Last Sync refresh works

---

## Sprint 19 Frontend Additions

Sprint 19 upgraded the MT5 Account Card into a Professional MT5 Trading Widget.

Implemented:

* `getMT5AccountSummary(accountId)` frontend API function
* Summary loading per MT5 account
* Summary data passed from `MT5AccountsManager` into `MT5AccountCard`
* Professional MT5 Trading Widget layout
* Balance KPI
* Equity KPI
* Floating P/L KPI
* Open Positions KPI
* Imported Trades display
* Health message display
* Connection badge
* Relative Last Sync
* Floating P/L positive / negative color handling
* MUI Grid v2 compatibility
* CORS origin support for Vite ports 5173 and 5174

---

## Reusable Component Integration

Sprint 19 introduced:

```text
frontend/src/components/common/MetricCard.jsx
```

The previous local MT5 metric box concept was promoted into a reusable TradePilot UI component.

`MT5AccountCard.jsx` now uses `MetricCard` for:

* Balance
* Equity
* Floating P/L
* Open Positions

This keeps the MT5 Widget aligned with the TradePilot UI Framework and prepares future widgets to reuse the same KPI presentation pattern.

---

## Current Frontend Rule

`MT5AccountsManager.jsx` is responsible for:

* loading accounts
* loading account summaries
* account CRUD actions
* sync action coordination
* dialog state
* snackbar notifications

`MT5AccountCard.jsx` is responsible for:

* displaying one professional MT5 account widget
* showing account identity
* showing status badges
* showing KPI metrics
* showing account information
* exposing account actions

The manager should not contain widget layout logic.

The card should not directly fetch backend data.

---
