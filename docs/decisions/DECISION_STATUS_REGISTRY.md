# Decision Status Registry

## Authority

This file is the authoritative status registry for TradePilot Pro decisions.

Legacy decision files are retained for history. Their internal `Status: Accepted` text records their state when written, but this registry determines whether they remain independently active.

## Active canonical decisions

### Core data and product

- D-001 to D-011 — Active
- D-014 to D-016 — Active
- D-018 to D-020 — Active
- D-024 to D-028 — Active
- D-034 to D-040 — Active
- D-042 to D-044 — Active
- D-046 — Active
- D-048 — Active
- D-053 to D-055 — Active
- D-058 to D-059 — Active
- D-061 to D-063 — Active

### Active with consolidation notes

- D-017 Documentation First — Active product principle; startup behavior moved to D-061.
- D-021 Sprint Release Process — Active release principle; continuation startup moved to D-061.
- D-022 Maximum Component Size — Active guideline, not an absolute rule.
- D-023 Design System First — Active; overlaps with D-029 and D-030.
- D-029 Design System Before New Screens — Consolidated under D-023.
- D-030 Reusable UI Components First — Active implementation principle.
- D-031 Portfolio-Centric Architecture — Active product architecture principle.
- D-032 Local First, Cloud Ready — Active deployment principle.
- D-033 Documentation as a Deliverable — Consolidated under D-017.
- D-036 MetricCard Reusable KPI Component — Historical component-specific implementation; shared-widget authority is D-053.
- D-037 Professional MT5 Widget Pattern — Historical implementation reference; shared-widget authority is D-053.
- D-038 Widget Infrastructure Layer — Historical infrastructure step; current authority is D-043 and D-053.
- D-039 Feature Module Architecture Direction — Active; D-042 is the reference implementation.
- D-040 Source Code Structure as Developer Handbook — Active documentation principle.
- D-042 Portfolio Feature Module Reference — Active technical reference.
- D-043 Widget Infrastructure v3 — Active infrastructure decision.
- D-044 Modular Portfolio Overview API — Active.
- D-054 Portfolio Reference UI — Consolidated with D-059; D-059 is authoritative.

## Superseded workflow decisions

The following are preserved historically but no longer operate as separate rules:

- D-012 → D-062
- D-013 → D-063
- D-041 → D-062
- D-045 → D-062
- D-047 → D-062
- D-049 → D-062
- D-050 → D-062
- D-051 → D-062
- D-052 → D-062
- D-056 → D-062
- D-057 → D-063
- D-060 → D-061 and D-062

## File-name corrections required

The following legacy filenames do not match their actual decision titles:

- `D-029_TradePilot_UI_Framework.md` contains “Design System Before New Screens”.
- `D-030_Design_Before_Development.md` contains “Reusable UI Components First”.
- `D-031_Official_Design_Guide.md` contains “Portfolio-Centric Architecture”.
- `D-032_Widgets_First.md` contains “Local First, Cloud Ready”.
- `D-033_Future_UI_Personalization.md` contains “Documentation as a Deliverable”.

These should be renamed in a dedicated Git migration so links can be updated safely.

## Rule count after consolidation

- Legacy records retained: D-001 through D-060
- New canonical framework: D-061 through D-063
- Independent workflow/delivery rules replaced: 12
- Effective active framework is smaller even though historical IDs remain available.
