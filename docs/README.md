# TradePilot Pro

Professional Trading Journal & Trading Command Center

## Vision

TradePilot Pro is a Windows Trading Command Center for:

- Forex
- Metals
- Prop Firm Traders
- Multi-account trading
- Process-based performance review

Core philosophy:

```text
Process over Profit
```

TradePilot Pro does not evaluate only whether a trade won or lost.

It evaluates whether the trader followed the correct process, rules, discipline and Trading Plan.

---

## Product Identity

TradePilot Pro is evolving from a Trading Journal into a complete professional Trading Command Center.

Core pillars:

- Portfolio Management
- MT5 Integration
- Trading Plans
- Rule Engine
- AI Coach
- Psychology Analysis
- Performance Analytics
- Economic Calendar
- Risk Management
- Professional Dashboard

---

## Development Philosophy

TradePilot Pro is developed with:

- Small Safe Steps
- Documentation First
- Architecture Before Features
- Professional UX
- Reusable Components
- Data Protection First
- Future SaaS Ready
- Process over Profit

Every important module follows:

```text
Functionality
↓
Architecture
↓
Professional UX
```

---

## Tech Stack

### Backend

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Uvicorn
- MetaTrader5 Python API
- ReportLab

### Frontend

- React
- Vite
- Material UI
- Axios
- DataGrid
- Recharts later

### Version Control

- Git
- Clean `.gitignore`
- No `venv`
- No `node_modules`
- No `.env`
- No uploads in Git

---

## Frontend Architecture

Starting from Sprint 18, the frontend follows:

```text
Material UI
        ↓
TradePilot UI Framework
        ↓
Application Modules
```

Material UI is the rendering layer.

TradePilot UI Framework is the application UI layer.

Current reusable components:

- Theme
- TradePilotCard
- TradePilotButton
- StatusBadge
- SectionHeader
- InfoRow

Official design reference:

```text
docs/DESIGN_SYSTEM.md
```

---

## Documentation v2 Structure

The documentation is now organized as a modular documentation library.

```text
docs/
│
├── README.md
├── DOCUMENTATION_MAP.md
├── PROJECT_MASTER.md
├── DEVELOPMENT_STANDARDS.md
├── DECISIONS.md
├── PROJECT_HISTORY.md
├── CHANGELOG.md
├── BACKLOG.md
├── DESIGN_SYSTEM.md
│
├── project/
├── standards/
├── decisions/
├── history/
├── sprints/
├── roadmap/
└── design/
```

---

## Main Documentation Files

| File | Purpose |
|------|---------|
| `docs/PROJECT_MASTER.md` | Product vision and architecture index |
| `docs/DEVELOPMENT_STANDARDS.md` | Engineering handbook index |
| `docs/DECISIONS.md` | Architecture decisions index |
| `docs/PROJECT_HISTORY.md` | Product history index |
| `docs/CHANGELOG.md` | Sprint changelog index |
| `docs/BACKLOG.md` | Product roadmap index |
| `docs/DESIGN_SYSTEM.md` | Official UI / UX design guide |
| `docs/DOCUMENTATION_MAP.md` | Full documentation map |

---

## Current Development Status

Completed through Sprint 18:

- Multi-account MT5 architecture
- MT5 Account CRUD
- Account-aware MT5 Sync
- MT5 Account Manager UI
- TradePilot Theme
- TradePilot UI Framework v1
- Design System foundation
- Modular documentation architecture

Next active sprint:

```text
Sprint 19 - Professional MT5 Account Widget
```

Sprint 19 target:

- Balance
- Equity
- Floating Profit
- Open Positions
- Connection Health
- Demo / Live
- Prop Firm
- Auto Sync
- Import Statistics
- Relative Last Sync

---

## Long Term Goal

To create the best Windows Trading Command Center for:

- Forex
- Metals
- Indices
- Crypto
- Prop Firms

with:

- Portfolio Management
- MT5 Integration
- AI Coach
- Trading Plans
- Rule Engine
- Psychology
- Analytics
- Risk Management
- Economic Calendar
- Professional Dashboard
