# TradePilot Pro - Architecture Decisions

> Αυτό το έγγραφο περιέχει όλες τις σημαντικές τεχνικές και αρχιτεκτονικές αποφάσεις του TradePilot Pro.
>
> Οι αποφάσεις αυτές θεωρούνται "Accepted" και δεν αλλάζουν χωρίς σοβαρό λόγο.

---

# D-001

## Internal Trade ID

Status: ACCEPTED

Decision

Το Trade.id είναι πάντα το εσωτερικό Primary Key της βάσης.

Δεν χρησιμοποιείται ποτέ MT5 Ticket σαν Primary Key.

Reason

Το ίδιο MT5 ticket μπορεί να υπάρχει σε διαφορετικούς λογαριασμούς.

---

# D-002

## MT5 Ticket

Status: ACCEPTED

Decision

Το MT5 Ticket αποθηκεύεται στο:

mt5_ticket

Reason

Χρησιμοποιείται μόνο σαν external reference.

---

# D-003

## MT5 Duplicate Detection

Status: ACCEPTED

Decision

Ο έλεγχος duplicate γίνεται με:

(mt5_account_id, mt5_ticket)

Reason

Υποστήριξη πολλών MT5 λογαριασμών.

---

# D-004

## Archive instead of Delete

Status: ACCEPTED

Decision

Δεν διαγράφουμε MT5 trades.

Χρησιμοποιούμε:

is_archived = true

Reason

Το Delete προκαλεί επανεισαγωγή στον επόμενο συγχρονισμό και χάνεται ιστορικό.

---

# D-005

## One Trade belongs to One MT5 Account

Status: ACCEPTED

Decision

Κάθε Trade πρέπει να συνδέεται με έναν MT5 Account.

Reason

Portfolio Analytics
Multi Broker Support
Prop Firms

---

# D-006

## Multiple Trading Plans

Status: ACCEPTED

Decision

Ένας χρήστης μπορεί να έχει πολλά Trading Plans.

Παραδείγματα

- Forex Conservative
- Gold Scalping
- FTMO Challenge
- The5ers Swing

Reason

Διαφορετικές στρατηγικές χρειάζονται διαφορετικούς κανόνες.

---

# D-007

## Rule Engine Philosophy

Status: ACCEPTED

Decision

Το Rule Engine βαθμολογεί:

Execution

όχι

Profit

Reason

Ένα χαμένο trade μπορεί να είναι άριστο.

Ένα κερδισμένο trade μπορεί να είναι κακό.

---

# D-008

## Discipline over Profit

Status: ACCEPTED

Decision

Το σημαντικότερο KPI του συστήματος είναι:

Discipline Index

και όχι Win Rate.

Reason

Η πειθαρχία οδηγεί στη μακροχρόνια κερδοφορία.

---

# D-009

## Numeric Inputs

Status: ACCEPTED

Decision

Όλα τα numeric fields χρησιμοποιούν:

NumericField.jsx

Reason

Υποστήριξη:

- ,
- .
- Validation
- Min
- Max
- Decimal Rules

---

# D-010

## Snackbar

Status: ACCEPTED

Decision

Δεν χρησιμοποιούμε:

alert()

Reason

Όλο το UI χρησιμοποιεί Snackbar.

---

# D-011

## Backend Services

Status: ACCEPTED

Decision

Business Logic

↓

Services

Routers

↓

Thin

Reason

Καθαρότερη αρχιτεκτονική.

---

# D-012

## Safe Development

Status: ACCEPTED

Decision

Προτιμώνται μικρά ασφαλή βήματα.

Δεν γίνονται μεγάλα rewrites χωρίς λόγο.

Reason

Μειώνονται τα bugs.

---

# D-013

## Code Instructions

Status: ACCEPTED

Decision

Οι οδηγίες ανάπτυξης δίνονται πάντα με τη μορφή:

- Βρες αυτό
- Βάλε από κάτω αυτό
- Αντικατάστησε μόνο αυτό

Reason

Μειώνονται τα λάθη.

---

# D-014

## Product Philosophy

Status: ACCEPTED

Decision

Το TradePilot Pro δεν είναι Trading Journal.

Είναι:

Trading Command Center.

Reason

Ο στόχος είναι να γίνει το κεντρικό εργαλείο ενός trader.

---

# D-015

## No Ugly UI

Status: ACCEPTED

Decision

Όλα τα νέα modules πρέπει να ακολουθούν:

- καθαρό design
- επαγγελματικό UI
- συνεπή components
- επαναχρησιμοποιήσιμα στοιχεία

Reason

Η εμπειρία χρήσης είναι μέρος του προϊόντος.

---

# D-016

## AI Coach

Status: ACCEPTED

Decision

Ο AI Coach δεν δίνει γενικές συμβουλές.

Χρησιμοποιεί:

- Trade Score
- Rule Engine
- Trading Plan
- Psychology
- Statistics
- Session
- History

Reason

Ο AI Coach πρέπει να βασίζεται στα πραγματικά δεδομένα του trader.

---

# D-017

## Documentation First

Status: ACCEPTED

Decision

Κάθε σημαντική αρχιτεκτονική αλλαγή ενημερώνει:

- PROJECT_MASTER.md
- CHANGELOG.md
- BACKLOG.md
- DECISIONS.md

Νέα Απόφαση (D-018)

Schema First API

Status: ACCEPTED

Decision

Όλα τα νέα CRUD endpoints χρησιμοποιούν Pydantic Schemas για request και response.

Οι routers δεν δέχονται πολλά μεμονωμένα arguments όταν αυτά αποτελούν ένα λογικό αντικείμενο.

Reason

Καλύτερη συντήρηση
Type safety
Αυτόματο Swagger documentation
Συμβατότητα με React
Ευκολότερη επέκταση


Reason

Να μην χάνεται γνώση μεταξύ συνομιλιών και εκδόσεων.

---

# Future Decisions

Οι νέες αποφάσεις θα προστίθενται πάντα στο τέλος του αρχείου.

Δεν τροποποιούνται παλιές αποφάσεις εκτός αν υπάρχει σοβαρός αρχιτεκτονικός λόγος.