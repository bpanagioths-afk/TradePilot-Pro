# D-047 - Reuse Before New Code

Status: Accepted

## Decision

Before creating a new component, service or API endpoint, the project must check whether an equivalent implementation already exists.

## Required Check

1. Existing backend endpoint.
2. Existing frontend API service.
3. Existing shared component.
4. Existing feature component.
5. Existing dashboard widget.

## Reason

During Sprint 24, the MT5 account summary endpoint and frontend API functions already existed. The correct solution was to reuse them in the Dashboard MT5 widget instead of creating a new `/mt5/account-summary` endpoint.
