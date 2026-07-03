Database Important Tables

Existing / planned:

users
trades
mt5_accounts
trading_plans
trading_plan_history
trading_systems
psychology_states
trading_pairs
screenshots
trade_tags
trade_tag_map
ai_coach_reports
daily_statistics
pair_statistics
psychology_statistics
system_statistics
Important Architecture Rules
Do not hard-delete MT5 imported trades.
Use is_archived = true.
Every MT5 trade must belong to an MT5 account.
Never use MT5 ticket as primary key.
Use internal DB id for trades.
Use mt5_ticket only as external MT5 reference.
Duplicate MT5 check:
mt5_account_id + mt5_ticket
Numeric inputs must use NumericField.
Use Snackbar instead of alert().
New backend business logic should move gradually into services.
Routers should stay thin.
No big rewrites unless necessary.
Prefer small, safe steps.
For user instructions, always say exactly:
find this line,
put this below,
replace only this block.
Current Sprint

Sprint 17 - MT5 Account Manager

Goal:

Support multiple MT5 accounts.
Sync only selected account.
Prevent duplicate imports.
Archive instead of delete.
Later support portfolio analytics.

Already started:

Added fields to Trade model:
mt5_account_id
mt5_ticket
imported_from_mt5
is_archived
Created model:
backend/app/models/mt5_account.py
Imported MT5Account in main.py

Backend starts without error.

Next Technical Step

Continue with MT5 Account Manager.

Need to inspect and refactor:

backend/app/routers/mt5.py
backend/app/services/mt5_sync.py

Current mt5_sync problem:

existing = db.query(Trade).filter(
    Trade.id == deal.ticket
).first()

This must change.

New logic should become:

existing = db.query(Trade).filter(
    Trade.mt5_account_id == account_id,
    Trade.mt5_ticket == deal.ticket
).first()

Also new imported trade should not set:

id=deal.ticket

Instead:

mt5_ticket=deal.ticket
mt5_account_id=account_id
imported_from_mt5=True
is_archived=False
Future Big Modules
MT5 Account Manager

Features:

Add MT5 account
Select account
Sync selected account
Auto Sync
Last Sync
Account status
Import preview
Conflict resolution
Portfolio view
Economic Calendar

Features:

High impact news
Currency filters
USD/EUR/GBP/JPY/CHF/CAD/AUD/NZD
Warning before news
Link with Trading Plan
AI Coach

Should use:

Trade Score
Rule Engine
Trading Plan
Violations
Warnings
Successes
Psychology
Session data

Not generic AI.
It must be based on trader data.

Prop Firm Engine

Features:

FTMO
The5ers
FTUK
FundingPips
Daily drawdown
Overall drawdown
Profit target
Trading days
Consistency rules
Trading Playbook

Trading Plan = Rules.
Trading Playbook = Setups.

Features:

Setup library
Entry rules
Examples
Winning trades
Losing trades
AI notes
Discipline Index

Measure discipline, not profit.

Categories:

Risk discipline
RR discipline
Session discipline
News discipline
Trading plan discipline
Psychology discipline
Product Principles
Process over Profit.
Discipline before Performance.
Protect capital first.
Consistency beats intensity.
Every trade teaches something.
No ugly UI.
No hidden dangerous sync.
User keeps control.
Archive before delete.
Build engines, not random features.
User Preferences

The user wants:

Greek explanations.
Very clear step-by-step instructions.
Exact placement of code:
"βρες αυτό"
"βάλε από κάτω αυτό"
"αντικατάστησε αυτό με αυτό"
Avoid vague instructions.
Avoid replacing large files unless necessary.
Move fast, but safely.