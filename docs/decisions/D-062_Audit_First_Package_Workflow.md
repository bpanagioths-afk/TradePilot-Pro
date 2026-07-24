# D-062 — Audit-First Package Workflow

## Status

Active

## Decision

Every implementation package follows this mandatory order:

1. Read the active repository tree.
2. Read every file that may be modified.
3. Search for an existing equivalent implementation.
4. Define scope and locked areas.
5. Design the complete package.
6. Modify each file once whenever reasonably possible.
7. Validate the package.
8. Update documentation and Git.

No code or documentation may be changed from memory or assumptions.

## Supersedes as separate workflow rules

- D-012 Safe Development
- D-041 Sprint Execution Process
- D-045 Source Structure Audit Before Routing Changes
- D-047 Reuse Before New Code
- D-049 Single Source of Information
- D-050 Audit Before New Code
- D-051 Single Touch Rule
- D-052 Package First Development
- D-056 Tree Verification Before File Modification
- D-060 Read Before Modify

The technical intent of these decisions remains preserved here.
