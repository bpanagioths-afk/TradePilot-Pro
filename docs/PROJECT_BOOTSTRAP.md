# PROJECT BOOTSTRAP

## Purpose

This document defines how work is performed in TradePilot Pro.  
Project state belongs in `Current_Project_Status.md`.  
Sprint scope belongs in `11_ACTIVE_SPRINT.md`.  
Conversation startup belongs in `START_HERE.md`.

## Source-of-truth order

When sources disagree, use this order:

1. Actual source code on the active Git branch
2. Database migrations and schemas
3. Current project status
4. Active sprint
5. Active decision registry
6. Historical documentation
7. Conversation memory

Memory and assumptions are never authoritative.

## Audit-first rule

Before proposing or modifying code:

- read the current repository tree relevant to the package,
- read every file that may be changed,
- search for existing equivalent components, services, APIs, schemas, and utilities,
- identify protected or locked modules,
- confirm imports and call sites.

No file may be modified from memory.

## Package workflow

1. Audit
2. Define scope and locked areas
3. Design the complete package
4. Implement
5. Validate backend/frontend behavior
6. Update documentation
7. Review Git diff and status
8. Commit and push
9. Prepare the next continuation entry point

## Change discipline

- Reuse or extend existing implementations before creating new ones.
- Avoid duplicate services, APIs, components, calculations, and documentation.
- Modify each file once per package whenever reasonably possible.
- Do not change global infrastructure to solve a page-local problem.
- Do not reopen completed backend work without evidence of a defect.
- Keep business logic in the backend.
- Keep frontend components focused on presentation and interaction.

## Delivery rules

For user-applied code changes:

- provide complete files ready for copy/paste,
- use exact repository paths,
- include every required import,
- do not provide partial fragments unless the user explicitly requests them,
- group all files of one package in one delivery,
- state validation commands after the package.

For simple terminal actions:

- provide one clear command block,
- wait for the result only when the next action depends on it.

## Communication rules

- Use Greek unless the user requests another language.
- Keep messages direct and practical.
- Treat “οκ έτοιμο” as confirmation that the previous action succeeded and continue.
- Do not repeat confirmations already given.
- Do not invent missing project facts.
- Clearly distinguish verified repository facts from proposals.

## Documentation rules

- Documentation is part of the Definition of Done.
- `START_HERE.md` is the permanent conversation entry point.
- Sprint-specific continuation files may remain for history, but they are not the primary entry point.
- `DECISION_STATUS_REGISTRY.md` is the authority for whether a decision is active, consolidated, superseded, or historical.
