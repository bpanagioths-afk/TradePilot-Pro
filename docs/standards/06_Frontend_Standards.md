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
