# D-011

## Backend Services

Status: ACCEPTED

Decision

Το business logic πηγαίνει σε services.

Οι routers μένουν thin.

Reason

Το project μεγαλώνει και χρειάζεται καθαρή αρχιτεκτονική.

Services διευκολύνουν:

* reuse
* testing
* debugging
* future background jobs
* future SaaS logic

Implementation Rule

Router responsibility:

* receive request
* validate through schema
* call service
* return response

Service responsibility:

* database queries
* business rules
* create / update / archive logic
* external integration handling

\---



