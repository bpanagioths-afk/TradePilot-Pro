# Active Sprint — Version 1.0 Multi-User Rebuild

## Active Branch

`feature/multi-user-rebuild`

## Objective

Complete the Version 1.0 multi-user foundation without regressing the completed Version 0.9 trading, MT5, portfolio, widget or chart contracts.

## Implemented in the Branch

- JWT authentication and protected application routing.
- Login and account-recovery frontend flows.
- User model expansion and profile preferences.
- Admin-only backend User Management feature.
- Administrator User Management page.
- User ownership for trades, dashboard, portfolio and MT5 data.
- Authenticated API client behavior.
- Authorization-aware Sidebar and Topbar.
- User profile/security integration in Settings.

## Current Package

### Package: Integration Validation and Release Readiness

The feature implementation exists in the branch. The remaining work is validation, defect correction only where proven, documentation synchronization, cleanup and merge readiness.

## Required Validation

### Backend

- `python -m compileall app`
- Authentication and authorization regression.
- User lifecycle and administrator protections.
- User ownership/isolation across trades, dashboard, portfolio and MT5.
- Existing MT5 sync regression.

### Frontend

- `npm run build`
- Public route behavior.
- Protected route behavior.
- Administrator-only route behavior.
- Login/logout and expired-token behavior.
- Forgot username/password and reset-password states.
- Admin list/create/edit/reset-password states.
- Settings profile/security behavior.

### Database

- Confirm the deployed schema contains all fields expected by `User` and `Trade`.
- Confirm foreign keys and indexes needed for ownership are present.
- Confirm existing records have a valid ownership migration strategy.

## Locked Scope

- Version 0.9 MT5 synchronization and movement contracts.
- Portfolio calculations and reference UI.
- Shared Widget System.
- Shared Chart Infrastructure.
- Backend business rules already verified, unless a reproducible defect is found.

## Out of Scope

- Billing and subscriptions.
- License-key enforcement.
- Organization/tenant hierarchy.
- Granular RBAC beyond administrator/user.
- Cloud-hosted MT5 execution.
- Broker Manager APIs.
- Credential vault redesign.

## Definition of Done

- Backend validation passes.
- Frontend production build passes.
- Cross-user isolation is proven.
- Administrator protections are proven.
- Account recovery is validated in the configured environment.
- No temporary patch or transfer files remain unintentionally tracked.
- Documentation pack matches the branch.
- Git diff is reviewed.
- Branch is ready to merge into `develop`.


## Sprint 33
Dashboard completed. Remaining focus: BUG-001, BUG-002, BUG-003.
