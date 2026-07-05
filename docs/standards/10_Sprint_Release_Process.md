# Sprint Release Process

At the end of every important Sprint update:

1. CHANGELOG.md
2. DECISIONS.md
3. BACKLOG.md
4. PROJECT_MASTER.md
5. PROJECT_HISTORY.md
6. README.md if needed
7. NEXT_CHAT_PROMPT.md

---

## Sprint 20 Process Update

From Sprint 21 onward, TradePilot Pro development should follow this process:

```text
Sprint Planning
        ↓
Architecture Review
        ↓
Implementation
        ↓
Verification
        ↓
Documentation Update
        ↓
Git Release
```

---

## Required Sprint Design Pack

Before starting a new major feature sprint, create a small Sprint Design section covering:

1. Goal
2. Files that will change
3. New folders, if any
4. New components
5. API changes
6. Database changes
7. Documentation impact
8. Verification steps

---

## Documentation Rule

Index files should remain clean.

Real documentation content belongs in the correct modular subfolder.

Examples:

```text
docs/project/
docs/standards/
docs/decisions/
docs/history/
docs/changelog/
docs/backlog/
```

---

## Source Structure Rule

Whenever the folder structure changes, update:

```text
docs/SOURCE_CODE_STRUCTURE.md
```

This file is a living developer handbook and should be read at the start of new development sessions.

---
