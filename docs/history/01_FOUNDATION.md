# TradePilot History - Foundation

# TradePilot Pro - Project History

> Η ιστορία του TradePilot Pro.
>
> Το αρχείο αυτό ΔΕΝ περιγράφει μόνο κώδικα.
>
> Περιγράφει γιατί πάρθηκαν σημαντικές αποφάσεις.
>
> Στόχος είναι να μη χαθεί ποτέ η γνώση του project.

\---

---

# Chapter 1

## Η αρχική ιδέα

Το TradePilot Pro ξεκίνησε ως ένα απλό Trading Journal.

Αρχικός στόχος ήταν:

* αποθήκευση trades
* βασικά στατιστικά
* dashboard
* αναφορές

Σύντομα έγινε φανερό ότι η αγορά διαθέτει ήδη πολλά Trading Journals.

Έτσι αποφασίστηκε το TradePilot Pro να εξελιχθεί σε κάτι μεγαλύτερο.

\---

---

# Chapter 3

## Η φιλοσοφία Process over Profit

Κατά την ανάπτυξη διαπιστώθηκε ότι:

ένα σωστό trade μπορεί να χάσει.

ένα λάθος trade μπορεί να κερδίσει.

Έτσι αποφασίστηκε ότι:

Το πρόγραμμα δεν θα βαθμολογεί μόνο το αποτέλεσμα.

Θα βαθμολογεί την εκτέλεση.

Από εδώ γεννήθηκε το Rule Engine.

\---

---

# Chapter 4

## Rule Engine

Αρχικά υπήρχε η σκέψη να χρησιμοποιηθεί AI.

Η ιδέα εγκαταλείφθηκε ως πρώτο βήμα.

Αποφασίστηκε πρώτα να δημιουργηθεί deterministic Rule Engine.

Ο λόγος:

Το AI πρέπει να βασίζεται σε αντικειμενικά δεδομένα.

Όχι σε εικασίες.

\---

---

# Chapter 5

## Trade Score

Αρχικά υπήρχε μόνο Profit.

Μετά Win Rate.

Τελικά αποφασίστηκε Trade Score.

Το Score βασίζεται στην ποιότητα της εκτέλεσης.

Όχι στο οικονομικό αποτέλεσμα.

\---

---

# Chapter 6

## Discipline Index

Μετά το Trade Score γεννήθηκε η ιδέα του Discipline Index.

Στόχος:

Να μετρά την πειθαρχία.

Όχι την τύχη.

Θεωρείται ένας από τους βασικούς πυλώνες του προϊόντος.

\---

---

# Chapter 7

## Trading Plans

Αρχικά υπήρχε ένα μόνο Trading Plan.

Αργότερα διαπιστώθηκε ότι ο ίδιος trader μπορεί να χρησιμοποιεί:

* Forex
* Gold
* Swing
* FTMO
* The5ers

Έτσι αποφασίστηκε η υποστήριξη πολλών Trading Plans.

\---

---

# Chapter 8

## NumericField

Αφορμή

Το ελληνικό πληκτρολόγιο χρησιμοποιεί `,` ενώ η JavaScript χρησιμοποιεί `.`.

Απόφαση

Δημιουργία NumericField component.

Στόχος

Όλα τα numeric inputs του project να χρησιμοποιούν το ίδιο component.

\---

---

# Chapter 9

## Snackbar

Αρχικά χρησιμοποιούνταν `alert()`.

Η εμπειρία χρήσης θεωρήθηκε κακή.

Απόφαση

Όλα τα notifications χρησιμοποιούν Snackbar.

\---

---

# Chapter 14

## Documentation First

Καθώς το project μεγάλωνε, έγινε εμφανές ότι πολλές αποφάσεις κινδύνευαν να χαθούν.

Έτσι δημιουργήθηκαν:

* PROJECT\_MASTER.md
* CHANGELOG.md
* BACKLOG.md
* DECISIONS.md
* PROJECT\_HISTORY.md

Στόχος

Κάθε νέα συνομιλία να μπορεί να συνεχίζει την ανάπτυξη χωρίς να χάνεται γνώση.

\---

---

# Chapter 16

## Development Standards

Μετά το Sprint 17.2 αποφασίστηκε η δημιουργία ξεχωριστού αρχείου `DEVELOPMENT\_STANDARDS.md`.

Ο λόγος είναι ότι το project χρειάζεται όχι μόνο αποφάσεις και ιστορικό, αλλά και σαφείς κανόνες για το πώς γράφεται ο κώδικας.

Οι κανόνες αυτοί περιλαμβάνουν:

* μικρά ασφαλή βήματα
* όχι μεγάλα rewrites χωρίς λόγο
* routers χωρίς business logic
* services για επιχειρησιακή λογική
* schemas για request / response
* soft delete όπου υπάρχει ιστορικό
* Snackbar αντί για alert
* NumericField για numeric inputs

Αυτό έγινε ώστε κάθε επόμενο Sprint να ξεκινά με κοινό τρόπο σκέψης και σταθερή τεχνική ποιότητα.

\---
