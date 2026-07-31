# TradePilot Pro - Backlog

Official index for project backlog.

See the `docs/backlog/` folder.

Sections:

- [High Priority](backlog/01_HIGH_PRIORITY.md)
- [Medium Priority](backlog/02_MEDIUM_PRIORITY.md)
- [Low Priority](backlog/03_LOW_PRIORITY.md)
- [Long Term Vision](backlog/04_LONG_TERM_VISION.md)
- [Idea Parking](backlog/05_IDEA_PARKING.md)
- [Full Backlog Archive](backlog/99_FULL_BACKLOG_ARCHIVE.md)

Rules:

- No idea is deleted.
- Completed work is moved to history / changelog, not erased.
- The archive preserves the original backlog content.

---

# Backlog Update after Sprint 19

Completed / moved to history:

- Professional MT5 Trading Widget foundation.
- Account Summary endpoint.
- Live MT5 metrics foundation.
- Connection Health status.
- Import Statistics display.
- Relative Last Sync display.
- Reusable MetricCard component.
- Sync Engine Foundation.

Next high-priority candidates:

1. Sprint 20 - Professional Dashboard Foundation.
2. Portfolio Widget foundation.
3. Risk Widget foundation.
4. Sync Engine scheduling implementation.
5. Improved MT5 connection settings and account validation.
6. Demo / Live / Prop Firm account classification fields.
7. Dashboard grid layout for professional widgets.

Long-term backlog remains unchanged and continues to include AI Coach, Rule Engine expansion, Psychology analytics, Economic Calendar, Prop Firm tools and SaaS subscription architecture.

## Version 1.0 Release Readiness

- Verify database migration for new user fields and ownership columns.
- Prove cross-user isolation for trades, dashboard, portfolio and MT5.
- Validate recovery email configuration.
- Run backend regression and frontend production build.
- Remove temporary patch artifacts before merge.

## Post-Version 1.0

- Subscription and licensing.
- Granular RBAC.
- Tenant/organization model.
- Audit log and security events.
- Secure broker credential vault.

## Economic Calendar Provider Evaluation after Sprint 34

- Keep the current free Forex Factory weekly JSON feed for Version 1.
- Evaluate a licensed, freemium or low-cost Economic Calendar API before commercial release.
- Required fields: Actual, Forecast, Previous, Revision, impact, currency, event time and timezone.
- Delayed Actual values (for example 10–15 minutes) are acceptable for journal/reporting use if licensing permits commercial use.
- Do not use website scraping as the production solution.
