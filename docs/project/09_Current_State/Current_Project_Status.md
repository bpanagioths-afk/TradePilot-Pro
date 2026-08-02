# Current Project Status

Status synchronized with branch `feature/multi-user-rebuild` after Sprint 36 on 2026-08-02.

## Release State

```text
Product: TradePilot Pro
Version: 1.0 — Multi-User Foundation
Active Branch: feature/multi-user-rebuild
Current State: Sprint 36 implementation completed; final validation and closing Git review pending
Next Package: Final compile/build/smoke test, Git diff review and user-approved closing commit
Merge State: Pending explicit user approval
```

## Sprint 36 Delivered

### Safe Backup Export

- Authenticated `GET /settings/backup`.
- Versioned backup contract with schema version `1.0`.
- Export is scoped to the authenticated user.
- Export includes:
  - account settings,
  - trades,
  - Trading Plans.
- Export preserves MT5 trade identity fields used for idempotent Sync:
  - `mt5_ticket`,
  - `mt5_position_id`.
- Export excludes:
  - password hashes,
  - authentication tokens,
  - administrator permissions,
  - activation state,
  - database primary keys and user IDs,
  - MT5 connection credentials,
  - uploaded screenshot files.

### Backup Preview and Merge Import

- Authenticated `POST /settings/backup/preview`.
- Authenticated `POST /settings/backup/import`.
- Only `merge` mode is enabled.
- `replace` remains disabled because it is destructive and requires a separate confirmed policy.
- Import runs through one transaction and rolls back on failure.
- Trade duplicate detection uses:
  - `user_id + mt5_position_id`,
  - fallback `mt5_ticket`,
  - manual-trade identity fields when MT5 identity is absent.
- Trading Plans merge by normalized plan name.
- Account identity from the backup never changes the authenticated account username or email.
- Import can update portable account preferences.
- Import UI provides:
  - JSON file selection,
  - mandatory Preview,
  - Merge confirmation,
  - section results,
  - downloadable JSON import report.

### Multiple Trading Plans

- Trading Plan UI supports:
  - Load Plan,
  - New Plan,
  - Save,
  - Save As,
  - Set Default.
- Multiple plans are stored through the existing Trading Plan API and model.
- Only one default plan is maintained per authenticated user.
- The Rule Engine continues to use the authenticated user's default plan.

### Progressive Refactoring

The large Trading Plan page was split into focused components:

```text
frontend/src/features/trading-plan/components/
    TradingPlanToolbar.jsx
    TradingPlanSaveAsDialog.jsx
    MarketsCard.jsx
    RiskRulesCard.jsx
    TradingFrequencyCard.jsx
    SessionsCard.jsx
    NewsRulesCard.jsx
    ConstitutionCard.jsx
```

Backup logic was split from the general Settings service:

```text
backend/app/features/settings/
    service.py
    backup/
        export_service.py
        preview_service.py
        trade_identity.py
        import_engine.py
        import_service.py
    importers/
        account_settings_importer.py
        trades_importer.py
        trading_plans_importer.py
```

The new decision `D-063 — Progressive Refactoring Policy` records the requirement to refactor files that accumulate multiple responsibilities or materially exceed the preferred reviewable size.

### Trading Sessions Market Hours

- Fixed London/New York overlap showing Open during the weekend.
- Added shared:
  - `frontend/src/utils/marketHours.js`
- Trading Sessions now use one Forex weekly market gate.
- Weekly status follows New York time and adjusts automatically for daylight-saving changes.
- Economic-calendar events remain visible when the Forex market is closed.

## Validation Completed During Sprint 36

- Repeated backend `python -m compileall app`.
- Repeated frontend `npm run build`.
- Backup JSON downloaded successfully.
- Export contract and sensitive-data exclusions checked.
- Trading Plan Load/New/Save/Save As/Set Default tested.
- Trading Plan refactor packages built successfully.
- Backup Preview and Merge Import UI built successfully.
- Trading Sessions weekend status corrected and built successfully.

## Required Final Closing Validation

### Backend

```powershell
cd C:\Users\USER\TradingJournal\backend
python -m compileall app
python -m unittest discover -s tests -p "test_*.py" -v
```

### Frontend

```powershell
cd C:\Users\USER\TradingJournal\frontend
npm run build
```

### Smoke Test

- Export Backup.
- Preview Merge.
- Merge Import.
- Download Import Report.
- Trading Plan Load/New/Save/Save As/Set Default.
- Trading Constitution add/edit/delete/reorder.
- Trading Sessions closed during the weekend.

### Git Review

```powershell
git status -sb
git diff --stat
git diff --name-only
git ls-files --others --exclude-standard
```

Commit and push only after explicit user approval.

## Known Limitations / Deferred Work

- Destructive Backup Replace is not enabled.
- Backup does not yet include MT5 account connection credentials.
- Backup does not yet include uploaded screenshot binaries.
- Psychology definitions, Trading System definitions and Market Alerts require separate ownership/portability audits before inclusion.
- Market-holiday closures are not yet implemented in `marketHours.js`.
- Rule Engine Risk per Trade calculation remains pending a verified account-balance and position-risk source.
- Billing, subscriptions, licensing, advanced RBAC and cloud-hosted MT5 execution remain future work.
