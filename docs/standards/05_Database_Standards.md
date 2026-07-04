# Database Standards

## Internal IDs

Database primary keys are internal IDs.

External system IDs must not be used as primary keys.

For MT5:

* `Trade.id` = internal database ID
* `Trade.mt5\_ticket` = external MT5 ticket

## Duplicate Detection

MT5 duplicate detection uses:

```text
(mt5\_account\_id, mt5\_ticket)
```

## Delete Policy

Do not hard-delete data that has historical importance.

Use:

* `is\_archived = true` for trades
* `is\_active = false` for MT5 accounts

## MT5 Permanent Delete Policy

MT5 account permanent delete is allowed only when the account has no connected trades.

The check must happen in the backend.

Frontend-only protection is not enough.

## Migrations

Current project state:

* manual SQL ALTER TABLE changes are still used

Planned improvement:

* add Alembic in Sprint 18 or later

\---
