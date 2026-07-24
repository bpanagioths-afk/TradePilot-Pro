# Documentation Framework v3 — Migration Notes

## Verified findings

- The Git repository is connected and accessible.
- Repository: `bpanagioths-afk/TradePilot-Pro`
- Default branch: `develop`
- Working continuation branch: `feature/multi-user-rebuild`
- `docs/decisions/INDEX_BY_CATEGORY.md` already exists.
- `docs/PROJECT_BOOTSTRAP.md` and `D-060_Read_Before_Modify.md` exist on the working branch.

## Problems corrected by this package

1. Startup depended on File Library instead of checking Git.
2. Multiple files competed as the conversation entry point.
3. Workflow rules were repeated across many decisions.
4. Legacy decision files remained marked accepted even when later rules described the same process.
5. Several filenames D-029 through D-033 did not match their internal decision titles.
6. The old category index omitted or duplicated later decisions.

## Migration strategy

- Preserve all historical decision files.
- Introduce one permanent entry point: `docs/START_HERE.md`.
- Introduce one authoritative status registry.
- Consolidate repeated workflow and delivery rules into D-061 to D-063.
- Keep sprint-specific prompts only as transitional/historical files.
- Perform filename corrections D-029 to D-033 in a separate controlled Git migration.
