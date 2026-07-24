# TradePilot Pro — START HERE

> This is the single entry point for every new TradePilot Pro conversation.

## 1. Source access

Before asking the user to upload files:

1. Check whether the GitHub connector is available.
2. Open repository `bpanagioths-afk/TradePilot-Pro`.
3. Use branch `feature/multi-user-rebuild` unless `Current_Project_Status.md` declares another active branch.
4. Read the required files directly from Git.
5. Only request an upload when the required source cannot be retrieved from Git, and state exactly which file or path is unavailable.

A previous conversation may already have authorized GitHub access. Availability must be checked in the current conversation instead of assuming that access is absent.

## 2. Mandatory reading order

Read these files completely and in this order:

1. `docs/START_HERE.md`
2. `docs/PROJECT_BOOTSTRAP.md`
3. `docs/project/09_Current_State/Current_Project_Status.md`
4. `docs/project/11_ACTIVE_SPRINT.md`
5. `docs/project/09_Current_State/NEXT_CHAT_PROMPT_SPRINT32.md` while Sprint 31B remains active
6. `docs/decisions/DECISION_STATUS_REGISTRY.md`
7. Only the active decisions relevant to the current package
8. The actual source files that may be modified

Do not begin implementation before completing this sequence.

## 3. Startup verification

The first technical response must state:

- repository and branch read,
- current version and sprint,
- active package,
- locked scope,
- source files already audited,
- missing information, if any.

Do not use generic opening messages. Do not ask for files that are available in Git.

## 4. Current continuation target

Current continuation target:

- Product: TradePilot Pro
- Version: 1.0 in progress
- Active Sprint: Sprint 31B
- Package: Admin Frontend and User Management UI
- Locked: Sprint 31A backend, unless a verified backend defect is found

The current-state documents remain the authority if these values change.

## 5. Failure rule

When a required file cannot be found:

1. Search Git by exact path and filename.
2. Search the documentation indexes.
3. Check the active branch.
4. Report the exact failed path.
5. Ask for only that missing source.

Never conclude that the project context is unavailable merely because File Library search returned no result.
