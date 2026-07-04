### Rule Engine

Implemented

* `backend/app/services/rule\_engine.py`
* Test endpoint
* Real trade evaluation endpoint
* Trade Score Card in UI

Current rules v1

* Minimum RR
* Allowed session
* Maximum trades per day
* High impact news placeholder
* Risk per trade placeholder

Important philosophy

Trade Score is not Profit.

A losing trade can have high score if execution was correct.

A winning trade can have low score if rules were violated.

\---
