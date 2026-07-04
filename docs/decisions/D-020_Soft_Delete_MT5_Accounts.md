# D-020

## Soft Delete for MT5 Accounts

**Status**

ACCEPTED

### Decision

Το DELETE ενός MT5 Account πραγματοποιεί soft delete θέτοντας `is\\\_active = false`.

### Reason

Προστατεύεται το ιστορικό, τα foreign keys και τα portfolio analytics.

\---



