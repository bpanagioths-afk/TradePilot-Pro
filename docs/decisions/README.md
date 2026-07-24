# TradePilot Pro — Architecture Decisions

This folder contains architectural, product, workflow, frontend, backend, MT5 and documentation decisions.

## Start here

1. [DECISION_STATUS_REGISTRY.md](DECISION_STATUS_REGISTRY.md)
2. [INDEX_BY_CATEGORY.md](INDEX_BY_CATEGORY.md)
3. The active decision files relevant to the current package

## Status model

- **Active** — independently authoritative.
- **Consolidated** — intent preserved under another active decision.
- **Superseded** — historical record; no longer a separate operating rule.
- **Historical reference** — useful implementation history, but not the current general authority.

The registry is authoritative when a legacy file still contains an older `Status: Accepted` header.

## Decision-writing rule

A new decision must:

- solve a genuinely new architectural or product problem,
- avoid repeating an existing active decision,
- identify any decision it supersedes or consolidates,
- use a filename that matches its actual title,
- include status, context, decision, consequences and related decisions.

Long sprint summaries do not belong in decision files.
