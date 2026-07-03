\# TradePilot Pro - Project Master



\## Vision



Το TradePilot Pro είναι ένα Trading Command Center για Forex, Metals και Prop Firm traders.



Δεν είναι απλό Trading Journal. Στόχος είναι να βοηθά τον trader να:



\- καταγράφει trades,

\- αναλύει την απόδοση,

\- ελέγχει την πειθαρχία,

\- ακολουθεί Trading Plan,

\- αποφεύγει λάθη,

\- αξιολογεί κάθε trade με βάση τη διαδικασία και όχι μόνο το κέρδος.



Βασική φιλοσοφία:



Process over Profit.



\---



\## Tech Stack



\### Backend



\- Python

\- FastAPI

\- PostgreSQL

\- SQLAlchemy

\- Pydantic

\- Uvicorn

\- MetaTrader5 Python API

\- ReportLab για PDF



\### Frontend



\- React

\- Vite

\- Material UI

\- Axios

\- DataGrid

\- Recharts / charts later



\### Version Control



\- Git

\- Clean `.gitignore`

\- No `venv`

\- No `node\_modules`

\- No `.env`

\- No uploads in Git



\---



\## Current Modules



\### Trading Journal Engine



Implemented:



\- Trades CRUD

\- Add/Edit Trade Dialog

\- Trade Details Dialog

\- Screenshot upload

\- Search

\- Filters

\- CSV Export

\- PDF Export

\- Trade Score UI



\---



\### Dashboard



Implemented:



\- KPI Cards

\- Equity Curve

\- Better card UI

\- Icons

\- Full dashboard API



\---



\### Home Command Center



Implemented static/widgets:



\- Home page

\- Today Mission widget

\- Market Alerts widget

\- Trading Sessions widget



Planned:



\- Latest Trades

\- Mini Equity Curve

\- Economic Calendar

\- AI Coach

\- Market Status

\- MT5 Status

\- Spread Monitor

\- Watchlist

\- Prop Firm Progress



\---



\### Trading Plan Engine



Implemented:



\- `trading\_plans` table

\- `trading\_plan\_history` table

\- `User` model

\- `TradingPlan` model

\- `TradingPlanHistory` model

\- Schemas

\- Router

\- CRUD API

\- Frontend Trading Plan page

\- Save Trading Plan

\- Snackbar success message

\- NumericField component accepting `,` and `.`



Architecture decision:



Trading Plans must support multiple plans per user.



Examples:



\- Forex Conservative

\- Gold Intraday

\- FTMO Challenge

\- The5ers Challenge

\- Swing Trading



\---



\### Rule Engine



Implemented:



\- `backend/app/services/rule\_engine.py`

\- Test endpoint

\- Real trade evaluation endpoint

\- Trade Score Card in UI



Current rules v1:



\- Minimum RR

\- Allowed session

\- Maximum trades per day

\- High impact news placeholder

\- Risk per trade placeholder



Important philosophy:



Trade Score is not Profit.



A losing trade can have high score if execution was correct.

A winning trade can have low score if rules were violated.



\---



\### MT5 Sync



Current old implementation:



\- `POST /mt5/sync`

\- Uses `MetaTrader5.history\_deals\_get`

\- Imports all deals

\- Uses `Trade.id == deal.ticket`

\- This is wrong for multi-account support



New architecture decision:



Trade.id must remain internal DB ID.



MT5 data must use:



\- `mt5\_ticket`

\- `mt5\_account\_id`

\- `imported\_from\_mt5`

\- `is\_archived`



Duplicate protection must use:



```text

(mt5\_account\_id, mt5\_ticket)

