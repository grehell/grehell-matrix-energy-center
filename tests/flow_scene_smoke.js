/* Runtime smoke tests for the v0.7 shared flow-scene renderer. */
const fs = require("fs");
const vm = require("vm");

let Panel;
const context = {
  HTMLElement: class { attachShadow() { this.shadowRoot = {}; } },
  customElements: { define: (_name, cls) => { Panel = cls; } },
  window: { location: { search: "", origin: "https://ha.example", pathname: "/matrix-energy-center" }, history: { pushState: () => {} }, dispatchEvent: () => {} },
  URLSearchParams,
  URL,
  console,
  setInterval,
  clearInterval,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: callback => callback(),
};
vm.createContext(context);
vm.runInContext(fs.readFileSync("custom_components/matrix_energy_center/frontend/matrix-energy-center-panel.js", "utf8"), context);

const panel = new Panel();
panel._hass = { states: {}, user: { is_admin: true } };
panel._runtime = {
  home_power: 1200,
  pv_power: 900,
  grid_import_power: 420,
  grid_export_power: 0,
  battery_charge_power: 0,
  battery_discharge_power: 0,
  ev_power: 0,
};
const scene = () => ({ canvas_height: 620, show_grid: true, grid_size: 20, snap_to_grid: true, background_color: "#020b16", border_color: "#20eaff", border_width: 1, border_radius: 16, elements: {}, connections: {} });
panel._config = {
  general: { currency: "PLN", installation_name: "Test" },
  features: { grid: true, pv: true, battery: true, ev: true, appliances: true, prices: false },
  appearance: { show_unconfigured_cards: true },
  signs: { grid_positive_is_import: true, battery_positive_is_charge: true },
  mappings: {},
  flow: { title: "TEST", show_pv_strings: true, show_devices: true, max_pv_strings: 6, max_devices: 6, flow_scene: scene(), flow_element_styles: {} },
  overview: { flow_scene: scene(), flow_element_styles: {} },
  kiosk: { title: "ENERGIA", flow_scene: scene(), flow_element_styles: {}, slide_headers: {}, lovelace_views: [], builtin_bubble_ids: ["home", "pv", "grid"], rotate_flow: true, rotate_charts: false, rotate_overview: true, show_builtin_bubbles: true, show_custom_bubbles: false },
  pv_strings: [], devices: [], overview_bubbles: [], overview_charts: [], kiosk_profiles: [],
  permissions: { show_configuration_to_non_admin: false }, automation: { enabled: false },
};

const assert = (condition, message) => { if (!condition) throw new Error(message); };
let model = panel._flowSceneModel(panel._config.flow);
const connection = key => model.connections.find(item => item.key === key);

assert(panel._sceneConnectionState(connection("link_grid")).state === "forward", "grid import must be forward");
panel._runtime.grid_import_power = 0; panel._runtime.grid_export_power = 420;
assert(panel._sceneConnectionState(connection("link_grid")).state === "reverse", "grid export must be reverse");
panel._runtime.grid_export_power = 0;
assert(panel._sceneConnectionState(connection("link_grid")).state === "idle", "zero grid flow must be idle");
delete panel._runtime.grid_import_power; delete panel._runtime.grid_export_power;
assert(panel._sceneConnectionState(connection("link_grid")).state === "unavailable", "grid without a source must be unavailable");
panel._runtime.grid_import_power = 0; panel._runtime.grid_export_power = 0;

panel._runtime.battery_charge_power = 500; panel._runtime.battery_discharge_power = 0;
assert(panel._sceneConnectionState(connection("link_battery")).state === "forward", "battery charge must be home to battery");
panel._runtime.battery_charge_power = 0; panel._runtime.battery_discharge_power = 500;
assert(panel._sceneConnectionState(connection("link_battery")).state === "reverse", "battery discharge must be battery to home");

const custom = { ...connection("link_grid"), direction_source: "entity", entity_id: "sensor.direction", deadband: 2, positive_direction: "forward" };
assert(panel._sceneConnectionState(custom).state === "unavailable", "missing direction entity must be unavailable");
panel._hass.states["sensor.direction"] = { state: "5", attributes: {} };
assert(panel._sceneConnectionState(custom).state === "forward", "positive entity must be forward");
custom.positive_direction = "reverse";
assert(panel._sceneConnectionState(custom).state === "reverse", "positive-direction inversion must work");

const before = panel._sceneConnectionPath(connection("link_grid"), model.byKey);
panel._config.flow.flow_scene.elements.home = { x: 65, y: 70, width: 150, height: 150, z_index: 20, visible: true, locked: false };
model = panel._flowSceneModel(panel._config.flow);
const after = panel._sceneConnectionPath(model.connections.find(item => item.key === "link_grid"), model.byKey);
assert(before !== after, "connection path must follow a moved node");

panel._config.overview.flow_scene.elements.home = { x: 20, y: 20, width: 150, height: 150, z_index: 20, visible: true, locked: false };
assert(panel._flowSceneModel(panel._config.overview).byKey.home.x === 20, "overview scene must be independent");
assert(panel._flowSceneModel(panel._config.flow).byKey.home.x === 65, "flow scene must retain its own position");
panel._config.kiosk.flow_scene.elements.home = { x: 82, y: 42, width: 150, height: 150, z_index: 20, visible: true, locked: false };
assert(panel._flowSceneModel(panel._config.kiosk).byKey.home.x === 82, "kiosk scene must be independent");

panel._config.flow.flow_scene.connections.link_grid = { label: "IMPORT / EKSPORT", label_color: "#abcdef", forward_color: "#112233", reverse_color: "#445566", label_bold: true };
panel._config.flow.flow_element_styles.home = { name_size: 14, value_size: 25, unit_size: 10, status_size: 8, name_bold: false, value_bold: true, unit_bold: true, status_bold: false, extra_fields: [{ id: "extra", name: "DZIŚ", entity_id: "sensor.extra", label_bold: true, value_bold: false, unit_bold: true }] };
model = panel._flowSceneModel(panel._config.flow);
assert(connection("link_grid").label === "IMPORT / EKSPORT", "custom connection label must be rendered");
assert(connection("link_grid").forward_color === "#112233", "custom forward color must be retained");

const html = panel._flowDiagram(true, false, panel._config.flow, true);
assert(html.includes('data-scene-node="home"'), "home node missing from renderer");
assert(html.includes('data-scene-connection="link_grid"'), "grid connection missing from renderer");
assert(html.includes("scene-connection-flow"), "animated direction layer missing");
assert(html.includes("IMPORT / EKSPORT"), "custom line label missing from renderer");
assert(html.includes("--scene-name-size:14px"), "custom node name font size missing");
assert(html.includes("--scene-value-size:25px"), "custom node value font size missing");
assert(html.includes("--scene-name-weight:400"), "custom node name bold setting missing");
assert(html.includes("--scene-unit-weight:700"), "custom node unit bold setting missing");
assert(html.includes("--flow-field-label-weight:700"), "extra-field label bold setting missing");
assert(html.includes("--flow-field-value-weight:400"), "extra-field value bold setting missing");
assert(html.includes("--label-weight:700"), "connection-label bold setting missing");

panel._config.flow.flow_element_styles.home.icon_type = "emoji";
panel._config.flow.flow_element_styles.home.emoji = "🏠";
const emojiFlowHtml = panel._flowDiagram(true, false, panel._config.flow, true);
assert(emojiFlowHtml.includes("flow-node-emoji"), "flow bubble emoji renderer missing");
assert(emojiFlowHtml.includes("🏠"), "selected flow bubble emoji missing");

const bubbleDraft = panel._newOverviewBubble(1);
bubbleDraft.icon_type = "emoji";
bubbleDraft.emoji = "🔋";
bubbleDraft.name_bold = true;
bubbleDraft.name_size = 14;
const bubbleHtml = panel._overviewBubble(bubbleDraft, 0);
assert(bubbleHtml.includes("bubble-emoji") && bubbleHtml.includes("🔋"), "overview bubble emoji renderer missing");
assert(bubbleHtml.includes("--bubble-name-size:14px"), "overview bubble name size missing");
assert(bubbleHtml.includes("--bubble-name-weight:700"), "overview bubble bold name missing");
panel._bubbleEditor = { index: -1, isNew: true, draft: bubbleDraft };
const bubbleEditorHtml = panel._renderBubbleEditor();
assert(bubbleEditorHtml.includes("ZAPISZ DYMEK"), "unified bubble editor save action missing");
assert(bubbleEditorHtml.includes("Wklej emoji"), "emoji text field missing from bubble editor");
assert(!bubbleEditorHtml.includes("Adres obrazu"), "bubble editor must not require an image URL");
panel._bubbleEditor = null;

panel._settingsTarget = "flow";
panel._settingsSelectedKey = "home";
const tilePayload = panel._settingsTilePayload();
assert(tilePayload?.kind === "matrix_flow_tile", "tile clipboard payload missing");
panel._settingsTarget = "overview";
panel._settingsSelectedKey = "home";
const destinationX = panel._config.overview.flow_scene.elements.home.x;
assert(panel._applySettingsTilePayload(tilePayload, "style"), "tile style paste failed");
assert(panel._config.overview.flow_scene.elements.home.x === destinationX, "style paste must preserve destination position");
assert(panel._config.overview.flow_element_styles.home.emoji === "🏠", "tile appearance was not copied between dashboards");
assert(panel._applySettingsTilePayload(tilePayload, "all"), "full tile paste failed");
assert(panel._config.overview.flow_scene.elements.home.x === tilePayload.layout.x, "full tile paste must copy position");

const sameOrigin = panel._normalizeHaViewPath("https://ha.example/dashboard-energy/home?kiosk=1#top");
assert(sameOrigin.path === "/dashboard-energy/home?kiosk=1#top" && !sameOrigin.error, "same-origin HA URL must become a local path");
assert(panel._normalizeHaViewPath("dashboard-energy/home").path === "/dashboard-energy/home", "path without slash must be normalized");
assert(Boolean(panel._normalizeHaViewPath("https://other.example/dashboard").error), "foreign origin must be rejected");

panel._config.kiosk.slide_headers.flow = { ...panel._defaultKioskHeader(panel._kioskHeaderDefinitions(panel._config.kiosk)[0]), title: "MÓJ PRZEPŁYW", height: 74, show_navigation: true };
panel._config.kiosk.lovelace_views = [{ id: "lights", name: "OŚWIETLENIE", path: "/dashboard-home/lights", enabled: true, scale: 110, offset_x: 12, offset_y: -8, padding: 4, border_radius: 18, background_color: "#010203", border_color: "#abcdef" }];
const kioskHtml = panel._renderKiosk();
assert(kioskHtml.includes("kiosk-slide-header"), "per-slide kiosk header missing");
assert(kioskHtml.includes("MÓJ PRZEPŁYW"), "custom flow-slide title missing");
assert(kioskHtml.includes("kiosk-header-navigation"), "navigation must be inside the kiosk header");
assert(kioskHtml.includes("kiosk-tab-button"), "named kiosk tabs must be rendered in the top header");
assert(kioskHtml.includes("OŚWIETLENIE"), "Lovelace dashboard must become a named kiosk tab");
assert(kioskHtml.includes('src="/dashboard-home/lights"'), "Lovelace dashboard must be embedded as a kiosk slide");
assert(kioskHtml.includes("--kiosk-view-scale:1.1"), "per-tab scale must be rendered");
assert(kioskHtml.includes("--kiosk-view-x:12px"), "per-tab X offset must be rendered");
assert(kioskHtml.includes("--kiosk-header-title-weight:700"), "kiosk-header bold setting must be rendered");
assert(!kioskHtml.includes("kiosk-status"), "removed kiosk status bar must not be rendered");
const kioskConfigHtml = panel._renderKioskConfiguration();
assert(kioskConfigHtml.includes("DODAJ ZAKŁADKĘ DO TEGO KIOSKU"), "dedicated kiosk tab configuration is missing");
assert(kioskConfigHtml.includes("/dashboard-home/lights"), "configured kiosk dashboard is missing from kiosk configuration");

(async () => {
  const savedDraft = panel._newOverviewBubble(2);
  savedDraft.name = "Dom 🏠";
  savedDraft.icon_type = "emoji";
  savedDraft.emoji = "🏠";
  panel._bubbleEditor = { index: -1, isNew: true, draft: savedDraft };
  panel._saveConfig = async () => true;
  await panel._saveBubbleEditor();
  assert(panel._config.overview_bubbles.some(item => item.name === "Dom 🏠" && item.emoji === "🏠"), "saved bubble draft missing from configuration");
  assert(panel._bubbleEditor === null, "successful save must close bubble editor");
  console.log("flow scene rules ok");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
