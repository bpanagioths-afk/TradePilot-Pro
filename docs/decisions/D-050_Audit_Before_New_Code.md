\# D-050 - Audit Before Creating New Code



Status: Accepted



Date: 2026-07-11



\---



\## Decision



Before creating any new code, developers must first audit the existing project implementation.



This applies to:



\- Components

\- Pages

\- Feature Modules

\- Services

\- API Endpoints

\- Hooks

\- Utilities

\- Database Models

\- Documentation



New code should only be created when an existing implementation cannot be safely reused or extended.



\---



\## Audit Workflow



Before writing new code, verify:



1\. Does a similar implementation already exist?

2\. Can the existing implementation be reused?

3\. Can it be safely extended?

4\. Is there already a working API endpoint?

5\. Is there already a working service?

6\. Is there already a reusable component?

7\. Is there already a Feature Module responsible for this domain?



Only after completing this audit should new code be introduced.



\---



\## Reason



During Sprint 25 and Sprint 26 several features were completed by extending existing Portfolio and MT5 functionality instead of creating duplicate implementations.



Examples included:



\- Reusing Portfolio calculations for Dashboard summaries.

\- Reusing existing MT5 API endpoints.

\- Reusing Widget Infrastructure.

\- Reusing existing Page Layout components.

\- Reusing Feature Modules instead of creating parallel structures.



This approach reduced duplicated code, simplified maintenance and improved architectural consistency.



\---



\## Rule



Development should always follow this sequence:



```text

Audit

↓

Reuse

↓

Extend

↓

Create New (only if necessary)

```



Creating new code without checking the existing implementation first is considered a deviation from the project development standards.



\---



\## Consequences



This decision promotes:



\- Lower technical debt.

\- Better code consistency.

\- Higher component reuse.

\- Smaller maintenance cost.

\- Faster feature implementation.

\- More stable architecture.



\---



\## Applies To



\- Backend

\- Frontend

\- Documentation

\- Architecture

\- Feature Modules

\- Widgets

\- Services

\- APIs

\- Future development

