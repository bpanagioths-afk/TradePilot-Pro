# TradePilot Pro — Sprint 36

## Υποχρεωτική διαδικασία πριν γραφτεί οποιοσδήποτε κώδικας

1. Διάβασε ολόκληρο το `PROJECT_BOOTSTRAP.md`.
2. Διάβασε ολόκληρο το Documentation Pack από τον φάκελο `docs`.
3. Επιβεβαίωσε το ενεργό branch και το πραγματικό `git status`.
4. Διάβασε τον πραγματικό κώδικα πριν προτείνεις αλλαγή.
5. Κάνε πλήρες audit του Sprint 36 scope.
6. Τήρησε αυστηρά τη D-062 και όλες τις νεότερες ενεργές αποφάσεις.

## Κανόνες

- Μην κάνεις υποθέσεις.
- Μην προτείνεις λύση πριν διαβάσεις τον πραγματικό κώδικα.
- Μην δημιουργήσεις duplicate APIs, services, repositories ή components.
- Επέκτεινε μόνο υπάρχουσα υλοποίηση.
- Μην αλλάξεις αρχιτεκτονική χωρίς τεκμηριωμένο λόγο.
- Κάθε πρόταση αλλαγής πρέπει να αναφέρει σε ποιο υπάρχον αρχείο βασίζεται.
- Αν κάτι δεν επιβεβαιώνεται από κώδικα ή Documentation Pack, δήλωσέ το καθαρά.
- Όταν ο χρήστης απαντά «οκ έτοιμο», συνέχισε αμέσως στο επόμενο βήμα.

## Επιβεβαιωμένη κατάσταση μετά το Sprint 35

- Multi-user authentication, registration and administrator workflows λειτουργούν.
- Trades, Dashboard, Portfolio, MT5, Trading Plans, Rule Engine and exports είναι user-scoped.
- Safe Trade Delete confirmation έχει υλοποιηθεί.
- CSV, PDF and Excel exports χρησιμοποιούν authenticated blob downloads.
- MT5 Sync διατηρεί τα χειροκίνητα Notes.
- Trading Plan Sessions, News Rules and Constitution είναι editable και αποθηκεύονται.
- Rule Engine χρησιμοποιεί το default Trading Plan του ενεργού χρήστη.
- Session aliases όπως `Asia Session` κανονικοποιούνται.
- Trade Score UI έχει ανασχεδιαστεί.
- One-click Windows launcher λειτουργεί μέσω:
  - `Start TradePilot Pro.vbs`
  - `start_tradepilot.ps1`

## Sprint 36 — Προτεινόμενο αρχικό scope

Πριν οριστικοποιηθεί το scope, κάνε audit του Documentation Pack και του πραγματικού branch.

Οι γνωστές εκκρεμότητες είναι:

1. **Settings Backup & Restore**
   - Το υπάρχον Settings UI περιέχει ανενεργή περιοχή Backup & Export.
   - Μην τη συνδέσεις με μη ασφαλές global export.
   - Audit πρώτα των user-owned models και των credentials που πρέπει να εξαιρεθούν.
   - Define ασφαλές backup contract πριν υλοποιηθεί import.
   - Επιβεβαίωσε αν import θα επιτρέπεται μόνο σε κενό account ή αν χρειάζεται άλλο documented policy.

2. **Rule Engine Risk per Trade**
   - Το Trade Score εμφανίζει σκόπιμα:
     `Risk per trade check is pending position size module`.
   - Μην αφαιρέσεις το warning χωρίς απόφαση.
   - Audit account balance/equity source, stop-loss monetary risk, lot size and symbol metadata before implementation.

3. **Final Version 1 release preparation**
   - Review final database ownership constraints.
   - Review launcher runtime-log ignore policy.
   - Review full diff and generated/local artifacts.
   - Decide merge/release/tag procedure only after validation.

## Υποχρεωτικό validation στην αρχή

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

## Τρόπος εργασίας

Για κάθε bug ή feature:

```text
Audit
Root cause
Plan
One small package
Compile
Test
Next package
```

Όχι πολλές άσχετες αλλαγές μαζί.

## Documentation

Το Documentation Pack βρίσκεται μέσα στο repository.

Μην ζητήσεις νέο Documentation Pack αν υπάρχει ήδη στο branch.

Στο τέλος του Sprint:

- ενημέρωσε όλα τα επηρεαζόμενα `.md`,
- ενημέρωσε `Current_Project_Status.md`,
- ενημέρωσε `11_ACTIVE_SPRINT.md`,
- δημιούργησε `NEXT_CHAT_PROMPT_SPRINT37.md`,
- και μόνο τότε κλείσε το Sprint με user-approved Git commit.
