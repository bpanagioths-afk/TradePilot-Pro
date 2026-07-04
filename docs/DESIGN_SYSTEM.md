# TradePilot Pro - Design System

## Purpose

Το TradePilot Design System είναι η κοινή σχεδιαστική γλώσσα του TradePilot Pro.

Στόχος του είναι κάθε module να μοιάζει ότι ανήκει στο ίδιο προϊόν.

Το TradePilot Pro δεν πρέπει να μοιάζει με απλή Material UI εφαρμογή.

Πρέπει να μοιάζει με επαγγελματικό Windows Trading Command Center.

---

# Core UI Philosophy

## Product Identity

TradePilot Pro UI should feel:

- professional
- dark
- clean
- focused
- trading-terminal inspired
- not overloaded
- consistent across all modules

The user should be able to recognize the product from a screenshot.

---

# Main Visual Direction

## Base Theme

Default theme:

```text
Dark mode

Reason:

Trading platforms are usually used for long sessions.

Dark UI reduces visual fatigue and fits the Trading Command Center identity.

Color Language
Primary Colors
Trading Blue     Main actions / primary focus
Success Green    Active / connected / completed / profit
Warning Amber    Attention / risk / syncing
Loss Red         Failed / dangerous / loss
Prop Purple      Prop firm / challenge / funding
Info Cyan        Information / neutral signals
Neutral Gray     Disabled / inactive / secondary text
Usage Rules
Blue    = main user action
Green   = good status
Amber   = warning or attention
Red     = danger or failure
Purple  = prop firm / premium / challenge
Gray    = inactive / disabled / secondary
Component Philosophy

TradePilot Pro should use branded reusable components.

Prefer:

TradePilotCard
TradePilotButton
StatusBadge
SectionHeader
InfoRow
MetricCard
ConfirmDialog
EmptyState
LoadingOverlay
PageContainer

Avoid repeating raw Material UI styling when a TradePilot component exists.

Cards
Card Types
Widget Card
Account Card
Metric Card
Chart Card
Settings Card
Alert Card
Card Rules

Cards should have:

dark gradient background
soft border
rounded corners
subtle shadow
hover lift when clickable
consistent spacing

Cards should not feel flat or random.

Widget Structure

Every major widget should follow this structure:

Header
Status
Body
Actions

Example:

MT5 Account Card

Header: account name + status
Body: broker, server, login, last sync
Actions: sync button + actions menu
Typography
Typography Roles
Page Title       Main page name
Section Title    Area / module title
Widget Title     Card title
Metric Value     Large KPI number
Label            Small muted description
Caption          Helper text / secondary info
Rules
Titles should be bold.
Labels should use secondary text color.
Metrics should be visually stronger than labels.
Avoid too many font sizes.
Buttons
Button Types
Primary      Main action
Secondary    Alternative action
Ghost        Light action
Danger       Delete / disable / destructive
Success      Confirm / activate
Icon Only    Menus / quick actions
Rules
Primary action = contained button
Secondary action = outlined button
Danger action = error / warning color
Async action = loading state
Status Badges
Common Statuses
Active
Disabled
Connected
Syncing
Failed
Demo
Live
Prop Firm
Completed
Warning
Rules

Use StatusBadge instead of raw Chip.

Badges must be consistent across all modules.

Spacing

Use consistent spacing scale:

4px
8px
16px
24px
32px

Preferred Material UI spacing:

0.5
1
2
3
4

Avoid random spacing values unless needed.

Icons

Use consistent icon meaning.

Examples:

Broker        business / account icon
Login         user icon
Server        cloud / public icon
Last Sync     time icon
Balance       money icon
Equity        chart icon
Open Trades   analytics icon
Settings      gear icon

Do not use different icons for the same meaning in different modules.

Tables

All future tables and DataGrids should follow common rules:

dark background
clean borders
clear hover row
compact but readable height
consistent header style
action column on the right
Dialogs

Dialogs should follow common structure:

Title
Short description
Form / content
Cancel action
Primary action

Rules:

No browser alert()
Use Snackbar
Use ConfirmDialog for dangerous actions
Empty States

Empty screens should not look broken.

Every empty state should have:

icon
title
short explanation
primary action when useful

Example:

No MT5 accounts yet
Add your first MT5 account to start syncing trades.
[Add Account]
Loading States

Async actions should show loading state.

Examples:

Syncing...
Saving...
Loading accounts...

Avoid repeated clicks during loading.

TradePilot UI Framework v1

Current components:

Theme
TradePilotCard
TradePilotButton
StatusBadge
SectionHeader
InfoRow

Planned components:

MetricCard
PageContainer
EmptyState
ConfirmDialog
LoadingOverlay
TradePilotDialog
TradePilotTable
DesignSystemPage
MT5 Account Card Target Design

Future target:

┌────────────────────────────────────────────┐
 Main MT5 Account                Active

 MT5 Trading Account

 Broker        MetaQuotes
 Server        MetaQuotes-Demo
 Login         12345678
 Last Sync     3 minutes ago

 Balance       $10,254.22
 Equity        $10,281.44
 Open Trades   2

 Connection    Connected
 Auto Sync     Every 5 min
 Last Import   14 trades

 [ Sync Now ]                  ⋮
└────────────────────────────────────────────┘
Future UI Personalization

Future versions may support user appearance preferences.

Planned ideas:

Light / Dark mode
Accent color selection
Card style presets
Compact / Comfortable layout
Save appearance preferences
Load appearance preferences on startup
Per-user UI settings for SaaS version

This is not Sprint 18 scope.

It should remain in backlog for a future version.

Development Rule

When a TradePilot UI component exists, use it.

Do not create new custom styles for the same pattern in another module.

The goal is consistency, maintainability and product identity.


Μόλις το φτιάξεις, πες μου. Μετά πάμε να το συνδέσουμε και στα `.md` στο τέλος του Sprint 18.