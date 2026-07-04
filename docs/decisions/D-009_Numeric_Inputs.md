# D-009

## Numeric Inputs

Status: ACCEPTED

Decision

Όλα τα numeric fields στο frontend πρέπει να χρησιμοποιούν:

```text
NumericField.jsx
```

Reason

Το ελληνικό πληκτρολόγιο και οι χρήστες συχνά χρησιμοποιούν κόμμα αντί για τελεία.

Το NumericField υποστηρίζει:

* `,`
* `.`
* validation
* min / max
* decimal rules
* σταθερή συμπεριφορά σε όλο το UI

Implementation Rule

Δεν δημιουργούμε τυχαία numeric inputs με απλό `TextField` όταν υπάρχει ανάγκη αριθμητικής εισαγωγής.

\---



