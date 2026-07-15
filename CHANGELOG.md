# Changelog

## 0.6.3 — 2026-07-16

- Added a dedicated Samsung Galaxy Tab A9 landscape 16:9 kiosk display preset.
- Added per-kiosk display preset, compact header, bubble limit and chart-column controls.
- Reworked kiosk viewport sizing to use the dynamic viewport height without page scrolling.
- Added compact 16:9 flow nodes, metrics, charts, summary panels, navigation and status bar.
- Added rounded frames to all top metric bubbles.
- Added per-bubble colors for frame, background, icon, name, value, unit and description.
- Added configurable frame width/radius, icon/value size, padding, alignment and element visibility.
- Added independent label, value and unit styling for secondary and related entities.

## 0.6.2 — 2026-07-16

- Reissued the complete v0.6 frontend after the incorrect `v0.6.1` tag pointed to files whose manifest still declared v0.5.0.
- Included the native `matrix-energy-flow-card.js` Lovelace card in the release source.
- Tied the custom-panel cache key to the shared integration version to prevent future version drift.
- Added release verification and GitHub upload instructions.

## 0.6.1 — 2026-07-15

- Added the native `custom:matrix-energy-flow-card` Lovelace card.
- Added automatic frontend module registration when the integration starts.
- Added card options for kiosk profile, height, header, bubbles, custom bubbles, PV strings and additional devices.
- Removed the need to embed the Home Assistant panel inside an iframe.
- Added Lovelace card smoke tests and installation documentation.

## 0.6.0 — 2026-07-15

- Added a secondary value and up to eight independently styled related entities inside each custom overview bubble.
- Added up to eight additional colored series to each chart, including a live legend and grouped bars.
- Added Recorder-backed 24-hour, 7-day and 30-day history ranges with Statistics-first loading for longer ranges and ordinary-history fallback.
- Added threshold-driven bubble colors, unavailable colors and configurable visual alarm conditions.
- Added more-info, navigation and Home Assistant service actions for bubbles and charts.
- Added drag-and-drop ordering for overview bubbles and charts.
- Added named kiosk profiles with per-screen bubble/chart selection and direct `?kiosk=<profile>` URLs.
- Added automatic kiosk slide rotation, manual slide controls and scheduled night dimming.
- Added configuration schema version 6 with automatic migration from v0.1–v0.5.
- Updated the frontend cache key, package metadata, examples, tests and release documentation to v0.6.0.

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
