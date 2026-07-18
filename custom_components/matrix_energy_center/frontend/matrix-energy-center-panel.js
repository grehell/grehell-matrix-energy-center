const DOMAIN = "matrix_energy_center";

const ROLE_DEFS = [
  // key, label, description, module, filter
  ["home_power", "Moc domu", "Chwilowa moc całego domu. Puste pole pozwala wyliczyć ją z bilansu.", "home", "power"],
  ["home_energy_today", "Energia domu dzisiaj", "Zużycie domu od początku dnia.", "home", "energy"],
  ["home_energy_month", "Energia domu w miesiącu", "Zużycie domu w bieżącym miesiącu.", "home", "energy"],

  ["grid_power", "Moc sieci ze znakiem", "Jeden dwukierunkowy sensor. Kierunek dodatni ustawisz w konfiguracji.", "grid", "power"],
  ["grid_import_power", "Osobna moc importu", "Opcjonalna dodatnia moc pobierana z sieci. Ma pierwszeństwo przed sensorem ze znakiem.", "grid", "power"],
  ["grid_export_power", "Osobna moc eksportu", "Opcjonalna dodatnia moc oddawana do sieci. Ma pierwszeństwo przed sensorem ze znakiem.", "grid", "power"],
  ["grid_import_energy", "Energia pobrana z sieci", "Narastający licznik importu, najlepiej kWh i total_increasing.", "grid", "energy"],
  ["grid_export_energy", "Energia oddana do sieci", "Narastający licznik eksportu, najlepiej kWh i total_increasing.", "grid", "energy"],
  ["grid_voltage", "Napięcie sieci", "Napięcie jednej fazy albo wartość średnia.", "grid", "voltage"],
  ["grid_current", "Prąd sieci", "Prąd pobierany z sieci.", "grid", "current"],
  ["grid_frequency", "Częstotliwość sieci", "Częstotliwość w Hz.", "grid", "frequency"],
  ["grid_power_factor", "Współczynnik mocy", "Power factor 0–1 albo procent.", "grid", "power_factor"],

  ["pv_power", "Łączna moc PV", "Opcjonalny sensor sumaryczny. Bez niego moc zostanie zsumowana ze stringów.", "pv", "power"],
  ["pv_energy_today", "Produkcja PV dzisiaj", "Dzisiejsza produkcja w Wh lub kWh.", "pv", "energy"],
  ["pv_energy_month", "Produkcja PV w miesiącu", "Produkcja w bieżącym miesiącu.", "pv", "energy"],
  ["pv_energy_total", "Produkcja PV całkowita", "Narastający licznik produkcji.", "pv", "energy"],
  ["pv_forecast_today", "Prognoza PV na dziś", "Prognozowana energia na dziś.", "pv", "energy"],
  ["pv_forecast_tomorrow", "Prognoza PV na jutro", "Prognozowana energia na jutro.", "pv", "energy"],
  ["inverter_status", "Stan falownika", "Tekstowy lub binarny stan falownika.", "pv", "status"],
  ["inverter_temperature", "Temperatura falownika", "Temperatura elektroniki falownika.", "pv", "temperature"],

  ["battery_power", "Moc magazynu ze znakiem", "Dwukierunkowa moc ładowania i rozładowania.", "battery", "power"],
  ["battery_charge_power", "Osobna moc ładowania", "Opcjonalna dodatnia moc ładowania.", "battery", "power"],
  ["battery_discharge_power", "Osobna moc rozładowania", "Opcjonalna dodatnia moc rozładowania.", "battery", "power"],
  ["battery_soc", "SOC magazynu", "Poziom naładowania w procentach.", "battery", "percentage"],
  ["battery_energy", "Dostępna energia", "Aktualnie dostępna energia w magazynie.", "battery", "energy"],
  ["battery_capacity", "Pojemność magazynu", "Nominalna albo użyteczna pojemność.", "battery", "energy"],
  ["battery_voltage", "Napięcie baterii", "Napięcie całego banku baterii.", "battery", "voltage"],
  ["battery_current", "Prąd baterii", "Prąd ładowania lub rozładowania.", "battery", "current"],
  ["battery_temperature", "Temperatura baterii", "Temperatura magazynu lub BMS.", "battery", "temperature"],
  ["battery_health", "Zdrowie baterii", "SOH w procentach.", "battery", "percentage"],
  ["battery_cycles", "Liczba cykli", "Licznik cykli magazynu.", "battery", "number"],
  ["battery_charge_energy_today", "Naładowano dzisiaj", "Energia wprowadzona dziś do magazynu.", "battery", "energy"],
  ["battery_discharge_energy_today", "Rozładowano dzisiaj", "Energia pobrana dziś z magazynu.", "battery", "energy"],
  ["battery_status", "Stan magazynu", "Stan BMS lub tryb pracy magazynu.", "battery", "status"],

  ["ev_power", "Moc ładowania EV", "Aktualna moc ładowarki lub samochodu.", "ev", "power"],
  ["ev_energy_session", "Energia sesji EV", "Energia pobrana w bieżącej sesji.", "ev", "energy"],
  ["ev_energy_today", "Energia EV dzisiaj", "Energia ładowania od początku dnia.", "ev", "energy"],
  ["ev_soc", "SOC samochodu", "Poziom baterii samochodu w procentach.", "ev", "percentage"],
  ["ev_range", "Zasięg samochodu", "Pozostały zasięg w kilometrach.", "ev", "distance"],
  ["ev_status", "Stan ładowania", "Tekstowy stan ładowarki lub pojazdu.", "ev", "status"],
  ["ev_current", "Prąd ładowania", "Aktualny prąd ładowarki.", "ev", "current"],
  ["ev_voltage", "Napięcie ładowania", "Aktualne napięcie ładowarki.", "ev", "voltage"],
  ["ev_charge_switch", "Włącznik ładowania", "Encja sterująca rozpoczęciem lub zatrzymaniem ładowania.", "ev", "control"],
  ["ev_target_soc", "Docelowy SOC", "Encja liczby określająca docelowe naładowanie.", "ev", "percentage_control"],
  ["ev_current_limit", "Limit prądu EV", "Encja liczby określająca maksymalny prąd.", "ev", "number_control"],

  ["price_buy", "Cena zakupu", "Aktualna pełna cena zakupu energii.", "prices", "price"],
  ["price_sell", "Cena sprzedaży", "Aktualna cena oddawania energii do sieci.", "prices", "price"],
  ["price_next_hour", "Cena następnej godziny", "Cena zakupu w następnej godzinie.", "prices", "price"],
  ["price_min_today", "Najniższa cena dzisiaj", "Minimalna cena bieżącego dnia.", "prices", "price"],
  ["price_max_today", "Najwyższa cena dzisiaj", "Maksymalna cena bieżącego dnia.", "prices", "price"],
  ["cost_today", "Koszt dzisiaj", "Łączny koszt energii w bieżącym dniu.", "prices", "cost"],
  ["cost_month", "Koszt miesiąca", "Łączny koszt energii w bieżącym miesiącu.", "prices", "cost"],
];

const ROLE_GROUPS = [
  ["home", "DOM I BILANS", "mdi:home-lightning-bolt-outline"],
  ["grid", "SIEĆ", "mdi:transmission-tower"],
  ["pv", "FOTOWOLTAIKA I FALOWNIK", "mdi:solar-power"],
  ["battery", "MAGAZYN ENERGII", "mdi:battery-high"],
  ["ev", "SAMOCHÓD I ŁADOWARKA EV", "mdi:car-electric"],
  ["prices", "CENY I KOSZTY", "mdi:cash-multiple"],
];

const FEATURE_DEFS = [
  ["grid", "Sieć"], ["pv", "Fotowoltaika"], ["battery", "Magazyn energii"],
  ["ev", "Samochód / ładowarka EV"], ["prices", "Ceny i taryfy"],
  ["appliances", "Dodatkowe urządzenia"], ["automation", "Automatyczne zarządzanie"],
];

const CATEGORY_OPTIONS = [
  ["dishwasher", "Zmywarka"], ["washing_machine", "Pralka"], ["dryer", "Suszarka"],
  ["oven", "Piekarnik"], ["cooktop", "Kuchenka / płyta"], ["fridge", "Lodówka"],
  ["freezer", "Zamrażarka"], ["boiler", "Bojler"], ["heat_pump", "Pompa ciepła"],
  ["hvac", "Klimatyzacja / HVAC"], ["server", "Serwerownia"], ["lighting", "Oświetlenie"],
  ["ev", "Ładowarka EV"], ["other", "Inne"],
];

const ORIENTATIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "flat", "unknown"];

class MatrixEnergyCenterPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._panel = null;
    this._config = null;
    this._runtime = null;
    this._kioskProfileId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("kiosk") : null;
    this._view = this._kioskProfileId ? "kiosk" : "overview";
    this._loading = false;
    this._message = "";
    this._lastSample = 0;
    this._history = { home: [], pv: [], grid: [], price: [] };
    this._customHistory = {};
    this._recorderHistory = {};
    this._historyLoadedAt = {};
    this._historyLoading = new Set();
    this._kioskSlide = 0;
    this._layoutEditorTarget = null;
    this._layoutEditorSnapshot = null;
    this._layoutSelectedElement = "home";
    this._layoutPointerState = null;
    this._settingsTarget = "overview";
    this._settingsSelectedKind = "node";
    this._settingsSelectedKey = "home";
    this._settingsPointerState = null;
    this._settingsTileClipboard = null;
    this._autoFullscreenArmed = false;
    this._dragState = null;
    this._rendered = false;
    this._picker = null;
    this._bubbleEditor = null;
    this._bubbleEditorViewport = null;
    this._pickerQuery = "";
    this._pickerShowAll = false;
    this._entityRegistry = {};
    this._deviceRegistry = {};
    this._areaRegistry = {};
    this._liveUpdateTimer = null;
    this._lastLiveUpdate = 0;
    this._lastSparklineDraw = 0;
    this._lastRecorderCheck = 0;
    this._relevantEntityCache = null;
    this._flowModelCache = new WeakMap();
    this._sceneGeometryTimer = null;
    this._notificationCenter = { enabled: false, active: [], events: [], sequence: 0 };
    this._notificationCurrent = null;
    this._notificationDrawerOpen = false;
    this._notificationAvailable = false;
    this._notificationLoading = false;
    this._notificationReloadPending = false;
    this._notificationActionPending = false;
    this._notificationHandled = new Set();
    this._notificationUnsub = null;
    this._notificationSubscribePending = false;
    this._notificationTimer = null;
    this._notificationSeen = new Set();
  }

  set hass(value) {
    const previous = this._hass;
    this._hass = value;
    if (!this._rendered) {
      this._bootstrap();
      return;
    }
    if (this._tabletPerformanceEnabled() && !this._hasRelevantStateChange(previous?.states, value?.states)) return;
    this._scheduleLiveUpdate();
  }

  get hass() { return this._hass; }
  set panel(value) { this._panel = value; }
  set narrow(value) { this._narrow = value; }
  set route(value) { this._route = value; }

  connectedCallback() { this._bootstrap(); }

  disconnectedCallback() {
    clearInterval(this._runtimeTimer);
    clearInterval(this._clockTimer);
    clearInterval(this._kioskRotationTimer);
    clearTimeout(this._liveUpdateTimer);
    clearTimeout(this._sceneGeometryTimer);
    clearTimeout(this._notificationTimer);
    this._disconnectNotificationCenter();
    if (this._sceneGeometryFrame) cancelAnimationFrame(this._sceneGeometryFrame);
    if (this._settingsGeometryFrame) cancelAnimationFrame(this._settingsGeometryFrame);
    this._sceneResizeObserver?.disconnect?.();
  }

  async _bootstrap() {
    if (!this._hass || this._loading || this._config) return;
    this._loading = true;
    this._renderLoading();
    try {
      this._config = await this._hass.callWS({ type: `${DOMAIN}/config/get` });
      this._runtime = await this._hass.callWS({ type: `${DOMAIN}/runtime/get` });
      await this._loadHaRegistries();
      this._rendered = true;
      this._sampleHistory(true);
      this._render();
      clearInterval(this._runtimeTimer);
      this._runtimeTimer = setInterval(() => this._refreshRuntime(false), 15000);
    } catch (err) {
      this._renderError(err);
    } finally {
      this._loading = false;
    }
  }

  async _loadHaRegistries() {
    try {
      const [entities, devices, areas] = await Promise.all([
        this._hass.callWS({ type: "config/entity_registry/list" }),
        this._hass.callWS({ type: "config/device_registry/list" }),
        this._hass.callWS({ type: "config/area_registry/list" }),
      ]);
      this._entityRegistry = Object.fromEntries((entities || []).map(item => [item.entity_id, item]));
      this._deviceRegistry = Object.fromEntries((devices || []).map(item => [item.id, item]));
      this._areaRegistry = Object.fromEntries((areas || []).map(item => [item.area_id, item]));
    } catch (_) {
      // Registry access can be restricted for non-admin users. Live hass.states
      // remains a complete fallback for entities visible to the current user.
      this._entityRegistry = {};
      this._deviceRegistry = {};
      this._areaRegistry = {};
    }
  }

  _isAdmin() { return Boolean(this._hass?.user?.is_admin); }

  _tabletPerformanceEnabled(profile = null) {
    if (this._view !== "kiosk" || !this._config) return false;
    let override = "";
    try { override = new URLSearchParams(window.location.search).get("performance") || ""; } catch (_) { /* URL parsing is optional. */ }
    if (["0", "false", "off", "full"].includes(override.toLowerCase())) return false;
    if (["1", "true", "on", "tablet"].includes(override.toLowerCase())) return true;
    return (profile || this._activeKioskProfile())?.tablet_performance_mode !== false;
  }

  _relevantEntityIds() {
    if (this._relevantEntityCache) return this._relevantEntityCache;
    const ids = new Set();
    const stack = [this._config];
    const visited = new WeakSet();
    while (stack.length) {
      const value = stack.pop();
      if (typeof value === "string") {
        if (/^[a-z_][a-z0-9_]*\.[a-z0-9_]+$/i.test(value)) ids.add(value);
        continue;
      }
      if (!value || typeof value !== "object" || visited.has(value)) continue;
      visited.add(value);
      if (Array.isArray(value)) stack.push(...value);
      else stack.push(...Object.values(value));
    }
    this._relevantEntityCache = ids;
    return ids;
  }

  _hasRelevantStateChange(previousStates, nextStates) {
    if (!previousStates || !nextStates) return true;
    for (const entityId of this._relevantEntityIds()) {
      if (previousStates[entityId] !== nextStates[entityId]) return true;
    }
    return false;
  }

  _scheduleLiveUpdate() {
    if (!this._tabletPerformanceEnabled()) {
      this._sampleHistory();
      this._updateLive();
      this._loadRecorderHistories();
      return;
    }
    if (this._liveUpdateTimer) return;
    const delay = Math.max(0, 1000 - (Date.now() - this._lastLiveUpdate));
    this._liveUpdateTimer = setTimeout(() => {
      this._liveUpdateTimer = null;
      this._lastLiveUpdate = Date.now();
      this._sampleHistory();
      this._updateLive();
      if (Date.now() - this._lastRecorderCheck >= 60000) {
        this._lastRecorderCheck = Date.now();
        this._loadRecorderHistories();
      }
    }, delay);
  }

  _renderLoading() {
    this.shadowRoot.innerHTML = `<style>${this._styles()}</style><div class="boot"><div class="boot-ring"></div><b>ENERGY CENTER MATRIX</b><span>Ładowanie konfiguracji…</span></div>`;
  }

  _renderError(err) {
    const text = this._esc(err?.message || String(err));
    this.shadowRoot.innerHTML = `<style>${this._styles()}</style><div class="boot error"><b>Błąd uruchamiania panelu</b><span>${text}</span></div>`;
  }

  _render() {
    if (!this._config) return;
    const performanceMode = this._tabletPerformanceEnabled();
    this._relevantEntityCache = null;
    this._flowModelCache = new WeakMap();
    this._lastSparklineDraw = 0;
    const previousBubbleBody = this.shadowRoot.querySelector?.(".bubble-editor-body");
    if (this._bubbleEditor && previousBubbleBody) {
      const active = this.shadowRoot.activeElement;
      this._bubbleEditorViewport = {
        scrollTop: previousBubbleBody.scrollTop,
        path: active?.dataset?.path || "",
        selectionStart: typeof active?.selectionStart === "number" ? active.selectionStart : null,
        selectionEnd: typeof active?.selectionEnd === "number" ? active.selectionEnd : null,
      };
    }
    this.classList.toggle("kiosk-host", this._view === "kiosk");
    this.classList.toggle("performance-host", performanceMode);
    this.shadowRoot.innerHTML = `
      <style>${this._styles()}</style>
      <div class="matrix-shell ${this._view === "kiosk" ? "kiosk-active" : ""} ${performanceMode ? "performance-mode" : ""} ${this._config.appearance?.show_grid_background === false ? "no-grid" : ""} ${this._config.appearance?.enable_animations === false ? "no-animations" : ""} ${this._config.appearance?.compact_header ? "compact-header" : ""} ${this._config.appearance?.show_status_bar === false ? "no-statusbar" : ""}">
        <header class="topbar">
          <button class="hamburger" data-action="toggle-nav"><ha-icon icon="mdi:menu"></ha-icon></button>
          <div class="brand"><strong>ENERGY CENTER</strong><small>M A T R I X</small></div>
          <nav class="top-nav">${this._navButtons()}</nav>
          <div class="clock"><b data-clock>--:--:--</b><small data-date>--</small></div>
        </header>
        <aside class="sidebar">
          <div class="side-links">${this._sideButtons()}</div>
          <div class="system-card">
            <span><i class="dot ok"></i> SYSTEM ONLINE</span>
            <span>REV. ${this._esc(this._config.revision ?? 0)}</span>
            <span>${this._isAdmin() ? "ADMINISTRATOR" : "PODGLĄD"}</span>
          </div>
        </aside>
        <main class="content">${this._renderView()}</main>
        ${this._config.appearance?.show_status_bar === false ? "" : `<footer class="statusbar">
          <span><i class="dot ok"></i> Integracja aktywna</span>
          <span data-footer-entities>Encje: --</span>
          <span data-footer-devices>Urządzenia: --</span>
          <span data-footer-strings>Stringi PV: --</span>
          <span class="status-message">${this._esc(this._message)}</span>
        </footer>`}
        ${this._notificationEnabled() ? this._renderKioskNotificationLayer() : ""}
      </div>
      ${this._renderBubbleEditor()}
      ${this._renderEntityPicker()}
    `;
    this._bindCommonEvents();
    this._bindViewEvents();
    this._bindKioskNotificationEvents();
    this._restoreBubbleEditorViewport();
    this._updateClock();
    this._updateLive();
    this._setupSceneGeometryObserver();
    this._scheduleSceneConnectionGeometry();
    this._loadRecorderHistories();
    this._startKioskRotation();
    if (this._view === "kiosk") this._connectNotificationCenter();
    else this._disconnectNotificationCenter();
    clearInterval(this._clockTimer);
    this._clockTimer = setInterval(() => this._updateClock(), 1000);
  }

  _navButtons() {
    const f = this._config.features || {};
    const items = [
      ["overview", "mdi:home-lightning-bolt-outline", "PODSUMOWANIE", true],
      ["widgets", "mdi:view-dashboard-edit-outline", "WIDŻETY", true],
      ["kiosk_config", "mdi:monitor-dashboard", "KIOSK", true],
      ["flows", "mdi:transit-connection-variant", "PRZEPŁYWY", f.grid || f.pv || f.battery || f.ev],
      ["pv", "mdi:solar-power-variant", "PV", f.pv],
      ["tariff", "mdi:calendar-clock", "CENY / G13", f.prices],
      ["devices", "mdi:power-plug-outline", "URZĄDZENIA", f.appliances],
      ["settings", "mdi:palette-outline", "USTAWIENIA", true],
      ["configuration", "mdi:cog-outline", "KONFIGURACJA", true],
      ["diagnostics", "mdi:stethoscope", "DIAGNOSTYKA", true],
    ];
    return items.filter(item => item[3]).map(([view, icon, label]) => `
      <button class="nav-btn ${this._view === view ? "active" : ""}" data-view="${view}">
        <ha-icon icon="${icon}"></ha-icon><span>${label}</span>
      </button>`).join("");
  }

  _sideButtons() {
    const f = this._config.features || {};
    const items = [
      ["overview", "mdi:home-outline", "START", true],
      ["widgets", "mdi:view-dashboard-edit-outline", "WIDŻETY PRZEGLĄDU", true],
      ["kiosk_config", "mdi:monitor-dashboard", "KONFIGURACJA KIOSKU", true],
      ["flows", "mdi:swap-horizontal", "PRZEPŁYWY", f.grid || f.pv || f.battery || f.ev],
      ["pv", "mdi:white-balance-sunny", "FOTOWOLTAIKA", f.pv],
      ["tariff", "mdi:calendar-clock", "TAURON G13", f.prices],
      ["devices", "mdi:power-socket-eu", "ODBIORNIKI", f.appliances],
      ["settings", "mdi:palette-swatch-outline", "USTAWIENIA GRAFIKI", true],
      ["configuration", "mdi:tune-variant", "KONFIGURACJA", true],
      ["diagnostics", "mdi:chart-timeline-variant-shimmer", "DIAGNOSTYKA", true],
    ];
    return items.filter(item => item[3]).map(([view, icon, label]) => `
      <button class="side-btn ${this._view === view ? "active" : ""}" data-view="${view}">
        <ha-icon icon="${icon}"></ha-icon><span>${label}</span>
      </button>`).join("");
  }

  _renderView() {
    switch (this._view) {
      case "flows": return this._renderFlows();
      case "widgets": return this._renderOverviewWidgets();
      case "kiosk_config": return this._renderKioskConfiguration();
      case "kiosk": return this._renderKiosk();
      case "pv": return this._renderPv();
      case "tariff": return this._renderTariff();
      case "devices": return this._renderDevices();
      case "settings": return this._renderSettings();
      case "configuration": return this._renderConfiguration();
      case "diagnostics": return this._renderDiagnostics();
      default: return this._renderOverview();
    }
  }

  _renderOverview() {
    const name = this._esc(this._config.general.installation_name || "Energy Center");
    const overview = this._config.overview || {};
    const showEmpty = Boolean(this._config.appearance?.show_unconfigured_cards);
    const builtinCards = overview.show_builtin_bubbles === false ? [] : [
      { key: "builtin_home", html: this._metric("home", "mdi:home-lightning-bolt", "DOM", "cyan") },
      { key: "builtin_pv", html: this._showModule("pv") ? this._metric("pv", "mdi:solar-power", "PRODUKCJA PV", "green") : "" },
      { key: "builtin_battery", html: this._showModule("battery") ? this._metric("batterySoc", "mdi:battery-high", "MAGAZYN", "lime", "%") : "" },
      { key: "builtin_ev", html: this._showModule("ev") ? this._metric("ev", "mdi:car-electric", "ŁADOWANIE EV", "cyan") : "" },
      { key: "builtin_grid", html: this._showModule("grid") ? this._metric("grid", "mdi:transmission-tower", "SIEĆ", "purple") : "" },
      { key: "builtin_price", html: this._showModule("prices") ? this._metric("price", "mdi:tag-outline", "CENA ZAKUPU", "orange", this._config.general.currency + "/kWh") : "" },
    ].filter(item => item.html);
    const customBubbles = overview.show_custom_bubbles === false ? [] : (this._config.overview_bubbles || [])
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false)
      .sort((a, b) => Number(a.item.order || 0) - Number(b.item.order || 0))
      .map(({ item, index }) => ({ key: `bubble_${item.id || index + 1}`, html: this._overviewBubble(item, index) }));
    const metricItems = [...builtinCards, ...customBubbles];
    const bubbleLayout = overview.bubble_layout === "free" ? "free" : "grid";
    const bubbleStageHeight = Math.max(76, Math.min(720, Number(overview.bubble_stage_height || 104)));
    const metricCards = metricItems.map((item, index) => this._kioskBubbleSlot(item, index, metricItems.length, overview)).join("");

    const sidePanels = [
      this._showModule("prices") ? `<article class="panel price-panel">
          <div class="panel-title"><span>CENY ENERGII</span><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="price-values">
            <div><small>ZAKUP</small><strong data-live="price">--</strong><span>${this._esc(this._config.general.currency)}/kWh</span></div>
            <div><small>SPRZEDAŻ</small><strong data-live="priceSell">--</strong><span>${this._esc(this._config.general.currency)}/kWh</span></div>
          </div>
          <div class="spark-wrap"><svg viewBox="0 0 400 130" preserveAspectRatio="none"><path class="gridline" d="M0 25H400 M0 65H400 M0 105H400"></path><path data-spark="price" class="spark purple" d=""></path></svg><small>Próbki od chwili otwarcia panelu</small></div>
        </article>` : "",
      this._showModule("appliances") ? `<article class="panel consumers-panel">
          <div class="panel-title"><span>NAJWIĘKSZE ODBIORNIKI — TERAZ</span><button class="link-btn" data-view="devices">ZARZĄDZAJ</button></div>
          <div class="consumer-list" data-consumer-list></div>
        </article>` : "",
    ].filter(Boolean).join("");

    const bottom = [
      this._trendPanel("home", "ZUŻYCIE DOMU", "cyan"),
      this._showModule("pv") ? this._trendPanel("pv", "PRODUKCJA PV", "green") : "",
      this._showModule("battery") ? this._gaugePanel("batterySoc", "MAGAZYN ENERGII", "mdi:battery-charging-high") : "",
      this._showModule("ev") ? this._gaugePanel("evSoc", "SAMOCHÓD / EV", "mdi:car-electric") : "",
    ].filter(Boolean).join("");
    const customCharts = overview.show_custom_charts === false ? "" : (this._config.overview_charts || [])
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false)
      .sort((a, b) => Number(a.item.order || 0) - Number(b.item.order || 0))
      .map(({ item, index }) => this._overviewChart(item, index))
      .join("");

    const configured = Object.values(this._config.mappings || {}).filter(Boolean).length;
    return `
      <section class="hero-row">
        <div><span class="eyebrow">PANEL ZARZĄDZANIA ENERGIĄ</span><h1>${name}</h1><p>Widok budowany automatycznie z aktywnych modułów. Zmiana checkboxów natychmiast zmienia przegląd.</p></div>
        <div class="hero-tools"><div class="mode-chip"><ha-icon icon="mdi:shield-check-outline"></ha-icon><span>TRYB<br><b>${this._config.automation.enabled ? "AUTOMATYCZNY" : "MONITOROWANIE"}</b></span></div><div class="config-score"><small>MAPOWANIE</small><b>${configured}</b><span>encji</span></div></div>
      </section>
      ${metricCards ? `<section class="metrics-grid dynamic dashboard-bubble-stage kiosk-bubble-stage layout-${bubbleLayout} bubble-size-${this._escAttr(overview.bubble_size || "medium")}" style="--kiosk-bubble-stage-height:${bubbleStageHeight}px">${metricCards}</section>` : ""}
      <section class="dashboard-grid ${sidePanels ? "with-side" : "flow-only"}">
        <article class="panel flow-panel">${this._flowDiagram(false, false, overview)}</article>
        ${sidePanels ? `<div class="dashboard-side">${sidePanels}</div>` : ""}
      </section>
      <section class="bottom-grid dynamic">${bottom}</section>
      ${customCharts ? `<section class="custom-chart-grid" style="--chart-columns:${Math.max(1, Math.min(4, Number(overview.chart_columns || 2)))}">${customCharts}</section>` : ""}
      ${showEmpty ? `<article class="panel overview-note"><ha-icon icon="mdi:information-outline"></ha-icon><span>Włączone moduły bez przypisanych encji pozostają widoczne jako „--”. Wyłącz tę opcję w Wyglądzie, aby ukrywać puste karty.</span></article>` : ""}`;
  }

  _renderOverviewWidgets() {
    if (!this._isAdmin() && !this._config.permissions.show_configuration_to_non_admin) {
      return `<div class="locked"><ha-icon icon="mdi:shield-lock-outline"></ha-icon><h2>Konfiguracja widżetów tylko dla administratora</h2><p>Administrator może udostępnić ten ekran w trybie tylko do odczytu.</p></div>`;
    }
    const disabled = this._isAdmin() ? "" : "disabled";
    const overview = this._config.overview || {};
    const bubbles = this._config.overview_bubbles || [];
    const charts = this._config.overview_charts || [];
    const bubblePreview = bubbles
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false)
      .sort((a, b) => Number(a.item.order || 0) - Number(b.item.order || 0))
      .map(({ item, index }) => this._overviewBubble(item, index))
      .join("");
    const chartPreview = charts
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false)
      .sort((a, b) => Number(a.item.order || 0) - Number(b.item.order || 0))
      .map(({ item, index }) => this._overviewChart(item, index))
      .join("");

    const bubbleCards = bubbles.map((item, index) => `<article class="panel widget-editor-card draggable-widget ${item.enabled === false ? "disabled-card" : ""}" draggable="${this._isAdmin()}" data-drag-type="bubble" data-drag-index="${index}">
      <div class="panel-title"><span><ha-icon class="drag-handle" icon="mdi:drag-vertical"></ha-icon> DYMEK ${index + 1} · ${this._esc(item.name || "BEZ NAZWY")}</span><div class="widget-card-actions"><button class="secondary-btn" data-action="edit-overview-bubble" data-index="${index}" ${disabled}><ha-icon icon="mdi:pencil-outline"></ha-icon>EDYTUJ</button><button class="danger-link" data-action="remove-overview-bubble" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div></div>
      <div class="widget-editor-grid">
        ${this._field(`overview_bubbles.${index}.name`, "Nazwa", item.name, "Np. Temperatura falownika", disabled)}
        ${this._field(`overview_bubbles.${index}.description`, "Opis", item.description, "Krótki opis pod wartością", disabled)}
        <div class="full">${this._entityField(`overview_bubbles.${index}.entity_id`, "Encja", item.entity_id, "Dowolna encja widoczna w Home Assistant.", disabled, "any")}</div>
        ${this._field(`overview_bubbles.${index}.attribute`, "Atrybut encji (opcjonalnie)", item.attribute, "Np. current_temperature", disabled)}
        <div class="widget-subsection full"><b>WARTOŚĆ POMOCNICZA</b><small>Drugi stan w tym samym dymku, np. moc + energia dzisiaj.</small></div>
        <label class="check-row full"><input type="checkbox" data-path="overview_bubbles.${index}.show_secondary" data-live-rerender="1" ${item.show_secondary ? "checked" : ""} ${disabled}><span><b>Pokaż wartość pomocniczą</b><small>Wyświetlana pod główną wartością.</small></span></label>
        ${this._field(`overview_bubbles.${index}.secondary_name`, "Etykieta pomocnicza", item.secondary_name, "Np. Dzisiaj", disabled)}
        <div class="full">${this._entityField(`overview_bubbles.${index}.secondary_entity_id`, "Druga encja", item.secondary_entity_id, "Może być taka sama jak encja główna.", disabled, "any")}</div>
        ${this._field(`overview_bubbles.${index}.secondary_attribute`, "Drugi atrybut", item.secondary_attribute, "Opcjonalnie", disabled)}
        ${this._field(`overview_bubbles.${index}.secondary_unit`, "Druga jednostka", item.secondary_unit, "Puste = jednostka encji", disabled)}
        ${this._numberField(`overview_bubbles.${index}.secondary_decimals`, "Druga precyzja", item.secondary_decimals, 0, 6, 1, disabled)}
        ${this._numberField(`overview_bubbles.${index}.secondary_multiplier`, "Drugi mnożnik", item.secondary_multiplier, -1000000, 1000000, 0.001, disabled)}
        ${this._colorField(`overview_bubbles.${index}.secondary_color`, "Kolor drugiej wartości", item.secondary_color || item.value_color || item.color, disabled)}
        ${this._colorField(`overview_bubbles.${index}.secondary_label_color`, "Kolor drugiej etykiety", item.secondary_label_color || "#88afbd", disabled)}
        ${this._colorField(`overview_bubbles.${index}.secondary_unit_color`, "Kolor drugiej jednostki", item.secondary_unit_color || "#7898a4", disabled)}
        ${this._numberField(`overview_bubbles.${index}.secondary_value_size`, "Rozmiar drugiej wartości (px)", item.secondary_value_size || 11, 7, 28, 1, disabled, true)}
        ${this._renderBubbleRelatedEditor(item, index, disabled)}
        <div class="widget-subsection full"><b>KOLORY WARUNKOWE I ALARM</b><small>Kolor może zmieniać się automatycznie wraz z wartością.</small></div>
        ${this._selectField(`overview_bubbles.${index}.color_mode`, "Tryb koloru", item.color_mode || "fixed", [["fixed","Stały"],["threshold","Według progów"]], disabled, true)}
        ${this._numberField(`overview_bubbles.${index}.low_threshold`, "Próg niski", item.low_threshold, -1000000000, 1000000000, 0.01, disabled)}
        ${this._numberField(`overview_bubbles.${index}.high_threshold`, "Próg wysoki", item.high_threshold, -1000000000, 1000000000, 0.01, disabled)}
        ${this._colorField(`overview_bubbles.${index}.low_color`, "Kolor niski", item.low_color || "#008cff", disabled)}
        ${this._colorField(`overview_bubbles.${index}.normal_color`, "Kolor normalny", item.normal_color || item.color, disabled)}
        ${this._colorField(`overview_bubbles.${index}.high_color`, "Kolor wysoki", item.high_color || "#ff4d6d", disabled)}
        ${this._colorField(`overview_bubbles.${index}.unavailable_color`, "Kolor braku danych", item.unavailable_color || "#6d7d86", disabled)}
        <label class="check-row full"><input type="checkbox" data-path="overview_bubbles.${index}.alert_enabled" data-live-rerender="1" ${item.alert_enabled ? "checked" : ""} ${disabled}><span><b>Alarm wizualny</b><small>Pulsowanie dymku i etykieta po przekroczeniu warunku.</small></span></label>
        ${this._selectField(`overview_bubbles.${index}.alert_condition`, "Warunek alarmu", item.alert_condition || "above", [["above","Powyżej"],["below","Poniżej"],["outside","Poza zakresem"]], disabled, true)}
        ${this._numberField(`overview_bubbles.${index}.alert_low`, "Dolny próg alarmu", item.alert_low, -1000000000, 1000000000, 0.01, disabled)}
        ${this._numberField(`overview_bubbles.${index}.alert_high`, "Górny próg alarmu", item.alert_high, -1000000000, 1000000000, 0.01, disabled)}
        ${this._colorField(`overview_bubbles.${index}.alert_color`, "Kolor alarmu", item.alert_color || "#ff335f", disabled)}
        ${this._field(`overview_bubbles.${index}.alert_text`, "Tekst alarmu", item.alert_text, "ALARM", disabled)}
        <div class="widget-subsection full"><b>AKCJA PO KLIKNIĘCIU</b><small>Więcej informacji, nawigacja albo wywołanie usługi.</small></div>
        ${this._selectField(`overview_bubbles.${index}.tap_action`, "Akcja", item.tap_action || "more_info", [["none","Brak"],["more_info","Więcej informacji"],["navigate","Nawigacja"],["service","Usługa HA"]], disabled, true)}
        ${this._field(`overview_bubbles.${index}.navigation_path`, "Ścieżka nawigacji", item.navigation_path, "/lovelace/energia", disabled)}
        ${this._field(`overview_bubbles.${index}.service`, "Usługa", item.service, "light.toggle", disabled)}
        ${this._textarea(`overview_bubbles.${index}.service_data`, "Dane usługi JSON", item.service_data || "{}", "{\"entity_id\":\"light.salon\"}", disabled)}
        <div class="widget-subsection full"><b>WYGLĄD I RAMKA DYMKU</b><small>Każdy dymek może mieć osobne kolory, rozmiary, ramkę, zaokrąglenie i wyrównanie.</small></div>
        ${this._field(`overview_bubbles.${index}.icon`, "Ikona MDI", item.icon, "mdi:thermometer", disabled)}
        ${this._colorField(`overview_bubbles.${index}.color`, "Kolor akcentu i miniwykresu", item.color, disabled)}
        ${this._colorField(`overview_bubbles.${index}.background_color`, "Kolor tła", item.background_color, disabled)}
        ${this._colorField(`overview_bubbles.${index}.border_color`, "Kolor ramki", item.border_color || item.color, disabled)}
        ${this._colorField(`overview_bubbles.${index}.icon_color`, "Kolor ikony", item.icon_color || item.color, disabled)}
        ${this._colorField(`overview_bubbles.${index}.name_color`, "Kolor nazwy", item.name_color || "#8eb5c3", disabled)}
        ${this._colorField(`overview_bubbles.${index}.value_color`, "Kolor wartości", item.value_color || item.color, disabled)}
        ${this._colorField(`overview_bubbles.${index}.unit_color`, "Kolor jednostki", item.unit_color || "#8eb3c0", disabled)}
        ${this._colorField(`overview_bubbles.${index}.description_color`, "Kolor opisu", item.description_color || "#6e96a5", disabled)}
        ${this._numberField(`overview_bubbles.${index}.border_width`, "Grubość ramki (px)", item.border_width || 1, 1, 6, 1, disabled, true)}
        ${this._numberField(`overview_bubbles.${index}.border_radius`, "Zaokrąglenie rogów (px)", item.border_radius ?? 14, 0, 40, 1, disabled, true)}
        ${this._numberField(`overview_bubbles.${index}.icon_size`, "Rozmiar ikony (px)", item.icon_size || 22, 12, 48, 1, disabled, true)}
        ${this._numberField(`overview_bubbles.${index}.value_size`, "Rozmiar wartości (px)", item.value_size || 24, 12, 48, 1, disabled, true)}
        ${this._numberField(`overview_bubbles.${index}.padding`, "Odstęp wewnętrzny (px)", item.padding || 13, 4, 28, 1, disabled, true)}
        ${this._selectField(`overview_bubbles.${index}.text_align`, "Wyrównanie tekstu", item.text_align || "left", [["left","Do lewej"],["center","Do środka"],["right","Do prawej"]], disabled, true)}
        ${this._field(`overview_bubbles.${index}.unit`, "Własna jednostka", item.unit, "Puste = jednostka encji", disabled)}
        ${this._numberField(`overview_bubbles.${index}.decimals`, "Miejsca dziesiętne", item.decimals, 0, 6, 1, disabled)}
        ${this._numberField(`overview_bubbles.${index}.multiplier`, "Mnożnik wartości", item.multiplier, -1000000, 1000000, 0.001, disabled)}
        ${this._numberField(`overview_bubbles.${index}.order`, "Kolejność", item.order, 0, 10000, 1, disabled, true)}
      </div>
      <div class="widget-checks">
        <label class="check-row"><input type="checkbox" data-path="overview_bubbles.${index}.enabled" data-live-rerender="1" ${item.enabled !== false ? "checked" : ""} ${disabled}><span><b>Widoczny na przeglądzie</b><small>Możesz zachować konfigurację i czasowo ukryć dymek.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="overview_bubbles.${index}.show_sparkline" data-live-rerender="1" ${item.show_sparkline !== false ? "checked" : ""} ${disabled}><span><b>Miniwykres w dymku</b><small>Próbki z bieżącej sesji panelu.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="overview_bubbles.${index}.show_icon" data-live-rerender="1" ${item.show_icon !== false ? "checked" : ""} ${disabled}><span><b>Pokaż ikonę</b><small>Osobny kolor i rozmiar powyżej.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="overview_bubbles.${index}.show_name" data-live-rerender="1" ${item.show_name !== false ? "checked" : ""} ${disabled}><span><b>Pokaż nazwę</b><small>Etykieta encji w górnej części dymku.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="overview_bubbles.${index}.show_unit" data-live-rerender="1" ${item.show_unit !== false ? "checked" : ""} ${disabled}><span><b>Pokaż jednostkę</b><small>Jednostka obok wartości.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="overview_bubbles.${index}.show_description" data-live-rerender="1" ${item.show_description !== false ? "checked" : ""} ${disabled}><span><b>Pokaż opis</b><small>Opis może być niezależnie ukryty.</small></span></label>
      </div>
    </article>`).join("");

    const chartCards = charts.map((item, index) => `<article class="panel widget-editor-card chart-editor-card draggable-widget ${item.enabled === false ? "disabled-card" : ""}" draggable="${this._isAdmin()}" data-drag-type="chart" data-drag-index="${index}">
      <div class="panel-title"><span><ha-icon class="drag-handle" icon="mdi:drag-vertical"></ha-icon> WYKRES ${index + 1} · ${this._esc(item.name || "BEZ NAZWY")}</span><button class="danger-link" data-action="remove-overview-chart" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div>
      <div class="widget-editor-grid">
        ${this._field(`overview_charts.${index}.name`, "Nazwa", item.name, "Np. Temperatura magazynu", disabled)}
        ${this._field(`overview_charts.${index}.description`, "Opis", item.description, "Opis danych i jednostki", disabled)}
        <div class="full">${this._entityField(`overview_charts.${index}.entity_id`, "Encja", item.entity_id, "Wykres używa wartości stanu albo wskazanego atrybutu.", disabled, "any")}</div>
        ${this._field(`overview_charts.${index}.attribute`, "Atrybut encji (opcjonalnie)", item.attribute, "Np. temperature", disabled)}
        ${this._field(`overview_charts.${index}.icon`, "Ikona MDI", item.icon, "mdi:chart-line", disabled)}
        ${this._colorField(`overview_charts.${index}.color`, "Kolor wykresu", item.color, disabled)}
        ${this._field(`overview_charts.${index}.unit`, "Własna jednostka", item.unit, "Puste = jednostka encji", disabled)}
        ${this._numberField(`overview_charts.${index}.decimals`, "Miejsca dziesiętne", item.decimals, 0, 6, 1, disabled)}
        ${this._numberField(`overview_charts.${index}.multiplier`, "Mnożnik wartości", item.multiplier, -1000000, 1000000, 0.001, disabled)}
        ${this._renderChartSeriesEditor(item, index, disabled)}
        ${this._selectField(`overview_charts.${index}.graph_type`, "Typ wykresu", item.graph_type || "line", [["line","Linia"],["area","Obszar"],["bar","Słupki"]], disabled, true)}
        ${this._selectField(`overview_charts.${index}.height`, "Wysokość", item.height || "medium", [["small","Mały"],["medium","Średni"],["large","Duży"]], disabled, true)}
        ${this._selectField(`overview_charts.${index}.history_range`, "Zakres historii", item.history_range || "session", [["session","Bieżąca sesja"],["24h","Ostatnie 24 godziny"],["7d","Ostatnie 7 dni"],["30d","Ostatnie 30 dni"]], disabled, true)}
        ${this._numberField(`overview_charts.${index}.points`, "Liczba próbek", item.points, 12, 720, 1, disabled)}
        ${this._numberField(`overview_charts.${index}.line_width`, "Grubość linii", item.line_width, 1, 8, 0.5, disabled)}
        ${this._numberField(`overview_charts.${index}.order`, "Kolejność", item.order, 0, 10000, 1, disabled, true)}
        <div class="widget-subsection full"><b>AKCJA PO KLIKNIĘCIU</b><small>Dotyczy całej karty wykresu.</small></div>
        ${this._selectField(`overview_charts.${index}.tap_action`, "Akcja", item.tap_action || "more_info", [["none","Brak"],["more_info","Więcej informacji"],["navigate","Nawigacja"],["service","Usługa HA"]], disabled, true)}
        ${this._field(`overview_charts.${index}.navigation_path`, "Ścieżka nawigacji", item.navigation_path, "/history", disabled)}
        ${this._field(`overview_charts.${index}.service`, "Usługa", item.service, "switch.toggle", disabled)}
        ${this._textarea(`overview_charts.${index}.service_data`, "Dane usługi JSON", item.service_data || "{}", "{\"entity_id\":\"switch.pompa\"}", disabled)}
      </div>
      <div class="widget-checks three-checks">
        <label class="check-row"><input type="checkbox" data-path="overview_charts.${index}.enabled" data-live-rerender="1" ${item.enabled !== false ? "checked" : ""} ${disabled}><span><b>Widoczny</b><small>Pokaż na przeglądzie.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="overview_charts.${index}.show_current" data-live-rerender="1" ${item.show_current !== false ? "checked" : ""} ${disabled}><span><b>Aktualna wartość</b><small>W nagłówku wykresu.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="overview_charts.${index}.show_min_max" data-live-rerender="1" ${item.show_min_max !== false ? "checked" : ""} ${disabled}><span><b>Minimum i maksimum</b><small>Dla wybranego zakresu.</small></span></label>
      </div>
    </article>`).join("");
    return `<section class="hero-row"><div><span class="eyebrow">KONFIGURATOR PRZEGLĄDU</span><h1>Dymki i dodatkowe wykresy</h1><p>Połącz wiele encji w jednym dymku lub wykresie, ustaw kolory, alarmy, akcje i historię Recorder.</p></div>${this._saveBar(disabled)}</section>
      <section class="overview-widget-layout">
        <article class="panel overview-widget-settings">
          <div class="panel-title"><span>USTAWIENIA PRZEGLĄDU</span><ha-icon icon="mdi:tune-variant"></ha-icon></div>
          <div class="widget-checks">
            <label class="check-row"><input type="checkbox" data-path="overview.show_builtin_bubbles" data-live-rerender="1" ${overview.show_builtin_bubbles !== false ? "checked" : ""} ${disabled}><span><b>Standardowe dymki</b><small>Dom, PV, magazyn, EV, sieć i cena.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="overview.show_custom_bubbles" data-live-rerender="1" ${overview.show_custom_bubbles !== false ? "checked" : ""} ${disabled}><span><b>Własne dymki</b><small>Encje skonfigurowane poniżej.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="overview.show_custom_charts" data-live-rerender="1" ${overview.show_custom_charts !== false ? "checked" : ""} ${disabled}><span><b>Dodatkowe wykresy</b><small>Wykresy skonfigurowane poniżej.</small></span></label>
          </div>
          <div class="two-grid">
            ${this._selectField("overview.bubble_size", "Rozmiar dymków", overview.bubble_size || "medium", [["compact","Kompaktowe"],["medium","Standardowe"],["large","Duże"]], disabled, true)}
            ${this._selectField("overview.chart_columns", "Kolumny wykresów", overview.chart_columns || 2, [[1,"1 kolumna"],[2,"2 kolumny"],[3,"3 kolumny"],[4,"4 kolumny"]], disabled, true)}
          </div>
          <div class="two-grid">
            ${this._selectField("overview.bubble_layout", "Układ dymków na przeglądzie", overview.bubble_layout || "grid", [["grid","Automatyczna siatka"],["free","Swobodne położenie"]], disabled, true)}
            ${this._numberField("overview.bubble_stage_height", "Wysokość warstwy dymków (px)", overview.bubble_stage_height || 104, 76, 720, 1, disabled, true)}
          </div>
          <div class="widget-add-actions">
            <button class="primary-btn" data-action="add-overview-bubble" ${disabled}><ha-icon icon="mdi:plus-circle-outline"></ha-icon>DODAJ DYMEK</button>
            <button class="secondary-btn" data-action="add-overview-chart" ${disabled}><ha-icon icon="mdi:chart-line-variant"></ha-icon>DODAJ WYKRES</button>
            <button class="secondary-btn" data-settings-target="overview" ${disabled}><ha-icon icon="mdi:palette-outline"></ha-icon>OTWÓRZ USTAWIENIA GRAFIKI</button>
            <button class="secondary-btn" data-action="refresh-recorder"><ha-icon icon="mdi:history"></ha-icon>ODŚWIEŻ HISTORIĘ</button>
          </div>
        </article>
        <article class="panel overview-widget-preview">
          <div class="panel-title"><span>PODGLĄD WŁASNYCH ELEMENTÓW</span><small>WARTOŚCI NA ŻYWO</small></div>
          ${bubblePreview ? `<div class="metrics-grid dynamic bubble-size-${this._escAttr(overview.bubble_size || "medium")}">${bubblePreview}</div>` : this._emptyState("mdi:message-plus-outline", "Brak własnych dymków", "Dodaj pierwszy dymek i przypisz encję.")}
          ${chartPreview ? `<div class="custom-chart-grid preview-grid" style="--chart-columns:${Math.max(1, Math.min(4, Number(overview.chart_columns || 2)))}">${chartPreview}</div>` : ""}
        </article>
      </section>
      <section class="widget-editor-list"><div class="section-heading"><div><span class="eyebrow">DYMKI · PRZECIĄGNIJ, ABY ZMIENIĆ KOLEJNOŚĆ</span><h2>Encje widoczne nad diagramem</h2></div><button class="secondary-btn" data-action="add-overview-bubble" ${disabled}><ha-icon icon="mdi:plus"></ha-icon>DODAJ</button></div>${bubbleCards || this._emptyState("mdi:message-text-fast-outline", "Nie skonfigurowano dymków", "Dodaj encję, którą chcesz widzieć na przeglądzie.")}</section>
      <section class="widget-editor-list"><div class="section-heading"><div><span class="eyebrow">WYKRESY · PRZECIĄGNIJ, ABY ZMIENIĆ KOLEJNOŚĆ</span><h2>Historia wybranych encji</h2></div><button class="secondary-btn" data-action="add-overview-chart" ${disabled}><ha-icon icon="mdi:plus"></ha-icon>DODAJ</button></div>${chartCards || this._emptyState("mdi:chart-box-plus-outline", "Nie skonfigurowano wykresów", "Dodaj wykres liniowy, obszarowy lub słupkowy.")}</section>`;
  }

  _renderKioskConfiguration() {
    if (!this._isAdmin() && !this._config.permissions.show_configuration_to_non_admin) {
      return `<div class="locked"><ha-icon icon="mdi:shield-lock-outline"></ha-icon><h2>Konfiguracja kiosku tylko dla administratora</h2><p>Administrator może udostępnić ten ekran w trybie tylko do odczytu.</p></div>`;
    }
    const disabled = this._isAdmin() ? "" : "disabled";
    const profiles = this._config.kiosk_profiles || [];
    const profileCards = profiles.map((profile, index) => this._renderKioskSettings(profile, `kiosk_profiles.${index}`, profile.name || `Kiosk ${index + 1}`, index, disabled)).join("");
    return `<section class="hero-row"><div><span class="eyebrow">KONFIGURACJA KIOSKU</span><h1>Zakładki i dodatkowe pulpity</h1><p>Każdy widok Lovelace dodany tutaj staje się osobną zakładką wewnątrz wybranego kiosku.</p></div>${this._saveBar(disabled)}</section>
      <section class="panel kiosk-config-guide"><ha-icon icon="mdi:gesture-swipe-horizontal"></ha-icon><div><b>Jeden kiosk · wiele ekranów</b><p>Zakładki zmienisz strzałkami i wskaźnikami w górnym nagłówku albo przeciągnięciem palcem w lewo lub w prawo. Nie dodawaj do Lovelace karty Matrix Energy Center — wklej poniżej adres istniejącego pulpitu lub widoku Home Assistant.</p></div></section>
      <section class="panel kiosk-default-card">${this._renderKioskSettings(this._config.kiosk || {}, "kiosk", "KIOSK DOMYŚLNY · ?kiosk=1", -1, disabled)}</section>
      <section class="widget-editor-list kiosk-profile-list"><div class="section-heading"><div><span class="eyebrow">OSOBNE PROFILE</span><h2>Kioski dla pomieszczeń i tabletów</h2><p>Każdy profil ma własny zestaw zakładek Lovelace.</p></div><button class="secondary-btn" data-action="add-kiosk-profile" ${disabled}><ha-icon icon="mdi:monitor-multiple"></ha-icon>DODAJ PROFIL</button></div>${profileCards || this._emptyState("mdi:monitor-dashboard", "Brak dodatkowych profili", "Skonfiguruj kiosk domyślny albo dodaj osobny profil dla wybranego tabletu.")}</section>`;
  }

  _renderKioskSettings(profile, path, heading, profileIndex, disabled = "") {
    const isDefault = profileIndex < 0;
    const profileId = isDefault ? "1" : profile.id || `kiosk_${profileIndex + 1}`;
    const bubbleIds = new Set(profile.bubble_ids || []);
    const chartIds = new Set(profile.chart_ids || []);
    const builtinBubbleIds = new Set(profile.builtin_bubble_ids || ["home", "pv", "grid"]);
    const builtinChoices = [
      ["home", "mdi:home-lightning-bolt", "Dom"], ["pv", "mdi:solar-power", "PV"],
      ["grid", "mdi:transmission-tower", "Sieć"], ["battery", "mdi:battery-high", "Magazyn"],
      ["ev", "mdi:car-electric", "EV"], ["price", "mdi:tag-outline", "Cena"],
    ].map(([id, icon, label]) => `<label class="selection-chip"><input type="checkbox" data-action="toggle-kiosk-builtin" data-profile-index="${profileIndex}" data-item-id="${id}" ${builtinBubbleIds.has(id) ? "checked" : ""} ${disabled}><ha-icon icon="${icon}"></ha-icon><span>${label}</span></label>`).join("");
    const lovelaceViews = Array.isArray(profile.lovelace_views) ? profile.lovelace_views : [];
    const lovelaceCards = lovelaceViews.map((item, index) => {
      const hasPath = Boolean(String(item.path || "").trim());
      const state = item.enabled === false ? "WYŁĄCZONA" : hasPath ? "GOTOWA" : "BRAK ADRESU";
      return `<article class="widget-related-card kiosk-lovelace-editor ${!hasPath ? "incomplete" : ""}">
        <div class="widget-related-head"><div><b>ZAKŁADKA KIOSKU ${index + 1}</b><span class="kiosk-view-state ${hasPath && item.enabled !== false ? "ready" : ""}">${state}</span></div><div class="kiosk-view-actions"><button class="icon-btn" data-action="move-kiosk-lovelace-view" data-direction="-1" data-profile-index="${profileIndex}" data-index="${index}" title="Przesuń w lewo" ${index === 0 ? "disabled" : disabled}><ha-icon icon="mdi:arrow-left"></ha-icon></button><button class="icon-btn" data-action="move-kiosk-lovelace-view" data-direction="1" data-profile-index="${profileIndex}" data-index="${index}" title="Przesuń w prawo" ${index === lovelaceViews.length - 1 ? "disabled" : disabled}><ha-icon icon="mdi:arrow-right"></ha-icon></button><button class="icon-btn" data-action="preview-kiosk-lovelace-view" data-profile-index="${profileIndex}" data-index="${index}" title="Otwórz ten pulpit" ${hasPath ? "" : "disabled"}><ha-icon icon="mdi:open-in-new"></ha-icon></button><button class="danger-link" data-action="remove-kiosk-lovelace-view" data-profile-index="${profileIndex}" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div></div>
        <div class="three-grid">${this._field(`${path}.lovelace_views.${index}.name`, "Nazwa zakładki", item.name, "Np. Oświetlenie", disabled)}${this._field(`${path}.lovelace_views.${index}.path`, "Adres pulpitu lub widoku HA", item.path, "/dashboard-jsbd/deye-kiosk", disabled)}<label class="check-row"><input type="checkbox" data-path="${path}.lovelace_views.${index}.enabled" data-live-rerender="1" ${item.enabled !== false ? "checked" : ""} ${disabled}><span><b>Zakładka aktywna</b><small>Pokaż ją wewnątrz tego kiosku.</small></span></label></div>
        <div class="widget-subsection"><b>UKŁAD I RAMA ZAKŁADKI</b><small>Zmienia położenie całego osadzonego pulpitu. Karty wewnątrz niego edytujesz standardowym edytorem Lovelace.</small></div>
        <div class="five-grid">${this._numberField(`${path}.lovelace_views.${index}.scale`, "Skala (%)", item.scale ?? 100, 50, 150, 1, disabled, true)}${this._numberField(`${path}.lovelace_views.${index}.offset_x`, "Przesunięcie X", item.offset_x ?? 0, -500, 500, 1, disabled, true)}${this._numberField(`${path}.lovelace_views.${index}.offset_y`, "Przesunięcie Y", item.offset_y ?? 0, -500, 500, 1, disabled, true)}${this._numberField(`${path}.lovelace_views.${index}.padding`, "Margines (px)", item.padding ?? 0, 0, 80, 1, disabled, true)}${this._numberField(`${path}.lovelace_views.${index}.border_radius`, "Zaokrąglenie", item.border_radius ?? 12, 0, 60, 1, disabled, true)}</div>
        <div class="two-grid">${this._colorField(`${path}.lovelace_views.${index}.background_color`, "Kolor tła", item.background_color || "#010914", disabled)}${this._colorField(`${path}.lovelace_views.${index}.border_color`, "Kolor ramki", item.border_color || "#20eaff", disabled)}</div>
        <small class="kiosk-path-help">Wklej adres z paska przeglądarki albo lokalną ścieżkę zaczynającą się od „/”. Po zapisaniu zakładka pojawi się w górnym przewijaku kiosku.</small>
      </article>`;
    }).join("");
    const tabPreview = [
      profile.rotate_flow === false ? null : ["mdi:transit-connection-variant", "Przepływ", "native"],
      profile.rotate_charts === false ? null : ["mdi:chart-line", "Wykresy", "native"],
      ...lovelaceViews.filter(item => item.enabled !== false).map(item => ["mdi:view-dashboard", item.name || "Lovelace", String(item.path || "").trim() ? "lovelace" : "missing"]),
      profile.rotate_overview === false ? null : ["mdi:view-dashboard-outline", "Podsumowanie", "native"],
    ].filter(Boolean).map(([icon, label, kind]) => `<span class="kiosk-tab-chip ${kind}"><ha-icon icon="${icon}"></ha-icon>${this._esc(label)}${kind === "missing" ? `<b>!</b>` : ""}</span>`).join("");
    const bubbleChoices = (this._config.overview_bubbles || []).map(item => `<label class="selection-chip"><input type="checkbox" data-action="toggle-kiosk-selection" data-profile-index="${profileIndex}" data-kind="bubble" data-item-id="${this._escAttr(item.id)}" ${bubbleIds.has(item.id) ? "checked" : ""} ${disabled}><ha-icon icon="${this._escAttr(item.icon || "mdi:information-outline")}"></ha-icon><span>${this._esc(item.name)}</span></label>`).join("");
    const chartChoices = (this._config.overview_charts || []).map(item => `<label class="selection-chip"><input type="checkbox" data-action="toggle-kiosk-selection" data-profile-index="${profileIndex}" data-kind="chart" data-item-id="${this._escAttr(item.id)}" ${chartIds.has(item.id) ? "checked" : ""} ${disabled}><ha-icon icon="${this._escAttr(item.icon || "mdi:chart-line")}"></ha-icon><span>${this._esc(item.name)}</span></label>`).join("");
    return `<div class="kiosk-settings ${isDefault ? "default-kiosk-settings" : "panel kiosk-profile-card"}">
      <div class="panel-title"><span>${this._esc(heading)}</span><div class="kiosk-profile-head-actions">${isDefault ? `<ha-icon icon="mdi:monitor-dashboard"></ha-icon>` : `<button class="danger-link" data-action="remove-kiosk-profile" data-index="${profileIndex}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button>`}</div></div>
      ${isDefault ? "" : `<div class="three-grid">${this._field(`${path}.id`, "Identyfikator URL", profile.id, "salon", disabled)}${this._field(`${path}.name`, "Nazwa profilu", profile.name, "Ekran w salonie", disabled)}${this._field(`${path}.description`, "Opis", profile.description, "Tablet 10 cali", disabled)}</div>`}
      <div class="kiosk-tabs-preview"><b>ZAKŁADKI W TYM KIOSKU</b><div>${tabPreview || `<small>Brak aktywnych zakładek.</small>`}</div></div>
      <div class="three-grid">${this._field(`${path}.title`, "Tytuł karty", profile.title || "PRZEPŁYW ENERGII", "PRZEPŁYW ENERGII", disabled)}${this._selectField(`${path}.display_preset`, "Format ekranu", profile.display_preset || "tablet_16_9", [["tablet_16_9","Samsung Galaxy Tab A9 · poziomo 16:9"],["auto","Automatyczny"],["desktop","Duży ekran / desktop"]], disabled, true)}${this._selectField(`${path}.flow_height`, "Wysokość diagramu", profile.flow_height || "tall", [["standard","Standardowa"],["tall","Wysoka"],["full","Pełna wysokość"]], disabled, true)}</div>
      <div class="three-grid">${this._numberField(`${path}.max_bubbles`, "Maksymalna liczba dymków", profile.max_bubbles || 6, 1, 16, 1, disabled, true)}${this._numberField(`${path}.chart_columns`, "Kolumny wykresów", profile.chart_columns || 2, 1, 4, 1, disabled, true)}${this._numberField(`${path}.rotation_seconds`, "Zmiana slajdu co (s)", profile.rotation_seconds || 20, 5, 3600, 1, disabled)}</div>
      <div class="four-grid">${this._selectField(`${path}.bubble_layout`, "Układ dymków", profile.bubble_layout || "free", [["free","Swobodny · przeciąganie"],["grid","Automatyczna siatka"]], disabled, true)}${this._numberField(`${path}.bubble_stage_height`, "Wysokość obszaru dymków (px)", profile.bubble_stage_height || 96, 76, 400, 1, disabled, true)}${this._numberField(`${path}.flow_offset_y`, "Diagram góra/dół (px)", profile.flow_offset_y ?? -30, -400, 400, 1, disabled, true)}${this._numberField(`${path}.flow_scale`, "Skala diagramu (%)", profile.flow_scale || 100, 60, 140, 1, disabled, true)}</div>
      <div class="two-grid">${this._numberField(`${path}.flow_offset_x`, "Diagram lewo/prawo (px)", profile.flow_offset_x || 0, -400, 400, 1, disabled, true)}<div class="field"><span>Pozycje zapisane w profilu</span><button class="secondary-btn reset-layout-btn" data-action="reset-kiosk-layout" data-profile-index="${profileIndex}" ${disabled}><ha-icon icon="mdi:restore"></ha-icon>RESETUJ POŁOŻENIE</button></div></div>
      <div class="widget-checks three-checks">
        <label class="check-row performance-setting"><input type="checkbox" data-path="${path}.tablet_performance_mode" data-live-rerender="1" ${profile.tablet_performance_mode !== false ? "checked" : ""} ${disabled}><span><b>Tryb wydajny tabletu</b><small>Renderuje tylko aktywną zakładkę, ogranicza aktualizacje do 1/s i wyłącza najcięższe poświaty.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_notification_center" data-live-rerender="1" ${profile.show_notification_center !== false ? "checked" : ""} ${disabled}><span><b>Komunikaty Notification Center</b><small>Paski, karty i alarmy nad każdym slajdem kiosku.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_builtin_bubbles" data-live-rerender="1" ${profile.show_builtin_bubbles !== false ? "checked" : ""} ${disabled}><span><b>Standardowe dymki</b><small>Dom, PV, sieć, magazyn i EV.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_custom_bubbles" data-live-rerender="1" ${profile.show_custom_bubbles !== false ? "checked" : ""} ${disabled}><span><b>Własne dymki</b><small>Wybrane poniżej.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_charts" data-live-rerender="1" ${profile.show_charts !== false ? "checked" : ""} ${disabled}><span><b>Wykresy</b><small>Osobny slajd wykresów.</small></span></label>
        ${isDefault ? "" : `<label class="check-row"><input type="checkbox" data-path="${path}.enabled" data-live-rerender="1" ${profile.enabled !== false ? "checked" : ""} ${disabled}><span><b>Profil aktywny</b><small>Dostępny pod własnym URL.</small></span></label>`}
      </div>
      <div class="widget-subsection"><b>STANDARDOWE DYMKI</b><small>Każdy standardowy dymek można włączyć lub wyłączyć osobno. Magazyn jest domyślnie wyłączony.</small></div>
      <div class="selection-chips builtin-kiosk-selection">${builtinChoices}</div>
      <div class="widget-subsection"><b>PANELE PODSUMOWANIA</b><small>Magazyn energii i samowystarczalność nie są już wymuszane.</small></div>
      <div class="widget-checks four-checks">
        <label class="check-row"><input type="checkbox" data-path="${path}.show_price_panel" data-live-rerender="1" ${profile.show_price_panel !== false ? "checked" : ""} ${disabled}><span><b>Ceny energii</b><small>Panel zakupu i sprzedaży.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_consumers_panel" data-live-rerender="1" ${profile.show_consumers_panel !== false ? "checked" : ""} ${disabled}><span><b>Najwięksi odbiorcy</b><small>Lista odbiorników.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_battery_gauge" data-live-rerender="1" ${profile.show_battery_gauge ? "checked" : ""} ${disabled}><span><b>Magazyn energii</b><small>Okrągły wskaźnik SOC.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_self_sufficiency_gauge" data-live-rerender="1" ${profile.show_self_sufficiency_gauge ? "checked" : ""} ${disabled}><span><b>Samowystarczalność</b><small>Okrągły wskaźnik procentowy.</small></span></label>
      </div>
      <div class="kiosk-selection-grid">
        <div><div class="widget-subsection"><b>WYBÓR DYMKÓW</b><small>Puste zaznaczenie w trybie „wybrane” ukrywa wszystkie własne dymki.</small></div>${this._selectField(`${path}.bubble_selection`, "Zakres dymków", profile.bubble_selection || "all", [["all","Wszystkie"],["selected","Tylko zaznaczone"]], disabled, true)}<div class="selection-chips">${bubbleChoices || `<small>Najpierw dodaj własne dymki.</small>`}</div></div>
        <div><div class="widget-subsection"><b>WYBÓR WYKRESÓW</b><small>Każdy profil może pokazywać inny zestaw danych.</small></div>${this._selectField(`${path}.chart_selection`, "Zakres wykresów", profile.chart_selection || "all", [["all","Wszystkie"],["selected","Tylko zaznaczone"]], disabled, true)}<div class="selection-chips">${chartChoices || `<small>Najpierw dodaj wykresy.</small>`}</div></div>
      </div>
      <div class="widget-subsection"><b>NATYWNE ZAKŁADKI KIOSKU</b><small>Te przełączniki decydują, które wbudowane ekrany istnieją w kiosku. Nie dotyczą wyłącznie automatycznej rotacji.</small></div>
      <div class="widget-checks three-checks">
        <label class="check-row"><input type="checkbox" data-path="${path}.rotation_enabled" data-live-rerender="1" ${profile.rotation_enabled ? "checked" : ""} ${disabled}><span><b>Automatyczna rotacja</b><small>Interwał ustawiony powyżej.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.rotate_flow" data-live-rerender="1" ${profile.rotate_flow !== false ? "checked" : ""} ${disabled}><span><b>Zakładka Przepływ</b><small>Duży diagram.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.rotate_charts" data-live-rerender="1" ${profile.rotate_charts !== false ? "checked" : ""} ${disabled}><span><b>Zakładka Wykresy</b><small>Pojawi się, gdy istnieje wykres.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.rotate_overview" data-live-rerender="1" ${profile.rotate_overview !== false ? "checked" : ""} ${disabled}><span><b>Zakładka Podsumowanie</b><small>Dymki, ceny i odbiorniki.</small></span></label>
      </div>
      <div class="widget-subsection"><b>TRYB NOCNY</b><small>Automatyczne przyciemnienie ekranu w zadanych godzinach.</small></div>
      <div class="four-grid">
        <label class="check-row"><input type="checkbox" data-path="${path}.night_enabled" data-live-rerender="1" ${profile.night_enabled ? "checked" : ""} ${disabled}><span><b>Wygaszanie nocne</b><small>Aktywuj harmonogram.</small></span></label>
        ${this._field(`${path}.night_start`, "Początek", profile.night_start || "22:00", "22:00", disabled)}
        ${this._field(`${path}.night_end`, "Koniec", profile.night_end || "06:00", "06:00", disabled)}
        ${this._numberField(`${path}.night_brightness`, "Jasność nocna (%)", profile.night_brightness || 30, 5, 100, 1, disabled)}
      </div>
      <div class="widget-subsection kiosk-extra-tabs-heading"><b>DODATKOWE ZAKŁADKI Z HOME ASSISTANT / LOVELACE</b><small>Każdy wpis poniżej jest osobnym ekranem wyłącznie wewnątrz tego profilu kiosku.</small></div>
      <div class="widget-related-list kiosk-lovelace-list">${lovelaceCards || `<div class="mini-empty">Brak dodatkowych zakładek. Dodaj istniejący pulpit lub widok Home Assistant.</div>`}<button class="primary-btn add-related-btn" data-action="add-kiosk-lovelace-view" data-profile-index="${profileIndex}" ${lovelaceViews.length >= 12 ? "disabled" : disabled}><ha-icon icon="mdi:view-dashboard-plus-outline"></ha-icon>DODAJ ZAKŁADKĘ DO TEGO KIOSKU (${lovelaceViews.length}/12)</button></div>
      <div class="kiosk-profile-footer"><code>/matrix-energy-center?kiosk=${this._esc(profileId)}</code><div class="kiosk-profile-head-actions"><button class="secondary-btn" data-settings-target="kiosk:${profileIndex}" ${disabled}><ha-icon icon="mdi:palette-outline"></ha-icon>USTAWIENIA GRAFIKI</button><button class="secondary-btn" data-action="open-kiosk-profile" data-profile-id="${this._escAttr(profileId)}"><ha-icon icon="mdi:monitor-eye"></ha-icon>OTWÓRZ PROFIL</button></div></div>
    </div>`;
  }

  _layoutEditorContext(target = this._layoutEditorTarget) {
    if (!target) return null;
    if (target === "overview") {
      return { target, profile: this._config.overview || {}, label: "Główny przegląd", kiosk: false, metrics: true };
    }
    if (target === "flow") return { target, profile: this._config.flow || {}, label: "Pulpit Przepływy", kiosk: false, metrics: false };
    const match = /^kiosk:(-?\d+)$/.exec(target);
    if (!match) return null;
    const index = Number(match[1]);
    const profile = index < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[index];
    if (!profile) return null;
    return { target, profile, label: index < 0 ? "Domyślny kiosk" : profile.name || `Kiosk ${index + 1}`, kiosk: true, metrics: true };
  }

  _layoutEditorProfilePath(target = this._layoutEditorTarget) {
    if (target === "overview") return "overview";
    if (target === "flow") return "flow";
    const match = /^kiosk:(-?\d+)$/.exec(target || "");
    if (!match) return "";
    const index = Number(match[1]);
    return index < 0 ? "kiosk" : `kiosk_profiles.${index}`;
  }

  _layoutFlowBubbleDefinitions() {
    const flow = this._config.flow || {};
    const maxStrings = Math.max(0, Math.min(16, Number(flow.max_pv_strings ?? 6)));
    const maxDevices = Math.max(0, Math.min(24, Number(flow.max_devices ?? 6)));
    const definitions = [{ key: "home", label: "Dymek DOM", icon: "mdi:home-lightning-bolt-outline", kind: "node" }];
    if (this._showModule("grid")) definitions.push({ key: "grid", label: "Dymek SIEĆ", icon: "mdi:transmission-tower", kind: "node" }, { key: "link_grid", label: "Linia SIEĆ ↔ DOM", kind: "link" }, { key: "label_grid", label: "Opis linii SIEĆ", kind: "label" });
    if (this._showModule("pv")) definitions.push({ key: "pv", label: "Dymek PV", icon: "mdi:solar-power", kind: "node" }, { key: "link_pv", label: "Linia PV → DOM", kind: "link" }, { key: "label_pv", label: "Opis linii PV", kind: "label" });
    if (this._showModule("battery")) definitions.push({ key: "battery", label: "Dymek MAGAZYN", icon: "mdi:battery-charging-high", kind: "node" }, { key: "link_battery", label: "Linia DOM ↔ MAGAZYN", kind: "link" }, { key: "label_battery", label: "Opis linii MAGAZYN", kind: "label" });
    if (this._showModule("ev")) definitions.push({ key: "ev", label: "Dymek EV", icon: "mdi:car-electric", kind: "node" }, { key: "wire_ev", label: "Przewód EV", kind: "wire" });
    let sourceCount = 0, loadCount = this._showModule("ev") ? 1 : 0;
    const strings = flow.show_pv_strings === false ? [] : (this._config.pv_strings || []).map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false && item.show_in_flow !== false)
      .sort((a, b) => Number(a.item.flow_order ?? a.index) - Number(b.item.flow_order ?? b.index))
      .slice(0, maxStrings);
    strings.forEach(({ item, index }) => {
      const key = this._flowNodeKey(`string_${item.id || index + 1}`);
      definitions.push({ key, label: `Dymek ${item.flow_label || item.name || `String ${index + 1}`}`, icon: item.flow_icon || "mdi:solar-panel-large", kind: "node" }, { key: `wire_${key}`, label: `Przewód ${item.flow_label || item.name || `String ${index + 1}`}`, kind: "wire" });
      sourceCount += 1;
    });
    const devices = flow.show_devices === false || this._config.features?.appliances === false ? [] : (this._config.devices || []).map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false && item.show_in_flow === true)
      .sort((a, b) => Number(a.item.flow_order ?? a.item.priority ?? a.index) - Number(b.item.flow_order ?? b.item.priority ?? b.index))
      .slice(0, maxDevices);
    devices.forEach(({ item, index }) => {
      const key = this._flowNodeKey(`device_${item.id || index + 1}`), label = item.flow_label || item.name || `Urządzenie ${index + 1}`;
      definitions.push({ key, label: `Dymek ${label}`, icon: item.icon || "mdi:flash", kind: "node" }, { key: `wire_${key}`, label: `Przewód ${label}`, kind: "wire" });
      if (item.flow_direction === "source") sourceCount += 1; else loadCount += 1;
    });
    if (sourceCount) definitions.push({ key: "bus_sources", label: "Magistrala ŹRÓDŁA", kind: "bus" }, { key: "link_sources", label: "Linia ŹRÓDŁA → PV", kind: "link" }, { key: "label_sources", label: "Opis ŹRÓDŁA", kind: "label" });
    if (loadCount) definitions.push({ key: "link_loads", label: "Linia DOM → ODBIORNIKI", kind: "link" }, { key: "label_loads", label: "Opis ODBIORNIKI", kind: "label" }, { key: "bus_loads", label: "Magistrala ODBIORNIKI", kind: "bus" });
    return definitions;
  }

  _layoutEditorBubbleItems(context) {
    const profile = context.profile;
    if (context.metrics === false) return [];
    if (!context.kiosk) {
      const builtin = profile.show_builtin_bubbles === false ? [] : [
        { key: "builtin_home", html: this._metric("home", "mdi:home-lightning-bolt", "DOM", "cyan") },
        { key: "builtin_pv", html: this._showModule("pv") ? this._metric("pv", "mdi:solar-power", "PRODUKCJA PV", "green") : "" },
        { key: "builtin_battery", html: this._showModule("battery") ? this._metric("batterySoc", "mdi:battery-high", "MAGAZYN", "lime", "%") : "" },
        { key: "builtin_ev", html: this._showModule("ev") ? this._metric("ev", "mdi:car-electric", "ŁADOWANIE EV", "cyan") : "" },
        { key: "builtin_grid", html: this._showModule("grid") ? this._metric("grid", "mdi:transmission-tower", "SIEĆ", "purple") : "" },
        { key: "builtin_price", html: this._showModule("prices") ? this._metric("price", "mdi:tag-outline", "CENA ZAKUPU", "orange", this._config.general.currency + "/kWh") : "" },
      ].filter(item => item.html);
      const custom = profile.show_custom_bubbles === false ? [] : (this._config.overview_bubbles || [])
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.enabled !== false)
        .sort((a, b) => Number(a.item.order || 0) - Number(b.item.order || 0))
        .map(({ item, index }) => ({ key: `bubble_${item.id || index + 1}`, html: this._overviewBubble(item, index) }));
      return [...builtin, ...custom];
    }
    const builtinIds = new Set(profile.builtin_bubble_ids || ["home", "pv", "grid"]);
    const builtin = profile.show_builtin_bubbles === false ? [] : [
      { key: "builtin_home", id: "home", html: this._metric("home", "mdi:home-lightning-bolt", "DOM", "cyan") },
      { key: "builtin_pv", id: "pv", html: this._showModule("pv") ? this._metric("pv", "mdi:solar-power", "PRODUKCJA PV", "green") : "" },
      { key: "builtin_grid", id: "grid", html: this._showModule("grid") ? this._metric("grid", "mdi:transmission-tower", "SIEĆ", "purple") : "" },
      { key: "builtin_battery", id: "battery", html: this._showModule("battery") ? this._metric("batterySoc", "mdi:battery-high", "MAGAZYN", "lime", "%") : "" },
      { key: "builtin_ev", id: "ev", html: this._showModule("ev") ? this._metric("ev", "mdi:car-electric", "ŁADOWANIE EV", "cyan") : "" },
      { key: "builtin_price", id: "price", html: this._showModule("prices") ? this._metric("price", "mdi:tag-outline", "CENA ZAKUPU", "orange", this._config.general.currency + "/kWh") : "" },
    ].filter(item => item.html && builtinIds.has(item.id));
    const custom = profile.show_custom_bubbles === false ? [] : this._selectedKioskItems("bubble", profile)
      .filter(item => item.enabled !== false)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      .map(item => ({ key: `bubble_${item.id || "custom"}`, html: this._overviewBubble(item, (this._config.overview_bubbles || []).indexOf(item)) }));
    return [...builtin, ...custom].slice(0, Math.max(1, Math.min(16, Number(profile.max_bubbles || 6))));
  }

  _renderFlowElementInspector(context) {
    const definitions = this._layoutFlowBubbleDefinitions();
    if (!definitions.length) return "";
    let definition = definitions.find(item => item.key === this._layoutSelectedElement) || definitions[0];
    this._layoutSelectedElement = definition.key;
    const profilePath = this._layoutEditorProfilePath();
    context.profile.flow_element_styles ||= {};
    const style = context.profile.flow_element_styles[definition.key] ||= {};
    const path = `${profilePath}.flow_element_styles.${definition.key}`;
    const isNode = definition.kind === "node";
    const baseColor = this._flowBaseColor(definition.key);
    const fields = Array.isArray(style.extra_fields) ? style.extra_fields : [];
    const options = definitions.map(item => `<option value="${this._escAttr(item.key)}" ${item.key === definition.key ? "selected" : ""}>${this._esc(item.label)}</option>`).join("");
    const fieldCards = fields.map((field, index) => `<article class="layout-extra-field"><div class="widget-related-head"><b>POLE ${index + 1}</b><button class="danger-link" data-action="remove-flow-extra-field" data-index="${index}"><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div>${this._field(`${path}.extra_fields.${index}.name`, "Nazwa pola", field.name || `Pole ${index + 1}`, "Np. Energia dzisiaj", "")}<div>${this._entityField(`${path}.extra_fields.${index}.entity_id`, "Encja", field.entity_id, "Dowolna encja Home Assistant.", "", "any")}</div><div class="two-grid">${this._field(`${path}.extra_fields.${index}.attribute`, "Atrybut", field.attribute, "Opcjonalnie", "")}${this._field(`${path}.extra_fields.${index}.unit`, "Jednostka", field.unit, "Puste = z encji", "")}</div><div class="three-grid">${this._numberField(`${path}.extra_fields.${index}.decimals`, "Precyzja", field.decimals ?? 1, 0, 6, 1, "")}${this._numberField(`${path}.extra_fields.${index}.multiplier`, "Mnożnik", field.multiplier ?? 1, -1000000, 1000000, 0.001, "")}${this._colorField(`${path}.extra_fields.${index}.color`, "Kolor", field.color || "#8eb5c3", "")}</div><label class="check-row"><input type="checkbox" data-path="${path}.extra_fields.${index}.enabled" data-live-rerender="1" ${field.enabled !== false ? "checked" : ""}><span><b>Pole widoczne</b><small>Można je zachować i czasowo ukryć.</small></span></label></article>`).join("");
    return `<aside class="layout-element-inspector">
      <div class="panel-title"><span>WŁAŚCIWOŚCI ELEMENTU</span><ha-icon icon="mdi:tune-variant"></ha-icon></div>
      <label class="field"><span>Edytowany obiekt</span><select data-action="select-flow-layout-element">${options}</select></label>
      <div class="widget-subsection"><b>WYGLĄD</b><small>Ustawienia zapisują się tylko dla bieżącego pulpitu.</small></div>
      <label class="check-row"><input type="checkbox" data-path="${path}.appearance_enabled" data-live-rerender="1" ${style.appearance_enabled ? "checked" : ""}><span><b>Własny wygląd</b><small>Wyłącz, aby używać stylu domyślnego.</small></span></label>
      ${isNode ? `<div class="two-grid">${this._field(`${path}.name`, "Własna nazwa", style.name, definition.label.replace(/^Dymek /, ""), "", true)}${this._selectField(`${path}.icon_type`, "Typ ikony", style.icon_type === "emoji" ? "emoji" : "mdi", [["mdi","Ikona MDI"],["emoji","Emoji"]], "", true)}</div><div>${style.icon_type === "emoji" ? this._field(`${path}.emoji`, "Wklej emoji", style.emoji || "⚡", "Np. 🏠 🔋 ☀️ ⚡", "", true) : this._field(`${path}.icon`, "Ikona MDI", style.icon || definition.icon || "mdi:information-outline", "mdi:home", "", true)}</div><div class="three-grid">${this._numberField(`${path}.width`, "Szerokość (0 = auto)", style.width || 0, 0, 360, 1, "", true)}${this._numberField(`${path}.height`, "Wysokość (0 = auto)", style.height || 0, 0, 360, 1, "", true)}${this._numberField(`${path}.icon_size`, "Rozmiar ikony / emoji", style.icon_size || 32, 10, 120, 1, "", true)}</div><div class="three-grid">${this._numberField(`${path}.border_width`, "Grubość ramki", style.border_width || 1, 1, 8, 1, "", true)}${this._numberField(`${path}.border_radius`, "Zaokrąglenie", style.border_radius ?? 18, 0, 100, 1, "", true)}${this._colorField(`${path}.border_color`, "Kolor ramki", style.border_color || baseColor, "")}</div><div class="three-grid">${this._colorField(`${path}.background_color`, "Kolor tła", style.background_color || "#020c18", "")}${this._colorField(`${path}.icon_color`, "Kolor ikony", style.icon_color || baseColor, "")}${this._colorField(`${path}.name_color`, "Kolor nazwy", style.name_color || "#eefaff", "")}${this._colorField(`${path}.value_color`, "Kolor wartości", style.value_color || baseColor, "")}${this._colorField(`${path}.unit_color`, "Kolor jednostki", style.unit_color || "#94b5c0", "")}</div><div class="widget-subsection"><b>DODATKOWE POLA W DYMKU</b><small>Do 8 dowolnych encji lub atrybutów.</small></div><div class="layout-extra-fields">${fieldCards || `<div class="mini-empty">Brak dodatkowych pól.</div>`}<button class="secondary-btn" data-action="add-flow-extra-field" ${fields.length >= 8 ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>DODAJ POLE (${fields.length}/8)</button></div>` : definition.kind === "label" ? `<div class="three-grid">${this._colorField(`${path}.value_color`, "Kolor tekstu", style.value_color || "#eefaff", "")}${this._colorField(`${path}.background_color`, "Kolor tła", style.background_color || "#020c18", "")}${this._colorField(`${path}.border_color`, "Kolor ramki", style.border_color || baseColor, "")}</div>` : `<div class="two-grid">${this._colorField(`${path}.line_color`, "Kolor linii", style.line_color || baseColor, "")}${this._numberField(`${path}.line_thickness`, "Grubość linii", style.line_thickness || 3, 1, 14, 1, "", true)}</div>`}
      <div class="widget-subsection"><b>INTERAKCJA</b><small>Akcja wykonywana po dotknięciu obiektu poza trybem edycji.</small></div>
      ${this._selectField(`${path}.tap_action`, "Akcja", style.tap_action || "none", [["none","Brak"],["more_info","Szczegóły encji"],["toggle","Przełącz (toggle)"],["navigate","Nawigacja"],["service","Dowolna usługa HA"]], "", true)}
      <div>${this._entityField(`${path}.action_entity_id`, "Encja akcji", style.action_entity_id, "Dla szczegółów, toggle lub jako domyślna encja usługi.", "", "any")}</div>
      ${this._field(`${path}.navigation_path`, "Ścieżka nawigacji", style.navigation_path, "/lovelace/energia", "")}
      ${this._field(`${path}.service`, "Usługa Home Assistant", style.service, "Np. light.toggle", "")}
      ${this._textarea(`${path}.service_data`, "Dane usługi JSON", style.service_data || "{}", "{\"brightness_pct\":50}", "")}
    </aside>`;
  }

  _renderBubbleLayoutEditor() {
    if (!this._isAdmin()) return "";
    const context = this._layoutEditorContext();
    if (!context) return "";
    const items = this._layoutEditorBubbleItems(context);
    const slots = items.map((item, index) => this._kioskBubbleSlot(item, index, items.length, context.profile)).join("");
    return `<div class="layout-editor-backdrop">
      <section class="layout-editor-dialog" role="dialog" aria-modal="true" aria-label="Edycja diagramu przepływu i dymków">
        <header class="layout-editor-toolbar"><div><span class="eyebrow">USTAWIENIA · UKŁAD DIAGRAMU I DYMKÓW</span><h2>${this._esc(context.label)}</h2><small>Przesuwasz pojedyncze elementy. Tło i siatka pozostają nieruchome.</small></div><div><button class="secondary-btn" data-action="reset-bubble-layout-editor"><ha-icon icon="mdi:restore"></ha-icon>RESETUJ UKŁAD</button><button class="secondary-btn" data-action="cancel-bubble-layout-editor"><ha-icon icon="mdi:close"></ha-icon>ANULUJ</button><button class="primary-btn" data-action="save-bubble-layout-editor"><ha-icon icon="mdi:content-save"></ha-icon>ZAPISZ USTAWIENIA</button></div></header>
        <div class="layout-editor-help"><ha-icon icon="mdi:gesture-tap-hold"></ha-icon><span>Przeciągnij dowolny dymek, linię, opis, magistralę lub przewód. Dotknij obiektu bez przesuwania, aby wybrać go w panelu właściwości. Pozycje, wygląd i akcje zapisują się tylko dla wybranego pulpitu.</span></div>
        <div class="layout-editor-workspace">
          <div class="layout-editor-canvas layout-editing" data-layout-boundary>
            <div class="layout-editor-fixed-background flow-layout-editing">${this._flowDiagram(true, false, context.profile)}</div>
            ${slots ? `<div class="metrics-grid dynamic kiosk-metrics kiosk-bubble-stage layout-free bubble-size-${this._escAttr(this._config.overview?.bubble_size || "medium")}">${slots}</div>` : context.metrics === false ? "" : this._emptyState("mdi:message-off-outline", "Brak górnych dymków", "Włącz lub dodaj dymki w ustawieniach tego pulpitu.")}
          </div>
          ${this._renderFlowElementInspector(context)}
        </div>
      </section>
    </div>`;
  }

  _settingsContext(target = this._settingsTarget) {
    if (target === "overview") return { target, path: "overview", label: "Podsumowanie", profile: this._config.overview || {} };
    if (target === "flow") return { target, path: "flow", label: "Przepływy", profile: this._config.flow || {} };
    if (target === "kiosk:-1") return { target, path: "kiosk", label: "Kiosk domyślny", profile: this._config.kiosk || {} };
    const match = /^kiosk:(\d+)$/.exec(target || "");
    if (!match) return null;
    const index = Number(match[1]), profile = this._config.kiosk_profiles?.[index];
    return profile ? { target, path: `kiosk_profiles.${index}`, label: profile.name || `Kiosk ${index + 1}`, profile } : null;
  }

  _ensureFlowScene(profile) {
    profile.flow_scene ||= {};
    const scene = profile.flow_scene;
    scene.canvas_height ??= 620;
    scene.show_grid ??= true;
    scene.grid_size ??= 20;
    scene.snap_to_grid ??= true;
    scene.background_color ||= "#020b16";
    scene.border_color ||= "#20eaff";
    scene.border_width ??= 1;
    scene.border_radius ??= 16;
    scene.routing_clearance ??= 20;
    scene.routing_spacing ??= 14;
    scene.elements ||= {};
    scene.connections ||= {};
    profile.flow_element_styles ||= {};
    return scene;
  }

  _flowSceneModel(profile) {
    const scene = this._ensureFlowScene(profile || {});
    const flow = { show_pv_strings: true, show_devices: true, max_pv_strings: 6, max_devices: 6, ...(this._config.flow || {}) };
    const values = this._runtimeValues();
    const nodes = [];
    const addNode = (key, label, icon, defaults, details = {}) => {
      const stored = scene.elements[key] || {};
      nodes.push({ key, label, icon, ...details, ...defaults, ...stored, visible: stored.visible !== false, locked: stored.locked === true });
    };
    addNode("home", "DOM", "mdi:home-lightning-bolt-outline", { x: 50, y: 55, width: 150, height: 150, z_index: 25 }, { live: "home", unit: "kW", accent: "cyan" });
    if (this._showModule("grid")) addNode("grid", "SIEĆ", "mdi:transmission-tower", { x: 14, y: 55, width: 132, height: 132, z_index: 20 }, { live: "gridSigned", unit: "kW", accent: "purple" });
    if (this._showModule("pv")) addNode("pv", "PV", "mdi:solar-power", { x: 50, y: 27, width: 132, height: 132, z_index: 20 }, { live: "pv", unit: "kW", accent: "green" });
    if (this._showModule("battery")) addNode("battery", "MAGAZYN", "mdi:battery-charging-high", { x: 86, y: 55, width: 132, height: 132, z_index: 20 }, { live: "battery", unit: "kW", accent: "lime", extra: `<span data-live="batterySoc">--</span>% SOC` });

    const strings = this._showModule("pv") && flow.show_pv_strings !== false ? (this._config.pv_strings || []).map((item, index) => ({ item, index })).filter(({ item }) => item.enabled !== false && item.show_in_flow !== false).slice(0, Math.max(0, Math.min(16, Number(flow.max_pv_strings || 6)))) : [];
    const devices = flow.show_devices !== false ? (this._config.devices || []).map((item, index) => ({ item, index })).filter(({ item }) => item.enabled !== false && item.show_in_flow === true).sort((a, b) => Number(a.item.flow_order ?? a.item.priority ?? a.index) - Number(b.item.flow_order ?? b.item.priority ?? b.index)).slice(0, Math.max(0, Math.min(24, Number(flow.max_devices || 6)))) : [];
    const sources = [...strings.map(({ item, index }) => ({ kind: "string", item, index })), ...devices.filter(({ item }) => item.flow_direction === "source").map(({ item, index }) => ({ kind: "device", item, index }))];
    const loads = [...(this._showModule("ev") ? [{ kind: "ev", item: {}, index: -1 }] : []), ...devices.filter(({ item }) => item.flow_direction !== "source").map(({ item, index }) => ({ kind: "device", item, index }))];
    const spacedX = (index, count) => count <= 1 ? 50 : 12 + (76 * index / (count - 1));
    sources.forEach((entry, order) => {
      const { kind, item, index } = entry;
      const key = this._flowNodeKey(`${kind}_${item.id || index + 1}`);
      const runtime = kind === "string" ? this._pvStringRuntime(item, index) : this._deviceRuntime(item, index);
      addNode(key, item.flow_label || item.name || `Źródło ${order + 1}`, item.flow_icon || item.icon || "mdi:solar-panel-large", { x: spacedX(order, sources.length), y: 9, width: 132, height: 82, z_index: 20 }, { value: this._kw(runtime.power), unit: "kW", status: runtime.status || item.mppt || item.area || "Źródło", accent: kind === "string" ? "green" : item.accent || "cyan", kind, index });
    });
    loads.forEach((entry, order) => {
      const { kind, item, index } = entry;
      const key = kind === "ev" ? "ev" : this._flowNodeKey(`device_${item.id || index + 1}`);
      const runtime = kind === "ev" ? { power: values.ev, status: values.evSoc == null ? "EV" : `${this._num(values.evSoc, 0)}% SOC` } : this._deviceRuntime(item, index);
      addNode(key, kind === "ev" ? "EV" : item.flow_label || item.name || `Odbiornik ${order + 1}`, kind === "ev" ? "mdi:car-electric" : item.icon || "mdi:flash", { x: spacedX(order, loads.length), y: 89, width: 132, height: 82, z_index: 20 }, { value: this._kw(Math.abs(Number(runtime.power || 0))), unit: "kW", status: runtime.status || runtime.cycle_state || item.area || "Odbiornik", accent: kind === "ev" ? "cyan" : item.accent || "cyan", kind, index, flow_direction: item.flow_direction || "consumer" });
    });

    const byKey = Object.fromEntries(nodes.map(node => [node.key, node]));
    const connections = [];
    const addConnection = (key, from, to, label, automatic, defaults = {}) => {
      if (!byKey[from] || !byKey[to]) return;
      const stored = scene.connections[key] || {};
      connections.push({ key, from, to, label, automatic, route: "auto", forward_color: "#52ff62", reverse_color: "#b95cff", idle_color: "#49616b", unavailable_color: "#ff4d6d", thickness: 4, animation_speed: 1.2, deadband: 1, label_visible: true, label_color: "#eefaff", label_background: "#010912", label_border_color: "#20eaff", label_size: 9, label_bold: false, positive_direction: "forward", direction_source: "automatic", ...defaults, ...stored, label: stored.label || label, visible: stored.visible !== false });
    };
    addConnection("link_grid", "grid", "home", "SIEĆ", { kind: "grid" }, { forward_color: "#b95cff", reverse_color: "#52ff62" });
    addConnection("link_pv", "pv", "home", "PV", { kind: "pv" }, { forward_color: "#52ff62", reverse_color: "#b95cff" });
    addConnection("link_battery", "home", "battery", "MAGAZYN", { kind: "battery" }, { forward_color: "#b8ff3d", reverse_color: "#20eaff" });
    sources.forEach(entry => {
      const key = this._flowNodeKey(`${entry.kind}_${entry.item.id || entry.index + 1}`);
      addConnection(`wire_${key}`, key, byKey.pv ? "pv" : "home", entry.item.flow_label || entry.item.name || "ŹRÓDŁO", { kind: entry.kind, index: entry.index }, { forward_color: "#52ff62", reverse_color: "#b95cff" });
    });
    loads.forEach(entry => {
      const key = entry.kind === "ev" ? "ev" : this._flowNodeKey(`device_${entry.item.id || entry.index + 1}`);
      addConnection(entry.kind === "ev" ? "wire_ev" : `wire_${key}`, "home", key, entry.kind === "ev" ? "EV" : entry.item.flow_label || entry.item.name || "ODBIORNIK", { kind: entry.kind, index: entry.index }, { forward_color: "#20eaff", reverse_color: "#ffb11b" });
    });
    return { scene, nodes, connections, byKey };
  }

  _renderSettings() {
    if (!this._isAdmin() && !this._config.permissions.show_configuration_to_non_admin) return `<div class="locked"><ha-icon icon="mdi:shield-lock-outline"></ha-icon><h2>Ustawienia grafiki tylko dla administratora</h2></div>`;
    const disabled = this._isAdmin() ? "" : "disabled";
    const context = this._settingsContext() || this._settingsContext("overview");
    this._settingsTarget = context.target;
    const scene = this._ensureFlowScene(context.profile);
    const model = this._flowSceneModel(context.profile);
    const targets = [
      { id: "overview", label: "PODSUMOWANIE", icon: "mdi:view-dashboard-outline" },
      { id: "flow", label: "PRZEPŁYWY", icon: "mdi:transit-connection-variant" },
      { id: "kiosk:-1", label: "KIOSK DOMYŚLNY", icon: "mdi:monitor-dashboard" },
      ...(this._config.kiosk_profiles || []).map((profile, index) => ({ id: `kiosk:${index}`, label: profile.name || `KIOSK ${index + 1}`, icon: "mdi:monitor-multiple" })),
    ];
    const selectedNode = model.nodes.find(item => item.key === this._settingsSelectedKey);
    const selectedConnection = model.connections.find(item => item.key === this._settingsSelectedKey);
    if (!selectedNode && !selectedConnection) { this._settingsSelectedKind = "node"; this._settingsSelectedKey = model.nodes[0]?.key || "home"; }
    const inspector = this._renderSettingsInspector(context, model, disabled);
    return `<section class="settings-page">
      <header class="hero-row"><div><span class="eyebrow">EDYTOR V8.0</span><h1>Ustawienia wyglądu i układu</h1><p>Ten sam renderer jest używany w edytorze i na docelowym pulpicie.</p></div>${this._saveBar(disabled)}</header>
      <nav class="settings-targets">${targets.map(item => `<button class="${item.id === context.target ? "active" : ""}" data-settings-target="${this._escAttr(item.id)}"><ha-icon icon="${item.icon}"></ha-icon>${this._esc(item.label)}</button>`).join("")}</nav>
      <div class="settings-scene-toolbar">
        ${this._numberField(`${context.path}.flow_scene.canvas_height`, "Wysokość okna", scene.canvas_height, 320, 1200, 10, disabled, true)}
        ${this._numberField(`${context.path}.flow_scene.grid_size`, "Rozmiar siatki", scene.grid_size, 5, 80, 1, disabled, true)}
        ${this._colorField(`${context.path}.flow_scene.background_color`, "Tło", scene.background_color, disabled)}
        ${this._colorField(`${context.path}.flow_scene.border_color`, "Ramka", scene.border_color, disabled)}
        ${this._numberField(`${context.path}.flow_scene.border_width`, "Grubość ramki", scene.border_width, 0, 8, 1, disabled, true)}
        ${this._numberField(`${context.path}.flow_scene.border_radius`, "Zaokrąglenie", scene.border_radius, 0, 80, 1, disabled, true)}
        ${this._numberField(`${context.path}.flow_scene.routing_clearance`, "Odstęp od dymków", scene.routing_clearance, 8, 80, 1, disabled, true)}
        ${this._numberField(`${context.path}.flow_scene.routing_spacing`, "Odstęp między liniami", scene.routing_spacing, 8, 30, 1, disabled, true)}
        <label class="check-row"><input type="checkbox" data-path="${context.path}.flow_scene.show_grid" data-live-rerender="1" ${scene.show_grid !== false ? "checked" : ""} ${disabled}><span><b>Pokaż siatkę</b></span></label>
        <label class="check-row"><input type="checkbox" data-path="${context.path}.flow_scene.snap_to_grid" ${scene.snap_to_grid !== false ? "checked" : ""} ${disabled}><span><b>Przyciągaj do siatki</b></span></label>
        <button class="secondary-btn settings-reset" data-action="reset-settings-scene" ${disabled}><ha-icon icon="mdi:restore"></ha-icon>RESETUJ TEN UKŁAD</button>
      </div>
      <div class="settings-workspace">
        <article class="panel settings-live-preview"><div class="settings-preview-label"><b>${this._esc(context.label)}</b><span>Przeciągnij dymek · linie podążają automatycznie</span></div>${this._flowDiagram(true, false, context.profile, true)}</article>
        ${inspector}
      </div>
      ${context.target.startsWith("kiosk:") ? this._renderKioskHeaderEditors(context.profile, context.path, disabled) : ""}
    </section>`;
  }

  _kioskHeaderDefinitions(profile) {
    const installation = this._config.general?.installation_name || "Energy Center";
    return [
      { key: "flow", label: "PRZEPŁYW", title: profile.title || "PRZEPŁYW ENERGII", description: installation, icon: "mdi:transit-connection-variant" },
      { key: "charts", label: "WYKRESY", title: "WYKRESY ENERGII", description: installation, icon: "mdi:chart-multiple" },
      { key: "overview", label: "PODSUMOWANIE", title: "PODSUMOWANIE ENERGII", description: installation, icon: "mdi:view-dashboard-outline" },
      ...(profile.lovelace_views || []).map((item, index) => ({ key: this._flowNodeKey(`lovelace_${item.id || index + 1}`), label: item.name || `LOVELACE ${index + 1}`, title: item.name || `WIDOK ${index + 1}`, description: installation, icon: "mdi:view-dashboard" })),
    ];
  }

  _defaultKioskHeader(definition) {
    return {
      enabled: true,
      eyebrow: "MATRIX ENERGY CENTER",
      title: definition.title,
      description: definition.description,
      icon: definition.icon,
      show_icon: false,
      height: 64,
      background_color: "#03182d",
      border_color: "#20eaff",
      accent_color: "#20eaff",
      title_color: "#eefaff",
      description_color: "#6e98a8",
      eyebrow_size: 8,
      title_size: 18,
      description_size: 8,
      clock_size: 17,
      eyebrow_bold: true,
      title_bold: true,
      description_bold: false,
      clock_bold: true,
      show_clock: true,
      show_navigation: true,
      show_fullscreen: false,
      show_exit: false,
    };
  }

  _kioskHeaderConfig(profile, definition, initialize = false) {
    profile.slide_headers ||= {};
    if (initialize && !profile.slide_headers[definition.key]) profile.slide_headers[definition.key] = this._defaultKioskHeader(definition);
    return profile.slide_headers[definition.key] ? { ...this._defaultKioskHeader(definition), ...profile.slide_headers[definition.key] } : this._defaultKioskHeader(definition);
  }

  _renderKioskHeaderEditors(profile, path, disabled = "") {
    const cards = this._kioskHeaderDefinitions(profile).map(definition => {
      const config = this._kioskHeaderConfig(profile, definition, true);
      const fieldPath = `${path}.slide_headers.${definition.key}`;
      return `<details class="panel kiosk-header-editor"><summary><ha-icon icon="${this._escAttr(config.icon || definition.icon)}"></ha-icon><b>${this._esc(definition.label)}</b><span>${this._esc(config.title || "Bez tytułu")}</span><ha-icon icon="mdi:chevron-down"></ha-icon></summary><div class="kiosk-header-editor-body">
        <div class="widget-checks four-checks"><label class="check-row"><input type="checkbox" data-path="${fieldPath}.enabled" data-live-rerender="1" ${config.enabled !== false ? "checked" : ""} ${disabled}><span><b>Pokaż nagłówek</b></span></label><label class="check-row"><input type="checkbox" data-path="${fieldPath}.show_icon" data-live-rerender="1" ${config.show_icon ? "checked" : ""} ${disabled}><span><b>Ikona</b></span></label><label class="check-row"><input type="checkbox" data-path="${fieldPath}.show_clock" data-live-rerender="1" ${config.show_clock !== false ? "checked" : ""} ${disabled}><span><b>Zegar</b></span></label><label class="check-row"><input type="checkbox" data-path="${fieldPath}.show_navigation" data-live-rerender="1" ${config.show_navigation !== false ? "checked" : ""} ${disabled}><span><b>Nawigacja pośrodku</b></span></label></div>
        <div class="three-grid">${this._field(`${fieldPath}.eyebrow`, "Nadtytuł", config.eyebrow, "MATRIX ENERGY CENTER", disabled, true)}${this._field(`${fieldPath}.title`, "Tytuł", config.title, definition.title, disabled, true)}${this._field(`${fieldPath}.description`, "Opis", config.description, definition.description, disabled, true)}${this._field(`${fieldPath}.icon`, "Ikona MDI", config.icon, definition.icon, disabled, true)}${this._numberField(`${fieldPath}.height`, "Wysokość nagłówka", config.height, 44, 180, 1, disabled, true)}</div>
        <div class="four-grid">${this._numberField(`${fieldPath}.eyebrow_size`, "Nadtytuł (px)", config.eyebrow_size, 6, 20, 1, disabled, true)}${this._numberField(`${fieldPath}.title_size`, "Tytuł (px)", config.title_size, 9, 42, 1, disabled, true)}${this._numberField(`${fieldPath}.description_size`, "Opis (px)", config.description_size, 6, 24, 1, disabled, true)}${this._numberField(`${fieldPath}.clock_size`, "Zegar (px)", config.clock_size, 9, 40, 1, disabled, true)}</div>
        <div class="widget-checks four-checks"><label class="check-row"><input type="checkbox" data-path="${fieldPath}.eyebrow_bold" data-live-rerender="1" ${config.eyebrow_bold !== false ? "checked" : ""} ${disabled}><span><b>Pogrub nadtytuł</b></span></label><label class="check-row"><input type="checkbox" data-path="${fieldPath}.title_bold" data-live-rerender="1" ${config.title_bold !== false ? "checked" : ""} ${disabled}><span><b>Pogrub tytuł</b></span></label><label class="check-row"><input type="checkbox" data-path="${fieldPath}.description_bold" data-live-rerender="1" ${config.description_bold ? "checked" : ""} ${disabled}><span><b>Pogrub opis</b></span></label><label class="check-row"><input type="checkbox" data-path="${fieldPath}.clock_bold" data-live-rerender="1" ${config.clock_bold !== false ? "checked" : ""} ${disabled}><span><b>Pogrub zegar</b></span></label></div>
        <div class="five-grid">${this._colorField(`${fieldPath}.background_color`, "Tło", config.background_color, disabled)}${this._colorField(`${fieldPath}.border_color`, "Ramka", config.border_color, disabled)}${this._colorField(`${fieldPath}.accent_color`, "Akcent", config.accent_color, disabled)}${this._colorField(`${fieldPath}.title_color`, "Tytuł", config.title_color, disabled)}${this._colorField(`${fieldPath}.description_color`, "Opis", config.description_color, disabled)}</div>
      </div></details>`;
    }).join("");
    return `<section class="kiosk-header-settings"><div class="section-heading"><div><span class="eyebrow">KIOSK · NAGŁÓWKI SLAJDÓW</span><h2>Osobny nagłówek każdej zakładki</h2><p>Tutaj ustawisz elementy, teksty, rozmiary i kolory pola z tytułem, nawigacją i zegarem.</p></div></div><div class="kiosk-header-editor-list">${cards}</div></section>`;
  }

  _renderSettingsInspector(context, model, disabled = "") {
    const node = model.nodes.find(item => item.key === this._settingsSelectedKey);
    const connection = model.connections.find(item => item.key === this._settingsSelectedKey);
    const options = `<optgroup label="Dymki">${model.nodes.map(item => `<option value="node:${this._escAttr(item.key)}" ${node?.key === item.key ? "selected" : ""}>${this._esc(item.label)}</option>`).join("")}</optgroup><optgroup label="Linie przepływu">${model.connections.map(item => `<option value="connection:${this._escAttr(item.key)}" ${connection?.key === item.key ? "selected" : ""}>${this._esc(item.label)}</option>`).join("")}</optgroup>`;
    const key = node?.key || connection?.key || "home";
    const tileClipboard = this._readSettingsTileClipboard();
    context.profile.flow_element_styles ||= {};
    const style = context.profile.flow_element_styles[key] ||= {};
    const stylePath = `${context.path}.flow_element_styles.${key}`;
    let body = "";
    if (node) {
      const layout = model.scene.elements[node.key] ||= { x: node.x, y: node.y, width: node.width, height: node.height, z_index: node.z_index, visible: true, locked: false };
      const path = `${context.path}.flow_scene.elements.${node.key}`;
      body = `<div class="widget-subsection"><b>POŁOŻENIE I ROZMIAR</b><small>Wartości procentowe są responsywne dla różnych ekranów.</small></div>
        <div class="two-grid">${this._numberField(`${path}.x`, "Pozycja X (%)", layout.x, 0, 100, .1, disabled, true)}${this._numberField(`${path}.y`, "Pozycja Y (%)", layout.y, 0, 100, .1, disabled, true)}${this._numberField(`${path}.width`, "Szerokość", layout.width, 40, 360, 1, disabled, true)}${this._numberField(`${path}.height`, "Wysokość", layout.height, 30, 360, 1, disabled, true)}${this._numberField(`${path}.z_index`, "Warstwa", layout.z_index, 1, 100, 1, disabled, true)}</div>
        <div class="two-grid"><label class="check-row"><input type="checkbox" data-path="${path}.visible" data-live-rerender="1" ${layout.visible !== false ? "checked" : ""} ${disabled}><span><b>Widoczny</b></span></label><label class="check-row"><input type="checkbox" data-path="${path}.locked" ${layout.locked ? "checked" : ""} ${disabled}><span><b>Zablokuj przesuwanie</b></span></label></div>
        <div class="widget-subsection"><b>TREŚĆ I WYGLĄD DYMKU</b></div>
        <label class="check-row"><input type="checkbox" data-path="${stylePath}.appearance_enabled" data-live-rerender="1" ${style.appearance_enabled ? "checked" : ""} ${disabled}><span><b>Własny wygląd</b></span></label>
        ${this._field(`${stylePath}.name`, "Własna nazwa", style.name, node.label, disabled, true)}
        <div class="two-grid">${this._selectField(`${stylePath}.icon_type`, "Typ ikony", style.icon_type === "emoji" ? "emoji" : "mdi", [["mdi","MDI"],["emoji","Emoji"]], disabled, true)}<div data-settings-icon-mode="mdi" ${style.icon_type === "emoji" ? "hidden" : ""}>${this._field(`${stylePath}.icon`, "Ikona MDI", style.icon || node.icon, "mdi:home", disabled, true)}</div><div data-settings-icon-mode="emoji" ${style.icon_type === "emoji" ? "" : "hidden"}>${this._field(`${stylePath}.emoji`, "Wklej emoji", style.emoji || "⚡", "Np. 🏠 🔋 ☀️ ⚡", disabled, true)}</div>${this._numberField(`${stylePath}.icon_size`, "Rozmiar ikony / emoji", style.icon_size || 32, 10, 120, 1, disabled, true)}</div>
        <div class="widget-subsection"><b>ROZMIARY TEKSTU</b><small>Każdy rodzaj tekstu w dymku ma własny rozmiar.</small></div>
        <div class="two-grid">${this._numberField(`${stylePath}.name_size`, "Nazwa (px)", style.name_size || 9, 6, 32, 1, disabled, true)}${this._numberField(`${stylePath}.value_size`, "Wartość (px)", style.value_size || 18, 8, 56, 1, disabled, true)}${this._numberField(`${stylePath}.unit_size`, "Jednostka (px)", style.unit_size || 7, 5, 28, 1, disabled, true)}${this._numberField(`${stylePath}.status_size`, "Opis / status (px)", style.status_size || 7, 5, 28, 1, disabled, true)}</div>
        <div class="widget-checks four-checks"><label class="check-row"><input type="checkbox" data-path="${stylePath}.name_bold" data-live-rerender="1" ${style.name_bold !== false ? "checked" : ""} ${disabled}><span><b>Pogrub nazwę</b></span></label><label class="check-row"><input type="checkbox" data-path="${stylePath}.value_bold" data-live-rerender="1" ${style.value_bold !== false ? "checked" : ""} ${disabled}><span><b>Pogrub wartość</b></span></label><label class="check-row"><input type="checkbox" data-path="${stylePath}.unit_bold" data-live-rerender="1" ${style.unit_bold ? "checked" : ""} ${disabled}><span><b>Pogrub jednostkę</b></span></label><label class="check-row"><input type="checkbox" data-path="${stylePath}.status_bold" data-live-rerender="1" ${style.status_bold ? "checked" : ""} ${disabled}><span><b>Pogrub opis/status</b></span></label></div>
        <div class="two-grid">${this._colorField(`${stylePath}.border_color`, "Kolor ramki", style.border_color || this._flowBaseColor(node.key), disabled)}${this._colorField(`${stylePath}.background_color`, "Kolor tła", style.background_color || "#020c18", disabled)}${this._colorField(`${stylePath}.icon_color`, "Kolor ikony", style.icon_color || this._flowBaseColor(node.key), disabled)}${this._colorField(`${stylePath}.name_color`, "Kolor nazwy", style.name_color || "#eefaff", disabled)}${this._colorField(`${stylePath}.value_color`, "Kolor wartości", style.value_color || this._flowBaseColor(node.key), disabled)}${this._colorField(`${stylePath}.unit_color`, "Kolor jednostki", style.unit_color || "#94b5c0", disabled)}${this._numberField(`${stylePath}.border_width`, "Grubość ramki", style.border_width || 1, 1, 8, 1, disabled, true)}${this._numberField(`${stylePath}.border_radius`, "Zaokrąglenie", style.border_radius ?? 18, 0, 100, 1, disabled, true)}</div>`;
    } else if (connection) {
      const config = model.scene.connections[connection.key] ||= { ...connection };
      const path = `${context.path}.flow_scene.connections.${connection.key}`;
      body = `<div class="widget-subsection"><b>REGUŁY KIERUNKU I KOLORÓW</b><small>A→B, B→A, postój i brak danych mają osobne style.</small></div>
        <label class="check-row"><input type="checkbox" data-path="${path}.visible" data-live-rerender="1" ${config.visible !== false ? "checked" : ""} ${disabled}><span><b>Linia widoczna</b></span></label>
        ${this._field(`${path}.label`, "Opis linii", config.label || connection.label, "Np. SIEĆ → DOM", disabled, true)}
        <div class="two-grid">${this._selectField(`${path}.route`, "Przebieg", config.route || "auto", [["auto","Automatycznie omijaj dymki"],["curve","Łuk omijający dymki"],["direct","Prosta, jeśli jest wolne miejsce"],["orthogonal","Kąty proste"]], disabled, true)}${this._selectField(`${path}.direction_source`, "Źródło kierunku", config.direction_source || "automatic", [["automatic","Automatyczny bilans"],["entity","Wybrana encja"]], disabled, true)}${this._selectField(`${path}.positive_direction`, "Wartość dodatnia oznacza", config.positive_direction || "forward", [["forward","A → B"],["reverse","B → A"]], disabled, true)}${this._numberField(`${path}.deadband`, "Strefa postoju", config.deadband ?? 1, 0, 1000000, .1, disabled, true)}</div>
        <div>${this._entityField(`${path}.entity_id`, "Encja kierunku", config.entity_id, "Opcjonalna encja ze znakiem.", disabled, "any")}</div>
        <div class="two-grid">${this._field(`${path}.attribute`, "Atrybut", config.attribute, "Opcjonalnie", disabled)}${this._numberField(`${path}.multiplier`, "Mnożnik", config.multiplier ?? 1, -1000000, 1000000, .001, disabled, true)}</div>
        <div class="two-grid">${this._colorField(`${path}.forward_color`, "Kolor A → B", config.forward_color || "#52ff62", disabled)}${this._colorField(`${path}.reverse_color`, "Kolor B → A", config.reverse_color || "#b95cff", disabled)}${this._colorField(`${path}.idle_color`, "Kolor postoju", config.idle_color || "#49616b", disabled)}${this._colorField(`${path}.unavailable_color`, "Kolor braku danych", config.unavailable_color || "#ff4d6d", disabled)}${this._numberField(`${path}.thickness`, "Grubość", config.thickness || 4, 1, 14, 1, disabled, true)}${this._numberField(`${path}.animation_speed`, "Czas animacji (s)", config.animation_speed || 1.2, .2, 8, .1, disabled, true)}</div>
        <div class="two-grid"><label class="check-row"><input type="checkbox" data-path="${path}.label_visible" data-live-rerender="1" ${config.label_visible !== false ? "checked" : ""} ${disabled}><span><b>Pokaż opis linii</b></span></label><label class="check-row"><input type="checkbox" data-path="${path}.label_bold" data-live-rerender="1" ${config.label_bold ? "checked" : ""} ${disabled}><span><b>Pogrub opis linii</b></span></label>${this._numberField(`${path}.label_x`, "Przesunięcie opisu X", config.label_x || 0, -400, 400, 1, disabled, true)}${this._numberField(`${path}.label_y`, "Przesunięcie opisu Y", config.label_y || 0, -400, 400, 1, disabled, true)}${this._colorField(`${path}.label_color`, "Kolor tekstu opisu", config.label_color || "#eefaff", disabled)}${this._colorField(`${path}.label_background`, "Tło opisu", config.label_background || "#010912", disabled)}${this._colorField(`${path}.label_border_color`, "Ramka opisu", config.label_border_color || "#20eaff", disabled)}${this._numberField(`${path}.label_size`, "Rozmiar tekstu", config.label_size || 9, 6, 24, 1, disabled, true)}</div>`;
    }
    if (node) {
      const fields = Array.isArray(style.extra_fields) ? style.extra_fields : [];
      body += `<div class="widget-subsection"><b>DODATKOWE POLA W DYMKU</b><small>Do 8 dowolnych encji lub atrybutów.</small></div><div class="layout-extra-fields">${fields.map((field, index) => `<article class="layout-extra-field"><div class="widget-related-head"><b>POLE ${index + 1}</b><button class="danger-link" data-action="remove-settings-extra-field" data-index="${index}"><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div>${this._field(`${stylePath}.extra_fields.${index}.name`, "Nazwa", field.name, `Pole ${index + 1}`, disabled)}<div>${this._entityField(`${stylePath}.extra_fields.${index}.entity_id`, "Encja", field.entity_id, "Dowolna encja HA.", disabled, "any")}</div><div class="two-grid">${this._field(`${stylePath}.extra_fields.${index}.attribute`, "Atrybut", field.attribute, "Opcjonalnie", disabled)}${this._field(`${stylePath}.extra_fields.${index}.unit`, "Jednostka", field.unit, "Z encji", disabled)}${this._numberField(`${stylePath}.extra_fields.${index}.decimals`, "Precyzja", field.decimals ?? 1, 0, 6, 1, disabled)}${this._numberField(`${stylePath}.extra_fields.${index}.multiplier`, "Mnożnik", field.multiplier ?? 1, -1000000, 1000000, .001, disabled)}${this._colorField(`${stylePath}.extra_fields.${index}.color`, "Kolor", field.color || "#8eb5c3", disabled)}${this._numberField(`${stylePath}.extra_fields.${index}.label_size`, "Nazwa (px)", field.label_size || 6, 5, 24, 1, disabled, true)}${this._numberField(`${stylePath}.extra_fields.${index}.value_size`, "Wartość (px)", field.value_size || 9, 6, 36, 1, disabled, true)}${this._numberField(`${stylePath}.extra_fields.${index}.unit_size`, "Jednostka (px)", field.unit_size || 6, 5, 24, 1, disabled, true)}</div><div class="widget-checks three-checks"><label class="check-row"><input type="checkbox" data-path="${stylePath}.extra_fields.${index}.label_bold" data-live-rerender="1" ${field.label_bold ? "checked" : ""} ${disabled}><span><b>Pogrub nazwę</b></span></label><label class="check-row"><input type="checkbox" data-path="${stylePath}.extra_fields.${index}.value_bold" data-live-rerender="1" ${field.value_bold !== false ? "checked" : ""} ${disabled}><span><b>Pogrub wartość</b></span></label><label class="check-row"><input type="checkbox" data-path="${stylePath}.extra_fields.${index}.unit_bold" data-live-rerender="1" ${field.unit_bold ? "checked" : ""} ${disabled}><span><b>Pogrub jednostkę</b></span></label></div></article>`).join("") || `<div class="mini-empty">Brak dodatkowych pól.</div>`}<button class="secondary-btn" data-action="add-settings-extra-field" ${fields.length >= 8 ? "disabled" : ""}><ha-icon icon="mdi:plus"></ha-icon>DODAJ POLE (${fields.length}/8)</button></div>`;
    }
    const interaction = `<div class="widget-subsection"><b>INTERAKCJA</b></div>${this._selectField(`${stylePath}.tap_action`, "Akcja dotknięcia", style.tap_action || "none", [["none","Brak"],["more_info","Szczegóły encji"],["toggle","Przełącz"],["navigate","Nawigacja"],["service","Usługa HA"]], disabled, true)}<div>${this._entityField(`${stylePath}.action_entity_id`, "Encja akcji", style.action_entity_id, "Encja szczegółów, toggle lub usługi.", disabled, "any")}</div>${this._field(`${stylePath}.navigation_path`, "Ścieżka", style.navigation_path, "/lovelace/energia", disabled)}${this._field(`${stylePath}.service`, "Usługa", style.service, "light.toggle", disabled)}${this._textarea(`${stylePath}.service_data`, "Dane JSON", style.service_data || "{}", "{}", disabled)}`;
    const tileTools = node ? `<section class="settings-tile-clipboard"><div><b>SCHOWEK KAFELKA</b><small>${tileClipboard ? `Skopiowano: ${this._esc(tileClipboard.source_label || tileClipboard.source_target || "pulpit")} · ${this._esc(tileClipboard.source_key)}` : "Skopiuj kafelek, przełącz pulpit u góry i wklej go do zaznaczonego dymku."}</small></div><div><button class="secondary-btn" data-action="copy-settings-tile" ${disabled}><ha-icon icon="mdi:content-copy"></ha-icon>KOPIUJ</button><button class="secondary-btn" data-action="paste-settings-tile" data-paste-mode="style" ${tileClipboard ? disabled : "disabled"}><ha-icon icon="mdi:content-paste"></ha-icon>WKLEJ WYGLĄD</button><button class="secondary-btn" data-action="paste-settings-tile" data-paste-mode="all" ${tileClipboard ? disabled : "disabled"}><ha-icon icon="mdi:content-duplicate"></ha-icon>WKLEJ Z POZYCJĄ</button></div></section>` : "";
    return `<aside class="settings-inspector"><div class="panel-title"><span>EDYCJA OBIEKTU</span><ha-icon icon="mdi:tune-variant"></ha-icon></div><label class="field"><span>Wybrany obiekt</span><select data-settings-object>${options}</select></label>${tileTools}${body}${interaction}</aside>`;
  }

  _renderKiosk() {
    const kiosk = this._activeKioskProfile();
    const performanceMode = this._tabletPerformanceEnabled(kiosk);
    const overview = this._config.overview || {};
    const builtinIds = new Set(kiosk.builtin_bubble_ids || ["home", "pv", "grid"]);
    const builtin = kiosk.show_builtin_bubbles === false ? [] : [
      { key: "builtin_home", id: "home", html: this._metric("home", "mdi:home-lightning-bolt", "DOM", "cyan") },
      { key: "builtin_pv", id: "pv", html: this._showModule("pv") ? this._metric("pv", "mdi:solar-power", "PRODUKCJA PV", "green") : "" },
      { key: "builtin_grid", id: "grid", html: this._showModule("grid") ? this._metric("grid", "mdi:transmission-tower", "SIEĆ", "purple") : "" },
      { key: "builtin_battery", id: "battery", html: this._showModule("battery") ? this._metric("batterySoc", "mdi:battery-high", "MAGAZYN", "lime", "%") : "" },
      { key: "builtin_ev", id: "ev", html: this._showModule("ev") ? this._metric("ev", "mdi:car-electric", "ŁADOWANIE EV", "cyan") : "" },
      { key: "builtin_price", id: "price", html: this._showModule("prices") ? this._metric("price", "mdi:tag-outline", "CENA ZAKUPU", "orange", this._config.general.currency + "/kWh") : "" },
    ].filter(item => item.html && builtinIds.has(item.id));
    const customItems = this._selectedKioskItems("bubble", kiosk);
    const chartItems = this._selectedKioskItems("chart", kiosk);
    const custom = kiosk.show_custom_bubbles === false ? [] : customItems
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false)
      .sort((a, b) => Number(a.item.order || 0) - Number(b.item.order || 0))
      .map(({ item }) => ({ key: `bubble_${item.id || "custom"}`, html: this._overviewBubble(item, (this._config.overview_bubbles || []).indexOf(item)) }));
    const visibleChartItems = kiosk.show_charts === false ? [] : chartItems
      .filter(item => item.enabled !== false)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    const maxBubbles = Math.max(1, Math.min(16, Number(kiosk.max_bubbles || 6)));
    const chartColumns = Math.max(1, Math.min(4, Number(kiosk.chart_columns || overview.chart_columns || 2)));
    const displayPreset = ["auto", "tablet_16_9", "desktop"].includes(kiosk.display_preset) ? kiosk.display_preset : "tablet_16_9";
    const bubbleLayout = kiosk.bubble_layout === "grid" ? "grid" : "free";
    const metricItems = [...builtin, ...custom].slice(0, maxBubbles);
    const metrics = metricItems.map((item, index) => this._kioskBubbleSlot(item, index, metricItems.length, kiosk)).join("");
    const bubbleStageHeight = Math.max(76, Math.min(400, Number(kiosk.bubble_stage_height || 96)));
    const summaryPanels = [];
    if (kiosk.show_price_panel !== false) summaryPanels.push(`<article class="panel price-panel"><div class="panel-title"><span>CENY ENERGII</span><ha-icon icon="mdi:cash-clock"></ha-icon></div><div class="price-values"><div><small>ZAKUP</small><strong data-live="price">--</strong><span>${this._esc(this._config.general.currency)}/kWh</span></div><div><small>SPRZEDAŻ</small><strong data-live="priceSell">--</strong><span>${this._esc(this._config.general.currency)}/kWh</span></div></div><div class="spark-wrap"><svg viewBox="0 0 400 130" preserveAspectRatio="none"><path class="gridline" d="M0 25H400 M0 65H400 M0 105H400"></path><path data-spark="price" class="spark purple" d=""></path></svg></div></article>`);
    if (kiosk.show_consumers_panel !== false) summaryPanels.push(`<article class="panel consumers-panel"><div class="panel-title"><span>NAJWIĘKSZE ODBIORNIKI</span><ha-icon icon="mdi:chart-bar"></ha-icon></div><div class="consumer-list" data-consumer-list></div></article>`);
    if (kiosk.show_battery_gauge === true) summaryPanels.push(this._gaugePanel("batterySoc", "MAGAZYN ENERGII", "mdi:battery-charging-high"));
    if (kiosk.show_self_sufficiency_gauge === true) summaryPanels.push(this._gaugePanel("selfSufficiency", "SAMOWYSTARCZALNOŚĆ", "mdi:home-percent"));
    const slides = [];
    if (kiosk.rotate_flow !== false) slides.push({ id: "flow", label: "PRZEPŁYW", render: () => `${metrics ? `<div class="metrics-grid dynamic kiosk-metrics kiosk-bubble-stage layout-${bubbleLayout} bubble-size-${this._escAttr(overview.bubble_size || "medium")}" style="--kiosk-bubble-stage-height:${bubbleStageHeight}px">${metrics}</div>` : ""}<article class="panel kiosk-flow-card">${this._flowDiagram(true, false, kiosk)}</article>` });
    if (kiosk.rotate_charts !== false && visibleChartItems.length) slides.push({ id: "charts", label: "WYKRESY", render: () => `<div class="custom-chart-grid kiosk-chart-grid" style="--chart-columns:${chartColumns}">${visibleChartItems.map(item => this._overviewChart(item, (this._config.overview_charts || []).indexOf(item))).join("")}</div>` });
    (kiosk.lovelace_views || []).filter(item => item.enabled !== false && String(item.path || "").startsWith("/") && !String(item.path).includes("://")).forEach((item, index) => {
      const scale = Math.max(50, Math.min(150, Number(item.scale ?? 100))) / 100;
      const frameStyle = `--kiosk-view-scale:${scale};--kiosk-view-size:${(100 / scale).toFixed(4)}%;--kiosk-view-x:${Math.max(-500, Math.min(500, Number(item.offset_x ?? 0)))}px;--kiosk-view-y:${Math.max(-500, Math.min(500, Number(item.offset_y ?? 0)))}px;--kiosk-view-padding:${Math.max(0, Math.min(80, Number(item.padding ?? 0)))}px;--kiosk-view-radius:${Math.max(0, Math.min(60, Number(item.border_radius ?? 12)))}px;--kiosk-view-bg:${this._safeColor(item.background_color, "#010914")};--kiosk-view-border:${this._safeColor(item.border_color, "#20eaff")}`;
      slides.push({ id: this._flowNodeKey(`lovelace_${item.id || index + 1}`), label: item.name || `LOVELACE ${index + 1}`, render: () => `<article class="panel kiosk-lovelace-slide" style="${frameStyle}"><div class="kiosk-lovelace-viewport"><iframe src="${this._escAttr(item.path)}" title="${this._escAttr(item.name || `Lovelace ${index + 1}`)}" loading="lazy" allow="fullscreen"></iframe></div></article>` });
    });
    if (kiosk.rotate_overview !== false) slides.push({ id: "overview", label: "PODSUMOWANIE", render: () => `${metrics ? `<div class="metrics-grid dynamic kiosk-metrics kiosk-bubble-stage layout-${bubbleLayout} bubble-size-${this._escAttr(overview.bubble_size || "medium")}" style="--kiosk-bubble-stage-height:${bubbleStageHeight}px">${metrics}</div>` : ""}${summaryPanels.length ? `<div class="kiosk-summary-grid" style="--summary-columns:${summaryPanels.length}">${summaryPanels.join("")}</div>` : this._emptyState("mdi:view-dashboard-outline", "Brak paneli podsumowania", "Włącz wybrane panele w konfiguracji profilu kiosk.")}` });
    if (!slides.length) slides.push({ id: "flow", label: "PRZEPŁYW", render: () => `<article class="panel kiosk-flow-card">${this._flowDiagram(true, false, kiosk)}</article>` });
    this._kioskSlide = Math.min(this._kioskSlide, slides.length - 1);
    const slideHtml = slides.map((slide, index) => {
      const active = index === this._kioskSlide;
      const content = !performanceMode || active ? `${this._renderKioskSlideHeader(kiosk, slide, slides, index)}<div class="kiosk-slide-body">${slide.render()}</div>` : "";
      return `<section class="kiosk-slide ${active ? "active" : ""}" data-kiosk-slide="${index}" data-slide-id="${slide.id}">${content}</section>`;
    }).join("");
    return `<section class="kiosk-view display-${this._escAttr(displayPreset)} flow-height-${this._escAttr(kiosk.flow_height || "tall")} ${performanceMode ? "tablet-performance" : ""}" style="--kiosk-bubble-columns:${Math.min(6, maxBubbles)};--kiosk-chart-columns:${chartColumns}"><div class="kiosk-slides">${slideHtml}</div></section>`;
  }

  _renderKioskSlideHeader(kiosk, slide, slides, slideIndex) {
    const definition = this._kioskHeaderDefinitions(kiosk).find(item => item.key === slide.id) || { key: slide.id, label: slide.label, title: slide.label, description: this._config.general?.installation_name || "Energy Center", icon: "mdi:view-dashboard" };
    const config = this._kioskHeaderConfig(kiosk, definition);
    if (config.enabled === false) return "";
    const navigation = slides.length > 1 && config.show_navigation !== false ? `<div class="kiosk-header-navigation"><button data-action="kiosk-prev" title="Poprzedni ekran"><ha-icon icon="mdi:chevron-left"></ha-icon></button><div>${slides.map((item, index) => `<button class="kiosk-tab-button ${index === slideIndex ? "active" : ""}" data-action="kiosk-slide" data-slide-index="${index}" title="${this._escAttr(item.label)}"><span>${this._esc(item.label)}</span></button>`).join("")}</div><button data-action="kiosk-next" title="Następny ekran"><ha-icon icon="mdi:chevron-right"></ha-icon></button></div>` : "";
    const style = `--kiosk-header-height:${Math.max(44, Math.min(180, Number(config.height || 64)))}px;--kiosk-header-bg:${this._safeColor(config.background_color, "#03182d")};--kiosk-header-border:${this._safeColor(config.border_color, "#20eaff")};--kiosk-header-accent:${this._safeColor(config.accent_color, "#20eaff")};--kiosk-header-title:${this._safeColor(config.title_color, "#eefaff")};--kiosk-header-description:${this._safeColor(config.description_color, "#6e98a8")};--kiosk-header-eyebrow-size:${Math.max(6, Math.min(20, Number(config.eyebrow_size || 8)))}px;--kiosk-header-title-size:${Math.max(9, Math.min(42, Number(config.title_size || 18)))}px;--kiosk-header-description-size:${Math.max(6, Math.min(24, Number(config.description_size || 8)))}px;--kiosk-header-clock-size:${Math.max(9, Math.min(40, Number(config.clock_size || 17)))}px;--kiosk-header-eyebrow-weight:${config.eyebrow_bold === false ? 400 : 700};--kiosk-header-title-weight:${config.title_bold === false ? 400 : 700};--kiosk-header-description-weight:${config.description_bold ? 700 : 400};--kiosk-header-clock-weight:${config.clock_bold === false ? 400 : 700}`;
    return `<header class="kiosk-header kiosk-slide-header" style="${style}"><div class="kiosk-header-identity">${config.show_icon ? `<ha-icon icon="${this._escAttr(config.icon || definition.icon)}"></ha-icon>` : ""}<div>${config.eyebrow ? `<span class="eyebrow">${this._esc(config.eyebrow)}</span>` : ""}${config.title ? `<h1>${this._esc(config.title)}</h1>` : ""}${config.description ? `<small>${this._esc(config.description)}</small>` : ""}</div></div>${navigation}<div class="kiosk-header-tools">${config.show_clock === false ? "" : `<div class="kiosk-clock"><b data-kiosk-clock>--:--:--</b><span data-kiosk-date>--</span></div>`}</div></header>`;
  }

  _kioskBubbleSlot(item, index, count, kiosk) {
    const key = String(item.key || `bubble_${index + 1}`).replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
    const columns = Math.max(1, Math.min(6, count));
    const fallbackWidth = Math.max(8, (100 / columns) - 0.7);
    const fallbackX = (index % columns) * (100 / columns);
    const fallbackY = Math.floor(index / columns) * 88;
    const stored = kiosk.bubble_positions?.[key] || {};
    const width = Math.max(8, Math.min(60, Number(stored.width ?? fallbackWidth)));
    const x = Math.max(0, Math.min(100 - width, Number(stored.x ?? fallbackX)));
    const y = Math.max(0, Math.min(720, Number(stored.y ?? fallbackY)));
    return `<div class="kiosk-bubble-slot" data-kiosk-item="${this._escAttr(key)}" style="--kiosk-x:${x}%;--kiosk-y:${y}px;--kiosk-w:${width}%">${item.html}<span class="layout-drag-handle bubble-layout-handle" data-layout-drag="bubble"><ha-icon icon="mdi:cursor-move"></ha-icon></span><span class="layout-resize-handle" data-layout-resize="bubble"><ha-icon icon="mdi:resize-bottom-right"></ha-icon></span></div>`;
  }

  _activeKioskProfile() {
    if (this._kioskProfileId && this._kioskProfileId !== "1") {
      const profile = (this._config.kiosk_profiles || []).find(item => item.id === this._kioskProfileId && item.enabled !== false);
      if (profile) return profile;
    }
    return this._config.kiosk || {};
  }

  _notificationProfileId() {
    return this._kioskProfileId && this._kioskProfileId !== "1"
      ? this._kioskProfileId
      : "default";
  }

  _notificationEnabled() {
    return this._view === "kiosk" && this._activeKioskProfile()?.show_notification_center !== false;
  }

  _loadNotificationSeen() {
    const profile = this._notificationProfileId();
    if (this._notificationSeenProfile === profile) return;
    this._notificationSeenProfile = profile;
    this._notificationSeen = new Set();
    try {
      const saved = JSON.parse(sessionStorage.getItem(`matrix_energy_center_notification_seen_${profile}`) || "[]");
      if (Array.isArray(saved)) saved.slice(-100).forEach(value => this._notificationSeen.add(String(value)));
    } catch (_) { /* Session storage is optional in embedded browsers. */ }
  }

  _notificationKey(item) {
    return Number(item?.sequence || 0) > 0
      ? `event:${item.sequence}`
      : `active:${item?.id || "unknown"}:${item?.last_sent_at || item?.created_at || ""}`;
  }

  _notificationInstanceKey(item) {
    return `${item?.id || "unknown"}:${item?.last_sent_at || item?.created_at || ""}`;
  }

  _notificationWasHandled(item) {
    return this._notificationHandled.has(this._notificationInstanceKey(item));
  }

  _rememberHandledNotification(item) {
    this._notificationHandled.add(this._notificationInstanceKey(item));
    if (this._notificationHandled.size > 100) {
      this._notificationHandled.delete(this._notificationHandled.values().next().value);
    }
  }

  _markNotificationSeen(item) {
    this._loadNotificationSeen();
    this._notificationSeen.add(this._notificationKey(item));
    try {
      sessionStorage.setItem(
        `matrix_energy_center_notification_seen_${this._notificationProfileId()}`,
        JSON.stringify([...this._notificationSeen].slice(-100)),
      );
    } catch (_) { /* Session storage is optional in embedded browsers. */ }
  }

  _notificationRank(item) {
    return { informacja: 0, zadanie: 1, ostrzezenie: 2, krytyczne: 3 }[item?.level] ?? 0;
  }

  async _connectNotificationCenter() {
    if (!this._notificationEnabled() || !this._hass) return;
    this._loadNotificationSeen();
    if (!this._notificationUnsub && !this._notificationSubscribePending) {
      this._notificationSubscribePending = true;
      try {
        const unsubscribe = await this._hass.connection.subscribeEvents(
          () => this._loadNotificationCenter(false),
          "matrix_notification_center_updated",
        );
        if (this._notificationEnabled()) this._notificationUnsub = unsubscribe;
        else if (typeof unsubscribe === "function") unsubscribe();
      } catch (_) {
        this._notificationUnsub = null;
      } finally {
        this._notificationSubscribePending = false;
      }
    }
    await this._loadNotificationCenter(true);
  }

  _disconnectNotificationCenter() {
    if (typeof this._notificationUnsub === "function") {
      try { this._notificationUnsub(); } catch (_) { /* Listener may already be gone. */ }
    }
    this._notificationUnsub = null;
    clearTimeout(this._notificationTimer);
    this._notificationTimer = null;
    if (!this._notificationEnabled()) {
      this._notificationCurrent = null;
      this._notificationDrawerOpen = false;
    }
  }

  async _loadNotificationCenter(initial = false) {
    if (!this._notificationEnabled() || !this._hass) return;
    if (this._notificationLoading) {
      this._notificationReloadPending = true;
      return;
    }
    this._notificationLoading = true;
    try {
      const profile = encodeURIComponent(this._notificationProfileId());
      const snapshot = await this._hass.callApi("GET", `matrix_notification_center/kiosk?profile=${profile}`);
      const active = (Array.isArray(snapshot?.active) ? snapshot.active : [])
        .filter(item => !this._notificationWasHandled(item));
      const activeIds = new Set(active.map(item => item.id));
      const events = (Array.isArray(snapshot?.events) ? snapshot.events : []).map(item => ({
        ...item,
        active: activeIds.has(item.id),
        actions: activeIds.has(item.id) ? item.actions : { ack: false, snooze: false, dismiss: false },
      }));
      this._notificationCenter = { ...snapshot, active, events };
      this._notificationAvailable = true;

      let current = this._notificationCurrent;
      if (current?.active) {
        const updated = active.find(item => item.id === current.id);
        current = updated ? { ...current, ...updated } : null;
      }
      const blocking = active
        .filter(item => item.level === "krytyczne")
        .sort((a, b) => String(b.last_sent_at || "").localeCompare(String(a.last_sent_at || "")))[0];
      const unseen = events
        .filter(item => Number(item.sequence || 0) > 0 && !this._notificationWasHandled(item) && !this._notificationSeen.has(this._notificationKey(item)))
        .sort((a, b) => this._notificationRank(b) - this._notificationRank(a) || Number(b.sequence || 0) - Number(a.sequence || 0));
      const candidate = blocking || unseen[0] || null;
      if (candidate && (!current || blocking || this._notificationRank(candidate) >= this._notificationRank(current))) {
        current = candidate;
        this._markNotificationSeen(candidate);
      }
      this._notificationCurrent = current;
      this._syncNotificationTimer();
      this._patchKioskNotificationLayer();
      this._startKioskRotation();
    } catch (_) {
      this._notificationAvailable = false;
      this._notificationCenter = { enabled: false, active: [], events: [], sequence: 0 };
      if (!initial) this._patchKioskNotificationLayer();
    } finally {
      this._notificationLoading = false;
      if (this._notificationReloadPending) {
        this._notificationReloadPending = false;
        setTimeout(() => this._loadNotificationCenter(false), 0);
      }
    }
  }

  _syncNotificationTimer() {
    clearTimeout(this._notificationTimer);
    this._notificationTimer = null;
    const item = this._notificationCurrent;
    const duration = Math.max(0, Number(item?.duration_seconds || 0));
    if (!item || !duration || item.level === "krytyczne" || item.require_confirmation) return;
    this._notificationTimer = setTimeout(() => {
      this._notificationCurrent = null;
      this._patchKioskNotificationLayer();
      this._startKioskRotation();
    }, duration * 1000);
  }

  _notificationBlocksRotation() {
    return Boolean(
      this._notificationCurrent
      && (this._notificationCurrent.level === "krytyczne" || this._notificationCurrent.mode === "fullscreen")
    );
  }

  _notificationIcon(level) {
    return {
      informacja: "mdi:information-outline",
      zadanie: "mdi:clipboard-check-outline",
      ostrzezenie: "mdi:alert-outline",
      krytyczne: "mdi:alarm-light-outline",
    }[level] || "mdi:bell-outline";
  }

  _notificationTime(item) {
    const value = item?.last_sent_at || item?.created_at;
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  }

  _renderKioskNotificationLayer() {
    const center = this._notificationCenter || { active: [], events: [] };
    const active = Array.isArray(center.active) ? center.active : [];
    const events = Array.isArray(center.events) ? center.events : [];
    const current = this._notificationCurrent;
    const activeIds = new Set(active.map(item => item.id));
    const history = [...active, ...events.filter(item => !activeIds.has(item.id))].slice(0, 12);
    const bell = this._notificationAvailable ? `<button class="kiosk-notification-bell ${active.length ? "has-items" : ""}" data-nc-bell title="Centrum powiadomień"><ha-icon icon="mdi:bell-outline"></ha-icon>${active.length ? `<b>${active.length}</b>` : ""}</button>` : "";
    const drawer = this._notificationDrawerOpen ? `<aside class="kiosk-notification-drawer"><header><div><small>MATRIX BRIDGE</small><b>POWIADOMIENIA</b></div><button data-nc-drawer-close><ha-icon icon="mdi:close"></ha-icon></button></header><div>${history.length ? history.map((item, index) => `<button class="kiosk-notification-row level-${this._escAttr(item.level)}" data-nc-open="${index}"><ha-icon icon="${this._notificationIcon(item.level)}"></ha-icon><span><b>${this._esc(item.title)}</b><small>${this._esc(item.category || item.level)} · ${this._esc(this._notificationTime(item))}</small></span>${item.active ? `<i></i>` : ""}</button>`).join("") : `<div class="kiosk-notification-empty"><ha-icon icon="mdi:bell-sleep-outline"></ha-icon><b>Brak aktywnych komunikatów</b></div>`}</div></aside>` : "";
    let overlay = "";
    if (current) {
      const actions = current.actions || {};
      const blocking = current.level === "krytyczne" || current.require_confirmation;
      const disabled = current._pending ? "disabled" : "";
      overlay = `<div class="kiosk-notification-overlay mode-${this._escAttr(current.mode || "banner")} level-${this._escAttr(current.level)}"><article><div class="kiosk-notification-symbol"><ha-icon icon="${this._notificationIcon(current.level)}"></ha-icon></div><div class="kiosk-notification-copy"><small>${this._esc(current.category || current.level)}</small><h2>${this._esc(current.title)}</h2><p>${this._esc(current.message)}</p>${current._error ? `<em>${this._esc(current._error)}</em>` : ""}</div><div class="kiosk-notification-actions">${actions.ack ? `<button class="primary" data-nc-action="ack" ${disabled}>POTWIERDŹ</button>` : ""}${actions.snooze ? `<button data-nc-action="snooze" ${disabled}>ODŁÓŻ 2H</button>` : ""}${actions.dismiss ? `<button data-nc-action="dismiss" ${disabled}>ZAMKNIJ</button>` : ""}${!blocking && !actions.dismiss ? `<button data-nc-close ${disabled}>OK</button>` : ""}</div>${!blocking ? `<button class="kiosk-notification-x" data-nc-close title="Ukryj" ${disabled}><ha-icon icon="mdi:close"></ha-icon></button>` : ""}</article></div>`;
    }
    return `<section class="kiosk-notification-layer" data-kiosk-notification-layer>${bell}${drawer}${overlay}</section>`;
  }

  _patchKioskNotificationLayer() {
    const layer = this.shadowRoot?.querySelector?.("[data-kiosk-notification-layer]");
    if (!layer || this._view !== "kiosk") return;
    layer.outerHTML = this._renderKioskNotificationLayer();
    this._bindKioskNotificationEvents();
  }

  _bindKioskNotificationEvents() {
    const root = this.shadowRoot;
    root?.querySelector("[data-nc-bell]")?.addEventListener("click", () => {
      this._notificationDrawerOpen = !this._notificationDrawerOpen;
      this._patchKioskNotificationLayer();
    });
    root?.querySelector("[data-nc-drawer-close]")?.addEventListener("click", () => {
      this._notificationDrawerOpen = false;
      this._patchKioskNotificationLayer();
    });
    root?.querySelectorAll("[data-nc-open]").forEach(button => button.addEventListener("click", () => {
      const active = this._notificationCenter?.active || [];
      const activeIds = new Set(active.map(item => item.id));
      const history = [...active, ...(this._notificationCenter?.events || []).filter(item => !activeIds.has(item.id))].slice(0, 12);
      const item = history[Number(button.dataset.ncOpen)];
      if (!item) return;
      this._notificationCurrent = item;
      this._notificationDrawerOpen = false;
      this._markNotificationSeen(item);
      this._syncNotificationTimer();
      this._patchKioskNotificationLayer();
      this._startKioskRotation();
    }));
    root?.querySelectorAll("[data-nc-close]").forEach(button => button.addEventListener("click", () => {
      this._notificationCurrent = null;
      clearTimeout(this._notificationTimer);
      this._patchKioskNotificationLayer();
      this._startKioskRotation();
    }));
    root?.querySelectorAll("[data-nc-action]").forEach(button => button.addEventListener("click", async () => {
      await this._runNotificationAction(button.dataset.ncAction);
    }));
  }

  async _runNotificationAction(action) {
    const item = this._notificationCurrent;
    if (!item?.id || this._notificationActionPending || !["ack", "snooze", "dismiss"].includes(action)) return;
    this._notificationActionPending = true;
    this._notificationCurrent = { ...item, _pending: true, _error: "" };
    this._patchKioskNotificationLayer();
    try {
      const body = action === "snooze" ? { minutes: 120 } : {};
      await this._hass.callApi("POST", `matrix_notification_center/active/${encodeURIComponent(item.id)}/${action}`, body);
      this._rememberHandledNotification(item);
      const instanceKey = this._notificationInstanceKey(item);
      const center = this._notificationCenter || { active: [], events: [] };
      this._notificationCenter = {
        ...center,
        active: (center.active || []).filter(candidate => this._notificationInstanceKey(candidate) !== instanceKey),
        events: (center.events || []).map(candidate => this._notificationInstanceKey(candidate) === instanceKey
          ? { ...candidate, active: false, actions: { ack: false, snooze: false, dismiss: false } }
          : candidate),
      };
      this._notificationCurrent = null;
      clearTimeout(this._notificationTimer);
      this._notificationTimer = null;
      this._patchKioskNotificationLayer();
      this._startKioskRotation();
      await this._loadNotificationCenter(false);
    } catch (error) {
      this._notificationCurrent = { ...item, _pending: false, _error: error?.message || "Nie udało się wykonać akcji" };
      this._patchKioskNotificationLayer();
    } finally {
      this._notificationActionPending = false;
    }
  }

  _selectedKioskItems(kind, profile) {
    const items = kind === "bubble" ? this._config.overview_bubbles || [] : this._config.overview_charts || [];
    const selection = profile[`${kind}_selection`] || "all";
    const ids = new Set(profile[`${kind}_ids`] || []);
    return selection === "selected" ? items.filter(item => ids.has(item.id)) : items;
  }

  _renderFlows() {
    const f = this._config.features || {};
    const cards = [
      this._showModule("grid") ? this._detailCard("gridImport", "Import z sieci", "mdi:transmission-tower-import", "purple") : "",
      this._showModule("grid") ? this._detailCard("gridExport", "Eksport do sieci", "mdi:transmission-tower-export", "orange") : "",
      this._showModule("battery") ? this._detailCard("batteryCharge", "Ładowanie magazynu", "mdi:battery-arrow-up", "green") : "",
      this._showModule("battery") ? this._detailCard("batteryDischarge", "Rozładowanie magazynu", "mdi:battery-arrow-down", "lime") : "",
      (this._showModule("grid") || this._showModule("pv")) ? this._detailCard("selfSufficiency", "Samowystarczalność", "mdi:home-percent", "cyan", "%") : "",
      this._showModule("pv") ? this._detailCard("selfConsumption", "Autokonsumpcja PV", "mdi:solar-power-variant", "green", "%") : "",
    ].filter(Boolean).join("");
    return `
      <section class="hero-row"><div><span class="eyebrow">PRZEPŁYWY ENERGII</span><h1>Bilans na żywo</h1><p>Węzły i połączenia są wyświetlane tylko dla aktywnych modułów.</p></div></section>
      <article class="panel large-flow">${this._flowDiagram(true, false, this._config.flow || {})}</article>
      <section class="flow-details dynamic">${cards}</section>`;
  }

  _renderConfiguration() {
    if (!this._isAdmin() && !this._config.permissions.show_configuration_to_non_admin) {
      return `<div class="locked"><ha-icon icon="mdi:shield-lock-outline"></ha-icon><h2>Konfiguracja tylko dla administratora</h2><p>Backend blokuje zapis również przy ręcznej próbie wywołania polecenia.</p></div>`;
    }
    const disabled = this._isAdmin() ? "" : "disabled";
    const f = this._config.features || {};
    const appearance = this._config.appearance || {};
    const flow = this._config.flow || {};
    const featureDescriptions = {
      grid: "Sieć, import, eksport, napięcie i parametry przyłącza.",
      pv: "Falownik, produkcja, prognozy, stringi i sekcje paneli.",
      battery: "SOC, moc, energia, BMS i parametry magazynu.",
      ev: "Samochód, ładowarka, sesja, SOC i sterowanie.",
      prices: "TAURON G13, ceny dynamiczne, sprzedaż i koszty.",
      appliances: "Pralki, zmywarki, piekarniki i dowolne odbiorniki.",
      automation: "Przyszłe reguły optymalizacji i sterowania.",
    };
    const mappingGroups = ROLE_GROUPS.map(([group, title, icon]) => {
      if (group !== "home" && !f[group]) return "";
      const roles = ROLE_DEFS.filter(role => role[3] === group);
      return `<article class="panel mapping-group">
        <div class="panel-title"><span>${title}</span><ha-icon icon="${icon}"></ha-icon></div>
        <div class="mapping-grid">${roles.map(([key, label, description, , filter]) => this._entityField(`mappings.${key}`, label, this._config.mappings[key], description, disabled, filter)).join("")}</div>
      </article>`;
    }).join("");

    return `
      <section class="hero-row"><div><span class="eyebrow">PEŁNA KONFIGURACJA</span><h1>Instalacja, moduły i encje</h1><p>Każda zmiana modułu natychmiast przebudowuje przegląd. Zapis utrwala konfigurację w Home Assistant.</p></div>${this._saveBar(disabled)}</section>
      <section class="config-layout config-top">
        <article class="panel config-card">
          <div class="panel-title"><span>DANE INSTALACJI</span><ha-icon icon="mdi:home-edit-outline"></ha-icon></div>
          ${this._field("general.installation_name", "Nazwa instalacji", this._config.general.installation_name, "Np. Dom, Firma, Garaż", disabled)}
          ${this._field("general.panel_title", "Nazwa w pasku bocznym", this._config.general.panel_title, "Energy Center", disabled)}
          <div class="two-grid">
            ${this._field("general.currency", "Waluta", this._config.general.currency, "PLN", disabled)}
            ${this._selectField("general.language", "Język panelu", this._config.general.language, [["auto","Automatyczny"],["pl","Polski"],["en","English"]], disabled)}
          </div>
          <div class="signal-box"><ha-icon icon="mdi:database-check-outline"></ha-icon><div><b>Konfiguracja lokalna</b><small>Dane pozostają w pliku pamięci integracji Home Assistant.</small></div></div>
        </article>
        <article class="panel config-card modules-card">
          <div class="panel-title"><span>AKTYWNE MODUŁY</span><ha-icon icon="mdi:view-module-outline"></ha-icon></div>
          <div class="feature-grid">${FEATURE_DEFS.map(([key, label]) => `<label class="feature ${f[key] ? "active" : ""}"><input type="checkbox" data-path="features.${key}" data-live-rerender="1" ${f[key] ? "checked" : ""} ${disabled}><ha-icon icon="${this._featureIcon(key)}"></ha-icon><span><b>${label}</b><small>${featureDescriptions[key]}</small></span></label>`).join("")}</div>
        </article>
      </section>

      <section class="config-layout">
        <article class="panel config-card">
          <div class="panel-title"><span>WYGLĄD I ZACHOWANIE</span><ha-icon icon="mdi:palette-outline"></ha-icon></div>
          <label class="check-row"><input type="checkbox" data-path="appearance.show_grid_background" data-live-rerender="1" ${appearance.show_grid_background !== false ? "checked" : ""} ${disabled}><span><b>Techniczna siatka tła</b><small>Matrixowa siatka i delikatne cyfry w tle.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="appearance.enable_animations" data-live-rerender="1" ${appearance.enable_animations !== false ? "checked" : ""} ${disabled}><span><b>Animowane przepływy</b><small>Ruchome impulsy na przewodach oraz poświaty.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="appearance.compact_header" data-live-rerender="1" ${appearance.compact_header ? "checked" : ""} ${disabled}><span><b>Kompaktowy nagłówek</b><small>Mniej miejsca zajętego przez górny pasek.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="appearance.show_status_bar" data-live-rerender="1" ${appearance.show_status_bar !== false ? "checked" : ""} ${disabled}><span><b>Dolny pasek statusu</b><small>Rewizja, liczba encji, urządzeń i komunikaty zapisu.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="appearance.show_unconfigured_cards" data-live-rerender="1" ${appearance.show_unconfigured_cards ? "checked" : ""} ${disabled}><span><b>Pokaż puste moduły</b><small>Wyświetlaj karty także wtedy, gdy nie mają jeszcze encji.</small></span></label>
          ${this._selectField("appearance.flow_density", "Rozmiar diagramu", appearance.flow_density || "comfortable", [["compact","Kompaktowy"],["comfortable","Standardowy"],["spacious","Przestronny"]], disabled, true)}
        </article>
        <article class="panel config-card">
          <div class="panel-title"><span>UPRAWNIENIA I KIERUNKI</span><ha-icon icon="mdi:shield-account-outline"></ha-icon></div>
          ${f.grid ? `<label class="check-row"><input type="checkbox" data-path="signs.grid_positive_is_import" ${this._config.signs.grid_positive_is_import ? "checked" : ""} ${disabled}><span><b>Dodatnia moc sieci oznacza import</b><small>Wyłącz, gdy dodatnia wartość dwukierunkowego sensora oznacza eksport.</small></span></label>` : ""}
          ${f.battery ? `<label class="check-row"><input type="checkbox" data-path="signs.battery_positive_is_charge" ${this._config.signs.battery_positive_is_charge ? "checked" : ""} ${disabled}><span><b>Dodatnia moc baterii oznacza ładowanie</b><small>Wyłącz, gdy dodatnia wartość oznacza rozładowanie.</small></span></label>` : ""}
          <label class="check-row"><input type="checkbox" data-path="permissions.show_configuration_to_non_admin" ${this._config.permissions.show_configuration_to_non_admin ? "checked" : ""} ${disabled}><span><b>Pokaż konfigurację zwykłym użytkownikom</b><small>Tryb tylko do odczytu; zapis nadal wymaga administratora.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="permissions.allow_non_admin_control" ${this._config.permissions.allow_non_admin_control ? "checked" : ""} ${disabled}><span><b>Zezwól na sterowanie urządzeniami</b><small>Dotyczy wyłącznie przypisanych encji sterujących odbiorników.</small></span></label>
        </article>
      </section>

      <section class="flow-config-section">
        <article class="panel config-card flow-config-editor">
          <div class="panel-title"><span>KONFIGURACJA OKNA PRZEPŁYWÓW</span><ha-icon icon="mdi:transit-connection-variant"></ha-icon></div>
          <p class="hint">Ustaw, które gałęzie mają być widoczne w głównym diagramie. Stringi PV trafiają nad węzeł PV, źródła dodatkowe do górnej magistrali, a odbiorniki pod węzeł domu.</p>
          <div class="four-grid">
            ${this._field("flow.title", "Tytuł diagramu", flow.title || "PRZEPŁYW ENERGII — NA ŻYWO", "Przepływ energii", disabled)}
            ${this._selectField("flow.layout", "Układ", flow.layout || "automatic", [["automatic","Automatyczny"],["compact","Kompaktowy"],["wide","Szeroki"]], disabled, true)}
            ${this._selectField("flow.node_style", "Styl węzłów", flow.node_style || "rounded", [["rounded","Zaokrąglony"],["technical","Techniczny"],["soft","Miękki"]], disabled, true)}
            ${this._selectField("flow.animation_speed", "Szybkość animacji", flow.animation_speed || "normal", [["slow","Wolna"],["normal","Normalna"],["fast","Szybka"]], disabled, true)}
            ${this._numberField("flow.max_pv_strings", "Maks. stringów PV", flow.max_pv_strings ?? 6, 0, 16, 1, disabled, true)}
            ${this._numberField("flow.max_devices", "Maks. dodatkowych urządzeń", flow.max_devices ?? 6, 0, 24, 1, disabled, true)}
            ${this._numberField("flow.branch_gap", "Odstęp gałęzi [px]", flow.branch_gap ?? 12, 4, 40, 1, disabled, true)}
            ${this._selectField("appearance.flow_density", "Wielkość całego diagramu", appearance.flow_density || "comfortable", [["compact","Mały"],["comfortable","Standardowy"],["spacious","Duży"]], disabled, true)}
          </div>
          <div class="four-grid checks flow-checks">
            <label class="check-row"><input type="checkbox" data-path="flow.show_pv_strings" data-live-rerender="1" ${flow.show_pv_strings !== false ? "checked" : ""} ${disabled}><span><b>Stringi PV</b><small>Pokaż osobne MPPT/stringi nad głównym PV.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="flow.show_devices" data-live-rerender="1" ${flow.show_devices !== false ? "checked" : ""} ${disabled}><span><b>Dodatkowe urządzenia</b><small>Pokaż zaznaczone źródła i odbiorniki.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="flow.show_labels" data-live-rerender="1" ${flow.show_labels !== false ? "checked" : ""} ${disabled}><span><b>Nazwy węzłów</b><small>Wyświetlaj nazwy modułów, stringów i urządzeń.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="flow.show_values" data-live-rerender="1" ${flow.show_values !== false ? "checked" : ""} ${disabled}><span><b>Wartości mocy</b><small>Wyświetlaj moc w węzłach.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="flow.show_status" data-live-rerender="1" ${flow.show_status !== false ? "checked" : ""} ${disabled}><span><b>Stany urządzeń</b><small>Pokazuj status, MPPT lub obszar.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="flow.show_connectors" data-live-rerender="1" ${flow.show_connectors !== false ? "checked" : ""} ${disabled}><span><b>Linie przepływu</b><small>Pokaż magistrale i animowane połączenia.</small></span></label>
            <label class="check-row"><input type="checkbox" data-path="flow.hide_inactive_devices" data-live-rerender="1" ${flow.hide_inactive_devices ? "checked" : ""} ${disabled}><span><b>Ukrywaj nieaktywne</b><small>Nie pokazuj urządzeń pobierających mniej niż próg pracy.</small></span></label>
          </div>
          <div class="widget-add-actions"><button class="secondary-btn" data-settings-target="flow" ${disabled}><ha-icon icon="mdi:palette-outline"></ha-icon>OTWÓRZ USTAWIENIA GRAFIKI</button></div>
        </article>
        <article class="panel flow-config-preview">
          <div class="preview-badge"><ha-icon icon="mdi:eye-outline"></ha-icon>PODGLĄD NA ŻYWO</div>
          ${this._flowDiagram(false, true, this._config.flow || {})}
        </article>
      </section>

      <section class="mapping-groups">${mappingGroups}</section>

      ${f.automation ? `<article class="panel automation-panel">
        <div class="panel-title"><span>BEZPIECZNA AUTOMATYKA — TRYB TESTOWY</span><ha-icon icon="mdi:robot-outline"></ha-icon></div>
        <p class="hint">Wersja 0.3 nadal domyślnie monitoruje. Ustawienia przygotowują dane pod późniejsze adaptery falowników, magazynów i ładowarek.</p>
        <div class="four-grid">
          ${this._selectField("automation.mode", "Tryb", this._config.automation.mode, [["monitor_only","Tylko monitoring"],["self_consumption","Autokonsumpcja"],["dynamic_price","Cena dynamiczna"],["manual","Ręczny"]], disabled)}
          ${this._numberField("automation.minimum_battery_soc", "Minimalny SOC magazynu", this._config.automation.minimum_battery_soc, 0, 100, 1, disabled)}
          ${this._numberField("automation.ev_surplus_start_w", "Start EV od nadwyżki [W]", this._config.automation.ev_surplus_start_w, 0, 100000, 100, disabled)}
          ${this._numberField("automation.decision_delay_seconds", "Opóźnienie decyzji [s]", this._config.automation.decision_delay_seconds, 0, 86400, 10, disabled)}
        </div>
      </article>` : ""}
      ${this._isAdmin() ? `<div class="sticky-save">${this._saveBar(disabled)}</div>` : ""}`;
  }


  _renderTariff() {
    const tariff = this._config.tariff || {};
    const schedule = tariff.schedule || {};
    const runtime = this._runtime?.tariff || {};
    const disabled = this._isAdmin() ? "" : "disabled";
    const currency = this._esc(this._config.general.currency || "PLN");
    const zones = [["morning_peak", "Szczyt przedpołudniowy"], ["afternoon_peak", "Szczyt popołudniowy"], ["off_peak", "Pozostałe godziny"]];
    const priceFields = (section, season, title) => `<article class="panel config-card"><div class="panel-title"><span>${title}</span><ha-icon icon="mdi:cash-multiple"></ha-icon></div><div class="three-grid">${zones.map(([zone, label]) => this._numberField(`tariff.${section}.${season}.${zone}`, `${label} [${currency}/kWh]`, tariff?.[section]?.[season]?.[zone] ?? 0, 0, 10000, 0.0001, disabled)).join("")}</div></article>`;
    return `
      <section class="hero-row"><div><span class="eyebrow">TAURON G13</span><h1>Taryfa trójstrefowa</h1><p>Pełne rozpoznawanie lata, zimy, weekendów, świąt i przedłużenia taniej strefy do 07:00 po dniu wolnym.</p></div>${this._isAdmin() ? `<div class="save-actions"><button class="secondary-btn" data-action="apply-g13-preset"><ha-icon icon="mdi:restore"></ha-icon>PRESET G13 2026</button>${this._saveBar(disabled)}</div>` : ""}</section>
      <section class="tariff-live-grid">
        <article class="tariff-zone-card"><small>AKTYWNA STREFA</small><ha-icon icon="mdi:clock-time-four-outline"></ha-icon><strong data-live="tariffZone">${this._esc(runtime.zone_name || "--")}</strong><span data-live="tariffDayType">${this._esc(runtime.day_type || "--")}</span></article>
        <article class="detail-card cyan"><ha-icon icon="mdi:calendar-range"></ha-icon><div><small>SEZON</small><strong data-live="tariffSeason">${this._esc(runtime.season === "summer" ? "Lato" : runtime.season === "winter" ? "Zima" : "--")}</strong><span>1 IV–30 IX / 1 X–31 III</span></div></article>
        <article class="detail-card green"><ha-icon icon="mdi:cash-check"></ha-icon><div><small>PEŁNA CENA ZMIENNA</small><strong data-live="tariffPrice">${this._num(runtime.total_price, 4)}</strong><span>${currency}/kWh</span></div></article>
        <article class="detail-card purple"><ha-icon icon="mdi:clock-forward"></ha-icon><div><small>NASTĘPNA STREFA</small><strong data-live="tariffNextZone">${this._esc(runtime.next_zone_name || "--")}</strong><span>za <b data-live="tariffNextMinutes">${runtime.next_change_minutes ?? "--"}</b> min</span></div></article>
        <article class="detail-card orange"><ha-icon icon="mdi:cash-clock"></ha-icon><div><small>KOSZT IMPORTU TERAZ</small><strong data-live="importCostHour">--</strong><span>${currency}/h przy aktualnej mocy</span></div></article>
      </section>
      ${runtime.schedule_warning ? `<article class="panel tariff-warning"><ha-icon icon="mdi:alert-outline"></ha-icon><b>${this._esc(runtime.schedule_warning)}</b></article>` : ""}
      <section class="config-layout">
        <article class="panel config-card">
          <div class="panel-title"><span>PROFIL I SPOSÓB LICZENIA</span><ha-icon icon="mdi:tune-variant"></ha-icon></div>
          <label class="check-row"><input type="checkbox" data-path="tariff.enabled" ${tariff.enabled ? "checked" : ""} ${disabled}><span><b>Włącz silnik TAURON G13</b><small>Po włączeniu integracja utworzy aktywną strefę i cenę bieżącą.</small></span></label>
          ${this._field("tariff.profile_name", "Nazwa profilu", tariff.profile_name, "TAURON G13", disabled)}
          ${this._selectField("tariff.price_mode", "Sposób wyliczania ceny", tariff.price_mode, [["components","Cena energii + dystrybucja + opłaty"],["combined","Gotowa pełna cena dla strefy"],["entity","Cena z encji Home Assistant"]], disabled)}
          <label class="check-row"><input type="checkbox" data-path="tariff.use_external_price_if_available" ${tariff.use_external_price_if_available ? "checked" : ""} ${disabled}><span><b>Encja ceny ma pierwszeństwo</b><small>Jeżeli przypisano główną encję Cena zakupu, zastąpi ona obliczenie strefowe.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="tariff.prices_include_vat" ${tariff.prices_include_vat ? "checked" : ""} ${disabled}><span><b>Wprowadzone ceny zawierają VAT</b><small>Wyłącz tylko wtedy, gdy wszystkie wartości wpisujesz netto.</small></span></label>
          ${this._numberField("tariff.vat_percent", "VAT [%]", tariff.vat_percent, 0, 100, 0.1, disabled)}
          <div class="two-grid">
            ${this._field("tariff.effective_from", "Stawki obowiązują od", tariff.effective_from, "2026-01-01", disabled)}
            ${this._field("tariff.effective_to", "Stawki obowiązują do", tariff.effective_to, "2026-12-31", disabled)}
          </div>
        </article>
        <article class="panel config-card">
          <div class="panel-title"><span>OFICJALNY HARMONOGRAM G13</span><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="two-grid">
            ${this._field("tariff.schedule.summer_start", "Początek lata [MM-DD]", schedule.summer_start, "04-01", disabled)}
            ${this._field("tariff.schedule.winter_start", "Początek zimy [MM-DD]", schedule.winter_start, "10-01", disabled)}
            ${this._field("tariff.schedule.morning_start", "Szczyt poranny — od", schedule.morning_start, "07:00", disabled)}
            ${this._field("tariff.schedule.morning_end", "Szczyt poranny — do", schedule.morning_end, "13:00", disabled)}
            ${this._field("tariff.schedule.summer_afternoon_start", "Lato: szczyt wieczorny — od", schedule.summer_afternoon_start, "19:00", disabled)}
            ${this._field("tariff.schedule.summer_afternoon_end", "Lato: szczyt wieczorny — do", schedule.summer_afternoon_end, "22:00", disabled)}
            ${this._field("tariff.schedule.winter_afternoon_start", "Zima: szczyt wieczorny — od", schedule.winter_afternoon_start, "16:00", disabled)}
            ${this._field("tariff.schedule.winter_afternoon_end", "Zima: szczyt wieczorny — do", schedule.winter_afternoon_end, "21:00", disabled)}
          </div>
          <label class="check-row"><input type="checkbox" data-path="tariff.calendar.include_weekends" ${tariff.calendar.include_weekends ? "checked" : ""} ${disabled}><span><b>Uwzględniaj soboty i niedziele jako dni wolne</b><small>Domyślnie cała doba znajduje się w strefie pozaszczytowej.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="tariff.schedule.day_off_all_day_offpeak" ${schedule.day_off_all_day_offpeak ? "checked" : ""} ${disabled}><span><b>Dni wolne przez całą dobę w pozostałych godzinach</b><small>Standard TAURON G13.</small></span></label>
          ${this._field("tariff.schedule.day_off_carry_until", "Koniec dnia wolnego następnego dnia roboczego", schedule.day_off_carry_until, "07:00", disabled)}
          <label class="check-row"><input type="checkbox" data-path="tariff.calendar.include_polish_public_holidays" ${tariff.calendar.include_polish_public_holidays ? "checked" : ""} ${disabled}><span><b>Uwzględniaj polskie święta ustawowe</b><small>W tym Wigilię od 2025 roku oraz święta ruchome.</small></span></label>
          ${this._textarea("tariff.calendar.custom_holidays", "Dodatkowe dni wolne", tariff.calendar.custom_holidays, "Daty RRRR-MM-DD, po przecinku lub w osobnych liniach", disabled)}
        </article>
      </section>
      <section class="season-schedule-grid">
        <article class="panel schedule-card"><div class="panel-title"><span>LATO · OD ${this._esc(schedule.summer_start || "04-01")} DO ${this._esc(schedule.winter_start || "10-01")}</span><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div><div class="schedule-row morning"><b>${this._esc(schedule.morning_start || "07:00")}–${this._esc(schedule.morning_end || "13:00")}</b><span>Szczyt przedpołudniowy</span></div><div class="schedule-row cheap"><b>${this._esc(schedule.morning_end || "13:00")}–${this._esc(schedule.summer_afternoon_start || "19:00")}</b><span>Pozostałe godziny</span></div><div class="schedule-row afternoon"><b>${this._esc(schedule.summer_afternoon_start || "19:00")}–${this._esc(schedule.summer_afternoon_end || "22:00")}</b><span>Szczyt popołudniowy</span></div><div class="schedule-row cheap"><b>${this._esc(schedule.summer_afternoon_end || "22:00")}–${this._esc(schedule.morning_start || "07:00")}</b><span>Pozostałe godziny</span></div></article>
        <article class="panel schedule-card"><div class="panel-title"><span>ZIMA · OD ${this._esc(schedule.winter_start || "10-01")} DO ${this._esc(schedule.summer_start || "04-01")}</span><ha-icon icon="mdi:snowflake"></ha-icon></div><div class="schedule-row morning"><b>${this._esc(schedule.morning_start || "07:00")}–${this._esc(schedule.morning_end || "13:00")}</b><span>Szczyt przedpołudniowy</span></div><div class="schedule-row cheap"><b>${this._esc(schedule.morning_end || "13:00")}–${this._esc(schedule.winter_afternoon_start || "16:00")}</b><span>Pozostałe godziny</span></div><div class="schedule-row afternoon"><b>${this._esc(schedule.winter_afternoon_start || "16:00")}–${this._esc(schedule.winter_afternoon_end || "21:00")}</b><span>Szczyt popołudniowy</span></div><div class="schedule-row cheap"><b>${this._esc(schedule.winter_afternoon_end || "21:00")}–${this._esc(schedule.morning_start || "07:00")}</b><span>Pozostałe godziny</span></div></article>
      </section>
      <section class="price-config-grid">
        ${priceFields("energy_prices", "summer", "CENA ENERGII — LATO")}
        ${priceFields("energy_prices", "winter", "CENA ENERGII — ZIMA")}
        ${priceFields("distribution_prices", "summer", "DYSTRYBUCJA — LATO")}
        ${priceFields("distribution_prices", "winter", "DYSTRYBUCJA — ZIMA")}
        ${priceFields("combined_prices", "summer", "PEŁNA CENA — LATO (TRYB ŁĄCZNY)")}
        ${priceFields("combined_prices", "winter", "PEŁNA CENA — ZIMA (TRYB ŁĄCZNY)")}
      </section>
      <section class="config-layout">
        <article class="panel config-card"><div class="panel-title"><span>OPŁATY ZMIENNE ZA kWh</span><ha-icon icon="mdi:receipt-text-outline"></ha-icon></div><div class="two-grid">
          ${this._numberField("tariff.variable_fees.quality", `Jakościowa [${currency}/kWh]`, tariff.variable_fees.quality, 0, 1000, 0.0001, disabled)}
          ${this._numberField("tariff.variable_fees.renewable", `OZE [${currency}/kWh]`, tariff.variable_fees.renewable, 0, 1000, 0.0001, disabled)}
          ${this._numberField("tariff.variable_fees.cogeneration", `Kogeneracyjna [${currency}/kWh]`, tariff.variable_fees.cogeneration, 0, 1000, 0.0001, disabled)}
          ${this._numberField("tariff.variable_fees.excise", `Akcyza [${currency}/kWh]`, tariff.variable_fees.excise, 0, 1000, 0.0001, disabled)}
          ${this._numberField("tariff.variable_fees.other", `Inne zmienne [${currency}/kWh]`, tariff.variable_fees.other, 0, 1000, 0.0001, disabled)}
        </div></article>
        <article class="panel config-card"><div class="panel-title"><span>OPŁATY STAŁE MIESIĘCZNE</span><ha-icon icon="mdi:calendar-cash-outline"></ha-icon></div><div class="two-grid">
          ${this._selectField("tariff.fixed_fees.phase_count", "Układ pomiarowy", tariff.fixed_fees.phase_count, [[1,"1-fazowy"],[3,"3-fazowy"]], disabled)}
          ${this._numberField("tariff.fixed_fees.network_monthly_1_phase", `Sieciowa stała 1F [${currency}/m-c]`, tariff.fixed_fees.network_monthly_1_phase, 0, 100000, 0.01, disabled)}
          ${this._numberField("tariff.fixed_fees.network_monthly_3_phase", `Sieciowa stała 3F [${currency}/m-c]`, tariff.fixed_fees.network_monthly_3_phase, 0, 100000, 0.01, disabled)}
          ${this._numberField("tariff.fixed_fees.subscription_monthly", `Abonament [${currency}/m-c]`, tariff.fixed_fees.subscription_monthly, 0, 100000, 0.01, disabled)}
          ${this._numberField("tariff.fixed_fees.capacity_fee_monthly", `Opłata mocowa [${currency}/m-c]`, tariff.fixed_fees.capacity_fee_monthly, 0, 100000, 0.01, disabled)}
          ${this._numberField("tariff.fixed_fees.commercial_monthly", `Opłata handlowa [${currency}/m-c]`, tariff.fixed_fees.commercial_monthly, 0, 100000, 0.01, disabled)}
          ${this._numberField("tariff.fixed_fees.other_monthly", `Inne stałe [${currency}/m-c]`, tariff.fixed_fees.other_monthly, 0, 100000, 0.01, disabled)}
        </div></article>
      </section>
      ${this._isAdmin() ? `<div class="sticky-save">${this._saveBar(disabled)}</div>` : ""}`;
  }

  _renderPv() {
    const disabled = this._isAdmin() ? "" : "disabled";
    return `
      <section class="hero-row"><div><span class="eyebrow">FOTOWOLTAIKA</span><h1>Stringi i podział na sekcje</h1><p>Jeden string może zostać rozdzielony na dowolną liczbę pozycji, połaci lub podobszarów.</p></div>${this._isAdmin() ? `<button class="primary-btn" data-action="add-string"><ha-icon icon="mdi:plus"></ha-icon>DODAJ STRING</button>` : ""}</section>
      <section class="pv-summary">
        ${this._detailCard("pv", "Łączna moc PV", "mdi:solar-power", "green")}
        <div class="detail-card"><ha-icon icon="mdi:solar-panel-large"></ha-icon><div><small>STRINGI</small><strong>${this._config.pv_strings.length}</strong></div></div>
        <div class="detail-card"><ha-icon icon="mdi:view-grid-plus-outline"></ha-icon><div><small>SEKCJE</small><strong>${this._config.pv_strings.reduce((sum, item) => sum + (item.sections?.length || 0), 0)}</strong></div></div>
        <div class="detail-card"><ha-icon icon="mdi:lightning-bolt-circle"></ha-icon><div><small>MOC SZCZYTOWA</small><strong>${this._config.pv_strings.reduce((sum, item) => sum + Number(item.capacity_kw || 0), 0).toFixed(2)} kWp</strong></div></div>
      </section>
      <section class="cards-stack">${this._config.pv_strings.length ? this._config.pv_strings.map((item, index) => this._pvStringCard(item, index, disabled)).join("") : this._emptyState("mdi:solar-panel-large", "Brak stringów PV", "Dodaj pierwszy string i podziel go na sekcje, np. dach południowy, garaż i balkon.")}</section>
      ${this._isAdmin() ? `<div class="sticky-save">${this._saveBar(disabled)}</div>` : ""}`;
  }

  _pvStringCard(item, index, disabled) {
    const runtime = (this._runtime?.pv_strings || [])[index] || {};
    return `<article class="panel string-card ${item.enabled === false ? "disabled-card" : ""}">
      <div class="string-head">
        <div><span class="tag">STRING ${index + 1} · ${this._esc(item.mppt || `MPPT ${index + 1}`)}</span><h2>${this._esc(item.name)}</h2><p>${this._esc(item.description || "Bez opisu")}</p></div>
        <div class="string-live"><small>MOC TERAZ</small><b>${this._kw(runtime.power)}</b><span>kW</span></div>
        <div class="head-actions"><button data-action="add-section" data-index="${index}" ${disabled}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>SEKCJA</button><button class="danger" data-action="remove-string" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>
      </div>
      <div class="four-grid">
        ${this._field(`pv_strings.${index}.name`, "Nazwa stringu", item.name, "String 1", disabled)}
        ${this._field(`pv_strings.${index}.mppt`, "Nazwa MPPT", item.mppt, "MPPT 1", disabled)}
        ${this._numberField(`pv_strings.${index}.capacity_kw`, "Moc szczytowa [kWp]", item.capacity_kw, 0, 100000, 0.01, disabled)}
        ${this._entityField(`pv_strings.${index}.status_entity`, "Stan stringu / MPPT", item.status_entity, "Opcjonalny sensor stanu.", disabled, "status")}
        ${this._entityField(`pv_strings.${index}.power_entity`, "Sensor mocy stringu", item.power_entity, "Jeżeli pusty, moc zostanie zsumowana z sekcji.", disabled, "power")}
        ${this._entityField(`pv_strings.${index}.energy_entity`, "Sensor energii stringu", item.energy_entity, "Wh lub kWh.", disabled, "energy")}
        ${this._entityField(`pv_strings.${index}.voltage_entity`, "Napięcie DC", item.voltage_entity, "Napięcie stringu lub MPPT.", disabled, "voltage")}
        ${this._entityField(`pv_strings.${index}.current_entity`, "Prąd DC", item.current_entity, "Prąd stringu lub MPPT.", disabled, "current")}
        ${this._field(`pv_strings.${index}.flow_label`, "Nazwa w przepływie", item.flow_label || "", "Puste = nazwa stringu", disabled)}
        ${this._field(`pv_strings.${index}.flow_icon`, "Ikona w przepływie", item.flow_icon || "mdi:solar-panel-large", "mdi:solar-panel-large", disabled)}
        ${this._numberField(`pv_strings.${index}.flow_order`, "Kolejność w przepływie", item.flow_order ?? index + 1, 0, 10000, 1, disabled)}
      </div>
      ${this._textarea(`pv_strings.${index}.description`, "Opis stringu", item.description, "Informacje o MPPT, falowniku, przewodach, panelach lub lokalizacji.", disabled)}
      <div class="three-grid checks">
        <label class="check-row"><input type="checkbox" data-path="pv_strings.${index}.enabled" data-live-rerender="1" ${item.enabled !== false ? "checked" : ""} ${disabled}><span><b>String aktywny</b><small>Uwzględniaj w sumie PV i diagnostyce.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="pv_strings.${index}.show_on_overview" data-live-rerender="1" ${item.show_on_overview !== false ? "checked" : ""} ${disabled}><span><b>Pokaż na przeglądzie PV</b><small>String może pozostać skonfigurowany, ale ukryty.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="pv_strings.${index}.show_in_flow" data-live-rerender="1" ${item.show_in_flow !== false ? "checked" : ""} ${disabled}><span><b>Pokaż w przepływie</b><small>Dodaj osobny węzeł stringu nad głównym węzłem PV.</small></span></label>
      </div>
      <div class="section-grid">${(item.sections || []).map((section, sIndex) => this._pvSectionCard(section, index, sIndex, disabled)).join("") || `<div class="mini-empty">Brak sekcji. String może działać jako jedna pozycja.</div>`}</div>
    </article>`;
  }

  _pvSectionCard(section, index, sIndex, disabled) {
    return `<div class="pv-section ${section.enabled === false ? "disabled-card" : ""}">
      <div class="section-title"><span>SEKCJA ${sIndex + 1}</span><button class="icon-btn danger" data-action="remove-section" data-index="${index}" data-section="${sIndex}" ${disabled}><ha-icon icon="mdi:close"></ha-icon></button></div>
      ${this._field(`pv_strings.${index}.sections.${sIndex}.name`, "Nazwa", section.name, "Połać południowa", disabled)}
      ${this._field(`pv_strings.${index}.sections.${sIndex}.area`, "Pozycja / obszar", section.area, "Dach / Garaż / Balkon", disabled)}
      <div class="two-grid">
        ${this._selectField(`pv_strings.${index}.sections.${sIndex}.orientation`, "Kierunek", section.orientation, ORIENTATIONS.map(v => [v, v]), disabled)}
        ${this._numberField(`pv_strings.${index}.sections.${sIndex}.tilt`, "Nachylenie [°]", section.tilt, 0, 90, 1, disabled)}
        ${this._numberField(`pv_strings.${index}.sections.${sIndex}.panel_count`, "Liczba paneli", section.panel_count, 0, 10000, 1, disabled)}
        ${this._numberField(`pv_strings.${index}.sections.${sIndex}.peak_power_kw`, "Moc [kWp]", section.peak_power_kw, 0, 100000, 0.01, disabled)}
      </div>
      ${this._numberField(`pv_strings.${index}.sections.${sIndex}.share_percent`, "Udział stringu [%]", section.share_percent, 0, 100, 0.1, disabled)}
      ${this._entityField(`pv_strings.${index}.sections.${sIndex}.power_entity`, "Osobny sensor mocy", section.power_entity, "Opcjonalny. Gdy pusty, sekcja może korzystać z udziału procentowego.", disabled, "power")}
      ${this._entityField(`pv_strings.${index}.sections.${sIndex}.energy_entity`, "Osobny sensor energii", section.energy_entity, "Opcjonalny licznik sekcji.", disabled, "energy")}
      ${this._entityField(`pv_strings.${index}.sections.${sIndex}.voltage_entity`, "Napięcie sekcji", section.voltage_entity, "Opcjonalny sensor DC.", disabled, "voltage")}
      ${this._entityField(`pv_strings.${index}.sections.${sIndex}.current_entity`, "Prąd sekcji", section.current_entity, "Opcjonalny sensor DC.", disabled, "current")}
      ${this._entityField(`pv_strings.${index}.sections.${sIndex}.status_entity`, "Stan sekcji", section.status_entity, "Opcjonalny status optymalizatora lub podlicznika.", disabled, "status")}
      ${this._textarea(`pv_strings.${index}.sections.${sIndex}.description`, "Opis sekcji", section.description, "Cienie, optymalizatory, typ modułów, azymut…", disabled)}
      <div class="two-grid checks"><label class="check-row"><input type="checkbox" data-path="pv_strings.${index}.sections.${sIndex}.enabled" data-live-rerender="1" ${section.enabled !== false ? "checked" : ""} ${disabled}><span><b>Sekcja aktywna</b><small>Uwzględniaj w obliczeniach.</small></span></label><label class="check-row"><input type="checkbox" data-path="pv_strings.${index}.sections.${sIndex}.show_on_overview" data-live-rerender="1" ${section.show_on_overview !== false ? "checked" : ""} ${disabled}><span><b>Pokaż sekcję</b><small>Widoczność w widoku PV.</small></span></label></div>
    </div>`;
  }

  _renderDevices() {
    const disabled = this._isAdmin() ? "" : "disabled";
    const devices = (this._config.devices || []).slice().sort((a,b) => Number(a.priority || 0) - Number(b.priority || 0));
    return `
      <section class="hero-row"><div><span class="eyebrow">DODATKOWE URZĄDZENIA</span><h1>Odbiorniki, podliczniki i cykle pracy</h1><p>Każde urządzenie może mieć moc, energię, stan, cykl, sterowanie, progi pracy oraz własne opisy.</p></div>${this._isAdmin() ? `<button class="primary-btn" data-action="add-device"><ha-icon icon="mdi:plus"></ha-icon>DODAJ URZĄDZENIE</button>` : ""}</section>
      <section class="device-live-grid" data-device-live-grid>${devices.filter(d => d.enabled !== false).map(d => this._deviceLiveCard(d, this._config.devices.indexOf(d))).join("") || this._emptyState("mdi:power-plug-off-outline", "Brak dodatkowych urządzeń", "Dodaj urządzenie i przypisz jego sensory oraz opcjonalne sterowanie.")}</section>
      <section class="cards-stack">${devices.map(item => this._deviceConfigCard(item, this._config.devices.indexOf(item), disabled)).join("")}</section>
      ${this._isAdmin() ? `<div class="sticky-save">${this._saveBar(disabled)}</div>` : ""}`;
  }

  _deviceLiveCard(item, index) {
    const state = this._deviceRuntime(item, index);
    return `<article class="device-live accent-${this._esc(item.accent || "cyan")} ${state.active ? "is-active" : "is-idle"}">
      <ha-icon icon="${this._escAttr(item.icon || "mdi:flash")}"></ha-icon>
      <div class="device-live-copy"><small>${this._esc(CATEGORY_OPTIONS.find(v => v[0] === item.category)?.[1] || item.category)} · ${this._esc(item.area || "bez obszaru")}</small><h3>${this._esc(item.name)}</h3><strong data-device-power="${index}">${this._num(state.power, 0)}</strong><span>W</span><p data-device-description="${index}">${this._esc(state.description)}</p></div>
      <div class="device-state-dot ${state.active ? "on" : "off"}"></div>
      ${item.control_entity ? `<button class="control-btn" data-action="control-device" data-index="${index}" title="Sterowanie: ${this._escAttr(item.control_entity)}"><ha-icon icon="mdi:power"></ha-icon></button>` : ""}
    </article>`;
  }

  _deviceConfigCard(item, index, disabled) {
    const runtime = this._deviceRuntime(item, index);
    return `<article class="panel device-config ${item.enabled === false ? "disabled-card" : ""}">
      <div class="string-head"><div><span class="tag">URZĄDZENIE ${index + 1}</span><h2>${this._esc(item.name)}</h2><p>${this._esc(runtime.description || item.description || "Bez opisu")}</p></div><div class="device-config-live"><small>MOC</small><b>${this._num(runtime.power,0)} W</b><span>${runtime.active ? "PRACUJE" : "SPOCZYNEK"}</span></div><button class="danger" data-action="remove-device" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>
      <div class="four-grid">
        ${this._field(`devices.${index}.name`, "Nazwa", item.name, "Zmywarka", disabled)}
        ${this._selectField(`devices.${index}.category`, "Kategoria", item.category, CATEGORY_OPTIONS, disabled)}
        ${this._field(`devices.${index}.area`, "Obszar", item.area, "Kuchnia", disabled)}
        ${this._field(`devices.${index}.icon`, "Ikona MDI", item.icon, "mdi:dishwasher", disabled)}
        ${this._entityField(`devices.${index}.power_entity`, "Sensor mocy", item.power_entity, "W lub kW.", disabled, "power")}
        ${this._entityField(`devices.${index}.energy_entity`, "Sensor energii", item.energy_entity, "Wh lub kWh.", disabled, "energy")}
        ${this._entityField(`devices.${index}.status_entity`, "Encja stanu", item.status_entity, "Stan urządzenia, np. running, off lub gotowe.", disabled, "status")}
        ${this._entityField(`devices.${index}.cycle_entity`, "Encja cyklu / programu", item.cycle_entity, "Pozostały czas, etap albo nazwa programu.", disabled, "status")}
        ${this._entityField(`devices.${index}.control_entity`, "Encja sterowania", item.control_entity, "Switch, light, input_boolean, button, select, number lub climate.", disabled, "control")}
        ${this._selectField(`devices.${index}.accent`, "Akcent", item.accent, [["cyan","Cyan"],["green","Zielony"],["lime","Limonkowy"],["orange","Pomarańczowy"],["purple","Fioletowy"]], disabled)}
        ${this._numberField(`devices.${index}.priority`, "Kolejność", item.priority, 0, 10000, 1, disabled)}
        ${this._numberField(`devices.${index}.active_threshold_w`, "Próg pracy [W]", item.active_threshold_w, 0, 1000000, 1, disabled)}
        ${this._numberField(`devices.${index}.standby_threshold_w`, "Próg czuwania [W]", item.standby_threshold_w, 0, 1000000, 1, disabled)}
        ${this._field(`devices.${index}.flow_label`, "Nazwa w przepływie", item.flow_label || "", "Puste = nazwa urządzenia", disabled)}
        ${this._selectField(`devices.${index}.flow_direction`, "Rola w przepływie", item.flow_direction || "consumer", [["consumer","Odbiornik — energia z domu"],["source","Źródło — energia do domu"],["bidirectional","Dwukierunkowe"]], disabled, true)}
        ${this._numberField(`devices.${index}.flow_order`, "Kolejność w przepływie", item.flow_order ?? item.priority ?? index + 1, 0, 10000, 1, disabled)}
      </div>
      <div class="two-grid">
        ${this._textarea(`devices.${index}.active_description`, "Opis podczas pracy", item.active_description, "Zmywarka pracuje", disabled)}
        ${this._textarea(`devices.${index}.idle_description`, "Opis po zakończeniu", item.idle_description, "Koniec pracy — opróżnij zmywarkę", disabled)}
      </div>
      ${this._textarea(`devices.${index}.description`, "Opis techniczny", item.description, "Co urządzenie mierzy, jak jest podłączone i jakie ma ograniczenia.", disabled)}
      <div class="four-grid checks"><label class="check-row"><input type="checkbox" data-path="devices.${index}.enabled" data-live-rerender="1" ${item.enabled !== false ? "checked" : ""} ${disabled}><span><b>Aktywne</b><small>Pokaż urządzenie w jego widoku.</small></span></label><label class="check-row"><input type="checkbox" data-path="devices.${index}.show_on_overview" data-live-rerender="1" ${item.show_on_overview !== false ? "checked" : ""} ${disabled}><span><b>Pokaż na podsumowaniu</b><small>Uwzględniaj w największych odbiornikach.</small></span></label><label class="check-row"><input type="checkbox" data-path="devices.${index}.show_in_flow" data-live-rerender="1" ${item.show_in_flow ? "checked" : ""} ${disabled}><span><b>Pokaż w przepływie</b><small>Dodaj urządzenie do górnej lub dolnej magistrali.</small></span></label><label class="check-row"><input type="checkbox" data-path="devices.${index}.include_in_home_total" ${item.include_in_home_total ? "checked" : ""} ${disabled}><span><b>Wliczaj do domu</b><small>Znacznik dla raportów kosztowych.</small></span></label></div>
    </article>`;
  }

  _renderDiagnostics() {
    const rows = ROLE_DEFS.map(([key, label]) => {
      const entityId = this._config.mappings[key];
      const state = entityId ? this._hass?.states?.[entityId] : null;
      const status = !entityId ? "NIE SKONFIGUROWANO" : !state ? "BRAK ENCJI" : ["unknown","unavailable"].includes(state.state) ? state.state.toUpperCase() : "OK";
      const cls = status === "OK" ? "ok" : status === "NIE SKONFIGUROWANO" ? "neutral" : "bad";
      return `<tr><td>${this._esc(label)}</td><td><code>${this._esc(entityId || "—")}</code></td><td>${this._esc(state?.state ?? "—")}</td><td>${this._esc(state?.attributes?.unit_of_measurement ?? "—")}</td><td><span class="status-pill ${cls}">${status}</span></td><td>${entityId && this._isAdmin() ? `<button class="test-btn" data-action="test-entity" data-entity="${this._escAttr(entityId)}">TEST</button>` : ""}</td></tr>`;
    }).join("");
    return `
      <section class="hero-row"><div><span class="eyebrow">DIAGNOSTYKA</span><h1>Spójność encji i danych</h1><p>Panel pokazuje dokładne źródło, stan, jednostkę i dostępność każdej roli.</p></div><button class="secondary-btn" data-action="refresh-runtime"><ha-icon icon="mdi:refresh"></ha-icon>ODŚWIEŻ</button></section>
      <article class="panel diagnostics-summary"><div><small>REWIZJA</small><strong>${this._esc(this._config.revision)}</strong></div><div><small>STRINGI PV</small><strong>${this._config.pv_strings.length}</strong></div><div><small>URZĄDZENIA</small><strong>${this._config.devices.length}</strong></div><div><small>ENCJE HA</small><strong>${Object.keys(this._hass?.states || {}).length}</strong></div></article>
      <article class="panel table-panel"><div class="panel-title"><span>GŁÓWNE ROLE</span><ha-icon icon="mdi:table-search"></ha-icon></div><div class="table-scroll"><table><thead><tr><th>Rola</th><th>Encja</th><th>Stan</th><th>Jednostka</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></article>
      <article class="panel json-panel"><div class="panel-title"><span>DANE RUNTIME</span><ha-icon icon="mdi:code-json"></ha-icon></div><pre>${this._esc(JSON.stringify(this._runtime || {}, null, 2))}</pre></article>`;
  }

  _flowNodeKey(value) {
    return String(value || "node").replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
  }

  _flowNodeStyle(profile, key) {
    const stored = profile?.flow_node_positions?.[this._flowNodeKey(key)] || {};
    const x = Math.max(-600, Math.min(600, Number(stored.x || 0)));
    const y = Math.max(-600, Math.min(600, Number(stored.y || 0)));
    return `--flow-node-x:${x}px;--flow-node-y:${y}px`;
  }

  _flowElementSettings(profile, key) {
    return profile?.flow_element_styles?.[this._flowNodeKey(key)] || {};
  }

  _safeFlowImageUrl(value) {
    const url = String(value || "").trim();
    return /^(\/local\/|\/media\/|\/api\/image\/serve\/|https:\/\/)/i.test(url) ? url : "";
  }

  _flowBaseColor(key) {
    const value = this._flowNodeKey(key);
    if (value === "grid" || value.includes("grid")) return "#b95cff";
    if (value === "pv" || value.includes("pv") || value.includes("string") || value.includes("source")) return "#52ff62";
    if (value === "battery" || value.includes("battery")) return "#b8ff3d";
    return "#20eaff";
  }

  _flowElementStyle(profile, key, kind = "position") {
    const parts = [this._flowNodeStyle(profile, key)];
    const style = this._flowElementSettings(profile, key);
    if (style.appearance_enabled) {
      const baseColor = this._flowBaseColor(key);
      const lineColor = this._safeColor(style.line_color, baseColor);
      const thickness = Math.max(1, Math.min(14, Number(style.line_thickness || 3)));
      if (["node", "extra-node"].includes(kind)) {
        if (Number(style.width) > 0) parts.push(`width:${Math.max(50, Math.min(360, Number(style.width)))}px!important`);
        if (Number(style.height) > 0) parts.push(`height:${Math.max(40, Math.min(360, Number(style.height)))}px!important`, `min-height:${Math.max(40, Math.min(360, Number(style.height)))}px!important`);
        parts.push(`--flow-custom-border:${this._safeColor(style.border_color, baseColor)}`);
        parts.push(`--flow-custom-bg:${this._safeColor(style.background_color, "#020c18")}`);
        parts.push(`--flow-custom-icon:${this._safeColor(style.icon_color, baseColor)}`);
        parts.push(`--flow-custom-name:${this._safeColor(style.name_color, "#eefaff")}`);
        parts.push(`--flow-custom-value:${this._safeColor(style.value_color, baseColor)}`);
        parts.push(`--flow-custom-unit:${this._safeColor(style.unit_color, "#94b5c0")}`);
        parts.push(`--flow-custom-border-width:${Math.max(1, Math.min(8, Number(style.border_width || 1)))}px`);
        parts.push(`--flow-custom-radius:${Math.max(0, Math.min(100, Number(style.border_radius ?? 18)))}px`);
        parts.push(`--flow-custom-icon-size:${Math.max(10, Math.min(120, Number(style.icon_size || 32)))}px`);
      } else if (kind === "link") parts.push(`--link:${lineColor}`, `--flow-line-thickness:${thickness}px`);
      else if (kind === "wire") parts.push(`--branch-color:${lineColor}`, `--flow-line-thickness:${thickness}px`);
      else if (kind === "bus") parts.push(`--bus-color:${lineColor}`, `--flow-line-thickness:${thickness}px`);
      else if (kind === "label") parts.push(`--flow-label-color:${this._safeColor(style.value_color, "#eefaff")}`, `--flow-label-bg:${this._safeColor(style.background_color, "#020c18")}`, `--flow-label-border:${this._safeColor(style.border_color, lineColor)}`);
    }
    return parts.join(";");
  }

  _flowElementName(profile, key, fallback) {
    return this._flowElementSettings(profile, key).name || fallback;
  }

  _flowElementIcon(profile, key, fallback) {
    const style = this._flowElementSettings(profile, key);
    if (style.icon_type === "emoji") return `<span class="flow-node-emoji" aria-hidden="true" style="font-size:${Math.max(10, Math.min(120, Number(style.icon_size || 32)))}px">${this._esc(style.emoji || "⚡")}</span>`;
    const imageUrl = style.icon_type === "image" ? this._safeFlowImageUrl(style.image_url) : "";
    if (imageUrl) return `<img class="flow-node-custom-image" src="${this._escAttr(imageUrl)}" alt="" loading="eager">`;
    const icon = String(style.icon || fallback || "mdi:information-outline");
    return `<ha-icon icon="${this._escAttr(icon.startsWith("mdi:") ? icon : fallback || "mdi:information-outline")}"></ha-icon>`;
  }

  _flowElementExtraFields(profile, key) {
    const fields = this._flowElementSettings(profile, key).extra_fields || [];
    const enabled = fields.filter(field => field.enabled !== false).slice(0, 8);
    if (!enabled.length) return "";
    return `<div class="flow-node-extra-fields">${enabled.map((field, index) => {
      const value = this._widgetValue(field);
      return `<div class="flow-node-extra-field" style="--flow-field-color:${this._safeColor(field.color, "#8eb5c3")};--flow-field-label-size:${Math.max(5, Math.min(24, Number(field.label_size || 6)))}px;--flow-field-value-size:${Math.max(6, Math.min(36, Number(field.value_size || 9)))}px;--flow-field-unit-size:${Math.max(5, Math.min(24, Number(field.unit_size || 6)))}px;--flow-field-label-weight:${field.label_bold ? 700 : 400};--flow-field-value-weight:${field.value_bold === false ? 400 : 700};--flow-field-unit-weight:${field.unit_bold ? 700 : 400}" data-flow-custom-field data-entity-id="${this._escAttr(field.entity_id || "")}" data-attribute="${this._escAttr(field.attribute || "")}" data-unit="${this._escAttr(field.unit || "")}" data-decimals="${Math.max(0, Math.min(6, Number(field.decimals ?? 1)))}" data-multiplier="${Number(field.multiplier ?? 1)}"><small>${this._esc(field.name || `Pole ${index + 1}`)}</small><b>${this._esc(value.formatted)}</b><span>${this._esc(value.unit)}</span></div>`;
    }).join("")}</div>`;
  }

  _flowElementActionAttrs(profile, key) {
    const action = this._flowElementSettings(profile, key).tap_action || "none";
    return action === "none" ? "" : `data-flow-action-element="${this._escAttr(this._flowNodeKey(key))}" tabindex="0" role="button"`;
  }

  _sceneConnectionReading(connection, values = this._runtimeValues()) {
    const config = connection || {};
    if (config.direction_source === "entity") {
      const state = config.entity_id ? this._hass?.states?.[config.entity_id] : null;
      let raw = state?.state;
      if (config.attribute) raw = String(config.attribute).split(".").reduce((value, part) => value == null ? undefined : value[part], state?.attributes);
      const number = Number(raw), multiplier = Number(config.multiplier ?? 1);
      return { value: Number.isFinite(number) ? number * (Number.isFinite(multiplier) ? multiplier : 1) : null, available: Boolean(state) && !["unknown", "unavailable"].includes(String(state.state).toLowerCase()) };
    }
    const automatic = config.automatic || {};
    const mappings = this._config?.mappings || {}, runtime = this._runtime || {};
    if (automatic.kind === "grid") {
      const available = [mappings.grid_power, mappings.grid_import_power, mappings.grid_export_power].some(entity => this._readPower(entity) != null) || [runtime.grid_power, runtime.grid_import_power, runtime.grid_export_power].some(value => value != null);
      return { value: Number(values.gridImport || 0) - Number(values.gridExport || 0), available };
    }
    if (automatic.kind === "pv") return { value: values.pv, available: values.pv != null };
    if (automatic.kind === "battery") {
      const available = [mappings.battery_power, mappings.battery_charge_power, mappings.battery_discharge_power].some(entity => this._readPower(entity) != null) || [runtime.battery_power, runtime.battery_charge_power, runtime.battery_discharge_power].some(value => value != null);
      return { value: Number(values.batteryCharge || 0) - Number(values.batteryDischarge || 0), available };
    }
    if (automatic.kind === "ev") {
      const available = this._readPower(mappings.ev_power) != null || runtime.ev_power != null;
      return { value: values.ev, available };
    }
    if (automatic.kind === "string") { const runtime = this._pvStringRuntime(this._config.pv_strings?.[automatic.index] || {}, automatic.index); return { value: runtime.power, available: runtime.power != null }; }
    if (automatic.kind === "device") { const runtime = this._deviceRuntime(this._config.devices?.[automatic.index] || {}, automatic.index); return { value: runtime.power, available: runtime.power != null }; }
    return { value: 0, available: true };
  }

  _sceneConnectionState(connection, values = this._runtimeValues()) {
    const reading = this._sceneConnectionReading(connection, values);
    if (!reading.available || reading.value == null || !Number.isFinite(Number(reading.value))) return { state: "unavailable", value: null };
    const deadband = Math.max(0, Number(connection.deadband ?? 1));
    let value = Number(reading.value);
    if (connection.positive_direction === "reverse") value *= -1;
    if (Math.abs(value) <= deadband) return { state: "idle", value: Number(reading.value) };
    return { state: value > 0 ? "forward" : "reverse", value: Number(reading.value) };
  }

  _sceneNodeRect(node, scene, padding = 0) {
    const measured = scene?._node_rects?.[node?.key];
    if (measured) return { left: measured.left - padding, right: measured.right + padding, top: measured.top - padding, bottom: measured.bottom + padding, cx: measured.cx, cy: measured.cy, width: measured.width, height: measured.height };
    const viewportWidth = Math.max(1, Number(scene?._viewport_width || 1000));
    const viewportHeight = Math.max(1, Number(scene?._viewport_height || scene?.canvas_height || 600));
    const width = Math.max(40, Number(node?.width || 132)) * 1000 / viewportWidth;
    const height = Math.max(30, Number(node?.height || 82)) * 600 / viewportHeight;
    const cx = Number(node?.x || 0) * 10, cy = Number(node?.y || 0) * 6;
    return { left: cx - width / 2 - padding, right: cx + width / 2 + padding, top: cy - height / 2 - padding, bottom: cy + height / 2 + padding, cx, cy, width, height };
  }

  _scenePortSide(node, peer) {
    const dx = Number(peer.x) - Number(node.x), dy = (Number(peer.y) - Number(node.y)) * .6;
    if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? "right" : "left";
    return dy >= 0 ? "bottom" : "top";
  }

  _sceneConnectionPorts(connections, byKey, scene, clearance, spacing) {
    const assignments = {}, groups = new Map();
    connections.forEach(connection => ["from", "to"].forEach(endpoint => {
      const node = byKey[connection[endpoint]], peer = byKey[connection[endpoint === "from" ? "to" : "from"]];
      if (!node || !peer) return;
      const side = this._scenePortSide(node, peer), groupKey = `${node.key}:${side}`;
      if (!groups.has(groupKey)) groups.set(groupKey, []);
      groups.get(groupKey).push({ connection, endpoint, node, peer, side });
    }));
    groups.forEach(entries => {
      const horizontalSide = ["top", "bottom"].includes(entries[0].side);
      entries.sort((a, b) => horizontalSide ? Number(a.peer.x) - Number(b.peer.x) : Number(a.peer.y) - Number(b.peer.y) || a.connection.key.localeCompare(b.connection.key));
      entries.forEach((entry, index) => {
        const rect = this._sceneNodeRect(entry.node, scene, 0);
        const count = entries.length;
        const span = (horizontalSide ? rect.width : rect.height) * .68;
        const offset = count <= 1 ? 0 : -span / 2 + span * index / (count - 1);
        let port, gate, grid;
        if (entry.side === "left" || entry.side === "right") {
          const direction = entry.side === "right" ? 1 : -1;
          const radius = entry.node.key === "home" ? rect.width / 2 * Math.sqrt(Math.max(0, 1 - Math.pow(offset / Math.max(1, rect.height / 2), 2))) : rect.width / 2;
          port = { x: rect.cx + direction * radius, y: rect.cy + offset };
          gate = { x: direction > 0 ? rect.right + clearance : rect.left - clearance, y: port.y };
          grid = { x: direction > 0 ? Math.ceil(gate.x / spacing) * spacing : Math.floor(gate.x / spacing) * spacing, y: Math.round(gate.y / spacing) * spacing };
        } else {
          const direction = entry.side === "bottom" ? 1 : -1;
          const radius = entry.node.key === "home" ? rect.height / 2 * Math.sqrt(Math.max(0, 1 - Math.pow(offset / Math.max(1, rect.width / 2), 2))) : rect.height / 2;
          port = { x: rect.cx + offset, y: rect.cy + direction * radius };
          gate = { x: port.x, y: direction > 0 ? rect.bottom + clearance : rect.top - clearance };
          grid = { x: Math.round(gate.x / spacing) * spacing, y: direction > 0 ? Math.ceil(gate.y / spacing) * spacing : Math.floor(gate.y / spacing) * spacing };
        }
        assignments[`${entry.connection.key}:${entry.endpoint}`] = { port, gate, grid, side: entry.side };
      });
    });
    return assignments;
  }

  _scenePointInRect(point, rect) {
    return point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom;
  }

  _sceneSegmentsIntersect(a, b, c, d) {
    const cross = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    const ab1 = cross(a, b, c), ab2 = cross(a, b, d), cd1 = cross(c, d, a), cd2 = cross(c, d, b);
    return ((ab1 === 0 && ab2 === 0 && cd1 === 0 && cd2 === 0)
      ? Math.max(Math.min(a.x, b.x), Math.min(c.x, d.x)) <= Math.min(Math.max(a.x, b.x), Math.max(c.x, d.x)) && Math.max(Math.min(a.y, b.y), Math.min(c.y, d.y)) <= Math.min(Math.max(a.y, b.y), Math.max(c.y, d.y))
      : ab1 * ab2 <= 0 && cd1 * cd2 <= 0);
  }

  _sceneSegmentHitsRect(a, b, rect) {
    if (this._scenePointInRect(a, rect) || this._scenePointInRect(b, rect)) return true;
    const tl = { x: rect.left, y: rect.top }, tr = { x: rect.right, y: rect.top }, br = { x: rect.right, y: rect.bottom }, bl = { x: rect.left, y: rect.bottom };
    return this._sceneSegmentsIntersect(a, b, tl, tr) || this._sceneSegmentsIntersect(a, b, tr, br) || this._sceneSegmentsIntersect(a, b, br, bl) || this._sceneSegmentsIntersect(a, b, bl, tl);
  }

  _sceneGridRoute(start, end, obstacles, usedEdges, usedPoints, spacing) {
    const canvasMaxX = Math.ceil(1000 / spacing), canvasMaxY = Math.ceil(600 / spacing);
    const toIndex = point => ({ x: Math.round(point.x / spacing), y: Math.round(point.y / spacing) });
    const toPoint = index => ({ x: index.x * spacing, y: index.y * spacing });
    const source = toIndex(start), target = toIndex(end), directions = [[1,0],[-1,0],[0,1],[0,-1]];
    const outerMargin = Math.max(4, Math.ceil(48 / spacing));
    const minX = Math.min(-outerMargin, source.x - outerMargin, target.x - outerMargin);
    const minY = Math.min(-outerMargin, source.y - outerMargin, target.y - outerMargin);
    const maxX = Math.max(canvasMaxX + outerMargin, source.x + outerMargin, target.x + outerMargin);
    const maxY = Math.max(canvasMaxY + outerMargin, source.y + outerMargin, target.y + outerMargin);
    const edgeKey = (a, b) => `${Math.min(a.x,b.x)},${Math.min(a.y,b.y)}|${Math.max(a.x,b.x)},${Math.max(a.y,b.y)}`;
    const pointKey = point => `${point.x},${point.y}`;
    const stateKey = (point, direction) => `${point.x},${point.y},${direction}`;
    const blocked = index => {
      if ((index.x === source.x && index.y === source.y) || (index.x === target.x && index.y === target.y)) return false;
      const point = toPoint(index);
      return obstacles.some(rect => this._scenePointInRect(point, rect));
    };
    const heap = [];
    const push = item => { heap.push(item); let i = heap.length - 1; while (i > 0) { const parent = (i - 1) >> 1; if (heap[parent].f <= item.f) break; heap[i] = heap[parent]; i = parent; } heap[i] = item; };
    const pop = () => { const root = heap[0], tail = heap.pop(); if (heap.length && tail) { let i = 0; while (true) { let child = i * 2 + 1; if (child >= heap.length) break; if (child + 1 < heap.length && heap[child + 1].f < heap[child].f) child += 1; if (heap[child].f >= tail.f) break; heap[i] = heap[child]; i = child; } heap[i] = tail; } return root; };
    const distance = new Map(), previous = new Map(), states = new Map();
    const startKey = stateKey(source, 4);
    distance.set(startKey, 0); states.set(startKey, { ...source, direction: 4 });
    push({ f: Math.abs(target.x - source.x) + Math.abs(target.y - source.y), g: 0, ...source, direction: 4, key: startKey });
    let finalKey = "", iterations = 0;
    while (heap.length && iterations++ < 50000) {
      const current = pop();
      if (!current || current.g !== distance.get(current.key)) continue;
      if (current.x === target.x && current.y === target.y) { finalKey = current.key; break; }
      directions.forEach(([dx, dy], direction) => {
        const next = { x: current.x + dx, y: current.y + dy };
        if (next.x < minX || next.y < minY || next.x > maxX || next.y > maxY || blocked(next)) return;
        if (obstacles.some(rect => this._sceneSegmentHitsRect(toPoint(current), toPoint(next), rect))) return;
        const edgeUse = usedEdges.get(edgeKey(current, next)) || 0;
        const pointUse = usedPoints.get(pointKey(next)) || 0;
        const turn = current.direction === 4 || current.direction === direction ? 0 : .45;
        const g = current.g + 1 + turn + edgeUse * 90 + pointUse * 18;
        const key = stateKey(next, direction);
        if (g >= (distance.get(key) ?? Infinity)) return;
        distance.set(key, g); previous.set(key, current.key); states.set(key, { ...next, direction });
        const h = Math.abs(target.x - next.x) + Math.abs(target.y - next.y);
        push({ f: g + h, g, ...next, direction, key });
      });
    }
    if (!finalKey) return this._sceneFallbackRoute(start, end, obstacles, spacing);
    const result = [];
    for (let key = finalKey; key; key = previous.get(key)) { const state = states.get(key); if (state) result.push(toPoint(state)); }
    return result.reverse();
  }

  _sceneFallbackRoute(start, end, obstacles, spacing) {
    const margin = Math.max(36, spacing * 3);
    const left = Math.min(-margin, ...obstacles.map(rect => rect.left - margin));
    const right = Math.max(1000 + margin, ...obstacles.map(rect => rect.right + margin));
    const top = Math.min(-margin, ...obstacles.map(rect => rect.top - margin));
    const bottom = Math.max(600 + margin, ...obstacles.map(rect => rect.bottom + margin));
    const candidates = [
      [start, { x: start.x, y: top }, { x: end.x, y: top }, end],
      [start, { x: start.x, y: bottom }, { x: end.x, y: bottom }, end],
      [start, { x: left, y: start.y }, { x: left, y: end.y }, end],
      [start, { x: right, y: start.y }, { x: right, y: end.y }, end],
      [start, { x: start.x, y: end.y }, end],
      [start, { x: end.x, y: start.y }, end],
    ];
    const intersections = points => points.slice(1).reduce((count, point, index) => count + obstacles.filter(rect => this._sceneSegmentHitsRect(points[index], point, rect)).length, 0);
    candidates.sort((a, b) => intersections(a) - intersections(b));
    return candidates[0];
  }

  _sceneCleanPolyline(points) {
    const unique = points.filter((point, index) => index === 0 || Math.abs(point.x - points[index - 1].x) > .1 || Math.abs(point.y - points[index - 1].y) > .1);
    return unique.filter((point, index) => {
      if (!index || index === unique.length - 1) return true;
      const before = unique[index - 1], after = unique[index + 1];
      return !((Math.abs(before.x - point.x) < .1 && Math.abs(point.x - after.x) < .1) || (Math.abs(before.y - point.y) < .1 && Math.abs(point.y - after.y) < .1));
    });
  }

  _scenePolylinePath(points, rounded = true) {
    const clean = this._sceneCleanPolyline(points);
    if (!clean.length) return "";
    if (!rounded || clean.length < 3) return `M ${clean.map(point => `${Number(point.x.toFixed(2))} ${Number(point.y.toFixed(2))}`).join(" L ")}`;
    let path = `M ${Number(clean[0].x.toFixed(2))} ${Number(clean[0].y.toFixed(2))}`;
    for (let index = 1; index < clean.length - 1; index++) {
      const previous = clean[index - 1], point = clean[index], next = clean[index + 1];
      const incoming = Math.hypot(point.x - previous.x, point.y - previous.y), outgoing = Math.hypot(next.x - point.x, next.y - point.y);
      const radius = Math.min(14, incoming * .35, outgoing * .35);
      const a = { x: point.x + (previous.x - point.x) * radius / incoming, y: point.y + (previous.y - point.y) * radius / incoming };
      const b = { x: point.x + (next.x - point.x) * radius / outgoing, y: point.y + (next.y - point.y) * radius / outgoing };
      path += ` L ${Number(a.x.toFixed(2))} ${Number(a.y.toFixed(2))} Q ${Number(point.x.toFixed(2))} ${Number(point.y.toFixed(2))} ${Number(b.x.toFixed(2))} ${Number(b.y.toFixed(2))}`;
    }
    const last = clean[clean.length - 1];
    return `${path} L ${Number(last.x.toFixed(2))} ${Number(last.y.toFixed(2))}`;
  }

  _sceneRouteLabelPoint(points, obstacles, usedLabels) {
    const clean = this._sceneCleanPolyline(points), segments = [];
    let total = 0;
    for (let index = 1; index < clean.length; index++) { const length = Math.hypot(clean[index].x - clean[index - 1].x, clean[index].y - clean[index - 1].y); segments.push({ a: clean[index - 1], b: clean[index], length, start: total }); total += length; }
    const distanceToRect = (point, rect) => Math.hypot(Math.max(rect.left - point.x, 0, point.x - rect.right), Math.max(rect.top - point.y, 0, point.y - rect.bottom));
    const candidates = segments.filter(segment => segment.length >= 25).map(segment => {
      const point = { x: (segment.a.x + segment.b.x) / 2, y: (segment.a.y + segment.b.y) / 2 };
      const obstacleDistance = obstacles.length ? Math.min(...obstacles.map(rect => distanceToRect(point, rect))) : 100;
      const overlap = usedLabels.reduce((penalty, used) => penalty + (Math.abs(used.x - point.x) < 86 && Math.abs(used.y - point.y) < 26 ? 1000 : 0), 0);
      return { point, score: segment.length + obstacleDistance * .35 - Math.abs(segment.start + segment.length / 2 - total / 2) * .12 - overlap };
    }).sort((a, b) => b.score - a.score);
    const point = candidates[0]?.point || clean[Math.floor(clean.length / 2)] || { x: 500, y: 300 };
    usedLabels.push(point);
    return point;
  }

  _sceneConnectionRoutes(connections, byKey, scene = {}) {
    const clearance = Math.max(8, Math.min(80, Number(scene.routing_clearance || 20)));
    const spacing = Math.max(8, Math.min(30, Number(scene.routing_spacing || 14)));
    const visibleNodes = Object.values(byKey).filter(node => node?.visible !== false);
    const obstacles = visibleNodes.map(node => ({ ...this._sceneNodeRect(node, scene, clearance), key: node.key }));
    const safetyObstacles = visibleNodes.map(node => ({ ...this._sceneNodeRect(node, scene, Math.max(2, Math.min(6, clearance * .25))), key: node.key }));
    const ports = this._sceneConnectionPorts(connections, byKey, scene, clearance, spacing);
    const usedEdges = new Map(), usedPoints = new Map(), usedSegments = [], usedLabels = [], routes = {};
    const edgeKey = (a, b) => `${Math.min(a.x,b.x)},${Math.min(a.y,b.y)}|${Math.max(a.x,b.x)},${Math.max(a.y,b.y)}`;
    connections.forEach(connection => {
      const fromPort = ports[`${connection.key}:from`], toPort = ports[`${connection.key}:to`];
      if (!fromPort || !toPort) { routes[connection.key] = { path: "", points: [], labelPoint: { x: 500, y: 300 } }; return; }
      const foreignObstacles = obstacles.filter(rect => ![connection.from, connection.to].includes(rect.key));
      const tightEndpoint = foreignObstacles.some(rect => this._scenePointInRect(fromPort.grid, rect) || this._scenePointInRect(toPort.grid, rect));
      const routingObstacles = tightEndpoint ? safetyObstacles.filter(rect => ![connection.from, connection.to].includes(rect.key)) : foreignObstacles;
      const directPoints = [fromPort.port, toPort.port];
      const directBlocked = foreignObstacles.some(rect => this._sceneSegmentHitsRect(directPoints[0], directPoints[1], rect)) || usedSegments.some(([a,b]) => this._sceneSegmentsIntersect(directPoints[0], directPoints[1], a, b));
      let gridPoints = [], points;
      if (connection.route === "direct" && !directBlocked) points = directPoints;
      else {
        gridPoints = this._sceneGridRoute(fromPort.grid, toPort.grid, routingObstacles, usedEdges, usedPoints, spacing);
        points = [fromPort.port, fromPort.gate, ...gridPoints, toPort.gate, toPort.port];
      }
      points = this._sceneCleanPolyline(points);
      for (let index = 1; index < gridPoints.length; index++) {
        const key = edgeKey(gridPoints[index - 1], gridPoints[index]);
        usedEdges.set(key, (usedEdges.get(key) || 0) + 1);
        const pointKey = `${gridPoints[index].x},${gridPoints[index].y}`;
        usedPoints.set(pointKey, (usedPoints.get(pointKey) || 0) + 1);
      }
      for (let index = 1; index < points.length; index++) usedSegments.push([points[index - 1], points[index]]);
      const labelPoint = this._sceneRouteLabelPoint(points, obstacles, usedLabels);
      routes[connection.key] = { points, labelPoint, path: this._scenePolylinePath(points, connection.route !== "orthogonal" && connection.route !== "direct") };
    });
    return routes;
  }

  _sceneConnectionPath(connection, byKey, scene = {}) {
    return this._sceneConnectionRoutes([connection], byKey, scene)[connection.key]?.path || "";
  }

  _sceneNodeStyle(profile, node) {
    const style = this._flowElementSettings(profile, node.key);
    const parts = [`--scene-x:${Number(node.x)}%`, `--scene-y:${Number(node.y)}%`, `--scene-w:${Number(node.width)}px`, `--scene-h:${Number(node.height)}px`, `--scene-z:${Number(node.z_index || 20)}`, `--scene-name-size:${Math.max(6, Math.min(32, Number(style.name_size || 9)))}px`, `--scene-value-size:${Math.max(8, Math.min(56, Number(style.value_size || 18)))}px`, `--scene-unit-size:${Math.max(5, Math.min(28, Number(style.unit_size || 7)))}px`, `--scene-status-size:${Math.max(5, Math.min(28, Number(style.status_size || 7)))}px`, `--scene-name-weight:${style.name_bold === false ? 400 : 700}`, `--scene-value-weight:${style.value_bold === false ? 400 : 700}`, `--scene-unit-weight:${style.unit_bold ? 700 : 400}`, `--scene-status-weight:${style.status_bold ? 700 : 400}`];
    if (style.appearance_enabled) {
      const base = this._flowBaseColor(node.key);
      parts.push(`--scene-border:${this._safeColor(style.border_color, base)}`, `--scene-bg:${this._safeColor(style.background_color, "#020c18")}`, `--scene-icon:${this._safeColor(style.icon_color, base)}`, `--scene-name:${this._safeColor(style.name_color, "#eefaff")}`, `--scene-value:${this._safeColor(style.value_color, base)}`, `--scene-unit:${this._safeColor(style.unit_color, "#94b5c0")}`, `--scene-border-width:${Math.max(1, Math.min(8, Number(style.border_width || 1)))}px`, `--scene-radius:${Math.max(0, Math.min(100, Number(style.border_radius ?? 18)))}px`, `--scene-icon-size:${Math.max(10, Math.min(120, Number(style.icon_size || 32)))}px`);
    }
    return parts.join(";");
  }

  _flowDiagram(large = false, preview = false, layoutProfile = null, editMode = false) {
    const profile = layoutProfile || this._config.flow || {};
    const model = this._flowSceneModelFor(profile);
    const { scene, nodes, connections, byKey } = model;
    const title = this._esc((this._config.flow || {}).title || "PRZEPŁYW ENERGII — NA ŻYWO");
    const sceneStyle = `--scene-height:${Math.max(320, Math.min(1200, Number(scene.canvas_height || 620)))}px;--scene-grid:${Math.max(5, Math.min(80, Number(scene.grid_size || 20)))}px;--scene-canvas-bg:${this._safeColor(scene.background_color, "#020b16")};--scene-frame:${this._safeColor(scene.border_color, "#20eaff")};--scene-frame-width:${Math.max(0, Math.min(8, Number(scene.border_width ?? 1)))}px;--scene-frame-radius:${Math.max(0, Math.min(80, Number(scene.border_radius ?? 16)))}px`;
    const visibleConnections = connections.filter(item => item.visible !== false && byKey[item.from]?.visible !== false && byKey[item.to]?.visible !== false);
    const routes = this._sceneConnectionRoutes(visibleConnections, byKey, scene);
    const edgeHtml = visibleConnections.map(connection => {
      const direction = this._sceneConnectionState(connection);
      const color = direction.state === "forward" ? connection.forward_color : direction.state === "reverse" ? connection.reverse_color : direction.state === "idle" ? connection.idle_color : connection.unavailable_color;
      const path = routes[connection.key]?.path || "";
      const attrs = this._flowElementActionAttrs(profile, connection.key);
      return `<g class="scene-connection state-${direction.state} ${editMode && this._settingsSelectedKey === connection.key ? "selected" : ""}" data-scene-connection="${this._escAttr(connection.key)}" data-auto-kind="${this._escAttr(connection.automatic?.kind || "")}" data-auto-index="${this._escAttr(connection.automatic?.index ?? "")}" style="--connection-color:${this._safeColor(color, "#49616b")};--connection-width:${Math.max(1, Math.min(14, Number(connection.thickness || 4)))};--connection-speed:${Math.max(.2, Math.min(8, Number(connection.animation_speed || 1.2)))}s" ${attrs}><path class="scene-connection-hit" d="${path}"></path><path class="scene-connection-base" d="${path}"></path><path class="scene-connection-flow" d="${path}"></path></g>`;
    }).join("");
    const labelHtml = visibleConnections.filter(item => item.label_visible !== false).map(connection => {
      const labelPoint = routes[connection.key]?.labelPoint || { x: 500, y: 300 };
      const x = labelPoint.x / 10, y = labelPoint.y / 6;
      const reading = this._sceneConnectionReading(connection);
      return `<div class="scene-connection-label ${editMode && this._settingsSelectedKey === connection.key ? "selected" : ""}" data-scene-connection-label="${this._escAttr(connection.key)}" style="--label-x:${x}%;--label-y:${y}%;--label-offset-x:${Number(connection.label_x || 0)}px;--label-offset-y:${Number(connection.label_y || 0)}px;--label-color:${this._safeColor(connection.label_color, "#eefaff")};--label-bg:${this._safeColor(connection.label_background, "#010912")};--label-border:${this._safeColor(connection.label_border_color, "#20eaff")};--label-size:${Math.max(6, Math.min(24, Number(connection.label_size || 9)))}px;--label-weight:${connection.label_bold ? 700 : 400}"><b>${this._esc(connection.label)}</b><span>${reading.value == null ? "--" : this._kw(Math.abs(Number(reading.value)))}</span></div>`;
    }).join("");
    const nodeHtml = nodes.filter(node => node.visible !== false).map(node => {
      const isCore = ["home", "grid", "pv", "battery"].includes(node.key);
      let value = node.value != null ? node.value : `<span data-live="${this._escAttr(node.live || "")}">--</span>`;
      if (node.kind === "string") value = `<span data-flow-string-power="${node.index}">${this._esc(node.value)}</span>`;
      if (node.kind === "device") value = `<span data-flow-device-flow-power="${node.index}">${this._esc(node.value)}</span>`;
      const status = node.status ? `<small class="scene-node-status">${this._esc(node.status)}</small>` : node.extra ? `<small class="scene-node-status">${node.extra}</small>` : "";
      return `<div class="scene-node accent-${this._escAttr(node.accent || "cyan")} ${isCore ? "core" : "extra"} ${node.key === "home" ? "home" : ""} ${editMode ? "editable" : ""} ${editMode && this._settingsSelectedKey === node.key ? "selected" : ""}" data-scene-node="${this._escAttr(node.key)}" data-flow-layout-element="${this._escAttr(node.key)}" data-scene-locked="${node.locked ? "1" : "0"}" style="${this._sceneNodeStyle(profile, node)}" ${this._flowElementActionAttrs(profile, node.key)}>${this._flowElementIcon(profile, node.key, node.icon)}<b>${this._esc(this._flowElementName(profile, node.key, node.label))}</b><div class="scene-node-value"><strong>${value}</strong><span>${this._esc(node.unit || "")}</span></div>${status}${this._flowElementExtraFields(profile, node.key)}${editMode ? `<span class="scene-resize-handle" data-scene-resize="${this._escAttr(node.key)}"><ha-icon icon="mdi:resize-bottom-right"></ha-icon></span>` : ""}</div>`;
    }).join("");
    return `<div class="panel-title flow-title"><span>${title}</span><small>${editMode ? "EDYCJA NA ŻYWO" : "WARTOŚCI RZECZYWISTE"}</small></div><div class="flow-scene ${scene.show_grid === false ? "no-grid" : ""} ${editMode ? "editing" : ""}" data-flow-scene style="${sceneStyle}"><svg class="flow-scene-connections" viewBox="0 0 1000 600" preserveAspectRatio="none">${edgeHtml}</svg>${labelHtml}${nodeHtml}</div>`;
  }

  _flowDiagramLegacy(large = false, preview = false, layoutProfile = null) {
    const density = this._config.appearance?.flow_density || "comfortable";
    const flow = {
      title: "PRZEPŁYW ENERGII — NA ŻYWO", layout: "automatic", node_style: "rounded",
      animation_speed: "normal", show_pv_strings: true, show_devices: true, show_labels: true,
      show_values: true, show_status: true, show_connectors: true,
      hide_inactive_devices: false, max_pv_strings: 6, max_devices: 6, branch_gap: 12,
      ...(this._config.flow || {}),
    };
    const maxStrings = Math.max(0, Math.min(16, Number(flow.max_pv_strings) || 0));
    const maxDevices = Math.max(0, Math.min(24, Number(flow.max_devices) || 0));
    const branchGap = Math.max(4, Math.min(40, Number(flow.branch_gap) || 12));
    const showPv = this._showModule("pv");
    const showGrid = this._showModule("grid");
    const showBattery = this._showModule("battery");
    const showEv = this._showModule("ev");
    const showDevices = flow.show_devices !== false && this._config.features?.appliances !== false;

    const strings = showPv && flow.show_pv_strings !== false
      ? (this._config.pv_strings || []).map((item, index) => ({ item, index }))
        .filter(({ item }) => item.enabled !== false && item.show_in_flow !== false)
        .sort((a, b) => Number(a.item.flow_order ?? a.index) - Number(b.item.flow_order ?? b.index))
        .slice(0, maxStrings)
      : [];
    const devices = showDevices
      ? (this._config.devices || []).map((item, index) => ({ item, index }))
        .filter(({ item }) => item.enabled !== false && item.show_in_flow === true)
        .sort((a, b) => Number(a.item.flow_order ?? a.item.priority ?? a.index) - Number(b.item.flow_order ?? b.item.priority ?? b.index))
        .slice(0, maxDevices)
      : [];
    const sourceDevices = devices.filter(({ item }) => item.flow_direction === "source");
    const loadDevices = devices.filter(({ item }) => item.flow_direction !== "source");
    const hasSources = strings.length + sourceDevices.length > 0;
    const hasLoads = showEv || loadDevices.length > 0;
    const allowedAccents = new Set(["cyan", "green", "lime", "orange", "purple"]);

    const node = (cls, icon, title, liveKey, extra = "") => {
      const key = this._flowNodeKey(cls.replace(/-node$/, ""));
      return `<div class="flow-node ${cls}" data-flow-layout-element="${this._escAttr(key)}" style="${this._flowElementStyle(layoutProfile, key, "node")}" ${this._flowElementActionAttrs(layoutProfile, key)}>${this._flowElementIcon(layoutProfile, key, icon)}<b>${this._esc(this._flowElementName(layoutProfile, key, title))}</b><strong data-live="${liveKey}">--</strong><small>${extra || "kW"}</small>${this._flowElementExtraFields(layoutProfile, key)}</div>`;
    };
    const stringBranch = ({ item, index }) => {
      const runtime = this._pvStringRuntime(item, index);
      const label = item.flow_label || item.name || `String ${index + 1}`;
      const status = runtime.status || item.mppt || "PV";
      const active = Math.abs(Number(runtime.power || 0)) > 1;
      const nodeKey = this._flowNodeKey(`string_${item.id || index + 1}`);
      const wireKey = this._flowNodeKey(`wire_${nodeKey}`);
      return `<div class="flow-branch source-branch accent-green ${active ? "is-active" : "is-idle"}" data-flow-string-branch="${index}">
        <div class="flow-extra-node" data-flow-layout-element="${this._escAttr(nodeKey)}" style="${this._flowElementStyle(layoutProfile, nodeKey, "extra-node")}" ${this._flowElementActionAttrs(layoutProfile, nodeKey)}>${this._flowElementIcon(layoutProfile, nodeKey, item.flow_icon || "mdi:solar-panel-large")}<b>${this._esc(this._flowElementName(layoutProfile, nodeKey, label))}</b><div class="flow-extra-value"><strong data-flow-string-power="${index}">${this._kw(runtime.power)}</strong><span>kW</span></div><small data-flow-string-status="${index}">${this._esc(status)}</small>${this._flowElementExtraFields(layoutProfile, nodeKey)}</div>
        <span class="branch-wire" data-flow-extra-link="string-${index}" data-flow-layout-element="${this._escAttr(wireKey)}" style="${this._flowElementStyle(layoutProfile, wireKey, "wire")}" ${this._flowElementActionAttrs(layoutProfile, wireKey)}><i></i></span>
      </div>`;
    };
    const deviceBranch = ({ item, index }, source = false) => {
      const runtime = this._deviceRuntime(item, index);
      const label = item.flow_label || item.name || `Urządzenie ${index + 1}`;
      const status = runtime.cycle_state || runtime.status || item.area || runtime.description || "Urządzenie";
      const accent = allowedAccents.has(item.accent) ? item.accent : "cyan";
      const active = runtime.power != null && Math.abs(Number(runtime.power)) >= Number(item.active_threshold_w ?? 10);
      const bidirectional = item.flow_direction === "bidirectional";
      const nodeKey = this._flowNodeKey(`device_${item.id || index + 1}`);
      const wireKey = this._flowNodeKey(`wire_${nodeKey}`);
      return `<div class="flow-branch ${source ? "source-branch" : "load-branch"} accent-${accent} ${active ? "is-active" : "is-idle"} ${flow.hide_inactive_devices ? "hidden-when-idle" : ""}" data-flow-device-branch="${index}" data-flow-direction="${this._escAttr(item.flow_direction || "consumer")}">
        ${source ? "" : `<span class="branch-wire ${bidirectional ? "bidirectional" : ""}" data-flow-extra-link="device-${index}" data-flow-layout-element="${this._escAttr(wireKey)}" style="${this._flowElementStyle(layoutProfile, wireKey, "wire")}" ${this._flowElementActionAttrs(layoutProfile, wireKey)}><i></i></span>`}
        <div class="flow-extra-node" data-flow-layout-element="${this._escAttr(nodeKey)}" style="${this._flowElementStyle(layoutProfile, nodeKey, "extra-node")}" ${this._flowElementActionAttrs(layoutProfile, nodeKey)}>${this._flowElementIcon(layoutProfile, nodeKey, item.icon || "mdi:flash")}<b>${this._esc(this._flowElementName(layoutProfile, nodeKey, label))}</b><div class="flow-extra-value"><strong data-flow-device-flow-power="${index}">${this._kw(runtime.power == null ? null : Math.abs(Number(runtime.power)))}</strong><span>kW</span></div><small data-flow-device-status="${index}">${this._esc(status)}</small>${this._flowElementExtraFields(layoutProfile, nodeKey)}</div>
        ${source ? `<span class="branch-wire" data-flow-extra-link="device-${index}" data-flow-layout-element="${this._escAttr(wireKey)}" style="${this._flowElementStyle(layoutProfile, wireKey, "wire")}" ${this._flowElementActionAttrs(layoutProfile, wireKey)}><i></i></span>` : ""}
      </div>`;
    };
    const evBranch = showEv ? `<div class="flow-branch load-branch accent-cyan" data-flow-core-branch="ev">
      <span class="branch-wire" data-flow-extra-link="ev" data-flow-layout-element="wire_ev" style="${this._flowElementStyle(layoutProfile, "wire_ev", "wire")}" ${this._flowElementActionAttrs(layoutProfile, "wire_ev")}><i></i></span>
      <div class="flow-extra-node" data-flow-layout-element="ev" style="${this._flowElementStyle(layoutProfile, "ev", "extra-node")}" ${this._flowElementActionAttrs(layoutProfile, "ev")}>${this._flowElementIcon(layoutProfile, "ev", "mdi:car-electric")}<b>${this._esc(this._flowElementName(layoutProfile, "ev", "EV"))}</b><div class="flow-extra-value"><strong data-live="ev">--</strong><span>kW</span></div><small><span data-live="evSoc">--</span>% SOC</small>${this._flowElementExtraFields(layoutProfile, "ev")}</div>
    </div>` : "";
    const sourceBranches = `${strings.map(stringBranch).join("")}${sourceDevices.map(item => deviceBranch(item, true)).join("")}`;
    const loadBranches = `${evBranch}${loadDevices.map(item => deviceBranch(item, false)).join("")}`;
    const classes = [
      large ? "large" : "", preview ? "preview" : "", `density-${density}`,
      `layout-${flow.layout || "automatic"}`, `node-style-${flow.node_style || "rounded"}`,
      `speed-${flow.animation_speed || "normal"}`, hasSources ? "with-sources" : "no-sources",
      hasLoads ? "with-loads" : "no-loads", showPv ? "with-pv" : "no-pv",
      flow.show_labels === false ? "hide-labels" : "",
      flow.show_values === false ? "hide-values" : "", flow.show_status === false ? "hide-status" : "",
      flow.show_connectors === false ? "hide-connectors" : "",
    ].filter(Boolean).join(" ");

    return `<div class="panel-title flow-title"><span>${this._esc(flow.title || "PRZEPŁYW ENERGII — NA ŻYWO")}</span><small>${preview ? "Podgląd konfiguracji" : "Wartości rzeczywiste"}</small></div>
      <div class="flow-canvas flow-canvas-v4 ${classes}" style="--branch-gap:${branchGap}px">
        <div class="flow-grid flow-grid-v4">
          ${hasSources ? `<div class="flow-branch-bus source-bus"><span class="branch-bus-line" data-flow-layout-element="bus_sources" style="${this._flowElementStyle(layoutProfile, "bus_sources", "bus")}" ${this._flowElementActionAttrs(layoutProfile, "bus_sources")}></span>${sourceBranches}</div><div class="flow-link vertical source-link" data-flow-link="sources" data-flow-layout-element="link_sources" style="${this._flowElementStyle(layoutProfile, "link_sources", "link")}" ${this._flowElementActionAttrs(layoutProfile, "link_sources")}><i></i><span data-flow-layout-element="label_sources" style="${this._flowElementStyle(layoutProfile, "label_sources", "label")}" ${this._flowElementActionAttrs(layoutProfile, "label_sources")}>ŹRÓDŁA</span></div>` : ""}
          ${showPv ? node("pv-node", "mdi:solar-power", "PV", "pv") : ""}
          ${showPv ? `<div class="flow-link vertical pv-link forward" data-flow-link="pv" data-flow-layout-element="link_pv" style="${this._flowElementStyle(layoutProfile, "link_pv", "link")}" ${this._flowElementActionAttrs(layoutProfile, "link_pv")}><i></i><span data-live="pv" data-flow-layout-element="label_pv" style="${this._flowElementStyle(layoutProfile, "label_pv", "label")}" ${this._flowElementActionAttrs(layoutProfile, "label_pv")}>--</span></div>` : ""}
          ${showGrid ? node("grid-node", "mdi:transmission-tower", "SIEĆ", "gridSigned") : ""}
          ${showGrid ? `<div class="flow-link horizontal grid-link bidirectional" data-flow-link="grid" data-flow-layout-element="link_grid" style="${this._flowElementStyle(layoutProfile, "link_grid", "link")}" ${this._flowElementActionAttrs(layoutProfile, "link_grid")}><i></i><span data-live="gridFlow" data-flow-layout-element="label_grid" style="${this._flowElementStyle(layoutProfile, "label_grid", "label")}" ${this._flowElementActionAttrs(layoutProfile, "label_grid")}>--</span></div>` : ""}
          ${node("home-node", "mdi:home-lightning-bolt-outline", "DOM", "home")}
          ${showBattery ? `<div class="flow-link horizontal battery-link bidirectional" data-flow-link="battery" data-flow-layout-element="link_battery" style="${this._flowElementStyle(layoutProfile, "link_battery", "link")}" ${this._flowElementActionAttrs(layoutProfile, "link_battery")}><i></i><span data-live="batteryFlow" data-flow-layout-element="label_battery" style="${this._flowElementStyle(layoutProfile, "label_battery", "label")}" ${this._flowElementActionAttrs(layoutProfile, "label_battery")}>--</span></div>` : ""}
          ${showBattery ? node("battery-node", "mdi:battery-charging-high", "MAGAZYN", "battery", `<span data-live="batterySoc">--</span>% · kW`) : ""}
          ${hasLoads ? `<div class="flow-link vertical loads-link" data-flow-link="loads" data-flow-layout-element="link_loads" style="${this._flowElementStyle(layoutProfile, "link_loads", "link")}" ${this._flowElementActionAttrs(layoutProfile, "link_loads")}><i></i><span data-flow-layout-element="label_loads" style="${this._flowElementStyle(layoutProfile, "label_loads", "label")}" ${this._flowElementActionAttrs(layoutProfile, "label_loads")}>ODBIORNIKI</span></div><div class="flow-branch-bus load-bus"><span class="branch-bus-line" data-flow-layout-element="bus_loads" style="${this._flowElementStyle(layoutProfile, "bus_loads", "bus")}" ${this._flowElementActionAttrs(layoutProfile, "bus_loads")}></span>${loadBranches}</div>` : ""}
        </div>
      </div>`;
  }

  _moduleConfigured(module) {
    const mappings = this._config?.mappings || {};
    const roleKeys = ROLE_DEFS.filter(role => role[3] === module).map(role => role[0]);
    if (module === "pv" && (this._config?.pv_strings || []).some(item => item.enabled !== false)) return true;
    if (module === "appliances") return (this._config?.devices || []).some(item => item.enabled !== false);
    if (module === "prices" && this._config?.tariff?.enabled) return true;
    return roleKeys.some(key => Boolean(mappings[key]));
  }

  _showModule(module) {
    if (module === "home") return true;
    if (!this._config?.features?.[module]) return false;
    return this._config?.appearance?.show_unconfigured_cards !== false || this._moduleConfigured(module);
  }

  _metric(key, icon, label, accent, unit = "kW") {
    return `<article class="metric-card ${accent}"><ha-icon icon="${icon}"></ha-icon><div><small>${label}</small><strong data-live="${key}">--</strong><span>${unit}</span></div><svg viewBox="0 0 100 30" preserveAspectRatio="none"><path data-spark="${key === "batterySoc" || key === "ev" ? "home" : key}" class="spark ${accent}" d=""></path></svg></article>`;
  }

  _overviewBubble(item, index) {
    const value = this._widgetValue(item);
    const secondary = item.show_secondary ? this._widgetValue(item, "secondary") : null;
    const related = (Array.isArray(item.related_entities) ? item.related_entities : [])
      .map((relatedItem, relatedIndex) => ({ item: relatedItem, relatedIndex }))
      .filter(({ item: relatedItem }) => relatedItem.enabled !== false && relatedItem.entity_id);
    const presentation = this._bubblePresentation(item, value.numeric);
    const color = presentation.color;
    const background = this._safeColor(item.background_color, "#031426");
    const borderColor = this._safeColor(item.border_color, color);
    const iconColor = this._safeColor(item.icon_color, color);
    const nameColor = this._safeColor(item.name_color, "#8eb5c3");
    const valueColor = this._safeColor(item.value_color, color);
    const unitColor = this._safeColor(item.unit_color, "#8eb3c0");
    const descriptionColor = this._safeColor(item.description_color, "#6e96a5");
    const secondaryColor = this._safeColor(item.secondary_color, valueColor);
    const secondaryLabelColor = this._safeColor(item.secondary_label_color, "#88afbd");
    const secondaryUnitColor = this._safeColor(item.secondary_unit_color, unitColor);
    const borderWidth = Math.max(1, Math.min(6, Number(item.border_width || 1)));
    const borderRadius = Math.max(0, Math.min(40, Number(item.border_radius ?? 14)));
    const iconSize = Math.max(12, Math.min(48, Number(item.icon_size || 22)));
    const nameSize = Math.max(6, Math.min(32, Number(item.name_size || 10)));
    const valueSize = Math.max(12, Math.min(48, Number(item.value_size || 24)));
    const unitSize = Math.max(6, Math.min(28, Number(item.unit_size || 9)));
    const descriptionSize = Math.max(6, Math.min(24, Number(item.description_size || 8)));
    const secondaryValueSize = Math.max(7, Math.min(28, Number(item.secondary_value_size || 11)));
    const padding = Math.max(4, Math.min(28, Number(item.padding || 13)));
    const textAlign = ["left", "center", "right"].includes(item.text_align) ? item.text_align : "left";
    const key = `bubble:${item.id || index}`;
    const icon = item.icon_type === "emoji" ? `<span class="bubble-emoji" aria-hidden="true">${this._esc(item.emoji || "⚡")}</span>` : `<ha-icon icon="${this._escAttr(item.icon || "mdi:information-outline")}"></ha-icon>`;
    return `<article class="metric-card custom-bubble bubble-align-${textAlign} ${presentation.alert ? "bubble-alert" : ""} ${item.tap_action && item.tap_action !== "none" ? "actionable" : ""}" style="--bubble-color:${color};--bubble-bg:${background};--bubble-border-color:${borderColor};--bubble-border-width:${borderWidth}px;--bubble-radius:${borderRadius}px;--bubble-icon-color:${iconColor};--bubble-name-color:${nameColor};--bubble-value-color:${valueColor};--bubble-unit-color:${unitColor};--bubble-description-color:${descriptionColor};--bubble-secondary-color:${secondaryColor};--bubble-secondary-label-color:${secondaryLabelColor};--bubble-secondary-unit-color:${secondaryUnitColor};--bubble-icon-size:${iconSize}px;--bubble-name-size:${nameSize}px;--bubble-value-size:${valueSize}px;--bubble-unit-size:${unitSize}px;--bubble-description-size:${descriptionSize}px;--bubble-name-weight:${item.name_bold ? 700 : 400};--bubble-value-weight:${item.value_bold === false ? 400 : 700};--bubble-unit-weight:${item.unit_bold ? 700 : 400};--bubble-description-weight:${item.description_bold ? 700 : 400};--bubble-secondary-value-size:${secondaryValueSize}px;--bubble-padding:${padding}px;--alert-color:${this._safeColor(item.alert_color, "#ff335f")}" data-overview-bubble="${index}" data-widget-action="bubble" data-widget-index="${index}" tabindex="${item.tap_action && item.tap_action !== "none" ? "0" : "-1"}">
      ${item.show_icon === false ? "" : icon}
      <div class="custom-bubble-copy">${item.show_name === false ? "" : `<small>${this._esc(item.name || `Dymek ${index + 1}`)}</small>`}<div><strong data-overview-bubble-value="${index}">${this._esc(value.formatted)}</strong>${item.show_unit === false ? "" : `<span data-overview-bubble-unit="${index}">${this._esc(value.unit)}</span>`}</div>${secondary ? `<div class="bubble-secondary"><small>${this._esc(item.secondary_name || "Dodatkowo")}</small><b data-overview-bubble-secondary="${index}">${this._esc(secondary.formatted)}</b><span data-overview-bubble-secondary-unit="${index}">${this._esc(secondary.unit)}</span></div>` : ""}${related.length ? `<div class="bubble-related-list">${related.map(({ item: relatedItem, relatedIndex }) => { const relatedValue = this._widgetValue(relatedItem); const relatedColor = this._safeColor(relatedItem.color, color); const relatedLabelColor = this._safeColor(relatedItem.label_color, "#7195a2"); const relatedUnitColor = this._safeColor(relatedItem.unit_color, "#7898a4"); const relatedValueSize = Math.max(7, Math.min(24, Number(relatedItem.value_size || 10))); return `<div class="bubble-related-value" style="--related-color:${relatedColor};--related-label-color:${relatedLabelColor};--related-unit-color:${relatedUnitColor};--related-value-size:${relatedValueSize}px"><small>${this._esc(relatedItem.name || `Encja ${relatedIndex + 1}`)}</small><b data-overview-bubble-related="${index}:${relatedIndex}">${this._esc(relatedValue.formatted)}</b><span data-overview-bubble-related-unit="${index}:${relatedIndex}">${this._esc(relatedValue.unit)}</span></div>`; }).join("")}</div>` : ""}${item.description && item.show_description !== false ? `<p>${this._esc(item.description)}</p>` : ""}</div>
      ${presentation.alert ? `<span class="bubble-alert-label" data-overview-bubble-alert="${index}">${this._esc(item.alert_text || "ALARM")}</span>` : ""}
      ${item.show_sparkline === false ? "" : `<svg viewBox="0 0 100 30" preserveAspectRatio="none"><path data-custom-spark="${this._escAttr(key)}" class="spark" d=""></path></svg>`}
    </article>`;
  }

  _overviewChart(item, index) {
    const series = this._chartSeries(item);
    const value = this._widgetValue(series[0]);
    const color = this._safeColor(item.color, "#20eaff");
    const graphType = ["line", "area", "bar"].includes(item.graph_type) ? item.graph_type : "line";
    const height = ["small", "medium", "large"].includes(item.height) ? item.height : "medium";
    const lineWidth = Math.max(1, Math.min(8, Number(item.line_width || 2)));
    const rangeLabel = ({ session:"Bieżąca sesja", "24h":"Ostatnie 24 godziny", "7d":"Ostatnie 7 dni", "30d":"Ostatnie 30 dni" })[item.history_range || "session"];
    return `<article class="panel custom-overview-chart chart-${height} graph-${graphType} ${item.tap_action && item.tap_action !== "none" ? "actionable" : ""}" style="--chart-color:${color};--chart-line-width:${lineWidth}" data-overview-chart="${index}" data-widget-action="chart" data-widget-index="${index}" tabindex="${item.tap_action && item.tap_action !== "none" ? "0" : "-1"}">
      <div class="custom-chart-head"><div><ha-icon icon="${this._escAttr(item.icon || "mdi:chart-line")}"></ha-icon><span><b>${this._esc(item.name || `Wykres ${index + 1}`)}</b>${item.description ? `<small>${this._esc(item.description)}</small>` : ""}</span></div>${item.show_current === false ? "" : `<strong><span data-overview-chart-value="${index}">${this._esc(value.formatted)}</span><small data-overview-chart-unit="${index}">${this._esc(value.unit)}</small></strong>`}</div>
      ${series.length > 1 ? `<div class="chart-series-legend">${series.map((seriesItem, seriesIndex) => { const seriesValue = this._widgetValue(seriesItem); const seriesColor = this._safeColor(seriesItem.color, color); return `<div style="--series-color:${seriesColor}"><i></i><span>${this._esc(seriesItem.name || `Seria ${seriesIndex + 1}`)}</span><b data-overview-chart-series-value="${index}:${seriesIndex}">${this._esc(seriesValue.formatted)}</b><small data-overview-chart-series-unit="${index}:${seriesIndex}">${this._esc(seriesValue.unit)}</small></div>`; }).join("")}</div>` : ""}
      <svg viewBox="0 0 400 160" preserveAspectRatio="none"><path class="gridline" d="M0 25H400 M0 65H400 M0 105H400 M0 145H400"></path>${series.map((seriesItem, seriesIndex) => `<path data-custom-chart="${this._escAttr(this._chartSessionKey(item, index, seriesIndex))}" data-chart-index="${index}" data-series-index="${seriesIndex}" data-graph-type="${graphType}" style="--series-color:${this._safeColor(seriesItem.color, color)}" class="custom-chart-path" d=""></path>`).join("")}</svg>
      <div class="custom-chart-foot"><small>${this._esc(rangeLabel)}</small>${item.show_min_max === false ? "" : `<span>MIN <b data-overview-chart-min="${index}">--</b> · MAX <b data-overview-chart-max="${index}">--</b> <i data-overview-chart-minmax-unit="${index}">${this._esc(value.unit)}</i></span>`}</div>
    </article>`;
  }

  _chartSeries(item) {
    const primary = { ...item, _seriesId: "primary" };
    const additional = (Array.isArray(item?.series) ? item.series : [])
      .map((seriesItem, sourceIndex) => ({ ...item, ...seriesItem, history_range: item.history_range, points: item.points, _seriesId: seriesItem.id || `series_${sourceIndex + 1}`, _sourceIndex: sourceIndex }))
      .filter(seriesItem => seriesItem.enabled !== false && seriesItem.entity_id);
    return [primary, ...additional];
  }

  _chartSeriesItem(item, seriesIndex = 0) {
    return this._chartSeries(item)[seriesIndex] || this._chartSeries(item)[0];
  }

  _widgetValue(item, prefix = "") {
    const key = name => prefix ? `${prefix}_${name}` : name;
    const entityId = item?.[key("entity_id")];
    const attribute = item?.[key("attribute")];
    const state = entityId ? this._hass?.states?.[entityId] : null;
    let raw = state?.state;
    if (attribute) raw = String(attribute).split(".").reduce((value, part) => value == null ? undefined : value[part], state?.attributes);
    if (raw == null || ["unknown", "unavailable", "none", ""].includes(String(raw).toLowerCase())) {
      return { numeric: null, formatted: "--", unit: item?.[key("unit")] || (attribute ? "" : state?.attributes?.unit_of_measurement || "") };
    }
    const sourceNumber = Number(raw);
    const multiplier = Number(item?.[key("multiplier")] ?? 1);
    const numeric = Number.isFinite(sourceNumber) ? sourceNumber * (Number.isFinite(multiplier) ? multiplier : 1) : null;
    const decimals = Math.max(0, Math.min(6, Number(item?.[key("decimals")] ?? 1)));
    let formatted;
    if (numeric != null) formatted = numeric.toFixed(decimals);
    else if (typeof raw === "object") {
      try { formatted = JSON.stringify(raw); } catch (_) { formatted = String(raw); }
    } else formatted = String(raw);
    const unit = item?.[key("unit")] || (attribute ? "" : state?.attributes?.unit_of_measurement || "");
    return { numeric, formatted, unit };
  }

  _bubblePresentation(item, numeric) {
    let color = this._safeColor(item.color, "#20eaff");
    if (numeric == null) color = this._safeColor(item.unavailable_color, "#6d7d86");
    else if (item.color_mode === "threshold") {
      const low = Number(item.low_threshold ?? 0), high = Number(item.high_threshold ?? 100);
      color = numeric < low ? this._safeColor(item.low_color, "#008cff") : numeric > high ? this._safeColor(item.high_color, "#ff4d6d") : this._safeColor(item.normal_color, color);
    }
    let alert = false;
    if (item.alert_enabled && numeric != null) {
      const low = Number(item.alert_low ?? 0), high = Number(item.alert_high ?? 100);
      alert = item.alert_condition === "below" ? numeric < low : item.alert_condition === "outside" ? numeric < low || numeric > high : numeric > high;
    }
    return { color, alert };
  }

  _safeColor(value, fallback) {
    const candidate = String(value || fallback).trim();
    return /^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(candidate) ? candidate : fallback;
  }

  _detailCard(key, label, icon, accent, unit = "kW") {
    return `<div class="detail-card ${accent}"><ha-icon icon="${icon}"></ha-icon><div><small>${label}</small><strong data-live="${key}">--</strong><span>${unit}</span></div></div>`;
  }

  _trendPanel(key, title, accent) {
    return `<article class="panel trend-panel"><div class="panel-title"><span>${title}</span><strong data-live="${key}">-- kW</strong></div><svg viewBox="0 0 400 150" preserveAspectRatio="none"><path class="gridline" d="M0 30H400 M0 75H400 M0 120H400"></path><path data-spark="${key}" class="spark ${accent}" d=""></path></svg><small>Próbki z bieżącej sesji panelu</small></article>`;
  }

  _gaugePanel(key, title, icon) {
    return `<article class="panel gauge-panel"><div class="panel-title"><span>${title}</span><ha-icon icon="${icon}"></ha-icon></div><div class="gauge" data-gauge="${key}" style="--value:0"><div><strong data-live="${key}">--</strong><span>%</span></div></div><p data-gauge-status="${key}">Brak danych</p></article>`;
  }

  _saveBar(disabled = "") {
    if (!this._isAdmin()) return "";
    return `<div class="save-actions"><button class="secondary-btn" data-action="export-config" ${disabled}><ha-icon icon="mdi:export-variant"></ha-icon>EKSPORT</button><label class="secondary-btn file-btn"><ha-icon icon="mdi:import"></ha-icon>IMPORT<input type="file" accept="application/json" data-action="import-config" ${disabled}></label><button class="primary-btn" data-action="save-config" ${disabled}><ha-icon icon="mdi:content-save-outline"></ha-icon>ZAPISZ ZMIANY</button></div>`;
  }

  _field(path, label, value, placeholder = "", disabled = "", liveRerender = false) {
    return `<label class="field"><span>${label}</span><input type="text" data-path="${path}" value="${this._escAttr(value ?? "")}" placeholder="${this._escAttr(placeholder)}" ${liveRerender ? 'data-live-rerender="1"' : ""} ${disabled}></label>`;
  }

  _colorField(path, label, value, disabled = "") {
    const color = this._safeColor(value, "#20eaff").slice(0, 7);
    return `<label class="field color-field"><span>${label}</span><span class="color-input-wrap"><input type="color" data-path="${path}" data-live-rerender="1" value="${color}" ${disabled}><code>${this._esc(color.toUpperCase())}</code></span></label>`;
  }

  _textarea(path, label, value, placeholder = "", disabled = "") {
    return `<label class="field full"><span>${label}</span><textarea data-path="${path}" placeholder="${this._escAttr(placeholder)}" ${disabled}>${this._esc(value ?? "")}</textarea></label>`;
  }

  _numberField(path, label, value, min, max, step, disabled = "", liveRerender = false) {
    return `<label class="field"><span>${label}</span><input type="number" data-path="${path}" value="${this._escAttr(value ?? 0)}" min="${min}" max="${max}" step="${step}" ${liveRerender ? 'data-live-rerender="1"' : ""} ${disabled}></label>`;
  }

  _selectField(path, label, value, options, disabled = "", liveRerender = false) {
    return `<label class="field"><span>${label}</span><select data-path="${path}" ${liveRerender ? 'data-live-rerender="1"' : ""} ${disabled}>${options.map(([v, l]) => `<option value="${this._escAttr(v)}" ${String(value) === String(v) ? "selected" : ""}>${this._esc(l)}</option>`).join("")}</select></label>`;
  }

  _entityField(path, label, value, description, disabled = "", filter = "any") {
    const state = value ? this._hass?.states?.[value] : null;
    const friendly = state?.attributes?.friendly_name || value || "Wybierz encję Home Assistant";
    const formatted = state ? this._formatState(state) : value ? "Encja nie istnieje lub jest wyłączona" : "Nie wybrano";
    const statusClass = !value ? "empty" : state && !["unknown", "unavailable"].includes(state.state) ? "ok" : "bad";
    return `<div class="field entity-field">
      <span>${label}</span>
      <button type="button" class="entity-picker-button ${statusClass}" data-action="open-entity-picker" data-path="${this._escAttr(path)}" data-label="${this._escAttr(label)}" data-filter="${this._escAttr(filter)}" ${disabled}>
        <ha-icon icon="${state ? this._entityIcon(value) : "mdi:magnify"}"></ha-icon>
        <span class="entity-picker-copy"><b>${this._esc(friendly)}</b><small>${this._esc(value || "Kliknij, aby wyszukać encję")}</small></span>
        <span class="entity-state-chip">${this._esc(formatted)}</span>
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </button>
      <small>${description}</small>
    </div>`;
  }

  _renderBubbleRelatedEditor(item, bubbleIndex, disabled = "", editorPath = "") {
    const related = Array.isArray(item.related_entities) ? item.related_entities : [];
    const cards = related.map((relatedItem, relatedIndex) => {
      const base = editorPath ? `${editorPath}.related_entities.${relatedIndex}` : `overview_bubbles.${bubbleIndex}.related_entities.${relatedIndex}`;
      return `<article class="widget-related-card">
        <div class="widget-related-head"><b>ENCJA POWIĄZANA ${relatedIndex + 1}</b><button class="danger-link" data-action="${editorPath ? "remove-bubble-editor-related" : "remove-bubble-related"}" data-index="${bubbleIndex}" data-related-index="${relatedIndex}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div>
        <div class="widget-related-grid">
          ${this._field(`${base}.name`, "Nazwa", relatedItem.name, "Np. Prąd", disabled)}
          ${this._field(`${base}.attribute`, "Atrybut", relatedItem.attribute, "Opcjonalnie", disabled)}
          <div class="full">${this._entityField(`${base}.entity_id`, "Encja", relatedItem.entity_id, "Dodatkowa wartość wyświetlana w tym samym dymku.", disabled, "any")}</div>
          ${this._field(`${base}.unit`, "Jednostka", relatedItem.unit, "Puste = z encji", disabled)}
          ${this._numberField(`${base}.decimals`, "Precyzja", relatedItem.decimals, 0, 6, 1, disabled)}
          ${this._numberField(`${base}.multiplier`, "Mnożnik", relatedItem.multiplier, -1000000, 1000000, 0.001, disabled)}
          ${this._colorField(`${base}.color`, "Kolor", relatedItem.color || item.color, disabled)}
          ${this._colorField(`${base}.label_color`, "Kolor nazwy", relatedItem.label_color || "#7195a2", disabled)}
          ${this._colorField(`${base}.unit_color`, "Kolor jednostki", relatedItem.unit_color || "#7898a4", disabled)}
          ${this._numberField(`${base}.value_size`, "Rozmiar wartości (px)", relatedItem.value_size || 10, 7, 24, 1, disabled, true)}
          <label class="check-row"><input type="checkbox" data-path="${base}.enabled" data-live-rerender="1" ${relatedItem.enabled !== false ? "checked" : ""} ${disabled}><span><b>Widoczna</b><small>Pokaż w dymku.</small></span></label>
        </div>
      </article>`;
    }).join("");
    return `<div class="widget-subsection full"><b>ENCJE POWIĄZANE W DYMKU</b><small>Do 8 dodatkowych stanów w jednym dymku, każdy z własną nazwą, jednostką, kolorem i mnożnikiem.</small></div>
      <div class="widget-related-list full">${cards || `<div class="mini-empty">Brak dodatkowych encji w tym dymku.</div>`}<button class="secondary-btn add-related-btn" data-action="${editorPath ? "add-bubble-editor-related" : "add-bubble-related"}" data-index="${bubbleIndex}" ${related.length >= 8 ? "disabled" : disabled}><ha-icon icon="mdi:plus"></ha-icon>DODAJ ENCJĘ DO DYMKU (${related.length}/8)</button></div>`;
  }

  _renderChartSeriesEditor(item, chartIndex, disabled = "") {
    const series = Array.isArray(item.series) ? item.series : [];
    const cards = series.map((seriesItem, seriesIndex) => {
      const base = `overview_charts.${chartIndex}.series.${seriesIndex}`;
      return `<article class="widget-related-card chart-series-editor">
        <div class="widget-related-head"><b>SERIA ${seriesIndex + 2}</b><button class="danger-link" data-action="remove-chart-series" data-index="${chartIndex}" data-series-index="${seriesIndex}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div>
        <div class="widget-related-grid">
          ${this._field(`${base}.name`, "Nazwa serii", seriesItem.name, `Seria ${seriesIndex + 2}`, disabled)}
          ${this._field(`${base}.attribute`, "Atrybut", seriesItem.attribute, "Opcjonalnie", disabled)}
          <div class="full">${this._entityField(`${base}.entity_id`, "Encja", seriesItem.entity_id, "Seria zostanie narysowana na wspólnej osi czasu.", disabled, "any")}</div>
          ${this._field(`${base}.unit`, "Jednostka", seriesItem.unit, "Puste = z encji", disabled)}
          ${this._numberField(`${base}.decimals`, "Precyzja", seriesItem.decimals, 0, 6, 1, disabled)}
          ${this._numberField(`${base}.multiplier`, "Mnożnik", seriesItem.multiplier, -1000000, 1000000, 0.001, disabled)}
          ${this._colorField(`${base}.color`, "Kolor serii", seriesItem.color || "#52ff62", disabled)}
          <label class="check-row"><input type="checkbox" data-path="${base}.enabled" data-live-rerender="1" ${seriesItem.enabled !== false ? "checked" : ""} ${disabled}><span><b>Widoczna</b><small>Pokaż na wykresie.</small></span></label>
        </div>
      </article>`;
    }).join("");
    return `<div class="widget-subsection full"><b>POWIĄZANE SERIE NA JEDNYM WYKRESIE</b><small>Do 8 dodatkowych encji z osobnymi kolorami. Wszystkie korzystają z tego samego zakresu historii.</small></div>
      <div class="widget-related-list full">${cards || `<div class="mini-empty">Wykres zawiera tylko serię główną.</div>`}<button class="secondary-btn add-related-btn" data-action="add-chart-series" data-index="${chartIndex}" ${series.length >= 8 ? "disabled" : disabled}><ha-icon icon="mdi:chart-multiple"></ha-icon>DODAJ SERIĘ (${series.length}/8)</button></div>`;
  }

  _renderBubbleEditor() {
    const editor = this._bubbleEditor;
    const viewport = this._bubbleEditorViewport;
    const item = editor?.draft;
    if (!item) return "";
    const base = "bubble_editor";
    const iconType = item.icon_type === "emoji" ? "emoji" : "mdi";
    return `<div class="bubble-editor-modal" data-action="cancel-bubble-editor">
      <section class="bubble-editor-dialog" role="dialog" aria-modal="true" aria-label="${editor.isNew ? "Dodawanie" : "Edycja"} dymku">
        <header class="bubble-editor-head">
          <div><span class="eyebrow">WIDŻETY · DYMEK</span><h2>${editor.isNew ? "Dodaj nowy dymek" : `Edytuj: ${this._esc(item.name || "Dymek")}`}</h2><small>Zmiany pozostają w szkicu do kliknięcia ZAPISZ DYMEK.</small></div>
          <button class="icon-close" data-action="cancel-bubble-editor" title="Anuluj"><ha-icon icon="mdi:close"></ha-icon></button>
        </header>
        <div class="bubble-editor-layout">
          <aside class="bubble-editor-preview"><span>PODGLĄD NA ŻYWO</span><div class="metrics-grid dynamic">${this._overviewBubble(item, -1)}</div><small>Emoji wklejasz bezpośrednio jako tekst — bez adresu obrazu.</small></aside>
          <div class="bubble-editor-body">
            <div class="widget-subsection full"><b>DANE GŁÓWNE</b><small>Wybierz encję, nazwę i sposób prezentacji wartości.</small></div>
            <div class="bubble-editor-grid">
              ${this._field(`${base}.name`, "Nazwa", item.name, "Np. Dom", "", true)}
              ${this._field(`${base}.description`, "Opis", item.description, "Tekst pod wartością", "", true)}
              <div class="full">${this._entityField(`${base}.entity_id`, "Encja", item.entity_id, "Główna wartość dymku.", "", "any")}</div>
              ${this._field(`${base}.attribute`, "Atrybut encji", item.attribute, "Opcjonalnie")}
              ${this._field(`${base}.unit`, "Własna jednostka", item.unit, "Puste = z encji", "", true)}
              ${this._numberField(`${base}.decimals`, "Miejsca dziesiętne", item.decimals ?? 1, 0, 6, 1)}
              ${this._numberField(`${base}.multiplier`, "Mnożnik", item.multiplier ?? 1, -1000000, 1000000, 0.001)}
              ${this._numberField(`${base}.order`, "Kolejność", item.order ?? 1, 0, 10000, 1)}
            </div>

            <div class="widget-subsection full"><b>IKONA LUB EMOJI</b><small>Wklej zwykłe emoji albo wybierz ikonę MDI. Link do obrazu nie jest potrzebny.</small></div>
            <div class="bubble-editor-grid">
              ${this._selectField(`${base}.icon_type`, "Typ", iconType, [["mdi","Ikona MDI"],["emoji","Emoji"]], "", true)}
              <div data-bubble-icon-mode="mdi" ${iconType === "emoji" ? "hidden" : ""}>${this._field(`${base}.icon`, "Ikona MDI", item.icon || "mdi:information-outline", "mdi:home", "", true)}</div>
              <div data-bubble-icon-mode="emoji" ${iconType === "emoji" ? "" : "hidden"}>${this._field(`${base}.emoji`, "Wklej emoji", item.emoji || "⚡", "Np. 🏠 🔋 ☀️ ⚡", "", true)}</div>
              ${this._numberField(`${base}.icon_size`, "Rozmiar ikony / emoji (px)", item.icon_size || 22, 12, 72, 1, "", true)}
              ${this._colorField(`${base}.icon_color`, "Kolor ikony MDI", item.icon_color || item.color)}
            </div>

            <div class="widget-subsection full"><b>RAMKA, TŁO I TEKST</b><small>Każdy parametr dotyczy tylko tego dymku.</small></div>
            <div class="bubble-editor-grid">
              ${this._colorField(`${base}.color`, "Kolor akcentu", item.color)}
              ${this._colorField(`${base}.background_color`, "Kolor tła", item.background_color)}
              ${this._colorField(`${base}.border_color`, "Kolor ramki", item.border_color || item.color)}
              ${this._colorField(`${base}.name_color`, "Kolor nazwy", item.name_color || "#8eb5c3")}
              ${this._colorField(`${base}.value_color`, "Kolor wartości", item.value_color || item.color)}
              ${this._colorField(`${base}.unit_color`, "Kolor jednostki", item.unit_color || "#8eb3c0")}
              ${this._colorField(`${base}.description_color`, "Kolor opisu", item.description_color || "#6e96a5")}
              ${this._numberField(`${base}.border_width`, "Grubość ramki (px)", item.border_width || 1, 1, 8, 1, "", true)}
              ${this._numberField(`${base}.border_radius`, "Zaokrąglenie (px)", item.border_radius ?? 14, 0, 80, 1, "", true)}
              ${this._numberField(`${base}.padding`, "Odstęp wewnętrzny (px)", item.padding || 13, 4, 40, 1, "", true)}
              ${this._selectField(`${base}.text_align`, "Wyrównanie", item.text_align || "left", [["left","Do lewej"],["center","Do środka"],["right","Do prawej"]], "", true)}
            </div>

            <div class="widget-subsection full"><b>CZCIONKI</b><small>Osobny rozmiar i pogrubienie każdego tekstu.</small></div>
            <div class="bubble-editor-grid font-editor-grid">
              ${this._numberField(`${base}.name_size`, "Nazwa (px)", item.name_size || 10, 6, 32, 1, "", true)}
              <label class="check-row"><input type="checkbox" data-path="${base}.name_bold" data-live-rerender="1" ${item.name_bold ? "checked" : ""}><span><b>Pogrub nazwę</b></span></label>
              ${this._numberField(`${base}.value_size`, "Wartość (px)", item.value_size || 24, 12, 56, 1, "", true)}
              <label class="check-row"><input type="checkbox" data-path="${base}.value_bold" data-live-rerender="1" ${item.value_bold !== false ? "checked" : ""}><span><b>Pogrub wartość</b></span></label>
              ${this._numberField(`${base}.unit_size`, "Jednostka (px)", item.unit_size || 9, 6, 28, 1, "", true)}
              <label class="check-row"><input type="checkbox" data-path="${base}.unit_bold" data-live-rerender="1" ${item.unit_bold ? "checked" : ""}><span><b>Pogrub jednostkę</b></span></label>
              ${this._numberField(`${base}.description_size`, "Opis (px)", item.description_size || 8, 6, 28, 1, "", true)}
              <label class="check-row"><input type="checkbox" data-path="${base}.description_bold" data-live-rerender="1" ${item.description_bold ? "checked" : ""}><span><b>Pogrub opis</b></span></label>
            </div>

            <div class="widget-subsection full"><b>WARTOŚĆ POMOCNICZA</b><small>Drugi stan może pochodzić z innej encji lub atrybutu.</small></div>
            <div class="bubble-editor-grid">
              <label class="check-row full"><input type="checkbox" data-path="${base}.show_secondary" data-live-rerender="1" ${item.show_secondary ? "checked" : ""}><span><b>Pokaż wartość pomocniczą</b></span></label>
              ${this._field(`${base}.secondary_name`, "Etykieta", item.secondary_name, "Np. Dzisiaj", "", true)}
              <div class="full">${this._entityField(`${base}.secondary_entity_id`, "Druga encja", item.secondary_entity_id, "Opcjonalna druga wartość.", "", "any")}</div>
              ${this._field(`${base}.secondary_attribute`, "Drugi atrybut", item.secondary_attribute, "Opcjonalnie")}
              ${this._field(`${base}.secondary_unit`, "Druga jednostka", item.secondary_unit, "Puste = z encji", "", true)}
              ${this._numberField(`${base}.secondary_decimals`, "Druga precyzja", item.secondary_decimals ?? 1, 0, 6, 1)}
              ${this._numberField(`${base}.secondary_multiplier`, "Drugi mnożnik", item.secondary_multiplier ?? 1, -1000000, 1000000, 0.001)}
              ${this._colorField(`${base}.secondary_color`, "Kolor drugiej wartości", item.secondary_color || item.value_color || item.color)}
              ${this._colorField(`${base}.secondary_label_color`, "Kolor etykiety", item.secondary_label_color || "#88afbd")}
              ${this._colorField(`${base}.secondary_unit_color`, "Kolor jednostki", item.secondary_unit_color || "#7898a4")}
              ${this._numberField(`${base}.secondary_value_size`, "Rozmiar (px)", item.secondary_value_size || 11, 7, 28, 1, "", true)}
            </div>

            ${this._renderBubbleRelatedEditor(item, -1, "", base)}

            <div class="widget-subsection full"><b>KOLOR WARUNKOWY I ALARM</b><small>Zmień kolor lub pokaż alarm po przekroczeniu progów.</small></div>
            <div class="bubble-editor-grid">
              ${this._selectField(`${base}.color_mode`, "Tryb koloru", item.color_mode || "fixed", [["fixed","Stały"],["threshold","Według progów"]], "", true)}
              ${this._numberField(`${base}.low_threshold`, "Próg niski", item.low_threshold ?? 0, -1000000000, 1000000000, 0.01)}
              ${this._numberField(`${base}.high_threshold`, "Próg wysoki", item.high_threshold ?? 100, -1000000000, 1000000000, 0.01)}
              ${this._colorField(`${base}.low_color`, "Kolor niski", item.low_color || "#008cff")}
              ${this._colorField(`${base}.normal_color`, "Kolor normalny", item.normal_color || item.color)}
              ${this._colorField(`${base}.high_color`, "Kolor wysoki", item.high_color || "#ff4d6d")}
              ${this._colorField(`${base}.unavailable_color`, "Brak danych", item.unavailable_color || "#6d7d86")}
              <label class="check-row full"><input type="checkbox" data-path="${base}.alert_enabled" data-live-rerender="1" ${item.alert_enabled ? "checked" : ""}><span><b>Alarm wizualny</b></span></label>
              ${this._selectField(`${base}.alert_condition`, "Warunek alarmu", item.alert_condition || "above", [["above","Powyżej"],["below","Poniżej"],["outside","Poza zakresem"]], "", true)}
              ${this._numberField(`${base}.alert_low`, "Dolny próg alarmu", item.alert_low ?? 0, -1000000000, 1000000000, 0.01)}
              ${this._numberField(`${base}.alert_high`, "Górny próg alarmu", item.alert_high ?? 100, -1000000000, 1000000000, 0.01)}
              ${this._colorField(`${base}.alert_color`, "Kolor alarmu", item.alert_color || "#ff335f")}
              ${this._field(`${base}.alert_text`, "Tekst alarmu", item.alert_text, "ALARM", "", true)}
            </div>

            <div class="widget-subsection full"><b>AKCJA PO DOTKNIĘCIU</b><small>Otwórz szczegóły, przejdź do widoku albo wykonaj usługę HA.</small></div>
            <div class="bubble-editor-grid">
              ${this._selectField(`${base}.tap_action`, "Akcja", item.tap_action || "more_info", [["none","Brak"],["more_info","Więcej informacji"],["navigate","Nawigacja"],["service","Usługa HA"]], "", true)}
              ${this._field(`${base}.navigation_path`, "Ścieżka nawigacji", item.navigation_path, "/lovelace/energia")}
              ${this._field(`${base}.service`, "Usługa", item.service, "light.toggle")}
              ${this._textarea(`${base}.service_data`, "Dane usługi JSON", item.service_data || "{}", "{\"entity_id\":\"light.salon\"}")}
            </div>

            <div class="widget-subsection full"><b>WIDOCZNOŚĆ</b></div>
            <div class="bubble-editor-checks">
              <label class="check-row"><input type="checkbox" data-path="${base}.enabled" data-live-rerender="1" ${item.enabled !== false ? "checked" : ""}><span><b>Dymek widoczny</b></span></label>
              <label class="check-row"><input type="checkbox" data-path="${base}.show_sparkline" data-live-rerender="1" ${item.show_sparkline !== false ? "checked" : ""}><span><b>Miniwykres</b></span></label>
              <label class="check-row"><input type="checkbox" data-path="${base}.show_icon" data-live-rerender="1" ${item.show_icon !== false ? "checked" : ""}><span><b>Ikona / emoji</b></span></label>
              <label class="check-row"><input type="checkbox" data-path="${base}.show_name" data-live-rerender="1" ${item.show_name !== false ? "checked" : ""}><span><b>Nazwa</b></span></label>
              <label class="check-row"><input type="checkbox" data-path="${base}.show_unit" data-live-rerender="1" ${item.show_unit !== false ? "checked" : ""}><span><b>Jednostka</b></span></label>
              <label class="check-row"><input type="checkbox" data-path="${base}.show_description" data-live-rerender="1" ${item.show_description !== false ? "checked" : ""}><span><b>Opis</b></span></label>
            </div>
          </div>
        </div>
        <footer class="bubble-editor-footer"><span>${editor.isNew ? "Nowy dymek zostanie dodany dopiero po zapisaniu." : "Anulowanie nie zmieni zapisanej konfiguracji."}</span><div><button class="secondary-btn" data-action="cancel-bubble-editor"><ha-icon icon="mdi:close"></ha-icon>ANULUJ</button><button class="primary-btn" data-action="save-bubble-editor"><ha-icon icon="mdi:content-save"></ha-icon>ZAPISZ DYMEK</button></div></footer>
      </section>
    </div>`;
  }

  _restoreBubbleEditorViewport() {
    if (!this._bubbleEditor || !this._bubbleEditorViewport) return;
    const viewport = { ...this._bubbleEditorViewport };
    const restore = () => {
      const body = this.shadowRoot.querySelector?.(".bubble-editor-body");
      if (!body) return;
      const field = viewport.path ? [...this.shadowRoot.querySelectorAll?.("[data-path]") || []].find(element => element.dataset.path === viewport.path) : null;
      field?.focus?.({ preventScroll: true });
      if (field && viewport.selectionStart != null && typeof field.setSelectionRange === "function") {
        try { field.setSelectionRange(viewport.selectionStart, viewport.selectionEnd ?? viewport.selectionStart); } catch (_) { /* Number and color inputs do not expose a text selection. */ }
      }
      body.scrollTop = viewport.scrollTop;
    };
    requestAnimationFrame(() => { restore(); requestAnimationFrame(restore); });
  }

  _renderEntityPicker() {
    if (!this._picker) return "";
    const current = this._dataPathValue(this._picker.path) || "";
    const candidates = this._entityCandidates(this._picker.filter, this._pickerQuery, this._pickerShowAll);
    const rows = this._entityResultsHtml(candidates, current);
    return `<div class="entity-modal" data-action="close-entity-picker">
      <div class="entity-dialog" role="dialog" aria-modal="true" aria-label="Wybór encji">
        <div class="entity-dialog-head"><div><span class="eyebrow">WYSZUKIWARKA ENCJI HOME ASSISTANT</span><h2>${this._esc(this._picker.label)}</h2></div><button class="icon-close" data-action="close-entity-picker"><ha-icon icon="mdi:close"></ha-icon></button></div>
        <div class="entity-search-row"><ha-icon icon="mdi:magnify"></ha-icon><input type="search" data-entity-search value="${this._escAttr(this._pickerQuery)}" placeholder="Szukaj po nazwie, entity_id, stanie, urządzeniu, obszarze lub integracji…" autofocus><span>${candidates.length}</span></div>
        <div class="entity-filter-row">
          <button class="filter-chip ${!this._pickerShowAll ? "active" : ""}" data-action="entity-compatible-only">Dopasowane do pola</button>
          <button class="filter-chip ${this._pickerShowAll ? "active" : ""}" data-action="entity-show-all">Wszystkie encje</button>
          <small>Filtr: ${this._esc(this._picker.filter)}</small>
        </div>
        <div class="entity-current">${current ? `<span>Aktualnie:</span><b>${this._esc(current)}</b><strong>${this._esc(this._formatState(this._hass.states[current]))}</strong>` : `<span>Brak wybranej encji</span>`}</div>
        <div class="entity-results" data-entity-results>${rows || `<div class="empty-search"><ha-icon icon="mdi:database-search-outline"></ha-icon><b>Brak wyników</b><span>Zmień zapytanie albo pokaż wszystkie encje.</span></div>`}</div>
        <div class="entity-dialog-footer"><button class="secondary-btn" data-action="clear-entity"><ha-icon icon="mdi:eraser"></ha-icon>WYCZYŚĆ</button><button class="secondary-btn" data-action="close-entity-picker">ANULUJ</button></div>
      </div>
    </div>`;
  }

  _entityResultsHtml(candidates, current = "") {
    return candidates.slice(0, 300).map(({ id, state, compatible, friendly, deviceName, areaName, platform }) => {
      const unit = state?.attributes?.unit_of_measurement || "";
      const deviceClass = state?.attributes?.device_class || "";
      const metadata = [deviceClass, unit, areaName, deviceName, platform].filter(Boolean).join(" · ") || "bez dodatkowych danych";
      return `<button class="entity-result ${id === current ? "selected" : ""} ${compatible ? "compatible" : "other"}" data-action="select-entity" data-entity="${this._escAttr(id)}">
        <ha-icon icon="${this._entityIcon(id)}"></ha-icon>
        <span class="entity-result-copy"><b>${this._esc(friendly || id)}</b><code>${this._esc(id)}</code><small>${this._esc(metadata)}</small></span>
        <span class="entity-result-state ${state ? "" : "missing"}">${this._esc(state ? this._formatState(state) : "brak bieżącego stanu")}</span>
        ${compatible ? `<span class="compat-badge">PASUJE</span>` : ""}
      </button>`;
    }).join("");
  }

  _entityCandidates(filter, query = "", showAll = false) {
    const q = String(query || "").trim().toLowerCase();
    const ids = new Set([
      ...Object.keys(this._hass?.states || {}),
      ...Object.keys(this._entityRegistry || {}),
    ]);
    const items = [...ids].map(id => {
      const state = this._hass?.states?.[id] || null;
      const registry = this._entityRegistry?.[id] || {};
      const device = registry.device_id ? this._deviceRegistry?.[registry.device_id] || {} : {};
      const areaId = registry.area_id || device.area_id || "";
      const area = areaId ? this._areaRegistry?.[areaId] || {} : {};
      const friendly = String(state?.attributes?.friendly_name || registry.name || registry.original_name || id);
      const deviceName = String(device.name_by_user || device.name || "");
      const areaName = String(area.name || "");
      const platform = String(registry.platform || registry.config_entry_id || "");
      const compatible = Boolean(state && this._entityMatchesFilter(id, state, filter));
      const unit = String(state?.attributes?.unit_of_measurement || "");
      const deviceClass = String(state?.attributes?.device_class || "");
      const stateText = String(state?.state || "");
      const haystack = `${id} ${friendly} ${stateText} ${unit} ${deviceClass} ${deviceName} ${areaName} ${platform}`.toLowerCase();
      if (q && !haystack.includes(q)) return null;
      if (!showAll && !compatible) return null;
      let score = compatible ? 100 : 0;
      if (id === this._getPath(this._config, this._picker?.path || "")) score += 500;
      if (q && id.toLowerCase().startsWith(q)) score += 90;
      if (q && friendly.toLowerCase().startsWith(q)) score += 70;
      if (q && areaName.toLowerCase().startsWith(q)) score += 35;
      if (state && !["unknown", "unavailable"].includes(state.state)) score += 15;
      if (registry.disabled_by) score -= 50;
      return { id, state, compatible, score, friendly, deviceName, areaName, platform };
    }).filter(Boolean);
    items.sort((a, b) => b.score - a.score || a.friendly.localeCompare(b.friendly) || a.id.localeCompare(b.id));
    return items;
  }

  _entityMatchesFilter(id, state, filter) {
    if (!state) return false;
    const domain = id.split(".")[0];
    const dc = String(state.attributes?.device_class || "").toLowerCase();
    const unit = String(state.attributes?.unit_of_measurement || "").toLowerCase();
    const numeric = !Number.isNaN(Number(state.state));
    const matches = {
      any: true,
      power: dc === "power" || ["w", "kw", "mw"].includes(unit),
      energy: dc === "energy" || ["wh", "kwh", "mwh"].includes(unit),
      voltage: dc === "voltage" || unit === "v",
      current: dc === "current" || unit === "a",
      frequency: dc === "frequency" || unit === "hz",
      temperature: dc === "temperature" || ["°c", "c", "°f"].includes(unit),
      percentage: dc === "battery" || unit === "%",
      power_factor: dc === "power_factor" || unit === "%" || (numeric && domain === "sensor"),
      distance: dc === "distance" || ["km", "mi", "m"].includes(unit),
      price: numeric && ["sensor", "input_number", "number"].includes(domain),
      cost: numeric && ["sensor", "input_number", "number"].includes(domain),
      number: numeric,
      status: ["sensor", "binary_sensor", "select", "input_select", "switch"].includes(domain),
      control: ["switch", "input_boolean", "light", "button", "select", "number", "climate"].includes(domain),
      percentage_control: ["number", "input_number"].includes(domain) || unit === "%",
      number_control: ["number", "input_number"].includes(domain),
    };
    return Boolean(matches[filter] ?? true);
  }

  _formatState(state) {
    if (!state) return "—";
    try {
      if (typeof this._hass?.formatEntityState === "function") return this._hass.formatEntityState(state);
    } catch (_) { /* fallback below */ }
    const unit = state.attributes?.unit_of_measurement || "";
    return `${state.state}${unit ? ` ${unit}` : ""}`;
  }

  _entityIcon(entityId) {
    const state = this._hass?.states?.[entityId];
    if (state?.attributes?.icon) return state.attributes.icon;
    const domain = String(entityId || "").split(".")[0];
    return ({sensor:"mdi:chart-line",binary_sensor:"mdi:radiobox-marked",switch:"mdi:toggle-switch",input_boolean:"mdi:toggle-switch-outline",number:"mdi:numeric",input_number:"mdi:numeric",select:"mdi:form-dropdown",button:"mdi:gesture-tap-button",light:"mdi:lightbulb",climate:"mdi:thermostat"})[domain] || "mdi:cube-outline";
  }

  _getPath(obj, path) {
    if (!path) return undefined;
    return path.split(".").reduce((value, part) => value == null ? undefined : value[/^\d+$/.test(part) ? Number(part) : part], obj);
  }

  _dataPathValue(path) {
    const prefix = "bubble_editor.";
    return String(path || "").startsWith(prefix)
      ? this._getPath(this._bubbleEditor?.draft, String(path).slice(prefix.length))
      : this._getPath(this._config, path);
  }

  _setDataPath(path, value) {
    const prefix = "bubble_editor.";
    if (String(path || "").startsWith(prefix)) {
      if (this._bubbleEditor?.draft) this._setPath(this._bubbleEditor.draft, String(path).slice(prefix.length), value);
      return;
    }
    this._setPath(this._config, path, value);
  }

  _emptyState(icon, title, description) {
    return `<div class="empty"><ha-icon icon="${icon}"></ha-icon><h3>${title}</h3><p>${description}</p></div>`;
  }

  _featureIcon(key) {
    return ({grid:"mdi:transmission-tower",pv:"mdi:solar-power",battery:"mdi:battery-high",ev:"mdi:car-electric",prices:"mdi:cash-multiple",appliances:"mdi:power-plug",automation:"mdi:robot"})[key] || "mdi:puzzle-outline";
  }

  _refreshBubbleEditorPreview(path = "") {
    if (!this._bubbleEditor?.draft) return;
    const preview = this.shadowRoot.querySelector(".bubble-editor-preview .metrics-grid");
    if (preview) preview.innerHTML = this._overviewBubble(this._bubbleEditor.draft, -1);
    if (String(path).endsWith(".icon_type")) {
      const mode = this._bubbleEditor.draft.icon_type === "emoji" ? "emoji" : "mdi";
      this.shadowRoot.querySelectorAll("[data-bubble-icon-mode]").forEach(element => { element.hidden = element.dataset.bubbleIconMode !== mode; });
    }
  }

  _refreshSettingsPreview(path = "") {
    if (this._view !== "settings") return;
    const context = this._settingsContext();
    const preview = this.shadowRoot.querySelector(".settings-live-preview");
    if (!context || !preview) return;
    preview.innerHTML = `<div class="settings-preview-label"><b>${this._esc(context.label)}</b><span>Przeciągnij dymek · linie podążają automatycznie</span></div>${this._flowDiagram(true, false, context.profile, true)}`;
    if (String(path).endsWith(".icon_type")) {
      const selected = this._flowSceneModel(context.profile).nodes.find(item => item.key === this._settingsSelectedKey);
      const mode = context.profile.flow_element_styles?.[selected?.key]?.icon_type === "emoji" ? "emoji" : "mdi";
      this.shadowRoot.querySelectorAll("[data-settings-icon-mode]").forEach(element => { element.hidden = element.dataset.settingsIconMode !== mode; });
    }
    this._bindSettingsSceneEditor();
    this._updateLive();
    this._setupSceneGeometryObserver();
    this._scheduleSceneConnectionGeometry();
  }

  _refreshLiveField(path) {
    if (String(path).startsWith("bubble_editor.")) {
      this._refreshBubbleEditorPreview(path);
      return true;
    }
    const context = this._view === "settings" ? this._settingsContext() : null;
    if (context && String(path).startsWith(`${context.path}.`)) {
      this._refreshSettingsPreview(path);
      return true;
    }
    return false;
  }

  _bindCommonEvents() {
    this.shadowRoot.querySelectorAll("[data-view]").forEach(el => el.addEventListener("click", () => {
      const leavingKiosk = this._view === "kiosk" && el.dataset.view !== "kiosk";
      this._view = el.dataset.view;
      this._message = "";
      if (leavingKiosk) {
        this._kioskProfileId = null;
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete("kiosk");
          window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
        } catch (_) { /* History API is optional. */ }
        if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      }
      this._render();
    }));
    this.shadowRoot.querySelector("[data-action='toggle-nav']")?.addEventListener("click", () => this.shadowRoot.querySelector(".sidebar")?.classList.toggle("open"));
    this.shadowRoot.querySelectorAll("[data-path]").forEach(el => {
      const event = el.type === "checkbox" || el.tagName === "SELECT" || el.dataset.liveRerender === "1" ? "change" : "input";
      el.addEventListener(event, () => {
        const value = el.type === "checkbox" ? el.checked : el.type === "number" ? Number(el.value) : el.value;
        this._setDataPath(el.dataset.path, value);
        if (el.dataset.path === "flow.title") {
          this.shadowRoot.querySelectorAll(".flow-title>span").forEach(title => { title.textContent = value || "PRZEPŁYW ENERGII — NA ŻYWO"; });
        }
        if (el.dataset.liveRerender === "1") {
          if (this._refreshLiveField(el.dataset.path)) return;
          const scroll = this.shadowRoot.querySelector(".content")?.scrollTop || 0;
          const inspectorScroll = this.shadowRoot.querySelector(".settings-inspector")?.scrollTop || 0;
          const bubbleScroll = this.shadowRoot.querySelector(".bubble-editor-body")?.scrollTop || 0;
          requestAnimationFrame(() => {
            this._render();
            const content = this.shadowRoot.querySelector(".content");
            if (content) content.scrollTop = scroll;
            const inspector = this.shadowRoot.querySelector(".settings-inspector");
            if (inspector) inspector.scrollTop = inspectorScroll;
            const bubbleBody = this.shadowRoot.querySelector(".bubble-editor-body");
            if (bubbleBody) bubbleBody.scrollTop = bubbleScroll;
          });
        }
      });
    });
  }


  _bindViewEvents() {
    this.shadowRoot.querySelectorAll("[data-settings-target]").forEach(button => button.addEventListener("click", () => {
      this._settingsTarget = button.dataset.settingsTarget;
      this._view = "settings";
      this._settingsSelectedKind = "node";
      this._settingsSelectedKey = "home";
      this._render();
    }));
    this.shadowRoot.querySelector("[data-settings-object]")?.addEventListener("change", event => {
      const [kind, key] = String(event.currentTarget.value || "node:home").split(":", 2);
      this._settingsSelectedKind = kind;
      this._settingsSelectedKey = key;
      this._render();
    });
    this.shadowRoot.querySelector(".entity-dialog")?.addEventListener("click", event => event.stopPropagation());
    this.shadowRoot.querySelector(".bubble-editor-dialog")?.addEventListener("click", event => event.stopPropagation());
    this.shadowRoot.querySelector(".bubble-editor-dialog")?.addEventListener("keydown", event => {
      if (event.key !== "Enter" || !event.target?.matches?.("input")) return;
      event.preventDefault();
      event.target.blur?.();
    });
    this.shadowRoot.querySelector("[data-action='select-flow-layout-element']")?.addEventListener("change", event => {
      this._layoutSelectedElement = event.currentTarget.value;
      this._render();
    });
    this.shadowRoot.querySelectorAll("[data-action]").forEach(el => {
      const action = el.dataset.action;
      if (["toggle-nav", "import-config", "select-flow-layout-element"].includes(action)) return;
      el.addEventListener("click", async event => {
        if (action === "save-config") await this._saveConfig();
        if (action === "apply-g13-preset") this._applyTauronG13Preset();
        if (action === "add-string") this._addString();
        if (action === "remove-string") this._removeString(Number(el.dataset.index));
        if (action === "add-section") this._addSection(Number(el.dataset.index));
        if (action === "remove-section") this._removeSection(Number(el.dataset.index), Number(el.dataset.section));
        if (action === "add-device") this._addDevice();
        if (action === "remove-device") this._removeDevice(Number(el.dataset.index));
        if (action === "add-overview-bubble") this._addOverviewBubble();
        if (action === "edit-overview-bubble") this._editOverviewBubble(Number(el.dataset.index));
        if (action === "remove-overview-bubble") this._removeOverviewBubble(Number(el.dataset.index));
        if (action === "add-bubble-related") this._addBubbleRelated(Number(el.dataset.index));
        if (action === "remove-bubble-related") this._removeBubbleRelated(Number(el.dataset.index), Number(el.dataset.relatedIndex));
        if (action === "add-bubble-editor-related") this._addBubbleEditorRelated();
        if (action === "remove-bubble-editor-related") this._removeBubbleEditorRelated(Number(el.dataset.relatedIndex));
        if (action === "cancel-bubble-editor") this._cancelBubbleEditor();
        if (action === "save-bubble-editor") await this._saveBubbleEditor();
        if (action === "add-overview-chart") this._addOverviewChart();
        if (action === "remove-overview-chart") this._removeOverviewChart(Number(el.dataset.index));
        if (action === "add-chart-series") this._addChartSeries(Number(el.dataset.index));
        if (action === "remove-chart-series") this._removeChartSeries(Number(el.dataset.index), Number(el.dataset.seriesIndex));
        if (action === "add-kiosk-profile") this._addKioskProfile();
        if (action === "remove-kiosk-profile") this._removeKioskProfile(Number(el.dataset.index));
        if (action === "toggle-kiosk-selection") this._toggleKioskSelection(Number(el.dataset.profileIndex), el.dataset.kind, el.dataset.itemId, el.checked);
        if (action === "toggle-kiosk-builtin") this._toggleKioskBuiltin(Number(el.dataset.profileIndex), el.dataset.itemId, el.checked);
        if (action === "reset-kiosk-layout") this._resetKioskLayout(Number(el.dataset.profileIndex));
        if (action === "add-kiosk-lovelace-view") this._addKioskLovelaceView(Number(el.dataset.profileIndex));
        if (action === "remove-kiosk-lovelace-view") this._removeKioskLovelaceView(Number(el.dataset.profileIndex), Number(el.dataset.index));
        if (action === "move-kiosk-lovelace-view") this._moveKioskLovelaceView(Number(el.dataset.profileIndex), Number(el.dataset.index), Number(el.dataset.direction));
        if (action === "preview-kiosk-lovelace-view") this._previewKioskLovelaceView(Number(el.dataset.profileIndex), Number(el.dataset.index));
        if (action === "open-kiosk-profile") this._openKioskProfile(el.dataset.profileId);
        if (action === "open-bubble-layout-editor") this._openBubbleLayoutEditor(el.dataset.layoutTarget);
        if (action === "cancel-bubble-layout-editor") this._cancelBubbleLayoutEditor();
        if (action === "reset-bubble-layout-editor") this._resetBubbleLayoutEditor();
        if (action === "save-bubble-layout-editor") await this._saveBubbleLayoutEditor();
        if (action === "add-flow-extra-field") this._addFlowExtraField();
        if (action === "remove-flow-extra-field") this._removeFlowExtraField(Number(el.dataset.index));
        if (action === "add-settings-extra-field") this._addSettingsExtraField();
        if (action === "remove-settings-extra-field") this._removeSettingsExtraField(Number(el.dataset.index));
        if (action === "copy-settings-tile") this._copySettingsTile();
        if (action === "paste-settings-tile") this._pasteSettingsTile(el.dataset.pasteMode || "style");
        if (action === "reset-settings-scene") this._resetSettingsScene();
        if (action === "kiosk-prev") this._advanceKiosk(-1);
        if (action === "kiosk-next") this._advanceKiosk(1);
        if (action === "kiosk-slide") this._setKioskSlide(Number(el.dataset.slideIndex));
        if (action === "export-config") this._exportConfig();
        if (action === "control-device") await this._controlDevice(Number(el.dataset.index));
        if (action === "test-entity") await this._testEntity(el.dataset.entity);
        if (action === "refresh-runtime") await this._refreshRuntime();
        if (action === "refresh-recorder") await this._loadRecorderHistories(true);
        if (action === "toggle-fullscreen") await this._toggleFullscreen();
        if (action === "open-entity-picker") {
          event.preventDefault();
          this._picker = { path: el.dataset.path, label: el.dataset.label, filter: el.dataset.filter || "any" };
          this._pickerQuery = "";
          this._pickerShowAll = false;
          this._render();
          requestAnimationFrame(() => this.shadowRoot.querySelector("[data-entity-search]")?.focus());
        }
        if (action === "close-entity-picker") {
          this._picker = null;
          this._pickerQuery = "";
          this._render();
        }
        if (action === "select-entity") {
          this._setDataPath(this._picker.path, el.dataset.entity);
          this._message = `Wybrano ${el.dataset.entity}. Pamiętaj o zapisaniu zmian.`;
          this._picker = null;
          this._render();
        }
        if (action === "clear-entity") {
          this._setDataPath(this._picker.path, "");
          this._message = "Wyczyszczono przypisanie encji. Pamiętaj o zapisaniu zmian.";
          this._picker = null;
          this._render();
        }
        if (action === "entity-compatible-only") {
          this._pickerShowAll = false;
          this._render();
          requestAnimationFrame(() => this.shadowRoot.querySelector("[data-entity-search]")?.focus());
        }
        if (action === "entity-show-all") {
          this._pickerShowAll = true;
          this._render();
          requestAnimationFrame(() => this.shadowRoot.querySelector("[data-entity-search]")?.focus());
        }
      });
    });
    const input = this.shadowRoot.querySelector("input[data-action='import-config']");
    input?.addEventListener("change", event => this._importConfig(event));
    const search = this.shadowRoot.querySelector("[data-entity-search]");
    search?.addEventListener("input", () => {
      this._pickerQuery = search.value;
      const current = this._dataPathValue(this._picker?.path || "") || "";
      const candidates = this._entityCandidates(this._picker?.filter || "any", this._pickerQuery, this._pickerShowAll);
      const results = this.shadowRoot.querySelector("[data-entity-results]");
      if (results) {
        results.innerHTML = this._entityResultsHtml(candidates, current) || `<div class="empty-search"><ha-icon icon="mdi:database-search-outline"></ha-icon><b>Brak wyników</b><span>Zmień zapytanie albo pokaż wszystkie encje.</span></div>`;
        results.querySelectorAll("[data-action='select-entity']").forEach(row => row.addEventListener("click", () => {
          this._setDataPath(this._picker.path, row.dataset.entity);
          this._message = `Wybrano ${row.dataset.entity}. Pamiętaj o zapisaniu zmian.`;
          this._picker = null;
          this._render();
        }));
      }
      const count = this.shadowRoot.querySelector(".entity-search-row > span");
      if (count) count.textContent = String(candidates.length);
    });
    this.shadowRoot.querySelectorAll("[data-widget-action]").forEach(el => {
      const execute = event => {
        if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
        if (this._layoutEditorTarget && el.closest(".layout-editor-dialog")) return;
        event.preventDefault();
        this._executeWidgetAction(el.dataset.widgetAction, Number(el.dataset.widgetIndex));
      };
      el.addEventListener("click", execute);
      el.addEventListener("keydown", execute);
    });
    this.shadowRoot.querySelectorAll("[data-flow-action-element]").forEach(el => {
      const execute = async event => {
        if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
        if (this._layoutEditorTarget || el.closest(".layout-editor-dialog")) return;
        event.preventDefault();
        event.stopPropagation();
        await this._executeFlowElementAction(el.dataset.flowActionElement);
      };
      el.addEventListener("click", execute);
      el.addEventListener("keydown", execute);
    });
    this._bindWidgetDragDrop();
    this._bindKioskLayoutEditor();
    this._bindSettingsSceneEditor();
    this._bindKioskSwipe();
    this._bindKioskIframeSwipe();
  }


  async _saveConfig() {
    if (!this._isAdmin()) return false;
    const pathError = this._normalizeKioskLovelacePaths();
    if (pathError) {
      this._message = pathError;
      this._updateMessage();
      return false;
    }
    this._message = "Zapisywanie…";
    this._updateMessage();
    try {
      this._config = await this._hass.callWS({ type: `${DOMAIN}/config/save`, config: this._config });
      this._runtime = await this._hass.callWS({ type: `${DOMAIN}/runtime/get` });
      this._message = `Zapisano rewizję ${this._config.revision}`;
      this._render();
      return true;
    } catch (err) {
      this._message = `Błąd zapisu: ${err?.message || err}`;
      this._updateMessage();
      return false;
    }
  }

  _normalizeHaViewPath(value) {
    const raw = String(value || "").trim();
    if (!raw) return { path: "", error: "" };
    if (/^https?:\/\//i.test(raw)) {
      try {
        const url = new URL(raw);
        const currentOrigin = String(window.location?.origin || "");
        if (!currentOrigin || url.origin !== currentOrigin) return { path: "", error: "Adres musi wskazywać ten sam Home Assistant." };
        return { path: `${url.pathname}${url.search}${url.hash}`, error: "" };
      } catch (_) { return { path: "", error: "Nieprawidłowy adres widoku Home Assistant." }; }
    }
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//")) return { path: "", error: "Dozwolona jest lokalna ścieżka lub adres tego samego Home Assistanta." };
    return { path: raw.startsWith("/") ? raw : `/${raw}`, error: "" };
  }

  _normalizeKioskLovelacePaths() {
    const profiles = [{ profile: this._config.kiosk || {}, name: "kiosk domyślny" }, ...(this._config.kiosk_profiles || []).map(item => ({ profile: item, name: item.name || item.id || "kiosk" }))];
    for (const { profile, name } of profiles) {
      for (const item of profile.lovelace_views || []) {
        const normalized = this._normalizeHaViewPath(item.path);
        if (normalized.error) return `${name} · ${item.name || "widok"}: ${normalized.error}`;
        item.path = normalized.path;
      }
    }
    return "";
  }


  _applyTauronG13Preset() {
    if (!this._isAdmin()) return;
    const old = this._config.tariff || {};
    const zeroZones = () => ({ morning_peak: 0, afternoon_peak: 0, off_peak: 0 });
    this._config.tariff = {
      enabled: true,
      provider: "tauron",
      plan: "g13",
      profile_name: "TAURON G13",
      country: "PL",
      price_mode: old.price_mode || "components",
      use_external_price_if_available: false,
      prices_include_vat: true,
      vat_percent: 23,
      effective_from: "2026-01-01",
      effective_to: "2026-12-31",
      distribution_preset: "tauron_g13_2026_gross",
      schedule: {
        summer_start: "04-01", winter_start: "10-01",
        morning_start: "07:00", morning_end: "13:00",
        summer_afternoon_start: "19:00", summer_afternoon_end: "22:00",
        winter_afternoon_start: "16:00", winter_afternoon_end: "21:00",
        day_off_all_day_offpeak: true, day_off_carry_until: "07:00",
      },
      calendar: {
        include_weekends: true, include_polish_public_holidays: true,
        custom_holidays: old.calendar?.custom_holidays || "",
      },
      energy_prices: old.energy_prices || { summer: zeroZones(), winter: zeroZones() },
      distribution_prices: {
        summer: { morning_peak: 0.2710, afternoon_peak: 0.4795, off_peak: 0.0482 },
        winter: { morning_peak: 0.2710, afternoon_peak: 0.4795, off_peak: 0.0482 },
      },
      combined_prices: old.combined_prices || { summer: zeroZones(), winter: zeroZones() },
      variable_fees: { quality: 0.0408, renewable: 0.0090, cogeneration: 0.0037, excise: 0, other: 0 },
      fixed_fees: {
        phase_count: old.fixed_fees?.phase_count || 3,
        network_monthly_1_phase: 9.08, network_monthly_3_phase: 13.36,
        subscription_monthly: 5.61, capacity_fee_monthly: old.fixed_fees?.capacity_fee_monthly ?? 21.13,
        commercial_monthly: old.fixed_fees?.commercial_monthly || 0,
        other_monthly: old.fixed_fees?.other_monthly || 0,
      },
    };
    this._config.features.prices = true;
    this._message = "Wczytano preset TAURON G13 2026. Uzupełnij ceny zakupu energii czynnej z własnej umowy i zapisz zmiany.";
    this._render();
  }

  _addString() {
    if (!this._isAdmin()) return;
    const n = this._config.pv_strings.length + 1;
    this._config.pv_strings.push({ id: this._id("string"), name: `String ${n}`, description: "", mppt: `MPPT ${n}`, power_entity: "", energy_entity: "", voltage_entity: "", current_entity: "", status_entity: "", capacity_kw: 0, enabled: true, show_on_overview: true, show_in_flow: true, flow_order: n, flow_label: "", flow_icon: "mdi:solar-panel-large", sections: [] });
    this._render();
  }

  _removeString(index) { if (this._isAdmin()) { this._config.pv_strings.splice(index, 1); this._render(); } }

  _addSection(index) {
    if (!this._isAdmin()) return;
    const sections = this._config.pv_strings[index].sections ||= [];
    sections.push({ id: this._id("section"), name: `Sekcja ${sections.length + 1}`, description: "", area: "", orientation: "unknown", tilt: 0, panel_count: 0, peak_power_kw: 0, share_percent: 0, power_entity: "", energy_entity: "", voltage_entity: "", current_entity: "", status_entity: "", enabled: true, show_on_overview: true });
    this._render();
  }

  _removeSection(index, section) { if (this._isAdmin()) { this._config.pv_strings[index].sections.splice(section, 1); this._render(); } }

  _addDevice() {
    if (!this._isAdmin()) return;
    const n = this._config.devices.length + 1;
    this._config.devices.push({ id: this._id("device"), name: `Urządzenie ${n}`, description: "", category: "other", area: "", icon: "mdi:flash", accent: "cyan", power_entity: "", energy_entity: "", status_entity: "", cycle_entity: "", control_entity: "", active_threshold_w: 10, standby_threshold_w: 2, priority: n, active_description: "Urządzenie pracuje", idle_description: "Urządzenie nie pracuje", enabled: true, show_on_overview: true, include_in_home_total: true, show_in_flow: false, flow_direction: "consumer", flow_order: n, flow_label: "" });
    this._render();
  }

  _removeDevice(index) { if (this._isAdmin()) { this._config.devices.splice(index, 1); this._render(); } }

  _newOverviewBubble(n = 1) {
    return {
      id: this._id("bubble"), name: `Dymek ${n}`, description: "", entity_id: "", attribute: "",
      show_secondary: false, secondary_name: "", secondary_entity_id: "", secondary_attribute: "", secondary_unit: "", secondary_decimals: 1, secondary_multiplier: 1,
      secondary_color: "#20eaff", secondary_label_color: "#88afbd", secondary_unit_color: "#7898a4", secondary_value_size: 11,
      icon_type: "mdi", icon: "mdi:information-outline", emoji: "⚡", color: "#20eaff", background_color: "#031426", border_color: "#20eaff", icon_color: "#20eaff", name_color: "#8eb5c3", value_color: "#20eaff", unit_color: "#8eb3c0", description_color: "#6e96a5", border_width: 1, border_radius: 14, icon_size: 22, name_size: 10, value_size: 24, unit_size: 9, description_size: 8, name_bold: false, value_bold: true, unit_bold: false, description_bold: false, padding: 13, text_align: "left", show_icon: true, show_name: true, show_unit: true, show_description: true, unit: "",
      color_mode: "fixed", low_threshold: 0, high_threshold: 100, low_color: "#008cff", normal_color: "#20eaff", high_color: "#ff4d6d", unavailable_color: "#6d7d86",
      alert_enabled: false, alert_condition: "above", alert_low: 0, alert_high: 100, alert_color: "#ff335f", alert_text: "ALARM",
      decimals: 1, multiplier: 1, related_entities: [], order: n, enabled: true, show_sparkline: true, tap_action: "more_info", navigation_path: "", service: "", service_data: "{}",
    };
  }

  _addOverviewBubble() {
    if (!this._isAdmin()) return;
    const n = (this._config.overview_bubbles || []).length + 1;
    this._bubbleEditor = { index: -1, isNew: true, draft: this._newOverviewBubble(n) };
    this._bubbleEditorViewport = null;
    this._render();
  }

  _editOverviewBubble(index) {
    if (!this._isAdmin()) return;
    const item = this._config.overview_bubbles?.[index];
    if (!item) return;
    this._bubbleEditor = { index, isNew: false, draft: JSON.parse(JSON.stringify(item)) };
    this._bubbleEditorViewport = null;
    this._render();
  }

  _cancelBubbleEditor() {
    this._bubbleEditor = null;
    this._bubbleEditorViewport = null;
    this._bubbleEditorViewport = null;
    this._picker = null;
    this._render();
  }

  _addBubbleEditorRelated() {
    const bubble = this._bubbleEditor?.draft;
    if (!this._isAdmin() || !bubble) return;
    const items = bubble.related_entities ||= [];
    if (items.length >= 8) return;
    const n = items.length + 1;
    items.push({ id: this._id("related"), name: `Encja ${n}`, entity_id: "", attribute: "", unit: "", decimals: 1, multiplier: 1, color: bubble.color || "#20eaff", label_color: "#7195a2", unit_color: "#7898a4", value_size: 10, enabled: true });
    this._render();
  }

  _removeBubbleEditorRelated(index) {
    const items = this._bubbleEditor?.draft?.related_entities;
    if (!this._isAdmin() || !Array.isArray(items) || !Number.isInteger(index)) return;
    items.splice(index, 1);
    this._render();
  }

  async _saveBubbleEditor() {
    if (!this._isAdmin() || !this._bubbleEditor?.draft) return;
    const editor = this._bubbleEditor;
    const draft = JSON.parse(JSON.stringify(editor.draft));
    draft.name = String(draft.name || "Dymek").trim() || "Dymek";
    const items = this._config.overview_bubbles ||= [];
    const previous = editor.isNew ? null : JSON.parse(JSON.stringify(items[editor.index]));
    if (editor.isNew) items.push(draft);
    else if (items[editor.index]) items[editor.index] = draft;
    else return;
    this._bubbleEditor = null;
    this._picker = null;
    const saved = await this._saveConfig();
    if (saved) return;
    if (editor.isNew) {
      const index = items.findIndex(item => item.id === draft.id);
      if (index >= 0) items.splice(index, 1);
    } else if (previous) items[editor.index] = previous;
    this._bubbleEditor = editor;
    this._bubbleEditorViewport = viewport;
    this._render();
  }

  _removeOverviewBubble(index) {
    if (this._isAdmin()) { (this._config.overview_bubbles || []).splice(index, 1); this._render(); }
  }

  _addBubbleRelated(index) {
    if (!this._isAdmin()) return;
    const bubble = this._config.overview_bubbles?.[index];
    if (!bubble) return;
    const items = bubble.related_entities ||= [];
    if (items.length >= 8) return;
    const n = items.length + 1;
    items.push({ id: this._id("related"), name: `Encja ${n}`, entity_id: "", attribute: "", unit: "", decimals: 1, multiplier: 1, color: bubble.color || "#20eaff", label_color: "#7195a2", unit_color: "#7898a4", value_size: 10, enabled: true });
    this._render();
  }

  _removeBubbleRelated(index, relatedIndex) {
    if (!this._isAdmin()) return;
    (this._config.overview_bubbles?.[index]?.related_entities || []).splice(relatedIndex, 1);
    this._render();
  }

  _addOverviewChart() {
    if (!this._isAdmin()) return;
    const items = this._config.overview_charts ||= [];
    const n = items.length + 1;
    items.push({
      id: this._id("chart"), name: `Wykres ${n}`, description: "", entity_id: "", attribute: "",
      icon: "mdi:chart-line", color: "#20eaff", unit: "", decimals: 1, multiplier: 1,
      graph_type: "line", height: "medium", history_range: "session", points: 90, line_width: 2, order: n,
      series: [], enabled: true, show_current: true, show_min_max: true, tap_action: "more_info", navigation_path: "", service: "", service_data: "{}",
    });
    this._render();
  }

  _removeOverviewChart(index) {
    if (this._isAdmin()) { (this._config.overview_charts || []).splice(index, 1); this._render(); }
  }

  _addChartSeries(index) {
    if (!this._isAdmin()) return;
    const chart = this._config.overview_charts?.[index];
    if (!chart) return;
    const items = chart.series ||= [];
    if (items.length >= 8) return;
    const n = items.length + 2;
    const colors = ["#52ff62", "#b95cff", "#ffb11b", "#ff4d6d", "#00aaff", "#b8ff3d", "#ff7ee2", "#76ffe2"];
    items.push({ id: this._id("series"), name: `Seria ${n}`, entity_id: "", attribute: "", color: colors[(n - 2) % colors.length], unit: "", decimals: 1, multiplier: 1, enabled: true });
    this._render();
  }

  _removeChartSeries(index, seriesIndex) {
    if (!this._isAdmin()) return;
    (this._config.overview_charts?.[index]?.series || []).splice(seriesIndex, 1);
    this._render();
  }

  _addKioskProfile() {
    if (!this._isAdmin()) return;
    const items = this._config.kiosk_profiles ||= [];
    const n = items.length + 1;
    items.push({
      id: `ekran_${n}`, name: `Ekran ${n}`, description: "", title: "PRZEPŁYW ENERGII",
      display_preset: "tablet_16_9", compact_header: true, max_bubbles: 6, chart_columns: 2,
      builtin_bubble_ids: ["home", "pv", "grid"], bubble_layout: "free", bubble_stage_height: 96, bubble_positions: {}, flow_node_positions: {}, flow_element_styles: {}, flow_scene: { canvas_height: 460, show_grid: true, grid_size: 20, snap_to_grid: true, background_color: "#020b16", border_color: "#20eaff", border_width: 1, border_radius: 16, elements: {}, connections: {} }, slide_headers: {},
      flow_offset_x: 0, flow_offset_y: -30, flow_scale: 100, show_price_panel: true, show_consumers_panel: true,
      show_battery_gauge: false, show_self_sufficiency_gauge: false, tablet_performance_mode: true, auto_fullscreen: true, show_notification_center: true, lovelace_views: [],
      show_clock: true, show_builtin_bubbles: true, show_custom_bubbles: true, show_charts: true,
      show_status: false, flow_height: "tall", bubble_selection: "all", bubble_ids: [],
      chart_selection: "all", chart_ids: [], rotation_enabled: false, rotation_seconds: 20,
      rotate_flow: true, rotate_charts: true, rotate_overview: true, night_enabled: false,
      night_start: "22:00", night_end: "06:00", night_brightness: 30, enabled: true,
    });
    this._render();
  }

  _removeKioskProfile(index) {
    if (this._isAdmin()) { (this._config.kiosk_profiles || []).splice(index, 1); this._render(); }
  }

  _toggleKioskSelection(profileIndex, kind, itemId, checked) {
    if (!this._isAdmin() || !["bubble", "chart"].includes(kind)) return;
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    if (!profile) return;
    const key = `${kind}_ids`;
    const ids = new Set(profile[key] || []);
    if (checked) ids.add(itemId); else ids.delete(itemId);
    profile[key] = [...ids];
  }

  _openKioskProfile(profileId) {
    this._kioskProfileId = profileId || "1";
    this._kioskSlide = 0;
    this._view = "kiosk";
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("kiosk", this._kioskProfileId);
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    } catch (_) { /* History API is optional; the kiosk still renders. */ }
    this._render();
  }

  _openBubbleLayoutEditor(target) {
    if (!this._isAdmin()) return;
    const context = this._layoutEditorContext(target);
    if (!context) return;
    this._layoutEditorTarget = target;
    this._layoutEditorSnapshot = {
      bubble_positions: JSON.parse(JSON.stringify(context.profile.bubble_positions || {})),
      flow_node_positions: JSON.parse(JSON.stringify(context.profile.flow_node_positions || {})),
      flow_element_styles: JSON.parse(JSON.stringify(context.profile.flow_element_styles || {})),
      bubble_layout: context.profile.bubble_layout || "grid",
    };
    if (context.metrics !== false) {
      context.profile.bubble_layout = "free";
      context.profile.bubble_positions ||= {};
    }
    context.profile.flow_node_positions ||= {};
    context.profile.flow_element_styles ||= {};
    this._layoutSelectedElement = "home";
    this._message = `Edycja diagramu i dymków: ${context.label}.`;
    this._render();
  }

  _cancelBubbleLayoutEditor() {
    const context = this._layoutEditorContext();
    if (context && this._layoutEditorSnapshot) {
      if (context.metrics !== false) context.profile.bubble_positions = this._layoutEditorSnapshot.bubble_positions;
      context.profile.flow_node_positions = this._layoutEditorSnapshot.flow_node_positions;
      context.profile.flow_element_styles = this._layoutEditorSnapshot.flow_element_styles;
      if (context.metrics !== false) context.profile.bubble_layout = this._layoutEditorSnapshot.bubble_layout;
    }
    this._layoutEditorTarget = null;
    this._layoutEditorSnapshot = null;
    this._message = "Anulowano edycję diagramu i dymków.";
    this._render();
  }

  _resetBubbleLayoutEditor() {
    const context = this._layoutEditorContext();
    if (!context) return;
    if (context.metrics !== false) context.profile.bubble_positions = {};
    context.profile.flow_node_positions = {};
    this._message = "Przywrócono domyślne położenie dymków i elementów diagramu. Kliknij ZAPISZ USTAWIENIA.";
    this._render();
  }

  _addFlowExtraField() {
    if (!this._isAdmin()) return;
    const context = this._layoutEditorContext();
    if (!context || !this._layoutSelectedElement) return;
    context.profile.flow_element_styles ||= {};
    const style = context.profile.flow_element_styles[this._layoutSelectedElement] ||= {};
    const fields = style.extra_fields ||= [];
    if (fields.length >= 8) return;
    const n = fields.length + 1;
    fields.push({ id: this._id("field"), name: `Pole ${n}`, entity_id: "", attribute: "", unit: "", decimals: 1, multiplier: 1, color: "#8eb5c3", label_size: 6, value_size: 9, unit_size: 6, label_bold: false, value_bold: true, unit_bold: false, enabled: true });
    this._render();
  }

  _removeFlowExtraField(index) {
    if (!this._isAdmin()) return;
    const context = this._layoutEditorContext();
    const fields = context?.profile?.flow_element_styles?.[this._layoutSelectedElement]?.extra_fields;
    if (!Array.isArray(fields) || !Number.isInteger(index)) return;
    fields.splice(index, 1);
    this._render();
  }

  _addSettingsExtraField() {
    if (!this._isAdmin() || this._view !== "settings") return;
    const profile = this._settingsContext()?.profile;
    if (!profile || !this._settingsSelectedKey) return;
    profile.flow_element_styles ||= {};
    const style = profile.flow_element_styles[this._settingsSelectedKey] ||= {};
    const fields = style.extra_fields ||= [];
    if (fields.length >= 8) return;
    const number = fields.length + 1;
    fields.push({ id: this._id("field"), name: `Pole ${number}`, entity_id: "", attribute: "", unit: "", decimals: 1, multiplier: 1, color: "#8eb5c3", label_size: 6, value_size: 9, unit_size: 6, label_bold: false, value_bold: true, unit_bold: false, enabled: true });
    this._render();
  }

  _removeSettingsExtraField(index) {
    if (!this._isAdmin() || this._view !== "settings") return;
    const fields = this._settingsContext()?.profile?.flow_element_styles?.[this._settingsSelectedKey]?.extra_fields;
    if (!Array.isArray(fields) || !Number.isInteger(index)) return;
    fields.splice(index, 1);
    this._render();
  }

  _validSettingsTileClipboard(value) {
    return Boolean(value && value.version === 1 && value.kind === "matrix_flow_tile" && value.style && typeof value.style === "object" && value.layout && typeof value.layout === "object");
  }

  _readSettingsTileClipboard() {
    if (this._validSettingsTileClipboard(this._settingsTileClipboard)) return this._settingsTileClipboard;
    try {
      const stored = JSON.parse(window.localStorage?.getItem("matrix_energy_center.flow_tile_clipboard.v1") || "null");
      if (this._validSettingsTileClipboard(stored)) {
        this._settingsTileClipboard = stored;
        return stored;
      }
    } catch (_) { /* Memory clipboard remains available when localStorage is blocked. */ }
    return null;
  }

  _settingsTilePayload() {
    const context = this._settingsContext();
    if (!context || !this._settingsSelectedKey) return null;
    const model = this._flowSceneModel(context.profile);
    const node = model.nodes.find(item => item.key === this._settingsSelectedKey);
    if (!node) return null;
    const scene = this._ensureFlowScene(context.profile);
    const layout = scene.elements[node.key] || { x: node.x, y: node.y, width: node.width, height: node.height, z_index: node.z_index, visible: node.visible !== false, locked: Boolean(node.locked) };
    const style = context.profile.flow_element_styles?.[node.key] || {};
    return JSON.parse(JSON.stringify({ version: 1, kind: "matrix_flow_tile", source_target: context.target, source_label: context.label, source_key: node.key, copied_at: new Date().toISOString(), style, layout }));
  }

  _applySettingsTilePayload(payload, mode = "style") {
    if (!this._validSettingsTileClipboard(payload)) return false;
    const context = this._settingsContext();
    if (!context || !this._settingsSelectedKey) return false;
    const model = this._flowSceneModel(context.profile);
    const destination = model.nodes.find(item => item.key === this._settingsSelectedKey);
    if (!destination) return false;
    const clone = value => JSON.parse(JSON.stringify(value));
    context.profile.flow_element_styles ||= {};
    context.profile.flow_element_styles[destination.key] = clone(payload.style);
    const scene = this._ensureFlowScene(context.profile);
    const current = scene.elements[destination.key] || { x: destination.x, y: destination.y, width: destination.width, height: destination.height, z_index: destination.z_index, visible: destination.visible !== false, locked: Boolean(destination.locked) };
    const copied = clone(payload.layout);
    scene.elements[destination.key] = mode === "all"
      ? copied
      : { ...current, width: copied.width ?? current.width, height: copied.height ?? current.height };
    return true;
  }

  _copySettingsTile() {
    if (!this._isAdmin() || this._view !== "settings") return;
    const payload = this._settingsTilePayload();
    if (!payload) return;
    this._settingsTileClipboard = payload;
    try { window.localStorage?.setItem("matrix_energy_center.flow_tile_clipboard.v1", JSON.stringify(payload)); } catch (_) { /* In-memory copy still works. */ }
    if (typeof navigator !== "undefined") navigator.clipboard?.writeText?.(JSON.stringify(payload)).catch?.(() => {});
    this._message = `Skopiowano kafelek ${payload.source_key} z pulpitu ${payload.source_label}. Wybierz inny pulpit i wklej.`;
    this._render();
  }

  _pasteSettingsTile(mode = "style") {
    if (!this._isAdmin() || this._view !== "settings") return;
    const payload = this._readSettingsTileClipboard();
    if (!payload || !this._applySettingsTilePayload(payload, mode === "all" ? "all" : "style")) {
      this._message = "Schowek kafelków jest pusty albo wybrany obiekt nie jest dymkiem.";
      this._updateMessage();
      return;
    }
    this._message = mode === "all" ? "Wklejono cały kafelek razem z pozycją — zapisz ustawienia." : "Wklejono wygląd i rozmiar kafelka bez zmiany pozycji — zapisz ustawienia.";
    this._render();
  }

  _resetSettingsScene() {
    if (!this._isAdmin() || this._view !== "settings") return;
    const context = this._settingsContext();
    if (!context?.profile) return;
    const canvasHeight = context.target === "flow" ? 620 : context.target === "overview" ? 520 : 460;
    context.profile.flow_scene = {
      canvas_height: canvasHeight,
      show_grid: true,
      grid_size: 20,
      snap_to_grid: true,
      background_color: "#020b16",
      border_color: "#20eaff",
      border_width: 1,
      border_radius: 16,
      routing_clearance: 20,
      routing_spacing: 14,
      elements: {},
      connections: {},
    };
    context.profile.flow_element_styles = {};
    this._settingsSelectedKind = "node";
    this._settingsSelectedKey = "home";
    this._message = `Zresetowano grafikę: ${context.label}. Zapisz ustawienia.`;
    this._render();
  }

  async _saveBubbleLayoutEditor() {
    if (!this._isAdmin() || !this._layoutEditorContext()) return;
    this._layoutEditorTarget = null;
    this._layoutEditorSnapshot = null;
    await this._saveConfig();
  }

  _activeFlowElementProfile() {
    if (this._view === "kiosk") return this._activeKioskProfile();
    if (this._view === "overview") return this._config.overview || {};
    return this._config.flow || {};
  }

  async _executeFlowElementAction(key) {
    if (["configuration", "settings"].includes(this._view)) return;
    const style = this._activeFlowElementProfile()?.flow_element_styles?.[this._flowNodeKey(key)] || {};
    const action = style.tap_action || "none";
    const entityId = String(style.action_entity_id || "").trim();
    try {
      if (action === "more_info" && entityId) {
        this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
      } else if (action === "toggle" && entityId) {
        await this._hass.callService("homeassistant", "toggle", { entity_id: entityId });
      } else if (action === "navigate") {
        const path = String(style.navigation_path || "").trim();
        if (!path.startsWith("/")) return;
        window.history.pushState(null, "", path);
        window.dispatchEvent(new Event("location-changed"));
      } else if (action === "service") {
        const [domain, service] = String(style.service || "").split(".", 2);
        if (!domain || !service) return;
        let data = {};
        try { data = JSON.parse(style.service_data || "{}"); } catch (_) { this._message = "Nieprawidłowy JSON danych usługi."; this._updateMessage(); return; }
        if (entityId && data.entity_id == null) data.entity_id = entityId;
        await this._hass.callService(domain, service, data);
      }
    } catch (err) {
      this._message = `Błąd akcji elementu: ${err?.message || err}`;
      this._updateMessage();
    }
  }

  _toggleKioskBuiltin(profileIndex, itemId, checked) {
    if (!this._isAdmin()) return;
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    if (!profile || !["home", "pv", "grid", "battery", "ev", "price"].includes(itemId)) return;
    const ids = new Set(profile.builtin_bubble_ids || ["home", "pv", "grid"]);
    if (checked) ids.add(itemId); else ids.delete(itemId);
    profile.builtin_bubble_ids = [...ids];
  }

  _resetKioskLayout(profileIndex) {
    if (!this._isAdmin()) return;
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    if (!profile) return;
    profile.bubble_positions = {};
    profile.flow_node_positions = {};
    profile.flow_offset_x = 0;
    profile.flow_offset_y = -30;
    profile.flow_scale = 100;
    this._message = "Zresetowano położenie dymków i diagramu. Zapisz zmiany.";
    this._render();
  }

  _addKioskLovelaceView(profileIndex) {
    if (!this._isAdmin()) return;
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    if (!profile) return;
    const items = profile.lovelace_views ||= [];
    if (items.length >= 12) return;
    const n = items.length + 1;
    items.push({ id: this._id("lovelace"), name: `Lovelace ${n}`, path: "", enabled: true, scale: 100, offset_x: 0, offset_y: 0, padding: 0, border_radius: 12, background_color: "#010914", border_color: "#20eaff" });
    this._render();
  }

  _removeKioskLovelaceView(profileIndex, index) {
    if (!this._isAdmin()) return;
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    if (!profile || !Number.isInteger(index)) return;
    (profile.lovelace_views || []).splice(index, 1);
    this._render();
  }

  _moveKioskLovelaceView(profileIndex, index, direction) {
    if (!this._isAdmin() || ![-1, 1].includes(direction)) return;
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    const items = profile?.lovelace_views;
    const destination = index + direction;
    if (!Array.isArray(items) || index < 0 || destination < 0 || destination >= items.length) return;
    [items[index], items[destination]] = [items[destination], items[index]];
    this._message = "Zmieniono kolejność zakładek kiosku — zapisz konfigurację.";
    this._render();
  }

  _previewKioskLovelaceView(profileIndex, index) {
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    const item = profile?.lovelace_views?.[index];
    if (!item) return;
    const normalized = this._normalizeHaViewPath(item.path);
    if (normalized.error || !normalized.path) {
      this._message = normalized.error || "Najpierw wpisz adres pulpitu Home Assistant.";
      this._updateMessage();
      return;
    }
    window.open?.(normalized.path, "_blank", "noopener");
  }

  _bindWidgetDragDrop() {
    if (!this._isAdmin()) return;
    this.shadowRoot.querySelectorAll("[data-drag-type]").forEach(card => {
      card.addEventListener("dragstart", event => {
        this._dragState = { type: card.dataset.dragType, index: Number(card.dataset.dragIndex) };
        card.classList.add("dragging");
        event.dataTransfer?.setData("text/plain", `${card.dataset.dragType}:${card.dataset.dragIndex}`);
      });
      card.addEventListener("dragend", () => { card.classList.remove("dragging"); this._dragState = null; });
      card.addEventListener("dragover", event => {
        if (this._dragState?.type !== card.dataset.dragType) return;
        event.preventDefault();
        card.classList.add("drag-target");
      });
      card.addEventListener("dragleave", () => card.classList.remove("drag-target"));
      card.addEventListener("drop", event => {
        event.preventDefault();
        card.classList.remove("drag-target");
        const from = this._dragState?.index, to = Number(card.dataset.dragIndex);
        const list = card.dataset.dragType === "bubble" ? this._config.overview_bubbles : this._config.overview_charts;
        if (!Number.isInteger(from) || !Number.isInteger(to) || from === to || !list?.[from]) return;
        const [moved] = list.splice(from, 1);
        list.splice(to, 0, moved);
        list.forEach((item, index) => { item.order = index + 1; });
        this._dragState = null;
        this._render();
      });
    });
  }

  _bindKioskLayoutEditor() {
    if (!this._isAdmin() || !this._layoutEditorTarget) return;
    const context = this._layoutEditorContext();
    if (!context) return;
    const profile = context.profile;
    if (context.metrics !== false) profile.bubble_positions ||= {};
    profile.flow_node_positions ||= {};
    const begin = (event, mode) => {
      const handle = event.currentTarget;
      const slot = handle.closest("[data-kiosk-item]");
      const stage = handle.closest(".kiosk-bubble-stage");
      const flowNode = handle.closest("[data-flow-layout-element]");
      if ((mode === "move" || mode === "resize") && (!slot || !stage || !stage.classList.contains("layout-free"))) return;
      if (mode === "node" && !flowNode) return;
      event.preventDefault();
      event.stopPropagation();
      const stageRect = stage?.getBoundingClientRect();
      const slotRect = slot?.getBoundingClientRect();
      const boundaryRect = handle.closest("[data-layout-boundary]")?.getBoundingClientRect();
      const key = slot?.dataset.kioskItem;
      const position = key ? (profile.bubble_positions[key] ||= {}) : null;
      const startXPercent = stageRect && slotRect ? ((slotRect.left - stageRect.left) / stageRect.width) * 100 : 0;
      const startY = stageRect && slotRect ? slotRect.top - stageRect.top : 0;
      const startWidth = stageRect && slotRect ? (slotRect.width / stageRect.width) * 100 : 16;
      const nodeKey = flowNode?.dataset.flowLayoutElement;
      const nodePosition = nodeKey ? (profile.flow_node_positions[nodeKey] ||= {}) : null;
      const nodeVisual = flowNode;
      const nodeRect = nodeVisual?.getBoundingClientRect();
      this._layoutPointerState = { mode, startClientX: event.clientX, startClientY: event.clientY, stageRect, boundaryRect, slot, key, position, startXPercent, startY, startWidth, flowNode, nodeVisual, nodeRect, nodePosition, nodeKey, nodeX: Number(nodePosition?.x || 0), nodeY: Number(nodePosition?.y || 0), moved: false };
      const move = pointerEvent => {
        const state = this._layoutPointerState;
        if (!state) return;
        pointerEvent.preventDefault();
        const dx = pointerEvent.clientX - state.startClientX;
        const dy = pointerEvent.clientY - state.startClientY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) state.moved = true;
        if (state.mode === "node" && state.flowNode && state.nodePosition) {
          const leftLimit = state.boundaryRect && state.nodeRect ? state.nodeX + state.boundaryRect.left - state.nodeRect.left : -600;
          const rightLimit = state.boundaryRect && state.nodeRect ? state.nodeX + state.boundaryRect.right - state.nodeRect.right : 600;
          const topLimit = state.boundaryRect && state.nodeRect ? state.nodeY + state.boundaryRect.top - state.nodeRect.top : -600;
          const bottomLimit = state.boundaryRect && state.nodeRect ? state.nodeY + state.boundaryRect.bottom - state.nodeRect.bottom : 600;
          const minimumX = Math.max(-600, Math.min(leftLimit, rightLimit));
          const maximumX = Math.min(600, Math.max(leftLimit, rightLimit));
          const minimumY = Math.max(-600, Math.min(topLimit, bottomLimit));
          const maximumY = Math.min(600, Math.max(topLimit, bottomLimit));
          const x = Math.min(maximumX, Math.max(minimumX, state.nodeX + dx));
          const y = Math.min(maximumY, Math.max(minimumY, state.nodeY + dy));
          Object.assign(state.nodePosition, { x: Math.round(x), y: Math.round(y) });
          state.flowNode.style.setProperty("--flow-node-x", `${x}px`);
          state.flowNode.style.setProperty("--flow-node-y", `${y}px`);
          return;
        }
        if (!state.stageRect || !state.position) return;
        if (state.mode === "move") {
          const width = Number(state.position.width ?? state.startWidth);
          const x = Math.max(0, Math.min(100 - width, state.startXPercent + (dx / state.stageRect.width) * 100));
          const availableBottom = state.boundaryRect ? state.boundaryRect.bottom - state.stageRect.top : state.stageRect.height;
          const maximumY = Math.max(0, Math.min(720, availableBottom - state.slot.offsetHeight));
          const y = Math.max(0, Math.min(maximumY, state.startY + dy));
          Object.assign(state.position, { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), width: Number(width.toFixed(2)) });
          state.slot.style.setProperty("--kiosk-x", `${x}%`);
          state.slot.style.setProperty("--kiosk-y", `${y}px`);
        } else if (state.mode === "resize") {
          const currentX = Number(state.position.x ?? state.startXPercent);
          const width = Math.max(8, Math.min(60, 100 - currentX, state.startWidth + (dx / state.stageRect.width) * 100));
          Object.assign(state.position, { x: Number(currentX.toFixed(2)), y: Number(Number(state.position.y ?? state.startY).toFixed(2)), width: Number(width.toFixed(2)) });
          state.slot.style.setProperty("--kiosk-w", `${width}%`);
        }
      };
      const end = () => {
        const state = this._layoutPointerState;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", end);
        window.removeEventListener("pointercancel", end);
        this._layoutPointerState = null;
        this._message = "Układ zmieniony. Kliknij ZAPISZ USTAWIENIA.";
        if (state?.mode === "node" && !state.moved && state.nodeKey) {
          this._layoutSelectedElement = state.nodeKey;
          this._render();
        }
      };
      window.addEventListener("pointermove", move, { passive: false });
      window.addEventListener("pointerup", end, { once: true });
      window.addEventListener("pointercancel", end, { once: true });
    };
    this.shadowRoot.querySelectorAll("[data-layout-drag='bubble']").forEach(handle => handle.addEventListener("pointerdown", event => begin(event, "move")));
    this.shadowRoot.querySelectorAll(".layout-editor-dialog .kiosk-bubble-slot > .metric-card").forEach(bubble => bubble.addEventListener("pointerdown", event => begin(event, "move")));
    this.shadowRoot.querySelectorAll("[data-layout-resize='bubble']").forEach(handle => handle.addEventListener("pointerdown", event => begin(event, "resize")));
    this.shadowRoot.querySelectorAll(".layout-editor-dialog [data-flow-layout-element]").forEach(element => element.addEventListener("pointerdown", event => begin(event, "node")));
  }

  async _executeWidgetAction(kind, index) {
    const item = kind === "bubble" ? this._config.overview_bubbles?.[index] : this._config.overview_charts?.[index];
    if (!item || !item.tap_action || item.tap_action === "none") return;
    if (item.tap_action === "more_info") {
      if (!item.entity_id) return;
      this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: item.entity_id }, bubbles: true, composed: true }));
      return;
    }
    if (item.tap_action === "navigate") {
      const path = String(item.navigation_path || "").trim();
      if (!path.startsWith("/")) return;
      window.history.pushState(null, "", path);
      window.dispatchEvent(new Event("location-changed"));
      return;
    }
    if (item.tap_action === "service") {
      const [domain, service] = String(item.service || "").split(".", 2);
      if (!domain || !service) return;
      try {
        const data = JSON.parse(item.service_data || "{}");
        if (!data.entity_id && item.entity_id) data.entity_id = item.entity_id;
        await this._hass.callService(domain, service, data);
        this._message = `Wysłano ${domain}.${service}`;
      } catch (err) { this._message = `Błąd akcji: ${err?.message || err}`; }
      this._updateMessage();
    }
  }

  _exportConfig() {
    const blob = new Blob([JSON.stringify(this._config, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "matrix-energy-center-config.json";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  _importConfig(event) {
    if (!this._isAdmin()) return;
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== "object") throw new Error("Nieprawidłowy format");
        this._config = this._deepMerge(JSON.parse(JSON.stringify(this._config || {})), parsed);
        this._message = "Konfiguracja zaimportowana i uzupełniona o brakujące pola — naciśnij ZAPISZ ZMIANY.";
        this._render();
      } catch (err) {
        this._message = `Błąd importu: ${err?.message || err}`;
        this._updateMessage();
      }
    };
    reader.readAsText(file);
  }

  _deepMerge(base, incoming) {
    if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) return incoming;
    const result = base && typeof base === "object" && !Array.isArray(base) ? base : {};
    for (const [key, value] of Object.entries(incoming)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        result[key] = this._deepMerge(result[key], value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  async _controlDevice(index) {
    const device = this._config.devices[index];
    if (!device?.control_entity) return;
    if (!this._isAdmin() && !this._config.permissions.allow_non_admin_control) return;
    const [domain] = device.control_entity.split(".");
    const service = domain === "button" ? "press" : ["switch","input_boolean","light"].includes(domain) ? "toggle" : null;
    if (!service) {
      this._message = "Ta encja wymaga dedykowanego sterowania — w wersji 0.5 obsługiwane są switch, input_boolean, light i button.";
      this._updateMessage();
      return;
    }
    try {
      await this._hass.callService(domain, service, {}, { entity_id: device.control_entity });
      this._message = `Wysłano ${domain}.${service} do ${device.control_entity}`;
    } catch (err) { this._message = `Błąd sterowania: ${err?.message || err}`; }
    this._updateMessage();
  }

  async _testEntity(entityId) {
    try {
      const result = await this._hass.callWS({ type: `${DOMAIN}/entity/test`, entity_id: entityId });
      this._message = `${entityId}: ${result.state} ${result.attributes.unit_of_measurement || ""} · ${result.attributes.device_class || "bez device_class"}`;
    } catch (err) { this._message = `Test nieudany: ${err?.message || err}`; }
    this._updateMessage();
  }

  async _refreshRuntime(rerender = true) {
    try {
      this._runtime = await this._hass.callWS({ type: `${DOMAIN}/runtime/get` });
      if (rerender) {
        this._message = "Dane runtime odświeżone.";
        this._render();
      } else {
        this._sampleHistory();
        this._updateLive();
      }
    } catch (err) { if (rerender) { this._message = `Błąd: ${err?.message || err}`; this._updateMessage(); } }
  }

  async _toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await this.requestFullscreen();
    } catch (err) {
      this._message = `Tryb pełnoekranowy jest niedostępny: ${err?.message || err}`;
      this._updateMessage();
    }
  }

  _startKioskRotation() {
    clearInterval(this._kioskRotationTimer);
    if (this._view !== "kiosk") return;
    const profile = this._activeKioskProfile();
    this._applyKioskNightMode(profile);
    this._armKioskFullscreen(profile);
    if (this._notificationBlocksRotation()) return;
    const count = this.shadowRoot.querySelectorAll("[data-kiosk-slide]").length;
    if (profile.rotation_enabled && count > 1) {
      this._kioskRotationTimer = setInterval(() => this._advanceKiosk(1), Math.max(5, Number(profile.rotation_seconds || 20)) * 1000);
    }
  }

  _armKioskFullscreen(_profile = this._activeKioskProfile()) {
    if (document.fullscreenElement || this._autoFullscreenArmed || !this.shadowRoot) return;
    try {
      const attempt = this.requestFullscreen();
      attempt?.catch?.(() => { /* A normal browser may require the first touch. */ });
    } catch (_) { /* Fully Kiosk or the browser controls fullscreen policy. */ }
    this._autoFullscreenArmed = true;
    const activate = async () => {
      this.shadowRoot?.removeEventListener("pointerdown", activate, true);
      this.shadowRoot?.removeEventListener("keydown", activate, true);
      this._autoFullscreenArmed = false;
      if (document.fullscreenElement || this._view !== "kiosk") return;
      try { await this.requestFullscreen(); } catch (_) { /* Browser or kiosk app controls fullscreen policy. */ }
    };
    this.shadowRoot.addEventListener("pointerdown", activate, { once: true, capture: true });
    this.shadowRoot.addEventListener("keydown", activate, { once: true, capture: true });
  }

  _setKioskSlide(index) {
    const slides = [...this.shadowRoot.querySelectorAll("[data-kiosk-slide]")];
    if (!slides.length) return;
    this._kioskSlide = (index + slides.length) % slides.length;
    if (this._tabletPerformanceEnabled()) {
      this._render();
      return;
    }
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === this._kioskSlide));
    slides.forEach(slide => slide.querySelectorAll(".kiosk-dot,.kiosk-tab-button").forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === this._kioskSlide)));
    this._updateLive();
    this._scheduleSceneConnectionGeometry();
  }

  _advanceKiosk(direction) { this._setKioskSlide(this._kioskSlide + direction); }

  _updateSettingsSceneGeometry(profile) {
    this._settingsGeometryProfile = profile;
    if (this._settingsGeometryFrame) return;
    this._settingsGeometryFrame = requestAnimationFrame(() => {
      this._settingsGeometryFrame = null;
      this._applySettingsSceneGeometry(this._settingsGeometryProfile);
    });
  }

  _applySettingsSceneGeometry(profile) {
    const model = this._flowSceneModel(profile);
    const nodes = Object.fromEntries(model.nodes.map(item => [item.key, item]));
    const sceneElement = this.shadowRoot.querySelector("[data-flow-scene]");
    sceneElement?.querySelectorAll("[data-scene-node]").forEach(element => {
      const node = nodes[element.dataset.sceneNode];
      if (!node) return;
      element.style.setProperty("--scene-x", `${node.x}%`);
      element.style.setProperty("--scene-y", `${node.y}%`);
    });
    this._applySceneConnectionGeometry(profile, sceneElement);
  }

  _bindSettingsSceneEditor() {
    if (this._view !== "settings" || !this._isAdmin()) return;
    const context = this._settingsContext(), sceneElement = this.shadowRoot.querySelector("[data-flow-scene]");
    if (!context || !sceneElement) return;
    const scene = this._ensureFlowScene(context.profile);
    this.shadowRoot.querySelectorAll("[data-scene-connection]").forEach(connection => connection.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      this._settingsSelectedKind = "connection";
      this._settingsSelectedKey = connection.dataset.sceneConnection;
      this._render();
    }));
    this.shadowRoot.querySelectorAll("[data-scene-connection-label]").forEach(label => label.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      const key = label.dataset.sceneConnectionLabel;
      const connection = this._flowSceneModel(context.profile).connections.find(item => item.key === key);
      if (!connection) return;
      this._settingsSelectedKind = "connection";
      this._settingsSelectedKey = key;
      const config = scene.connections[key] ||= { ...connection };
      const pointerId = event.pointerId, startX = event.clientX, startY = event.clientY;
      const offsetX = Number(config.label_x || 0), offsetY = Number(config.label_y || 0);
      let moved = false;
      label.setPointerCapture?.(pointerId);
      const move = pointerEvent => {
        if (pointerEvent.pointerId !== pointerId) return;
        const dx = pointerEvent.clientX - startX, dy = pointerEvent.clientY - startY;
        moved ||= Math.abs(dx) > 2 || Math.abs(dy) > 2;
        config.label_x = Math.round(Math.max(-400, Math.min(400, offsetX + dx)));
        config.label_y = Math.round(Math.max(-400, Math.min(400, offsetY + dy)));
        label.style.setProperty("--label-offset-x", `${config.label_x}px`);
        label.style.setProperty("--label-offset-y", `${config.label_y}px`);
      };
      const end = pointerEvent => {
        if (pointerEvent.pointerId != null && pointerEvent.pointerId !== pointerId) return;
        label.removeEventListener("pointermove", move);
        label.removeEventListener("pointerup", end);
        label.removeEventListener("pointercancel", end);
        this._message = moved ? "Położenie opisu linii zmienione — zapisz ustawienia." : "Wybrano linię przepływu.";
        this._render();
      };
      label.addEventListener("pointermove", move, { passive: false });
      label.addEventListener("pointerup", end);
      label.addEventListener("pointercancel", end);
    }));
    this.shadowRoot.querySelectorAll("[data-scene-resize]").forEach(handle => handle.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      event.preventDefault(); event.stopPropagation();
      const key = handle.dataset.sceneResize, modelNode = this._flowSceneModel(context.profile).nodes.find(item => item.key === key);
      if (!modelNode || modelNode.locked) return;
      const layout = scene.elements[key] ||= { x: modelNode.x, y: modelNode.y, width: modelNode.width, height: modelNode.height, z_index: modelNode.z_index, visible: true, locked: false };
      const startX = event.clientX, startY = event.clientY, startWidth = Number(layout.width), startHeight = Number(layout.height), pointerId = event.pointerId;
      const node = handle.closest("[data-scene-node]");
      handle.setPointerCapture?.(pointerId);
      const move = pointerEvent => {
        if (pointerEvent.pointerId !== pointerId) return;
        layout.width = Math.round(Math.max(40, Math.min(360, startWidth + pointerEvent.clientX - startX)));
        layout.height = Math.round(Math.max(30, Math.min(360, startHeight + pointerEvent.clientY - startY)));
        node?.style.setProperty("--scene-w", `${layout.width}px`); node?.style.setProperty("--scene-h", `${layout.height}px`);
      };
      const end = pointerEvent => {
        if (pointerEvent.pointerId != null && pointerEvent.pointerId !== pointerId) return;
        handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", end); handle.removeEventListener("pointercancel", end);
        this._message = "Rozmiar dymku zmieniony — zapisz ustawienia."; this._render();
      };
      handle.addEventListener("pointermove", move, { passive: false }); handle.addEventListener("pointerup", end); handle.addEventListener("pointercancel", end);
    }));
    this.shadowRoot.querySelectorAll("[data-scene-node]").forEach(nodeElement => nodeElement.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      if (event.target.closest?.("[data-scene-resize]")) return;
      const key = nodeElement.dataset.sceneNode;
      const modelNode = this._flowSceneModel(context.profile).nodes.find(item => item.key === key);
      if (!modelNode) return;
      this._settingsSelectedKind = "node";
      this._settingsSelectedKey = key;
      if (modelNode.locked) { this._render(); return; }
      event.preventDefault();
      event.stopPropagation();
      const rect = sceneElement.getBoundingClientRect();
      const layout = scene.elements[key] ||= { x: modelNode.x, y: modelNode.y, width: modelNode.width, height: modelNode.height, z_index: modelNode.z_index, visible: true, locked: false };
      const pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: Number(layout.x), y: Number(layout.y), moved: false };
      this._settingsPointerState = pointer;
      nodeElement.setPointerCapture?.(event.pointerId);
      const move = pointerEvent => {
        if (pointerEvent.pointerId !== pointer.id) return;
        const dx = pointerEvent.clientX - pointer.startX, dy = pointerEvent.clientY - pointer.startY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) pointer.moved = true;
        let x = Math.max(0, Math.min(100, pointer.x + dx / rect.width * 100));
        let y = Math.max(0, Math.min(100, pointer.y + dy / rect.height * 100));
        if (scene.snap_to_grid !== false) {
          const stepX = Math.max(.1, Number(scene.grid_size || 20) / rect.width * 100), stepY = Math.max(.1, Number(scene.grid_size || 20) / rect.height * 100);
          x = Math.round(x / stepX) * stepX;
          y = Math.round(y / stepY) * stepY;
        }
        layout.x = Number(x.toFixed(2)); layout.y = Number(y.toFixed(2));
        this._updateSettingsSceneGeometry(context.profile);
      };
      const end = pointerEvent => {
        if (pointerEvent.pointerId != null && pointerEvent.pointerId !== pointer.id) return;
        nodeElement.removeEventListener("pointermove", move);
        nodeElement.removeEventListener("pointerup", end);
        nodeElement.removeEventListener("pointercancel", end);
        this._settingsPointerState = null;
        this._message = "Układ zmieniony — zapisz ustawienia.";
        this._render();
      };
      nodeElement.addEventListener("pointermove", move, { passive: false });
      nodeElement.addEventListener("pointerup", end);
      nodeElement.addEventListener("pointercancel", end);
    }));
  }

  _bindKioskSwipe() {
    if (this._view !== "kiosk" || this._layoutEditorTarget) return;
    const container = this.shadowRoot.querySelector(".kiosk-slides");
    if (!container) return;
    let swipe = null;
    const finish = (event, cancelled = false) => {
      if (!swipe || (event.pointerId != null && event.pointerId !== swipe.pointerId)) return;
      const { slide, dx, width, horizontal } = swipe;
      slide?.style.removeProperty("transform");
      slide?.style.removeProperty("opacity");
      slide?.style.removeProperty("transition");
      swipe = null;
      if (!cancelled && horizontal && Math.abs(dx) >= Math.max(55, width * 0.1)) this._advanceKiosk(dx < 0 ? 1 : -1);
    };
    container.addEventListener("pointerdown", event => {
      if (event.button !== 0 || event.target.closest("button,input,select,textarea,a,iframe,[data-widget-action],[data-kiosk-item]")) return;
      const slide = event.target.closest(".kiosk-slide.active");
      if (!slide) return;
      const rect = container.getBoundingClientRect();
      swipe = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, dx: 0, width: rect.width, horizontal: false, slide };
      container.setPointerCapture?.(event.pointerId);
    });
    container.addEventListener("pointermove", event => {
      if (!swipe || event.pointerId !== swipe.pointerId) return;
      const dx = event.clientX - swipe.startX;
      const dy = event.clientY - swipe.startY;
      if (!swipe.horizontal && Math.abs(dy) > Math.abs(dx) + 8) return finish(event, true);
      if (Math.abs(dx) < 8) return;
      swipe.horizontal = true;
      swipe.dx = Math.max(-swipe.width * 0.42, Math.min(swipe.width * 0.42, dx));
      event.preventDefault();
      swipe.slide.style.transition = "none";
      swipe.slide.style.transform = `translateX(${swipe.dx}px)`;
      swipe.slide.style.opacity = String(Math.max(0.55, 1 - Math.abs(swipe.dx) / swipe.width));
    }, { passive: false });
    container.addEventListener("pointerup", event => finish(event));
    container.addEventListener("pointercancel", event => finish(event, true));
  }

  _bindKioskIframeSwipe() {
    if (this._view !== "kiosk" || !this.shadowRoot) return;
    this._kioskSwipeDocuments ||= new WeakSet();
    this.shadowRoot.querySelectorAll(".kiosk-lovelace-slide iframe").forEach(iframe => {
      const bindDocument = () => {
        try {
          const frameDocument = iframe.contentDocument;
          if (!frameDocument || this._kioskSwipeDocuments.has(frameDocument)) return;
          this._kioskSwipeDocuments.add(frameDocument);
          let touch = null;
          frameDocument.addEventListener("touchstart", event => {
            if (event.touches.length !== 1) { touch = null; return; }
            const point = event.touches[0];
            touch = { x: point.clientX, y: point.clientY, width: iframe.getBoundingClientRect().width, started: Date.now() };
          }, { passive: true, capture: true });
          frameDocument.addEventListener("touchend", event => {
            if (!touch || !event.changedTouches.length) return;
            const point = event.changedTouches[0];
            const dx = point.clientX - touch.x, dy = point.clientY - touch.y;
            const threshold = Math.max(55, touch.width * 0.1);
            const valid = Date.now() - touch.started < 1800 && Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.2;
            touch = null;
            if (valid) this._advanceKiosk(dx < 0 ? 1 : -1);
          }, { passive: true, capture: true });
          frameDocument.addEventListener("touchcancel", () => { touch = null; }, { passive: true, capture: true });
        } catch (_) { /* Only same-origin Home Assistant pages receive inner-frame swipe support. */ }
      };
      iframe.addEventListener("load", bindDocument);
      requestAnimationFrame(bindDocument);
    });
  }

  _applyKioskNightMode(profile = this._activeKioskProfile()) {
    const shell = this.shadowRoot.querySelector(".matrix-shell");
    if (!shell) return;
    let active = false;
    if (profile?.night_enabled) {
      const toMinutes = value => {
        const [hour, minute] = String(value || "00:00").split(":").map(Number);
        return Math.max(0, Math.min(1439, hour * 60 + minute));
      };
      const now = new Date(), current = now.getHours() * 60 + now.getMinutes();
      const start = toMinutes(profile.night_start || "22:00"), end = toMinutes(profile.night_end || "06:00");
      active = start === end ? true : start < end ? current >= start && current < end : current >= start || current < end;
    }
    shell.classList.toggle("kiosk-night", active);
    shell.style.setProperty("--night-brightness", String(Math.max(5, Math.min(100, Number(profile?.night_brightness || 30))) / 100));
  }

  _updateMessage() { const el = this.shadowRoot.querySelector(".status-message"); if (el) el.textContent = this._message; }

  _runtimeValues() {
    const m = this._config?.mappings || {};
    const signs = this._config?.signs || {};
    const backend = this._runtime || {};
    let pv = this._readPower(m.pv_power);
    if (pv == null) pv = backend.pv_power ?? null;
    if (pv == null) {
      let total = 0, found = false;
      for (const string of this._config.pv_strings || []) {
        if (string.enabled === false) continue;
        let value = this._readPower(string.power_entity);
        if (value != null) { total += value; found = true; continue; }
        for (const section of string.sections || []) {
          if (section.enabled === false) continue;
          value = this._readPower(section.power_entity);
          if (value != null) { total += value; found = true; }
        }
      }
      pv = found ? total : null;
    }

    const rawGridSigned = this._readPower(m.grid_power);
    const directImport = this._readPower(m.grid_import_power);
    const directExport = this._readPower(m.grid_export_power);
    const gridImport = directImport ?? backend.grid_import_power ?? (rawGridSigned == null ? 0 : signs.grid_positive_is_import ? Math.max(rawGridSigned, 0) : Math.max(-rawGridSigned, 0));
    const gridExport = directExport ?? backend.grid_export_power ?? (rawGridSigned == null ? 0 : signs.grid_positive_is_import ? Math.max(-rawGridSigned, 0) : Math.max(rawGridSigned, 0));
    const gridSigned = rawGridSigned ?? (gridImport - gridExport);

    const rawBatterySigned = this._readPower(m.battery_power);
    const directCharge = this._readPower(m.battery_charge_power);
    const directDischarge = this._readPower(m.battery_discharge_power);
    const batteryCharge = directCharge ?? backend.battery_charge_power ?? (rawBatterySigned == null ? 0 : signs.battery_positive_is_charge ? Math.max(rawBatterySigned, 0) : Math.max(-rawBatterySigned, 0));
    const batteryDischarge = directDischarge ?? backend.battery_discharge_power ?? (rawBatterySigned == null ? 0 : signs.battery_positive_is_charge ? Math.max(-rawBatterySigned, 0) : Math.max(rawBatterySigned, 0));
    const batterySigned = rawBatterySigned ?? (batteryCharge - batteryDischarge);

    let home = this._readPower(m.home_power);
    if (home == null) home = backend.home_power ?? null;
    if (home == null) home = Math.max(0, (pv || 0) + gridImport + batteryDischarge - gridExport - batteryCharge);
    const ev = this._readPower(m.ev_power) ?? backend.ev_power ?? 0;
    const batterySoc = this._readNumber(m.battery_soc) ?? backend.battery_soc ?? null;
    const evSoc = this._readNumber(m.ev_soc) ?? backend.ev_soc ?? null;
    const tariffRuntime = backend.tariff || {};
    let price = this._readNumber(m.price_buy);
    if (price == null) price = backend.price_buy ?? backend.tariff_price_total ?? tariffRuntime.total_price ?? null;
    let priceSell = this._readNumber(m.price_sell);
    if (priceSell == null) priceSell = backend.price_sell ?? null;
    const selfSufficiency = backend.self_sufficiency_live ?? (home > 0 ? Math.max(0, Math.min(100, (1 - gridImport / home) * 100)) : null);
    const selfConsumption = backend.self_consumption_live ?? (pv > 0 ? Math.max(0, Math.min(100, ((pv - gridExport) / pv) * 100)) : null);
    return {
      home, pv, gridSigned, gridImport, gridExport, batterySigned, batteryCharge, batteryDischarge, batterySoc, ev, evSoc, price, priceSell, selfSufficiency, selfConsumption,
      tariffZone: tariffRuntime.zone_name || backend.tariff_zone || null,
      tariffSeason: tariffRuntime.season === "summer" ? "Lato" : tariffRuntime.season === "winter" ? "Zima" : backend.tariff_season || null,
      tariffDayType: this._tariffDayType(tariffRuntime.day_type) || backend.tariff_day_type || null,
      tariffPrice: tariffRuntime.total_price ?? backend.tariff_price_total ?? price,
      tariffNextZone: tariffRuntime.next_zone_name || backend.tariff_next_zone || null,
      tariffNextMinutes: tariffRuntime.next_change_minutes ?? backend.tariff_next_change_minutes ?? null,
      importCostHour: backend.grid_import_cost_per_hour ?? (price != null ? gridImport / 1000 * price : null),
    };
  }


  _tariffDayType(value) {
    return ({ workday: "Dzień roboczy", day_off: "Dzień wolny", after_day_off: "Po dniu wolnym — do 07:00" })[value] || value || null;
  }

  _updateLive() {
    if (!this._rendered || !this.shadowRoot) return;
    const v = this._runtimeValues();
    const live = {
      home: this._kw(v.home), pv: this._kw(v.pv), grid: this._kw(v.gridSigned), gridSigned: this._signedKw(v.gridSigned),
      gridImport: this._kw(v.gridImport), gridExport: this._kw(v.gridExport), gridFlow: v.gridImport >= v.gridExport ? `${this._kw(v.gridImport)} →` : `← ${this._kw(v.gridExport)}`,
      battery: this._signedKw(v.batterySigned), batteryCharge: this._kw(v.batteryCharge), batteryDischarge: this._kw(v.batteryDischarge),
      batteryFlow: v.batteryCharge >= v.batteryDischarge ? `← ${this._kw(v.batteryCharge)}` : `${this._kw(v.batteryDischarge)} →`, batterySoc: this._num(v.batterySoc, 0),
      ev: this._kw(v.ev), evSoc: this._num(v.evSoc, 0), price: this._num(v.price, 3), priceSell: this._num(v.priceSell, 3),
      selfSufficiency: this._num(v.selfSufficiency, 0), selfConsumption: this._num(v.selfConsumption, 0),
      tariffZone: v.tariffZone || "--", tariffSeason: v.tariffSeason || "--", tariffDayType: v.tariffDayType || "--",
      tariffPrice: this._num(v.tariffPrice, 4), tariffNextZone: v.tariffNextZone || "--", tariffNextMinutes: v.tariffNextMinutes ?? "--",
      importCostHour: this._num(v.importCostHour, 3),
    };
    this.shadowRoot.querySelectorAll("[data-live]").forEach(el => {
      const key = el.dataset.live;
      if (key in live && el.textContent !== String(live[key])) el.textContent = live[key];
    });
    this.shadowRoot.querySelectorAll("[data-flow-custom-field]").forEach(el => {
      const value = this._widgetValue({
        entity_id: el.dataset.entityId || "",
        attribute: el.dataset.attribute || "",
        unit: el.dataset.unit || "",
        decimals: Number(el.dataset.decimals ?? 1),
        multiplier: Number(el.dataset.multiplier ?? 1),
      });
      const number = el.querySelector("b");
      const unit = el.querySelector("span");
      if (number && number.textContent !== value.formatted) number.textContent = value.formatted;
      if (unit && unit.textContent !== value.unit) unit.textContent = value.unit;
    });
    const setFlowDirection = (name, reverse, active) => {
      this.shadowRoot.querySelectorAll(`[data-flow-link="${name}"]`).forEach(link => {
        link.classList.toggle("reverse", Boolean(reverse));
        link.classList.toggle("idle", !active);
      });
    };
    setFlowDirection("grid", v.gridExport > v.gridImport, Math.max(v.gridImport || 0, v.gridExport || 0) > 1);
    setFlowDirection("battery", v.batteryDischarge > v.batteryCharge, Math.max(v.batteryCharge || 0, v.batteryDischarge || 0) > 1);
    setFlowDirection("pv", false, (v.pv || 0) > 1);
    setFlowDirection("ev", false, (v.ev || 0) > 1);
    this._updateSceneConnections(v);
    this.shadowRoot.querySelectorAll("[data-gauge]").forEach(el => {
      const value = String(Math.max(0, Math.min(100, Number(v[el.dataset.gauge] ?? 0))));
      if (el.dataset.runtimeValue !== value) { el.style.setProperty("--value", value); el.dataset.runtimeValue = value; }
    });
    this.shadowRoot.querySelectorAll("[data-gauge-status]").forEach(el => {
      const val = v[el.dataset.gaugeStatus];
      const text = val == null ? "Brak danych" : val < 20 ? "Niski poziom" : val < 80 ? "Poziom roboczy" : "Wysoki poziom";
      if (el.textContent !== text) el.textContent = text;
    });
    this._updateDevicePowers();
    this._updateFlowExtras(v);
    this._updateConsumers();
    this._updateOverviewWidgets();
    if (!this._tabletPerformanceEnabled() || Date.now() - this._lastSparklineDraw >= 5000) {
      this._lastSparklineDraw = Date.now();
      this._drawSparklines();
    }
    const count = Object.keys(this._hass?.states || {}).length;
    const footerEntities = this.shadowRoot.querySelector("[data-footer-entities]"); if (footerEntities && footerEntities.textContent !== `Encje HA: ${count}`) footerEntities.textContent = `Encje HA: ${count}`;
    const footerDevices = this.shadowRoot.querySelector("[data-footer-devices]"); if (footerDevices && footerDevices.textContent !== `Urządzenia: ${this._config.devices.length}`) footerDevices.textContent = `Urządzenia: ${this._config.devices.length}`;
    const footerStrings = this.shadowRoot.querySelector("[data-footer-strings]"); if (footerStrings && footerStrings.textContent !== `Stringi PV: ${this._config.pv_strings.length}`) footerStrings.textContent = `Stringi PV: ${this._config.pv_strings.length}`;
  }

  _renderedFlowProfile() {
    if (this._view === "settings") return this._settingsContext()?.profile || this._config.overview || {};
    if (this._view === "kiosk") return this._activeKioskProfile();
    if (this._view === "overview") return this._config.overview || {};
    return this._config.flow || {};
  }

  _flowSceneModelFor(profile) {
    if (!this._tabletPerformanceEnabled() || !profile || typeof profile !== "object") return this._flowSceneModel(profile);
    const cached = this._flowModelCache.get(profile);
    if (cached) return cached;
    const model = this._flowSceneModel(profile);
    this._flowModelCache.set(profile, model);
    return model;
  }

  _sceneRuntimeScene(sceneElement, scene = {}) {
    const bounds = sceneElement?.getBoundingClientRect?.() || {};
    const width = Number(bounds.width), height = Number(bounds.height);
    const measured = {};
    if (Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0) {
      [...sceneElement?.querySelectorAll?.("[data-scene-node]") || []].forEach(element => {
        const rect = element.getBoundingClientRect?.();
        if (!rect || !element.dataset.sceneNode) return;
        const left = (Number(rect.left) - Number(bounds.left || 0)) * 1000 / width;
        const right = (Number(rect.right) - Number(bounds.left || 0)) * 1000 / width;
        const top = (Number(rect.top) - Number(bounds.top || 0)) * 600 / height;
        const bottom = (Number(rect.bottom) - Number(bounds.top || 0)) * 600 / height;
        measured[element.dataset.sceneNode] = { left, right, top, bottom, cx: (left + right) / 2, cy: (top + bottom) / 2, width: right - left, height: bottom - top };
      });
    }
    return {
      ...scene,
      _viewport_width: Number.isFinite(width) && width > 0 ? width : 1000,
      _viewport_height: Number.isFinite(height) && height > 0 ? height : Math.max(1, Number(scene.canvas_height || 600)),
      _node_rects: measured,
    };
  }

  _applySceneConnectionGeometry(profile, sceneElement) {
    if (!profile || !sceneElement) return;
    const model = this._flowSceneModelFor(profile);
    const runtimeScene = this._sceneRuntimeScene(sceneElement, model.scene);
    const visibleConnections = model.connections.filter(connection => connection.visible !== false && model.byKey[connection.from]?.visible !== false && model.byKey[connection.to]?.visible !== false);
    const routes = this._sceneConnectionRoutes(visibleConnections, model.byKey, runtimeScene);
    visibleConnections.forEach(connection => {
      const route = routes[connection.key], path = route?.path || "";
      sceneElement.querySelectorAll?.(`[data-scene-connection="${connection.key}"] path`).forEach(pathElement => pathElement.setAttribute("d", path));
      const label = [...sceneElement.querySelectorAll?.("[data-scene-connection-label]") || []].find(element => element.dataset.sceneConnectionLabel === connection.key);
      if (route?.labelPoint && label) {
        label.style.setProperty("--label-x", `${route.labelPoint.x / 10}%`);
        label.style.setProperty("--label-y", `${route.labelPoint.y / 6}%`);
      }
    });
  }

  _syncSceneConnectionGeometry(profile = this._renderedFlowProfile()) {
    const scenes = [...this.shadowRoot?.querySelectorAll?.("[data-flow-scene]") || []];
    scenes.filter(scene => {
      const rect = scene.getBoundingClientRect?.();
      return !rect || (Number(rect.width) > 0 && Number(rect.height) > 0);
    }).forEach(scene => this._applySceneConnectionGeometry(profile, scene));
  }

  _scheduleSceneConnectionGeometry() {
    if (this._tabletPerformanceEnabled()) {
      clearTimeout(this._sceneGeometryTimer);
      this._sceneGeometryTimer = setTimeout(() => {
        this._sceneGeometryTimer = null;
        if (this._sceneGeometryFrame) return;
        this._sceneGeometryFrame = requestAnimationFrame(() => {
          this._sceneGeometryFrame = null;
          this._syncSceneConnectionGeometry();
        });
      }, 80);
      return;
    }
    if (this._sceneGeometryFrame) return;
    this._sceneGeometryFrame = requestAnimationFrame(() => {
      this._sceneGeometryFrame = null;
      this._syncSceneConnectionGeometry();
      requestAnimationFrame(() => this._syncSceneConnectionGeometry());
    });
  }

  _setupSceneGeometryObserver() {
    this._sceneResizeObserver?.disconnect?.();
    this._sceneResizeObserver = null;
    if (typeof ResizeObserver === "undefined") return;
    const scenes = [...this.shadowRoot?.querySelectorAll?.("[data-flow-scene]") || []];
    if (!scenes.length) return;
    this._sceneResizeObserver = new ResizeObserver(() => this._scheduleSceneConnectionGeometry());
    scenes.forEach(scene => this._sceneResizeObserver.observe(scene));
  }

  _updateSceneConnections(values = this._runtimeValues()) {
    if (!this.shadowRoot?.querySelector("[data-flow-scene]")) return;
    const model = this._flowSceneModelFor(this._renderedFlowProfile());
    const connections = Object.fromEntries(model.connections.map(item => [item.key, item]));
    const labels = Object.fromEntries([...this.shadowRoot.querySelectorAll("[data-scene-connection-label]")].map(item => [item.dataset.sceneConnectionLabel, item]));
    this.shadowRoot.querySelectorAll("[data-scene-connection]").forEach(element => {
      const connection = connections[element.dataset.sceneConnection];
      if (!connection) return;
      const direction = this._sceneConnectionState(connection, values);
      if (element.dataset.runtimeState !== direction.state) {
        element.classList.remove("state-forward", "state-reverse", "state-idle", "state-unavailable");
        element.classList.add(`state-${direction.state}`);
        element.dataset.runtimeState = direction.state;
      }
      const color = direction.state === "forward" ? connection.forward_color : direction.state === "reverse" ? connection.reverse_color : direction.state === "idle" ? connection.idle_color : connection.unavailable_color;
      const safeColor = this._safeColor(color, "#49616b");
      if (element.dataset.runtimeColor !== safeColor) {
        element.style.setProperty("--connection-color", safeColor);
        element.dataset.runtimeColor = safeColor;
      }
      const labelHost = labels[connection.key];
      const label = labelHost?.querySelector("span");
      const labelText = direction.value == null ? "--" : this._kw(Math.abs(Number(direction.value)));
      if (label && label.textContent !== labelText) label.textContent = labelText;
    });
  }

  _pvStringRuntime(item, index) {
    const backend = (this._runtime?.pv_strings || []).find(entry => entry.id === item.id) || (this._runtime?.pv_strings || [])[index] || {};
    let power = backend.power ?? this._readPower(item.power_entity);
    if (power == null) {
      let total = 0, found = false;
      for (const section of item.sections || []) {
        if (section.enabled === false) continue;
        const value = this._readPower(section.power_entity);
        if (value != null) { total += value; found = true; }
      }
      power = found ? total : null;
    }
    const status = backend.status ?? (item.status_entity ? this._hass?.states?.[item.status_entity]?.state : null);
    return { ...backend, power, status };
  }

  _deviceRuntime(device, index) {
    const backend = (this._runtime?.appliances || []).find(item => item.id === device.id) || (this._runtime?.appliances || [])[index] || {};
    const power = backend.power ?? this._readPower(device.power_entity);
    const threshold = Number(device.active_threshold_w ?? 10);
    const active = backend.is_active ?? (power != null && power >= threshold);
    const description = backend.display_description || (active ? device.active_description : device.idle_description) || device.description || (active ? "Urządzenie pracuje" : "Urządzenie nie pracuje");
    return { ...backend, power, active, description };
  }

  _updateFlowExtras(values = this._runtimeValues()) {
    let anySource = false;
    let anyLoad = Boolean(this.shadowRoot.querySelector('[data-flow-core-branch="ev"]')) && (values.ev || 0) > 1;
    const updateText = (selector, value) => this.shadowRoot.querySelectorAll(selector).forEach(el => { if (el.textContent !== String(value)) el.textContent = value; });
    const updateBranch = (selector, active) => this.shadowRoot.querySelectorAll(selector).forEach(el => {
      el.classList.toggle("is-active", active);
      el.classList.toggle("is-idle", !active);
    });
    const updateWire = (key, active, reverse = false) => this.shadowRoot.querySelectorAll(`[data-flow-extra-link="${key}"]`).forEach(el => {
      el.classList.toggle("idle", !active);
      el.classList.toggle("reverse", reverse);
    });

    (this._config.pv_strings || []).forEach((item, index) => {
      const runtime = this._pvStringRuntime(item, index);
      const active = Math.abs(Number(runtime.power || 0)) > 1;
      const rendered = this.shadowRoot.querySelector(`[data-flow-string-branch="${index}"]`);
      anySource ||= Boolean(rendered) && active;
      updateText(`[data-flow-string-power="${index}"]`, this._kw(runtime.power));
      updateText(`[data-flow-string-status="${index}"]`, runtime.status || item.mppt || "PV");
      updateBranch(`[data-flow-string-branch="${index}"]`, active);
      updateWire(`string-${index}`, active, false);
    });

    (this._config.devices || []).forEach((item, index) => {
      const runtime = this._deviceRuntime(item, index);
      const power = runtime.power == null ? null : Number(runtime.power);
      const active = power != null && Math.abs(power) >= Number(item.active_threshold_w ?? 10);
      const direction = item.flow_direction || "consumer";
      const reverse = direction === "bidirectional" && power != null && power < 0;
      const rendered = this.shadowRoot.querySelector(`[data-flow-device-branch="${index}"]`);
      if (rendered && active) {
        if (direction === "source") anySource = true;
        else anyLoad = true;
      }
      updateText(`[data-flow-device-flow-power="${index}"]`, this._kw(power == null ? null : Math.abs(power)));
      updateText(`[data-flow-device-status="${index}"]`, runtime.cycle_state || runtime.status || item.area || runtime.description || "Urządzenie");
      updateBranch(`[data-flow-device-branch="${index}"]`, active);
      updateWire(`device-${index}`, active, reverse);
    });

    updateBranch('[data-flow-core-branch="ev"]', (values.ev || 0) > 1);
    updateWire("ev", (values.ev || 0) > 1, false);
    this.shadowRoot.querySelectorAll('[data-flow-link="sources"]').forEach(el => el.classList.toggle("idle", !anySource));
    this.shadowRoot.querySelectorAll('[data-flow-link="loads"]').forEach(el => el.classList.toggle("idle", !anyLoad));
  }

  _updateDevicePowers() {
    (this._config.devices || []).forEach((device, index) => {
      const runtime = this._deviceRuntime(device, index);
      const el = this.shadowRoot.querySelector(`[data-device-power="${index}"]`);
      const powerText = this._num(runtime.power, 0);
      if (el && el.textContent !== powerText) el.textContent = powerText;
      const description = this.shadowRoot.querySelector(`[data-device-description="${index}"]`);
      if (description && description.textContent !== String(runtime.description || "")) description.textContent = runtime.description;
    });
  }

  _updateConsumers() {
    const container = this.shadowRoot.querySelector("[data-consumer-list]");
    if (!container) return;
    const devices = (this._config.devices || [])
      .filter(d => d.enabled !== false && d.show_on_overview !== false)
      .map((d, index) => ({ ...d, ...this._deviceRuntime(d, index) }))
      .sort((a,b) => (b.power || 0) - (a.power || 0))
      .slice(0, 8);
    const max = Math.max(...devices.map(d => d.power || 0), 1);
    const markup = devices.length ? devices.map(d => `<div class="consumer ${d.active ? "active" : ""}"><span><ha-icon icon="${this._escAttr(d.icon || "mdi:flash")}"></ha-icon>${this._esc(d.name)}</span><div><i style="width:${Math.max(2, (d.power || 0) / max * 100)}%"></i></div><b>${this._kw(d.power || 0)} kW</b><small>${this._esc(d.description || "")}</small></div>`).join("") : `<div class="mini-empty">Dodaj urządzenia z sensorami mocy i zaznacz „Pokaż na podsumowaniu”.</div>`;
    if (container._matrixMarkup !== markup) {
      container.innerHTML = markup;
      container._matrixMarkup = markup;
    }
  }

  _sampleHistory(force = false) {
    const now = Date.now();
    if (!force && now - this._lastSample < 5000) return;
    this._lastSample = now;
    const v = this._runtimeValues();
    const add = (key, value) => { if (value != null && Number.isFinite(value)) { this._history[key].push(value); if (this._history[key].length > 90) this._history[key].shift(); } };
    add("home", v.home || 0); add("pv", v.pv || 0); add("grid", v.gridSigned || 0); add("price", v.price || 0);
    this._sampleOverviewHistory();
  }

  _sampleOverviewHistory() {
    const add = (key, item, limit) => {
      const value = this._widgetValue(item).numeric;
      if (value == null || !Number.isFinite(value)) return;
      const values = this._customHistory[key] ||= [];
      values.push(value);
      while (values.length > limit) values.shift();
    };
    (this._config?.overview_bubbles || []).forEach((item, index) => {
      if (item.enabled !== false && item.show_sparkline !== false) add(`bubble:${item.id || index}`, item, 90);
    });
    (this._config?.overview_charts || []).forEach((item, index) => {
      if (item.enabled !== false && (item.history_range || "session") === "session") {
        this._chartSeries(item).forEach((seriesItem, seriesIndex) => add(this._chartSessionKey(item, index, seriesIndex), seriesItem, Math.max(12, Math.min(720, Number(item.points || 90)))));
      }
    });
  }

  _updateOverviewWidgets() {
    (this._config?.overview_bubbles || []).forEach((item, index) => {
      const value = this._widgetValue(item);
      const secondary = item.show_secondary ? this._widgetValue(item, "secondary") : null;
      const presentation = this._bubblePresentation(item, value.numeric);
      this.shadowRoot.querySelectorAll(`[data-overview-bubble-value="${index}"]`).forEach(el => { el.textContent = value.formatted; });
      this.shadowRoot.querySelectorAll(`[data-overview-bubble-unit="${index}"]`).forEach(el => { el.textContent = value.unit; });
      this.shadowRoot.querySelectorAll(`[data-overview-bubble-secondary="${index}"]`).forEach(el => { el.textContent = secondary?.formatted || "--"; });
      this.shadowRoot.querySelectorAll(`[data-overview-bubble-secondary-unit="${index}"]`).forEach(el => { el.textContent = secondary?.unit || ""; });
      (Array.isArray(item.related_entities) ? item.related_entities : []).forEach((relatedItem, relatedIndex) => {
        const relatedValue = this._widgetValue(relatedItem);
        this.shadowRoot.querySelectorAll(`[data-overview-bubble-related="${index}:${relatedIndex}"]`).forEach(el => { el.textContent = relatedValue.formatted; });
        this.shadowRoot.querySelectorAll(`[data-overview-bubble-related-unit="${index}:${relatedIndex}"]`).forEach(el => { el.textContent = relatedValue.unit; });
      });
      this.shadowRoot.querySelectorAll(`[data-overview-bubble="${index}"]`).forEach(el => {
        el.style.setProperty("--bubble-color", presentation.color);
        el.classList.toggle("bubble-alert", presentation.alert);
        let label = el.querySelector?.(`[data-overview-bubble-alert="${index}"]`);
        if (presentation.alert && !label) {
          label = document.createElement("span");
          label.className = "bubble-alert-label";
          label.dataset.overviewBubbleAlert = String(index);
          label.textContent = item.alert_text || "ALARM";
          el.appendChild(label);
        } else if (!presentation.alert && label) label.remove();
      });
    });
    (this._config?.overview_charts || []).forEach((item, index) => {
      const series = this._chartSeries(item);
      const value = this._widgetValue(series[0]);
      const data = this._chartData(item, index, 0);
      const digits = Math.max(0, Math.min(6, Number(item.decimals ?? 1)));
      const min = data.length ? Math.min(...data).toFixed(digits) : "--";
      const max = data.length ? Math.max(...data).toFixed(digits) : "--";
      this.shadowRoot.querySelectorAll(`[data-overview-chart-value="${index}"]`).forEach(el => { el.textContent = value.formatted; });
      this.shadowRoot.querySelectorAll(`[data-overview-chart-unit="${index}"], [data-overview-chart-minmax-unit="${index}"]`).forEach(el => { el.textContent = value.unit; });
      this.shadowRoot.querySelectorAll(`[data-overview-chart-min="${index}"]`).forEach(el => { el.textContent = min; });
      this.shadowRoot.querySelectorAll(`[data-overview-chart-max="${index}"]`).forEach(el => { el.textContent = max; });
      series.forEach((seriesItem, seriesIndex) => {
        const seriesValue = this._widgetValue(seriesItem);
        this.shadowRoot.querySelectorAll(`[data-overview-chart-series-value="${index}:${seriesIndex}"]`).forEach(el => { el.textContent = seriesValue.formatted; });
        this.shadowRoot.querySelectorAll(`[data-overview-chart-series-unit="${index}:${seriesIndex}"]`).forEach(el => { el.textContent = seriesValue.unit; });
      });
    });
  }

  _drawSparklines() {
    this.shadowRoot.querySelectorAll("[data-spark]").forEach(path => {
      const data = this._history[path.dataset.spark] || [];
      path.setAttribute("d", this._sparkPath(data, 400, path.closest(".metric-card") ? 30 : 130));
    });
    this.shadowRoot.querySelectorAll("[data-custom-spark]").forEach(path => {
      path.setAttribute("d", this._sparkPath(this._customHistory[path.dataset.customSpark] || [], 100, 30));
    });
    this.shadowRoot.querySelectorAll("[data-custom-chart]").forEach(path => {
      const type = path.dataset.graphType || "line";
      const index = Number(path.dataset.chartIndex);
      const seriesIndex = Number(path.dataset.seriesIndex || 0);
      const item = this._config?.overview_charts?.[index];
      if (!item) return;
      const series = this._chartSeries(item);
      const allData = series.map((_, itemSeriesIndex) => this._chartData(item, index, itemSeriesIndex));
      const units = new Set(series.map(seriesItem => this._widgetValue(seriesItem).unit).filter(Boolean));
      const values = units.size <= 1 ? allData.flat().filter(Number.isFinite) : [];
      const bounds = values.length ? { min: Math.min(...values), max: Math.max(...values) } : null;
      path.setAttribute("d", this._customChartPath(allData[seriesIndex] || [], 400, 150, type, bounds, seriesIndex, series.length));
    });
  }

  _chartSessionKey(item, index, seriesIndex = 0) {
    const seriesItem = this._chartSeriesItem(item, seriesIndex);
    return `chart:${item.id || index}:${seriesItem._seriesId || seriesIndex}`;
  }

  _chartData(item, index, seriesIndex = 0) {
    if ((item.history_range || "session") === "session") return this._customHistory[this._chartSessionKey(item, index, seriesIndex)] || [];
    return this._recorderHistory[this._historyKey(item, index, seriesIndex)] || [];
  }

  _historyKey(item, index, seriesIndex = 0) {
    const seriesItem = this._chartSeriesItem(item, seriesIndex);
    return `${item.id || index}:${seriesItem._seriesId || seriesIndex}:${item.history_range || "session"}:${seriesItem.entity_id || ""}:${seriesItem.attribute || ""}`;
  }

  async _loadRecorderHistories(force = false) {
    if (!this._config || this._recorderLoadRunning) return;
    if (this._tabletPerformanceEnabled() && !this.shadowRoot?.querySelector('[data-slide-id="charts"].active')) return;
    const pending = (this._config.overview_charts || []).flatMap((item, index) => this._chartSeries(item).map((seriesItem, seriesIndex) => ({ item, index, seriesItem, seriesIndex }))).filter(({ item, index, seriesItem, seriesIndex }) => {
      if (item.enabled === false || !seriesItem.entity_id || (item.history_range || "session") === "session") return false;
      const key = this._historyKey(item, index, seriesIndex);
      return force || !this._historyLoadedAt[key] || Date.now() - this._historyLoadedAt[key] > 300000;
    });
    if (!pending.length) return;
    this._recorderLoadRunning = true;
    try {
      for (const { item, index, seriesIndex } of pending) await this._loadRecorderHistory(item, index, seriesIndex);
    } finally {
      this._recorderLoadRunning = false;
      this._updateOverviewWidgets();
      this._drawSparklines();
      setTimeout(() => this._loadRecorderHistories(), 0);
    }
  }

  async _loadRecorderHistory(item, index, seriesIndex = 0) {
    const seriesItem = this._chartSeriesItem(item, seriesIndex);
    const key = this._historyKey(item, index, seriesIndex);
    if (this._historyLoading.has(key)) return;
    this._historyLoading.add(key);
    const range = item.history_range || "24h";
    const days = range === "30d" ? 30 : range === "7d" ? 7 : 1;
    const end = new Date();
    const start = new Date(end.getTime() - days * 86400000);
    let values = [];
    try {
      if (!seriesItem.attribute && ["7d", "30d"].includes(range) && typeof this._hass?.callWS === "function") {
        try {
          const result = await this._hass.callWS({
            type: "recorder/statistics_during_period", start_time: start.toISOString(), end_time: end.toISOString(),
            statistic_ids: [seriesItem.entity_id], period: range === "30d" ? "day" : "hour", types: ["mean", "state", "sum"],
          });
          values = (result?.[seriesItem.entity_id] || []).map(row => Number(row.mean ?? row.state ?? row.sum)).filter(Number.isFinite);
        } catch (_) { values = []; }
      }
      if (!values.length && typeof this._hass?.callApi === "function") {
        const flags = seriesItem.attribute ? "" : "&minimal_response&no_attributes&significant_changes_only";
        const path = `history/period/${encodeURIComponent(start.toISOString())}?filter_entity_id=${encodeURIComponent(seriesItem.entity_id)}&end_time=${encodeURIComponent(end.toISOString())}${flags}`;
        const response = await this._hass.callApi("GET", path);
        values = (Array.isArray(response?.[0]) ? response[0] : []).map(row => {
          const raw = seriesItem.attribute ? String(seriesItem.attribute).split(".").reduce((value, part) => value == null ? undefined : value[part], row.attributes) : row.state;
          const numeric = Number(raw);
          const multiplier = Number(seriesItem.multiplier ?? 1);
          return Number.isFinite(numeric) ? numeric * (Number.isFinite(multiplier) ? multiplier : 1) : null;
        }).filter(value => value != null && Number.isFinite(value));
      } else if (values.length) {
        const multiplier = Number(seriesItem.multiplier ?? 1);
        values = values.map(value => value * (Number.isFinite(multiplier) ? multiplier : 1));
      }
      this._recorderHistory[key] = this._downsample(values, Math.max(12, Math.min(720, Number(item.points || 90))));
      this._historyLoadedAt[key] = Date.now();
    } catch (err) {
      this._recorderHistory[key] ||= [];
      this._historyLoadedAt[key] = Date.now();
    } finally {
      this._historyLoading.delete(key);
    }
  }

  _downsample(values, maximum) {
    if (values.length <= maximum) return values;
    const result = [];
    const bucket = values.length / maximum;
    for (let index = 0; index < maximum; index++) {
      const start = Math.floor(index * bucket), end = Math.max(start + 1, Math.floor((index + 1) * bucket));
      const slice = values.slice(start, end);
      result.push(slice.reduce((sum, value) => sum + value, 0) / slice.length);
    }
    return result;
  }

  _sparkPath(data, width, height) {
    if (!data.length) return "";
    const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
    return data.map((value, index) => `${index ? "L" : "M"}${(index / Math.max(1, data.length - 1) * width).toFixed(1)} ${(height - 5 - ((value - min) / range) * (height - 10)).toFixed(1)}`).join(" ");
  }

  _customChartPath(data, width, height, type = "line", bounds = null, seriesIndex = 0, seriesCount = 1) {
    if (!data.length) return "";
    const min = bounds?.min ?? Math.min(...data), max = bounds?.max ?? Math.max(...data), range = max - min || 1;
    const y = value => height - 5 - ((value - min) / range) * (height - 10);
    if (type === "bar") {
      const slot = width / Math.max(1, data.length);
      const groupWidth = slot * 0.78;
      const barWidth = Math.max(1, groupWidth / Math.max(1, seriesCount));
      return data.map((value, index) => {
        const x = index * slot + (slot - groupWidth) / 2 + seriesIndex * barWidth;
        const top = y(value);
        return `M${x.toFixed(1)} ${top.toFixed(1)}V${height}H${(x + barWidth).toFixed(1)}V${top.toFixed(1)}Z`;
      }).join(" ");
    }
    const line = data.map((value, index) => `${index ? "L" : "M"}${(index / Math.max(1, data.length - 1) * width).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");
    return type === "area" ? `${line} L${width} ${height} L0 ${height} Z` : line;
  }

  _readNumber(entityId) {
    if (!entityId) return null;
    const state = this._hass?.states?.[entityId];
    if (!state || ["unknown","unavailable","none", ""].includes(state.state)) return null;
    const value = Number(state.state); return Number.isFinite(value) ? value : null;
  }

  _readPower(entityId) {
    const value = this._readNumber(entityId); if (value == null) return null;
    const unit = String(this._hass.states[entityId]?.attributes?.unit_of_measurement || "W").toLowerCase();
    if (unit === "kw") return value * 1000; if (unit === "mw") return value * 1000000; return value;
  }

  _kw(watts) { return watts == null ? "--" : (watts / 1000).toFixed(Math.abs(watts) >= 10000 ? 1 : 2); }
  _signedKw(watts) { if (watts == null) return "--"; const n = watts / 1000; return `${n > 0 ? "+" : ""}${n.toFixed(2)}`; }
  _num(value, digits = 1) { return value == null || !Number.isFinite(Number(value)) ? "--" : Number(value).toFixed(digits); }

  _updateClock() {
    const now = new Date();
    this.shadowRoot.querySelectorAll("[data-clock], [data-kiosk-clock]").forEach(clock => { clock.textContent = now.toLocaleTimeString(); });
    this.shadowRoot.querySelectorAll("[data-date], [data-kiosk-date]").forEach(date => { date.textContent = now.toLocaleDateString(undefined, { day:"2-digit", month:"short", year:"numeric" }).toUpperCase(); });
    if (this._view === "kiosk") this._applyKioskNightMode();
  }

  _setPath(obj, path, value) {
    const parts = path.split("."); let target = obj;
    for (let i = 0; i < parts.length - 1; i++) { const key = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i]; target = target[key]; }
    const last = /^\d+$/.test(parts.at(-1)) ? Number(parts.at(-1)) : parts.at(-1); target[last] = value;
  }

  _id(prefix) { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`; }
  _esc(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c])); }
  _escAttr(value) { return this._esc(value).replace(/`/g, "&#096;"); }

  _styles() { return `
    :host { --bg:#010914; --panel:rgba(3,18,38,.88); --cyan:#20eaff; --cyan2:#008cff; --green:#52ff62; --lime:#b8ff3d; --orange:#ffb11b; --purple:#b95cff; display:block; min-height:100vh; color:#eefaff; font-family:Inter,Roboto,Arial,sans-serif; background:#01060d; }:host(.kiosk-host){height:100vh;height:100dvh;min-height:0;overflow:hidden}
    *{box-sizing:border-box} button,input,select,textarea{font:inherit} button{cursor:pointer} ha-icon{width:22px;height:22px}
    .matrix-shell{min-height:100vh;display:grid;grid-template-columns:170px 1fr;grid-template-rows:62px 1fr 42px;grid-template-areas:"top top" "side main" "side footer";background:radial-gradient(circle at 55% 20%,rgba(0,180,255,.09),transparent 36%),linear-gradient(rgba(0,160,210,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,160,210,.035) 1px,transparent 1px),#01060d;background-size:auto,28px 28px,28px 28px,auto;position:relative;overflow:hidden}
    .matrix-shell:before{content:"010011 101101 001011 110010 010010 111001";position:fixed;inset:62px 0 42px 170px;pointer-events:none;color:rgba(0,238,255,.035);font:18px/34px monospace;letter-spacing:12px;word-spacing:28px;overflow:hidden;mask-image:linear-gradient(to bottom,black,transparent 90%)}
    .topbar{grid-area:top;display:flex;align-items:center;border-bottom:1px solid rgba(32,234,255,.3);background:rgba(1,8,18,.96);box-shadow:0 0 28px rgba(0,180,255,.12);z-index:5}.hamburger{display:none;background:none;border:0;color:var(--cyan)}
    .brand{width:170px;padding:0 18px}.brand strong{display:block;font-size:13px;letter-spacing:.5px}.brand small{display:block;color:var(--cyan);font-weight:900;letter-spacing:5px;font-size:10px;margin-top:2px}.top-nav{display:flex;height:100%;flex:1}.nav-btn{height:100%;min-width:116px;padding:0 15px;border:0;border-right:1px solid rgba(32,234,255,.15);background:transparent;color:#a8c8d8;display:flex;align-items:center;justify-content:center;gap:8px;font-size:11px}.nav-btn.active,.nav-btn:hover{color:white;background:linear-gradient(180deg,rgba(0,210,255,.17),rgba(0,100,255,.08));box-shadow:inset 0 -2px 0 var(--cyan),0 0 18px rgba(0,220,255,.15)}.nav-btn ha-icon{color:var(--cyan)}.clock{width:145px;text-align:right;padding-right:17px}.clock b{font-family:monospace;font-size:17px}.clock small{display:block;color:var(--cyan);font-size:10px;margin-top:3px}
    .sidebar{grid-area:side;z-index:4;border-right:1px solid rgba(32,234,255,.28);background:rgba(1,8,18,.94);padding:10px 7px;display:flex;flex-direction:column;justify-content:space-between}.side-links{display:grid;gap:5px}.side-btn{height:54px;border:1px solid transparent;background:transparent;color:#83bfce;display:flex;align-items:center;gap:15px;padding:0 14px;text-align:left;font-size:11px}.side-btn ha-icon{color:var(--cyan)}.side-btn.active,.side-btn:hover{color:white;border-color:rgba(32,234,255,.42);background:linear-gradient(90deg,rgba(0,200,255,.18),transparent);box-shadow:inset 3px 0 0 var(--cyan),0 0 15px rgba(0,190,255,.12)}.system-card{display:grid;gap:8px;border:1px solid rgba(32,234,255,.2);padding:13px 10px;font-size:9px;color:#78a7b7;background:rgba(0,20,35,.5)}.system-card span:first-child{color:var(--green)}.dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px}.dot.ok{background:var(--green);box-shadow:0 0 10px var(--green)}
    .content{grid-area:main;padding:15px 16px 22px;overflow:auto;z-index:2}.statusbar{grid-area:footer;z-index:4;border-top:1px solid rgba(32,234,255,.25);background:#020b14;display:flex;align-items:center;gap:30px;padding:0 18px;color:#78a7b7;font-size:10px}.status-message{margin-left:auto;color:var(--cyan);max-width:40%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .hero-row{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:14px}.eyebrow{font-size:10px;color:var(--cyan);font-weight:900;letter-spacing:2px}.hero-row h1{margin:4px 0 2px;font-size:28px;letter-spacing:1px;text-shadow:0 0 18px rgba(32,234,255,.25)}.hero-row p{margin:0;color:#83aab9;font-size:12px}.mode-chip{border:1px solid rgba(32,234,255,.35);padding:10px 14px;display:flex;align-items:center;gap:10px;background:rgba(4,23,43,.8);min-width:190px}.mode-chip ha-icon{color:var(--green)}.mode-chip span{font-size:9px;color:#7ca6b7}.mode-chip b{font-size:11px;color:var(--green)}
    .panel{position:relative;border:1px solid rgba(32,234,255,.35);background:radial-gradient(circle at 0 0,rgba(0,190,255,.08),transparent 35%),linear-gradient(145deg,rgba(2,13,29,.96),rgba(3,19,38,.9));box-shadow:0 0 20px rgba(0,145,210,.1),inset 0 0 35px rgba(0,150,220,.04);border-radius:6px;overflow:hidden}.panel:after{content:"";position:absolute;inset:0;pointer-events:none;border:1px solid rgba(0,120,255,.06);clip-path:polygon(0 0,25px 0,0 25px,0 100%,calc(100% - 25px) 100%,100% calc(100% - 25px),100% 0)}.panel-title{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 15px 8px;font-size:12px;font-weight:900;letter-spacing:.5px}.panel-title small{font-size:9px;color:#6e96a5;font-weight:500}.panel-title ha-icon{color:var(--cyan)}
    .metrics-grid{display:grid;grid-template-columns:repeat(6,minmax(150px,1fr));gap:9px;margin-bottom:10px}.metric-card{position:relative;height:94px;border:1px solid rgba(32,234,255,.3);border-radius:14px;background:linear-gradient(145deg,rgba(3,20,40,.95),rgba(2,10,22,.96));padding:13px;display:flex;align-items:flex-start;gap:10px;overflow:hidden}.metric-card>ha-icon{color:var(--cyan)}.metric-card small{display:block;color:#8eb5c3;font-size:9px}.metric-card strong{font:24px monospace;display:inline-block;margin-top:5px}.metric-card span{font-size:10px;margin-left:4px}.metric-card svg{position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.6}.metric-card.green{border-color:rgba(82,255,98,.36)}.metric-card.green>ha-icon,.metric-card.green strong{color:var(--green)}.metric-card.lime>ha-icon,.metric-card.lime strong{color:var(--lime)}.metric-card.purple>ha-icon,.metric-card.purple strong{color:var(--purple)}.metric-card.orange>ha-icon,.metric-card.orange strong{color:var(--orange)}
    .dashboard-grid{display:grid;grid-template-columns:minmax(580px,1.8fr) minmax(300px,.9fr);grid-template-rows:230px 210px;gap:10px}.flow-panel{grid-row:1/3}.price-panel{padding:0 10px 10px}.consumers-panel{padding:0 10px 10px}.bottom-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px}.trend-panel,.gauge-panel{height:220px;padding:0 12px 12px}.trend-panel svg{width:100%;height:135px}.trend-panel>small,.spark-wrap>small{color:#567b8b;font-size:9px}.gridline{fill:none;stroke:rgba(100,200,255,.12);stroke-width:1}.spark{fill:none;stroke:var(--cyan);stroke-width:2;filter:drop-shadow(0 0 5px rgba(32,234,255,.7))}.spark.green{stroke:var(--green)}.spark.purple{stroke:var(--purple)}.spark.orange{stroke:var(--orange)}.spark.lime{stroke:var(--lime)}
    .price-values{display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(185,92,255,.28)}.price-values>div{padding:12px}.price-values>div+div{border-left:1px solid rgba(185,92,255,.22)}.price-values small{display:block;color:#a78ac1;font-size:9px}.price-values strong{font:24px monospace;color:#fff}.price-values span{font-size:9px;color:#8ea8b7}.spark-wrap svg{width:100%;height:95px}.consumer-list{display:grid;gap:9px;padding:8px 6px}.consumer{display:grid;grid-template-columns:110px 1fr 65px;align-items:center;gap:8px;font-size:9px}.consumer>div{height:7px;background:rgba(50,120,150,.18)}.consumer i{display:block;height:100%;background:linear-gradient(90deg,var(--cyan2),var(--cyan));box-shadow:0 0 8px rgba(32,234,255,.45)}.consumer b{text-align:right;color:var(--cyan);font-family:monospace}.link-btn,.test-btn{border:1px solid rgba(32,234,255,.35);background:rgba(0,110,170,.14);color:var(--cyan);font-size:9px;padding:5px 8px}
    .flow-canvas{height:385px;position:relative;margin:0 10px 10px;background:radial-gradient(circle at center,rgba(0,170,255,.12),transparent 45%),linear-gradient(rgba(0,220,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.035) 1px,transparent 1px);background-size:auto,25px 25px,25px 25px}.flow-canvas.large{height:620px}.flow-node{position:absolute;width:130px;height:125px;border:1px solid var(--cyan);background:rgba(1,10,20,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2;box-shadow:0 0 25px rgba(32,234,255,.14),inset 0 0 25px rgba(32,234,255,.06);clip-path:polygon(15px 0,calc(100% - 15px) 0,100% 15px,100% calc(100% - 15px),calc(100% - 15px) 100%,15px 100%,0 calc(100% - 15px),0 15px)}.flow-node ha-icon{width:34px;height:34px;color:var(--cyan);filter:drop-shadow(0 0 8px currentColor)}.flow-node b{font-size:12px;margin-top:6px}.flow-node strong{font:22px monospace;color:var(--cyan);margin-top:4px}.flow-node small{font-size:9px;color:#94b5c0}.pv-node{left:calc(50% - 65px);top:4px;border-color:var(--green)}.pv-node ha-icon,.pv-node strong{color:var(--green)}.grid-node{left:4%;top:calc(50% - 62px);border-color:var(--purple)}.grid-node ha-icon,.grid-node strong{color:var(--purple)}.home-node{left:calc(50% - 65px);top:calc(50% - 62px);border-radius:50%;clip-path:none;border-width:2px}.battery-node{right:4%;top:calc(50% - 62px);border-color:var(--lime)}.battery-node ha-icon,.battery-node strong{color:var(--lime)}.ev-node{left:calc(50% - 65px);bottom:4px}.flow-lines{position:absolute;inset:0;width:100%;height:100%;z-index:1}.connector{fill:none;stroke:var(--cyan);stroke-width:5;stroke-dasharray:8 12;animation:flow 1s linear infinite;filter:drop-shadow(0 0 5px currentColor)}.pv-flow{stroke:var(--green)}.grid-flow{stroke:var(--purple)}.battery-flow{stroke:var(--lime)}@keyframes flow{to{stroke-dashoffset:-20}}.flow-label{position:absolute;z-index:3;font:10px monospace;color:white;background:#020a12;padding:3px 6px;border:1px solid rgba(32,234,255,.3)}.pv-label{left:53%;top:27%}.grid-label{left:28%;top:47%}.battery-label{right:27%;top:47%}.ev-label{left:53%;bottom:25%}
    .gauge{--value:0;width:130px;height:130px;border-radius:50%;margin:8px auto;background:conic-gradient(var(--cyan) calc(var(--value)*1%),rgba(30,80,100,.22) 0);display:grid;place-items:center;box-shadow:0 0 20px rgba(32,234,255,.18)}.gauge:before{content:"";width:104px;height:104px;border-radius:50%;background:#030d17;position:absolute}.gauge>div{z-index:1}.gauge strong{font:27px monospace}.gauge span{font-size:11px}.gauge-panel p{text-align:center;color:#75a0ae;font-size:10px}
    .flow-details,.pv-summary{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:10px}.detail-card{min-height:92px;border:1px solid rgba(32,234,255,.3);background:rgba(2,14,28,.9);display:flex;align-items:center;gap:12px;padding:15px}.detail-card ha-icon{width:30px;height:30px;color:var(--cyan)}.detail-card small{display:block;color:#7fa7b5;font-size:9px}.detail-card strong{font:22px monospace;color:white}.detail-card span{font-size:9px;color:#8eb3c0}.detail-card.green ha-icon,.detail-card.green strong{color:var(--green)}.detail-card.lime ha-icon,.detail-card.lime strong{color:var(--lime)}.detail-card.purple ha-icon,.detail-card.purple strong{color:var(--purple)}.detail-card.orange ha-icon,.detail-card.orange strong{color:var(--orange)}.large-flow{padding:4px 10px 10px}
    .tariff-live-grid{display:grid;grid-template-columns:1.35fr repeat(4,1fr);gap:10px;margin-bottom:10px}.tariff-zone-card{min-height:118px;border:1px solid rgba(32,234,255,.6);background:radial-gradient(circle at 50% 15%,rgba(0,220,255,.2),transparent 65%),rgba(2,15,30,.94);display:grid;grid-template-columns:44px 1fr;grid-template-rows:auto 1fr auto;align-items:center;padding:15px;box-shadow:0 0 22px rgba(0,210,255,.16),inset 0 0 24px rgba(0,160,255,.08)}.tariff-zone-card small{grid-column:1/-1;color:var(--cyan);font-size:9px;font-weight:900;letter-spacing:1px}.tariff-zone-card ha-icon{width:34px;height:34px;color:var(--cyan);filter:drop-shadow(0 0 8px var(--cyan))}.tariff-zone-card strong{font-size:17px;color:white}.tariff-zone-card span{grid-column:1/-1;color:#8ec1cf;font-size:10px}.tariff-warning{padding:13px 16px;margin-bottom:10px;border-color:rgba(255,177,27,.55);color:var(--orange);display:flex;align-items:center;gap:10px}.season-schedule-grid,.price-config-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:10px}.price-config-grid{grid-template-columns:repeat(2,1fr)}.schedule-card{padding:8px 14px 14px}.schedule-row{display:grid;grid-template-columns:120px 1fr;gap:12px;padding:11px;border-bottom:1px solid rgba(32,234,255,.12);font-size:10px}.schedule-row b{font-family:monospace}.schedule-row.morning b{color:var(--cyan)}.schedule-row.afternoon b{color:var(--orange)}.schedule-row.cheap b{color:var(--green)}.config-layout{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}.config-card,.mapping-panel,.automation-panel,.string-card,.device-config,.table-panel,.json-panel{padding:8px 14px 16px}.mapping-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.four-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.three-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.two-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.field{display:flex;flex-direction:column;gap:5px;margin-top:8px}.field>span{font-size:10px;color:#a7c9d5;font-weight:700}.field input,.field select,.field textarea{width:100%;border:1px solid rgba(32,234,255,.28);background:#03101e;color:#effcff;padding:10px 11px;outline:none}.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--cyan);box-shadow:0 0 10px rgba(32,234,255,.18)}.field textarea{min-height:72px;resize:vertical}.field small{font-size:8px;line-height:1.4;color:#638a99}.field.full{grid-column:1/-1}.feature-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.feature{display:flex;align-items:center;gap:9px;border:1px solid rgba(32,234,255,.2);padding:10px;background:rgba(0,80,120,.08);font-size:10px}.feature ha-icon{color:var(--cyan)}input[type=checkbox]{accent-color:var(--cyan)}.check-row{display:flex;align-items:flex-start;gap:10px;padding:10px 0}.check-row span{display:flex;flex-direction:column}.check-row b{font-size:10px}.check-row small{font-size:8px;color:#6d94a2;margin-top:3px}.config-card hr{border:0;border-top:1px solid rgba(32,234,255,.15)}.hint{color:#7ea6b4;font-size:10px;line-height:1.6}.save-actions{display:flex;gap:8px;flex-wrap:wrap}.primary-btn,.secondary-btn,.head-actions button,.danger,.icon-btn{border:1px solid rgba(32,234,255,.55);background:linear-gradient(135deg,rgba(0,220,255,.23),rgba(0,80,160,.16));color:white;padding:9px 12px;display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:800;box-shadow:0 0 13px rgba(0,200,255,.12)}.secondary-btn{background:rgba(0,50,80,.22);color:var(--cyan)}.danger{border-color:rgba(255,70,100,.45)!important;color:#ff6b86!important;background:rgba(255,30,70,.08)!important}.file-btn{position:relative;cursor:pointer}.file-btn input{position:absolute;inset:0;opacity:0;cursor:pointer}.sticky-save{position:sticky;bottom:5px;display:flex;justify-content:flex-end;padding-top:10px;z-index:5}
    .cards-stack{display:grid;gap:10px}.string-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}.string-head h2{margin:4px 0;font-size:18px}.string-head p{margin:0;color:#7297a5;font-size:10px}.tag{font-size:8px;color:var(--cyan);letter-spacing:1px;font-weight:900}.head-actions{display:flex;gap:6px}.section-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}.pv-section{border:1px solid rgba(82,255,98,.25);background:rgba(2,25,25,.42);padding:11px}.section-title{display:flex;justify-content:space-between;color:var(--green);font-size:9px;font-weight:900}.icon-btn{padding:3px}.mini-empty,.empty{color:#6e94a2;text-align:center;padding:25px;font-size:10px;border:1px dashed rgba(32,234,255,.2)}.empty{grid-column:1/-1;padding:60px}.empty ha-icon{width:55px;height:55px;color:var(--cyan);opacity:.6}.empty h3{color:white}.pv-summary{grid-template-columns:repeat(4,1fr);margin-bottom:10px}
    .device-live-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:10px}.device-live{min-height:118px;border:1px solid rgba(32,234,255,.3);background:rgba(2,15,30,.92);padding:13px;display:flex;align-items:center;gap:12px;position:relative}.device-live>ha-icon{width:34px;height:34px;color:var(--cyan)}.device-live small{font-size:8px;color:#6f94a2}.device-live h3{font-size:12px;margin:3px 0}.device-live strong{font:19px monospace;color:var(--cyan)}.device-live span{font-size:9px}.control-btn{position:absolute;right:7px;top:7px;border:1px solid rgba(32,234,255,.25);background:rgba(0,100,150,.12);color:var(--cyan);padding:5px}.accent-green>ha-icon,.accent-green strong{color:var(--green)}.accent-lime>ha-icon,.accent-lime strong{color:var(--lime)}.accent-orange>ha-icon,.accent-orange strong{color:var(--orange)}.accent-purple>ha-icon,.accent-purple strong{color:var(--purple)}.checks{margin-top:8px}
    .diagnostics-summary{display:grid;grid-template-columns:repeat(4,1fr);margin-bottom:10px}.diagnostics-summary>div{padding:18px;border-right:1px solid rgba(32,234,255,.15)}.diagnostics-summary small{display:block;color:#729aa8;font-size:9px}.diagnostics-summary strong{font:24px monospace;color:var(--cyan)}.table-scroll{overflow:auto}table{width:100%;border-collapse:collapse;font-size:10px}th,td{text-align:left;padding:10px;border-bottom:1px solid rgba(32,234,255,.12)}th{color:var(--cyan);font-size:9px}code{color:#a6d8e5}.status-pill{padding:4px 7px;border:1px solid;font-size:8px}.status-pill.ok{color:var(--green);border-color:rgba(82,255,98,.35)}.status-pill.bad{color:#ff6b86;border-color:rgba(255,70,100,.35)}.status-pill.neutral{color:#829ba5;border-color:rgba(130,155,165,.3)}.json-panel{margin-top:10px}.json-panel pre{max-height:420px;overflow:auto;background:#020912;border:1px solid rgba(32,234,255,.15);padding:12px;color:#89dce9;font:10px/1.5 monospace}.locked{min-height:65vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#7d9daa}.locked ha-icon{width:70px;height:70px;color:var(--cyan)}.locked h2{color:white}.boot{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;background:#01060d;color:white}.boot span{color:#7da0ae}.boot-ring{width:70px;height:70px;border:2px solid rgba(32,234,255,.2);border-top-color:var(--cyan);border-radius:50%;animation:spin 1s linear infinite;box-shadow:0 0 25px rgba(32,234,255,.2)}@keyframes spin{to{transform:rotate(360deg)}}.error b{color:#ff6680}

    /* v0.3 — dynamic modules, precise flow layout and HA-style entity search */
    .matrix-shell.no-statusbar{grid-template-rows:62px 1fr;grid-template-areas:"top top" "side main"}.matrix-shell.no-statusbar:before{inset:62px 0 0 170px}.matrix-shell.no-grid{background:radial-gradient(circle at 55% 20%,rgba(0,180,255,.08),transparent 38%),#01060d}.matrix-shell.no-grid:before{display:none}.matrix-shell.no-animations *{animation:none!important}.matrix-shell.compact-header{grid-template-rows:50px 1fr 42px}.matrix-shell.compact-header.no-statusbar{grid-template-rows:50px 1fr}.matrix-shell.compact-header .topbar{min-height:50px}.matrix-shell.compact-header .nav-btn{font-size:9px}.matrix-shell.compact-header:before{inset:50px 0 42px 170px}
    .hero-tools{display:flex;gap:9px;align-items:stretch}.config-score{min-width:90px;border:1px solid rgba(32,234,255,.28);background:rgba(3,20,40,.75);padding:8px 12px;text-align:center}.config-score small,.config-score span{display:block;font-size:8px;color:#7098a8}.config-score b{font:22px monospace;color:var(--cyan)}
    .metrics-grid.dynamic,.bottom-grid.dynamic,.flow-details.dynamic{grid-template-columns:repeat(auto-fit,minmax(175px,1fr))}.dashboard-grid.with-side{grid-template-columns:minmax(560px,1.75fr) minmax(320px,.85fr);grid-template-rows:auto}.dashboard-grid.flow-only{display:block}.dashboard-grid .flow-panel{grid-row:auto;min-height:490px}.dashboard-side{display:grid;grid-template-rows:1fr 1fr;gap:10px}.overview-note{margin-top:10px;padding:12px 16px;display:flex;align-items:center;gap:10px;color:#7fa9b8;font-size:10px}.overview-note ha-icon{color:var(--cyan)}
    .panel{border-radius:16px}.panel:after{border-radius:16px}.mapping-groups{display:grid;gap:10px}.mapping-group{padding:8px 14px 16px}.config-top{grid-template-columns:minmax(330px,.8fr) minmax(520px,1.2fr)}.modules-card .feature-grid{grid-template-columns:repeat(2,minmax(230px,1fr))}.feature{border-radius:12px;min-height:70px;align-items:flex-start}.feature.active{border-color:rgba(32,234,255,.62);background:linear-gradient(135deg,rgba(0,220,255,.2),rgba(0,100,160,.08));box-shadow:0 0 18px rgba(0,200,255,.12),inset 0 0 22px rgba(0,180,255,.08)}.feature>span{display:flex;flex-direction:column;gap:3px}.feature b{font-size:10px;color:#effcff}.feature small{font-size:8px;line-height:1.35;color:#6f98a7}.signal-box{margin-top:12px;padding:11px;border:1px solid rgba(82,255,98,.22);background:rgba(20,80,45,.08);display:flex;align-items:center;gap:10px}.signal-box ha-icon{color:var(--green)}.signal-box b,.signal-box small{display:block}.signal-box b{font-size:10px}.signal-box small{font-size:8px;color:#75a18d;margin-top:3px}
    .mapping-grid{grid-template-columns:repeat(auto-fit,minmax(310px,1fr))}.entity-field{min-width:0}.entity-picker-button{width:100%;min-height:66px;border:1px solid rgba(32,234,255,.28);border-radius:11px;background:linear-gradient(135deg,rgba(2,18,35,.96),rgba(4,28,52,.86));color:#eafaff;padding:9px 10px;display:grid;grid-template-columns:30px minmax(0,1fr) auto 20px;gap:8px;align-items:center;text-align:left}.entity-picker-button:hover,.entity-picker-button:focus{border-color:var(--cyan);box-shadow:0 0 14px rgba(32,234,255,.16);outline:none}.entity-picker-button>ha-icon{color:var(--cyan)}.entity-picker-button.bad{border-color:rgba(255,90,120,.35)}.entity-picker-button.empty{border-style:dashed}.entity-picker-copy{display:flex;flex-direction:column;min-width:0}.entity-picker-copy b{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.entity-picker-copy small{font:8px monospace!important;color:#6f9dad!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.entity-state-chip{max-width:145px;padding:5px 8px;border:1px solid rgba(82,255,98,.3);border-radius:999px;color:var(--green);font:9px monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.entity-picker-button.bad .entity-state-chip{color:#ff738d;border-color:rgba(255,90,120,.35)}.entity-picker-button.empty .entity-state-chip{color:#7899a6;border-color:rgba(120,160,175,.25)}.entity-picker-button .chevron{width:18px;height:18px;color:#739baa}
    .entity-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,4,10,.82);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px}.entity-dialog{width:min(920px,96vw);height:min(760px,92vh);border:1px solid rgba(32,234,255,.65);border-radius:20px;background:radial-gradient(circle at 50% 0,rgba(0,190,255,.15),transparent 38%),#020b16;box-shadow:0 0 60px rgba(0,190,255,.24),inset 0 0 50px rgba(0,130,210,.06);display:grid;grid-template-rows:auto auto auto auto 1fr auto;overflow:hidden}.entity-dialog-head{display:flex;justify-content:space-between;align-items:flex-start;padding:18px 20px 12px;border-bottom:1px solid rgba(32,234,255,.18)}.entity-dialog-head h2{font-size:20px;margin:4px 0 0}.icon-close{border:1px solid rgba(32,234,255,.25);background:rgba(0,80,120,.12);color:var(--cyan);padding:7px;border-radius:8px}.entity-search-row{margin:14px 18px 8px;border:1px solid rgba(32,234,255,.45);border-radius:12px;background:#03101e;display:grid;grid-template-columns:28px 1fr auto;align-items:center;padding:0 12px;box-shadow:inset 0 0 22px rgba(0,150,220,.05)}.entity-search-row ha-icon{color:var(--cyan)}.entity-search-row input{height:48px;border:0;background:transparent;color:white;outline:none;font-size:13px}.entity-search-row>span{font:10px monospace;color:var(--cyan)}.entity-filter-row{display:flex;align-items:center;gap:8px;padding:0 18px 9px}.filter-chip{border:1px solid rgba(32,234,255,.25);border-radius:999px;background:rgba(0,60,95,.12);color:#8db3c1;padding:6px 10px;font-size:9px}.filter-chip.active{border-color:var(--cyan);color:white;background:rgba(0,190,255,.16)}.entity-filter-row small{margin-left:auto;color:#668c99;font:9px monospace}.entity-current{margin:0 18px 8px;padding:8px 11px;border-left:2px solid var(--cyan);background:rgba(0,110,160,.08);display:flex;align-items:center;gap:9px;font-size:9px}.entity-current span{color:#6f99a8}.entity-current b{font-family:monospace}.entity-current strong{margin-left:auto;color:var(--green);font-family:monospace}.entity-results{overflow:auto;padding:0 18px 14px;display:grid;align-content:start;gap:6px}.entity-result{position:relative;width:100%;min-height:66px;border:1px solid rgba(32,234,255,.16);border-radius:11px;background:rgba(3,18,34,.8);color:white;padding:9px 12px;display:grid;grid-template-columns:34px minmax(0,1fr) minmax(85px,150px) auto;gap:10px;align-items:center;text-align:left}.entity-result:hover{border-color:rgba(32,234,255,.6);background:rgba(0,100,145,.16)}.entity-result.selected{border-color:var(--green);box-shadow:inset 3px 0 0 var(--green)}.entity-result>ha-icon{color:var(--cyan)}.entity-result-copy{display:flex;flex-direction:column;min-width:0}.entity-result-copy b{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.entity-result-copy code{font:9px monospace;color:#82bdd0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.entity-result-copy small{font-size:8px;color:#607f8b;margin-top:2px}.entity-result-state{justify-self:end;padding:5px 8px;border-radius:999px;background:rgba(82,255,98,.08);color:var(--green);font:9px monospace;max-width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.entity-result-state.missing{color:#8a9aa1;background:rgba(130,150,160,.08)}.compat-badge{font-size:7px;color:var(--cyan);border:1px solid rgba(32,234,255,.35);padding:3px 5px;border-radius:5px}.entity-result.other{opacity:.72}.empty-search{min-height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#6d94a2;gap:8px}.empty-search ha-icon{width:52px;height:52px;color:var(--cyan)}.entity-dialog-footer{padding:11px 18px;border-top:1px solid rgba(32,234,255,.18);display:flex;justify-content:flex-end;gap:8px}
    .flow-canvas{height:440px;margin:0 14px 14px;border:1px solid rgba(32,234,255,.12);border-radius:14px;overflow:hidden;background:radial-gradient(circle at center,rgba(0,170,255,.16),transparent 46%),linear-gradient(rgba(0,220,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.04) 1px,transparent 1px);background-size:auto,28px 28px,28px 28px}.flow-canvas.large{height:560px}.flow-canvas.density-compact{height:360px}.flow-canvas.large.density-compact{height:470px}.flow-canvas.density-spacious{height:520px}.flow-canvas.large.density-spacious{height:650px}.flow-node{width:132px;height:132px;border-radius:18px;clip-path:none}.home-node{border-radius:50%;width:150px;height:150px;left:calc(50% - 75px);top:calc(50% - 75px);background:radial-gradient(circle,rgba(0,170,255,.2),rgba(1,10,20,.96));box-shadow:0 0 36px rgba(32,234,255,.24),inset 0 0 28px rgba(0,180,255,.08)}.pv-node{left:calc(50% - 66px);top:2%}.grid-node{left:3%;top:calc(50% - 66px)}.battery-node{right:3%;top:calc(50% - 66px)}.ev-node{left:calc(50% - 66px);bottom:2%}.flow-lines{inset:0}.connector{stroke-width:6;stroke-linecap:round}.flow-label{border-radius:999px;background:#020a13;border:1px solid rgba(32,234,255,.3);padding:4px 7px;font-size:9px;z-index:3}.pv-label{top:29%;left:calc(50% + 18px)}.grid-label{left:27%;top:calc(50% - 22px)}.battery-label{right:27%;top:calc(50% - 22px)}.ev-label{bottom:29%;left:calc(50% + 18px)}
    .string-live,.device-config-live{margin-left:auto;text-align:right;min-width:85px}.string-live small,.device-config-live small{display:block;color:#6d94a2;font-size:8px}.string-live b,.device-config-live b{font:18px monospace;color:var(--green)}.string-live span,.device-config-live span{font-size:8px;color:#7aa2af}.disabled-card{opacity:.58;filter:saturate(.55)}.device-live{border-radius:13px;min-height:145px}.device-live-copy{min-width:0}.device-live-copy p{font-size:8px;color:#6e97a5;margin:5px 0 0;line-height:1.3}.device-state-dot{position:absolute;right:11px;bottom:11px;width:8px;height:8px;border-radius:50%}.device-state-dot.on{background:var(--green);box-shadow:0 0 11px var(--green)}.device-state-dot.off{background:#48606a}.device-live.is-active{box-shadow:0 0 20px rgba(32,234,255,.12),inset 0 0 26px rgba(0,180,255,.06)}.device-config-live{padding:7px 10px;border:1px solid rgba(32,234,255,.2);border-radius:9px}.consumer{grid-template-columns:minmax(130px,1fr) minmax(80px,1.3fr) 60px;grid-template-rows:auto auto}.consumer>span{display:flex;align-items:center;gap:6px}.consumer>span ha-icon{width:15px;height:15px;color:var(--cyan)}.consumer small{grid-column:1/-1;color:#5f8592;font-size:8px}.consumer.active small{color:#76b7a0}.consumer.active>span{color:white}
    /* v0.3 responsive energy-flow grid: nodes and connectors share the same CSS grid, so lines stay aligned at every width. */
    .flow-canvas{position:relative;display:flex;align-items:center;justify-content:center;padding:16px;min-height:390px;height:auto!important;overflow:hidden}.flow-canvas.large{min-height:550px}.flow-canvas.density-compact{min-height:330px}.flow-canvas.large.density-compact{min-height:440px}.flow-canvas.density-spacious{min-height:500px}.flow-canvas.large.density-spacious{min-height:630px}
    .flow-grid{position:relative;width:min(100%,1040px);height:100%;min-height:inherit;display:grid;grid-template-columns:minmax(108px,1fr) minmax(42px,.72fr) minmax(140px,.95fr) minmax(42px,.72fr) minmax(108px,1fr);grid-template-rows:minmax(108px,1fr) minmax(42px,.55fr) minmax(140px,1.1fr) minmax(42px,.55fr) minmax(108px,1fr);align-items:center;justify-items:center;gap:0}
    .flow-grid .flow-node{position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:clamp(105px,10vw,138px);height:clamp(105px,10vw,138px);box-sizing:border-box;border-radius:20px;clip-path:none}.flow-grid .home-node{grid-column:3;grid-row:3;width:clamp(125px,11.5vw,158px);height:clamp(125px,11.5vw,158px);border-radius:50%;background:radial-gradient(circle,rgba(0,175,255,.23),rgba(1,10,20,.97));box-shadow:0 0 38px rgba(32,234,255,.27),inset 0 0 30px rgba(0,180,255,.1)}.flow-grid .pv-node{grid-column:3;grid-row:1}.flow-grid .grid-node{grid-column:1;grid-row:3}.flow-grid .battery-node{grid-column:5;grid-row:3}.flow-grid .ev-node{grid-column:3;grid-row:5}
    .flow-link{--link:var(--cyan);position:relative;z-index:1;display:flex;align-items:center;justify-content:center;overflow:visible}.flow-link:before{content:"";position:absolute;background:color-mix(in srgb,var(--link) 55%,transparent);box-shadow:0 0 8px color-mix(in srgb,var(--link) 55%,transparent)}.flow-link i{position:absolute;display:block;border-radius:999px;background:linear-gradient(90deg,transparent,var(--link),#fff,var(--link),transparent);box-shadow:0 0 13px var(--link);animation:flow-x 1.3s linear infinite}.flow-link span{position:relative;z-index:2;min-width:54px;text-align:center;border:1px solid color-mix(in srgb,var(--link) 45%,transparent);border-radius:999px;background:rgba(1,8,16,.93);padding:4px 7px;color:white;font:9px monospace;box-shadow:0 0 10px rgba(0,0,0,.55)}.flow-link.horizontal{width:100%;height:44px}.flow-link.horizontal:before{left:0;right:0;height:3px}.flow-link.horizontal i{left:-35%;width:35%;height:4px}.flow-link.vertical{height:100%;width:44px}.flow-link.vertical:before{top:0;bottom:0;width:3px}.flow-link.vertical i{top:-35%;width:4px;height:35%;background:linear-gradient(180deg,transparent,var(--link),#fff,var(--link),transparent);animation-name:flow-y}.flow-link.reverse i{animation-direction:reverse}.flow-link.idle i{animation-play-state:paused;opacity:.15}.flow-link.idle:before{opacity:.35}.pv-link{--link:var(--green);grid-column:3;grid-row:2}.grid-link{--link:var(--purple);grid-column:2;grid-row:3}.battery-link{--link:var(--lime);grid-column:4;grid-row:3}.ev-link{--link:var(--cyan);grid-column:3;grid-row:4}@keyframes flow-x{from{left:-35%}to{left:100%}}@keyframes flow-y{from{top:-35%}to{top:100%}}
    .flow-canvas.density-compact .flow-grid .flow-node{width:108px;height:108px}.flow-canvas.density-compact .flow-grid .home-node{width:128px;height:128px}.flow-canvas.density-spacious .flow-grid .flow-node{width:148px;height:148px}.flow-canvas.density-spacious .flow-grid .home-node{width:172px;height:172px}
    @media(max-width:1300px){.metrics-grid{grid-template-columns:repeat(3,1fr)}.dashboard-grid{grid-template-columns:1fr}.flow-panel{grid-row:auto}.bottom-grid{grid-template-columns:repeat(2,1fr)}.mapping-grid{grid-template-columns:repeat(2,1fr)}.section-grid{grid-template-columns:repeat(2,1fr)}.device-live-grid{grid-template-columns:repeat(3,1fr)}.top-nav .nav-btn{min-width:90px;padding:0 8px}.nav-btn span{display:none}}
    @media(max-width:850px){.matrix-shell{grid-template-columns:1fr;grid-template-rows:58px 1fr 40px;grid-template-areas:"top" "main" "footer"}.matrix-shell:before{inset:58px 0 40px}.sidebar{position:fixed;left:-190px;top:58px;bottom:0;width:180px;transition:.2s}.sidebar.open{left:0}.hamburger{display:block}.brand{width:auto}.top-nav{display:none}.clock{margin-left:auto}.content{padding:10px}.metrics-grid{grid-template-columns:repeat(2,1fr)}.dashboard-grid,.config-layout{display:block}.dashboard-grid>.panel,.config-layout>.panel{margin-bottom:10px}.bottom-grid,.flow-details,.pv-summary,.four-grid,.three-grid,.mapping-grid,.section-grid,.device-live-grid,.tariff-live-grid,.season-schedule-grid,.price-config-grid{grid-template-columns:1fr 1fr}.flow-canvas{height:360px}.flow-node{width:100px;height:105px}.pv-node,.home-node,.ev-node{left:calc(50% - 50px)}.statusbar{gap:12px;overflow:hidden}.statusbar span:nth-child(2),.statusbar span:nth-child(3),.statusbar span:nth-child(4){display:none}}
    @media(max-width:560px){.metrics-grid,.bottom-grid,.flow-details,.pv-summary,.four-grid,.three-grid,.mapping-grid,.section-grid,.device-live-grid,.two-grid,.tariff-live-grid,.season-schedule-grid,.price-config-grid{grid-template-columns:1fr}.hero-row{flex-direction:column}.flow-node{width:90px;height:95px}.pv-node,.home-node,.ev-node{left:calc(50% - 45px)}.grid-node{left:1%}.battery-node{right:1%}.flow-label{display:none}.consumer{grid-template-columns:90px 1fr 55px}.status-message{max-width:70%}}
    @media(max-width:850px){.matrix-shell.no-statusbar{grid-template-rows:58px 1fr;grid-template-areas:"top" "main"}.matrix-shell.compact-header.no-statusbar{grid-template-rows:50px 1fr}.flow-canvas{min-height:390px!important;padding:10px}.flow-canvas.large{min-height:470px!important}.flow-grid{grid-template-columns:minmax(86px,1fr) minmax(24px,.42fr) minmax(112px,.9fr) minmax(24px,.42fr) minmax(86px,1fr);grid-template-rows:minmax(90px,1fr) minmax(30px,.4fr) minmax(112px,1.05fr) minmax(30px,.4fr) minmax(90px,1fr)}.flow-grid .flow-node{width:96px!important;height:96px!important}.flow-grid .home-node{width:116px!important;height:116px!important}.flow-link span{font-size:8px;min-width:45px;padding:3px 5px}.entity-modal{padding:10px}.entity-dialog{width:100%;height:94vh}.entity-result{grid-template-columns:30px minmax(0,1fr) auto}.compat-badge{display:none}}
    @media(max-width:560px){.flow-canvas{min-height:350px!important;padding:5px}.flow-grid{grid-template-columns:minmax(72px,1fr) 18px minmax(92px,.85fr) 18px minmax(72px,1fr);grid-template-rows:82px 24px 98px 24px 82px}.flow-grid .flow-node{width:78px!important;height:82px!important;border-radius:14px}.flow-grid .home-node{width:98px!important;height:98px!important}.flow-grid .flow-node ha-icon{width:25px;height:25px}.flow-grid .flow-node b{font-size:9px}.flow-grid .flow-node strong{font-size:16px}.flow-grid .flow-node small{font-size:7px}.flow-link span{display:none}.entity-dialog-head{padding:13px}.entity-search-row{margin:10px}.entity-filter-row{padding:0 10px 8px;flex-wrap:wrap}.entity-filter-row small{width:100%;margin-left:0}.entity-current{margin:0 10px 7px}.entity-results{padding:0 10px 10px}.entity-result{min-height:60px;padding:7px;grid-template-columns:26px minmax(0,1fr) auto}.entity-result-state{max-width:92px;font-size:8px}.entity-dialog-footer{padding:8px 10px}}

    /* v0.4 — configurable flow window with PV strings and additional device branches. */
    .flow-config-section{display:grid;grid-template-columns:minmax(520px,1.05fr) minmax(520px,.95fr);gap:10px;margin-bottom:10px}.flow-config-editor{padding:8px 14px 16px}.flow-config-preview{padding:4px 8px 8px;min-width:0}.preview-badge{position:absolute;right:14px;top:42px;z-index:5;border:1px solid rgba(82,255,98,.35);border-radius:999px;background:rgba(3,20,25,.92);color:var(--green);padding:5px 8px;display:flex;align-items:center;gap:5px;font-size:8px;font-weight:900}.preview-badge ha-icon{width:14px;height:14px}.flow-checks .check-row{border:1px solid rgba(32,234,255,.12);border-radius:10px;padding:10px;background:rgba(0,75,110,.05)}
    .flow-canvas-v4{--source-row:108px;--source-link-row:34px;--pv-row:132px;--pv-link-row:42px;--core-row:158px;--load-link-row:38px;--load-row:112px;min-height:calc(var(--source-row) + var(--source-link-row) + var(--pv-row) + var(--pv-link-row) + var(--core-row) + var(--load-link-row) + var(--load-row) + 28px)!important;height:auto!important;overflow:auto;padding:14px}.flow-canvas-v4.no-sources{--source-row:0px;--source-link-row:0px}.flow-canvas-v4.no-pv{--pv-row:0px;--pv-link-row:0px}.flow-canvas-v4.no-loads{--load-link-row:0px;--load-row:0px}.flow-canvas-v4.density-compact{--source-row:90px;--source-link-row:26px;--pv-row:108px;--pv-link-row:32px;--core-row:130px;--load-link-row:30px;--load-row:94px}.flow-canvas-v4.layout-wide .flow-grid-v4{width:min(100%,1280px)}.flow-canvas-v4.layout-compact .flow-grid-v4{width:min(100%,880px)}.flow-canvas-v4.density-spacious{--source-row:126px;--source-link-row:42px;--pv-row:150px;--pv-link-row:50px;--core-row:178px;--load-link-row:46px;--load-row:130px}.flow-canvas-v4.preview{--source-row:86px;--source-link-row:24px;--pv-row:102px;--pv-link-row:28px;--core-row:122px;--load-link-row:26px;--load-row:90px;padding:10px;min-height:calc(var(--source-row) + var(--source-link-row) + var(--pv-row) + var(--pv-link-row) + var(--core-row) + var(--load-link-row) + var(--load-row) + 20px)!important}
    .flow-grid-v4{position:relative;width:min(100%,1080px);min-width:520px;min-height:0!important;height:auto!important;display:grid;grid-template-columns:minmax(106px,1fr) minmax(38px,.52fr) minmax(136px,.85fr) minmax(38px,.52fr) minmax(106px,1fr);grid-template-rows:var(--source-row) var(--source-link-row) var(--pv-row) var(--pv-link-row) var(--core-row) var(--load-link-row) var(--load-row);align-items:center;justify-items:center;gap:0}.flow-grid-v4 .flow-node{width:clamp(106px,10vw,138px)!important;height:clamp(106px,10vw,138px)!important}.flow-grid-v4 .home-node{grid-column:3;grid-row:5;width:clamp(126px,11.5vw,158px)!important;height:clamp(126px,11.5vw,158px)!important}.flow-grid-v4 .pv-node{grid-column:3;grid-row:3}.flow-grid-v4 .grid-node{grid-column:1;grid-row:5}.flow-grid-v4 .battery-node{grid-column:5;grid-row:5}.flow-grid-v4 .pv-link{grid-column:3;grid-row:4}.flow-grid-v4 .grid-link{grid-column:2;grid-row:5}.flow-grid-v4 .battery-link{grid-column:4;grid-row:5}.flow-grid-v4 .source-link{--link:var(--green);grid-column:3;grid-row:2}.flow-grid-v4 .loads-link{--link:var(--cyan);grid-column:3;grid-row:6}.flow-canvas-v4.no-pv .source-link{grid-row:2/5}.flow-canvas-v4.no-pv.no-sources .home-node,.flow-canvas-v4.no-pv.no-sources .grid-node,.flow-canvas-v4.no-pv.no-sources .battery-node,.flow-canvas-v4.no-pv.no-sources .grid-link,.flow-canvas-v4.no-pv.no-sources .battery-link{grid-row:5}
    .flow-branch-bus{position:relative;z-index:2;grid-column:1/-1;width:100%;height:100%;display:flex;align-items:stretch;justify-content:center;gap:var(--branch-gap);padding:0 max(8px,var(--branch-gap));overflow:visible}.source-bus{grid-row:1}.load-bus{grid-row:7}.branch-bus-line{position:absolute;left:8%;right:8%;height:14px;z-index:1;pointer-events:none}.branch-bus-line:after{content:"";position:absolute;left:0;right:0;top:6px;height:2px;background:rgba(32,234,255,.42);box-shadow:0 0 8px rgba(32,234,255,.35)}.source-bus>.branch-bus-line{bottom:-7px}.source-bus>.branch-bus-line:after{background:rgba(82,255,98,.42);box-shadow:0 0 8px rgba(82,255,98,.35)}.load-bus>.branch-bus-line{top:-7px}.flow-branch{--branch-color:var(--cyan);position:relative;z-index:3;flex:0 1 128px;min-width:92px;max-width:150px;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;overflow:visible;transition:opacity .2s,filter .2s}.flow-branch.accent-green{--branch-color:var(--green)}.flow-branch.accent-lime{--branch-color:var(--lime)}.flow-branch.accent-orange{--branch-color:var(--orange)}.flow-branch.accent-purple{--branch-color:var(--purple)}.flow-branch.is-idle{opacity:.58;filter:saturate(.55)}.flow-branch.hidden-when-idle.is-idle{display:none}.flow-extra-node{position:relative;z-index:4;width:100%;min-height:76px;border:1px solid color-mix(in srgb,var(--branch-color) 58%,transparent);border-radius:13px;background:radial-gradient(circle at 10% 10%,color-mix(in srgb,var(--branch-color) 12%,transparent),transparent 45%),rgba(2,12,24,.97);box-shadow:0 0 15px color-mix(in srgb,var(--branch-color) 12%,transparent),inset 0 0 18px rgba(0,120,180,.04);display:grid;grid-template-columns:29px minmax(0,1fr);grid-template-rows:auto auto auto;align-content:center;column-gap:6px;padding:8px 9px;color:white}.flow-extra-node>ha-icon{grid-column:1;grid-row:1/4;align-self:center;width:25px;height:25px;color:var(--branch-color);filter:drop-shadow(0 0 6px currentColor)}.flow-extra-node>b{grid-column:2;font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.flow-extra-value{grid-column:2;display:flex;align-items:baseline;gap:3px}.flow-extra-value strong{font:16px monospace;color:var(--branch-color)}.flow-extra-value span{font-size:7px;color:#85a8b5}.flow-extra-node>small{grid-column:2;display:block;max-width:100%;font-size:7px;color:#658d9c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.branch-wire{position:relative;z-index:3;display:block;width:20px;flex:1;min-height:10px;overflow:visible}.branch-wire:before{content:"";position:absolute;left:calc(50% - 1px);top:0;bottom:0;width:2px;background:color-mix(in srgb,var(--branch-color) 55%,transparent);box-shadow:0 0 6px color-mix(in srgb,var(--branch-color) 55%,transparent)}.branch-wire i{position:absolute;left:calc(50% - 2px);top:-35%;width:4px;height:35%;border-radius:999px;background:linear-gradient(180deg,transparent,var(--branch-color),#fff,var(--branch-color),transparent);box-shadow:0 0 10px var(--branch-color);animation:flow-y 1.3s linear infinite}.branch-wire.reverse i{animation-direction:reverse}.branch-wire.idle i{animation-play-state:paused;opacity:.15}.branch-wire.idle:before{opacity:.35}.source-branch .flow-extra-node{order:1}.source-branch .branch-wire{order:2}.load-branch .branch-wire{order:1}.load-branch .flow-extra-node{order:2}.flow-branch.is-active .flow-extra-node{box-shadow:0 0 22px color-mix(in srgb,var(--branch-color) 21%,transparent),inset 0 0 20px color-mix(in srgb,var(--branch-color) 7%,transparent)}
    .flow-canvas-v4.node-style-technical .flow-node,.flow-canvas-v4.node-style-technical .flow-extra-node{border-radius:2px}.flow-canvas-v4.node-style-technical .home-node{border-radius:50%}.flow-canvas-v4.node-style-soft .flow-node,.flow-canvas-v4.node-style-soft .flow-extra-node{border-radius:26px;background:radial-gradient(circle at 30% 15%,rgba(32,234,255,.14),rgba(2,12,24,.96))}.flow-canvas-v4.hide-labels .flow-node>b,.flow-canvas-v4.hide-labels .flow-extra-node>b{display:none}.flow-canvas-v4.hide-values .flow-node strong,.flow-canvas-v4.hide-values .flow-extra-value,.flow-canvas-v4.hide-values .flow-link span[data-live]{display:none}.flow-canvas-v4.hide-status .flow-extra-node>small{display:none}.flow-canvas-v4.hide-connectors .flow-link,.flow-canvas-v4.hide-connectors .branch-wire,.flow-canvas-v4.hide-connectors .branch-bus-line{opacity:0}.flow-canvas-v4.speed-slow .flow-link i,.flow-canvas-v4.speed-slow .branch-wire i{animation-duration:2.4s}.flow-canvas-v4.speed-fast .flow-link i,.flow-canvas-v4.speed-fast .branch-wire i{animation-duration:.7s}.flow-canvas-v4.preview .flow-node{width:100px!important;height:100px!important}.flow-canvas-v4.preview .home-node{width:116px!important;height:116px!important}.flow-canvas-v4.preview .flow-extra-node{min-height:66px}.flow-canvas-v4.preview .flow-extra-value strong{font-size:14px}
    @media(max-width:1300px){.flow-config-section{grid-template-columns:1fr}.flow-config-preview{min-height:520px}}
    @media(max-width:850px){.flow-canvas-v4{padding:8px;min-height:calc(var(--source-row) + var(--source-link-row) + var(--pv-row) + var(--pv-link-row) + var(--core-row) + var(--load-link-row) + var(--load-row) + 16px)!important}.flow-grid-v4{min-width:460px;grid-template-columns:minmax(88px,1fr) 26px minmax(112px,.86fr) 26px minmax(88px,1fr)}.flow-grid-v4 .flow-node{width:94px!important;height:94px!important}.flow-grid-v4 .home-node{width:116px!important;height:116px!important}.flow-branch{min-width:86px;max-width:112px}.flow-extra-node{padding:6px;grid-template-columns:24px minmax(0,1fr)}.flow-extra-node>ha-icon{width:21px;height:21px}.flow-extra-value strong{font-size:14px}.flow-config-preview{min-height:470px}}
    @media(max-width:560px){.flow-config-section{display:block}.flow-config-editor,.flow-config-preview{margin-bottom:10px}.flow-canvas-v4{overflow-x:auto!important;min-height:0!important}.flow-grid-v4{min-width:420px}.flow-canvas-v4 .flow-link span{display:none}.flow-branch{min-width:80px}.flow-extra-node>b{font-size:8px}.flow-extra-node>small{font-size:6px}.preview-badge{display:none}}

    /* v0.5 — configurable overview bubbles and session charts. */
    .metric-card.custom-bubble{--bubble-color:var(--cyan);--bubble-bg:#031426;height:auto;min-height:94px;padding:var(--bubble-padding,13px);border:var(--bubble-border-width,1px) solid var(--bubble-border-color,var(--bubble-color));border-radius:var(--bubble-radius,14px);background:radial-gradient(circle at 8% 12%,color-mix(in srgb,var(--bubble-color) 16%,transparent),transparent 45%),linear-gradient(145deg,color-mix(in srgb,var(--bubble-bg) 94%,#071a2a),color-mix(in srgb,var(--bubble-bg) 82%,#000));box-shadow:inset 0 0 22px color-mix(in srgb,var(--bubble-color) 6%,transparent)}.metric-card.custom-bubble>ha-icon{width:var(--bubble-icon-size,22px);height:var(--bubble-icon-size,22px);color:var(--bubble-icon-color,var(--bubble-color));filter:drop-shadow(0 0 6px color-mix(in srgb,var(--bubble-icon-color,var(--bubble-color)) 55%,transparent))}.metric-card.custom-bubble .spark{stroke:var(--bubble-color)}.custom-bubble-copy{min-width:0;z-index:1}.custom-bubble-copy>small{color:var(--bubble-name-color,#8eb5c3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-bubble-copy>div{display:flex;align-items:baseline;min-width:0}.custom-bubble-copy>div>strong{max-width:145px;color:var(--bubble-value-color,var(--bubble-color));font-size:var(--bubble-value-size,24px);filter:drop-shadow(0 0 6px color-mix(in srgb,var(--bubble-value-color,var(--bubble-color)) 55%,transparent));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-bubble-copy>div>span{color:var(--bubble-unit-color,#8eb3c0)}.custom-bubble-copy p{margin:3px 0 16px;color:var(--bubble-description-color,#6e96a5);font-size:8px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.custom-bubble.bubble-align-center{justify-content:center;text-align:center}.custom-bubble.bubble-align-center .custom-bubble-copy>div{justify-content:center}.custom-bubble.bubble-align-right{justify-content:flex-end;text-align:right}.custom-bubble.bubble-align-right .custom-bubble-copy>div{justify-content:flex-end}.metrics-grid.bubble-size-compact .metric-card{min-height:76px;height:76px;padding:var(--bubble-padding,9px)}.metrics-grid.bubble-size-compact .metric-card:not(.custom-bubble) strong{font-size:20px}.metrics-grid.bubble-size-compact .custom-bubble-copy p{display:none}.metrics-grid.bubble-size-large{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}.metrics-grid.bubble-size-large .metric-card{min-height:120px;padding:var(--bubble-padding,17px)}.metrics-grid.bubble-size-large .metric-card:not(.custom-bubble) strong{font-size:29px}.metrics-grid.bubble-size-large .custom-bubble-copy p{font-size:9px;margin-top:7px}
    .metric-card.custom-bubble>.bubble-emoji{display:grid;place-items:center;width:var(--bubble-icon-size,22px);height:var(--bubble-icon-size,22px);font-size:var(--bubble-icon-size,22px);line-height:1;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--bubble-icon-color,var(--bubble-color)) 55%,transparent))}.custom-bubble-copy>small{font-size:var(--bubble-name-size,10px);font-weight:var(--bubble-name-weight,400)}.custom-bubble-copy>div>strong{font-weight:var(--bubble-value-weight,700)}.custom-bubble-copy>div>span{font-size:var(--bubble-unit-size,9px);font-weight:var(--bubble-unit-weight,400)}.custom-bubble-copy p{font-size:var(--bubble-description-size,8px);font-weight:var(--bubble-description-weight,400)}
    .custom-chart-grid{display:grid;grid-template-columns:repeat(var(--chart-columns,2),minmax(0,1fr));gap:10px;margin-top:10px}.custom-overview-chart{--chart-color:var(--cyan);padding:11px 14px 10px;min-width:0;overflow:hidden;border-color:color-mix(in srgb,var(--chart-color) 38%,rgba(32,234,255,.18));background:radial-gradient(circle at 7% 5%,color-mix(in srgb,var(--chart-color) 10%,transparent),transparent 42%),var(--panel)}.custom-chart-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}.custom-chart-head>div{display:flex;align-items:center;gap:9px;min-width:0}.custom-chart-head ha-icon{color:var(--chart-color);filter:drop-shadow(0 0 6px currentColor)}.custom-chart-head span{display:flex;flex-direction:column;min-width:0}.custom-chart-head b{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-chart-head small{color:#638998;font-size:8px;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-chart-head>strong{display:flex;align-items:baseline;gap:4px;color:var(--chart-color);font:22px monospace;white-space:nowrap}.custom-chart-head>strong small{font:8px sans-serif;color:#83acba}.custom-overview-chart svg{width:100%;height:150px;margin-top:5px;overflow:visible}.custom-overview-chart.chart-small svg{height:95px}.custom-overview-chart.chart-large svg{height:230px}.custom-chart-path{fill:none;stroke:var(--chart-color);stroke-width:var(--chart-line-width,2);vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--chart-color) 65%,transparent))}.graph-area .custom-chart-path{fill:color-mix(in srgb,var(--chart-color) 17%,transparent);stroke:var(--chart-color)}.graph-bar .custom-chart-path{fill:color-mix(in srgb,var(--chart-color) 62%,transparent);stroke:var(--chart-color);stroke-width:.5}.custom-chart-foot{display:flex;justify-content:space-between;gap:10px;color:#567b8b;font-size:8px}.custom-chart-foot span{color:#739baa}.custom-chart-foot b{color:var(--chart-color);font-family:monospace}.custom-chart-foot i{font-style:normal}
    .overview-widget-layout{display:grid;grid-template-columns:minmax(360px,.6fr) minmax(560px,1.4fr);gap:10px;margin-bottom:18px}.overview-widget-settings,.overview-widget-preview{padding:8px 14px 16px;min-width:0}.overview-widget-preview>.metrics-grid{margin:0}.overview-widget-preview>.empty{padding:35px}.custom-chart-grid.preview-grid{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}.widget-checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:8px}.overview-widget-settings>.widget-checks{grid-template-columns:1fr}.widget-checks .check-row{border:1px solid rgba(32,234,255,.13);border-radius:10px;background:rgba(0,75,110,.05);padding:9px}.widget-checks.three-checks{grid-template-columns:repeat(3,minmax(0,1fr))}.widget-add-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.widget-editor-list{display:grid;gap:10px;margin-bottom:18px}.section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding:4px 2px}.section-heading h2{margin:3px 0 0;font-size:17px}.widget-editor-card{padding:8px 14px 16px}.widget-editor-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px 10px}.widget-editor-grid>.full{grid-column:1/-1}.danger-link{border:1px solid rgba(255,85,115,.35);background:rgba(255,40,75,.08);color:#ff718b;padding:5px 8px;display:flex;align-items:center;gap:5px;font-size:8px;font-weight:900}.danger-link ha-icon{width:15px;height:15px}.color-input-wrap{height:39px;border:1px solid rgba(32,234,255,.28);background:#03101e;display:grid!important;grid-template-columns:54px 1fr;align-items:center}.field .color-input-wrap input[type=color]{width:54px;height:37px;border:0;padding:4px;background:transparent}.color-input-wrap code{padding:0 10px;color:#a8d3df;font-size:10px}
    .kiosk-settings{margin-top:18px;padding-top:6px;border-top:1px solid rgba(32,234,255,.16)}.kiosk-settings>.widget-checks{grid-template-columns:1fr 1fr}.kiosk-preview-button{margin-top:12px;width:100%;justify-content:center}.matrix-shell.kiosk-active{height:100vh;height:100dvh;overflow:hidden;grid-template-columns:1fr;grid-template-rows:1fr;grid-template-areas:"main"}.matrix-shell.kiosk-active>.topbar,.matrix-shell.kiosk-active>.sidebar,.matrix-shell.kiosk-active>.statusbar{display:none}.matrix-shell.kiosk-active:before{inset:0}.matrix-shell.kiosk-active>.content{padding:12px;overflow:hidden;min-height:0}.kiosk-view{width:100%;height:100%;min-height:0;display:flex;flex-direction:column;gap:10px;overflow:hidden}.kiosk-header{min-height:72px;border:1px solid rgba(32,234,255,.3);background:linear-gradient(90deg,rgba(3,24,45,.96),rgba(1,10,20,.94));display:flex;align-items:center;justify-content:space-between;gap:18px;padding:10px 16px;box-shadow:inset 0 0 22px rgba(0,190,255,.07)}.kiosk-header h1{margin:2px 0;font-size:23px;letter-spacing:2px}.kiosk-header>div>small{color:#6e98a8}.kiosk-header-tools{display:flex;align-items:center;gap:8px}.kiosk-clock{display:flex;flex-direction:column;align-items:flex-end;min-width:105px}.kiosk-clock b{font:20px monospace;color:var(--cyan)}.kiosk-clock span{font-size:8px;color:#6792a2}.kiosk-metrics{margin:0;grid-template-columns:repeat(auto-fit,minmax(155px,1fr))}.kiosk-flow-card{flex:1;min-height:0;padding:0;overflow:hidden}.kiosk-flow-card .flow-canvas-v4{margin:0 12px 12px;min-height:560px!important}.flow-height-tall .kiosk-flow-card .flow-canvas-v4{min-height:max(650px,calc(100vh - 300px))!important}.flow-height-full .kiosk-flow-card .flow-canvas-v4{min-height:max(760px,calc(100vh - 195px))!important}.kiosk-status{min-height:36px;border:1px solid rgba(32,234,255,.25);background:rgba(2,15,29,.96);display:flex;align-items:center;justify-content:space-around;gap:18px;padding:6px 13px;color:#719baa;font-size:9px}.kiosk-status span{display:flex;align-items:center;gap:6px}.kiosk-status b{color:var(--cyan);font-family:monospace}
    .compact-kiosk-header .kiosk-header{min-height:56px;padding:6px 12px}.compact-kiosk-header .kiosk-header h1{font-size:18px}.compact-kiosk-header .kiosk-header>div>small{font-size:7px}.compact-kiosk-header .kiosk-clock b{font-size:17px}.compact-kiosk-header .secondary-btn{padding:6px 9px;font-size:8px}
    .display-tablet_16_9{gap:6px}.display-tablet_16_9 .kiosk-header{flex:0 0 auto}.display-tablet_16_9 .kiosk-slides{overflow:hidden}.display-tablet_16_9 .kiosk-slide{height:100%;min-height:0;gap:6px;overflow:hidden}.display-tablet_16_9 .kiosk-metrics{grid-template-columns:repeat(var(--kiosk-bubble-columns,6),minmax(0,1fr));gap:6px;flex:0 0 auto}.display-tablet_16_9 .kiosk-metrics .metric-card{height:82px;min-height:82px;padding:8px;border-radius:10px}.display-tablet_16_9 .kiosk-metrics .metric-card strong{font-size:19px}.display-tablet_16_9 .kiosk-metrics .custom-bubble-copy p{display:none}.display-tablet_16_9 .kiosk-metrics .bubble-related-list{margin-top:3px;padding-top:2px}.display-tablet_16_9 .kiosk-flow-card{overflow:visible}.display-tablet_16_9 .kiosk-flow-card .flow-canvas-v4{--source-row:58px;--source-link-row:12px;--pv-row:68px;--pv-link-row:12px;--core-row:82px;--load-link-row:12px;--load-row:58px;box-sizing:border-box;width:auto;height:calc(100% - 32px)!important;min-height:0!important;margin:0 6px 6px;padding:6px;overflow:visible}.display-tablet_16_9 .flow-grid-v4{height:100%!important;min-width:480px}.display-tablet_16_9 .flow-grid-v4 .flow-node{width:76px!important;height:76px!important}.display-tablet_16_9 .flow-grid-v4 .home-node{width:90px!important;height:90px!important}.display-tablet_16_9 .flow-extra-node{min-height:48px;padding:4px}.display-tablet_16_9 .flow-extra-node>ha-icon{width:19px;height:19px}.display-tablet_16_9 .flow-extra-value strong{font-size:12px}.display-tablet_16_9 .kiosk-chart-grid{height:100%;min-height:0;margin:0;grid-template-columns:repeat(var(--kiosk-chart-columns,2),minmax(0,1fr));grid-auto-rows:minmax(0,1fr);overflow:auto}.display-tablet_16_9 .custom-overview-chart{min-height:0}.display-tablet_16_9 .custom-overview-chart svg{height:min(17vh,135px)}.display-tablet_16_9 .kiosk-summary-grid{grid-template-columns:1.2fr 1.2fr .8fr .8fr;gap:6px;min-height:0;overflow:hidden}.display-tablet_16_9 .kiosk-summary-grid>.panel{min-height:0;height:auto}.display-tablet_16_9 .kiosk-summary-grid .gauge{width:96px;height:96px}.display-tablet_16_9 .kiosk-summary-grid .gauge:before{width:76px;height:76px}.display-tablet_16_9 .kiosk-slide-nav{height:22px}.display-tablet_16_9 .kiosk-status{min-height:30px;padding:4px 10px;font-size:8px}
    /* v0.6 — advanced widgets, recorder history and multi-profile kiosk. */
    .actionable{cursor:pointer}.actionable:hover,.actionable:focus{outline:none;transform:translateY(-1px);box-shadow:0 0 24px color-mix(in srgb,var(--bubble-color,var(--chart-color,var(--cyan))) 28%,transparent)}.bubble-secondary{margin-top:2px!important;display:flex!important;align-items:baseline!important;gap:3px;color:var(--bubble-secondary-label-color,#88afbd)}.bubble-secondary small{margin-right:3px;font-size:7px;color:var(--bubble-secondary-label-color,#88afbd)}.bubble-secondary b{font:var(--bubble-secondary-value-size,11px) monospace;color:var(--bubble-secondary-color,var(--bubble-color))}.bubble-secondary span{font-size:7px!important;color:var(--bubble-secondary-unit-color,#7898a4)!important}.bubble-related-list{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 7px;margin-top:5px;padding-top:4px;border-top:1px solid color-mix(in srgb,var(--bubble-color) 18%,transparent)}.bubble-related-value{display:grid!important;grid-template-columns:minmax(0,1fr) auto auto;align-items:baseline!important;gap:3px;min-width:0}.bubble-related-value small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--related-label-color,#7195a2);font-size:7px}.bubble-related-value b{font:var(--related-value-size,10px) monospace;color:var(--related-color);white-space:nowrap}.bubble-related-value span{font-size:6px!important;color:var(--related-unit-color,#7898a4)}.custom-bubble-copy:has(.bubble-related-list) p{margin-bottom:17px}.metrics-grid.bubble-size-compact .custom-bubble:has(.bubble-related-list){height:auto;min-height:88px}.bubble-alert{border-color:var(--alert-color)!important;animation:bubble-alarm 1.2s ease-in-out infinite}.bubble-alert-label{position:absolute;top:6px;right:6px;z-index:3;border:1px solid var(--alert-color);border-radius:999px;background:rgba(40,0,10,.9);color:var(--alert-color);padding:2px 6px;font-size:7px;font-weight:900;letter-spacing:.7px}@keyframes bubble-alarm{0%,100%{box-shadow:0 0 8px color-mix(in srgb,var(--alert-color) 18%,transparent)}50%{box-shadow:0 0 28px color-mix(in srgb,var(--alert-color) 62%,transparent),inset 0 0 18px color-mix(in srgb,var(--alert-color) 12%,transparent)}}
    .chart-series-legend{display:flex;flex-wrap:wrap;gap:5px 12px;margin-top:8px;padding:6px 8px;border:1px solid rgba(32,234,255,.1);background:rgba(0,35,55,.18)}.chart-series-legend>div{--series-color:var(--cyan);display:flex;align-items:baseline;gap:4px;min-width:0;font-size:8px}.chart-series-legend i{width:12px;height:3px;border-radius:2px;background:var(--series-color);box-shadow:0 0 5px var(--series-color)}.chart-series-legend span{color:#8cadb9;max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chart-series-legend b{font:10px monospace;color:var(--series-color)}.chart-series-legend small{color:#658895;font-size:7px}.custom-chart-path{stroke:var(--series-color,var(--chart-color))!important;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--series-color,var(--chart-color)) 65%,transparent))}.graph-area .custom-chart-path{fill:color-mix(in srgb,var(--series-color,var(--chart-color)) 12%,transparent)!important}.graph-bar .custom-chart-path{fill:color-mix(in srgb,var(--series-color,var(--chart-color)) 62%,transparent)!important}
    .widget-subsection{margin-top:12px;padding:9px 10px;border-left:3px solid var(--cyan);background:linear-gradient(90deg,rgba(0,180,230,.09),transparent);display:flex;flex-direction:column;gap:2px}.widget-subsection b{font-size:9px;color:var(--cyan);letter-spacing:1px}.widget-subsection small{font-size:8px;color:#6b93a2}.widget-related-list{display:grid;gap:8px}.widget-related-card{border:1px solid rgba(32,234,255,.18);border-radius:5px;background:rgba(0,35,55,.18);padding:8px}.widget-related-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.widget-related-head>b{font-size:8px;color:#8fc6d4;letter-spacing:.8px}.widget-related-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px 9px}.widget-related-grid>.full{grid-column:1/-1}.widget-related-grid .check-row{align-self:end;border:1px solid rgba(32,234,255,.12);padding:7px}.add-related-btn{justify-self:start}.draggable-widget{transition:opacity .15s,transform .15s,border-color .15s}.draggable-widget .drag-handle{width:17px;height:17px;vertical-align:middle;color:#769aa7;cursor:grab}.draggable-widget.dragging{opacity:.35;transform:scale(.99)}.draggable-widget.drag-target{border-color:var(--green);box-shadow:0 0 22px rgba(82,255,98,.2)}
    .kiosk-profile-card{padding:8px 14px 16px;margin-top:0}.kiosk-profile-card.kiosk-settings{border-top:1px solid rgba(32,234,255,.35)}.default-kiosk-settings{margin-top:18px}.kiosk-profile-head-actions{display:flex;align-items:center;gap:6px}.kiosk-selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px}.selection-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.selection-chip{display:inline-flex;align-items:center;gap:5px;border:1px solid rgba(32,234,255,.2);border-radius:999px;background:rgba(0,70,105,.08);padding:5px 8px;color:#91b8c5;font-size:8px}.selection-chip:has(input:checked){border-color:var(--green);color:var(--green);background:rgba(82,255,98,.07)}.selection-chip ha-icon{width:14px;height:14px}.selection-chip input{margin:0}.kiosk-profile-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:13px;padding-top:10px;border-top:1px solid rgba(32,234,255,.15)}.kiosk-profile-footer code{font-size:9px;overflow:hidden;text-overflow:ellipsis}
    .kiosk-slides{position:relative;flex:1;min-height:0;touch-action:pan-y}.kiosk-slide{display:none;min-height:100%;flex-direction:column;gap:10px;will-change:transform,opacity}.kiosk-slide.active{display:flex}.kiosk-chart-grid{margin:0;align-content:start}.kiosk-summary-grid{display:grid;grid-template-columns:repeat(var(--summary-columns,4),minmax(0,1fr));gap:10px;flex:1}.kiosk-summary-grid>.panel{min-height:250px}.kiosk-summary-grid .price-panel,.kiosk-summary-grid .consumers-panel{height:auto}.kiosk-slide-nav{height:30px;display:flex;align-items:center;justify-content:center;gap:12px}.kiosk-slide-nav>button{border:0;background:transparent;color:var(--cyan);padding:2px}.kiosk-slide-nav>div{display:flex;gap:7px}.kiosk-dot{width:28px;height:5px;border:0;border-radius:999px;background:#254451;padding:0}.kiosk-dot.active{background:var(--cyan);box-shadow:0 0 9px var(--cyan)}.matrix-shell.kiosk-active{transition:filter 1s ease}.matrix-shell.kiosk-active.kiosk-night{filter:brightness(var(--night-brightness,.3));cursor:none}.matrix-shell.kiosk-active.kiosk-night:hover{cursor:default}
    .widget-checks.four-checks{grid-template-columns:repeat(4,minmax(0,1fr))}.reset-layout-btn{height:39px;justify-content:center}.builtin-kiosk-selection{padding-bottom:4px}.kiosk-bubble-slot{position:relative;min-width:0}.kiosk-bubble-slot>.metric-card{width:100%;margin:0}.kiosk-bubble-stage.layout-grid{display:grid}.kiosk-bubble-stage.layout-free{display:block!important;position:relative;z-index:20;height:var(--kiosk-bubble-stage-height,96px);min-height:var(--kiosk-bubble-stage-height,96px);margin-bottom:0;overflow:visible;pointer-events:none;background:transparent}.kiosk-bubble-stage.layout-free .kiosk-bubble-slot{position:absolute;z-index:21;left:var(--kiosk-x,0);top:var(--kiosk-y,0);width:var(--kiosk-w,16%);height:82px;pointer-events:auto}.kiosk-bubble-stage.layout-free .kiosk-bubble-slot>.metric-card{height:100%;min-height:100%}.layout-drag-handle,.layout-resize-handle{display:none;position:absolute;z-index:40;align-items:center;justify-content:center;border:1px solid var(--orange);background:rgba(24,14,0,.94);color:var(--orange);box-shadow:0 0 12px rgba(255,177,27,.25);touch-action:none;user-select:none}.layout-drag-handle ha-icon,.layout-resize-handle ha-icon{width:15px;height:15px}.bubble-layout-handle{top:3px;right:3px;width:25px;height:25px;border-radius:7px}.layout-resize-handle{right:3px;bottom:3px;width:25px;height:25px;border-radius:7px}.flow-layout-handle{top:7px;left:50%;transform:translateX(-50%);padding:5px 9px;border-radius:999px;font-size:8px;gap:5px}.layout-editing .layout-drag-handle,.layout-editing .layout-resize-handle{display:flex}.layout-editing .kiosk-bubble-slot{outline:1px dashed rgba(255,177,27,.75);outline-offset:2px}.layout-editing .kiosk-bubble-slot>.metric-card{cursor:grab;touch-action:none;user-select:none}.layout-editing .kiosk-bubble-slot>.metric-card:active{cursor:grabbing}.layout-editing .kiosk-flow-card{outline:1px dashed rgba(255,177,27,.75);outline-offset:-4px}.layout-edit-btn.active{border-color:var(--orange);color:var(--orange)}.kiosk-flow-card{position:relative;z-index:1}.kiosk-flow-card .flow-canvas-v4{transform:translate(var(--flow-offset-x,0),var(--flow-offset-y,0)) scale(var(--flow-scale,1));transform-origin:center center;transition:transform .15s ease}.layout-editing .kiosk-flow-card .flow-canvas-v4{transition:none}
    .flow-grid-v4 [data-flow-layout-element]{transform:translate(var(--flow-node-x,0),var(--flow-node-y,0))}.flow-branch{z-index:9}.flow-layout-editing .flow-branch-bus{z-index:20}.flow-layout-editing [data-flow-layout-element]{pointer-events:auto;touch-action:none;user-select:none;cursor:grab;outline:2px dashed rgba(255,177,27,.86);outline-offset:3px}.flow-layout-editing [data-flow-layout-element]:active{cursor:grabbing}.flow-layout-editing .flow-link[data-flow-layout-element],.flow-layout-editing .branch-wire[data-flow-layout-element],.flow-layout-editing .branch-bus-line[data-flow-layout-element]{outline-color:rgba(32,234,255,.9);z-index:8}.flow-layout-editing .flow-link>[data-flow-layout-element]{outline-color:rgba(82,255,98,.95);z-index:12}.flow-layout-editing .branch-bus-line[data-flow-layout-element]{pointer-events:auto;min-height:14px}.flow-layout-editing .flow-extra-node[data-flow-layout-element]{z-index:15}
    .layout-editor-backdrop{position:fixed;inset:0;z-index:12000;background:rgba(0,4,10,.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px}.layout-editor-dialog{width:min(1480px,98vw);height:min(920px,96vh);border:1px solid rgba(32,234,255,.65);border-radius:20px;background:#020b16;box-shadow:0 0 70px rgba(0,190,255,.25);display:grid;grid-template-rows:auto auto minmax(0,1fr);overflow:hidden}.layout-editor-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:13px 16px;border-bottom:1px solid rgba(32,234,255,.2)}.layout-editor-toolbar h2{margin:3px 0;font-size:19px}.layout-editor-toolbar small{color:#6e98a8}.layout-editor-toolbar>div:last-child{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.layout-editor-help{display:flex;align-items:center;gap:8px;padding:8px 14px;border-bottom:1px solid rgba(255,177,27,.24);background:rgba(255,177,27,.06);color:#d9b86f;font-size:9px}.layout-editor-help ha-icon{color:var(--orange)}.layout-editor-canvas{position:relative;min-height:0;margin:10px;border:1px solid rgba(32,234,255,.35);border-radius:14px;overflow:hidden;background:linear-gradient(rgba(0,220,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.04) 1px,transparent 1px),#020b16;background-size:28px 28px}.layout-editor-fixed-background{position:absolute;inset:0;z-index:1;pointer-events:none}.layout-editor-fixed-background .flow-title{display:none}.layout-editor-fixed-background .flow-canvas-v4{position:absolute;inset:0;width:100%;height:100%!important;min-height:0!important;margin:0;padding:10px;border:0;background:transparent;overflow:visible}.layout-editor-fixed-background .flow-grid-v4{height:100%!important}.layout-editor-canvas>.kiosk-bubble-stage.layout-free{position:absolute;inset:0;z-index:20;width:100%;height:100%;min-height:100%;margin:0}.layout-editor-canvas>.empty{position:relative;z-index:25;pointer-events:none}
    /* v0.7 — one responsive renderer shared by dashboards and the Settings editor */
    .flow-scene{position:relative;width:calc(100% - 20px);height:var(--scene-height,620px);min-height:320px;margin:0 10px 10px;overflow:visible;border:var(--scene-frame-width,1px) solid var(--scene-frame,var(--cyan));border-radius:var(--scene-frame-radius,16px);background-color:var(--scene-canvas-bg,#020b16);background-image:linear-gradient(rgba(0,220,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.055) 1px,transparent 1px),radial-gradient(circle at 50% 50%,rgba(0,155,220,.12),transparent 55%);background-size:var(--scene-grid,20px) var(--scene-grid,20px),var(--scene-grid,20px) var(--scene-grid,20px),auto}.flow-scene.no-grid{background-image:radial-gradient(circle at 50% 50%,rgba(0,155,220,.12),transparent 55%)}
    .flow-scene-connections{position:absolute;inset:0;width:100%;height:100%;z-index:4;overflow:visible}.scene-connection path{fill:none;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round}.scene-connection-hit{stroke:transparent;stroke-width:22;pointer-events:stroke}.scene-connection-base{stroke:var(--connection-color);stroke-width:var(--connection-width);opacity:.28;filter:drop-shadow(0 0 5px var(--connection-color))}.scene-connection-flow{stroke:var(--connection-color);stroke-width:calc(var(--connection-width)*.72);stroke-dasharray:3 16;filter:drop-shadow(0 0 7px var(--connection-color));animation:scene-flow-forward var(--connection-speed,1.2s) linear infinite}.scene-connection.state-reverse .scene-connection-flow{animation-name:scene-flow-reverse}.scene-connection.state-idle .scene-connection-flow,.scene-connection.state-unavailable .scene-connection-flow{animation:none;opacity:.15}.scene-connection.state-unavailable .scene-connection-base{stroke-dasharray:5 8;opacity:.55}@keyframes scene-flow-forward{to{stroke-dashoffset:-38}}@keyframes scene-flow-reverse{to{stroke-dashoffset:38}}
    .scene-connection-label{position:absolute;left:var(--label-x);top:var(--label-y);z-index:12;transform:translate(calc(-50% + var(--label-offset-x,0px)),calc(-50% + var(--label-offset-y,0px)));display:flex;align-items:center;gap:5px;min-width:58px;padding:4px 7px;border:1px solid color-mix(in srgb,var(--label-border,#20eaff) 65%,transparent);border-radius:999px;background:color-mix(in srgb,var(--label-bg,#010912) 94%,transparent);box-shadow:0 0 10px rgba(0,0,0,.55);font-size:var(--label-size,9px);font-weight:var(--label-weight,400);color:var(--label-color,#eefaff);pointer-events:none}.scene-connection-label b{font-size:max(6px,calc(var(--label-size,9px) - 2px));font-weight:inherit;color:color-mix(in srgb,var(--label-color,#eefaff) 72%,#557886)}.scene-connection-label span{font-size:var(--label-size,9px);font-family:monospace;font-weight:inherit;color:var(--label-color,#eefaff)}
    .scene-node{--accent:var(--cyan);position:absolute;left:var(--scene-x);top:var(--scene-y);z-index:var(--scene-z,20);width:var(--scene-w,132px);height:var(--scene-h,110px);transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;border:var(--scene-border-width,1px) solid var(--scene-border,var(--accent));border-radius:var(--scene-radius,18px);background:var(--scene-bg,radial-gradient(circle at 25% 10%,color-mix(in srgb,var(--accent) 13%,transparent),rgba(2,12,24,.97)));box-shadow:0 0 22px color-mix(in srgb,var(--accent) 16%,transparent),inset 0 0 20px rgba(0,120,180,.05);color:#eefaff;text-align:center;overflow:visible}.scene-node.home{border-width:var(--scene-border-width,2px);border-radius:var(--scene-radius,50%)}.scene-node>ha-icon,.scene-node>.flow-node-custom-image{width:var(--scene-icon-size,30px);height:var(--scene-icon-size,30px);color:var(--scene-icon,var(--accent));flex:0 0 auto}.scene-node>b{max-width:100%;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--scene-name,#eefaff);font-size:var(--scene-name-size,9px);font-weight:var(--scene-name-weight,700)}.scene-node-value{display:flex;align-items:baseline;gap:4px}.scene-node-value strong{color:var(--scene-value,var(--accent));font-size:var(--scene-value-size,18px);font-family:monospace;font-weight:var(--scene-value-weight,700)}.scene-node-value span{color:var(--scene-unit,#94b5c0);font-size:var(--scene-unit-size,7px);font-weight:var(--scene-unit-weight,400)}.scene-node-status{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--scene-unit,#688d9a);font-size:var(--scene-status-size,7px);font-weight:var(--scene-status-weight,400)}.scene-node.extra{justify-content:center}.scene-node .flow-node-extra-fields{position:relative;width:100%}
    .flow-scene.editing .scene-node.editable{cursor:grab;touch-action:none;user-select:none;outline:1px dashed rgba(255,177,27,.55);outline-offset:3px}.flow-scene.editing .scene-node.editable:active{cursor:grabbing}.flow-scene.editing .scene-node.selected{outline:3px solid var(--orange);outline-offset:5px;box-shadow:0 0 28px rgba(255,177,27,.42)}.scene-resize-handle{position:absolute;right:-8px;bottom:-8px;width:25px;height:25px;display:grid;place-items:center;border:1px solid var(--orange);border-radius:7px;background:#1b1002;color:var(--orange);cursor:nwse-resize;touch-action:none}.scene-resize-handle ha-icon{width:15px;height:15px}.flow-scene.editing .scene-connection{cursor:pointer}.flow-scene.editing .scene-connection-label{pointer-events:auto;cursor:pointer}.flow-scene.editing .scene-connection.selected .scene-connection-base{opacity:.85;filter:drop-shadow(0 0 10px var(--orange))}.flow-scene.editing .scene-connection.selected .scene-connection-hit{stroke:rgba(255,177,27,.08)}.flow-scene.editing .scene-connection-label.selected{border-color:var(--orange);box-shadow:0 0 14px rgba(255,177,27,.35)}
    .settings-page{display:grid;gap:10px}.settings-targets{display:flex;gap:7px;overflow-x:auto;padding:8px;border:1px solid rgba(32,234,255,.25);border-radius:12px;background:rgba(2,15,29,.92)}.settings-targets button{flex:0 0 auto;display:flex;align-items:center;gap:6px;padding:9px 12px;border:1px solid rgba(32,234,255,.18);border-radius:8px;background:rgba(0,65,95,.1);color:#88afbd;font-size:9px}.settings-targets button.active{border-color:var(--cyan);background:rgba(0,180,225,.15);color:white;box-shadow:0 0 13px rgba(32,234,255,.18)}.settings-targets ha-icon{width:18px;height:18px;color:var(--cyan)}
    .settings-scene-toolbar{display:grid;grid-template-columns:repeat(8,minmax(105px,1fr));gap:8px;padding:9px 12px;border:1px solid rgba(32,234,255,.18);border-radius:12px;background:rgba(2,14,27,.92)}.settings-scene-toolbar .field{margin:0}.settings-scene-toolbar .check-row{padding:8px 2px}.settings-scene-toolbar .settings-reset{align-self:center;justify-content:center;min-height:39px}.settings-workspace{display:grid;grid-template-columns:minmax(620px,1fr) minmax(350px,430px);gap:10px;min-height:680px}.settings-live-preview{min-width:0;overflow:visible;padding-bottom:8px}.settings-preview-label{display:flex;justify-content:space-between;align-items:center;padding:8px 13px;border-bottom:1px solid rgba(32,234,255,.14);color:#83aab9;font-size:8px}.settings-preview-label b{color:var(--cyan);font-size:10px}.settings-inspector{min-height:0;max-height:calc(100vh - 235px);overflow:auto;padding:9px 12px 18px;border:1px solid rgba(32,234,255,.3);border-radius:12px;background:rgba(2,13,27,.97)}.settings-inspector>.panel-title{position:sticky;top:-9px;z-index:5;margin:0 -12px 5px;background:#03101e;border-bottom:1px solid rgba(32,234,255,.2)}
    @media(max-width:1250px){.settings-scene-toolbar{grid-template-columns:repeat(4,minmax(110px,1fr))}.settings-workspace{grid-template-columns:minmax(500px,1fr) 360px}}
    @media(max-width:900px){.settings-workspace{grid-template-columns:1fr;min-height:0}.settings-inspector{max-height:none}.settings-scene-toolbar{grid-template-columns:repeat(2,minmax(0,1fr))}.flow-scene{height:min(var(--scene-height,620px),70vh)}}

    /* v8.0.2 unified bubble editor, tile clipboard and emoji controls */
    .widget-editor-card:not(.chart-editor-card)>.widget-editor-grid,.widget-editor-card:not(.chart-editor-card)>.widget-checks{display:none}.widget-card-actions{display:flex;align-items:center;gap:7px}
    .bubble-editor-modal{position:fixed;inset:0;z-index:13000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,4,10,.88);backdrop-filter:blur(9px)}.bubble-editor-dialog{width:min(1500px,98vw);height:min(930px,96vh);display:grid;grid-template-rows:auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(32,234,255,.66);border-radius:20px;background:radial-gradient(circle at 35% 0,rgba(0,190,255,.14),transparent 34%),#020b16;box-shadow:0 0 75px rgba(0,190,255,.24)}.bubble-editor-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;padding:14px 18px;border-bottom:1px solid rgba(32,234,255,.2)}.bubble-editor-head h2{margin:3px 0;font-size:20px}.bubble-editor-head small{color:#7199a8}.bubble-editor-layout{min-height:0;display:grid;grid-template-columns:minmax(260px,340px) minmax(0,1fr)}.bubble-editor-preview{min-width:0;padding:16px;border-right:1px solid rgba(32,234,255,.18);background:rgba(0,35,55,.15)}.bubble-editor-preview>span{display:block;margin-bottom:10px;color:var(--cyan);font-size:9px;font-weight:900;letter-spacing:1px}.bubble-editor-preview>.metrics-grid{display:block;margin:0}.bubble-editor-preview .metric-card{width:100%;min-height:118px;pointer-events:none}.bubble-editor-preview>small{display:block;margin-top:12px;color:#7499a6;line-height:1.5}.bubble-editor-body{min-height:0;overflow:auto;padding:10px 16px 24px}.bubble-editor-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px 10px}.bubble-editor-grid>.full{grid-column:1/-1}.bubble-editor-grid .field,.bubble-editor-grid .check-row{min-width:0}.bubble-editor-checks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.bubble-editor-checks .check-row,.font-editor-grid .check-row{align-self:end;min-height:41px;padding:8px;border:1px solid rgba(32,234,255,.14);border-radius:9px;background:rgba(0,65,95,.08)}.bubble-editor-body>.widget-related-list{margin-top:7px}.bubble-editor-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 18px;border-top:1px solid rgba(32,234,255,.2);background:#03101e}.bubble-editor-footer>span{color:#7199a8;font-size:9px}.bubble-editor-footer>div{display:flex;gap:8px}
    .settings-tile-clipboard{margin:9px 0;padding:10px;border:1px solid rgba(82,255,98,.28);border-radius:10px;background:rgba(82,255,98,.045);display:grid;gap:8px}.settings-tile-clipboard>div:first-child{display:flex;flex-direction:column;gap:3px}.settings-tile-clipboard b{font-size:9px;color:var(--green)}.settings-tile-clipboard small{color:#739a89;font-size:8px;line-height:1.45}.settings-tile-clipboard>div:last-child{display:flex;flex-wrap:wrap;gap:6px}.settings-tile-clipboard button{padding:7px 8px;font-size:8px}
    .flow-node-emoji{display:grid;place-items:center;line-height:1;filter:drop-shadow(0 0 7px var(--flow-custom-icon,var(--scene-icon,var(--cyan))))}.scene-node>.flow-node-emoji{min-width:var(--scene-icon-size,30px);min-height:var(--scene-icon-size,30px);flex:0 0 auto}.flow-node>.flow-node-emoji{width:var(--flow-custom-icon-size,32px);height:var(--flow-custom-icon-size,32px)}.flow-extra-node>.flow-node-emoji{grid-column:1;grid-row:1/4;align-self:center}
    @media(max-width:980px){.bubble-editor-layout{grid-template-columns:1fr}.bubble-editor-preview{display:none}.bubble-editor-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.bubble-editor-checks{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:560px){.bubble-editor-modal{padding:0}.bubble-editor-dialog{width:100%;height:100%;max-height:none;border-radius:0}.bubble-editor-grid,.bubble-editor-checks{grid-template-columns:1fr}.bubble-editor-footer>span{display:none}}

    /* v0.6.6 compatibility styles retained for migrated widgets */
    .flow-panel,.large-flow,.kiosk-flow-card{overflow:visible}.display-tablet_16_9 .kiosk-slides,.display-tablet_16_9 .kiosk-slide{overflow:visible}
    .flow-canvas-v4{overflow:visible}
    .flow-node[data-flow-layout-element],.flow-extra-node[data-flow-layout-element]{border-color:var(--flow-custom-border);border-width:var(--flow-custom-border-width);border-radius:var(--flow-custom-radius);background:var(--flow-custom-bg)}
    .flow-node[data-flow-layout-element]>ha-icon,.flow-extra-node[data-flow-layout-element]>ha-icon{color:var(--flow-custom-icon);width:var(--flow-custom-icon-size);height:var(--flow-custom-icon-size)}
    .flow-node-custom-image{display:block;width:var(--flow-custom-icon-size,32px);height:var(--flow-custom-icon-size,32px);object-fit:contain;filter:drop-shadow(0 0 7px var(--flow-custom-icon,var(--cyan)))}.flow-extra-node>.flow-node-custom-image{grid-column:1;grid-row:1/4;align-self:center}.flow-extra-node>.flow-node-extra-fields{grid-column:1/-1}
    .flow-node[data-flow-layout-element]>b,.flow-extra-node[data-flow-layout-element]>b{color:var(--flow-custom-name)}
    .flow-node[data-flow-layout-element]>strong,.flow-extra-node[data-flow-layout-element] .flow-extra-value>strong{color:var(--flow-custom-value)}
    .flow-node[data-flow-layout-element]>small,.flow-extra-node[data-flow-layout-element]>small,.flow-extra-node[data-flow-layout-element] .flow-extra-value>span{color:var(--flow-custom-unit)}
    .flow-node-extra-fields{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3px;margin-top:5px;padding-top:4px;border-top:1px solid color-mix(in srgb,var(--flow-custom-border,var(--cyan)) 24%,transparent)}
    .flow-node-extra-field{min-width:0;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:baseline;column-gap:3px;color:var(--flow-field-color,#8eb5c3)}
    .flow-node-extra-field small{grid-column:1/-1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:color-mix(in srgb,var(--flow-field-color,#8eb5c3) 72%,#7c99a3);font-size:var(--flow-field-label-size,6px);font-weight:var(--flow-field-label-weight,400)}
    .flow-node-extra-field b{overflow:hidden;text-overflow:ellipsis;color:var(--flow-field-color,#8eb5c3);font-size:var(--flow-field-value-size,9px);font-family:monospace;font-weight:var(--flow-field-value-weight,700)}
    .flow-node-extra-field span{color:var(--flow-field-color,#8eb5c3);font-size:var(--flow-field-unit-size,6px);font-weight:var(--flow-field-unit-weight,400)}
    .flow-link.horizontal:before{height:var(--flow-line-thickness,3px)}.flow-link.horizontal i{height:max(3px,var(--flow-line-thickness,3px))}
    .flow-link.vertical:before{width:var(--flow-line-thickness,3px)}.flow-link.vertical i{width:max(3px,var(--flow-line-thickness,3px))}
    .branch-wire:before{width:var(--flow-line-thickness,2px);background:color-mix(in srgb,var(--branch-color) 55%,transparent)}.branch-wire i{width:max(3px,var(--flow-line-thickness,2px))}
    .branch-bus-line:after{height:var(--flow-line-thickness,2px);background:var(--bus-color,rgba(32,234,255,.42));box-shadow:0 0 8px var(--bus-color,rgba(32,234,255,.35))}.source-bus>.branch-bus-line:after{background:var(--bus-color,rgba(82,255,98,.42));box-shadow:0 0 8px var(--bus-color,rgba(82,255,98,.35))}
    .flow-link span[data-flow-layout-element]{color:var(--flow-label-color,white);background:var(--flow-label-bg,rgba(1,8,16,.93));border-color:var(--flow-label-border,color-mix(in srgb,var(--link) 45%,transparent))}
    [data-flow-action-element]{cursor:pointer}.branch-bus-line[data-flow-action-element]{pointer-events:auto}
    [data-flow-action-element]:focus-visible{outline:2px solid var(--orange);outline-offset:4px}
    .flow-canvas-v4:not(.flow-layout-editing) [data-flow-action-element]:hover{filter:brightness(1.18);box-shadow:0 0 15px color-mix(in srgb,var(--cyan) 30%,transparent)}
    .layout-editor-workspace{min-height:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(330px,390px);gap:0}
    .layout-editor-workspace>.layout-editor-canvas{margin:10px 5px 10px 10px}
    .layout-element-inspector{min-height:0;overflow:auto;margin:10px 10px 10px 5px;padding:10px;border:1px solid rgba(32,234,255,.28);border-radius:14px;background:rgba(2,13,27,.96)}
    .layout-element-inspector>.panel-title{position:sticky;top:-10px;z-index:2;margin:-10px -10px 8px;padding:12px;background:#03101e;border-bottom:1px solid rgba(32,234,255,.2)}
    .layout-extra-fields{display:grid;gap:8px;margin-top:8px}.layout-extra-field{padding:8px;border:1px solid rgba(32,234,255,.18);border-radius:8px;background:rgba(0,45,70,.14)}
    .entity-modal{z-index:14000}
    @media(max-width:1050px){.layout-editor-workspace{grid-template-columns:minmax(0,1fr) 330px}.layout-editor-dialog{width:99vw;height:98vh}.layout-editor-toolbar{align-items:flex-start}}
    @media(max-width:760px){.layout-editor-workspace{grid-template-columns:1fr;grid-template-rows:minmax(380px,1fr) minmax(300px,44vh)}.layout-editor-workspace>.layout-editor-canvas,.layout-element-inspector{margin:6px}.layout-editor-toolbar{display:block}.layout-editor-toolbar>div:last-child{justify-content:flex-start;margin-top:8px}}
    .kiosk-config-guide{display:flex;align-items:center;gap:14px;padding:14px}.kiosk-config-guide>ha-icon{width:38px;height:38px;color:var(--cyan)}.kiosk-config-guide b{color:#eefaff}.kiosk-config-guide p{margin:4px 0 0;color:#79a1af}.kiosk-default-card{padding:8px 14px 14px}.kiosk-default-card>.kiosk-settings{margin-top:0;border-top:0}.kiosk-tabs-preview{display:flex;align-items:center;gap:12px;margin:9px 0;padding:9px 11px;border:1px solid rgba(32,234,255,.18);border-radius:10px;background:rgba(0,45,70,.12)}.kiosk-tabs-preview>b{flex:0 0 auto;color:#7fa8b7;font-size:8px}.kiosk-tabs-preview>div{display:flex;flex-wrap:wrap;gap:6px}.kiosk-tab-chip{display:flex;align-items:center;gap:5px;padding:5px 8px;border:1px solid rgba(32,234,255,.22);border-radius:999px;background:rgba(0,100,140,.1);color:#c4e7ef;font-size:8px}.kiosk-tab-chip ha-icon{width:15px;height:15px;color:var(--cyan)}.kiosk-tab-chip.lovelace{border-color:rgba(82,255,98,.35)}.kiosk-tab-chip.lovelace ha-icon{color:var(--green)}.kiosk-tab-chip.missing{border-color:rgba(255,177,27,.5);color:var(--orange)}.kiosk-tab-chip.missing b{display:grid;place-items:center;width:14px;height:14px;border-radius:50%;background:var(--orange);color:#111}.kiosk-lovelace-list{margin-top:8px}.kiosk-lovelace-editor{padding:10px}.kiosk-lovelace-editor.incomplete{border-color:rgba(255,177,27,.45)}.kiosk-lovelace-editor .widget-related-head>div{display:flex;align-items:center;gap:7px}.kiosk-view-actions{display:flex!important;align-items:center;gap:5px}.kiosk-view-state{padding:3px 6px;border:1px solid rgba(255,177,27,.4);border-radius:999px;color:var(--orange);font-size:7px}.kiosk-view-state.ready{border-color:rgba(82,255,98,.4);color:var(--green)}.kiosk-extra-tabs-heading{margin-top:16px!important;border-color:rgba(82,255,98,.22)!important}.kiosk-lovelace-slide{flex:1;min-height:0;padding:var(--kiosk-view-padding,0);overflow:hidden;border:1px solid color-mix(in srgb,var(--kiosk-view-border,#20eaff) 55%,transparent);border-radius:var(--kiosk-view-radius,12px);background:var(--kiosk-view-bg,#010914)}.kiosk-lovelace-viewport{width:100%;height:100%;min-height:0;overflow:hidden;border-radius:inherit;background:var(--kiosk-view-bg,#010914)}.kiosk-lovelace-slide iframe{display:block;width:var(--kiosk-view-size,100%);height:var(--kiosk-view-size,100%);min-height:0;border:0;background:var(--kiosk-view-bg,#010914);transform:translate(var(--kiosk-view-x,0),var(--kiosk-view-y,0)) scale(var(--kiosk-view-scale,1));transform-origin:top left}
    @media(max-width:1300px){.overview-widget-layout{grid-template-columns:1fr}.widget-editor-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.kiosk-summary-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.widget-checks.four-checks{grid-template-columns:1fr 1fr}}
    @media(max-width:850px){.widget-editor-grid,.widget-related-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.custom-chart-grid{grid-template-columns:1fr}.widget-checks.three-checks{grid-template-columns:1fr 1fr}.overview-widget-layout{display:block}.overview-widget-settings{margin-bottom:10px}.kiosk-header{align-items:flex-start}.kiosk-header-tools{flex-wrap:wrap;justify-content:flex-end}.kiosk-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.kiosk-flow-card .flow-canvas-v4{min-height:500px!important}.kiosk-status{justify-content:flex-start;overflow-x:auto}.kiosk-selection-grid{grid-template-columns:1fr}.kiosk-summary-grid{grid-template-columns:1fr 1fr}}
    .display-tablet_16_9 .kiosk-summary-grid{grid-template-columns:repeat(var(--summary-columns,2),minmax(0,1fr))}.display-tablet_16_9 .kiosk-metrics .metric-card.custom-bubble{padding:var(--bubble-padding,8px);border-radius:var(--bubble-radius,10px)}.display-tablet_16_9 .kiosk-metrics .metric-card.custom-bubble .custom-bubble-copy>div>strong{font-size:var(--bubble-value-size,19px)}
    @media(max-width:560px){.widget-editor-grid,.widget-related-grid,.widget-checks,.widget-checks.three-checks,.kiosk-settings>.widget-checks{grid-template-columns:1fr}.widget-editor-grid>.full,.widget-related-grid>.full{grid-column:auto}.section-heading{align-items:flex-start}.custom-chart-head>strong{font-size:17px}.custom-chart-foot{flex-direction:column}.chart-series-legend{gap:4px 8px}.matrix-shell.kiosk-active>.content{padding:5px}.kiosk-header{flex-direction:column}.kiosk-header-tools{width:100%;justify-content:flex-start}.kiosk-clock{align-items:flex-start;margin-right:auto}.kiosk-metrics,.kiosk-summary-grid{grid-template-columns:1fr}.kiosk-status span:nth-child(n+4){display:none}.kiosk-profile-footer{align-items:flex-start;flex-direction:column}.bubble-secondary{display:none!important}.bubble-related-list{grid-template-columns:1fr}}
    /* v8.0 — kiosk uses the complete viewport; navigation lives in a per-slide editable header. */
    .matrix-shell.kiosk-active>.content{padding:6px!important;overflow:hidden!important}.matrix-shell.kiosk-active .kiosk-view,.matrix-shell.kiosk-active .kiosk-slides,.matrix-shell.kiosk-active .kiosk-slide{width:100%;height:100%;min-height:0;overflow:hidden!important}.matrix-shell.kiosk-active *{scrollbar-width:none}.matrix-shell.kiosk-active *::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}.kiosk-status,.kiosk-slide-nav{display:none!important}.kiosk-slide{gap:0!important}.kiosk-slide-body{display:flex;flex:1;min-height:0;flex-direction:column;gap:6px;overflow:hidden}.kiosk-slide-body>.kiosk-flow-card{display:flex;flex:1;min-height:0;flex-direction:column;overflow:visible}.kiosk-flow-card>.flow-title{flex:0 0 auto}.kiosk-flow-card>.flow-scene{flex:1;height:auto!important;min-height:0!important;margin-bottom:6px}.display-tablet_16_9 .kiosk-slides,.display-tablet_16_9 .kiosk-slide{overflow:hidden!important}
    .kiosk-slide-header{flex:0 0 var(--kiosk-header-height,64px);width:100%;height:var(--kiosk-header-height,64px);min-height:var(--kiosk-header-height,64px);display:grid!important;grid-template-columns:minmax(240px,1fr) auto minmax(240px,1fr);align-items:center;gap:12px;padding:5px 12px;border:1px solid color-mix(in srgb,var(--kiosk-header-border,#20eaff) 55%,transparent);border-radius:12px;background:linear-gradient(90deg,color-mix(in srgb,var(--kiosk-header-bg,#03182d) 96%,#000),color-mix(in srgb,var(--kiosk-header-bg,#03182d) 82%,#010914));box-shadow:inset 0 0 22px color-mix(in srgb,var(--kiosk-header-accent,#20eaff) 8%,transparent)}.kiosk-header-identity{display:flex;align-items:center;gap:9px;min-width:0}.kiosk-header-identity>ha-icon{width:30px;height:30px;color:var(--kiosk-header-accent,#20eaff)}.kiosk-header-identity>div{min-width:0}.kiosk-slide-header .eyebrow{display:block;color:var(--kiosk-header-accent,#20eaff);font-size:var(--kiosk-header-eyebrow-size,8px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.kiosk-slide-header h1{margin:1px 0;color:var(--kiosk-header-title,#eefaff);font-size:var(--kiosk-header-title-size,18px);line-height:1.05;letter-spacing:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.kiosk-slide-header small{display:block;color:var(--kiosk-header-description,#6e98a8);font-size:var(--kiosk-header-description-size,8px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.kiosk-header-navigation{justify-self:center;display:flex;align-items:center;gap:8px;padding:3px 8px;border:1px solid color-mix(in srgb,var(--kiosk-header-accent,#20eaff) 30%,transparent);border-radius:999px;background:rgba(0,8,16,.45)}.kiosk-header-navigation>button{display:grid;place-items:center;border:0;background:transparent;color:var(--kiosk-header-accent,#20eaff);padding:0}.kiosk-header-navigation>button ha-icon{width:19px;height:19px}.kiosk-header-navigation>div{display:flex;align-items:center;gap:5px}.kiosk-header-navigation .kiosk-dot{width:18px;height:4px}.kiosk-header-navigation .kiosk-dot.active{background:var(--kiosk-header-accent,#20eaff);box-shadow:0 0 8px var(--kiosk-header-accent,#20eaff)}.kiosk-slide-header .kiosk-header-tools{justify-self:end;min-width:0}.kiosk-slide-header .kiosk-clock{min-width:92px}.kiosk-slide-header .kiosk-clock b{color:var(--kiosk-header-accent,#20eaff);font-size:var(--kiosk-header-clock-size,17px)}
    .kiosk-slide-header .eyebrow{font-weight:var(--kiosk-header-eyebrow-weight,700)}.kiosk-slide-header h1{font-weight:var(--kiosk-header-title-weight,700)}.kiosk-slide-header small{font-weight:var(--kiosk-header-description-weight,400)}.kiosk-slide-header .kiosk-clock b{font-weight:var(--kiosk-header-clock-weight,700)}.kiosk-header-navigation>div{max-width:min(46vw,680px);overflow-x:auto;scroll-behavior:smooth}.kiosk-tab-button{flex:0 0 auto;max-width:112px;padding:4px 8px!important;border:1px solid rgba(32,234,255,.2)!important;border-radius:999px!important;background:rgba(0,55,80,.18)!important;color:#739ca9!important}.kiosk-tab-button span{display:block;max-width:96px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:7px}.kiosk-tab-button.active{border-color:var(--kiosk-header-accent,#20eaff)!important;background:color-mix(in srgb,var(--kiosk-header-accent,#20eaff) 18%,transparent)!important;color:#eefaff!important;box-shadow:0 0 8px color-mix(in srgb,var(--kiosk-header-accent,#20eaff) 35%,transparent)}
    .kiosk-header-settings{display:grid;gap:8px;margin-top:8px}.kiosk-header-editor-list{display:grid;gap:8px}.kiosk-header-editor{overflow:hidden}.kiosk-header-editor>summary{display:grid;grid-template-columns:24px auto minmax(0,1fr) 22px;align-items:center;gap:8px;padding:11px 14px;cursor:pointer;list-style:none}.kiosk-header-editor>summary::-webkit-details-marker{display:none}.kiosk-header-editor>summary>ha-icon:first-child{color:var(--cyan)}.kiosk-header-editor>summary>b{font-size:10px}.kiosk-header-editor>summary>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#789daa;font-size:9px}.kiosk-header-editor[open]>summary>ha-icon:last-child{transform:rotate(180deg)}.kiosk-header-editor-body{padding:0 12px 14px;border-top:1px solid rgba(32,234,255,.14)}.kiosk-path-help{display:block;margin-top:7px;color:#6f98a7;font-size:8px;line-height:1.4}
    @media(max-width:900px){.kiosk-slide-header{grid-template-columns:minmax(150px,1fr) auto minmax(190px,1fr);gap:6px;padding:4px 7px}.kiosk-slide-header .secondary-btn{padding:5px 7px;font-size:7px}.kiosk-slide-header .kiosk-clock{min-width:72px}.kiosk-header-navigation{padding:2px 5px;gap:4px}.kiosk-header-navigation .kiosk-dot{width:13px}.kiosk-slide-header h1{letter-spacing:.4px}}

    /* v8.1 — authenticated Matrix Notification Center bridge for kiosk screens. */
    .kiosk-notification-layer{position:fixed;inset:0;z-index:12500;pointer-events:none;font-family:Arial,sans-serif}.kiosk-notification-bell{position:absolute;top:12px;right:12px;z-index:4;width:42px;height:42px;border:1px solid rgba(32,234,255,.5);border-radius:50%;background:rgba(2,12,24,.94);color:var(--cyan);display:grid;place-items:center;pointer-events:auto}.kiosk-notification-bell ha-icon{width:22px;height:22px}.kiosk-notification-bell.has-items{border-color:var(--orange);color:var(--orange)}.kiosk-notification-bell>b{position:absolute;right:-3px;top:-4px;min-width:18px;height:18px;padding:0 4px;border-radius:999px;background:#ff315c;color:white;font:10px/18px monospace;text-align:center}
    .kiosk-notification-drawer{position:absolute;z-index:5;top:8px;right:8px;width:min(390px,calc(100vw - 16px));max-height:calc(100vh - 16px);overflow:hidden;border:1px solid rgba(32,234,255,.55);border-radius:16px;background:rgba(2,11,22,.98);box-shadow:0 18px 70px rgba(0,0,0,.68);pointer-events:auto}.kiosk-notification-drawer>header{display:flex;justify-content:space-between;align-items:center;padding:14px 15px;border-bottom:1px solid rgba(32,234,255,.18)}.kiosk-notification-drawer>header small,.kiosk-notification-drawer>header b{display:block}.kiosk-notification-drawer>header small{color:var(--cyan);font-size:7px;letter-spacing:1.5px}.kiosk-notification-drawer>header b{margin-top:3px;font-size:13px;letter-spacing:1px}.kiosk-notification-drawer>header button{display:grid;place-items:center;border:0;background:transparent;color:#8db3c1}.kiosk-notification-drawer>div{max-height:calc(100vh - 78px);overflow:auto;padding:7px}.kiosk-notification-row{--nc:#20eaff;width:100%;display:grid;grid-template-columns:30px minmax(0,1fr) 8px;align-items:center;gap:9px;margin:4px 0;padding:10px;border:1px solid color-mix(in srgb,var(--nc) 25%,transparent);border-radius:11px;background:color-mix(in srgb,var(--nc) 5%,#06101c);color:white;text-align:left}.kiosk-notification-row>ha-icon{color:var(--nc)}.kiosk-notification-row>span{min-width:0}.kiosk-notification-row b,.kiosk-notification-row small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.kiosk-notification-row b{font-size:10px}.kiosk-notification-row small{margin-top:3px;color:#789da9;font-size:7px}.kiosk-notification-row>i{width:7px;height:7px;border-radius:50%;background:var(--nc);box-shadow:0 0 8px var(--nc)}.kiosk-notification-empty{min-height:180px;display:grid;place-items:center;align-content:center;gap:8px;color:#668b98}.kiosk-notification-empty ha-icon{width:44px;height:44px}
    .kiosk-notification-overlay{--nc:#20eaff;position:absolute;inset:0;display:flex;align-items:flex-start;justify-content:center;padding:14px 64px 14px 14px;pointer-events:none}.kiosk-notification-overlay>article{position:relative;width:min(820px,100%);display:grid;grid-template-columns:46px minmax(0,1fr) auto;gap:13px;align-items:center;padding:13px 16px;border:1px solid var(--nc);border-radius:15px;background:color-mix(in srgb,var(--nc) 9%,rgba(2,10,20,.98));box-shadow:0 12px 45px rgba(0,0,0,.55),0 0 24px color-mix(in srgb,var(--nc) 18%,transparent);pointer-events:auto}.kiosk-notification-symbol{display:grid;place-items:center;width:44px;height:44px;border:1px solid color-mix(in srgb,var(--nc) 45%,transparent);border-radius:50%;color:var(--nc);background:color-mix(in srgb,var(--nc) 8%,transparent)}.kiosk-notification-symbol ha-icon{width:26px;height:26px}.kiosk-notification-copy{min-width:0}.kiosk-notification-copy>small{color:var(--nc);font-size:7px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase}.kiosk-notification-copy h2{margin:3px 0;color:#fff;font-size:16px;line-height:1.2}.kiosk-notification-copy p{margin:3px 0 0;max-height:9em;overflow:auto;color:#b7d0d8;font-size:10px;line-height:1.45;white-space:pre-line}.kiosk-notification-copy em{display:block;margin-top:6px;color:#ff8298;font-size:8px}.kiosk-notification-actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px}.kiosk-notification-actions button{min-height:34px;padding:7px 10px;border:1px solid color-mix(in srgb,var(--nc) 42%,transparent);border-radius:8px;background:color-mix(in srgb,var(--nc) 8%,#07111e);color:#dffaff;font-size:8px;font-weight:900}.kiosk-notification-actions button.primary{background:var(--nc);color:#03101b}.kiosk-notification-x{position:absolute;right:-8px;top:-8px;width:25px;height:25px;display:grid;place-items:center;border:1px solid color-mix(in srgb,var(--nc) 45%,transparent);border-radius:50%;background:#06111f;color:var(--nc)}.kiosk-notification-x ha-icon{width:15px;height:15px}
    .kiosk-notification-overlay.mode-card{align-items:center;padding:24px}.kiosk-notification-overlay.mode-card>article{width:min(620px,94vw);grid-template-columns:58px minmax(0,1fr);padding:24px}.kiosk-notification-overlay.mode-card .kiosk-notification-symbol{width:56px;height:56px}.kiosk-notification-overlay.mode-card .kiosk-notification-actions{grid-column:1/-1}.kiosk-notification-overlay.mode-fullscreen{align-items:center;padding:28px;background:rgba(0,2,8,.88);backdrop-filter:blur(7px);pointer-events:auto}.kiosk-notification-overlay.mode-fullscreen>article{width:min(760px,94vw);min-height:min(420px,78vh);grid-template-columns:76px minmax(0,1fr);align-content:center;padding:38px;border-width:2px}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-symbol{width:72px;height:72px}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-symbol ha-icon{width:44px;height:44px}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-copy h2{font-size:27px}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-copy p{font-size:13px}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-actions{grid-column:1/-1;margin-top:18px;justify-content:center}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-actions button{min-height:46px;padding:10px 18px;font-size:10px}
    .level-informacja{--nc:#20eaff}.level-zadanie{--nc:#35ff9a}.level-ostrzezenie{--nc:#ff9f1c}.level-krytyczne{--nc:#ff315c}.kiosk-notification-overlay.level-krytyczne{background:rgba(16,0,7,.9);pointer-events:auto}.kiosk-notification-overlay.level-krytyczne>article{animation:kiosk-critical-pulse 1.8s ease-in-out infinite}@keyframes kiosk-critical-pulse{50%{box-shadow:0 0 55px color-mix(in srgb,var(--nc) 42%,transparent)}}
    .performance-mode .kiosk-notification-overlay>article,.performance-mode .kiosk-notification-drawer{box-shadow:none}.performance-mode .kiosk-notification-overlay.level-krytyczne>article{animation:none}.performance-mode .kiosk-notification-overlay.mode-fullscreen{backdrop-filter:none}
    @media(max-width:700px){.kiosk-notification-overlay{padding:8px 54px 8px 8px}.kiosk-notification-overlay>article{grid-template-columns:36px minmax(0,1fr);padding:10px}.kiosk-notification-symbol{width:34px;height:34px}.kiosk-notification-symbol ha-icon{width:20px;height:20px}.kiosk-notification-actions{grid-column:1/-1}.kiosk-notification-copy h2{font-size:13px}.kiosk-notification-overlay.mode-fullscreen{padding:12px}.kiosk-notification-overlay.mode-fullscreen>article{padding:22px;grid-template-columns:54px minmax(0,1fr)}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-symbol{width:52px;height:52px}.kiosk-notification-overlay.mode-fullscreen .kiosk-notification-copy h2{font-size:21px}}

    :host(.kiosk-host){position:fixed;inset:0;z-index:20000;width:100vw;height:100vh;height:100dvh;background:#01060d}.kiosk-slide-header .kiosk-header-tools{padding-right:50px}.kiosk-notification-actions button:disabled,.kiosk-notification-x:disabled{opacity:.55;cursor:wait}

    /* v8.0.6 — kiosk-only tablet performance profile. */
    .matrix-shell.performance-mode{background:#01060d}.matrix-shell.performance-mode:before{display:none}
    .performance-mode .panel,.performance-mode .metric-card,.performance-mode .scene-node,.performance-mode .scene-connection-label,.performance-mode .kiosk-slide-header,.performance-mode .kiosk-header-navigation,.performance-mode .kiosk-tab-button.active,.performance-mode .gauge,.performance-mode .consumer i{box-shadow:none!important}
    .performance-mode .spark,.performance-mode .scene-connection-base,.performance-mode .scene-connection-flow,.performance-mode .flow-node-emoji,.performance-mode .flow-node-custom-image{filter:none!important}
    .performance-mode .scene-connection-flow{animation-duration:calc(var(--connection-speed,1.2s)*1.6);animation-timing-function:steps(30,end);stroke-dasharray:3 20}
    .performance-mode .kiosk-slide{will-change:auto;transition:none}.performance-mode .kiosk-metrics .metric-card>svg{display:none}
    .performance-mode .scene-node,.performance-mode .kiosk-flow-card .flow-scene,.performance-mode .kiosk-slide-header{transition:none!important}
    .performance-setting{border:1px solid rgba(82,255,98,.26);border-radius:10px;padding:10px;background:rgba(82,255,98,.045)}.performance-setting b{color:var(--green)}
  `; }
}

customElements.define("matrix-energy-center-panel", MatrixEnergyCenterPanel);
