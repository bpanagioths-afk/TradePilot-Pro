# 03 — Architecture Standards

## Backend Flow

```text
Model
↓
Schema
↓
Repository
↓
Service
↓
Router / Feature API
↓
Frontend Service/API
↓
React UI
```

## Multi-User Security Flow

```text
HTTP Request
↓
Bearer Token
↓
JWT Validation
↓
Current User Dependency
↓
Role / Active-State Validation
↓
User-Scoped Service and Repository Query
↓
Response
```

Rules:

- Routers stay thin.
- Business logic belongs in services.
- Database access belongs in repositories where the feature architecture provides one.
- Authentication, authorization and ownership are enforced in the backend.
- Frontend route guards are navigation controls, not the security boundary.
- Every user-owned query must include the authenticated user's ownership scope.
- Never accept a client-supplied `user_id` as proof of ownership.
- Pydantic schemas define request and response contracts.
- External IDs such as MT5 tickets are never database primary keys.
- Historical trading data remains protected.

## Frontend Architecture

```text
Material UI
↓
TradePilot UI Framework
↓
Shared Components
↓
Feature Pages
```

Additional Version 1.0 rules:

- API authentication behavior is centralized in the frontend API layer.
- Authentication storage and helpers are centralized in `services/authService.js`.
- Administrator API calls are centralized in `services/adminService.js`.
- Public, protected and administrator-only routes remain explicit.
- Avoid duplicating backend permission rules in page components.
- Reuse loading, error, notification, password and dialog patterns.
- Large pages should be decomposed after behavior is stable; do not refactor during release validation without a demonstrated need.
