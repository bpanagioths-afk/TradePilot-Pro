\# D-057 — Exact Edit Instructions



\## Status



Accepted



\---



\## Category



Development Process



\---



\## Date



2026-07-15



\---



\## Decision



All code modification instructions must be written using exact insertion or replacement locations.



Generic navigation instructions are not allowed.



\---



\## Rules



Every instruction must follow one of the following formats.



\### Replace



```text

Open:



<file>



Find exactly:



<existing code>



Replace with:



<new code>

```



\### Insert Below



```text

Open:



<file>



Find exactly:



<existing code>



Immediately below insert:



<new code>

```



\### Insert Above



```text

Open:



<file>



Find exactly:



<existing code>



Immediately above insert:



<new code>

```



\---



The following types of instructions are not allowed:



\- "Find the function..."

\- "Inside the component..."

\- "Near line..."

\- "Somewhere above..."

\- "At the end of the file..."



\---



\## Motivation



Large source files often contain hundreds of lines.



Exact edit locations eliminate ambiguity and greatly reduce editing errors.



\---



\## Consequences



\### Positive



\- Deterministic editing.

\- Faster implementation.

\- Less developer confusion.

\- Lower probability of editing the wrong code block.



\### Negative



\- Slightly longer preparation time for the instructions.

