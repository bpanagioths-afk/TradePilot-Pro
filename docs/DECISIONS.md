# TradePilot Pro - Architecture Decisions

> Αυτό το έγγραφο περιέχει όλες τις σημαντικές τεχνικές και αρχιτεκτονικές αποφάσεις του TradePilot Pro.
>
> Οι αποφάσεις αυτές θεωρούνται Accepted και δεν αλλάζουν χωρίς σοβαρό λόγο.

\---

# D-001

## Internal Trade ID

Status: ACCEPTED

Decision

Το `Trade.id` είναι πάντα το εσωτερικό Primary Key της βάσης.

Δεν χρησιμοποιείται ποτέ MT5 Ticket σαν Primary Key.

Reason

Το ίδιο MT5 ticket μπορεί να υπάρχει σε διαφορετικούς λογαριασμούς.

\---

# D-002

## MT5 Ticket

Status: ACCEPTED

Decision

Το MT5 Ticket αποθηκεύεται στο:

```text
mt5\_ticket
```

Reason

Χρησιμοποιείται μόνο σαν external reference.

\---

# D-003

## MT5 Duplicate Detection

Status: ACCEPTED

Decision

Ο έλεγχος duplicate γίνεται με:

```text
(mt5\_account\_id, mt5\_ticket)
```

Reason

Υποστήριξη πολλών MT5 λογαριασμών.

\---

# D-004

## Archive instead of Delete

Status: ACCEPTED

Decision

Δεν διαγράφουμε MT5 trades.

Χρησιμοποιούμε:

```text
is\_archived = true
```

Reason

Το Delete προκαλεί επανεισαγωγή στον επόμενο συγχρονισμό και χάνεται ιστορικό.

\---

# D-005

## One Trade belongs to One MT5 Account

Status: ACCEPTED

Decision

Κάθε Trade πρέπει να συνδέεται με έναν MT5 Account.

Reason

Portfolio Analytics, Multi Broker Support και Prop Firms.

\---

# D-006

## Multiple Trading Plans

Status: ACCEPTED

Decision

Ένας χρήστης μπορεί να έχει πολλά Trading Plans.

Examples

* Forex Conservative
* Gold Scalping
* FTMO Challenge
* The5ers Swing

Reason

Διαφορετικές στρατηγικές χρειάζονται διαφορετικούς κανόνες.

\---

# D-007

## Rule Engine Philosophy

Status: ACCEPTED

Decision

Το Rule Engine βαθμολογεί Execution, όχι Profit.

Reason

Ένα χαμένο trade μπορεί να είναι άριστο.

Ένα κερδισμένο trade μπορεί να είναι κακό.

\---

# D-008

## Discipline over Profit

Status: ACCEPTED

Decision

Το σημαντικότερο KPI του συστήματος είναι το Discipline Index και όχι το Win Rate.

Reason

Η πειθαρχία οδηγεί στη μακροχρόνια κερδοφορία.

\---

# D-009

## Numeric Inputs

Status: ACCEPTED

Decision

Όλα τα numeric fields χρησιμοποιούν:

```text
NumericField.jsx
```

Reason

Υποστήριξη:

* `,`
* `.`
* Validation
* Min
* Max
* Decimal Rules

\---

# D-010

## Snackbar

Status: ACCEPTED

Decision

Δεν χρησιμοποιούμε:

```javascript
alert()
```

Reason

Όλο το UI χρησιμοποιεί Snackbar.

\---

# D-011

## Backend Services

Status: ACCEPTED

Decision

Business Logic πηγαίνει σε Services.

Routers μένουν thin.

Reason

Καθαρότερη αρχιτεκτονική.

\---

# D-012

## Safe Development

Status: ACCEPTED

Decision

Προτιμώνται μικρά ασφαλή βήματα.

Δεν γίνονται μεγάλα rewrites χωρίς λόγο.

Reason

Μειώνονται τα bugs.

\---

# D-013

## Code Instructions

Status: ACCEPTED

Decision

Οι οδηγίες ανάπτυξης δίνονται πάντα με τη μορφή:

* Βρες αυτό
* Βάλε από κάτω αυτό
* Αντικατάστησε μόνο αυτό

Reason

Μειώνονται τα λάθη.

\---

# D-014

## Product Philosophy

Status: ACCEPTED

Decision

Το TradePilot Pro δεν είναι Trading Journal.

Είναι Trading Command Center.

Reason

Ο στόχος είναι να γίνει το κεντρικό εργαλείο ενός trader.

\---

# D-015

## No Ugly UI

Status: ACCEPTED

Decision

Όλα τα νέα modules πρέπει να ακολουθούν:

* καθαρό design
* επαγγελματικό UI
* συνεπή components
* επαναχρησιμοποιήσιμα στοιχεία

Reason

Η εμπειρία χρήσης είναι μέρος του προϊόντος.

\---

# D-016

## AI Coach

Status: ACCEPTED

Decision

Ο AI Coach δεν δίνει γενικές συμβουλές.

Χρησιμοποιεί:

* Trade Score
* Rule Engine
* Trading Plan
* Psychology
* Statistics
* Session
* History

Reason

Ο AI Coach πρέπει να βασίζεται στα πραγματικά δεδομένα του trader.

\---

# D-017

## Documentation First

Status: ACCEPTED

Decision

Κάθε σημαντική αρχιτεκτονική αλλαγή ενημερώνει την τεκμηρίωση.

Reason

Να μη χάνεται γνώση μεταξύ συνομιλιών και εκδόσεων.

\---

# D-018

## Schema First API

Status: ACCEPTED

Decision

Όλα τα νέα CRUD endpoints χρησιμοποιούν Pydantic Schemas για request και response.

Οι routers δεν πρέπει να δέχονται πολλά μεμονωμένα arguments όταν αυτά αποτελούν ένα λογικό αντικείμενο.

Reason

* Καλύτερη συντήρηση
* Type safety
* Καθαρό Swagger documentation
* Συμβατότητα με React forms
* Ευκολότερη επέκταση

\---

# D-019

## Router Service Database Flow

Status: ACCEPTED

Decision

Όλα τα νέα backend modules ακολουθούν τη ροή:

Router
↓
Service
↓
Database

Οι routers μένουν thin και δεν περιέχουν business logic.

Reason

Το project μεγαλώνει και χρειάζεται καθαρή αρχιτεκτονική, επαναχρησιμοποίηση και ευκολότερο testing.

\---

# D-020

## Soft Delete for MT5 Accounts

Status: ACCEPTED

Decision

Το `DELETE /mt5/accounts/{account\_id}` δεν διαγράφει φυσικά τον MT5 λογαριασμό.

Θέτει:

```text
is\_active = false
```

Reason

MT5 accounts μπορεί να έχουν ιστορικά trades. Η φυσική διαγραφή μπορεί να σπάσει foreign keys, ιστορικά δεδομένα και portfolio statistics.

\---

# D-021

## Sprint Release Process

Status: ACCEPTED

Decision

Μετά από κάθε σημαντικό Sprint ενημερώνονται με τη σειρά:

1. CHANGELOG.md
2. DECISIONS.md
3. BACKLOG.md
4. PROJECT\_MASTER.md
5. PROJECT\_HISTORY.md
6. README.md αν χρειάζεται
7. NEXT\_CHAT\_PROMPT.md

Reason

Να μη χάνεται γνώση ανάμεσα σε συνομιλίες και να υπάρχει πάντα καθαρό σημείο συνέχειας.

\---

# D-022

## Maximum Component Size

Status: ACCEPTED

Decision

React components πρέπει ιδανικά να μένουν κάτω από περίπου 200-250 γραμμές.

Όταν ένα component μεγαλώνει πολύ, σπάει σε μικρότερα reusable components.

Reason

Μεγαλύτερα components δυσκολεύουν debugging, testing, reuse και μελλοντικές αλλαγές.

Αυτή η απόφαση γεννήθηκε όταν το `Settings.jsx` έφτασε περίπου 470 γραμμές κατά το Sprint 17.3 και έγινε refactor σε `MT5AccountsManager` και `MT5AccountCard`.

\---

# D-023

## Design System First

Status: ACCEPTED

Decision

Πριν μεγαλώσει σημαντικά το UI, δημιουργείται κοινό TradePilot Design System.

Το Design System θα ορίζει:

* Cards
* Buttons
* Badges
* Status colors
* Spacing
* Typography
* Hover styles
* Common UI patterns

Reason

Το TradePilot Pro θα αποκτήσει πολλά modules και οθόνες.

Χωρίς κοινό Design System, το UI θα γίνει ασυνεπές και δύσκολο στη συντήρηση.

\---

# D-024

## Future SaaS Ready Architecture

Status: ACCEPTED

Decision

Το TradePilot Pro πρέπει να αναπτύσσεται με τρόπο που να μπορεί μελλοντικά να γίνει multi-user SaaS προϊόν.

Μελλοντική έκδοση μπορεί να υποστηρίζει:

* User login
* Password
* Provider subscription pass key
* Monthly subscription validation
* Per-user MT5 accounts
* Secure broker credentials
* License / subscription enforcement

Reason

Η τρέχουσα έκδοση είναι local-first, αλλά δεν πρέπει ο κώδικας να κλειδώσει το προϊόν σε έναν μόνο trader.

\---

# D-025

## Permanent Delete Policy for MT5 Accounts

Status: ACCEPTED

Decision

MT5 Account μπορεί να διαγραφεί μόνιμα μόνο αν δεν υπάρχουν συνδεδεμένα trades.

Αν υπάρχουν trades, επιτρέπεται μόνο soft delete / disable.

Ο έλεγχος πρέπει να γίνεται στο backend, όχι μόνο στο frontend.

Reason

Η φυσική διαγραφή λογαριασμού με ιστορικά trades μπορεί να χαλάσει foreign keys, portfolio analytics και trading history.

\---

# D-026

## Product Quality Pipeline

Status: ACCEPTED

Decision

Κάθε νέο module ολοκληρώνεται σε 3 στάδια:

Functionality
↓
Architecture
↓
Professional UX

Reason

Το TradePilot Pro αναπτύσσεται ως εμπορικό προϊόν και όχι ως απλή εφαρμογή.

Δεν αρκεί να λειτουργεί. Πρέπει να έχει καθαρό κώδικα και επαγγελματική εμπειρία χρήστη.

\---

# D-027

## Stable UI State before More Features

Status: ACCEPTED

Decision

Πριν προστεθούν πολλές νέες λειτουργίες σε ένα UI module, πρέπει να σταθεροποιείται η κατάσταση και η σειρά εμφάνισης των δεδομένων.

Reason

Κατά το Sprint 17.3, μετά από Activate / Disable, η λίστα MT5 accounts άλλαζε σειρά και το Actions Menu έδειχνε σαν να κολλάει.

Η λύση ήταν stable sorting με internal `id`.

\---

# D-028

## MT5 Now, Trading Connections Later

Status: ACCEPTED

Decision

Δεν μετονομάζουμε ακόμα το backend ή τα modules από MT5 σε Trading Connections.

Η γενίκευση θα γίνει όταν προστεθεί δεύτερη πραγματική πλατφόρμα, όπως cTrader, DXTrade, MatchTrader ή άλλο broker integration.

Reason

Πρόωρο rename χωρίς δεύτερη πλατφόρμα δημιουργεί τεχνικό χρέος χωρίς άμεσο όφελος.

Το Sprint 18 θα βελτιώσει πρώτα το MT5 Account Manager UI σε επαγγελματικό επίπεδο.

\---

# Future Decisions

Οι νέες αποφάσεις προστίθενται πάντα στο τέλος του αρχείου.

Δεν τροποποιούνται παλιές αποφάσεις εκτός αν υπάρχει σοβαρός αρχιτεκτονικός λόγος.

