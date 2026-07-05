# D-034 - Account Summary API

## Status

Accepted

## Context

Sprint 19 introduced the Professional MT5 Trading Widget.

The existing MT5 Account Manager could list, create, edit, disable, activate and sync accounts, but it did not expose a single backend response containing the live and stored trading summary needed by a professional widget.

## Decision

Create a dedicated MT5 account summary backend flow:

```text
Schema
↓
Service
↓
Router
↓
React API
↓
React Widget
```

The accepted endpoint is:

```text
GET /mt5/accounts/{account_id}/summary
```

The summary response includes:

- account identity
- balance
- equity
- floating profit / loss
- open positions
- connection status
- import statistics
- last sync
- health message

## Consequences

The frontend widget does not calculate MT5 account health by itself.

The widget consumes a clean backend summary object.

This keeps router logic thin and UI logic focused on presentation.

## Future Notes

The same pattern can be reused for:

- Portfolio summaries
- Prop firm summaries
- Risk summaries
- AI Coach summaries
- Dashboard widgets

---
