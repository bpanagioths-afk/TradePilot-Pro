# TradePilot Pro — START HERE

> This is the single entry point for every new TradePilot Pro conversation.

---

# 1. Source access

Before asking the user to upload files:

1. Check whether the GitHub connector is available.
2. Open repository `bpanagioths-afk/TradePilot-Pro`.
3. Use branch `feature/multi-user-rebuild` unless `Current_Project_Status.md` declares another active branch.
4. Read the required files directly from Git.
5. Only request an upload when the required source cannot be retrieved from Git, and state exactly which file or path is unavailable.

A previous conversation may already have authorized GitHub access.
Availability must always be verified in the current conversation.

Never assume Git access is unavailable without checking first.

---

# 2. Mandatory reading order

Read these files completely and in this exact order.

## Phase A — Startup

1. `docs/START_HERE.md`
2. `docs/PROJECT_BOOTSTRAP.md`
3. `docs/project/09_Current_State/Current_Project_Status.md`
4. `docs/project/11_ACTIVE_SPRINT.md`

## Phase B — Current Sprint

5. Read the current NEXT_CHAT_PROMPT referenced by ACTIVE_SPRINT.
   (Example: `NEXT_CHAT_PROMPT_SPRINT32.md` while Sprint 31B is active.)

## Phase C — Decisions

6. `docs/decisions/DECISION_STATUS_REGISTRY.md`
7. Only the ACTIVE decisions required by the current package.

## Phase D — Source Audit

8. Audit the actual backend/frontend source files that belong to the active package.

Implementation must never begin before completing this reading sequence.

---

# 3. Startup verification

The first technical response must always include:

- Repository
- Active Branch
- Version
- Sprint
- Active Package
- Locked Scope
- Documentation audited
- Source files audited
- Missing information (if any)

Never use generic greetings.

Never ask for files that already exist in Git.

---

# 4. Current continuation target

Current values are determined by:

`Current_Project_Status.md`

Current synchronized target: Version 1.0 multi-user integration validation on `feature/multi-user-rebuild`.

Typical startup summary should include:

- Product
- Version
- Active Branch
- Current Sprint
- Current Package
- Package Status
- Locked Scope
- Validation State

If the status documents disagree with this file,
the status documents always win.

---

# 5. Startup execution rules

After reading the documentation:

1. Audit Git before making assumptions.

2. Identify the current package boundaries.

3. Verify whether the requested functionality already exists.

4. Reuse existing implementation whenever possible.

5. Never create duplicate APIs, services, repositories or components.

6. Respect Package First Development.

7. Respect Single Source of Information.

8. Respect Single Touch Rule.

9. Do not modify files outside the active package unless a verified dependency requires it.

10. Before writing code:

- audit
- verify
- then implement

Never implement first and audit afterwards.

---

# 6. Package lifecycle

Every package follows the same lifecycle.

1. Read Documentation
2. Audit Git
3. Audit Source Code
4. Implement
5. Validate
6. Update Documentation
7. Review Git Diff
8. Commit
9. Push
10. Update Current Project Status

Documentation update is mandatory before every commit.

---

# 7. Validation before Commit

A package is NOT considered complete until:

- Backend validation passes.
- Frontend validation passes.
- Package testing passes.
- Git diff reviewed.
- Documentation updated.
- Current project status updated.

Only then prepare the commit.

---

# 8. Failure rule

When a required file cannot be found:

1. Search Git by exact path.
2. Search documentation indexes.
3. Verify active branch.
4. Verify current sprint.
5. Report the exact missing path.
6. Request only the missing source.

Never conclude that project context is unavailable simply because File Library returned no results.

Never request the complete documentation if only one file is missing.
