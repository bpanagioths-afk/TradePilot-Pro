# D-001

## Internal Trade ID

Status: ACCEPTED

Decision

Το `Trade.id` είναι πάντα το εσωτερικό Primary Key της βάσης δεδομένων.

Δεν χρησιμοποιείται ποτέ MT5 Ticket ή άλλο external system id ως Primary Key.

Reason

Το ίδιο MT5 ticket μπορεί να υπάρχει σε διαφορετικούς λογαριασμούς ή brokers.

Το TradePilot Pro πρέπει να προστατεύει την εσωτερική ακεραιότητα των δεδομένων του.

Implementation Rule

```text
Trade.id = internal database id
Trade.mt5\\\_ticket = external MT5 reference
```



