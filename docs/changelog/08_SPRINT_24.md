# Sprint 24 - UI Framework, Portfolio Page and MT5 Dashboard Integration

Status: Completed

Sprint 24 completed the Portfolio UI integration and introduced the first stable application-level layout foundation for TradePilot Pro without changing backend architecture.

## Completed Frontend Work

### Portfolio Page Integration

- Added `/portfolio` route in `frontend/src/App.jsx`.
- Added Portfolio entry in the left sidebar navigation.
- Connected `Portfolio.jsx` to the shared Portfolio feature module.
- Added `PortfolioChartsCard.jsx` for Equity Curve and Drawdown visualisation.
- Exported `PortfolioChartsCard` through `frontend/src/features/portfolio/index.js`.
- Portfolio page now uses shared Portfolio feature components:
  - `PortfolioSummaryMetrics`
  - `PortfolioPerformanceMetrics`
  - `PortfolioStatisticsCard`
  - `PortfolioAllocationCard`
  - `PortfolioChartsCard`

### Layout Foundation

- Added `frontend/src/components/layout/PageHeader.jsx`.
- Added `frontend/src/components/layout/PageLayout.jsx`.
- Migrated `Dashboard.jsx` to use `PageLayout`.
- Migrated `Portfolio.jsx` to use `PageLayout`.
- Added common page title/subtitle pattern for major pages.

### Sidebar v2

- Updated `frontend/src/components/Sidebar.jsx`.
- Added grouped navigation sections:
  - HOME
  - OVERVIEW
  - TRADING
  - PERFORMANCE
  - PLATFORMS
  - SYSTEM
- Added visible navigation for Portfolio and Home.
- Sidebar branding updated from `Trading Journal` to `TradePilot Pro`.

### MT5 Dashboard Widget Integration

- Reused the existing MT5 account summary infrastructure.
- Connected `frontend/src/components/dashboard/mt5/MT5Widget.jsx` to existing frontend API functions:
  - `getMT5Accounts()`
  - `getMT5AccountSummary(accountId)`
  - `syncMT5Account(accountId)`
- Dashboard MT5 widget now displays real account data:
  - Balance
  - Equity
  - Floating P/L
  - Open Positions
  - Connection
  - Account
  - Broker
  - Server
- Added dashboard sync action using the active MT5 account.
- Improved dashboard MT5 details layout without modifying global widgets.

## Important Sprint 24 Corrections

During Sprint 24, global widget refactoring caused unwanted side effects in Dashboard and Portfolio. The project decision after review is:

```text
Do not modify global widget infrastructure for a single page-level visual issue.
```

Protected widgets should only change when:

1. There is a real bug in the global component.
2. The change is reviewed as a system-wide design decision.
3. Dashboard, Portfolio and MT5 are tested after the change.

## Files Changed / Added

### Added

- `frontend/src/components/layout/PageHeader.jsx`
- `frontend/src/components/layout/PageLayout.jsx`
- `frontend/src/features/portfolio/components/PortfolioChartsCard.jsx`

### Modified

- `frontend/src/App.jsx`
- `frontend/src/components/Sidebar.jsx`
- `frontend/src/components/dashboard/mt5/MT5Widget.jsx`
- `frontend/src/features/portfolio/index.js`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Portfolio.jsx`

## Product Result

TradePilot Pro now has a clearer application shell direction:

```text
MainLayout
↓
Sidebar
↓
PageLayout
↓
Feature / Dashboard Widgets
↓
Widget Infrastructure
```

Portfolio is now accessible as a full page, Dashboard has a shared page layout, and the MT5 dashboard widget uses real MT5 account summary data instead of placeholders.

## Sprint 24 Development Rules Established

- One feature at a time.
- Commit after each completed feature.
- No global widget changes for feature-specific UI problems.
- Reuse existing components before creating new ones.
- Check existing services/API before adding endpoints.
- Prefer whole-file replacements for user-guided edits.
- `οκ έτοιμο` means the change worked and development should continue to the next step.
