# D-048 - One Feature, One Commit

Status: Accepted

## Decision

Each feature should be completed, tested and committed before starting the next feature.

## Workflow

```text
Audit
↓
Small feature
↓
Build
↓
Test
↓
Commit
↓
Push
↓
Clean git status
```

## Reason

Sprint 24 showed that mixing UI refactoring, feature integration and global widget changes in the same working tree makes rollback difficult.

## Rule

Do not accumulate unrelated changes across multiple features.
