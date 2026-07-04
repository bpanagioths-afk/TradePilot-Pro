### Frontend Completed

Implemented

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

Refactor

* `Settings.jsx` cleaned and reduced
* `MT5AccountsManager.jsx` extracted
* `MT5AccountCard.jsx` extracted
* MT5 UI moved to `components/settings/mt5/`
* Stable sorting by internal `id` added to avoid UI action confusion after Activate / Disable

Tested

* Add account works
* Edit account works
* Disable account works
* Activate account works
* Sync selected account works
* Real MT5 account sync imported trades
* Last Sync refresh works

\---
