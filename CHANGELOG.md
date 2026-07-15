# Changelog

## 0.2.0 — 2026-07-15

- Added the built-in, editable TAURON G13 tariff engine.
- Added summer and winter G13 schedules with separate afternoon peaks.
- Added weekend, Polish public holiday and custom holiday handling.
- Added the rule that off-peak time after a day off continues until 07:00 on the next workday.
- Added component, combined-price and external-entity price modes.
- Added separate seasonal energy prices and distribution prices for all three zones.
- Added configurable variable surcharges and monthly fixed fees.
- Added the 2026 gross TAURON Dystrybucja G13 preset; user energy-sale prices remain intentionally empty.
- Added active zone, season, day type, next-zone and price-component sensors.
- Added live grid-import and appliance cost-per-hour calculations.
- Added a dedicated Matrix Blue **Ceny / G13** panel with a complete tariff editor.
- Added automated tariff tests for summer, winter, weekends, holidays and 2026 fee calculations.
- Migrated the local project document to configuration schema version 2.

## 0.1.0 — 2026-07-15

- Initial technical preview.
- Added HACS-ready Home Assistant custom integration.
- Added local Matrix Blue custom panel.
- Added generic grid, PV, battery, EV and price mappings.
- Added normalized sensors and live balance calculations.
- Added PV strings with multiple sections per string.
- Added arbitrary appliance configuration and generic controls.
- Added diagnostics, import/export and administrator protections.
- Added Polish and English setup translations.
