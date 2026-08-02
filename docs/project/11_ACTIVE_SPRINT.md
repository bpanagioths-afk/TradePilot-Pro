# Active Sprint — Sprint 36: Backup, Multi-Plan and Progressive Refactoring

## Status

Implementation completed on 2026-08-02.

The Sprint is not closed until final compile, tests, production build, smoke validation, Git diff review and explicit user-approved commit.

## Active Branch

`feature/multi-user-rebuild`

## Objective

Deliver safe authenticated Backup Export and Merge Import, extend the existing Trading Plan implementation to multiple named plans, correct Trading Sessions weekly market status and reduce large-file responsibilities without creating duplicate APIs, services or components.

## Completed Packages

### Backup Export

- Versioned user-scoped backup contract.
- Safe export endpoint.
- Sensitive authentication and MT5 connection data excluded.
- MT5 trade identity fields retained for duplicate prevention.

### Import Preview and Merge

- Read-only preview endpoint.
- Generic Backup Import Engine.
- Section importers:
  - Account Settings,
  - Trades,
  - Trading Plans.
- Transactional Merge endpoint.
- Duplicate and conflict counts.
- Frontend file selection, Preview, Merge and downloadable report.
- Replace mode intentionally disabled.

### Multiple Trading Plans

- Load Plan.
- New Plan.
- Save.
- Save As.
- Set Default.
- One default plan per authenticated user.
- Existing backend Trading Plan API reused.

### Frontend Refactoring

- Trading Plan toolbar extracted.
- Save As dialog extracted.
- Markets, Risk Rules, Trading Frequency, Sessions and News Rules extracted.
- Trading Constitution extracted.
- No behavior change intended during refactor.

### Backend Refactoring

- Backup export, preview, identity, engine and import responsibilities separated.
- `settings/service.py` reduced to user Settings orchestration and stable re-exports.
- Importers contain section-specific preview and merge behavior.

### Trading Sessions

- Weekend overlap bug fixed.
- Shared Forex weekly market-hours helper created.
- Trading Sessions use the shared market gate.

### Documentation Decision

- `D-063 — Progressive Refactoring Policy`.

## Remaining Closing Checklist

- [ ] Apply this Sprint 36 documentation package.
- [ ] Run `python -m compileall app`.
- [ ] Run `python -m unittest discover -s tests -p "test_*.py" -v`.
- [ ] Run `npm run build`.
- [ ] Smoke-test Backup Export.
- [ ] Smoke-test Preview Merge and Merge Import.
- [ ] Smoke-test Import Report download.
- [ ] Smoke-test Trading Plans and Trading Constitution.
- [ ] Confirm Trading Sessions weekend status.
- [ ] Review `git status -sb`.
- [ ] Review `git diff --stat`.
- [ ] Review `git diff --name-only`.
- [ ] Review untracked files.
- [ ] Confirm local/generated artifacts are excluded.
- [ ] User approves exact commit message.
- [ ] Create the single Sprint 36 closing commit.
- [ ] Push only after user confirmation.

## Deferred to Sprint 37 / Future

- Backup Replace policy and destructive confirmation flow.
- Additional portable Backup sections after ownership audits.
- Market-holiday calendar support.
- Rule Engine Risk per Trade calculation.
- Further reduction of remaining large orchestration pages.
- Final Version 1 merge/release/tag procedure.
