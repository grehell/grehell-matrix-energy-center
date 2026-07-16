# Changelog

## 8.0.1 — 2026-07-16

- Replaced the ambiguous Kiosk preview navigation item with a dedicated Kiosk configuration panel; the actual kiosk now opens only from a profile button or `?kiosk=...` URL.
- Added named top-header tabs for every native and Lovelace kiosk screen, plus ordering controls for additional Lovelace tabs.
- Added same-origin swipe detection inside embedded Home Assistant dashboards.
- Added per-Lovelace-tab scale, X/Y offset, padding, background, border and radius settings.
- Added independent bold controls for flow-bubble text, extra fields, connection labels and every kiosk-header text group.

## 8.0.0 — 2026-07-16

- Added independent font sizes for each flow-bubble name, main value, unit and status/description.
- Added independent label, value and unit font sizes for every extra entity field inside a flow bubble.
- Removed the kiosk bottom status strip and bottom slide navigation.
- Moved slide arrows and indicators to the center of the kiosk header.
- Added a separate editable header for Flow, Charts, Overview and every configured Home Assistant/Lovelace slide.
- Added per-slide header text, icon, height, colors, font sizes, clock, navigation, fullscreen and exit visibility.
- Made the kiosk flow card consume all remaining viewport height and suppressed kiosk scrollbars.
- Fixed Home Assistant page embedding by normalizing same-origin absolute URLs and slash-less dashboard paths before saving while rejecting foreign origins.
- Added schema-v8 migration and runtime tests for kiosk headers, URL normalization and bubble font styles.

## 0.7.0 — 2026-07-16

- Replaced the old modal flow-layout editor with a dedicated top-level Settings panel.
- Added one responsive absolute-node/SVG-connection renderer shared by the editor and the Summary, Flows and kiosk Matrix dashboards.
- Added independent `flow_scene` storage for Summary, Flows, the default kiosk and every named kiosk profile, with automatic schema-v7 migration.
- Made every core, PV-string, EV and additional-device bubble draggable, resizable, hideable, lockable and layer-aware while keeping the background grid fixed.
- Made every connection follow its endpoint bubbles automatically with direct, curved and orthogonal routing.
- Added per-connection forward, reverse, idle and unavailable colors, direction entity/attribute, positive-sign convention, deadband, thickness and animation speed.
- Added editable and draggable connection labels with independent text, offsets, foreground, background, border and font size.
- Kept per-object Home Assistant actions and per-bubble custom icons, colors and up to eight additional entity fields.
- Added a per-screen scene reset and runtime JavaScript tests for direction, unavailable state, path geometry and profile independence.

## 0.6.6 — 2026-07-16

- Extended the central layout editor to every energy-flow object: core and additional nodes, connector lines, connector labels, source/load buses and individual device wires.
- Removed internal bus and flow-panel clipping so independently moved device bubbles remain visible above or below their original rows.
- Added per-dashboard width, height, colors, border, radius, icon size, MDI icon or safe custom image URL for every flow bubble.
- Added up to eight extra Home Assistant entity/attribute fields inside each flow bubble with independent labels, units, precision, multiplier and color.
- Added per-object actions for every flow dashboard: none, more-info, generic toggle, local navigation or an arbitrary Home Assistant service with JSON data.
- Added touch selection of objects in the editor and a separate properties inspector.
- Added horizontal swipe navigation between native kiosk slides with drag feedback and protected interactive controls.

## 0.6.5 — 2026-07-16

- Moved all layout editing out of the kiosk header and into a central editor opened from the Settings/Widgets screen.
- Added independent per-dashboard positions for the Grid, Home, PV, Battery, EV, PV-string and additional-device flow nodes.
- Added separate layout storage for the main overview, the Flow dashboard, the default kiosk and every named kiosk profile.
- Kept the Matrix grid fixed while individual flow nodes and top data bubbles are dragged.
- Made the complete data-bubble surface draggable and retained the dedicated width-resize handle.
- Fixed the Galaxy Tab A9 16:9 flow canvas height calculation that caused the bottom device row to be clipped by the grid frame and slide navigation.
- Reduced the tablet flow rows and node sizes so the complete diagram fits above navigation and status bars.
- Removed the kiosk-header layout button and whole-background drag handle.

## 0.6.4 — 2026-07-16

- Made every built-in kiosk bubble independently selectable; the battery bubble is no longer enabled by default.
- Made price, consumer, battery-SOC and self-sufficiency summary panels independently selectable; both gauges are disabled by default.
- Added a touch-friendly kiosk layout editor for dragging/resizing bubbles and moving the complete flow diagram.
- Added per-profile free bubble positions, bubble-stage height, flow X/Y offsets and flow scale with reset controls.
- Added same-origin Lovelace views as optional kiosk slides participating in navigation and automatic rotation.
- Added automatic fullscreen on the first user interaction while retaining compatibility with Fully Kiosk immersive mode.

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
