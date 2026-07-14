# D-055 — Multi-Asset MT5 Engine

Status: Accepted

Decision:

MT5 synchronization and movement calculations must support multiple asset classes:

- Forex
- JPY currency pairs
- Indices
- Metals
- Stocks
- Crypto
- CFDs

The system must use broker-provided symbol metadata and must not assume that every instrument uses Forex pip conventions.

A future canonical model must distinguish movement value and movement unit where necessary.

Reason:

A single `profit_pips` assumption produces misleading values for non-Forex instruments.
