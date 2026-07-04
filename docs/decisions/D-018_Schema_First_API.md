# D-018

## Schema First API

**Status**

ACCEPTED

### Decision

Όλα τα νέα CRUD endpoints χρησιμοποιούν Pydantic Schemas.

Οι routers δεν πρέπει να δέχονται πολλά ανεξάρτητα arguments όταν αυτά αποτελούν μία λογική οντότητα.

Τυπικά χρησιμοποιούνται:

* Create Schema
* Update Schema
* Response Schema

### Reason

Η προσέγγιση αυτή προσφέρει:

* καλύτερη συντήρηση
* type safety
* καθαρό Swagger documentation
* ευκολότερη σύνδεση με React forms
* μελλοντική επεκτασιμότητα

\---



