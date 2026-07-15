# D-059 — Portfolio Is The Reference Module

## Status
Accepted

## Category
Architecture

## Date
2026-07-15

## Decision
The Portfolio feature module is the reference implementation for future business modules.

## Rules
All new modules should follow:
Repository → Service → Engines → API → Hook → Components → Page.

## Motivation
Provides consistent architecture and maximizes reuse.

## Consequences
Future modules (Analytics, Psychology, AI Coach, Risk, Prop Firms) follow the same structure.
