# TradePilot Pro — Documentation Map

## Mandatory Startup Order

1. `docs/START_HERE.md`
2. `docs/PROJECT_BOOTSTRAP.md`
3. `docs/project/09_Current_State/Current_Project_Status.md`
4. `docs/project/11_ACTIVE_SPRINT.md`
5. The continuation file referenced by the active sprint.
6. `docs/decisions/DECISION_STATUS_REGISTRY.md`
7. Only the active decisions needed by the package.
8. The real backend and frontend source files in the active package.

## Authoritative Root Files

| File | Role |
|---|---|
| `START_HERE.md` | Permanent conversation entry point |
| `PROJECT_BOOTSTRAP.md` | Source priority, audit workflow and delivery rules |
| `README.md` | Documentation overview and current direction |
| `DOCUMENTATION_MAP.md` | This navigation map |
| `PROJECT_MASTER.md` | Product and architecture overview |
| `DEVELOPMENT_STANDARDS.md` | Engineering standards index |
| `DECISIONS.md` | Decision index |
| `PROJECT_HISTORY.md` | Consolidated product history |
| `CHANGELOG.md` | Consolidated sprint release index |
| `BACKLOG.md` | Roadmap index |
| `DESIGN_SYSTEM.md` | UI and UX guide |
| `SOURCE_CODE_STRUCTURE.md` | Real source-code handbook |

## Operational Current-State Files

| File | Role |
|---|---|
| `project/09_Current_State/Current_Project_Status.md` | Current version, branch, completed package and active package |
| `project/11_ACTIVE_SPRINT.md` | Locked sprint scope and Definition of Done |
| `project/09_Current_State/NEXT_CHAT_PROMPT_SPRINT35.md` | Sprint 35 final-validation continuation prompt |
| `decisions/DECISION_STATUS_REGISTRY.md` | Authority for active, consolidated and superseded decisions |

## Current Direction

```text
Version 1.0 in final validation
Sprint 34 regression recovery completed
Sprint 35 release-readiness validation active
```

## Folder Map

```text
docs/
├── project/       Product, architecture, modules and current state
├── standards/     Engineering, database, frontend and release standards
├── decisions/     Decision records and status registry
├── changelog/     Sprint-level release notes
├── history/       Product evolution and timeline
├── backlog/       Priorities and long-term vision
├── architecture/  Cross-module technical architecture
└── roadmap/       Roadmap navigation
```

## Release Documentation Rule

```text
Validation
↓
Documentation synchronization
↓
Git diff review
↓
Commit and push
↓
Current status and continuation update
```

## Version 1.0 Multi-User Map

| Need | Read |
|---|---|
| Current branch state | `project/09_Current_State/Current_Project_Status.md` |
| Remaining release work | `project/11_ACTIVE_SPRINT.md` |
| Authentication/admin source paths | `SOURCE_CODE_STRUCTURE.md` |
| Detailed branch changes | `changelog/13_VERSION_1_MULTI_USER_REBUILD.md` |
| SaaS boundary and future layers | `project/08_SAAS_ROADMAP.md` |
