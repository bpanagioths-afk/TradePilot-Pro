# Active Sprint — Sprint 35: Version 1 Final Validation

## Active Branch

`feature/multi-user-rebuild`

## Objective

Validate the complete Version 1 working tree after Sprint 34, correct only reproducible release-blocking defects, synchronize documentation, review the Git diff and prepare the branch for the user-approved closing commit and merge decision.

## Starting State

- Multi-user authentication, administration, recovery and ownership foundation implemented.
- Dashboard Sprint 33 completed.
- Sprint 34 regression recovery completed:
  - BUG-001 closed with MT5 ticket reconciliation, database protection and tests.
  - BUG-002 closed through manual Open/Close Time support.
  - BUG-003 classified as an upstream free-provider limitation.
- Sprint 34 repository tests pass: `Ran 7 tests — OK`.

## Locked Workflow

1. Read `PROJECT_BOOTSTRAP.md` and the complete Documentation Pack.
2. Inspect `git status`, current branch and diff before changing code.
3. Run full validation before proposing new implementation.
4. Fix only proven release blockers.
5. Use existing services, repositories, APIs and components.
6. Work in small, isolated packages.
7. Provide complete files for copy/paste when a file changes.
8. Re-run the affected compile/build/test command after each package.
9. Update documentation only after the working tree is genuinely validated.
10. Commit only after explicit user confirmation.

## Required Validation

### Git and Workspace

- Confirm branch `feature/multi-user-rebuild`.
- Review `git status` before testing.
- Review all tracked and untracked Sprint 34 files.
- Remove accidental transfer, patch, cache or diagnostic artifacts only after audit.

### Backend

- `python -m compileall app`
- `python -m unittest discover -s tests -p "test_*.py" -v`
- Authentication and authorization regression.
- Inactive-user and token validation.
- Administrator create/edit/reset-password and self-protection.
- User isolation across trades, dashboard, portfolio and MT5.
- Manual trade create/edit validation.
- MT5 manual-ticket reconciliation and repeat-sync idempotency.
- Portfolio closed-manual-trade behavior.

### Frontend

- `npm run build`
- Login/logout and protected route behavior.
- Account-recovery pages.
- Administrator-only navigation and page behavior.
- Trade create/edit dialog validation and server error feedback.
- Trading System and Psychology dropdowns.
- Dashboard, Portfolio, Analytics, Psychology, Reports and Market Alerts smoke test.

### Database

- Verify required User and Trade columns.
- Verify ownership foreign keys/indexes.
- Verify:
  - `uq_trades_user_account_position`
  - `uq_trades_user_manual_position`
- Confirm no duplicate canonical MT5 identities.

## Locked Scope

- Version 0.9 MT5 movement and synchronization contracts.
- Canonical Trade Lifecycle.
- Portfolio realized-performance calculations.
- Shared Widget and Chart infrastructure.
- Sprint 34 MT5 ticket reconciliation and database protection.

## Out of Scope

- Replacing the Economic Calendar provider.
- Website scraping for Actual values.
- Billing, subscriptions or license enforcement.
- Organization/tenant hierarchy.
- Granular RBAC beyond administrator/user.
- Cloud-hosted MT5 execution.
- New architecture or unrelated feature development.

## Definition of Done

- Full backend validation passes.
- Full frontend production build passes.
- Cross-user isolation is confirmed.
- MT5 reconciliation and database protection are confirmed.
- No known Version 1 release blocker remains.
- Documentation matches the final working tree.
- Git diff is reviewed with the user.
- User explicitly approves the closing commit.
