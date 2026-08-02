# TradePilot Pro — Sprint 36

Το Sprint 35 έχει ήδη ολοκληρωθεί, γίνει commit και push.

## Επιβεβαιωμένη αφετηρία

```text
Branch: feature/multi-user-rebuild
Sprint 35 closing commit:
9ab0c0d25b0f6be3bb26912d53ab598ffd50f99f

Commit:
Sprint 35: Complete multi-user hardening and Version 1 release preparation
```

Το local `HEAD` και το `origin/feature/multi-user-rebuild` επιβεβαιώθηκαν στο ίδιο commit.

**Μην ξανανοίξεις το Sprint 35** και μην το χαρακτηρίσεις ως εκκρεμές, εκτός αν το πραγματικό Git δείξει διαφορετική κατάσταση.

## Υποχρεωτική αρχική διαδικασία

1. Διάβασε ολόκληρο το `PROJECT_BOOTSTRAP.md`.
2. Διάβασε ολόκληρο το Documentation Pack.
3. Διάβασε τον πραγματικό κώδικα του branch.
4. Επιβεβαίωσε μία φορά:

```powershell
git branch --show-current
git status -sb
git log -1 --oneline
```

5. Αν το branch είναι καθαρό και το τελευταίο commit είναι το `9ab0c0d`, ξεκίνα αμέσως το Sprint 36 audit.
6. Μην ζητήσεις ξανά πλήρες Sprint 35 validation.
7. Μην ζητήσεις `docs.zip`, αφού το Documentation Pack βρίσκεται στο repository.

## Υποχρεωτικοί κανόνες

- Μην κάνεις υποθέσεις.
- Μην προτείνεις λύση πριν διαβάσεις τον πραγματικό κώδικα.
- Μην δημιουργήσεις duplicate APIs, services, repositories ή components.
- Επέκτεινε μόνο υπάρχουσα υλοποίηση.
- Μην αλλάξεις αρχιτεκτονική χωρίς τεκμηριωμένο λόγο.
- Κάθε αλλαγή πρέπει να αναφέρει το υπάρχον αρχείο στο οποίο βασίζεται.
- Αν κάτι δεν επιβεβαιώνεται, πες το καθαρά.
- Όταν ο χρήστης απαντά `οκ έτοιμο`, συνέχισε αμέσως χωρίς περίληψη.

## Τρόπος εργασίας

Για κάθε bug ή feature:

```text
Audit
Root Cause
Plan
One small package
Compile / Build
Test
Next package
```

Λιγότερη θεωρία. Καμία επανάληψη ήδη επιβεβαιωμένων στοιχείων.

## Επιβεβαιωμένη κατάσταση μετά το Sprint 35

- Login, Register, recovery και administrator workflows λειτουργούν.
- Trades, Dashboard, Portfolio, MT5, Trading Plans, Rule Engine και exports είναι user-scoped.
- Safe Trade Delete confirmation λειτουργεί.
- CSV, PDF και Excel exports είναι authenticated.
- MT5 Sync διατηρεί τα χειροκίνητα Notes.
- Trading Plan Markets, Sessions, News Rules και Constitution αποθηκεύονται.
- Rule Engine χρησιμοποιεί το default Trading Plan του ενεργού χρήστη.
- Session aliases όπως `Asia Session` κανονικοποιούνται.
- Trade Score UI έχει ολοκληρωθεί.
- One-click launcher λειτουργεί.
- Backend compile/tests και frontend build πέρασαν πριν το closing commit.

## Sprint 36 αρχικό scope

### Package A — Settings Backup and Restore

Πρώτα audit:

- `frontend/src/pages/Settings.jsx`
- υπάρχον export infrastructure,
- user-owned backend models,
- credentials/secrets που πρέπει να εξαιρεθούν,
- restore conflicts και duplicate policy.

Μην υλοποιήσεις restore πριν οριστεί και εγκριθεί ασφαλές contract.

### Package B — Rule Engine Risk per Trade

Το warning:

```text
Risk per trade check is pending position size module
```

παραμένει σκόπιμα.

Πριν από κώδικα, audit:

- account balance/equity,
- lot size,
- stop loss,
- symbol metadata,
- account currency,
- manual trades χωρίς πλήρη metadata.

### Package C — Version 1 Release Preparation

- database ownership constraints,
- launcher runtime logs και ignore policy,
- local/generated artifacts,
- merge/release/tag plan.

## Έναρξη

Αφού επιβεβαιώσεις το καθαρό branch και το commit `9ab0c0d`, ξεκίνα αμέσως το audit του **Settings Backup and Restore**.

Δώσε:

1. audit,
2. επιβεβαιωμένο root cause/current state,
3. μικρό σχέδιο,
4. πρώτο package.

Μην επαναλάβεις τους κανόνες και μην ζητήσεις αρχεία που υπάρχουν στο repository.

## Τέλος Sprint 36

- ενημέρωσε όλα τα επηρεαζόμενα `.md`,
- ενημέρωσε `Current_Project_Status.md`,
- ενημέρωσε `11_ACTIVE_SPRINT.md`,
- δημιούργησε `NEXT_CHAT_PROMPT_SPRINT37.md`,
- κάνε τελικό compile/tests/build,
- έλεγξε το Git diff με τον χρήστη,
- commit μόνο μετά από ρητή έγκριση.
