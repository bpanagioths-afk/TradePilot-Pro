# 08 — SaaS and Commercial Roadmap

## Current State — Version 1.0

The project is no longer purely single-user. The branch `feature/multi-user-rebuild` introduces the first operational multi-user foundation:

- JWT authentication.
- User lifecycle and active-state enforcement.
- Administrator User Management.
- Per-user ownership for core trading and MT5 data.
- Account recovery.
- User profile and preference fields.

This is an application multi-user foundation, not yet a complete commercial SaaS platform.

## Next Commercial Layers

Future versions may add:

- Subscription plans and billing.
- License/subscription validation.
- Organization or tenant hierarchy.
- Granular roles and permissions.
- Invitation and onboarding flows.
- Verified email workflow.
- Audit logs and security event history.
- Secure secret and broker credential vaulting.
- Cloud connector architecture.
- Broker/Manager API integrations.
- Usage limits and entitlement enforcement.
- Per-tenant branding and advanced personalization.

## Architectural Rule

All future SaaS work must extend the current authenticated ownership model rather than creating a second parallel user system.

Backend authorization and tenant isolation must remain authoritative. Frontend visibility rules alone are never sufficient.
