# Roadmap

## v0.1 — technical preview

- HACS-ready integration skeleton,
- Matrix Blue custom panel,
- local configuration editor,
- generic entity mappings,
- normalized sensors,
- PV strings and multi-section splitting,
- arbitrary appliances,
- diagnostics,
- basic generic controls,
- Polish and English setup translations.

## v0.2 — TAURON G13 tariff engine

- summer/winter G13 schedule,
- weekends and Polish statutory holidays,
- custom holidays and next-workday carry to 07:00,
- component, combined and external-entity price modes,
- editable energy, distribution, variable and fixed fees,
- 2026 TAURON Dystrybucja G13 preset,
- tariff sensors and live cost rates,
- complete Matrix Blue tariff editor,
- configuration schema migration to version 2.

## v0.3 — configuration and frontend rebuild

- responsive, accurately aligned flow diagram,
- immediate module show/hide behavior,
- Home Assistant-style entity picker with live states,
- expanded mappings for grid, PV, inverter, battery/BMS, EV and prices,
- expanded PV string/section metadata,
- appliance status, cycle, thresholds, priorities and contextual descriptions,
- configuration schema migration to version 3.

## v0.4 — configurable multi-branch flow window

- independent nodes for multiple PV strings,
- additional source, consumer and bidirectional device nodes,
- source and load branch buses,
- per-item visibility, order, label and icon,
- flow editor with live preview,
- layout, style, animation, spacing and visibility controls,
- configuration schema migration to version 4.

## v0.5 — recorder analytics and billing

- recorder-backed day/week/month/year charts,
- energy aggregation by G13 zone and season,
- daily and monthly cost ledgers,
- fixed-fee allocation,
- device ranking by energy and cost,
- invoice estimate and actual invoice comparison,
- configuration backup versioning.

## v0.6 — vendor profiles

- Deye / Sunsynk,
- Huawei,
- Fronius,
- SolarEdge,
- GoodWe,
- Growatt,
- Victron,
- generic Modbus mapping assistant,
- Pstryk and other dynamic-price adapters.

## v0.7 — EV and battery control

- EV charger profiles,
- surplus-PV charging,
- departure target,
- dynamic current limiting,
- battery reserve and time-of-use policies,
- simulation and dry-run decisions.

## v0.8 — multi-site and permissions

- multiple sites or buildings,
- configuration subentries,
- role-based viewing and control policies,
- kiosk view,
- separate operator and administrator modes.

## v1.0

- migration tests,
- full documentation,
- automated test coverage,
- validated HACS release,
- stable public configuration schema.
