# TradePilot Pro — Sprint 37

## Υποχρεωτική διαδικασία πριν γραφτεί οποιοσδήποτε κώδικας

1. Διάβασε ολόκληρο το `PROJECT_BOOTSTRAP.md`.
2. Διάβασε ολόκληρο το Documentation Pack.
3. Επιβεβαίωσε το ενεργό branch και το πραγματικό working tree.
4. Διάβασε τον πραγματικό κώδικα πριν προτείνεις αλλαγή.
5. Κάνε audit του Sprint 37 scope.
6. Τήρησε όλες τις ενεργές αποφάσεις, ιδιαίτερα:
   - D-049 Single Source of Information,
   - D-050 Audit Before New Code,
   - D-051 Single Touch Rule,
   - D-052 Package First Development,
   - D-062,
   - D-063 Progressive Refactoring Policy.

## Κανόνες

- Μην κάνεις υποθέσεις.
- Μην δημιουργήσεις duplicate APIs, services, repositories, importers ή components.
- Επέκτεινε την υπάρχουσα modular Backup/Import υλοποίηση.
- Μην αλλάξεις αρχιτεκτονική χωρίς τεκμηριωμένο λόγο.
- Κάθε αλλαγή να βασίζεται σε επιβεβαιωμένο υπάρχον αρχείο.
- Αν κάτι δεν μπορεί να επιβεβαιωθεί, δήλωσέ το.
- Όταν ο χρήστης γράφει «οκ έτοιμο», συνέχισε αμέσως.
- Δώσε ολόκληρο αρχείο όταν απαιτείται αλλαγή.
- Μην επαναλαμβάνεις κάθε φορά όσα ολοκληρώθηκαν.

## Επιβεβαιωμένη κατάσταση μετά το Sprint 36

- Safe user-scoped Backup Export λειτουργεί.
- Backup schema version: `1.0`.
- Backup περιλαμβάνει account preferences, trades και πολλαπλά Trading Plans.
- Passwords, tokens, administrator state, internal IDs and MT5 connection credentials εξαιρούνται.
- Preview Merge λειτουργεί.
- Transactional Merge Import λειτουργεί μέσω generic Import Engine.
- Trade duplicate prevention διατηρεί `mt5_ticket` και `mt5_position_id`.
- Replace mode δεν είναι ενεργό.
- Trading Plans υποστηρίζουν Load, New, Save, Save As και Set Default.
- Το Trading Plan UI έχει σπάσει σε μικρότερα components.
- Το Settings Backup backend έχει σπάσει σε export/preview/identity/engine/importers.
- Trading Sessions χρησιμοποιούν κοινό `marketHours.js`.
- Η D-063 είναι ενεργή.

## Sprint 37 — Audit-first scope

Μην οριστικοποιήσεις scope πριν διαβάσεις docs και πραγματικό branch.

### Υποψήφιο Package A — Final Version 1 Release Preparation

- Review full local diff and untracked files.
- Confirm tests and build.
- Confirm branch divergence from target branch.
- Define merge/release/tag procedure only after evidence.
- Do not merge or tag without explicit user approval.

### Υποψήφιο Package B — Backup Completeness Audit

Audit μόνο, πριν από κώδικα:

- Psychology ownership and portability.
- Trading System definitions ownership and portability.
- Market Alerts portability.
- MT5 account metadata that may be safely exported without credentials.
- Screenshot metadata versus binary files.
- Backward compatibility and future schema migration strategy.

Do not add sections without confirmed ownership and restore contracts.

### Υποψήφιο Package C — Replace Policy

Before implementation, document:

- mandatory destructive confirmation,
- account-empty requirement versus full replacement,
- deletion order and foreign-key safety,
- rollback behavior,
- pre-replace automatic backup,
- exact handling of defaults and identities.

Merge remains the safe default.

### Υποψήφιο Package D — Remaining Progressive Refactoring

Audit remaining large files first.

Refactor only when:

- multiple responsibilities are confirmed,
- behavior-preserving extraction is possible,
- build/test can run after each small package.

### Deferred Technical Scope

- Rule Engine Risk per Trade requires verified balance/equity, stop-loss monetary risk, lot size and symbol metadata.
- Market holidays require a documented and maintainable data source.
- Commercial-provider, billing, licensing, advanced RBAC and cloud MT5 remain future work.

## Validation

### Backend

```powershell
python -m compileall app
python -m unittest discover -s tests -p "test_*.py" -v
```

### Frontend

```powershell
npm run build
```

### Git

```powershell
git status -sb
git diff --stat
git diff --name-only
git ls-files --others --exclude-standard
```

## Workflow

```text
Audit
Root Cause
Plan
One small package
Compile
Test
Next package
```

## Documentation and Closing

At the end of Sprint 37:

- update `Current_Project_Status.md`,
- update `11_ACTIVE_SPRINT.md`,
- create `NEXT_CHAT_PROMPT_SPRINT38.md`,
- update affected decision/index files when required,
- commit only after explicit user approval.
