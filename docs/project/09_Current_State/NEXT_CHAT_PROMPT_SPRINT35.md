# TradePilot Pro — Sprint 35 (Version 1 Final Validation)

Διάβασε πρώτα ολόκληρο το `PROJECT_BOOTSTRAP.md` και στη συνέχεια όλο το Documentation Pack πριν γράψεις ή προτείνεις κώδικα.

## Υποχρεωτική αρχική διαδικασία

1. Επιβεβαίωσε ότι το ενεργό branch είναι `feature/multi-user-rebuild`.
2. Διάβασε το `Current_Project_Status.md` και το `11_ACTIVE_SPRINT.md`.
3. Έλεγξε πρώτα το πραγματικό `git status` και το πλήρες diff.
4. Κάνε audit όλων των αλλαγών του Sprint 34 πριν διορθώσεις οτιδήποτε.
5. Μην γράψεις νέο κώδικα χωρίς επιβεβαιωμένο release-blocking πρόβλημα.
6. Τήρησε αυστηρά τη D-062 και όλες τις νεότερες ενεργές αποφάσεις.
7. Μην δημιουργήσεις duplicate service, repository, API, model ή component.
8. Μην αλλάξεις αρχιτεκτονική ή υπάρχοντα business contracts χωρίς τεκμηριωμένο λόγο.

## Στόχος Sprint 35

Πλήρης τελική επικύρωση της Version 1 και προετοιμασία του branch για user-approved commit και merge decision.

## Υποχρεωτικοί έλεγχοι

### Backend

- `python -m compileall app`
- `python -m unittest discover -s tests -p "test_*.py" -v`
- Authentication, authorization, inactive users και token behavior.
- Admin create/edit/reset-password και self-protection.
- Cross-user isolation για Trades, Dashboard, Portfolio και MT5.
- MT5 Sync repeatability και manual-ticket reconciliation.
- Manual closed trade στο Portfolio.

### Frontend

- `npm run build`
- Public/protected/admin routes.
- Login/logout και recovery flows.
- Trade create/edit validation.
- Duplicate MT5 ticket error message.
- Trading System και Psychology dropdowns.
- Smoke test σε Dashboard, Portfolio, Analytics, Psychology, Reports και Market Alerts.

### Database

- Επιβεβαίωσε τα required User/Trade fields και ownership indexes.
- Επιβεβαίωσε τα indexes:
  - `uq_trades_user_account_position`
  - `uq_trades_user_manual_position`
- Επιβεβαίωσε ότι δεν υπάρχουν duplicate canonical MT5 identities.

## Κανόνες εργασίας

- Πρώτα audit και validation.
- Μετά μόνο proven fixes.
- Ένα μικρό ολοκληρωμένο package κάθε φορά.
- Ολόκληρα αρχεία για copy/paste όταν αλλάζει αρχείο.
- Compile/build/test μετά από κάθε package.
- Καμία άσχετη αλλαγή.
- Καμία αλλαγή provider για Market Alerts σε αυτό το Sprint.

## Τέλος Sprint

Μόνο όταν περάσουν όλοι οι έλεγχοι:

1. ενημέρωσε το Documentation Pack,
2. ενημέρωσε Current Project Status και Known Limitations,
3. έλεγξε μαζί με τον χρήστη το `git status` και το diff,
4. πρότεινε ακριβές commit message,
5. περίμενε ρητή επιβεβαίωση πριν το commit.
