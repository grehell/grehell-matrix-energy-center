const MATRIX_DOMAIN = "matrix_energy_center";

class MatrixEnergyFlowCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._cardConfig = {};
    this._project = null;
    this._runtime = null;
    this._loading = false;
    this._error = "";
    this._renderPending = false;
  }

  static getStubConfig() {
    return {
      profile: "default",
      title: "",
      show_header: true,
      show_bubbles: true,
      show_custom_bubbles: true,
      show_pv_strings: true,
      show_devices: true,
      height: 720,
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object") throw new Error("Brak konfiguracji karty");
    this._cardConfig = { ...MatrixEnergyFlowCard.getStubConfig(), ...config };
    this._scheduleRender();
  }

  set hass(value) {
    this._hass = value;
    if (!this._project) this._bootstrap();
    else this._scheduleRender();
  }

  get hass() { return this._hass; }

  connectedCallback() {
    this._bootstrap();
    clearInterval(this._refreshTimer);
    this._refreshTimer = setInterval(() => this._refreshRuntime(), 15000);
  }

  disconnectedCallback() { clearInterval(this._refreshTimer); }

  getCardSize() {
    return Math.max(8, Math.ceil(Number(this._cardConfig.height || 720) / 50));
  }

  getGridOptions() {
    return { columns: "full", rows: 12, min_rows: 6, min_columns: 6 };
  }

  async _bootstrap() {
    if (!this._hass || this._loading || this._project) return;
    this._loading = true;
    this._render();
    try {
      const [project, runtime] = await Promise.all([
        this._hass.callWS({ type: `${MATRIX_DOMAIN}/config/get` }),
        this._hass.callWS({ type: `${MATRIX_DOMAIN}/runtime/get` }),
      ]);
      this._project = project;
      this._runtime = runtime || {};
      this._error = "";
    } catch (err) {
      this._error = err?.message || String(err);
    } finally {
      this._loading = false;
      this._render();
    }
  }

  async _refreshRuntime() {
    if (!this._hass || !this._project) return;
    try {
      this._runtime = await this._hass.callWS({ type: `${MATRIX_DOMAIN}/runtime/get` });
      this._scheduleRender();
    } catch (_) { /* Następna próba nastąpi automatycznie. */ }
  }

  _scheduleRender() {
    if (this._renderPending) return;
    this._renderPending = true;
    requestAnimationFrame(() => {
      this._renderPending = false;
      this._render();
    });
  }

  _profile() {
    const profileId = String(this._cardConfig.profile || "default");
    if (profileId !== "default" && profileId !== "1") {
      const profile = (this._project?.kiosk_profiles || []).find(item => item.id === profileId && item.enabled !== false);
      if (profile) return profile;
    }
    return this._project?.kiosk || {};
  }

  _render() {
    if (!this.shadowRoot) return;
    if (!this._project) {
      this.shadowRoot.innerHTML = `<ha-card><style>${this._styles()}</style><div class="loading">${this._error ? `<b>Błąd karty Matrix Energy Center</b><span>${this._esc(this._error)}</span>` : `<i></i><span>Ładowanie przepływów…</span>`}</div></ha-card>`;
      return;
    }

    const profile = this._profile();
    const height = Math.max(360, Math.min(1400, Number(this._cardConfig.height || 720)));
    const title = this._cardConfig.title || profile.title || this._project.flow?.title || "PRZEPŁYW ENERGII";
    const strings = this._flowStrings();
    const devices = this._flowDevices();
    const bubbles = this._bubbles(profile);
    const values = this._coreValues();

    this.shadowRoot.innerHTML = `<ha-card class="matrix-card" style="--card-height:${height}px">
      <style>${this._styles()}</style>
      ${this._cardConfig.show_header === false ? "" : `<header><div><span>MATRIX ENERGY CENTER</span><h2>${this._esc(title)}</h2><small>${this._esc(this._project.general?.installation_name || "Energy Center")}</small></div><div class="live"><i></i>NA ŻYWO</div></header>`}
      ${bubbles ? `<section class="bubbles">${bubbles}</section>` : ""}
      <section class="flow-stage">
        ${strings.length ? `<div class="extra-row source-row">${strings.map(item => this._extraNode(item, "source")).join("")}</div>` : ""}
        <div class="core-flow">
          ${this._node("pv", "mdi:solar-power", "PV", values.pv, "green", this._project.mappings?.pv_power)}
          ${this._link("pv", values.pvWatts > 0, false, "green")}
          ${this._node("grid", "mdi:transmission-tower", "SIEĆ", values.grid, "purple", this._project.mappings?.grid_power || this._project.mappings?.grid_import_power)}
          ${this._link("grid", values.gridWatts > 0, values.gridExport, "purple")}
          ${this._node("home", "mdi:home-lightning-bolt", "DOM", values.home, "cyan", this._project.mappings?.home_power)}
          ${this._link("battery", values.batteryWatts > 0, values.batteryDischarge, "lime")}
          ${this._node("battery", "mdi:battery-high", "MAGAZYN", values.battery, "lime", this._project.mappings?.battery_power || this._project.mappings?.battery_soc)}
          ${this._link("ev", values.evWatts > 0, false, "cyan")}
          ${this._node("ev", "mdi:car-electric", "EV", values.ev, "cyan", this._project.mappings?.ev_power)}
        </div>
        ${devices.length ? `<div class="extra-row device-row">${devices.map(item => this._extraNode(item, "device")).join("")}</div>` : ""}
      </section>
      <footer><span><i></i> SYSTEM ONLINE</span><span>STRINGI PV <b>${strings.length}</b></span><span>URZĄDZENIA <b>${devices.length}</b></span><span>REWIZJA <b>${this._esc(this._project.revision ?? 0)}</b></span></footer>
    </ha-card>`;
    this.shadowRoot.querySelectorAll("[data-flow-action]").forEach(element => {
      const execute = async event => {
        if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        await this._executeFlowAction(element.dataset.flowAction);
      };
      element.addEventListener("click", execute);
      element.addEventListener("keydown", execute);
    });
    this.shadowRoot.querySelectorAll("[data-entity]").forEach(element => element.addEventListener("click", () => this._moreInfo(element.dataset.entity)));
  }

  _coreValues() {
    const runtime = this._runtime || {};
    const home = Number(runtime.home_power);
    const pv = Number(runtime.pv_power);
    const gridImport = Number(runtime.grid_import_power);
    const gridExport = Number(runtime.grid_export_power);
    const batteryCharge = Number(runtime.battery_charge_power);
    const batteryDischarge = Number(runtime.battery_discharge_power);
    const ev = Number(runtime.ev_power);
    const valid = value => Number.isFinite(value) ? Math.max(0, value) : 0;
    const gridWatts = Math.max(valid(gridImport), valid(gridExport));
    const batteryWatts = Math.max(valid(batteryCharge), valid(batteryDischarge));
    return {
      homeWatts: valid(home), pvWatts: valid(pv), gridWatts, batteryWatts, evWatts: valid(ev),
      gridExport: valid(gridExport) > valid(gridImport),
      batteryDischarge: valid(batteryDischarge) > valid(batteryCharge),
      home: this._powerText(home), pv: this._powerText(pv),
      grid: `${valid(gridExport) > valid(gridImport) ? "−" : ""}${this._powerText(gridWatts)}`,
      battery: `${valid(batteryDischarge) > valid(batteryCharge) ? "−" : ""}${this._powerText(batteryWatts)}`,
      ev: this._powerText(ev),
    };
  }

  _flowStrings() {
    if (this._cardConfig.show_pv_strings === false || this._project.flow?.show_pv_strings === false) return [];
    const maximum = Math.max(0, Math.min(12, Number(this._project.flow?.max_pv_strings || 6)));
    return (this._runtime?.pv_strings || [])
      .filter(item => item.enabled !== false && item.show_in_flow !== false)
      .sort((a, b) => Number(a.flow_order || 0) - Number(b.flow_order || 0))
      .slice(0, maximum)
      .map((item, index) => ({ key: this._key(`string_${item.id || index + 1}`), name: item.flow_label || item.name, icon: item.flow_icon || "mdi:solar-panel-large", value: this._powerText(item.power), status: item.status || item.mppt || "String PV", color: "green", entity: item.power_entity }));
  }

  _flowDevices() {
    if (this._cardConfig.show_devices === false || this._project.flow?.show_devices === false) return [];
    const maximum = Math.max(0, Math.min(16, Number(this._project.flow?.max_devices || 6)));
    return (this._runtime?.appliances || [])
      .filter(item => item.enabled !== false && item.show_in_flow === true)
      .sort((a, b) => Number(a.flow_order || a.priority || 0) - Number(b.flow_order || b.priority || 0))
      .slice(0, maximum)
      .map((item, index) => ({ key: this._key(`device_${item.id || index + 1}`), name: item.flow_label || item.name, icon: item.icon || "mdi:flash", value: this._powerText(item.power), status: item.display_description || item.status_state || "Urządzenie", color: item.accent || "cyan", entity: item.power_entity }));
  }

  _bubbles(profile) {
    if (this._cardConfig.show_bubbles === false) return "";
    const runtime = this._runtime || {};
    const builtin = profile.show_builtin_bubbles === false ? [] : [
      ["DOM", "mdi:home-lightning-bolt", this._powerText(runtime.home_power), "cyan"],
      ["PV", "mdi:solar-power", this._powerText(runtime.pv_power), "green"],
      ["SIEĆ", "mdi:transmission-tower", this._powerText(Math.max(Number(runtime.grid_import_power) || 0, Number(runtime.grid_export_power) || 0)), "purple"],
      ["MAGAZYN", "mdi:battery-high", this._numberText(runtime.battery_soc, "%", 0), "lime"],
    ];
    const standard = builtin.map(([name, icon, value, color]) => `<article class="bubble accent-${color}"><ha-icon icon="${icon}"></ha-icon><span><small>${name}</small><b>${this._esc(value)}</b></span></article>`).join("");
    if (this._cardConfig.show_custom_bubbles === false || profile.show_custom_bubbles === false) return standard;
    const selection = profile.bubble_selection || "all";
    const ids = new Set(profile.bubble_ids || []);
    const custom = (this._project.overview_bubbles || [])
      .filter(item => item.enabled !== false && (selection !== "selected" || ids.has(item.id)))
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      .map(item => this._customBubble(item)).join("");
    return standard + custom;
  }

  _customBubble(item) {
    const value = this._widgetValue(item);
    const numeric = value.numeric;
    let color = this._color(item.color, "#20eaff");
    if (numeric == null) color = this._color(item.unavailable_color, "#6d7d86");
    else if (item.color_mode === "threshold") {
      color = numeric < Number(item.low_threshold || 0) ? this._color(item.low_color, "#008cff") : numeric > Number(item.high_threshold || 100) ? this._color(item.high_color, "#ff4d6d") : this._color(item.normal_color, color);
    }
    const related = (item.related_entities || []).filter(relatedItem => relatedItem.enabled !== false && relatedItem.entity_id).map(relatedItem => {
      const relatedValue = this._widgetValue(relatedItem);
      return `<span style="--related:${this._color(relatedItem.color, color)}"><small>${this._esc(relatedItem.name)}</small><b>${this._esc(relatedValue.formatted)}</b><i>${this._esc(relatedValue.unit)}</i></span>`;
    }).join("");
    return `<article class="bubble custom" style="--accent:${color}" ${item.entity_id ? `data-entity="${this._escAttr(item.entity_id)}"` : ""}><ha-icon icon="${this._escAttr(item.icon || "mdi:information-outline")}"></ha-icon><div><small>${this._esc(item.name)}</small><strong>${this._esc(value.formatted)} <i>${this._esc(value.unit)}</i></strong>${related ? `<div class="related">${related}</div>` : ""}</div></article>`;
  }

  _widgetValue(item) {
    const state = item.entity_id ? this._hass?.states?.[item.entity_id] : null;
    let raw = state?.state;
    if (item.attribute) raw = String(item.attribute).split(".").reduce((value, key) => value == null ? undefined : value[key], state?.attributes);
    if (raw == null || ["unknown", "unavailable", "none", ""].includes(String(raw).toLowerCase())) return { numeric: null, formatted: "--", unit: item.unit || "" };
    const source = Number(raw), multiplier = Number(item.multiplier ?? 1);
    const numeric = Number.isFinite(source) ? source * (Number.isFinite(multiplier) ? multiplier : 1) : null;
    const decimals = Math.max(0, Math.min(6, Number(item.decimals ?? 1)));
    return { numeric, formatted: numeric == null ? String(raw) : numeric.toFixed(decimals), unit: item.unit || (item.attribute ? "" : state?.attributes?.unit_of_measurement || "") };
  }

  _key(value) { return String(value || "element").replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase(); }

  _flowSettings(key) { return this._profile()?.flow_element_styles?.[this._key(key)] || null; }

  _safeImageUrl(value) {
    const url = String(value || "").trim();
    return /^(\/local\/|\/media\/|\/api\/image\/serve\/|https:\/\/)/i.test(url) ? url : "";
  }

  _flowElementStyle(key, kind = "node") {
    const stored = this._profile()?.flow_node_positions?.[this._key(key)] || {};
    const x = Math.max(-600, Math.min(600, Number(stored.x || 0)));
    const y = Math.max(-600, Math.min(600, Number(stored.y || 0)));
    const parts = [`--flow-x:${x}px`, `--flow-y:${y}px`];
    const style = this._flowSettings(key);
    if (!style?.appearance_enabled) return parts.join(";");
    if (["node", "extra"].includes(kind)) {
      if (Number(style.width) > 0) parts.push(`width:${Math.max(50, Math.min(360, Number(style.width)))}px!important`);
      if (Number(style.height) > 0) parts.push(`height:${Math.max(40, Math.min(360, Number(style.height)))}px!important`, `min-height:${Math.max(40, Math.min(360, Number(style.height)))}px!important`);
      parts.push(`--custom-border:${this._color(style.border_color, "#20eaff")}`);
      parts.push(`--custom-bg:${this._color(style.background_color, "#020c18")}`);
      parts.push(`--custom-icon:${this._color(style.icon_color, "#20eaff")}`);
      parts.push(`--custom-name:${this._color(style.name_color, "#eefaff")}`);
      parts.push(`--custom-value:${this._color(style.value_color, "#20eaff")}`);
      parts.push(`--custom-unit:${this._color(style.unit_color, "#94b5c0")}`);
      parts.push(`--custom-border-width:${Math.max(1, Math.min(8, Number(style.border_width || 1)))}px`);
      parts.push(`--custom-radius:${Math.max(0, Math.min(100, Number(style.border_radius ?? 18)))}px`);
      parts.push(`--custom-icon-size:${Math.max(10, Math.min(120, Number(style.icon_size || 32)))}px`);
    } else {
      parts.push(`--wire:${this._color(style.line_color, "#20eaff")}`);
      parts.push(`--line-thickness:${Math.max(1, Math.min(14, Number(style.line_thickness || 3)))}px`);
    }
    return parts.join(";");
  }

  _flowIcon(key, fallback) {
    const style = this._flowSettings(key) || {};
    const image = style.icon_type === "image" ? this._safeImageUrl(style.image_url) : "";
    if (image) return `<img class="flow-custom-image" src="${this._escAttr(image)}" alt="">`;
    const icon = String(style.icon || fallback || "mdi:information-outline");
    return `<ha-icon icon="${this._escAttr(icon.startsWith("mdi:") ? icon : fallback || "mdi:information-outline")}"></ha-icon>`;
  }

  _flowName(key, fallback) { return this._flowSettings(key)?.name || fallback; }

  _flowExtraFields(key) {
    const fields = (this._flowSettings(key)?.extra_fields || []).filter(item => item.enabled !== false).slice(0, 8);
    if (!fields.length) return "";
    return `<span class="flow-extra-fields">${fields.map((field, index) => {
      const value = this._widgetValue(field);
      return `<span style="--field:${this._color(field.color, "#8eb5c3")}"><small>${this._esc(field.name || `Pole ${index + 1}`)}</small><b>${this._esc(value.formatted)}</b><i>${this._esc(value.unit)}</i></span>`;
    }).join("")}</span>`;
  }

  _flowActionAttrs(key, fallbackEntity = "") {
    const style = this._flowSettings(key);
    if (style) return style.tap_action && style.tap_action !== "none" ? `data-flow-action="${this._escAttr(this._key(key))}" tabindex="0" role="button"` : "";
    return fallbackEntity ? `data-entity="${this._escAttr(fallbackEntity)}"` : "";
  }

  async _executeFlowAction(key) {
    const style = this._flowSettings(key) || {};
    const entityId = String(style.action_entity_id || "").trim();
    try {
      if (style.tap_action === "more_info" && entityId) this._moreInfo(entityId);
      else if (style.tap_action === "toggle" && entityId) await this._hass.callService("homeassistant", "toggle", { entity_id: entityId });
      else if (style.tap_action === "navigate") {
        const path = String(style.navigation_path || "").trim();
        if (!path.startsWith("/")) return;
        window.history.pushState(null, "", path);
        window.dispatchEvent(new Event("location-changed"));
      } else if (style.tap_action === "service") {
        const [domain, service] = String(style.service || "").split(".", 2);
        if (!domain || !service) return;
        const data = JSON.parse(style.service_data || "{}");
        if (entityId && data.entity_id == null) data.entity_id = entityId;
        await this._hass.callService(domain, service, data);
      }
    } catch (err) {
      this.dispatchEvent(new CustomEvent("hass-notification", { detail: { message: `Błąd akcji Matrix: ${err?.message || err}` }, bubbles: true, composed: true }));
    }
  }

  _node(position, icon, label, value, color, entity) {
    const key = this._key(position);
    return `<button class="node ${position} accent-${color}" data-flow-element="${this._escAttr(key)}" style="${this._flowElementStyle(key, "node")}" ${this._flowActionAttrs(key, entity)}>${this._flowIcon(key, icon)}<small>${this._esc(this._flowName(key, label))}</small><strong>${this._esc(value)}</strong>${this._flowExtraFields(key)}</button>`;
  }

  _link(position, active, reverse, color) {
    const key = position === "ev" ? "wire_ev" : this._key(`link_${position}`);
    return `<div class="connector ${position} accent-${color} ${active ? "active" : "idle"} ${reverse ? "reverse" : ""}" data-flow-element="${this._escAttr(key)}" style="${this._flowElementStyle(key, "link")}" ${this._flowActionAttrs(key)}><i></i></div>`;
  }

  _extraNode(item, kind) {
    const key = this._key(item.key);
    return `<button class="extra ${kind} accent-${this._escAttr(item.color)}" data-flow-element="${this._escAttr(key)}" style="${this._flowElementStyle(key, "extra")}" ${this._flowActionAttrs(key, item.entity)}>${this._flowIcon(key, item.icon)}<span><b>${this._esc(this._flowName(key, item.name))}</b><strong>${this._esc(item.value)}</strong><small>${this._esc(item.status)}</small></span>${this._flowExtraFields(key)}</button>`;
  }

  _moreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
  }

  _powerText(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "--";
    if (Math.abs(number) >= 1000) return `${(number / 1000).toFixed(Math.abs(number) >= 10000 ? 1 : 2)} kW`;
    return `${number.toFixed(0)} W`;
  }

  _numberText(value, unit = "", digits = 1) {
    const number = Number(value);
    return Number.isFinite(number) ? `${number.toFixed(digits)} ${unit}`.trim() : "--";
  }

  _color(value, fallback) { return /^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(String(value || "")) ? String(value) : fallback; }
  _esc(value) { return String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[char]); }
  _escAttr(value) { return this._esc(value).replace(/`/g, "&#096;"); }

  _styles() { return `
    :host{display:block;--cyan:#20eaff;--green:#52ff62;--lime:#b8ff3d;--purple:#b95cff;--orange:#ffb11b;color:#eefaff;font-family:Inter,Roboto,Arial,sans-serif}*{box-sizing:border-box}button{font:inherit}.matrix-card{display:block;overflow:hidden;min-height:var(--card-height);border:1px solid rgba(32,234,255,.36);border-radius:8px;background:radial-gradient(circle at 50% 35%,rgba(0,160,220,.12),transparent 38%),linear-gradient(rgba(0,160,210,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,160,210,.035) 1px,transparent 1px),#010914;background-size:auto,28px 28px,28px 28px;box-shadow:inset 0 0 45px rgba(0,130,200,.08)}
    header{min-height:67px;display:flex;align-items:center;justify-content:space-between;padding:11px 17px;border-bottom:1px solid rgba(32,234,255,.22);background:rgba(1,10,21,.9)}header span{color:var(--cyan);font-size:8px;font-weight:900;letter-spacing:2px}header h2{font-size:18px;margin:3px 0}header small{color:#6d95a5;font-size:8px}.live{display:flex;align-items:center;gap:7px;color:#75a4b3;font-size:8px}.live i,footer i{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 9px var(--green)}
    .bubbles{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:7px;padding:8px 10px 0}.bubble{--accent:var(--cyan);min-height:66px;position:relative;display:flex;align-items:flex-start;gap:8px;padding:9px;border:1px solid color-mix(in srgb,var(--accent) 36%,rgba(32,234,255,.15));border-radius:5px;background:rgba(2,16,31,.92);overflow:hidden}.bubble>ha-icon{color:var(--accent);width:21px;height:21px}.bubble>span{display:flex;flex-direction:column}.bubble small{color:#7b9eab;font-size:7px}.bubble b{color:var(--accent);font:15px monospace;margin-top:4px}.bubble.custom{cursor:pointer}.bubble.custom>div{min-width:0}.bubble.custom strong{display:block;color:var(--accent);font:15px monospace;margin-top:3px}.bubble.custom strong i{font:7px sans-serif;color:#7898a5}.related{display:flex;flex-wrap:wrap;gap:3px 7px;margin-top:4px}.related span{--related:var(--accent);display:flex;align-items:baseline;gap:2px}.related span b{font-size:8px;color:var(--related);margin:0}.related span i{font-style:normal;font-size:6px;color:#668794}.accent-green{--accent:var(--green);--wire:var(--green)}.accent-lime{--accent:var(--lime);--wire:var(--lime)}.accent-purple{--accent:var(--purple);--wire:var(--purple)}.accent-orange{--accent:var(--orange);--wire:var(--orange)}.accent-cyan{--accent:var(--cyan);--wire:var(--cyan)}
    .flow-stage{min-height:calc(var(--card-height) - 170px);padding:10px;display:flex;flex-direction:column;justify-content:center;gap:7px}.extra-row{display:flex;justify-content:center;gap:8px;overflow-x:auto;padding:2px;scrollbar-width:thin}.extra{--accent:var(--cyan);flex:0 1 155px;min-width:110px;max-width:175px;min-height:62px;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);border-radius:7px;background:rgba(2,15,29,.94);color:white;display:flex;align-items:center;gap:7px;padding:7px;text-align:left;cursor:pointer}.extra ha-icon{width:22px;height:22px;color:var(--accent)}.extra span{display:flex;flex-direction:column;min-width:0}.extra b,.extra small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.extra b{font-size:8px}.extra strong{font:13px monospace;color:var(--accent);margin:2px 0}.extra small{font-size:6px;color:#668b99}.source-row:after,.device-row:before{content:"";align-self:center;width:22px;height:2px;background:var(--cyan)}
    .core-flow{display:grid;grid-template-columns:minmax(90px,1fr) minmax(28px,.35fr) minmax(110px,1fr) minmax(28px,.35fr) minmax(90px,1fr);grid-template-rows:96px 38px 130px 38px 96px;align-items:center;justify-items:center;max-width:850px;width:100%;margin:auto}.node{--accent:var(--cyan);width:112px;height:96px;border:1px solid var(--accent);border-radius:13px;background:radial-gradient(circle at 30% 10%,color-mix(in srgb,var(--accent) 12%,transparent),rgba(2,13,27,.97));color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 0 20px color-mix(in srgb,var(--accent) 10%,transparent)}.node ha-icon{color:var(--accent);width:26px;height:26px}.node small{font-size:7px;margin-top:3px}.node strong{font:15px monospace;color:var(--accent);margin-top:3px}.node.home{width:130px;height:120px;border-radius:50%;border-width:2px}.pv{grid-column:3;grid-row:1}.grid{grid-column:1;grid-row:3}.home{grid-column:3;grid-row:3}.battery{grid-column:5;grid-row:3}.ev{grid-column:3;grid-row:5}
    .connector{--wire:var(--cyan);position:relative;width:100%;height:100%;overflow:hidden}.connector:before{content:"";position:absolute;background:color-mix(in srgb,var(--wire) 55%,transparent);box-shadow:0 0 7px color-mix(in srgb,var(--wire) 45%,transparent)}.connector i{position:absolute;background:linear-gradient(90deg,transparent,var(--wire),white,var(--wire),transparent);box-shadow:0 0 10px var(--wire);animation:flow-x 1.2s linear infinite}.connector.pv,.connector.ev{width:28px}.connector.pv{grid-column:3;grid-row:2}.connector.ev{grid-column:3;grid-row:4}.connector.pv:before,.connector.ev:before{left:calc(50% - 1px);top:0;bottom:0;width:var(--line-thickness,2px)}.connector.pv i,.connector.ev i{left:calc(50% - 2px);top:-30%;width:max(3px,var(--line-thickness,4px));height:30%;animation-name:flow-y}.connector.grid{grid-column:2;grid-row:3}.connector.battery{grid-column:4;grid-row:3}.connector.grid:before,.connector.battery:before{left:0;right:0;top:calc(50% - 1px);height:var(--line-thickness,2px)}.connector.grid i,.connector.battery i{left:-35%;top:calc(50% - 2px);width:35%;height:max(3px,var(--line-thickness,4px))}.connector.reverse i{animation-direction:reverse}.connector.idle{opacity:.25}.connector.idle i{animation-play-state:paused}@keyframes flow-x{to{left:110%}}@keyframes flow-y{to{top:110%}}
    /* Per-profile flow layout, appearance, fields and interactions shared with the Matrix panel. */
    .matrix-card,.flow-stage,.core-flow{overflow:visible}.core-flow [data-flow-element],.extra-row [data-flow-element]{transform:translate(var(--flow-x,0),var(--flow-y,0))}
    .node[data-flow-element],.extra[data-flow-element]{border-color:var(--custom-border);border-width:var(--custom-border-width);border-radius:var(--custom-radius);background:var(--custom-bg)}
    .node[data-flow-element]>ha-icon,.extra[data-flow-element]>ha-icon{color:var(--custom-icon);width:var(--custom-icon-size);height:var(--custom-icon-size)}
    .flow-custom-image{display:block;width:var(--custom-icon-size,28px);height:var(--custom-icon-size,28px);object-fit:contain;filter:drop-shadow(0 0 7px var(--custom-icon,var(--accent)))}
    .node[data-flow-element]>small,.extra[data-flow-element]>span:first-of-type>b{color:var(--custom-name)}.node[data-flow-element]>strong,.extra[data-flow-element]>span:first-of-type>strong{color:var(--custom-value)}.extra[data-flow-element]>span:first-of-type>small{color:var(--custom-unit)}
    .flow-extra-fields{width:100%;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 5px;margin-top:4px;padding-top:3px;border-top:1px solid color-mix(in srgb,var(--custom-border,var(--accent)) 22%,transparent)}
    .flow-extra-fields>span{min-width:0;display:grid!important;grid-template-columns:minmax(0,1fr) auto;align-items:baseline;column-gap:2px;color:var(--field)}.flow-extra-fields small{grid-column:1/-1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:color-mix(in srgb,var(--field) 72%,#7896a2);font-size:6px}.flow-extra-fields b{margin:0;color:var(--field);font:8px monospace}.flow-extra-fields i{color:var(--field);font:6px sans-serif}
    [data-flow-action]{cursor:pointer}[data-flow-action]:focus-visible{outline:2px solid var(--orange);outline-offset:3px}[data-flow-action]:hover{filter:brightness(1.15)}
    footer{min-height:34px;display:flex;align-items:center;justify-content:space-around;gap:12px;padding:6px 11px;border-top:1px solid rgba(32,234,255,.2);background:rgba(1,10,21,.9);color:#6d96a4;font-size:7px}footer span{display:flex;align-items:center;gap:5px}footer b{color:var(--cyan);font-family:monospace}.loading{min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#010914;color:#779aa8}.loading b{color:#ff6b86}.loading i{width:38px;height:38px;border:2px solid rgba(32,234,255,.2);border-top-color:var(--cyan);border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
    @media(max-width:700px){.matrix-card{min-height:0}.bubbles{grid-template-columns:repeat(2,1fr)}.flow-stage{min-height:560px;overflow-x:auto}.core-flow{min-width:480px}.extra-row{justify-content:flex-start}.node{width:96px;height:88px}.node.home{width:112px;height:108px}header{align-items:flex-start}footer{justify-content:flex-start;overflow-x:auto}}
  `; }
}

if (!customElements.get("matrix-energy-flow-card")) customElements.define("matrix-energy-flow-card", MatrixEnergyFlowCard);
window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === "matrix-energy-flow-card")) {
  window.customCards.push({ type: "matrix-energy-flow-card", name: "Matrix Energy Flow Card", description: "Natywna karta Lovelace z przepływami Matrix Energy Center", preview: true });
}
