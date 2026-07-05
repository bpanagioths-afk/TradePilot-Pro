# Frontend Architecture

```text
Material UI
        ↓
TradePilot UI Framework
        ↓
Widget Infrastructure
        ↓
Feature Modules
        ↓
Application Pages
```

Material UI provides the rendering engine.

TradePilot UI Framework provides the reusable application components.

Widget Infrastructure provides reusable professional widget structure.

Feature modules use these layers to build product functionality.

Business modules should use TradePilot components and Widget Infrastructure whenever available.

---

## Current Frontend Layers

```text
Application Pages
        ↓
Feature Modules
        ↓
Dashboard Components
        ↓
Widget Infrastructure
        ↓
TradePilot UI Framework
        ↓
Material UI
```

---

## Page Rule

Pages should compose modules and pass prepared data to widgets.

Pages should not become large monolithic UI files.

When a page grows, extract:

- widgets
- cards
- dialogs
- toolbars
- hooks
- services
- API files

---

## Widget Infrastructure Rule

Professional widgets should use:

```text
WidgetContainer
WidgetHeader
WidgetMetric
WidgetFooter
```

before creating local widget layout code.

---

## Feature Module Direction

Future large product areas should be treated as feature modules, not single components.

Conceptual target:

```text
feature-module/
├── api/
├── services/
├── hooks/
├── components/
├── widgets/
├── dialogs/
├── constants/
└── index.js
```

This direction starts with the Sprint 20 Professional Dashboard foundation.

---
