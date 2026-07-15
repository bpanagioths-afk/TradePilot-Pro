\# D-056 — Tree Verification Before File Modification



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



Before proposing any code modification, the assistant must verify that the target file exists in the current project structure.



No assumptions may be made regarding folder names, file names, or architecture based on previous sprints.



\---



\## Rules



\- Always verify the current project tree before proposing file changes.

\- Never assume that folders or files still exist after refactoring.

\- If the target file cannot be verified, request the current tree or the actual file.

\- Instructions must always reference an existing file.



\---



\## Motivation



Several development interruptions occurred because file paths from previous project versions were reused after architecture refactoring.



Verifying the project tree before every modification eliminates incorrect instructions and significantly reduces development time.



\---



\## Consequences



\### Positive



\- Eliminates invalid file references.

\- Faster implementation.

\- Fewer unnecessary corrections.

\- Better compatibility with large refactored projects.



\### Negative



\- Requires an additional verification step before modifications.

