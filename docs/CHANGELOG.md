# TradePilot Pro - Changelog

Official index for project changelog.

See the `docs/changelog/` folder.

Sections:

- [Sprint 1-14](changelog/01_SPRINT_01_14.md)
- [Sprint 15](changelog/02_SPRINT_15.md)
- [Sprint 16](changelog/03_SPRINT_16.md)
- [Sprint 17](changelog/04_SPRINT_17.md)
- [Sprint 18](changelog/05_SPRINT_18.md)
- [Sprint 19](changelog/06_SPRINT_19.md)
- [Full Changelog Archive](changelog/99_FULL_CHANGELOG_ARCHIVE.md)

Rule:

The archive keeps the original changelog content so no historical information is lost.

---

# Sprint 19 - Professional MT5 Trading Widget

Status: Completed

Sprint 19 transformed the MT5 Account Manager into the first Professional Trading Widget of TradePilot Pro.

Completed backend work:

- Added MT5 Account Summary schema.
- Added Account Summary endpoint: `GET /mt5/accounts/{account_id}/summary`.
- Added live MT5 metrics foundation:
  - Balance
  - Equity
  - Floating Profit / Loss
  - Open Positions
  - Connection Health
  - Import Statistics
- Added safe fallback behavior when MT5 is unavailable or disconnected.
- Added Sync Engine Foundation through `sync_engine.py`.
- Added Sync Status endpoint: `GET /mt5/accounts/{account_id}/sync-status`.

Completed frontend work:

- Added `getMT5AccountSummary()` frontend API function.
- Integrated account summaries into `MT5AccountsManager`.
- Converted `MT5AccountCard` into a Professional MT5 Trading Widget.
- Added KPI display for Balance, Equity, Floating P/L and Open Positions.
- Added Connection Status and health messaging.
- Added reusable `MetricCard` component.
- Added Relative Last Sync display.
- Added Floating P/L color feedback.
- Fixed CORS origin support for Vite ports `5173` and `5174`.

Product result:

The MT5 Widget is now the reference pattern for future professional widgets such as Portfolio, Risk, AI Coach, Psychology, Economic Calendar and Prop Firm widgets.
