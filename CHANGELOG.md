# Changelog

## 0.5.0 — 2026-07-15

- Added configurable overview bubbles for any Home Assistant entity or entity attribute.
- Added editable bubble names, descriptions, MDI icons, foreground/background colors, units, precision, multipliers, order and session sparklines.
- Added configurable line, area and bar charts with session sampling, current value and min/max labels.
- Added global overview controls for standard/custom bubbles, custom charts, bubble size and chart column count.
- Added a dedicated Widgets editor with entity picker and live preview.
- Added a full-screen kiosk flow card with configurable bubbles, clock, status strip and diagram height.
- Added configuration schema version 5 with automatic migration from v0.1–v0.4.
- Updated the frontend cache key, package metadata, example configuration and release documentation to v0.5.0.

## 0.4.0 — 2026-07-15

- Added independent PV-string nodes to the main live energy-flow diagram.
- Added optional flow nodes for arbitrary configured devices.
- Added source, consumer and bidirectional device roles with direction-aware animations.
- Added per-string and per-device flow visibility, order, label and icon settings.
- Added a dedicated flow-window editor with a live preview.
- Added automatic, compact and wide layouts; rounded, technical and soft node styles.
- Added configurable animation speed, branch spacing, PV-string/device limits, value/status visibility and inactive-device hiding.
- Added responsive source and load branch buses while retaining the central grid, PV, home and battery topology.
- Added configuration schema version 4 with automatic migration from v0.1–v0.3.
- Updated the frontend cache key, package metadata, examples and release documentation to v0.4.0.

## 0.3.0 — 2026-07-15

- Rebuilt the live flow diagram on a responsive CSS grid so nodes and connectors stay aligned on desktop, tablet and mobile.
- Added immediate show/hide behavior for grid, PV, battery, EV, prices, appliances and automation modules.
- Added live appearance controls for the Matrix background, animations, compact header, status bar and flow density.
- Replaced plain entity text fields with a Home Assistant-style entity picker driven by the live `hass.states` registry.
- Added entity filtering by power, energy, voltage, current, temperature, percentage, price, status and control capability.
- Added friendly name, entity ID, device class, unit and current formatted state to search results and selected fields.
- Greatly expanded source mappings for home, grid, inverter, PV, battery/BMS, EV/charger and prices/costs.
- Added separate grid import/export and battery charge/discharge power mappings with priority over signed sensors.
- Expanded PV strings and sections with MPPT, voltage, current, status, enabled and overview visibility settings.
- Expanded appliances with status/cycle entities, active and standby thresholds, priority, live descriptions and overview visibility.
- Added configuration schema version 3 with automatic deep migration from earlier installations.
- Updated panel cache version and package metadata to v0.3.0.

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
