# D-061 — Single Entry Point and Startup Verification

## Status

Active

## Decision

Every new TradePilot Pro conversation starts from:

`docs/START_HERE.md`

Before implementation, the conversation must verify:

- GitHub repository access,
- active branch,
- current version and sprint,
- active package,
- locked scope,
- required sources already read.

File Library search is not a substitute for checking Git when the project repository is connected.

## Consolidates

- the startup parts of D-017,
- the continuation parts of D-021,
- D-060 startup enforcement,
- previous sprint-specific bootstrap instructions.

## Consequence

Sprint-specific `NEXT_CHAT_PROMPT_*` files remain historical or transitional references, but `START_HERE.md` is the permanent entry point.
