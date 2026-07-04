# D-019

## Router → Service → Database

**Status**

ACCEPTED

### Decision

Όλα τα backend modules ακολουθούν την παρακάτω ροή:

Router

↓

Service

↓

Database

Οι Routers παραμένουν όσο το δυνατόν πιο "thin".

Όλη η επιχειρησιακή λογική μεταφέρεται στα Services.

### Reason

Η διάκριση αυτή επιτρέπει:

* καθαρότερο κώδικα
* ευκολότερο testing
* μεγαλύτερη επαναχρησιμοποίηση
* ασφαλέστερη συντήρηση



