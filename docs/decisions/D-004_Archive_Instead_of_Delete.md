# D-004

## Archive instead of Delete for MT5 Trades

Status: ACCEPTED

Decision

Δεν διαγράφουμε hard-delete MT5 imported trades.

Χρησιμοποιούμε:

```text
is\\\_archived = true
```

Reason

Αν ένα imported MT5 trade διαγραφεί φυσικά, μπορεί να επανεισαχθεί στον επόμενο συγχρονισμό.

Επίσης μπορεί να χαθούν σημειώσεις, screenshots, psychology data και ιστορικό αξιολόγησης.

Product Principle

```text
Protect historical data first.
```



