# D-035 - Sync Engine Foundation

## Status

Accepted

## Context

The existing MT5 sync service imports MT5 history.

During Sprint 19, Auto Sync requirements appeared:

- enabled / disabled
- interval minutes
- last sync
- next sync
- waiting / due / ready status

Putting scheduler logic directly inside `mt5_sync.py` would mix responsibilities.

## Decision

Create a separate Sync Engine foundation.

The MT5 import service remains responsible for importing MT5 trades.

The Sync Engine becomes responsible for sync state and future scheduling.

Accepted separation:

```text
Sync Engine
     ↓
MT5 Sync Service
     ↓
Trading Journal Data
```

## Consequences

`mt5_sync.py` remains focused on MT5 import.

Future schedulers can be added without rewriting manual sync.

The architecture remains compatible with:

- Windows Service
- APScheduler
- SaaS scheduler
- multiple future data providers

## Future Notes

Sync Engine may later support:

- MT5
- TradingView bridge
- Economic Calendar
- Prop firm APIs
- Portfolio data feeds

---
