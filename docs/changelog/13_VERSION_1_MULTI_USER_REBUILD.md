# Version 1.0 — Multi-User Rebuild

Branch: `feature/multi-user-rebuild`  
Documentation synchronized: 2026-07-27

## Added

- JWT security module and centralized authentication dependencies.
- Authentication schemas and router.
- Login, forgot-username, forgot-password and reset-password flows.
- Email service abstraction for recovery workflows.
- Administrative User Management backend feature package.
- Administrator User Management frontend page and service.
- Reusable PasswordField component.
- Public, protected and administrator-only route layers.
- User profile, active state, admin state, preference and audit fields.
- User ownership for trades and MT5-related data.

## Changed

- Dashboard, portfolio and trade access are authenticated-user scoped.
- MT5 accounts, widgets and synchronization now respect user ownership.
- Shared frontend API client sends authentication credentials and handles auth failures.
- Sidebar, Topbar and Settings are authentication aware.
- Trade dialogs operate within authenticated ownership contracts.

## Security and Architecture

- Backend dependencies and scoped repository/service queries are the authority for access control.
- Frontend administrator routes are navigation protection only.
- Existing Version 0.9 MT5, portfolio, widget and chart systems are extended rather than duplicated.

## Release Checks Still Required

- Database schema and existing-data migration verification.
- Backend compile and endpoint regression.
- Cross-user isolation testing.
- Account recovery environment test.
- Frontend production build.
- Cleanup of temporary artifacts.
- Final Git diff review and merge readiness.



## Home Command Center completion (Sprint 32)

### Completed
- Trading Sessions widget.
- Today's Mission widget.
- Market Alerts widget integrated with Forex Factory.
- Backend filtering keeps upcoming events and events from the previous 2 hours.
- Automatic refresh every 5 minutes.
- Provider cache reduced to 5 minutes.
- Actual values displayed when provided by the provider.

