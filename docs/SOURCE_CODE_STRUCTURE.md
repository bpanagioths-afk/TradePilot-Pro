# TradePilot Pro — Source Code Structure

> Synchronized with `feature/multi-user-rebuild` on 2026-07-27.

## Root

```text
TradePilot-Pro/
├── backend/
├── database/
├── docs/
├── frontend/
└── uploads/
```

Generated/local folders such as `venv`, `node_modules`, `dist`, caches and `.env` files are not source architecture and must not be committed.

## Backend

```text
backend/app/
├── core/
│   ├── database.py
│   ├── deps.py              # current-user/admin dependencies
│   └── security.py          # password and JWT security
├── features/
│   ├── admin/
│   │   ├── api.py
│   │   ├── repository.py
│   │   ├── schemas.py
│   │   └── service.py
│   └── portfolio/
├── models/
│   ├── user.py
│   ├── trade.py
│   ├── mt5_account.py
│   └── ...
├── routers/
│   ├── auth.py
│   ├── dashboard.py
│   ├── mt5.py
│   ├── trades.py
│   └── ...
├── schemas/
│   ├── auth.py
│   └── ...
├── services/
│   ├── email_service.py
│   ├── mt5/
│   ├── mt5_account_service.py
│   └── mt5_sync.py
└── main.py
```

### Backend Ownership Rules

- `core/security.py` owns password and token primitives.
- `core/deps.py` resolves the authenticated user and administrator access.
- `routers/auth.py` exposes authentication and recovery contracts.
- `features/admin/` owns administrative User Management.
- `models/user.py` owns user identity, status and profile fields.
- `models/trade.py` contains trade ownership.
- Trade, dashboard, portfolio and MT5 access must be scoped through the authenticated user.
- `main.py` registers routers and middleware only; no business logic belongs there.

## Frontend

```text
frontend/src/
├── api/
│   ├── api.js               # authenticated HTTP client behavior
│   └── mt5AccountsApi.js
├── components/
│   ├── common/
│   │   └── PasswordField.jsx
│   ├── settings/mt5/
│   ├── dashboard/mt5/
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── TradeDialog.jsx
│   └── TradeDetailsDialog.jsx
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Login.jsx
│   ├── ForgotUsername.jsx
│   ├── ForgotPassword.jsx
│   ├── ResetPassword.jsx
│   ├── AdminUsers.jsx
│   ├── Settings.jsx
│   └── ...
├── services/
│   ├── authService.js
│   └── adminService.js
└── App.jsx
```

### Frontend Route Layers

- Public only: login and forgot-credential routes.
- Reset password: token-based public route.
- Protected layout: authenticated application.
- Administrator route: `/admin/users`.

### Frontend Rules

- Authentication storage and helpers stay in `authService.js`.
- Administrator endpoint calls stay in `adminService.js`.
- Authenticated request behavior stays in the shared API client.
- Page components must not become a second business-logic authority.
- Shared Widget, Chart and Portfolio patterns remain the reference UI infrastructure.

## Database Impact

The running database must match the branch models, including:

- user administrative and active-state fields,
- user profile/preference fields,
- login/update timestamps,
- trade ownership,
- MT5 account ownership where required by the branch.

Schema verification and existing-row migration are release prerequisites.

## Sprint 34 Regression Recovery Additions

### Backend

```text
backend/
├── app/
│   ├── models/trade.py
│   ├── routers/trades.py
│   ├── schemas/trade.py
│   └── services/mt5/
│       ├── repository.py
│       └── sync_service.py
├── scripts/
│   └── diagnose_market_alerts.py
└── tests/
    └── test_mt5_repository.py
```

- `services/mt5/repository.py` owns canonical MT5 position lookup and manual-record reconciliation.
- `tests/test_mt5_repository.py` protects existing synced reuse, manual ticket linking and new-record behavior.
- `scripts/diagnose_market_alerts.py` is a diagnostic utility for provider payload and mapping verification, not a production provider.

### Frontend

```text
frontend/src/
├── components/
│   ├── TradeDialog.jsx
│   └── TradeDetailsDialog.jsx
├── features/
│   ├── psychology/psychologyUtils.js
│   └── trades/tradeOptions.js
└── pages/Trades.jsx
```

- `features/trades/tradeOptions.js` is the shared source for Trading System and Psychology labels/options used by trade UI.
- `TradeDialog.jsx` owns MT5 ticket, Open Time and Close Time entry and client-side validation.
- `Trades.jsx` owns server save-error presentation while backend validation remains authoritative.
