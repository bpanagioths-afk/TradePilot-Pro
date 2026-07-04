# 04 - Current Modules

## Trading Journal Engine

Implemented:

* Trades CRUD
* Add/Edit Trade Dialog
* Trade Details Dialog
* Screenshot upload
* Search
* Filters
* CSV Export
* PDF Export
* Trade Score UI

Core decision:

Trade result is not enough.

A trade is evaluated based on execution quality, process and discipline.

---

## Dashboard

Implemented:

* KPI Cards
* Equity Curve
* Better card UI
* Icons
* Full dashboard API

Planned:

* Portfolio View
* Multi Account Statistics
* Equity Curve PRO
* Drawdown
* Profit Factor
* Calendar View
* Heatmap

---

## Home Command Center

Implemented static/widgets:

* Home page
* Today Mission widget
* Market Alerts widget
* Trading Sessions widget

Planned:

* Latest Trades
* Mini Equity Curve
* Economic Calendar
* AI Coach
* Market Status
* MT5 Status
* Spread Monitor
* Watchlist
* Prop Firm Progress

---

## Trading Plan Engine

Implemented:

* `trading_plans` table
* `trading_plan_history` table
* `User` model
* `TradingPlan` model
* `TradingPlanHistory` model
* Schemas
* Router
* CRUD API
* Frontend Trading Plan page
* Save Trading Plan
* Snackbar success message
* NumericField component accepting `,` and `.`

Architecture decision:

Trading Plans must support multiple plans per user.

Examples:

* Forex Conservative
* Gold Intraday
* FTMO Challenge
* The5ers Challenge
* Swing Trading

---

## Rule Engine

Implemented:

* `backend/app/services/rule_engine.py`
* Test endpoint
* Real trade evaluation endpoint
* Trade Score Card in UI

Current rules v1:

* Minimum RR
* Allowed session
* Maximum trades per day
* High impact news placeholder
* Risk per trade placeholder

Important philosophy:

Trade Score is not Profit.

A losing trade can have high score if execution was correct.

A winning trade can have low score if rules were violated.
