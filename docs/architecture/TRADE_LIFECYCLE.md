\# Trade Lifecycle



\## Purpose



This document defines the canonical lifecycle of a Trade inside TradePilot Pro.



It is the Single Source of Information for:



\- Manual trades

\- MT5 imported trades

\- Open positions

\- Partial closes

\- Closed trades

\- Portfolio calculations

\- Analytics

\- Reports



All future trade-related implementations must follow this lifecycle.



\---



\## Core Rule



One trading position must be represented by one Trade record.



MT5 deals are execution events.



They are not independent Trade records.



```text

Multiple MT5 Deals

&#x20;       ↓

One Position

&#x20;       ↓

One Trade Record

