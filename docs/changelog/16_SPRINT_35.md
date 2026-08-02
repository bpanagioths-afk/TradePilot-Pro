# Sprint 35 — Version 1 Final Validation and Release Hardening

## Status

Completed on 2026-08-02, pending final Git diff review and user-approved commit.

## Scope

Sprint 35 started as the final Version 1 validation package and expanded only where reproducible release-blocking defects or incomplete Version 1 workflows were confirmed.

The work followed the required sequence:

```text
Audit
↓
Root Cause
↓
Small Package
↓
Compile / Build / Test
↓
Functional Validation
```

No duplicate backend service, repository, API or frontend business authority was introduced.

## Authentication and Public Entry Flow

### Completed

- Redesigned Login using the shared authentication layout.
- Added user registration through the existing authentication backend contract.
- Added `AuthLayout` as the shared public-authentication presentation component.
- Added the Register route and protected/public route integration.
- Preserved administrator access and user-role behavior after logout/login cycles.
- Revalidated administrator User Management operations and self-protection.

### Files

- `frontend/src/App.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/components/auth/AuthLayout.jsx`
- `frontend/src/services/authService.js`

## Safe Trade Deletion

### Confirmed Cause

The Trades page called the delete API immediately from the Delete button without a confirmation step.

### Resolution

- Added reusable `ConfirmDialog`.
- Added explicit cancellation and final destructive confirmation.
- Added loading and visible error states.
- Preserved the existing trade API and backend delete contract.

### Files

- `frontend/src/components/common/ConfirmDialog.jsx`
- `frontend/src/pages/Trades.jsx`

## Reports Readability

### Resolution

- Reworked the Reports Summary into readable label/value rows.
- Preserved the canonical Dashboard and movement data contracts.
- Corrected React system-prop warnings by moving layout values into `sx`.

### File

- `frontend/src/pages/Reports.jsx`

## Trading Plan Completion

### Confirmed Cause

The Trading Plan state contained Sessions, News Rules and Constitution fields, but:

- Sessions and News Rules used uncontrolled checkbox defaults.
- Trading Constitution was static text and did not use the stored `constitution` field.

### Resolution

- Connected all market, session and news controls to plan state.
- Added a functional Trading Constitution editor.
- Added rule add, edit, delete and reorder behavior.
- Stored Constitution rules in the existing multiline `constitution` field.
- Reused the existing Trading Plan service and API.

### File

- `frontend/src/pages/TradingPlan.jsx`

## Secure User-Scoped Exports

### Confirmed Cause

The existing export router:

- created its own database session,
- did not require authentication,
- exported trades from all users,
- did not provide Excel output.

The frontend CSV action used `window.open`, which could not send the JWT. PDF and Excel menu items were placeholders.

### Resolution

- Secured CSV and PDF using `get_db` and `get_current_user`.
- Added `Trade.user_id == current_user.id` filtering.
- Added authenticated Excel export with `openpyxl`.
- Added `openpyxl==3.1.5` to backend requirements.
- Added authenticated blob downloads through the existing Axios client.
- Connected CSV, PDF and Excel actions in Trades.
- Kept Print as the existing browser print workflow.

### Files

- `backend/app/routers/exports.py`
- `backend/requirements.txt`
- `frontend/src/services/tradeService.js`
- `frontend/src/pages/Trades.jsx`

## MT5 Notes Preservation

### Confirmed Cause

MT5 synchronization always replaced `Trade.notes` with an open/closed synchronization message.

### Resolution

- Preserved manually entered notes.
- Appended the MT5 synchronization status below manual notes.
- Removed the previous MT5 sync-status line before adding the current one.
- Prevented duplicate status lines on repeated Sync.
- Replaced open status with closed status when the lifecycle changed.

### File

- `backend/app/services/mt5/sync_service.py`

## Trading Plan Ownership and Rule Engine Isolation

### Confirmed Cause

Trading Plan CRUD and Rule Engine evaluation were not scoped to the authenticated user.

The Rule Engine selected the first default plan in the database instead of the current user's plan.

### Resolution

- Added authenticated-user ownership to Trading Plan list/create/read/update/delete.
- Removed client authority over `user_id` in Trading Plan create/update schemas.
- Ensured the first plan becomes the user's default plan.
- Ensured only one default plan is active per user.
- Added ownership checks for Rule Engine trade evaluation.
- Selected the authenticated user's default plan.
- Counted trades on the evaluated trade's day for the same user.

### Files

- `backend/app/routers/trading_plans.py`
- `backend/app/schemas/trading_plan.py`
- `backend/app/routers/rule_engine.py`

## Session Normalization

### Confirmed Cause

The stored trade session was `Asia Session`, while the Rule Engine recognized only the exact value `asia`.

### Resolution

Added canonical session normalization for:

- Asia / Asia Session / Asian Session
- London / London Session
- New York / New York Session / NewYork
- London–New York overlap aliases

### File

- `backend/app/services/rule_engine.py`

## Trade Score Presentation

### Resolution

- Redesigned Trade Score for readable score, status, violations, warnings and successes.
- Replaced long chips with structured alert rows.
- Preserved the existing Rule Engine result contract.
- Kept the Risk per Trade placeholder warning intentionally visible for a future version.

### File

- `frontend/src/components/TradeScoreCard.jsx`

## One-Click Local Launcher

### Resolution

Added a Windows launcher that:

- starts the backend through the repository virtual environment,
- starts the frontend through the existing Vite `npm run dev` command,
- waits for both HTTP endpoints,
- opens one browser page,
- keeps PowerShell windows hidden,
- writes runtime output and errors into `runtime_logs/`,
- avoids starting duplicate backend/frontend processes when the endpoints are already available.

### Files

- `start_tradepilot.ps1`
- `Start TradePilot Pro.vbs`

`runtime_logs/` is local runtime output and must not be committed.

## Validation Evidence

Completed during Sprint 35:

- Branch confirmed: `feature/multi-user-rebuild`.
- Starting working tree confirmed clean and synchronized with origin.
- Backend compile passed before Sprint work.
- MT5 repository tests passed: `Ran 7 tests — OK`.
- Frontend production build passed before Sprint work.
- Authentication, registration, administrator access and User Management validated.
- MT5 Sync and repeated Sync validated without duplicate trades.
- Cross-user trade isolation validated.
- Manual Trade create/edit validated.
- Safe Delete validated.
- Dashboard, Portfolio, Analytics, Psychology and Reports smoke tests passed.
- Trading Plan state persistence validated.
- Manual notes preservation during Sync validated.
- CSV, PDF and Excel downloads validated.
- Trading Plan ownership defect reproduced and corrected.
- `Asia Session` normalization defect reproduced and corrected.
- One-click launcher validated from a fully stopped application state.

Final compile/build/test and final Git diff review remain required after applying this Documentation Package.

## Known Deferred Work

- Full Risk per Trade calculation in the Rule Engine remains pending the position-size/account-balance module.
- Settings Backup/Restore remains incomplete and must not be presented as implemented.
- The free Economic Calendar provider still does not supply Actual values.
- Commercial provider evaluation remains future work.
- Billing, subscriptions, licensing, advanced RBAC and cloud-hosted MT5 execution remain outside Version 1.

## Sprint Result

Sprint 35 completed Version 1 release hardening across authentication, destructive-action safety, Trading Plan functionality, user-scoped exports, MT5 metadata preservation, Rule Engine ownership, session normalization, Trade Score UX and local startup ergonomics.

The branch is ready for final compile/build/test, documentation diff review and the user-approved closing commit.
