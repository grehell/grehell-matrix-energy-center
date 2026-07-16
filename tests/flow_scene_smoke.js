/* Runtime smoke tests for the v0.7 shared flow-scene renderer. */
const fs = require("fs");
const vm = require("vm");

let Panel;
const context = {
  HTMLElement: class { attachShadow() { this.shadowRoot = {}; } },
  customElements: { define: (_name, cls) => { Panel = cls; } },
  window: { location: { search: "" } },
  URLSearchParams,
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
  kiosk: { flow_scene: scene(), flow_element_styles: {} },
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

panel._config.flow.flow_scene.connections.link_grid = { label: "IMPORT / EKSPORT", label_color: "#abcdef", forward_color: "#112233", reverse_color: "#445566" };
model = panel._flowSceneModel(panel._config.flow);
assert(connection("link_grid").label === "IMPORT / EKSPORT", "custom connection label must be rendered");
assert(connection("link_grid").forward_color === "#112233", "custom forward color must be retained");

const html = panel._flowDiagram(true, false, panel._config.flow, true);
assert(html.includes('data-scene-node="home"'), "home node missing from renderer");
assert(html.includes('data-scene-connection="link_grid"'), "grid connection missing from renderer");
assert(html.includes("scene-connection-flow"), "animated direction layer missing");
assert(html.includes("IMPORT / EKSPORT"), "custom line label missing from renderer");
console.log("flow scene rules ok");
