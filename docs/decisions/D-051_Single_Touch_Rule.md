# D-051 — Single Touch Rule

Status: Accepted

Decision:

Each file should ideally be modified only once inside a package or sprint package.

If a second modification becomes necessary, development pauses for a new Architecture Review before the file is touched again.

Reason:

Repeated edits to the same file inside one package indicate incomplete planning and increase regression risk.

Consequence:

Packages must define their complete file-impact list before implementation.
