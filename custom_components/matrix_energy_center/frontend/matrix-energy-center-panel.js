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
    this._kioskLayoutEdit = false;
    this._kioskPointerState = null;
    this._autoFullscreenArmed = false;
    this._dragState = null;
    this._rendered = false;
    this._picker = null;
    this._pickerQuery = "";
    this._pickerShowAll = false;
    this._entityRegistry = {};
    this._deviceRegistry = {};
    this._areaRegistry = {};
  }

  set hass(value) {
    this._hass = value;
    if (!this._rendered) {
      this._bootstrap();
      return;
    }
    this._sampleHistory();
    this._updateLive();
    this._loadRecorderHistories();
  }

  get hass() { return this._hass; }
  set panel(value) { this._panel = value; }
  set narrow(value) { this._narrow = value; }
  set route(value) { this._route = value; }

  connectedCallback() { this._bootstrap(); }

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

  _renderLoading() {
    this.shadowRoot.innerHTML = `<style>${this._styles()}</style><div class="boot"><div class="boot-ring"></div><b>ENERGY CENTER MATRIX</b><span>Ładowanie konfiguracji…</span></div>`;
  }

  _renderError(err) {
    const text = this._esc(err?.message || String(err));
    this.shadowRoot.innerHTML = `<style>${this._styles()}</style><div class="boot error"><b>Błąd uruchamiania panelu</b><span>${text}</span></div>`;
  }

  _render() {
    if (!this._config) return;
    this.shadowRoot.innerHTML = `
      <style>${this._styles()}</style>
      <div class="matrix-shell ${this._view === "kiosk" ? "kiosk-active" : ""} ${this._config.appearance?.show_grid_background === false ? "no-grid" : ""} ${this._config.appearance?.enable_animations === false ? "no-animations" : ""} ${this._config.appearance?.compact_header ? "compact-header" : ""} ${this._config.appearance?.show_status_bar === false ? "no-statusbar" : ""}">
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
      </div>
      ${this._renderEntityPicker()}
    `;
    this._bindCommonEvents();
    this._bindViewEvents();
    this._updateClock();
    this._updateLive();
    this._loadRecorderHistories();
    this._startKioskRotation();
    clearInterval(this._clockTimer);
    this._clockTimer = setInterval(() => this._updateClock(), 1000);
  }

  _navButtons() {
    const f = this._config.features || {};
    const items = [
      ["overview", "mdi:home-lightning-bolt-outline", "PODSUMOWANIE", true],
      ["widgets", "mdi:view-dashboard-edit-outline", "WIDŻETY", true],
      ["kiosk", "mdi:monitor-dashboard", "KIOSK", true],
      ["flows", "mdi:transit-connection-variant", "PRZEPŁYWY", f.grid || f.pv || f.battery || f.ev],
      ["pv", "mdi:solar-power-variant", "PV", f.pv],
      ["tariff", "mdi:calendar-clock", "CENY / G13", f.prices],
      ["devices", "mdi:power-plug-outline", "URZĄDZENIA", f.appliances],
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
      ["kiosk", "mdi:monitor-dashboard", "TRYB KIOSK", true],
      ["flows", "mdi:swap-horizontal", "PRZEPŁYWY", f.grid || f.pv || f.battery || f.ev],
      ["pv", "mdi:white-balance-sunny", "FOTOWOLTAIKA", f.pv],
      ["tariff", "mdi:calendar-clock", "TAURON G13", f.prices],
      ["devices", "mdi:power-socket-eu", "ODBIORNIKI", f.appliances],
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
      case "kiosk": return this._renderKiosk();
      case "pv": return this._renderPv();
      case "tariff": return this._renderTariff();
      case "devices": return this._renderDevices();
      case "configuration": return this._renderConfiguration();
      case "diagnostics": return this._renderDiagnostics();
      default: return this._renderOverview();
    }
  }

  _renderOverview() {
    const name = this._esc(this._config.general.installation_name || "Energy Center");
    const overview = this._config.overview || {};
    const showEmpty = Boolean(this._config.appearance?.show_unconfigured_cards);
    const builtinCards = overview.show_builtin_bubbles === false ? "" : [
      this._metric("home", "mdi:home-lightning-bolt", "DOM", "cyan"),
      this._showModule("pv") ? this._metric("pv", "mdi:solar-power", "PRODUKCJA PV", "green") : "",
      this._showModule("battery") ? this._metric("batterySoc", "mdi:battery-high", "MAGAZYN", "lime", "%") : "",
      this._showModule("ev") ? this._metric("ev", "mdi:car-electric", "ŁADOWANIE EV", "cyan") : "",
      this._showModule("grid") ? this._metric("grid", "mdi:transmission-tower", "SIEĆ", "purple") : "",
      this._showModule("prices") ? this._metric("price", "mdi:tag-outline", "CENA ZAKUPU", "orange", this._config.general.currency + "/kWh") : "",
    ].filter(Boolean).join("");
    const customBubbles = overview.show_custom_bubbles === false ? "" : (this._config.overview_bubbles || [])
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.enabled !== false)
      .sort((a, b) => Number(a.item.order || 0) - Number(b.item.order || 0))
      .map(({ item, index }) => this._overviewBubble(item, index))
      .join("");
    const metricCards = `${builtinCards}${customBubbles}`;

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
      ${metricCards ? `<section class="metrics-grid dynamic bubble-size-${this._escAttr(overview.bubble_size || "medium")}">${metricCards}</section>` : ""}
      <section class="dashboard-grid ${sidePanels ? "with-side" : "flow-only"}">
        <article class="panel flow-panel">${this._flowDiagram()}</article>
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
    const kioskProfiles = this._config.kiosk_profiles || [];
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
      <div class="panel-title"><span><ha-icon class="drag-handle" icon="mdi:drag-vertical"></ha-icon> DYMEK ${index + 1} · ${this._esc(item.name || "BEZ NAZWY")}</span><button class="danger-link" data-action="remove-overview-bubble" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div>
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
    const kioskProfileCards = kioskProfiles.map((profile, index) => this._renderKioskSettings(profile, `kiosk_profiles.${index}`, profile.name || `Kiosk ${index + 1}`, index, disabled)).join("");

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
          <div class="widget-add-actions">
            <button class="primary-btn" data-action="add-overview-bubble" ${disabled}><ha-icon icon="mdi:plus-circle-outline"></ha-icon>DODAJ DYMEK</button>
            <button class="secondary-btn" data-action="add-overview-chart" ${disabled}><ha-icon icon="mdi:chart-line-variant"></ha-icon>DODAJ WYKRES</button>
            <button class="secondary-btn" data-action="refresh-recorder"><ha-icon icon="mdi:history"></ha-icon>ODŚWIEŻ HISTORIĘ</button>
          </div>
          ${this._renderKioskSettings(this._config.kiosk || {}, "kiosk", "DOMYŚLNA KARTA KIOSK", -1, disabled)}
        </article>
        <article class="panel overview-widget-preview">
          <div class="panel-title"><span>PODGLĄD WŁASNYCH ELEMENTÓW</span><small>WARTOŚCI NA ŻYWO</small></div>
          ${bubblePreview ? `<div class="metrics-grid dynamic bubble-size-${this._escAttr(overview.bubble_size || "medium")}">${bubblePreview}</div>` : this._emptyState("mdi:message-plus-outline", "Brak własnych dymków", "Dodaj pierwszy dymek i przypisz encję.")}
          ${chartPreview ? `<div class="custom-chart-grid preview-grid" style="--chart-columns:${Math.max(1, Math.min(4, Number(overview.chart_columns || 2)))}">${chartPreview}</div>` : ""}
        </article>
      </section>
      <section class="widget-editor-list"><div class="section-heading"><div><span class="eyebrow">DYMKI · PRZECIĄGNIJ, ABY ZMIENIĆ KOLEJNOŚĆ</span><h2>Encje widoczne nad diagramem</h2></div><button class="secondary-btn" data-action="add-overview-bubble" ${disabled}><ha-icon icon="mdi:plus"></ha-icon>DODAJ</button></div>${bubbleCards || this._emptyState("mdi:message-text-fast-outline", "Nie skonfigurowano dymków", "Dodaj encję, którą chcesz widzieć na przeglądzie.")}</section>
      <section class="widget-editor-list"><div class="section-heading"><div><span class="eyebrow">WYKRESY · PRZECIĄGNIJ, ABY ZMIENIĆ KOLEJNOŚĆ</span><h2>Historia wybranych encji</h2></div><button class="secondary-btn" data-action="add-overview-chart" ${disabled}><ha-icon icon="mdi:plus"></ha-icon>DODAJ</button></div>${chartCards || this._emptyState("mdi:chart-box-plus-outline", "Nie skonfigurowano wykresów", "Dodaj wykres liniowy, obszarowy lub słupkowy.")}</section>
      <section class="widget-editor-list"><div class="section-heading"><div><span class="eyebrow">PROFILE EKRANÓW</span><h2>Kioski dla pomieszczeń i urządzeń</h2></div><button class="secondary-btn" data-action="add-kiosk-profile" ${disabled}><ha-icon icon="mdi:monitor-multiple"></ha-icon>DODAJ PROFIL</button></div>${kioskProfileCards || this._emptyState("mdi:monitor-dashboard", "Brak dodatkowych profili", "Domyślna karta działa pod ?kiosk=1. Dodaj profil np. dla salonu albo kotłowni.")}</section>`;
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
    const lovelaceCards = lovelaceViews.map((item, index) => `<article class="widget-related-card kiosk-lovelace-editor"><div class="widget-related-head"><b>WIDOK LOVELACE ${index + 1}</b><button class="danger-link" data-action="remove-kiosk-lovelace-view" data-profile-index="${profileIndex}" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div><div class="three-grid">${this._field(`${path}.lovelace_views.${index}.name`, "Nazwa slajdu", item.name, "Np. Oświetlenie", disabled)}${this._field(`${path}.lovelace_views.${index}.path`, "Lokalna ścieżka Lovelace", item.path, "/dashboard-jsbd/deye-kiosk", disabled)}<label class="check-row"><input type="checkbox" data-path="${path}.lovelace_views.${index}.enabled" data-live-rerender="1" ${item.enabled !== false ? "checked" : ""} ${disabled}><span><b>Widok aktywny</b><small>Pokaż jako slajd kiosku.</small></span></label></div></article>`).join("");
    const bubbleChoices = (this._config.overview_bubbles || []).map(item => `<label class="selection-chip"><input type="checkbox" data-action="toggle-kiosk-selection" data-profile-index="${profileIndex}" data-kind="bubble" data-item-id="${this._escAttr(item.id)}" ${bubbleIds.has(item.id) ? "checked" : ""} ${disabled}><ha-icon icon="${this._escAttr(item.icon || "mdi:information-outline")}"></ha-icon><span>${this._esc(item.name)}</span></label>`).join("");
    const chartChoices = (this._config.overview_charts || []).map(item => `<label class="selection-chip"><input type="checkbox" data-action="toggle-kiosk-selection" data-profile-index="${profileIndex}" data-kind="chart" data-item-id="${this._escAttr(item.id)}" ${chartIds.has(item.id) ? "checked" : ""} ${disabled}><ha-icon icon="${this._escAttr(item.icon || "mdi:chart-line")}"></ha-icon><span>${this._esc(item.name)}</span></label>`).join("");
    return `<div class="kiosk-settings ${isDefault ? "default-kiosk-settings" : "panel kiosk-profile-card"}">
      <div class="panel-title"><span>${this._esc(heading)}</span><div class="kiosk-profile-head-actions">${isDefault ? `<ha-icon icon="mdi:monitor-dashboard"></ha-icon>` : `<button class="danger-link" data-action="remove-kiosk-profile" data-index="${profileIndex}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button>`}</div></div>
      ${isDefault ? "" : `<div class="three-grid">${this._field(`${path}.id`, "Identyfikator URL", profile.id, "salon", disabled)}${this._field(`${path}.name`, "Nazwa profilu", profile.name, "Ekran w salonie", disabled)}${this._field(`${path}.description`, "Opis", profile.description, "Tablet 10 cali", disabled)}</div>`}
      <div class="three-grid">${this._field(`${path}.title`, "Tytuł karty", profile.title || "PRZEPŁYW ENERGII", "PRZEPŁYW ENERGII", disabled)}${this._selectField(`${path}.display_preset`, "Format ekranu", profile.display_preset || "tablet_16_9", [["tablet_16_9","Samsung Galaxy Tab A9 · poziomo 16:9"],["auto","Automatyczny"],["desktop","Duży ekran / desktop"]], disabled, true)}${this._selectField(`${path}.flow_height`, "Wysokość diagramu", profile.flow_height || "tall", [["standard","Standardowa"],["tall","Wysoka"],["full","Pełna wysokość"]], disabled, true)}</div>
      <div class="three-grid">${this._numberField(`${path}.max_bubbles`, "Maksymalna liczba dymków", profile.max_bubbles || 6, 1, 16, 1, disabled, true)}${this._numberField(`${path}.chart_columns`, "Kolumny wykresów", profile.chart_columns || 2, 1, 4, 1, disabled, true)}${this._numberField(`${path}.rotation_seconds`, "Zmiana slajdu co (s)", profile.rotation_seconds || 20, 5, 3600, 1, disabled)}</div>
      <div class="four-grid">${this._selectField(`${path}.bubble_layout`, "Układ dymków", profile.bubble_layout || "free", [["free","Swobodny · przeciąganie"],["grid","Automatyczna siatka"]], disabled, true)}${this._numberField(`${path}.bubble_stage_height`, "Wysokość obszaru dymków (px)", profile.bubble_stage_height || 96, 76, 400, 1, disabled, true)}${this._numberField(`${path}.flow_offset_y`, "Diagram góra/dół (px)", profile.flow_offset_y ?? -30, -400, 400, 1, disabled, true)}${this._numberField(`${path}.flow_scale`, "Skala diagramu (%)", profile.flow_scale || 100, 60, 140, 1, disabled, true)}</div>
      <div class="two-grid">${this._numberField(`${path}.flow_offset_x`, "Diagram lewo/prawo (px)", profile.flow_offset_x || 0, -400, 400, 1, disabled, true)}<div class="field"><span>Pozycje zapisane w profilu</span><button class="secondary-btn reset-layout-btn" data-action="reset-kiosk-layout" data-profile-index="${profileIndex}" ${disabled}><ha-icon icon="mdi:restore"></ha-icon>RESETUJ POŁOŻENIE</button></div></div>
      <div class="widget-checks three-checks">
        <label class="check-row"><input type="checkbox" data-path="${path}.compact_header" data-live-rerender="1" ${profile.compact_header !== false ? "checked" : ""} ${disabled}><span><b>Kompaktowy nagłówek</b><small>Więcej miejsca na diagram na tablecie.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.auto_fullscreen" data-live-rerender="1" ${profile.auto_fullscreen !== false ? "checked" : ""} ${disabled}><span><b>Automatyczny pełny ekran</b><small>Fullscreen przy pierwszym dotknięciu; Fully Kiosk może uruchomić go od razu.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_clock" data-live-rerender="1" ${profile.show_clock !== false ? "checked" : ""} ${disabled}><span><b>Zegar</b><small>Data i czas.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_builtin_bubbles" data-live-rerender="1" ${profile.show_builtin_bubbles !== false ? "checked" : ""} ${disabled}><span><b>Standardowe dymki</b><small>Dom, PV, sieć, magazyn i EV.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_custom_bubbles" data-live-rerender="1" ${profile.show_custom_bubbles !== false ? "checked" : ""} ${disabled}><span><b>Własne dymki</b><small>Wybrane poniżej.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_charts" data-live-rerender="1" ${profile.show_charts !== false ? "checked" : ""} ${disabled}><span><b>Wykresy</b><small>Osobny slajd wykresów.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.show_status" data-live-rerender="1" ${profile.show_status !== false ? "checked" : ""} ${disabled}><span><b>Pasek statusu</b><small>Stan integracji i gałęzi.</small></span></label>
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
      <div class="widget-subsection"><b>AUTOMATYCZNA ROTACJA</b><small>Przełączanie między przepływem, wykresami i podsumowaniem.</small></div>
      <div class="widget-checks three-checks">
        <label class="check-row"><input type="checkbox" data-path="${path}.rotation_enabled" data-live-rerender="1" ${profile.rotation_enabled ? "checked" : ""} ${disabled}><span><b>Automatyczna rotacja</b><small>Interwał ustawiony powyżej.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.rotate_flow" data-live-rerender="1" ${profile.rotate_flow !== false ? "checked" : ""} ${disabled}><span><b>Slajd przepływu</b><small>Duży diagram.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.rotate_charts" data-live-rerender="1" ${profile.rotate_charts !== false ? "checked" : ""} ${disabled}><span><b>Slajd wykresów</b><small>Wybrane wykresy.</small></span></label>
        <label class="check-row"><input type="checkbox" data-path="${path}.rotate_overview" data-live-rerender="1" ${profile.rotate_overview !== false ? "checked" : ""} ${disabled}><span><b>Slajd podsumowania</b><small>Dymki, ceny i odbiorniki.</small></span></label>
      </div>
      <div class="widget-subsection"><b>TRYB NOCNY</b><small>Automatyczne przyciemnienie ekranu w zadanych godzinach.</small></div>
      <div class="four-grid">
        <label class="check-row"><input type="checkbox" data-path="${path}.night_enabled" data-live-rerender="1" ${profile.night_enabled ? "checked" : ""} ${disabled}><span><b>Wygaszanie nocne</b><small>Aktywuj harmonogram.</small></span></label>
        ${this._field(`${path}.night_start`, "Początek", profile.night_start || "22:00", "22:00", disabled)}
        ${this._field(`${path}.night_end`, "Koniec", profile.night_end || "06:00", "06:00", disabled)}
        ${this._numberField(`${path}.night_brightness`, "Jasność nocna (%)", profile.night_brightness || 30, 5, 100, 1, disabled)}
      </div>
      <div class="widget-subsection"><b>DODATKOWE WIDOKI LOVELACE</b><small>Lokalne widoki Home Assistant są wyświetlane jako osobne slajdy kiosku i uczestniczą w automatycznej rotacji.</small></div>
      <div class="widget-related-list kiosk-lovelace-list">${lovelaceCards || `<div class="mini-empty">Brak dodatkowych widoków Lovelace.</div>`}<button class="secondary-btn add-related-btn" data-action="add-kiosk-lovelace-view" data-profile-index="${profileIndex}" ${lovelaceViews.length >= 12 ? "disabled" : disabled}><ha-icon icon="mdi:view-dashboard-plus-outline"></ha-icon>DODAJ WIDOK LOVELACE (${lovelaceViews.length}/12)</button></div>
      <div class="kiosk-profile-footer"><code>/matrix-energy-center?kiosk=${this._esc(profileId)}</code><button class="secondary-btn" data-action="open-kiosk-profile" data-profile-id="${this._escAttr(profileId)}"><ha-icon icon="mdi:monitor-eye"></ha-icon>OTWÓRZ PROFIL</button></div>
    </div>`;
  }

  _renderKiosk() {
    const kiosk = this._activeKioskProfile();
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
    const charts = kiosk.show_charts === false ? "" : chartItems
      .filter(item => item.enabled !== false)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      .map(item => this._overviewChart(item, (this._config.overview_charts || []).indexOf(item)))
      .join("");
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
    const strings = (this._config.pv_strings || []).filter(item => item.enabled !== false && item.show_in_flow !== false).length;
    const devices = (this._config.devices || []).filter(item => item.enabled !== false && item.show_in_flow === true).length;
    const slides = [];
    if (kiosk.rotate_flow !== false) slides.push({ id: "flow", label: "PRZEPŁYW", html: `${metrics ? `<div class="metrics-grid dynamic kiosk-metrics kiosk-bubble-stage layout-${bubbleLayout} bubble-size-${this._escAttr(overview.bubble_size || "medium")}" style="--kiosk-bubble-stage-height:${bubbleStageHeight}px">${metrics}</div>` : ""}<article class="panel kiosk-flow-card">${this._flowDiagram(true)}<span class="layout-drag-handle flow-layout-handle" data-layout-drag="flow"><ha-icon icon="mdi:cursor-move"></ha-icon>PRZESUŃ DIAGRAM</span></article>` });
    if (kiosk.rotate_charts !== false && charts) slides.push({ id: "charts", label: "WYKRESY", html: `<div class="custom-chart-grid kiosk-chart-grid" style="--chart-columns:${chartColumns}">${charts}</div>` });
    (kiosk.lovelace_views || []).filter(item => item.enabled !== false && String(item.path || "").startsWith("/") && !String(item.path).includes("://")).forEach((item, index) => {
      slides.push({ id: `lovelace_${item.id || index}`, label: item.name || `LOVELACE ${index + 1}`, html: `<article class="panel kiosk-lovelace-slide"><iframe src="${this._escAttr(item.path)}" title="${this._escAttr(item.name || `Lovelace ${index + 1}`)}" loading="eager" allow="fullscreen"></iframe></article>` });
    });
    if (kiosk.rotate_overview !== false) slides.push({ id: "overview", label: "PODSUMOWANIE", html: `${metrics ? `<div class="metrics-grid dynamic kiosk-metrics kiosk-bubble-stage layout-${bubbleLayout} bubble-size-${this._escAttr(overview.bubble_size || "medium")}" style="--kiosk-bubble-stage-height:${bubbleStageHeight}px">${metrics}</div>` : ""}${summaryPanels.length ? `<div class="kiosk-summary-grid" style="--summary-columns:${summaryPanels.length}">${summaryPanels.join("")}</div>` : this._emptyState("mdi:view-dashboard-outline", "Brak paneli podsumowania", "Włącz wybrane panele w konfiguracji profilu kiosk.")}` });
    if (!slides.length) slides.push({ id: "flow", label: "PRZEPŁYW", html: `<article class="panel kiosk-flow-card">${this._flowDiagram(true)}</article>` });
    this._kioskSlide = Math.min(this._kioskSlide, slides.length - 1);
    const slideHtml = slides.map((slide, index) => `<section class="kiosk-slide ${index === this._kioskSlide ? "active" : ""}" data-kiosk-slide="${index}" data-slide-id="${slide.id}">${slide.html}</section>`).join("");
    const navigation = slides.length > 1 ? `<div class="kiosk-slide-nav"><button data-action="kiosk-prev"><ha-icon icon="mdi:chevron-left"></ha-icon></button><div>${slides.map((slide, index) => `<button class="kiosk-dot ${index === this._kioskSlide ? "active" : ""}" data-action="kiosk-slide" data-slide-index="${index}" title="${slide.label}"></button>`).join("")}</div><button data-action="kiosk-next"><ha-icon icon="mdi:chevron-right"></ha-icon></button></div>` : "";
    const flowOffsetX = Math.max(-400, Math.min(400, Number(kiosk.flow_offset_x || 0)));
    const flowOffsetY = Math.max(-400, Math.min(400, Number(kiosk.flow_offset_y ?? -30)));
    const flowScale = Math.max(60, Math.min(140, Number(kiosk.flow_scale || 100))) / 100;
    return `<section class="kiosk-view display-${this._escAttr(displayPreset)} flow-height-${this._escAttr(kiosk.flow_height || "tall")} ${kiosk.compact_header === false ? "" : "compact-kiosk-header"} ${this._kioskLayoutEdit ? "layout-editing" : ""}" style="--kiosk-bubble-columns:${Math.min(6, maxBubbles)};--kiosk-chart-columns:${chartColumns};--flow-offset-x:${flowOffsetX}px;--flow-offset-y:${flowOffsetY}px;--flow-scale:${flowScale}">
      <header class="kiosk-header">
        <div><span class="eyebrow">MATRIX ENERGY CENTER${kiosk.name ? ` · ${this._esc(kiosk.name)}` : ""}</span><h1>${this._esc(kiosk.title || "PRZEPŁYW ENERGII")}</h1><small>${this._esc(this._config.general.installation_name || "Energy Center")}</small></div>
        <div class="kiosk-header-tools">${kiosk.show_clock === false ? "" : `<div class="kiosk-clock"><b data-kiosk-clock>--:--:--</b><span data-kiosk-date>--</span></div>`}${this._isAdmin() ? `<button class="secondary-btn layout-edit-btn ${this._kioskLayoutEdit ? "active" : ""}" data-action="toggle-kiosk-layout-edit"><ha-icon icon="mdi:cursor-move"></ha-icon>${this._kioskLayoutEdit ? "ZAKOŃCZ EDYCJĘ" : "EDYTUJ UKŁAD"}</button>${this._kioskLayoutEdit ? `<button class="primary-btn" data-action="save-kiosk-layout"><ha-icon icon="mdi:content-save"></ha-icon>ZAPISZ UKŁAD</button>` : ""}` : ""}<button class="secondary-btn" data-action="toggle-fullscreen"><ha-icon icon="mdi:fullscreen"></ha-icon>PEŁNY EKRAN</button><button class="secondary-btn" data-view="overview"><ha-icon icon="mdi:close"></ha-icon>WYJDŹ</button></div>
      </header>
      <div class="kiosk-slides">${slideHtml}</div>
      ${navigation}
      ${kiosk.show_status === false ? "" : `<footer class="kiosk-status"><span><i class="dot ok"></i> SYSTEM ONLINE</span><span>STRINGI PV <b>${strings}</b></span><span>DODATKOWE GAŁĘZIE <b>${devices}</b></span><span>STREFA <b data-live="tariffZone">--</b></span><span>REWIZJA <b>${this._esc(this._config.revision ?? 0)}</b></span></footer>`}
    </section>`;
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
    const y = Math.max(0, Math.min(360, Number(stored.y ?? fallbackY)));
    return `<div class="kiosk-bubble-slot" data-kiosk-item="${this._escAttr(key)}" style="--kiosk-x:${x}%;--kiosk-y:${y}px;--kiosk-w:${width}%">${item.html}<span class="layout-drag-handle bubble-layout-handle" data-layout-drag="bubble"><ha-icon icon="mdi:cursor-move"></ha-icon></span><span class="layout-resize-handle" data-layout-resize="bubble"><ha-icon icon="mdi:resize-bottom-right"></ha-icon></span></div>`;
  }

  _activeKioskProfile() {
    if (this._kioskProfileId && this._kioskProfileId !== "1") {
      const profile = (this._config.kiosk_profiles || []).find(item => item.id === this._kioskProfileId && item.enabled !== false);
      if (profile) return profile;
    }
    return this._config.kiosk || {};
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
      <article class="panel large-flow">${this._flowDiagram(true)}</article>
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
        </article>
        <article class="panel flow-config-preview">
          <div class="preview-badge"><ha-icon icon="mdi:eye-outline"></ha-icon>PODGLĄD NA ŻYWO</div>
          ${this._flowDiagram(false, true)}
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

  _flowDiagram(large = false, preview = false) {
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

    const node = (cls, icon, title, liveKey, extra = "") => `<div class="flow-node ${cls}"><ha-icon icon="${this._escAttr(icon)}"></ha-icon><b>${this._esc(title)}</b><strong data-live="${liveKey}">--</strong><small>${extra || "kW"}</small></div>`;
    const stringBranch = ({ item, index }) => {
      const runtime = this._pvStringRuntime(item, index);
      const label = item.flow_label || item.name || `String ${index + 1}`;
      const status = runtime.status || item.mppt || "PV";
      const active = Math.abs(Number(runtime.power || 0)) > 1;
      return `<div class="flow-branch source-branch accent-green ${active ? "is-active" : "is-idle"}" data-flow-string-branch="${index}">
        <div class="flow-extra-node"><ha-icon icon="${this._escAttr(item.flow_icon || "mdi:solar-panel-large")}"></ha-icon><b>${this._esc(label)}</b><div class="flow-extra-value"><strong data-flow-string-power="${index}">${this._kw(runtime.power)}</strong><span>kW</span></div><small data-flow-string-status="${index}">${this._esc(status)}</small></div>
        <span class="branch-wire" data-flow-extra-link="string-${index}"><i></i></span>
      </div>`;
    };
    const deviceBranch = ({ item, index }, source = false) => {
      const runtime = this._deviceRuntime(item, index);
      const label = item.flow_label || item.name || `Urządzenie ${index + 1}`;
      const status = runtime.cycle_state || runtime.status || item.area || runtime.description || "Urządzenie";
      const accent = allowedAccents.has(item.accent) ? item.accent : "cyan";
      const active = runtime.power != null && Math.abs(Number(runtime.power)) >= Number(item.active_threshold_w ?? 10);
      const bidirectional = item.flow_direction === "bidirectional";
      return `<div class="flow-branch ${source ? "source-branch" : "load-branch"} accent-${accent} ${active ? "is-active" : "is-idle"} ${flow.hide_inactive_devices ? "hidden-when-idle" : ""}" data-flow-device-branch="${index}" data-flow-direction="${this._escAttr(item.flow_direction || "consumer")}">
        ${source ? "" : `<span class="branch-wire ${bidirectional ? "bidirectional" : ""}" data-flow-extra-link="device-${index}"><i></i></span>`}
        <div class="flow-extra-node"><ha-icon icon="${this._escAttr(item.icon || "mdi:flash")}"></ha-icon><b>${this._esc(label)}</b><div class="flow-extra-value"><strong data-flow-device-flow-power="${index}">${this._kw(runtime.power == null ? null : Math.abs(Number(runtime.power)))}</strong><span>kW</span></div><small data-flow-device-status="${index}">${this._esc(status)}</small></div>
        ${source ? `<span class="branch-wire" data-flow-extra-link="device-${index}"><i></i></span>` : ""}
      </div>`;
    };
    const evBranch = showEv ? `<div class="flow-branch load-branch accent-cyan" data-flow-core-branch="ev">
      <span class="branch-wire" data-flow-extra-link="ev"><i></i></span>
      <div class="flow-extra-node"><ha-icon icon="mdi:car-electric"></ha-icon><b>EV</b><div class="flow-extra-value"><strong data-live="ev">--</strong><span>kW</span></div><small><span data-live="evSoc">--</span>% SOC</small></div>
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
          ${hasSources ? `<div class="flow-branch-bus source-bus">${sourceBranches}</div><div class="flow-link vertical source-link" data-flow-link="sources"><i></i><span>ŹRÓDŁA</span></div>` : ""}
          ${showPv ? node("pv-node", "mdi:solar-power", "PV", "pv") : ""}
          ${showPv ? `<div class="flow-link vertical pv-link forward" data-flow-link="pv"><i></i><span data-live="pv">--</span></div>` : ""}
          ${showGrid ? node("grid-node", "mdi:transmission-tower", "SIEĆ", "gridSigned") : ""}
          ${showGrid ? `<div class="flow-link horizontal grid-link bidirectional" data-flow-link="grid"><i></i><span data-live="gridFlow">--</span></div>` : ""}
          ${node("home-node", "mdi:home-lightning-bolt-outline", "DOM", "home")}
          ${showBattery ? `<div class="flow-link horizontal battery-link bidirectional" data-flow-link="battery"><i></i><span data-live="batteryFlow">--</span></div>` : ""}
          ${showBattery ? node("battery-node", "mdi:battery-charging-high", "MAGAZYN", "battery", `<span data-live="batterySoc">--</span>% · kW`) : ""}
          ${hasLoads ? `<div class="flow-link vertical loads-link" data-flow-link="loads"><i></i><span>ODBIORNIKI</span></div><div class="flow-branch-bus load-bus">${loadBranches}</div>` : ""}
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
    const valueSize = Math.max(12, Math.min(48, Number(item.value_size || 24)));
    const secondaryValueSize = Math.max(7, Math.min(28, Number(item.secondary_value_size || 11)));
    const padding = Math.max(4, Math.min(28, Number(item.padding || 13)));
    const textAlign = ["left", "center", "right"].includes(item.text_align) ? item.text_align : "left";
    const key = `bubble:${item.id || index}`;
    return `<article class="metric-card custom-bubble bubble-align-${textAlign} ${presentation.alert ? "bubble-alert" : ""} ${item.tap_action && item.tap_action !== "none" ? "actionable" : ""}" style="--bubble-color:${color};--bubble-bg:${background};--bubble-border-color:${borderColor};--bubble-border-width:${borderWidth}px;--bubble-radius:${borderRadius}px;--bubble-icon-color:${iconColor};--bubble-name-color:${nameColor};--bubble-value-color:${valueColor};--bubble-unit-color:${unitColor};--bubble-description-color:${descriptionColor};--bubble-secondary-color:${secondaryColor};--bubble-secondary-label-color:${secondaryLabelColor};--bubble-secondary-unit-color:${secondaryUnitColor};--bubble-icon-size:${iconSize}px;--bubble-value-size:${valueSize}px;--bubble-secondary-value-size:${secondaryValueSize}px;--bubble-padding:${padding}px;--alert-color:${this._safeColor(item.alert_color, "#ff335f")}" data-overview-bubble="${index}" data-widget-action="bubble" data-widget-index="${index}" tabindex="${item.tap_action && item.tap_action !== "none" ? "0" : "-1"}">
      ${item.show_icon === false ? "" : `<ha-icon icon="${this._escAttr(item.icon || "mdi:information-outline")}"></ha-icon>`}
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

  _field(path, label, value, placeholder = "", disabled = "") {
    return `<label class="field"><span>${label}</span><input type="text" data-path="${path}" value="${this._escAttr(value ?? "")}" placeholder="${this._escAttr(placeholder)}" ${disabled}></label>`;
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

  _renderBubbleRelatedEditor(item, bubbleIndex, disabled = "") {
    const related = Array.isArray(item.related_entities) ? item.related_entities : [];
    const cards = related.map((relatedItem, relatedIndex) => {
      const base = `overview_bubbles.${bubbleIndex}.related_entities.${relatedIndex}`;
      return `<article class="widget-related-card">
        <div class="widget-related-head"><b>ENCJA POWIĄZANA ${relatedIndex + 1}</b><button class="danger-link" data-action="remove-bubble-related" data-index="${bubbleIndex}" data-related-index="${relatedIndex}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon>USUŃ</button></div>
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
      <div class="widget-related-list full">${cards || `<div class="mini-empty">Brak dodatkowych encji w tym dymku.</div>`}<button class="secondary-btn add-related-btn" data-action="add-bubble-related" data-index="${bubbleIndex}" ${related.length >= 8 ? "disabled" : disabled}><ha-icon icon="mdi:plus"></ha-icon>DODAJ ENCJĘ DO DYMKU (${related.length}/8)</button></div>`;
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

  _renderEntityPicker() {
    if (!this._picker) return "";
    const current = this._getPath(this._config, this._picker.path) || "";
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

  _emptyState(icon, title, description) {
    return `<div class="empty"><ha-icon icon="${icon}"></ha-icon><h3>${title}</h3><p>${description}</p></div>`;
  }

  _featureIcon(key) {
    return ({grid:"mdi:transmission-tower",pv:"mdi:solar-power",battery:"mdi:battery-high",ev:"mdi:car-electric",prices:"mdi:cash-multiple",appliances:"mdi:power-plug",automation:"mdi:robot"})[key] || "mdi:puzzle-outline";
  }

  _bindCommonEvents() {
    this.shadowRoot.querySelectorAll("[data-view]").forEach(el => el.addEventListener("click", () => {
      const leavingKiosk = this._view === "kiosk" && el.dataset.view !== "kiosk";
      this._view = el.dataset.view;
      this._message = "";
      if (leavingKiosk && document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      this._render();
    }));
    this.shadowRoot.querySelector("[data-action='toggle-nav']")?.addEventListener("click", () => this.shadowRoot.querySelector(".sidebar")?.classList.toggle("open"));
    this.shadowRoot.querySelectorAll("[data-path]").forEach(el => {
      const event = el.type === "checkbox" || el.tagName === "SELECT" || (el.type === "number" && el.dataset.liveRerender === "1") ? "change" : "input";
      el.addEventListener(event, () => {
        const value = el.type === "checkbox" ? el.checked : el.type === "number" ? Number(el.value) : el.value;
        this._setPath(this._config, el.dataset.path, value);
        if (el.dataset.path === "flow.title") {
          this.shadowRoot.querySelectorAll(".flow-title>span").forEach(title => { title.textContent = value || "PRZEPŁYW ENERGII — NA ŻYWO"; });
        }
        if (el.dataset.liveRerender === "1") {
          const scroll = this.shadowRoot.querySelector(".content")?.scrollTop || 0;
          requestAnimationFrame(() => {
            this._render();
            const content = this.shadowRoot.querySelector(".content");
            if (content) content.scrollTop = scroll;
          });
        }
      });
    });
  }


  _bindViewEvents() {
    this.shadowRoot.querySelector(".entity-dialog")?.addEventListener("click", event => event.stopPropagation());
    this.shadowRoot.querySelectorAll("[data-action]").forEach(el => {
      const action = el.dataset.action;
      if (["toggle-nav", "import-config"].includes(action)) return;
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
        if (action === "remove-overview-bubble") this._removeOverviewBubble(Number(el.dataset.index));
        if (action === "add-bubble-related") this._addBubbleRelated(Number(el.dataset.index));
        if (action === "remove-bubble-related") this._removeBubbleRelated(Number(el.dataset.index), Number(el.dataset.relatedIndex));
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
        if (action === "open-kiosk-profile") this._openKioskProfile(el.dataset.profileId);
        if (action === "kiosk-prev") this._advanceKiosk(-1);
        if (action === "kiosk-next") this._advanceKiosk(1);
        if (action === "kiosk-slide") this._setKioskSlide(Number(el.dataset.slideIndex));
        if (action === "toggle-kiosk-layout-edit") { this._kioskLayoutEdit = !this._kioskLayoutEdit; this._render(); }
        if (action === "save-kiosk-layout") { this._kioskLayoutEdit = false; await this._saveConfig(); }
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
          this._setPath(this._config, this._picker.path, el.dataset.entity);
          this._message = `Wybrano ${el.dataset.entity}. Pamiętaj o zapisaniu zmian.`;
          this._picker = null;
          this._render();
        }
        if (action === "clear-entity") {
          this._setPath(this._config, this._picker.path, "");
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
      const current = this._getPath(this._config, this._picker?.path || "") || "";
      const candidates = this._entityCandidates(this._picker?.filter || "any", this._pickerQuery, this._pickerShowAll);
      const results = this.shadowRoot.querySelector("[data-entity-results]");
      if (results) {
        results.innerHTML = this._entityResultsHtml(candidates, current) || `<div class="empty-search"><ha-icon icon="mdi:database-search-outline"></ha-icon><b>Brak wyników</b><span>Zmień zapytanie albo pokaż wszystkie encje.</span></div>`;
        results.querySelectorAll("[data-action='select-entity']").forEach(row => row.addEventListener("click", () => {
          this._setPath(this._config, this._picker.path, row.dataset.entity);
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
        if (this._kioskLayoutEdit && el.closest("[data-kiosk-item]")) return;
        event.preventDefault();
        this._executeWidgetAction(el.dataset.widgetAction, Number(el.dataset.widgetIndex));
      };
      el.addEventListener("click", execute);
      el.addEventListener("keydown", execute);
    });
    this._bindWidgetDragDrop();
    this._bindKioskLayoutEditor();
  }


  async _saveConfig() {
    if (!this._isAdmin()) return;
    this._message = "Zapisywanie…";
    this._updateMessage();
    try {
      this._config = await this._hass.callWS({ type: `${DOMAIN}/config/save`, config: this._config });
      this._runtime = await this._hass.callWS({ type: `${DOMAIN}/runtime/get` });
      this._message = `Zapisano rewizję ${this._config.revision}`;
      this._render();
    } catch (err) {
      this._message = `Błąd zapisu: ${err?.message || err}`;
      this._updateMessage();
    }
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

  _addOverviewBubble() {
    if (!this._isAdmin()) return;
    const items = this._config.overview_bubbles ||= [];
    const n = items.length + 1;
    items.push({
      id: this._id("bubble"), name: `Dymek ${n}`, description: "", entity_id: "", attribute: "",
      show_secondary: false, secondary_name: "", secondary_entity_id: "", secondary_attribute: "", secondary_unit: "", secondary_decimals: 1, secondary_multiplier: 1,
      secondary_color: "#20eaff", secondary_label_color: "#88afbd", secondary_unit_color: "#7898a4", secondary_value_size: 11,
      icon: "mdi:information-outline", color: "#20eaff", background_color: "#031426", border_color: "#20eaff", icon_color: "#20eaff", name_color: "#8eb5c3", value_color: "#20eaff", unit_color: "#8eb3c0", description_color: "#6e96a5", border_width: 1, border_radius: 14, icon_size: 22, value_size: 24, padding: 13, text_align: "left", show_icon: true, show_name: true, show_unit: true, show_description: true, unit: "",
      color_mode: "fixed", low_threshold: 0, high_threshold: 100, low_color: "#008cff", normal_color: "#20eaff", high_color: "#ff4d6d", unavailable_color: "#6d7d86",
      alert_enabled: false, alert_condition: "above", alert_low: 0, alert_high: 100, alert_color: "#ff335f", alert_text: "ALARM",
      decimals: 1, multiplier: 1, related_entities: [], order: n, enabled: true, show_sparkline: true, tap_action: "more_info", navigation_path: "", service: "", service_data: "{}",
    });
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
      builtin_bubble_ids: ["home", "pv", "grid"], bubble_layout: "free", bubble_stage_height: 96, bubble_positions: {},
      flow_offset_x: 0, flow_offset_y: -30, flow_scale: 100, show_price_panel: true, show_consumers_panel: true,
      show_battery_gauge: false, show_self_sufficiency_gauge: false, auto_fullscreen: true, lovelace_views: [],
      show_clock: true, show_builtin_bubbles: true, show_custom_bubbles: true, show_charts: true,
      show_status: true, flow_height: "tall", bubble_selection: "all", bubble_ids: [],
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
    this._kioskLayoutEdit = false;
    this._view = "kiosk";
    this._render();
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
    items.push({ id: this._id("lovelace"), name: `Lovelace ${n}`, path: "", enabled: true });
    this._render();
  }

  _removeKioskLovelaceView(profileIndex, index) {
    if (!this._isAdmin()) return;
    const profile = profileIndex < 0 ? this._config.kiosk : this._config.kiosk_profiles?.[profileIndex];
    if (!profile || !Number.isInteger(index)) return;
    (profile.lovelace_views || []).splice(index, 1);
    this._render();
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
    if (!this._isAdmin() || !this._kioskLayoutEdit || this._view !== "kiosk") return;
    const profile = this._activeKioskProfile();
    profile.bubble_positions ||= {};
    const begin = (event, mode) => {
      const handle = event.currentTarget;
      const slot = handle.closest("[data-kiosk-item]");
      const stage = handle.closest(".kiosk-bubble-stage");
      const view = handle.closest(".kiosk-view");
      if ((mode === "move" || mode === "resize") && (!slot || !stage || !stage.classList.contains("layout-free"))) return;
      event.preventDefault();
      event.stopPropagation();
      const stageRect = stage?.getBoundingClientRect();
      const slotRect = slot?.getBoundingClientRect();
      const key = slot?.dataset.kioskItem;
      const position = key ? (profile.bubble_positions[key] ||= {}) : null;
      const startXPercent = stageRect && slotRect ? ((slotRect.left - stageRect.left) / stageRect.width) * 100 : 0;
      const startY = stageRect && slotRect ? slotRect.top - stageRect.top : 0;
      const startWidth = stageRect && slotRect ? (slotRect.width / stageRect.width) * 100 : 16;
      this._kioskPointerState = { mode, startClientX: event.clientX, startClientY: event.clientY, stageRect, slot, view, key, position, startXPercent, startY, startWidth, flowX: Number(profile.flow_offset_x || 0), flowY: Number(profile.flow_offset_y ?? -30) };
      const move = pointerEvent => {
        const state = this._kioskPointerState;
        if (!state) return;
        pointerEvent.preventDefault();
        const dx = pointerEvent.clientX - state.startClientX;
        const dy = pointerEvent.clientY - state.startClientY;
        if (state.mode === "flow") {
          profile.flow_offset_x = Math.round(Math.max(-400, Math.min(400, state.flowX + dx)));
          profile.flow_offset_y = Math.round(Math.max(-400, Math.min(400, state.flowY + dy)));
          state.view?.style.setProperty("--flow-offset-x", `${profile.flow_offset_x}px`);
          state.view?.style.setProperty("--flow-offset-y", `${profile.flow_offset_y}px`);
          return;
        }
        if (!state.stageRect || !state.position) return;
        if (state.mode === "move") {
          const width = Number(state.position.width ?? state.startWidth);
          const x = Math.max(0, Math.min(100 - width, state.startXPercent + (dx / state.stageRect.width) * 100));
          const maximumY = Math.max(0, state.stageRect.height - state.slot.offsetHeight);
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
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", end);
        window.removeEventListener("pointercancel", end);
        this._kioskPointerState = null;
        this._message = "Układ zmieniony. Kliknij ZAPISZ UKŁAD.";
      };
      window.addEventListener("pointermove", move, { passive: false });
      window.addEventListener("pointerup", end, { once: true });
      window.addEventListener("pointercancel", end, { once: true });
    };
    this.shadowRoot.querySelectorAll("[data-layout-drag='bubble']").forEach(handle => handle.addEventListener("pointerdown", event => begin(event, "move")));
    this.shadowRoot.querySelectorAll("[data-layout-resize='bubble']").forEach(handle => handle.addEventListener("pointerdown", event => begin(event, "resize")));
    this.shadowRoot.querySelectorAll("[data-layout-drag='flow']").forEach(handle => handle.addEventListener("pointerdown", event => begin(event, "flow")));
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
    const count = this.shadowRoot.querySelectorAll("[data-kiosk-slide]").length;
    if (!this._kioskLayoutEdit && profile.rotation_enabled && count > 1) {
      this._kioskRotationTimer = setInterval(() => this._advanceKiosk(1), Math.max(5, Number(profile.rotation_seconds || 20)) * 1000);
    }
  }

  _armKioskFullscreen(profile = this._activeKioskProfile()) {
    if (profile?.auto_fullscreen === false || document.fullscreenElement || this._autoFullscreenArmed || !this.shadowRoot) return;
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
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === this._kioskSlide));
    this.shadowRoot.querySelectorAll(".kiosk-dot").forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === this._kioskSlide));
    this._updateLive();
  }

  _advanceKiosk(direction) { this._setKioskSlide(this._kioskSlide + direction); }

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
    this.shadowRoot.querySelectorAll("[data-live]").forEach(el => { const key = el.dataset.live; if (key in live) el.textContent = live[key]; });
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
    this.shadowRoot.querySelectorAll("[data-gauge]").forEach(el => { const val = Number(v[el.dataset.gauge] ?? 0); el.style.setProperty("--value", Math.max(0, Math.min(100, val))); });
    this.shadowRoot.querySelectorAll("[data-gauge-status]").forEach(el => { const val = v[el.dataset.gaugeStatus]; el.textContent = val == null ? "Brak danych" : val < 20 ? "Niski poziom" : val < 80 ? "Poziom roboczy" : "Wysoki poziom"; });
    this._updateDevicePowers();
    this._updateFlowExtras(v);
    this._updateConsumers();
    this._updateOverviewWidgets();
    this._drawSparklines();
    const count = Object.keys(this._hass?.states || {}).length;
    const footerEntities = this.shadowRoot.querySelector("[data-footer-entities]"); if (footerEntities) footerEntities.textContent = `Encje HA: ${count}`;
    const footerDevices = this.shadowRoot.querySelector("[data-footer-devices]"); if (footerDevices) footerDevices.textContent = `Urządzenia: ${this._config.devices.length}`;
    const footerStrings = this.shadowRoot.querySelector("[data-footer-strings]"); if (footerStrings) footerStrings.textContent = `Stringi PV: ${this._config.pv_strings.length}`;
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
    const updateText = (selector, value) => this.shadowRoot.querySelectorAll(selector).forEach(el => { el.textContent = value; });
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
      if (el) el.textContent = this._num(runtime.power, 0);
      const description = this.shadowRoot.querySelector(`[data-device-description="${index}"]`);
      if (description) description.textContent = runtime.description;
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
    container.innerHTML = devices.length ? devices.map(d => `<div class="consumer ${d.active ? "active" : ""}"><span><ha-icon icon="${this._escAttr(d.icon || "mdi:flash")}"></ha-icon>${this._esc(d.name)}</span><div><i style="width:${Math.max(2, (d.power || 0) / max * 100)}%"></i></div><b>${this._kw(d.power || 0)} kW</b><small>${this._esc(d.description || "")}</small></div>`).join("") : `<div class="mini-empty">Dodaj urządzenia z sensorami mocy i zaznacz „Pokaż na podsumowaniu”.</div>`;
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
    :host { --bg:#010914; --panel:rgba(3,18,38,.88); --cyan:#20eaff; --cyan2:#008cff; --green:#52ff62; --lime:#b8ff3d; --orange:#ffb11b; --purple:#b95cff; display:block; min-height:100vh; color:#eefaff; font-family:Inter,Roboto,Arial,sans-serif; background:#01060d; }
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
    .flow-branch-bus{position:relative;z-index:2;grid-column:1/-1;width:100%;height:100%;display:flex;align-items:stretch;justify-content:center;gap:var(--branch-gap);padding:0 max(8px,var(--branch-gap));overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;scrollbar-color:rgba(32,234,255,.35) transparent}.source-bus{grid-row:1}.load-bus{grid-row:7}.flow-branch-bus:after{content:"";position:absolute;left:8%;right:8%;height:2px;background:rgba(32,234,255,.32);box-shadow:0 0 8px rgba(32,234,255,.3);z-index:-1}.source-bus:after{bottom:0;background:rgba(82,255,98,.35);box-shadow:0 0 8px rgba(82,255,98,.32)}.load-bus:after{top:0}.flow-branch{--branch-color:var(--cyan);position:relative;flex:0 1 128px;min-width:92px;max-width:150px;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;transition:opacity .2s,filter .2s}.flow-branch.accent-green{--branch-color:var(--green)}.flow-branch.accent-lime{--branch-color:var(--lime)}.flow-branch.accent-orange{--branch-color:var(--orange)}.flow-branch.accent-purple{--branch-color:var(--purple)}.flow-branch.is-idle{opacity:.58;filter:saturate(.55)}.flow-branch.hidden-when-idle.is-idle{display:none}.flow-extra-node{position:relative;width:100%;min-height:76px;border:1px solid color-mix(in srgb,var(--branch-color) 58%,transparent);border-radius:13px;background:radial-gradient(circle at 10% 10%,color-mix(in srgb,var(--branch-color) 12%,transparent),transparent 45%),rgba(2,12,24,.97);box-shadow:0 0 15px color-mix(in srgb,var(--branch-color) 12%,transparent),inset 0 0 18px rgba(0,120,180,.04);display:grid;grid-template-columns:29px minmax(0,1fr);grid-template-rows:auto auto auto;align-content:center;column-gap:6px;padding:8px 9px;color:white}.flow-extra-node>ha-icon{grid-column:1;grid-row:1/4;align-self:center;width:25px;height:25px;color:var(--branch-color);filter:drop-shadow(0 0 6px currentColor)}.flow-extra-node>b{grid-column:2;font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.flow-extra-value{grid-column:2;display:flex;align-items:baseline;gap:3px}.flow-extra-value strong{font:16px monospace;color:var(--branch-color)}.flow-extra-value span{font-size:7px;color:#85a8b5}.flow-extra-node>small{grid-column:2;display:block;max-width:100%;font-size:7px;color:#658d9c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.branch-wire{position:relative;display:block;width:20px;flex:1;min-height:10px;overflow:hidden}.branch-wire:before{content:"";position:absolute;left:calc(50% - 1px);top:0;bottom:0;width:2px;background:color-mix(in srgb,var(--branch-color) 55%,transparent);box-shadow:0 0 6px color-mix(in srgb,var(--branch-color) 55%,transparent)}.branch-wire i{position:absolute;left:calc(50% - 2px);top:-35%;width:4px;height:35%;border-radius:999px;background:linear-gradient(180deg,transparent,var(--branch-color),#fff,var(--branch-color),transparent);box-shadow:0 0 10px var(--branch-color);animation:flow-y 1.3s linear infinite}.branch-wire.reverse i{animation-direction:reverse}.branch-wire.idle i{animation-play-state:paused;opacity:.15}.branch-wire.idle:before{opacity:.35}.source-branch .flow-extra-node{order:1}.source-branch .branch-wire{order:2}.load-branch .branch-wire{order:1}.load-branch .flow-extra-node{order:2}.flow-branch.is-active .flow-extra-node{box-shadow:0 0 22px color-mix(in srgb,var(--branch-color) 21%,transparent),inset 0 0 20px color-mix(in srgb,var(--branch-color) 7%,transparent)}
    .flow-canvas-v4.node-style-technical .flow-node,.flow-canvas-v4.node-style-technical .flow-extra-node{border-radius:2px}.flow-canvas-v4.node-style-technical .home-node{border-radius:50%}.flow-canvas-v4.node-style-soft .flow-node,.flow-canvas-v4.node-style-soft .flow-extra-node{border-radius:26px;background:radial-gradient(circle at 30% 15%,rgba(32,234,255,.14),rgba(2,12,24,.96))}.flow-canvas-v4.hide-labels .flow-node>b,.flow-canvas-v4.hide-labels .flow-extra-node>b{display:none}.flow-canvas-v4.hide-values .flow-node strong,.flow-canvas-v4.hide-values .flow-extra-value,.flow-canvas-v4.hide-values .flow-link span[data-live]{display:none}.flow-canvas-v4.hide-status .flow-extra-node>small{display:none}.flow-canvas-v4.hide-connectors .flow-link,.flow-canvas-v4.hide-connectors .branch-wire,.flow-canvas-v4.hide-connectors .flow-branch-bus:after{opacity:0}.flow-canvas-v4.speed-slow .flow-link i,.flow-canvas-v4.speed-slow .branch-wire i{animation-duration:2.4s}.flow-canvas-v4.speed-fast .flow-link i,.flow-canvas-v4.speed-fast .branch-wire i{animation-duration:.7s}.flow-canvas-v4.preview .flow-node{width:100px!important;height:100px!important}.flow-canvas-v4.preview .home-node{width:116px!important;height:116px!important}.flow-canvas-v4.preview .flow-extra-node{min-height:66px}.flow-canvas-v4.preview .flow-extra-value strong{font-size:14px}
    @media(max-width:1300px){.flow-config-section{grid-template-columns:1fr}.flow-config-preview{min-height:520px}}
    @media(max-width:850px){.flow-canvas-v4{padding:8px;min-height:calc(var(--source-row) + var(--source-link-row) + var(--pv-row) + var(--pv-link-row) + var(--core-row) + var(--load-link-row) + var(--load-row) + 16px)!important}.flow-grid-v4{min-width:460px;grid-template-columns:minmax(88px,1fr) 26px minmax(112px,.86fr) 26px minmax(88px,1fr)}.flow-grid-v4 .flow-node{width:94px!important;height:94px!important}.flow-grid-v4 .home-node{width:116px!important;height:116px!important}.flow-branch{min-width:86px;max-width:112px}.flow-extra-node{padding:6px;grid-template-columns:24px minmax(0,1fr)}.flow-extra-node>ha-icon{width:21px;height:21px}.flow-extra-value strong{font-size:14px}.flow-config-preview{min-height:470px}}
    @media(max-width:560px){.flow-config-section{display:block}.flow-config-editor,.flow-config-preview{margin-bottom:10px}.flow-canvas-v4{overflow-x:auto!important;min-height:0!important}.flow-grid-v4{min-width:420px}.flow-canvas-v4 .flow-link span{display:none}.flow-branch{min-width:80px}.flow-extra-node>b{font-size:8px}.flow-extra-node>small{font-size:6px}.preview-badge{display:none}}

    /* v0.5 — configurable overview bubbles and session charts. */
    .metric-card.custom-bubble{--bubble-color:var(--cyan);--bubble-bg:#031426;height:auto;min-height:94px;padding:var(--bubble-padding,13px);border:var(--bubble-border-width,1px) solid var(--bubble-border-color,var(--bubble-color));border-radius:var(--bubble-radius,14px);background:radial-gradient(circle at 8% 12%,color-mix(in srgb,var(--bubble-color) 16%,transparent),transparent 45%),linear-gradient(145deg,color-mix(in srgb,var(--bubble-bg) 94%,#071a2a),color-mix(in srgb,var(--bubble-bg) 82%,#000));box-shadow:inset 0 0 22px color-mix(in srgb,var(--bubble-color) 6%,transparent)}.metric-card.custom-bubble>ha-icon{width:var(--bubble-icon-size,22px);height:var(--bubble-icon-size,22px);color:var(--bubble-icon-color,var(--bubble-color));filter:drop-shadow(0 0 6px color-mix(in srgb,var(--bubble-icon-color,var(--bubble-color)) 55%,transparent))}.metric-card.custom-bubble .spark{stroke:var(--bubble-color)}.custom-bubble-copy{min-width:0;z-index:1}.custom-bubble-copy>small{color:var(--bubble-name-color,#8eb5c3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-bubble-copy>div{display:flex;align-items:baseline;min-width:0}.custom-bubble-copy>div>strong{max-width:145px;color:var(--bubble-value-color,var(--bubble-color));font-size:var(--bubble-value-size,24px);filter:drop-shadow(0 0 6px color-mix(in srgb,var(--bubble-value-color,var(--bubble-color)) 55%,transparent));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-bubble-copy>div>span{color:var(--bubble-unit-color,#8eb3c0)}.custom-bubble-copy p{margin:3px 0 16px;color:var(--bubble-description-color,#6e96a5);font-size:8px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.custom-bubble.bubble-align-center{justify-content:center;text-align:center}.custom-bubble.bubble-align-center .custom-bubble-copy>div{justify-content:center}.custom-bubble.bubble-align-right{justify-content:flex-end;text-align:right}.custom-bubble.bubble-align-right .custom-bubble-copy>div{justify-content:flex-end}.metrics-grid.bubble-size-compact .metric-card{min-height:76px;height:76px;padding:var(--bubble-padding,9px)}.metrics-grid.bubble-size-compact .metric-card:not(.custom-bubble) strong{font-size:20px}.metrics-grid.bubble-size-compact .custom-bubble-copy p{display:none}.metrics-grid.bubble-size-large{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}.metrics-grid.bubble-size-large .metric-card{min-height:120px;padding:var(--bubble-padding,17px)}.metrics-grid.bubble-size-large .metric-card:not(.custom-bubble) strong{font-size:29px}.metrics-grid.bubble-size-large .custom-bubble-copy p{font-size:9px;margin-top:7px}
    .custom-chart-grid{display:grid;grid-template-columns:repeat(var(--chart-columns,2),minmax(0,1fr));gap:10px;margin-top:10px}.custom-overview-chart{--chart-color:var(--cyan);padding:11px 14px 10px;min-width:0;overflow:hidden;border-color:color-mix(in srgb,var(--chart-color) 38%,rgba(32,234,255,.18));background:radial-gradient(circle at 7% 5%,color-mix(in srgb,var(--chart-color) 10%,transparent),transparent 42%),var(--panel)}.custom-chart-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}.custom-chart-head>div{display:flex;align-items:center;gap:9px;min-width:0}.custom-chart-head ha-icon{color:var(--chart-color);filter:drop-shadow(0 0 6px currentColor)}.custom-chart-head span{display:flex;flex-direction:column;min-width:0}.custom-chart-head b{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-chart-head small{color:#638998;font-size:8px;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.custom-chart-head>strong{display:flex;align-items:baseline;gap:4px;color:var(--chart-color);font:22px monospace;white-space:nowrap}.custom-chart-head>strong small{font:8px sans-serif;color:#83acba}.custom-overview-chart svg{width:100%;height:150px;margin-top:5px;overflow:visible}.custom-overview-chart.chart-small svg{height:95px}.custom-overview-chart.chart-large svg{height:230px}.custom-chart-path{fill:none;stroke:var(--chart-color);stroke-width:var(--chart-line-width,2);vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--chart-color) 65%,transparent))}.graph-area .custom-chart-path{fill:color-mix(in srgb,var(--chart-color) 17%,transparent);stroke:var(--chart-color)}.graph-bar .custom-chart-path{fill:color-mix(in srgb,var(--chart-color) 62%,transparent);stroke:var(--chart-color);stroke-width:.5}.custom-chart-foot{display:flex;justify-content:space-between;gap:10px;color:#567b8b;font-size:8px}.custom-chart-foot span{color:#739baa}.custom-chart-foot b{color:var(--chart-color);font-family:monospace}.custom-chart-foot i{font-style:normal}
    .overview-widget-layout{display:grid;grid-template-columns:minmax(360px,.6fr) minmax(560px,1.4fr);gap:10px;margin-bottom:18px}.overview-widget-settings,.overview-widget-preview{padding:8px 14px 16px;min-width:0}.overview-widget-preview>.metrics-grid{margin:0}.overview-widget-preview>.empty{padding:35px}.custom-chart-grid.preview-grid{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}.widget-checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:8px}.overview-widget-settings>.widget-checks{grid-template-columns:1fr}.widget-checks .check-row{border:1px solid rgba(32,234,255,.13);border-radius:10px;background:rgba(0,75,110,.05);padding:9px}.widget-checks.three-checks{grid-template-columns:repeat(3,minmax(0,1fr))}.widget-add-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.widget-editor-list{display:grid;gap:10px;margin-bottom:18px}.section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding:4px 2px}.section-heading h2{margin:3px 0 0;font-size:17px}.widget-editor-card{padding:8px 14px 16px}.widget-editor-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px 10px}.widget-editor-grid>.full{grid-column:1/-1}.danger-link{border:1px solid rgba(255,85,115,.35);background:rgba(255,40,75,.08);color:#ff718b;padding:5px 8px;display:flex;align-items:center;gap:5px;font-size:8px;font-weight:900}.danger-link ha-icon{width:15px;height:15px}.color-input-wrap{height:39px;border:1px solid rgba(32,234,255,.28);background:#03101e;display:grid!important;grid-template-columns:54px 1fr;align-items:center}.field .color-input-wrap input[type=color]{width:54px;height:37px;border:0;padding:4px;background:transparent}.color-input-wrap code{padding:0 10px;color:#a8d3df;font-size:10px}
    .kiosk-settings{margin-top:18px;padding-top:6px;border-top:1px solid rgba(32,234,255,.16)}.kiosk-settings>.widget-checks{grid-template-columns:1fr 1fr}.kiosk-preview-button{margin-top:12px;width:100%;justify-content:center}.matrix-shell.kiosk-active{height:100vh;height:100dvh;overflow:hidden;grid-template-columns:1fr;grid-template-rows:1fr;grid-template-areas:"main"}.matrix-shell.kiosk-active>.topbar,.matrix-shell.kiosk-active>.sidebar,.matrix-shell.kiosk-active>.statusbar{display:none}.matrix-shell.kiosk-active:before{inset:0}.matrix-shell.kiosk-active>.content{padding:12px;overflow:hidden;min-height:0}.kiosk-view{width:100%;height:100%;min-height:0;display:flex;flex-direction:column;gap:10px;overflow:hidden}.kiosk-header{min-height:72px;border:1px solid rgba(32,234,255,.3);background:linear-gradient(90deg,rgba(3,24,45,.96),rgba(1,10,20,.94));display:flex;align-items:center;justify-content:space-between;gap:18px;padding:10px 16px;box-shadow:inset 0 0 22px rgba(0,190,255,.07)}.kiosk-header h1{margin:2px 0;font-size:23px;letter-spacing:2px}.kiosk-header>div>small{color:#6e98a8}.kiosk-header-tools{display:flex;align-items:center;gap:8px}.kiosk-clock{display:flex;flex-direction:column;align-items:flex-end;min-width:105px}.kiosk-clock b{font:20px monospace;color:var(--cyan)}.kiosk-clock span{font-size:8px;color:#6792a2}.kiosk-metrics{margin:0;grid-template-columns:repeat(auto-fit,minmax(155px,1fr))}.kiosk-flow-card{flex:1;min-height:0;padding:0;overflow:hidden}.kiosk-flow-card .flow-canvas-v4{margin:0 12px 12px;min-height:560px!important}.flow-height-tall .kiosk-flow-card .flow-canvas-v4{min-height:max(650px,calc(100vh - 300px))!important}.flow-height-full .kiosk-flow-card .flow-canvas-v4{min-height:max(760px,calc(100vh - 195px))!important}.kiosk-status{min-height:36px;border:1px solid rgba(32,234,255,.25);background:rgba(2,15,29,.96);display:flex;align-items:center;justify-content:space-around;gap:18px;padding:6px 13px;color:#719baa;font-size:9px}.kiosk-status span{display:flex;align-items:center;gap:6px}.kiosk-status b{color:var(--cyan);font-family:monospace}
    .compact-kiosk-header .kiosk-header{min-height:56px;padding:6px 12px}.compact-kiosk-header .kiosk-header h1{font-size:18px}.compact-kiosk-header .kiosk-header>div>small{font-size:7px}.compact-kiosk-header .kiosk-clock b{font-size:17px}.compact-kiosk-header .secondary-btn{padding:6px 9px;font-size:8px}
    .display-tablet_16_9{gap:6px}.display-tablet_16_9 .kiosk-header{flex:0 0 auto}.display-tablet_16_9 .kiosk-slides{overflow:hidden}.display-tablet_16_9 .kiosk-slide{height:100%;min-height:0;gap:6px;overflow:hidden}.display-tablet_16_9 .kiosk-metrics{grid-template-columns:repeat(var(--kiosk-bubble-columns,6),minmax(0,1fr));gap:6px;flex:0 0 auto}.display-tablet_16_9 .kiosk-metrics .metric-card{height:82px;min-height:82px;padding:8px;border-radius:10px}.display-tablet_16_9 .kiosk-metrics .metric-card strong{font-size:19px}.display-tablet_16_9 .kiosk-metrics .custom-bubble-copy p{display:none}.display-tablet_16_9 .kiosk-metrics .bubble-related-list{margin-top:3px;padding-top:2px}.display-tablet_16_9 .kiosk-flow-card .flow-canvas-v4{--source-row:66px;--source-link-row:16px;--pv-row:78px;--pv-link-row:18px;--core-row:94px;--load-link-row:18px;--load-row:68px;width:auto;height:100%!important;min-height:0!important;margin:0 6px 6px;padding:6px;overflow:hidden}.display-tablet_16_9 .flow-grid-v4{height:100%!important;min-width:480px}.display-tablet_16_9 .flow-grid-v4 .flow-node{width:82px!important;height:82px!important}.display-tablet_16_9 .flow-grid-v4 .home-node{width:98px!important;height:98px!important}.display-tablet_16_9 .flow-extra-node{min-height:54px;padding:5px}.display-tablet_16_9 .flow-extra-node>ha-icon{width:20px;height:20px}.display-tablet_16_9 .flow-extra-value strong{font-size:13px}.display-tablet_16_9 .kiosk-chart-grid{height:100%;min-height:0;margin:0;grid-template-columns:repeat(var(--kiosk-chart-columns,2),minmax(0,1fr));grid-auto-rows:minmax(0,1fr);overflow:auto}.display-tablet_16_9 .custom-overview-chart{min-height:0}.display-tablet_16_9 .custom-overview-chart svg{height:min(17vh,135px)}.display-tablet_16_9 .kiosk-summary-grid{grid-template-columns:1.2fr 1.2fr .8fr .8fr;gap:6px;min-height:0;overflow:hidden}.display-tablet_16_9 .kiosk-summary-grid>.panel{min-height:0;height:auto}.display-tablet_16_9 .kiosk-summary-grid .gauge{width:96px;height:96px}.display-tablet_16_9 .kiosk-summary-grid .gauge:before{width:76px;height:76px}.display-tablet_16_9 .kiosk-slide-nav{height:22px}.display-tablet_16_9 .kiosk-status{min-height:30px;padding:4px 10px;font-size:8px}
    /* v0.6 — advanced widgets, recorder history and multi-profile kiosk. */
    .actionable{cursor:pointer}.actionable:hover,.actionable:focus{outline:none;transform:translateY(-1px);box-shadow:0 0 24px color-mix(in srgb,var(--bubble-color,var(--chart-color,var(--cyan))) 28%,transparent)}.bubble-secondary{margin-top:2px!important;display:flex!important;align-items:baseline!important;gap:3px;color:var(--bubble-secondary-label-color,#88afbd)}.bubble-secondary small{margin-right:3px;font-size:7px;color:var(--bubble-secondary-label-color,#88afbd)}.bubble-secondary b{font:var(--bubble-secondary-value-size,11px) monospace;color:var(--bubble-secondary-color,var(--bubble-color))}.bubble-secondary span{font-size:7px!important;color:var(--bubble-secondary-unit-color,#7898a4)!important}.bubble-related-list{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 7px;margin-top:5px;padding-top:4px;border-top:1px solid color-mix(in srgb,var(--bubble-color) 18%,transparent)}.bubble-related-value{display:grid!important;grid-template-columns:minmax(0,1fr) auto auto;align-items:baseline!important;gap:3px;min-width:0}.bubble-related-value small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--related-label-color,#7195a2);font-size:7px}.bubble-related-value b{font:var(--related-value-size,10px) monospace;color:var(--related-color);white-space:nowrap}.bubble-related-value span{font-size:6px!important;color:var(--related-unit-color,#7898a4)}.custom-bubble-copy:has(.bubble-related-list) p{margin-bottom:17px}.metrics-grid.bubble-size-compact .custom-bubble:has(.bubble-related-list){height:auto;min-height:88px}.bubble-alert{border-color:var(--alert-color)!important;animation:bubble-alarm 1.2s ease-in-out infinite}.bubble-alert-label{position:absolute;top:6px;right:6px;z-index:3;border:1px solid var(--alert-color);border-radius:999px;background:rgba(40,0,10,.9);color:var(--alert-color);padding:2px 6px;font-size:7px;font-weight:900;letter-spacing:.7px}@keyframes bubble-alarm{0%,100%{box-shadow:0 0 8px color-mix(in srgb,var(--alert-color) 18%,transparent)}50%{box-shadow:0 0 28px color-mix(in srgb,var(--alert-color) 62%,transparent),inset 0 0 18px color-mix(in srgb,var(--alert-color) 12%,transparent)}}
    .chart-series-legend{display:flex;flex-wrap:wrap;gap:5px 12px;margin-top:8px;padding:6px 8px;border:1px solid rgba(32,234,255,.1);background:rgba(0,35,55,.18)}.chart-series-legend>div{--series-color:var(--cyan);display:flex;align-items:baseline;gap:4px;min-width:0;font-size:8px}.chart-series-legend i{width:12px;height:3px;border-radius:2px;background:var(--series-color);box-shadow:0 0 5px var(--series-color)}.chart-series-legend span{color:#8cadb9;max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chart-series-legend b{font:10px monospace;color:var(--series-color)}.chart-series-legend small{color:#658895;font-size:7px}.custom-chart-path{stroke:var(--series-color,var(--chart-color))!important;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--series-color,var(--chart-color)) 65%,transparent))}.graph-area .custom-chart-path{fill:color-mix(in srgb,var(--series-color,var(--chart-color)) 12%,transparent)!important}.graph-bar .custom-chart-path{fill:color-mix(in srgb,var(--series-color,var(--chart-color)) 62%,transparent)!important}
    .widget-subsection{margin-top:12px;padding:9px 10px;border-left:3px solid var(--cyan);background:linear-gradient(90deg,rgba(0,180,230,.09),transparent);display:flex;flex-direction:column;gap:2px}.widget-subsection b{font-size:9px;color:var(--cyan);letter-spacing:1px}.widget-subsection small{font-size:8px;color:#6b93a2}.widget-related-list{display:grid;gap:8px}.widget-related-card{border:1px solid rgba(32,234,255,.18);border-radius:5px;background:rgba(0,35,55,.18);padding:8px}.widget-related-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.widget-related-head>b{font-size:8px;color:#8fc6d4;letter-spacing:.8px}.widget-related-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px 9px}.widget-related-grid>.full{grid-column:1/-1}.widget-related-grid .check-row{align-self:end;border:1px solid rgba(32,234,255,.12);padding:7px}.add-related-btn{justify-self:start}.draggable-widget{transition:opacity .15s,transform .15s,border-color .15s}.draggable-widget .drag-handle{width:17px;height:17px;vertical-align:middle;color:#769aa7;cursor:grab}.draggable-widget.dragging{opacity:.35;transform:scale(.99)}.draggable-widget.drag-target{border-color:var(--green);box-shadow:0 0 22px rgba(82,255,98,.2)}
    .kiosk-profile-card{padding:8px 14px 16px;margin-top:0}.kiosk-profile-card.kiosk-settings{border-top:1px solid rgba(32,234,255,.35)}.default-kiosk-settings{margin-top:18px}.kiosk-profile-head-actions{display:flex;align-items:center;gap:6px}.kiosk-selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px}.selection-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.selection-chip{display:inline-flex;align-items:center;gap:5px;border:1px solid rgba(32,234,255,.2);border-radius:999px;background:rgba(0,70,105,.08);padding:5px 8px;color:#91b8c5;font-size:8px}.selection-chip:has(input:checked){border-color:var(--green);color:var(--green);background:rgba(82,255,98,.07)}.selection-chip ha-icon{width:14px;height:14px}.selection-chip input{margin:0}.kiosk-profile-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:13px;padding-top:10px;border-top:1px solid rgba(32,234,255,.15)}.kiosk-profile-footer code{font-size:9px;overflow:hidden;text-overflow:ellipsis}
    .kiosk-slides{position:relative;flex:1;min-height:0}.kiosk-slide{display:none;min-height:100%;flex-direction:column;gap:10px}.kiosk-slide.active{display:flex}.kiosk-chart-grid{margin:0;align-content:start}.kiosk-summary-grid{display:grid;grid-template-columns:repeat(var(--summary-columns,4),minmax(0,1fr));gap:10px;flex:1}.kiosk-summary-grid>.panel{min-height:250px}.kiosk-summary-grid .price-panel,.kiosk-summary-grid .consumers-panel{height:auto}.kiosk-slide-nav{height:30px;display:flex;align-items:center;justify-content:center;gap:12px}.kiosk-slide-nav>button{border:0;background:transparent;color:var(--cyan);padding:2px}.kiosk-slide-nav>div{display:flex;gap:7px}.kiosk-dot{width:28px;height:5px;border:0;border-radius:999px;background:#254451;padding:0}.kiosk-dot.active{background:var(--cyan);box-shadow:0 0 9px var(--cyan)}.matrix-shell.kiosk-active{transition:filter 1s ease}.matrix-shell.kiosk-active.kiosk-night{filter:brightness(var(--night-brightness,.3));cursor:none}.matrix-shell.kiosk-active.kiosk-night:hover{cursor:default}
    .widget-checks.four-checks{grid-template-columns:repeat(4,minmax(0,1fr))}.reset-layout-btn{height:39px;justify-content:center}.builtin-kiosk-selection{padding-bottom:4px}.kiosk-bubble-slot{position:relative;min-width:0}.kiosk-bubble-slot>.metric-card{width:100%;margin:0}.kiosk-bubble-stage.layout-grid{display:grid}.kiosk-bubble-stage.layout-free{display:block!important;position:relative;height:var(--kiosk-bubble-stage-height,96px);min-height:var(--kiosk-bubble-stage-height,96px);margin-bottom:0;overflow:hidden}.kiosk-bubble-stage.layout-free .kiosk-bubble-slot{position:absolute;left:var(--kiosk-x,0);top:var(--kiosk-y,0);width:var(--kiosk-w,16%);height:82px}.kiosk-bubble-stage.layout-free .kiosk-bubble-slot>.metric-card{height:100%;min-height:100%}.layout-drag-handle,.layout-resize-handle{display:none;position:absolute;z-index:40;align-items:center;justify-content:center;border:1px solid var(--orange);background:rgba(24,14,0,.94);color:var(--orange);box-shadow:0 0 12px rgba(255,177,27,.25);touch-action:none;user-select:none}.layout-drag-handle ha-icon,.layout-resize-handle ha-icon{width:15px;height:15px}.bubble-layout-handle{top:3px;right:3px;width:25px;height:25px;border-radius:7px}.layout-resize-handle{right:3px;bottom:3px;width:25px;height:25px;border-radius:7px}.flow-layout-handle{top:7px;left:50%;transform:translateX(-50%);padding:5px 9px;border-radius:999px;font-size:8px;gap:5px}.layout-editing .layout-drag-handle,.layout-editing .layout-resize-handle{display:flex}.layout-editing .kiosk-bubble-slot{outline:1px dashed rgba(255,177,27,.75);outline-offset:2px}.layout-editing .kiosk-flow-card{outline:1px dashed rgba(255,177,27,.75);outline-offset:-4px}.layout-edit-btn.active{border-color:var(--orange);color:var(--orange)}.kiosk-flow-card .flow-canvas-v4{transform:translate(var(--flow-offset-x,0),var(--flow-offset-y,0)) scale(var(--flow-scale,1));transform-origin:center center;transition:transform .15s ease}.layout-editing .kiosk-flow-card .flow-canvas-v4{transition:none}
    .kiosk-lovelace-list{margin-top:8px}.kiosk-lovelace-editor{padding:8px}.kiosk-lovelace-slide{flex:1;min-height:0;padding:0;overflow:hidden;border-radius:12px}.kiosk-lovelace-slide iframe{display:block;width:100%;height:100%;min-height:0;border:0;background:#010914}
    @media(max-width:1300px){.overview-widget-layout{grid-template-columns:1fr}.widget-editor-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.kiosk-summary-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.widget-checks.four-checks{grid-template-columns:1fr 1fr}}
    @media(max-width:850px){.widget-editor-grid,.widget-related-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.custom-chart-grid{grid-template-columns:1fr}.widget-checks.three-checks{grid-template-columns:1fr 1fr}.overview-widget-layout{display:block}.overview-widget-settings{margin-bottom:10px}.kiosk-header{align-items:flex-start}.kiosk-header-tools{flex-wrap:wrap;justify-content:flex-end}.kiosk-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.kiosk-flow-card .flow-canvas-v4{min-height:500px!important}.kiosk-status{justify-content:flex-start;overflow-x:auto}.kiosk-selection-grid{grid-template-columns:1fr}.kiosk-summary-grid{grid-template-columns:1fr 1fr}}
    .display-tablet_16_9 .kiosk-summary-grid{grid-template-columns:repeat(var(--summary-columns,2),minmax(0,1fr))}.display-tablet_16_9 .kiosk-metrics .metric-card.custom-bubble{padding:var(--bubble-padding,8px);border-radius:var(--bubble-radius,10px)}.display-tablet_16_9 .kiosk-metrics .metric-card.custom-bubble .custom-bubble-copy>div>strong{font-size:var(--bubble-value-size,19px)}
    @media(max-width:560px){.widget-editor-grid,.widget-related-grid,.widget-checks,.widget-checks.three-checks,.kiosk-settings>.widget-checks{grid-template-columns:1fr}.widget-editor-grid>.full,.widget-related-grid>.full{grid-column:auto}.section-heading{align-items:flex-start}.custom-chart-head>strong{font-size:17px}.custom-chart-foot{flex-direction:column}.chart-series-legend{gap:4px 8px}.matrix-shell.kiosk-active>.content{padding:5px}.kiosk-header{flex-direction:column}.kiosk-header-tools{width:100%;justify-content:flex-start}.kiosk-clock{align-items:flex-start;margin-right:auto}.kiosk-metrics,.kiosk-summary-grid{grid-template-columns:1fr}.kiosk-status span:nth-child(n+4){display:none}.kiosk-profile-footer{align-items:flex-start;flex-direction:column}.bubble-secondary{display:none!important}.bubble-related-list{grid-template-columns:1fr}}
  `; }
}

customElements.define("matrix-energy-center-panel", MatrixEnergyCenterPanel);
