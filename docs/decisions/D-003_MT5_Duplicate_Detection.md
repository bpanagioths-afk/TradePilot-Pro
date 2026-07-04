# D-003

## MT5 Duplicate Detection

Status: ACCEPTED

Decision

Ο έλεγχος duplicate για MT5 trades γίνεται με τον συνδυασμό:

```text
(mt5\\\_account\\\_id, mt5\\\_ticket)
```

Reason

Ένας trader μπορεί να έχει πολλούς MT5 λογαριασμούς.

Το ίδιο ticket μπορεί να υπάρχει σε διαφορετικό MT5 account.

Implementation Rule

Δεν γίνεται duplicate check μόνο με `mt5\\\_ticket`.

\---



