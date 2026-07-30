# 04 — Current Modules

## Authentication

Implemented in `feature/multi-user-rebuild`:

- JWT login.
- Authenticated current-user flow.
- Active-user enforcement.
- Public login and recovery routes.
- Forgot username.
- Forgot password.
- Reset password.
- Centralized frontend authentication service.

## Administrative User Management

Implemented:

- Admin-only list users.
- Create user.
- Edit user and active/admin state.
- Reset user password.
- Duplicate username/email validation.
- Self-protection rules for the current administrator.
- Admin-only frontend page and navigation.

No delete-user contract is documented as part of the verified branch API.

## Trading Journal

Implemented:

- Trades CRUD.
- Trade dialogs and details.
- Screenshot support.
- Search and filters.
- CSV/PDF export foundation.
- Trade Score UI.
- User ownership and user-scoped trade access.

## Dashboard

Implemented:

- KPI cards and summary metrics.
- Equity curve and performance views.
- User-scoped summary data.
- Shared widget infrastructure.

## MT5 Trading Center

Implemented:

- Multiple MT5 accounts.
- Account management.
- Open positions, pending orders and performance widgets.
- Synchronization Engine v2.
- Multi-asset movement model.
- Per-user account ownership and user-scoped synchronization.
- Explicit terminal connection policy.

## Portfolio and Analytics

Implemented:

- Portfolio overview and allocation.
- Risk/performance calculations.
- Multi-asset category aggregation.
- Shared chart infrastructure.
- User-scoped portfolio data.

## Settings

Implemented foundation:

- Profile name.
- Base currency.
- Theme mode.
- Security/account settings integrated with authenticated user state.

## Trading Plan and Rule Engine

Implemented foundation:

- Multiple trading plans.
- Trading plan history.
- Rule evaluation.
- Trade Score philosophy: process quality is distinct from profit.

## Psychology, Reports and Home

Existing workspaces remain part of the protected product foundation and must continue to operate under the authenticated layout.
