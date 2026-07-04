# TradePilot Pro - Development Standards

> Αυτό το αρχείο περιγράφει πώς γράφουμε κώδικα στο TradePilot Pro.
>
> Το DECISIONS.md λέει τι αποφασίστηκε.
>
> Το PROJECT\_HISTORY.md λέει γιατί αποφασίστηκε.
>
> Αυτό το αρχείο λέει πώς εφαρμόζεται στην πράξη.

\---

# Core Development Philosophy

* Small safe steps
* No big rewrites without strong reason
* Stability before new features
* Process over Profit
* Discipline before Performance
* Protect data first
* User keeps control
* Documentation first
* Architecture before feature speed
* Professional UX matters

\---

# Product Quality Pipeline

Every important module should pass through three stages:

Functionality
↓
Architecture
↓
Professional UX

Meaning

1. First, make it work correctly.
2. Then, make the code clean and maintainable.
3. Then, make the user experience professional.

Reason

TradePilot Pro is developed as a professional Trading Command Center, not as a simple CRUD application.

\---

# Backend Standards

## Required Flow

All new backend modules must follow:

Model
↓
Schema
↓
Service
↓
Router
↓
React API
↓
React UI

## Routers

Routers must stay thin.

Routers should:

* define endpoints
* receive request data
* call services
* return responses
* raise HTTP exceptions when needed

Routers should not contain heavy business logic.

## Services

Services contain business logic.

Services should:

* query the database
* create records
* update records
* apply rules
* perform validation that belongs to business logic
* return models or clean results

## Schemas

All new CRUD APIs must use Pydantic schemas.

Required schema types when useful:

* `Create`
* `Update`
* `Response`

Example:

* `MT5AccountCreate`
* `MT5AccountUpdate`
* `MT5AccountResponse`

## Database Sessions

New routers should use:

```python
db: Session = Depends(get\_db)
```

Avoid opening `SessionLocal()` directly inside routers.

Service-only background tasks may still use `SessionLocal()` when needed.

\---

# Database Standards

## Internal IDs

Database primary keys are internal IDs.

External system IDs must not be used as primary keys.

For MT5:

* `Trade.id` = internal database ID
* `Trade.mt5\_ticket` = external MT5 ticket

## Duplicate Detection

MT5 duplicate detection uses:

```text
(mt5\_account\_id, mt5\_ticket)
```

## Delete Policy

Do not hard-delete data that has historical importance.

Use:

* `is\_archived = true` for trades
* `is\_active = false` for MT5 accounts

## MT5 Permanent Delete Policy

MT5 account permanent delete is allowed only when the account has no connected trades.

The check must happen in the backend.

Frontend-only protection is not enough.

## Migrations

Current project state:

* manual SQL ALTER TABLE changes are still used

Planned improvement:

* add Alembic in Sprint 18 or later

\---

# Frontend Standards

## UI Quality

No ugly UI.

New modules must use:

* clean layout
* Material UI components
* reusable components
* consistent spacing
* professional cards / tables
* Snackbar notifications
* stable state and predictable sorting

## Component Size

React components should ideally stay under approximately 200-250 lines.

If a component grows too much, split it into:

* Manager component
* Card component
* Dialog component
* Toolbar component
* Helper file
* API file

Reason

Large components become difficult to debug, reuse and extend.

## Reusable Components

Prefer reusable components when a UI pattern will grow.

Examples:

* Account cards
* Dialogs
* Toolbars
* Status badges
* Action menus

## Numeric Inputs

All numeric inputs must use:

```text
NumericField.jsx
```

Reason:

* supports comma and dot
* consistent validation
* easier Greek keyboard usage

## Notifications

Do not use:

```javascript
alert()
```

Use Snackbar.

## Stable Lists

Lists with actions should have stable sorting.

Use internal IDs when possible.

Reason

Changing list order after an action can confuse menus, selected items and user expectations.

\---

# Design System Standards

Starting Sprint 18, TradePilot Pro should create and follow a Design System.

The Design System should define:

* card styles
* border radius
* hover shadow
* spacing
* typography
* button hierarchy
* badge styles
* status colors
* action menus

## Button Rules

* Primary action = contained button
* Secondary action = outlined button
* Dangerous action = warning or error color
* Repeated / async action = loading state

## Status Colors

* Success / green = Active / Connected / Completed
* Warning / yellow-orange = Attention / Disabled action / Risk
* Error / red = Failed / Dangerous
* Primary / blue = Main action
* Default / grey = Disabled / Inactive

## Status Badges

Use consistent badge patterns for:

* Active
* Disabled
* Syncing
* Connected
* Failed
* Demo
* Live
* Prop Firm

\---

# Future SaaS Ready Standards

The current app is local-first.

However, development should avoid choices that block future SaaS usage.

Future direction may include:

* user login
* password
* subscription pass key
* monthly subscription validation
* per-user MT5 accounts
* secure broker credentials
* multi-user isolation

Do not hard-code assumptions that permanently limit the project to one user.

Temporary development constants are allowed only when clearly marked and planned to be replaced.

\---

# Collaboration Standards

Instructions to the user must be exact.

Always prefer:

* Βρες αυτό
* Βάλε ακριβώς από κάτω αυτό
* Αντικατάστησε μόνο αυτό

Avoid vague instructions such as:

* βάλε το κάπου
* άλλαξε το αρχείο
* κάνε refactor όλο αυτό

Do not replace large files unless necessary.

Large replacement is allowed only for documentation updates or safe extraction/refactor when explicitly agreed.

\---

# Sprint Release Process

At the end of every important Sprint update:

1. CHANGELOG.md
2. DECISIONS.md
3. BACKLOG.md
4. PROJECT\_MASTER.md
5. PROJECT\_HISTORY.md
6. README.md if needed
7. NEXT\_CHAT\_PROMPT.md

\---

# Current Active Standard

Sprint 18 should start from:

TradePilot Design System Foundation

The first target module for the Design System is:

MT5 Account Manager UI

Do not rename MT5 modules to Trading Connections yet.

Generalization should happen only when a second real platform is implemented.
