const DOMAIN = "matrix_energy_center";

const ROLE_DEFS = [
  ["home_power", "Pobór domu", "Całkowita chwilowa moc pobierana przez dom. Jeżeli pole pozostanie puste, panel spróbuje wyliczyć ją z bilansu."],
  ["grid_power", "Moc sieci ze znakiem", "Jeden sensor dwukierunkowy. Kierunek dodatni ustawisz poniżej."],
  ["grid_import_energy", "Energia pobrana z sieci", "Narastający licznik energii importowanej, najlepiej kWh i total_increasing."],
  ["grid_export_energy", "Energia oddana do sieci", "Narastający licznik energii eksportowanej, najlepiej kWh i total_increasing."],
  ["pv_power", "Łączna moc PV", "Opcjonalny sensor sumaryczny. Bez niego moc zostanie zsumowana ze stringów i sekcji."],
  ["pv_energy_today", "Produkcja PV dzisiaj", "Dzisiejsza produkcja fotowoltaiki w Wh lub kWh."],
  ["battery_power", "Moc magazynu ze znakiem", "Dwukierunkowa moc ładowania i rozładowania magazynu."],
  ["battery_soc", "SOC magazynu", "Poziom naładowania magazynu w procentach."],
  ["battery_energy", "Energia dostępna w magazynie", "Aktualnie dostępna energia, najlepiej w kWh."],
  ["ev_power", "Moc ładowania EV", "Aktualna moc ładowarki lub samochodu."],
  ["ev_soc", "SOC samochodu", "Poziom baterii samochodu w procentach."],
  ["price_buy", "Cena zakupu", "Aktualna pełna cena zakupu energii, np. z Pstryk."],
  ["price_sell", "Cena sprzedaży", "Aktualna cena oddawania energii do sieci."],
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
    this._view = "overview";
    this._loading = false;
    this._message = "";
    this._lastSample = 0;
    this._history = { home: [], pv: [], grid: [], price: [] };
    this._rendered = false;
  }

  set hass(value) {
    this._hass = value;
    if (!this._rendered) {
      this._bootstrap();
      return;
    }
    this._sampleHistory();
    this._updateLive();
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
      <div class="matrix-shell">
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
        <footer class="statusbar">
          <span><i class="dot ok"></i> Integracja aktywna</span>
          <span data-footer-entities>Encje: --</span>
          <span data-footer-devices>Urządzenia: --</span>
          <span data-footer-strings>Stringi PV: --</span>
          <span class="status-message">${this._esc(this._message)}</span>
        </footer>
      </div>
      ${this._entityDatalist()}
    `;
    this._bindCommonEvents();
    this._bindViewEvents();
    this._updateClock();
    this._updateLive();
    clearInterval(this._clockTimer);
    this._clockTimer = setInterval(() => this._updateClock(), 1000);
  }

  _navButtons() {
    const items = [
      ["overview", "mdi:home-lightning-bolt-outline", "PODSUMOWANIE"],
      ["flows", "mdi:transit-connection-variant", "PRZEPŁYWY"],
      ["pv", "mdi:solar-power-variant", "PV"],
      ["tariff", "mdi:calendar-clock", "CENY / G13"],
      ["devices", "mdi:power-plug-outline", "URZĄDZENIA"],
      ["configuration", "mdi:cog-outline", "KONFIGURACJA"],
      ["diagnostics", "mdi:stethoscope", "DIAGNOSTYKA"],
    ];
    return items.map(([view, icon, label]) => `
      <button class="nav-btn ${this._view === view ? "active" : ""}" data-view="${view}">
        <ha-icon icon="${icon}"></ha-icon><span>${label}</span>
      </button>`).join("");
  }

  _sideButtons() {
    const items = [
      ["overview", "mdi:home-outline", "START"], ["flows", "mdi:swap-horizontal", "PRZEPŁYWY"],
      ["pv", "mdi:white-balance-sunny", "FOTOWOLTAIKA"], ["tariff", "mdi:calendar-clock", "TAURON G13"],
      ["devices", "mdi:power-socket-eu", "ODBIORNIKI"],
      ["configuration", "mdi:tune-variant", "KONFIGURACJA"], ["diagnostics", "mdi:chart-timeline-variant-shimmer", "DIAGNOSTYKA"],
    ];
    return items.map(([view, icon, label]) => `
      <button class="side-btn ${this._view === view ? "active" : ""}" data-view="${view}">
        <ha-icon icon="${icon}"></ha-icon><span>${label}</span>
      </button>`).join("");
  }

  _renderView() {
    switch (this._view) {
      case "flows": return this._renderFlows();
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
    return `
      <section class="hero-row">
        <div><span class="eyebrow">PANEL ZARZĄDZANIA ENERGIĄ</span><h1>${name}</h1><p>Przepływy, źródła, magazyny, EV, ceny i odbiorniki w jednym miejscu.</p></div>
        <div class="mode-chip"><ha-icon icon="mdi:shield-check-outline"></ha-icon><span>TRYB<br><b>${this._config.automation.enabled ? "AUTOMATYCZNY" : "MONITOROWANIE"}</b></span></div>
      </section>
      <section class="metrics-grid">
        ${this._metric("home", "mdi:home-lightning-bolt", "DOM", "cyan")}
        ${this._metric("pv", "mdi:solar-power", "PRODUKCJA PV", "green")}
        ${this._metric("batterySoc", "mdi:battery-high", "MAGAZYN", "lime", "%")}
        ${this._metric("ev", "mdi:car-electric", "ŁADOWANIE EV", "cyan")}
        ${this._metric("grid", "mdi:transmission-tower", "SIEĆ", "purple")}
        ${this._metric("price", "mdi:tag-outline", "CENA ZAKUPU", "orange", this._config.general.currency + "/kWh")}
      </section>
      <section class="dashboard-grid">
        <article class="panel flow-panel">${this._flowDiagram()}</article>
        <article class="panel price-panel">
          <div class="panel-title"><span>CENY ENERGII</span><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="price-values">
            <div><small>ZAKUP</small><strong data-live="price">--</strong><span>${this._esc(this._config.general.currency)}/kWh</span></div>
            <div><small>SPRZEDAŻ</small><strong data-live="priceSell">--</strong><span>${this._esc(this._config.general.currency)}/kWh</span></div>
          </div>
          <div class="spark-wrap"><svg viewBox="0 0 400 130" preserveAspectRatio="none"><path class="gridline" d="M0 25H400 M0 65H400 M0 105H400"></path><path data-spark="price" class="spark purple" d=""></path></svg><small>Rzeczywisty wykres od chwili otwarcia panelu</small></div>
        </article>
        <article class="panel consumers-panel">
          <div class="panel-title"><span>NAJWIĘKSZE ODBIORNIKI — TERAZ</span><button class="link-btn" data-view="devices">ZARZĄDZAJ</button></div>
          <div class="consumer-list" data-consumer-list></div>
        </article>
      </section>
      <section class="bottom-grid">
        ${this._trendPanel("home", "ZUŻYCIE DOMU", "cyan")}
        ${this._trendPanel("pv", "PRODUKCJA PV", "green")}
        ${this._gaugePanel("batterySoc", "MAGAZYN ENERGII", "mdi:battery-charging-high")}
        ${this._gaugePanel("evSoc", "SAMOCHÓD / EV", "mdi:car-electric")}
      </section>`;
  }

  _renderFlows() {
    return `
      <section class="hero-row"><div><span class="eyebrow">PRZEPŁYWY ENERGII</span><h1>Bilans na żywo</h1><p>Kierunki i wartości są wyliczane wyłącznie z przypisanych encji.</p></div></section>
      <article class="panel large-flow">${this._flowDiagram(true)}</article>
      <section class="flow-details">
        ${this._detailCard("gridImport", "Import z sieci", "mdi:transmission-tower-import", "purple")}
        ${this._detailCard("gridExport", "Eksport do sieci", "mdi:transmission-tower-export", "orange")}
        ${this._detailCard("batteryCharge", "Ładowanie magazynu", "mdi:battery-arrow-up", "green")}
        ${this._detailCard("batteryDischarge", "Rozładowanie magazynu", "mdi:battery-arrow-down", "lime")}
        ${this._detailCard("selfSufficiency", "Samowystarczalność na żywo", "mdi:home-percent", "cyan", "%")}
        ${this._detailCard("selfConsumption", "Autokonsumpcja PV na żywo", "mdi:solar-power-variant", "green", "%")}
      </section>`;
  }

  _renderConfiguration() {
    if (!this._isAdmin() && !this._config.permissions.show_configuration_to_non_admin) {
      return `<div class="locked"><ha-icon icon="mdi:shield-lock-outline"></ha-icon><h2>Konfiguracja tylko dla administratora</h2><p>Backend blokuje zapis także wtedy, gdy ktoś ręcznie spróbuje wywołać polecenie.</p></div>`;
    }
    const disabled = this._isAdmin() ? "" : "disabled";
    return `
      <section class="hero-row"><div><span class="eyebrow">PEŁNA KONFIGURACJA</span><h1>Instalacja i mapowanie encji</h1><p>Zmiany są zapisywane lokalnie w pamięci Home Assistant.</p></div>${this._saveBar(disabled)}</section>
      <section class="config-layout">
        <article class="panel config-card">
          <div class="panel-title"><span>DANE INSTALACJI</span><ha-icon icon="mdi:home-edit-outline"></ha-icon></div>
          ${this._field("general.installation_name", "Nazwa instalacji", this._config.general.installation_name, "Np. Dom, Firma, Garaż")}
          ${this._field("general.panel_title", "Nazwa w pasku bocznym", this._config.general.panel_title, "Energy Center")}
          ${this._field("general.currency", "Waluta", this._config.general.currency, "PLN")}
          <label class="check-row"><input type="checkbox" data-path="signs.grid_positive_is_import" ${this._config.signs.grid_positive_is_import ? "checked" : ""} ${disabled}><span><b>Dodatnia moc sieci oznacza import</b><small>Wyłącz, gdy dodatnia wartość sensora oznacza eksport.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="signs.battery_positive_is_charge" ${this._config.signs.battery_positive_is_charge ? "checked" : ""} ${disabled}><span><b>Dodatnia moc baterii oznacza ładowanie</b><small>Wyłącz, gdy dodatnia wartość oznacza rozładowanie.</small></span></label>
        </article>
        <article class="panel config-card">
          <div class="panel-title"><span>MODUŁY</span><ha-icon icon="mdi:view-module-outline"></ha-icon></div>
          <div class="feature-grid">${FEATURE_DEFS.map(([key, label]) => `<label class="feature"><input type="checkbox" data-path="features.${key}" ${this._config.features[key] ? "checked" : ""} ${disabled}><ha-icon icon="${this._featureIcon(key)}"></ha-icon><span>${label}</span></label>`).join("")}</div>
          <hr>
          <label class="check-row"><input type="checkbox" data-path="permissions.show_configuration_to_non_admin" ${this._config.permissions.show_configuration_to_non_admin ? "checked" : ""} ${disabled}><span><b>Pokaż konfigurację zwykłym użytkownikom</b><small>Tryb tylko do odczytu; zapis nadal wymaga administratora.</small></span></label>
          <label class="check-row"><input type="checkbox" data-path="permissions.allow_non_admin_control" ${this._config.permissions.allow_non_admin_control ? "checked" : ""} ${disabled}><span><b>Zezwól zwykłym użytkownikom na sterowanie</b><small>Dotyczy przycisków dodatkowych urządzeń.</small></span></label>
        </article>
      </section>
      <article class="panel mapping-panel">
        <div class="panel-title"><span>GŁÓWNE MAPOWANIE ENCJI</span><ha-icon icon="mdi:source-branch"></ha-icon></div>
        <div class="mapping-grid">${ROLE_DEFS.map(([key, label, description]) => this._entityField(`mappings.${key}`, label, this._config.mappings[key], description, disabled)).join("")}</div>
      </article>
      <article class="panel automation-panel">
        <div class="panel-title"><span>BEZPIECZNA AUTOMATYKA — SZKIELET</span><ha-icon icon="mdi:robot-outline"></ha-icon></div>
        <p class="hint">W wersji 0.2 ustawienia są zapisywane i prezentowane, ale integracja nie steruje jeszcze falownikiem ani EV. Domyślnie obowiązuje tryb monitorowania.</p>
        <div class="four-grid">
          ${this._selectField("automation.mode", "Tryb", this._config.automation.mode, [["monitor_only","Tylko monitoring"],["self_consumption","Autokonsumpcja"],["dynamic_price","Cena dynamiczna"],["manual","Ręczny"]], disabled)}
          ${this._numberField("automation.minimum_battery_soc", "Minimalny SOC magazynu", this._config.automation.minimum_battery_soc, 0, 100, 1, disabled)}
          ${this._numberField("automation.ev_surplus_start_w", "Start EV od nadwyżki [W]", this._config.automation.ev_surplus_start_w, 0, 100000, 100, disabled)}
          ${this._numberField("automation.decision_delay_seconds", "Opóźnienie decyzji [s]", this._config.automation.decision_delay_seconds, 0, 86400, 10, disabled)}
        </div>
      </article>`;
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
    return `<article class="panel string-card">
      <div class="string-head">
        <div><span class="tag">STRING ${index + 1}</span><h2>${this._esc(item.name)}</h2><p>${this._esc(item.description || "Bez opisu")}</p></div>
        <div class="head-actions"><button data-action="add-section" data-index="${index}" ${disabled}><ha-icon icon="mdi:plus-box-multiple-outline"></ha-icon>SEKCJA</button><button class="danger" data-action="remove-string" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>
      </div>
      <div class="four-grid">
        ${this._field(`pv_strings.${index}.name`, "Nazwa stringu", item.name, "String 1", disabled)}
        ${this._numberField(`pv_strings.${index}.capacity_kw`, "Moc szczytowa [kWp]", item.capacity_kw, 0, 100000, 0.01, disabled)}
        ${this._entityField(`pv_strings.${index}.power_entity`, "Sensor mocy stringu", item.power_entity, "Jeżeli brak osobnych sensorów sekcji.", disabled)}
        ${this._entityField(`pv_strings.${index}.energy_entity`, "Sensor energii stringu", item.energy_entity, "Wh lub kWh.", disabled)}
      </div>
      ${this._textarea(`pv_strings.${index}.description`, "Opis stringu", item.description, "Informacje o MPPT, falowniku, przewodach lub lokalizacji.", disabled)}
      <div class="section-grid">${(item.sections || []).map((section, sIndex) => this._pvSectionCard(section, index, sIndex, disabled)).join("") || `<div class="mini-empty">Brak sekcji. String może działać jako jedna pozycja.</div>`}</div>
    </article>`;
  }

  _pvSectionCard(section, index, sIndex, disabled) {
    return `<div class="pv-section">
      <div class="section-title"><span>SEKCJA ${sIndex + 1}</span><button class="icon-btn danger" data-action="remove-section" data-index="${index}" data-section="${sIndex}" ${disabled}><ha-icon icon="mdi:close"></ha-icon></button></div>
      ${this._field(`pv_strings.${index}.sections.${sIndex}.name`, "Nazwa", section.name, "Połać południowa", disabled)}
      ${this._field(`pv_strings.${index}.sections.${sIndex}.area`, "Obszar", section.area, "Dach / Garaż / Balkon", disabled)}
      <div class="two-grid">
        ${this._selectField(`pv_strings.${index}.sections.${sIndex}.orientation`, "Kierunek", section.orientation, ORIENTATIONS.map(v => [v, v]), disabled)}
        ${this._numberField(`pv_strings.${index}.sections.${sIndex}.tilt`, "Nachylenie [°]", section.tilt, 0, 90, 1, disabled)}
        ${this._numberField(`pv_strings.${index}.sections.${sIndex}.panel_count`, "Liczba paneli", section.panel_count, 0, 10000, 1, disabled)}
        ${this._numberField(`pv_strings.${index}.sections.${sIndex}.peak_power_kw`, "Moc [kWp]", section.peak_power_kw, 0, 100000, 0.01, disabled)}
      </div>
      ${this._numberField(`pv_strings.${index}.sections.${sIndex}.share_percent`, "Udział stringu [%]", section.share_percent, 0, 100, 0.1, disabled)}
      ${this._entityField(`pv_strings.${index}.sections.${sIndex}.power_entity`, "Osobny sensor mocy", section.power_entity, "Opcjonalny. Gdy pusty, można użyć udziału procentowego.", disabled)}
      ${this._entityField(`pv_strings.${index}.sections.${sIndex}.energy_entity`, "Osobny sensor energii", section.energy_entity, "Opcjonalny.", disabled)}
      ${this._textarea(`pv_strings.${index}.sections.${sIndex}.description`, "Opis sekcji", section.description, "Cienie, optymalizatory, typ modułów…", disabled)}
    </div>`;
  }

  _renderDevices() {
    const disabled = this._isAdmin() ? "" : "disabled";
    const devices = this._config.devices || [];
    return `
      <section class="hero-row"><div><span class="eyebrow">DODATKOWE URZĄDZENIA</span><h1>Odbiorniki i podliczniki</h1><p>Zmywarki, pralki, kuchenki, pompy ciepła, serwery i dowolne własne urządzenia.</p></div>${this._isAdmin() ? `<button class="primary-btn" data-action="add-device"><ha-icon icon="mdi:plus"></ha-icon>DODAJ URZĄDZENIE</button>` : ""}</section>
      <section class="device-live-grid" data-device-live-grid>${devices.map((d, i) => this._deviceLiveCard(d, i)).join("") || this._emptyState("mdi:power-plug-off-outline", "Brak dodatkowych urządzeń", "Dodaj urządzenie i przypisz jego sensor mocy, energii oraz opcjonalną encję sterującą.")}</section>
      <section class="cards-stack">${devices.map((item, index) => this._deviceConfigCard(item, index, disabled)).join("")}</section>
      ${this._isAdmin() ? `<div class="sticky-save">${this._saveBar(disabled)}</div>` : ""}`;
  }

  _deviceLiveCard(item, index) {
    return `<article class="device-live accent-${this._esc(item.accent || "cyan")}">
      <ha-icon icon="${this._escAttr(item.icon || "mdi:flash")}"></ha-icon>
      <div><small>${this._esc(CATEGORY_OPTIONS.find(v => v[0] === item.category)?.[1] || item.category)}</small><h3>${this._esc(item.name)}</h3><strong data-device-power="${index}">--</strong><span>W</span></div>
      ${item.control_entity ? `<button class="control-btn" data-action="control-device" data-index="${index}"><ha-icon icon="mdi:power"></ha-icon></button>` : ""}
    </article>`;
  }

  _deviceConfigCard(item, index, disabled) {
    return `<article class="panel device-config">
      <div class="string-head"><div><span class="tag">URZĄDZENIE ${index + 1}</span><h2>${this._esc(item.name)}</h2><p>${this._esc(item.description || "Bez opisu")}</p></div><button class="danger" data-action="remove-device" data-index="${index}" ${disabled}><ha-icon icon="mdi:delete-outline"></ha-icon></button></div>
      <div class="four-grid">
        ${this._field(`devices.${index}.name`, "Nazwa", item.name, "Zmywarka", disabled)}
        ${this._selectField(`devices.${index}.category`, "Kategoria", item.category, CATEGORY_OPTIONS, disabled)}
        ${this._field(`devices.${index}.area`, "Obszar", item.area, "Kuchnia", disabled)}
        ${this._field(`devices.${index}.icon`, "Ikona MDI", item.icon, "mdi:dishwasher", disabled)}
        ${this._entityField(`devices.${index}.power_entity`, "Sensor mocy", item.power_entity, "W lub kW.", disabled)}
        ${this._entityField(`devices.${index}.energy_entity`, "Sensor energii", item.energy_entity, "Wh lub kWh.", disabled)}
        ${this._entityField(`devices.${index}.control_entity`, "Encja sterowania", item.control_entity, "Np. switch, light, input_boolean lub button.", disabled)}
        ${this._selectField(`devices.${index}.accent`, "Akcent", item.accent, [["cyan","Cyan"],["green","Zielony"],["lime","Limonkowy"],["orange","Pomarańczowy"],["purple","Fioletowy"]], disabled)}
      </div>
      ${this._textarea(`devices.${index}.description`, "Opis", item.description, "Co urządzenie mierzy, kiedy pracuje i jak jest sterowane.", disabled)}
      <div class="two-grid checks"><label class="check-row"><input type="checkbox" data-path="devices.${index}.enabled" ${item.enabled ? "checked" : ""} ${disabled}><span><b>Aktywne</b><small>Pokaż urządzenie w panelu.</small></span></label><label class="check-row"><input type="checkbox" data-path="devices.${index}.include_in_home_total" ${item.include_in_home_total ? "checked" : ""} ${disabled}><span><b>Wliczaj do domu</b><small>Znacznik do późniejszych raportów kosztowych.</small></span></label></div>
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

  _flowDiagram(large = false) {
    return `<div class="panel-title"><span>PRZEPŁYW ENERGII — NA ŻYWO</span><small>Wartości rzeczywiste</small></div>
      <div class="flow-canvas ${large ? "large" : ""}">
        <div class="flow-node pv-node"><ha-icon icon="mdi:solar-power"></ha-icon><b>PV</b><strong data-live="pv">--</strong><small>kW</small></div>
        <div class="flow-node grid-node"><ha-icon icon="mdi:transmission-tower"></ha-icon><b>SIEĆ</b><strong data-live="gridSigned">--</strong><small>kW</small></div>
        <div class="flow-node home-node"><ha-icon icon="mdi:home-lightning-bolt-outline"></ha-icon><b>DOM</b><strong data-live="home">--</strong><small>kW</small></div>
        <div class="flow-node battery-node"><ha-icon icon="mdi:battery-charging-high"></ha-icon><b>MAGAZYN</b><strong data-live="battery">--</strong><small>kW · <span data-live="batterySoc">--</span>%</small></div>
        <div class="flow-node ev-node"><ha-icon icon="mdi:car-electric"></ha-icon><b>EV</b><strong data-live="ev">--</strong><small>kW · <span data-live="evSoc">--</span>%</small></div>
        <svg class="flow-lines" viewBox="0 0 1000 620" preserveAspectRatio="none">
          <path class="connector pv-flow" d="M500 145 L500 265"></path>
          <path class="connector grid-flow" d="M260 310 L420 310"></path>
          <path class="connector battery-flow" d="M580 310 L740 310"></path>
          <path class="connector ev-flow" d="M500 355 L500 485"></path>
        </svg>
        <span class="flow-label pv-label" data-live="pv">--</span>
        <span class="flow-label grid-label" data-live="gridFlow">--</span>
        <span class="flow-label battery-label" data-live="batteryFlow">--</span>
        <span class="flow-label ev-label" data-live="ev">--</span>
      </div>`;
  }

  _metric(key, icon, label, accent, unit = "kW") {
    return `<article class="metric-card ${accent}"><ha-icon icon="${icon}"></ha-icon><div><small>${label}</small><strong data-live="${key}">--</strong><span>${unit}</span></div><svg viewBox="0 0 100 30" preserveAspectRatio="none"><path data-spark="${key === "batterySoc" || key === "ev" ? "home" : key}" class="spark ${accent}" d=""></path></svg></article>`;
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

  _textarea(path, label, value, placeholder = "", disabled = "") {
    return `<label class="field full"><span>${label}</span><textarea data-path="${path}" placeholder="${this._escAttr(placeholder)}" ${disabled}>${this._esc(value ?? "")}</textarea></label>`;
  }

  _numberField(path, label, value, min, max, step, disabled = "") {
    return `<label class="field"><span>${label}</span><input type="number" data-path="${path}" value="${this._escAttr(value ?? 0)}" min="${min}" max="${max}" step="${step}" ${disabled}></label>`;
  }

  _selectField(path, label, value, options, disabled = "") {
    return `<label class="field"><span>${label}</span><select data-path="${path}" ${disabled}>${options.map(([v, l]) => `<option value="${this._escAttr(v)}" ${String(value) === String(v) ? "selected" : ""}>${this._esc(l)}</option>`).join("")}</select></label>`;
  }

  _entityField(path, label, value, description, disabled = "") {
    return `<label class="field entity-field"><span>${label}</span><input type="text" list="matrix-energy-entities" data-path="${path}" value="${this._escAttr(value || "")}" placeholder="sensor.example" ${disabled}><small>${description}</small></label>`;
  }

  _entityDatalist() {
    const entities = Object.keys(this._hass?.states || {}).filter(id => ["sensor","binary_sensor","switch","input_boolean","number","select","button","light","climate"].includes(id.split(".")[0])).sort();
    return `<datalist id="matrix-energy-entities">${entities.map(id => `<option value="${this._escAttr(id)}">${this._esc(this._hass.states[id]?.attributes?.friendly_name || "")}</option>`).join("")}</datalist>`;
  }

  _emptyState(icon, title, description) {
    return `<div class="empty"><ha-icon icon="${icon}"></ha-icon><h3>${title}</h3><p>${description}</p></div>`;
  }

  _featureIcon(key) {
    return ({grid:"mdi:transmission-tower",pv:"mdi:solar-power",battery:"mdi:battery-high",ev:"mdi:car-electric",prices:"mdi:cash-multiple",appliances:"mdi:power-plug",automation:"mdi:robot"})[key] || "mdi:puzzle-outline";
  }

  _bindCommonEvents() {
    this.shadowRoot.querySelectorAll("[data-view]").forEach(el => el.addEventListener("click", () => {
      this._view = el.dataset.view;
      this._message = "";
      this._render();
    }));
    this.shadowRoot.querySelector("[data-action='toggle-nav']")?.addEventListener("click", () => this.shadowRoot.querySelector(".sidebar")?.classList.toggle("open"));
    this.shadowRoot.querySelectorAll("[data-path]").forEach(el => {
      const event = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(event, () => {
        let value = el.type === "checkbox" ? el.checked : el.type === "number" ? Number(el.value) : el.value;
        this._setPath(this._config, el.dataset.path, value);
      });
    });
  }

  _bindViewEvents() {
    this.shadowRoot.querySelectorAll("[data-action]").forEach(el => {
      const action = el.dataset.action;
      if (["toggle-nav", "import-config"].includes(action)) return;
      el.addEventListener("click", async () => {
        if (action === "save-config") await this._saveConfig();
        if (action === "apply-g13-preset") this._applyTauronG13Preset();
        if (action === "add-string") this._addString();
        if (action === "remove-string") this._removeString(Number(el.dataset.index));
        if (action === "add-section") this._addSection(Number(el.dataset.index));
        if (action === "remove-section") this._removeSection(Number(el.dataset.index), Number(el.dataset.section));
        if (action === "add-device") this._addDevice();
        if (action === "remove-device") this._removeDevice(Number(el.dataset.index));
        if (action === "export-config") this._exportConfig();
        if (action === "control-device") await this._controlDevice(Number(el.dataset.index));
        if (action === "test-entity") await this._testEntity(el.dataset.entity);
        if (action === "refresh-runtime") await this._refreshRuntime();
      });
    });
    const input = this.shadowRoot.querySelector("input[data-action='import-config']");
    input?.addEventListener("change", event => this._importConfig(event));
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
    this._config.pv_strings.push({ id: this._id("string"), name: `String ${n}`, description: "", power_entity: "", energy_entity: "", capacity_kw: 0, sections: [] });
    this._render();
  }

  _removeString(index) { if (this._isAdmin()) { this._config.pv_strings.splice(index, 1); this._render(); } }

  _addSection(index) {
    if (!this._isAdmin()) return;
    const sections = this._config.pv_strings[index].sections ||= [];
    sections.push({ id: this._id("section"), name: `Sekcja ${sections.length + 1}`, description: "", area: "", orientation: "unknown", tilt: 0, panel_count: 0, peak_power_kw: 0, share_percent: 0, power_entity: "", energy_entity: "" });
    this._render();
  }

  _removeSection(index, section) { if (this._isAdmin()) { this._config.pv_strings[index].sections.splice(section, 1); this._render(); } }

  _addDevice() {
    if (!this._isAdmin()) return;
    const n = this._config.devices.length + 1;
    this._config.devices.push({ id: this._id("device"), name: `Urządzenie ${n}`, description: "", category: "other", area: "", icon: "mdi:flash", accent: "cyan", power_entity: "", energy_entity: "", control_entity: "", enabled: true, include_in_home_total: true });
    this._render();
  }

  _removeDevice(index) { if (this._isAdmin()) { this._config.devices.splice(index, 1); this._render(); } }

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
      this._message = "Ta encja wymaga dedykowanego sterowania — w wersji 0.2 obsługiwane są switch, input_boolean, light i button.";
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

  _updateMessage() { const el = this.shadowRoot.querySelector(".status-message"); if (el) el.textContent = this._message; }

  _runtimeValues() {
    const m = this._config?.mappings || {};
    const signs = this._config?.signs || {};
    let pv = this._readPower(m.pv_power);
    if (pv == null) {
      let total = 0, found = false;
      for (const string of this._config.pv_strings || []) {
        let value = this._readPower(string.power_entity);
        if (value != null) { total += value; found = true; continue; }
        for (const section of string.sections || []) {
          value = this._readPower(section.power_entity);
          if (value != null) { total += value; found = true; }
        }
      }
      pv = found ? total : null;
    }
    const gridSigned = this._readPower(m.grid_power);
    const gridImport = gridSigned == null ? 0 : signs.grid_positive_is_import ? Math.max(gridSigned, 0) : Math.max(-gridSigned, 0);
    const gridExport = gridSigned == null ? 0 : signs.grid_positive_is_import ? Math.max(-gridSigned, 0) : Math.max(gridSigned, 0);
    const batterySigned = this._readPower(m.battery_power);
    const batteryCharge = batterySigned == null ? 0 : signs.battery_positive_is_charge ? Math.max(batterySigned, 0) : Math.max(-batterySigned, 0);
    const batteryDischarge = batterySigned == null ? 0 : signs.battery_positive_is_charge ? Math.max(-batterySigned, 0) : Math.max(batterySigned, 0);
    let home = this._readPower(m.home_power);
    if (home == null) home = Math.max(0, (pv || 0) + gridImport + batteryDischarge - gridExport - batteryCharge);
    const ev = this._readPower(m.ev_power) || 0;
    const batterySoc = this._readNumber(m.battery_soc);
    const evSoc = this._readNumber(m.ev_soc);
    const backend = this._runtime || {};
    const tariffRuntime = backend.tariff || {};
    let price = this._readNumber(m.price_buy);
    if (price == null) price = backend.price_buy ?? backend.tariff_price_total ?? tariffRuntime.total_price ?? null;
    let priceSell = this._readNumber(m.price_sell);
    if (priceSell == null) priceSell = backend.price_sell ?? null;
    const selfSufficiency = home > 0 ? Math.max(0, Math.min(100, (1 - gridImport / home) * 100)) : null;
    const selfConsumption = pv > 0 ? Math.max(0, Math.min(100, ((pv - gridExport) / pv) * 100)) : null;
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
    this.shadowRoot.querySelectorAll("[data-gauge]").forEach(el => { const val = Number(v[el.dataset.gauge] ?? 0); el.style.setProperty("--value", Math.max(0, Math.min(100, val))); });
    this.shadowRoot.querySelectorAll("[data-gauge-status]").forEach(el => { const val = v[el.dataset.gaugeStatus]; el.textContent = val == null ? "Brak danych" : val < 20 ? "Niski poziom" : val < 80 ? "Poziom roboczy" : "Wysoki poziom"; });
    this._updateDevicePowers();
    this._updateConsumers();
    this._drawSparklines();
    const count = Object.keys(this._hass?.states || {}).length;
    const footerEntities = this.shadowRoot.querySelector("[data-footer-entities]"); if (footerEntities) footerEntities.textContent = `Encje HA: ${count}`;
    const footerDevices = this.shadowRoot.querySelector("[data-footer-devices]"); if (footerDevices) footerDevices.textContent = `Urządzenia: ${this._config.devices.length}`;
    const footerStrings = this.shadowRoot.querySelector("[data-footer-strings]"); if (footerStrings) footerStrings.textContent = `Stringi PV: ${this._config.pv_strings.length}`;
  }

  _updateDevicePowers() {
    (this._config.devices || []).forEach((device, index) => {
      const el = this.shadowRoot.querySelector(`[data-device-power="${index}"]`);
      if (el) el.textContent = this._num(this._readPower(device.power_entity), 0);
    });
  }

  _updateConsumers() {
    const container = this.shadowRoot.querySelector("[data-consumer-list]");
    if (!container) return;
    const devices = (this._config.devices || []).filter(d => d.enabled).map(d => ({ ...d, power: this._readPower(d.power_entity) || 0 })).sort((a,b) => b.power - a.power).slice(0, 8);
    const max = Math.max(...devices.map(d => d.power), 1);
    container.innerHTML = devices.length ? devices.map(d => `<div class="consumer"><span>${this._esc(d.name)}</span><div><i style="width:${Math.max(2, d.power / max * 100)}%"></i></div><b>${this._kw(d.power)} kW</b></div>`).join("") : `<div class="mini-empty">Dodaj urządzenia z sensorami mocy.</div>`;
  }

  _sampleHistory(force = false) {
    const now = Date.now();
    if (!force && now - this._lastSample < 5000) return;
    this._lastSample = now;
    const v = this._runtimeValues();
    const add = (key, value) => { if (value != null && Number.isFinite(value)) { this._history[key].push(value); if (this._history[key].length > 90) this._history[key].shift(); } };
    add("home", v.home || 0); add("pv", v.pv || 0); add("grid", v.gridSigned || 0); add("price", v.price || 0);
  }

  _drawSparklines() {
    this.shadowRoot.querySelectorAll("[data-spark]").forEach(path => {
      const data = this._history[path.dataset.spark] || [];
      path.setAttribute("d", this._sparkPath(data, 400, path.closest(".metric-card") ? 30 : 130));
    });
  }

  _sparkPath(data, width, height) {
    if (!data.length) return "";
    const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
    return data.map((value, index) => `${index ? "L" : "M"}${(index / Math.max(1, data.length - 1) * width).toFixed(1)} ${(height - 5 - ((value - min) / range) * (height - 10)).toFixed(1)}`).join(" ");
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
    const clock = this.shadowRoot.querySelector("[data-clock]"); if (clock) clock.textContent = now.toLocaleTimeString();
    const date = this.shadowRoot.querySelector("[data-date]"); if (date) date.textContent = now.toLocaleDateString(undefined, { day:"2-digit", month:"short", year:"numeric" }).toUpperCase();
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
    .metrics-grid{display:grid;grid-template-columns:repeat(6,minmax(150px,1fr));gap:9px;margin-bottom:10px}.metric-card{position:relative;height:94px;border:1px solid rgba(32,234,255,.3);background:linear-gradient(145deg,rgba(3,20,40,.95),rgba(2,10,22,.96));padding:13px;display:flex;align-items:flex-start;gap:10px;overflow:hidden}.metric-card>ha-icon{color:var(--cyan)}.metric-card small{display:block;color:#8eb5c3;font-size:9px}.metric-card strong{font:24px monospace;display:inline-block;margin-top:5px}.metric-card span{font-size:10px;margin-left:4px}.metric-card svg{position:absolute;left:0;right:0;bottom:0;width:100%;height:30px;opacity:.6}.metric-card.green{border-color:rgba(82,255,98,.36)}.metric-card.green>ha-icon,.metric-card.green strong{color:var(--green)}.metric-card.lime>ha-icon,.metric-card.lime strong{color:var(--lime)}.metric-card.purple>ha-icon,.metric-card.purple strong{color:var(--purple)}.metric-card.orange>ha-icon,.metric-card.orange strong{color:var(--orange)}
    .dashboard-grid{display:grid;grid-template-columns:minmax(580px,1.8fr) minmax(300px,.9fr);grid-template-rows:230px 210px;gap:10px}.flow-panel{grid-row:1/3}.price-panel{padding:0 10px 10px}.consumers-panel{padding:0 10px 10px}.bottom-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px}.trend-panel,.gauge-panel{height:220px;padding:0 12px 12px}.trend-panel svg{width:100%;height:135px}.trend-panel>small,.spark-wrap>small{color:#567b8b;font-size:9px}.gridline{fill:none;stroke:rgba(100,200,255,.12);stroke-width:1}.spark{fill:none;stroke:var(--cyan);stroke-width:2;filter:drop-shadow(0 0 5px rgba(32,234,255,.7))}.spark.green{stroke:var(--green)}.spark.purple{stroke:var(--purple)}.spark.orange{stroke:var(--orange)}.spark.lime{stroke:var(--lime)}
    .price-values{display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(185,92,255,.28)}.price-values>div{padding:12px}.price-values>div+div{border-left:1px solid rgba(185,92,255,.22)}.price-values small{display:block;color:#a78ac1;font-size:9px}.price-values strong{font:24px monospace;color:#fff}.price-values span{font-size:9px;color:#8ea8b7}.spark-wrap svg{width:100%;height:95px}.consumer-list{display:grid;gap:9px;padding:8px 6px}.consumer{display:grid;grid-template-columns:110px 1fr 65px;align-items:center;gap:8px;font-size:9px}.consumer>div{height:7px;background:rgba(50,120,150,.18)}.consumer i{display:block;height:100%;background:linear-gradient(90deg,var(--cyan2),var(--cyan));box-shadow:0 0 8px rgba(32,234,255,.45)}.consumer b{text-align:right;color:var(--cyan);font-family:monospace}.link-btn,.test-btn{border:1px solid rgba(32,234,255,.35);background:rgba(0,110,170,.14);color:var(--cyan);font-size:9px;padding:5px 8px}
    .flow-canvas{height:385px;position:relative;margin:0 10px 10px;background:radial-gradient(circle at center,rgba(0,170,255,.12),transparent 45%),linear-gradient(rgba(0,220,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.035) 1px,transparent 1px);background-size:auto,25px 25px,25px 25px}.flow-canvas.large{height:620px}.flow-node{position:absolute;width:130px;height:125px;border:1px solid var(--cyan);background:rgba(1,10,20,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2;box-shadow:0 0 25px rgba(32,234,255,.14),inset 0 0 25px rgba(32,234,255,.06);clip-path:polygon(15px 0,calc(100% - 15px) 0,100% 15px,100% calc(100% - 15px),calc(100% - 15px) 100%,15px 100%,0 calc(100% - 15px),0 15px)}.flow-node ha-icon{width:34px;height:34px;color:var(--cyan);filter:drop-shadow(0 0 8px currentColor)}.flow-node b{font-size:12px;margin-top:6px}.flow-node strong{font:22px monospace;color:var(--cyan);margin-top:4px}.flow-node small{font-size:9px;color:#94b5c0}.pv-node{left:calc(50% - 65px);top:4px;border-color:var(--green)}.pv-node ha-icon,.pv-node strong{color:var(--green)}.grid-node{left:4%;top:calc(50% - 62px);border-color:var(--purple)}.grid-node ha-icon,.grid-node strong{color:var(--purple)}.home-node{left:calc(50% - 65px);top:calc(50% - 62px);border-radius:50%;clip-path:none;border-width:2px}.battery-node{right:4%;top:calc(50% - 62px);border-color:var(--lime)}.battery-node ha-icon,.battery-node strong{color:var(--lime)}.ev-node{left:calc(50% - 65px);bottom:4px}.flow-lines{position:absolute;inset:0;width:100%;height:100%;z-index:1}.connector{fill:none;stroke:var(--cyan);stroke-width:5;stroke-dasharray:8 12;animation:flow 1s linear infinite;filter:drop-shadow(0 0 5px currentColor)}.pv-flow{stroke:var(--green)}.grid-flow{stroke:var(--purple)}.battery-flow{stroke:var(--lime)}@keyframes flow{to{stroke-dashoffset:-20}}.flow-label{position:absolute;z-index:3;font:10px monospace;color:white;background:#020a12;padding:3px 6px;border:1px solid rgba(32,234,255,.3)}.pv-label{left:53%;top:27%}.grid-label{left:28%;top:47%}.battery-label{right:27%;top:47%}.ev-label{left:53%;bottom:25%}
    .gauge{--value:0;width:130px;height:130px;border-radius:50%;margin:8px auto;background:conic-gradient(var(--cyan) calc(var(--value)*1%),rgba(30,80,100,.22) 0);display:grid;place-items:center;box-shadow:0 0 20px rgba(32,234,255,.18)}.gauge:before{content:"";width:104px;height:104px;border-radius:50%;background:#030d17;position:absolute}.gauge>div{z-index:1}.gauge strong{font:27px monospace}.gauge span{font-size:11px}.gauge-panel p{text-align:center;color:#75a0ae;font-size:10px}
    .flow-details,.pv-summary{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:10px}.detail-card{min-height:92px;border:1px solid rgba(32,234,255,.3);background:rgba(2,14,28,.9);display:flex;align-items:center;gap:12px;padding:15px}.detail-card ha-icon{width:30px;height:30px;color:var(--cyan)}.detail-card small{display:block;color:#7fa7b5;font-size:9px}.detail-card strong{font:22px monospace;color:white}.detail-card span{font-size:9px;color:#8eb3c0}.detail-card.green ha-icon,.detail-card.green strong{color:var(--green)}.detail-card.lime ha-icon,.detail-card.lime strong{color:var(--lime)}.detail-card.purple ha-icon,.detail-card.purple strong{color:var(--purple)}.detail-card.orange ha-icon,.detail-card.orange strong{color:var(--orange)}.large-flow{padding:4px 10px 10px}
    .tariff-live-grid{display:grid;grid-template-columns:1.35fr repeat(4,1fr);gap:10px;margin-bottom:10px}.tariff-zone-card{min-height:118px;border:1px solid rgba(32,234,255,.6);background:radial-gradient(circle at 50% 15%,rgba(0,220,255,.2),transparent 65%),rgba(2,15,30,.94);display:grid;grid-template-columns:44px 1fr;grid-template-rows:auto 1fr auto;align-items:center;padding:15px;box-shadow:0 0 22px rgba(0,210,255,.16),inset 0 0 24px rgba(0,160,255,.08)}.tariff-zone-card small{grid-column:1/-1;color:var(--cyan);font-size:9px;font-weight:900;letter-spacing:1px}.tariff-zone-card ha-icon{width:34px;height:34px;color:var(--cyan);filter:drop-shadow(0 0 8px var(--cyan))}.tariff-zone-card strong{font-size:17px;color:white}.tariff-zone-card span{grid-column:1/-1;color:#8ec1cf;font-size:10px}.tariff-warning{padding:13px 16px;margin-bottom:10px;border-color:rgba(255,177,27,.55);color:var(--orange);display:flex;align-items:center;gap:10px}.season-schedule-grid,.price-config-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:10px}.price-config-grid{grid-template-columns:repeat(2,1fr)}.schedule-card{padding:8px 14px 14px}.schedule-row{display:grid;grid-template-columns:120px 1fr;gap:12px;padding:11px;border-bottom:1px solid rgba(32,234,255,.12);font-size:10px}.schedule-row b{font-family:monospace}.schedule-row.morning b{color:var(--cyan)}.schedule-row.afternoon b{color:var(--orange)}.schedule-row.cheap b{color:var(--green)}.config-layout{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}.config-card,.mapping-panel,.automation-panel,.string-card,.device-config,.table-panel,.json-panel{padding:8px 14px 16px}.mapping-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.four-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.three-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.two-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.field{display:flex;flex-direction:column;gap:5px;margin-top:8px}.field>span{font-size:10px;color:#a7c9d5;font-weight:700}.field input,.field select,.field textarea{width:100%;border:1px solid rgba(32,234,255,.28);background:#03101e;color:#effcff;padding:10px 11px;outline:none}.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--cyan);box-shadow:0 0 10px rgba(32,234,255,.18)}.field textarea{min-height:72px;resize:vertical}.field small{font-size:8px;line-height:1.4;color:#638a99}.field.full{grid-column:1/-1}.feature-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.feature{display:flex;align-items:center;gap:9px;border:1px solid rgba(32,234,255,.2);padding:10px;background:rgba(0,80,120,.08);font-size:10px}.feature ha-icon{color:var(--cyan)}input[type=checkbox]{accent-color:var(--cyan)}.check-row{display:flex;align-items:flex-start;gap:10px;padding:10px 0}.check-row span{display:flex;flex-direction:column}.check-row b{font-size:10px}.check-row small{font-size:8px;color:#6d94a2;margin-top:3px}.config-card hr{border:0;border-top:1px solid rgba(32,234,255,.15)}.hint{color:#7ea6b4;font-size:10px;line-height:1.6}.save-actions{display:flex;gap:8px;flex-wrap:wrap}.primary-btn,.secondary-btn,.head-actions button,.danger,.icon-btn{border:1px solid rgba(32,234,255,.55);background:linear-gradient(135deg,rgba(0,220,255,.23),rgba(0,80,160,.16));color:white;padding:9px 12px;display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:800;box-shadow:0 0 13px rgba(0,200,255,.12)}.secondary-btn{background:rgba(0,50,80,.22);color:var(--cyan)}.danger{border-color:rgba(255,70,100,.45)!important;color:#ff6b86!important;background:rgba(255,30,70,.08)!important}.file-btn{position:relative;cursor:pointer}.file-btn input{position:absolute;inset:0;opacity:0;cursor:pointer}.sticky-save{position:sticky;bottom:5px;display:flex;justify-content:flex-end;padding-top:10px;z-index:5}
    .cards-stack{display:grid;gap:10px}.string-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}.string-head h2{margin:4px 0;font-size:18px}.string-head p{margin:0;color:#7297a5;font-size:10px}.tag{font-size:8px;color:var(--cyan);letter-spacing:1px;font-weight:900}.head-actions{display:flex;gap:6px}.section-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}.pv-section{border:1px solid rgba(82,255,98,.25);background:rgba(2,25,25,.42);padding:11px}.section-title{display:flex;justify-content:space-between;color:var(--green);font-size:9px;font-weight:900}.icon-btn{padding:3px}.mini-empty,.empty{color:#6e94a2;text-align:center;padding:25px;font-size:10px;border:1px dashed rgba(32,234,255,.2)}.empty{grid-column:1/-1;padding:60px}.empty ha-icon{width:55px;height:55px;color:var(--cyan);opacity:.6}.empty h3{color:white}.pv-summary{grid-template-columns:repeat(4,1fr);margin-bottom:10px}
    .device-live-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:10px}.device-live{min-height:118px;border:1px solid rgba(32,234,255,.3);background:rgba(2,15,30,.92);padding:13px;display:flex;align-items:center;gap:12px;position:relative}.device-live>ha-icon{width:34px;height:34px;color:var(--cyan)}.device-live small{font-size:8px;color:#6f94a2}.device-live h3{font-size:12px;margin:3px 0}.device-live strong{font:19px monospace;color:var(--cyan)}.device-live span{font-size:9px}.control-btn{position:absolute;right:7px;top:7px;border:1px solid rgba(32,234,255,.25);background:rgba(0,100,150,.12);color:var(--cyan);padding:5px}.accent-green>ha-icon,.accent-green strong{color:var(--green)}.accent-lime>ha-icon,.accent-lime strong{color:var(--lime)}.accent-orange>ha-icon,.accent-orange strong{color:var(--orange)}.accent-purple>ha-icon,.accent-purple strong{color:var(--purple)}.checks{margin-top:8px}
    .diagnostics-summary{display:grid;grid-template-columns:repeat(4,1fr);margin-bottom:10px}.diagnostics-summary>div{padding:18px;border-right:1px solid rgba(32,234,255,.15)}.diagnostics-summary small{display:block;color:#729aa8;font-size:9px}.diagnostics-summary strong{font:24px monospace;color:var(--cyan)}.table-scroll{overflow:auto}table{width:100%;border-collapse:collapse;font-size:10px}th,td{text-align:left;padding:10px;border-bottom:1px solid rgba(32,234,255,.12)}th{color:var(--cyan);font-size:9px}code{color:#a6d8e5}.status-pill{padding:4px 7px;border:1px solid;font-size:8px}.status-pill.ok{color:var(--green);border-color:rgba(82,255,98,.35)}.status-pill.bad{color:#ff6b86;border-color:rgba(255,70,100,.35)}.status-pill.neutral{color:#829ba5;border-color:rgba(130,155,165,.3)}.json-panel{margin-top:10px}.json-panel pre{max-height:420px;overflow:auto;background:#020912;border:1px solid rgba(32,234,255,.15);padding:12px;color:#89dce9;font:10px/1.5 monospace}.locked{min-height:65vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#7d9daa}.locked ha-icon{width:70px;height:70px;color:var(--cyan)}.locked h2{color:white}.boot{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;background:#01060d;color:white}.boot span{color:#7da0ae}.boot-ring{width:70px;height:70px;border:2px solid rgba(32,234,255,.2);border-top-color:var(--cyan);border-radius:50%;animation:spin 1s linear infinite;box-shadow:0 0 25px rgba(32,234,255,.2)}@keyframes spin{to{transform:rotate(360deg)}}.error b{color:#ff6680}
    @media(max-width:1300px){.metrics-grid{grid-template-columns:repeat(3,1fr)}.dashboard-grid{grid-template-columns:1fr}.flow-panel{grid-row:auto}.bottom-grid{grid-template-columns:repeat(2,1fr)}.mapping-grid{grid-template-columns:repeat(2,1fr)}.section-grid{grid-template-columns:repeat(2,1fr)}.device-live-grid{grid-template-columns:repeat(3,1fr)}.top-nav .nav-btn{min-width:90px;padding:0 8px}.nav-btn span{display:none}}
    @media(max-width:850px){.matrix-shell{grid-template-columns:1fr;grid-template-rows:58px 1fr 40px;grid-template-areas:"top" "main" "footer"}.matrix-shell:before{inset:58px 0 40px}.sidebar{position:fixed;left:-190px;top:58px;bottom:0;width:180px;transition:.2s}.sidebar.open{left:0}.hamburger{display:block}.brand{width:auto}.top-nav{display:none}.clock{margin-left:auto}.content{padding:10px}.metrics-grid{grid-template-columns:repeat(2,1fr)}.dashboard-grid,.config-layout{display:block}.dashboard-grid>.panel,.config-layout>.panel{margin-bottom:10px}.bottom-grid,.flow-details,.pv-summary,.four-grid,.three-grid,.mapping-grid,.section-grid,.device-live-grid,.tariff-live-grid,.season-schedule-grid,.price-config-grid{grid-template-columns:1fr 1fr}.flow-canvas{height:360px}.flow-node{width:100px;height:105px}.pv-node,.home-node,.ev-node{left:calc(50% - 50px)}.statusbar{gap:12px;overflow:hidden}.statusbar span:nth-child(2),.statusbar span:nth-child(3),.statusbar span:nth-child(4){display:none}}
    @media(max-width:560px){.metrics-grid,.bottom-grid,.flow-details,.pv-summary,.four-grid,.three-grid,.mapping-grid,.section-grid,.device-live-grid,.two-grid,.tariff-live-grid,.season-schedule-grid,.price-config-grid{grid-template-columns:1fr}.hero-row{flex-direction:column}.flow-node{width:90px;height:95px}.pv-node,.home-node,.ev-node{left:calc(50% - 45px)}.grid-node{left:1%}.battery-node{right:1%}.flow-label{display:none}.consumer{grid-template-columns:90px 1fr 55px}.status-message{max-width:70%}}
  `; }
}

customElements.define("matrix-energy-center-panel", MatrixEnergyCenterPanel);
