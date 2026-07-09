# TradePilot Pro - Documentation Map

This file is the central map for the TradePilot Pro documentation system.

## Root Documentation

|File|Role|
|-|-|
|`README.md`|Project entry point|
|`docs/README.md`|Documentation entry point|
|`docs/PROJECT\_MASTER.md`|Product and architecture overview|
|`docs/DEVELOPMENT\_STANDARDS.md`|Engineering standards overview|
|`docs/DECISIONS.md`|Architecture Decision Records index|
|`docs/PROJECT\_HISTORY.md`|Product history index|
|`docs/CHANGELOG.md`|Sprint release index|
|`docs/BACKLOG.md`|Product roadmap index|
|`docs/DESIGN\_SYSTEM.md`|UI / UX design guide|
|`docs/project/09_Current_State/Current_Project_Status.md`|Operational snapshot of the latest completed sprint|
|`docs/project/09_Current_State/NEXT_CHAT_PROMPT_SPRINT*.md`|Handover prompt for the next development chat|

\---

## Documentation Folders

```text
docs/
│
├── project/       Product vision, architecture and module overview
├── standards/     Engineering standards and coding rules
├── decisions/     Architecture Decision Records
├── history/       Historical product evolution
├── sprints/       Sprint changelog and release notes
├── roadmap/       Backlog and product roadmap
└── design/        Detailed design system documentation
```

\---

## Reading Order for a New Chat

Before continuing development:

1. `docs/PROJECT\_MASTER.md`
2. `docs/CHANGELOG.md`
3. `docs/BACKLOG.md`
4. `docs/DECISIONS.md`
5. `docs/DEVELOPMENT\_STANDARDS.md`
6. `docs/DESIGN\_SYSTEM.md`
7. `docs/DOCUMENTATION\_MAP.md`

\---

## Current Active Direction

Current active sprint:

```text
Sprint 23 - Portfolio Analytics Dashboard
```

Current product direction:

```text
Trading Journal
↓
Trading Command Center
↓
Professional Desktop Trading Platform
```

Current frontend architecture:

```text
Application Pages
↓
Feature Modules
↓
Dashboard Components
↓
Widget Infrastructure v3
↓
TradePilot UI Framework
↓
Material UI
```

\---

## Documentation Rule

Every important change must update the correct documentation area.

Do not put everything into one large file.

Each topic must have one clear home.

---

## Sprint Handover Documents

The current-state folder is the operational handover area for new chats.

Key files:

|File|Purpose|
|-|-|
|`docs/project/09_Current_State/Current_Project_Status.md`|Current project snapshot and latest completed sprint status|
|`docs/project/09_Current_State/NEXT_CHAT_PROMPT_SPRINT*.md`|Mandatory next-chat prompt for the next sprint|
|`docs/SOURCE_CODE_STRUCTURE.md`|Developer map for the real source-code structure|

Rule:

Before a new sprint begins, read the current-state files and the source-code structure document before writing code.

---

## Release Documentation Rule

Every important sprint should close with:

```text
Code Verification
↓
Documentation Update
↓
Git Commit
↓
Next Chat Prompt
```

The documentation is not an afterthought. It is the project memory and the handover system between chats.

