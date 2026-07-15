# Matrix Energy Center

![Matrix Energy Center preview](docs/preview.png)

**Matrix Energy Center** is a local, multi-user energy management panel for Home Assistant. It provides a Matrix Blue interface, live power flows, normalized energy sensors and a complete configuration editor for grid, photovoltaic strings, battery storage, EV charging, tariffs and arbitrary appliances.

> Status: **v0.2.0 technical preview**. Monitoring, configuration, the TAURON G13 tariff engine and generic control buttons are implemented. Automatic control of inverters, batteries and EV chargers remains intentionally disabled until vendor adapters and safety tests are added.

## Main features

- Custom sidebar panel with Matrix Blue styling and responsive desktop/mobile layout.
- Live flow diagram: grid ↔ home ↔ battery, PV → home and home → EV.
- Generic source mapping; no user entity IDs are hardcoded.
- Normalized Home Assistant sensors in W, kWh, %, currency/kWh and currency/hour.
- Signed grid and battery power with configurable direction conventions.
- Unlimited PV strings within practical storage limits.
- Each string can be divided into multiple sections such as roof faces, garage, balcony or separate sub-arrays.
- Section metadata: orientation, tilt, panel count, peak power, percentage share, power/energy entities and description.
- Arbitrary appliances: dishwasher, washing machine, dryer, oven, cooktop, heat pump, HVAC, servers and custom devices.
- Appliance metadata: name, description, room, MDI icon, category, accent, power entity, energy entity and optional control entity.
- Built-in editable **TAURON G13** engine with summer/winter schedules, weekends, Polish public holidays, custom holidays and the next-zone calculation.
- Separate energy, distribution, variable and monthly fixed fee components, plus combined-price and external-price modes.
- Administrator-only backend writes; optional read-only configuration view for regular users.
- Local JSON import/export of project configuration.
- Diagnostics view for entity availability, units, device classes, tariff state and runtime values.
- English and Polish configuration-flow translations.
- HACS-ready repository layout, HACS and Hassfest workflows.

## Installation through HACS as a custom repository

1. Publish this folder as a public GitHub repository.
2. Replace `YOUR_GITHUB_USER` in `custom_components/matrix_energy_center/manifest.json`.
3. In HACS open **Custom repositories**.
4. Add the repository URL and choose **Integration**.
5. Install **Matrix Energy Center** and restart Home Assistant.
6. Open **Settings → Devices & services → Add integration**.
7. Search for **Matrix Energy Center**.
8. Open the new **Energy Center** item in the sidebar and configure entity mappings.

## Manual installation

Copy:

```text
custom_components/matrix_energy_center
```

to:

```text
/config/custom_components/matrix_energy_center
```

Restart Home Assistant and add the integration from the UI.

## Configuration model

The setup flow creates only the installation entry. Detailed configuration is managed inside the custom panel and stored locally in Home Assistant `.storage`.

```text
Grid / PV / Battery / EV / Tariff / Appliances
                      ↓
             user-selected entities
                      ↓
       Matrix Energy Center normalization
                      ↓
       dashboard + normalized HA sensors
```

The project never contains private entity IDs, IP addresses, usernames, tokens or credentials.

## TAURON G13

Version 0.2 adds a complete editable G13 profile. The default schedule follows TAURON's published rules:

- summer period: 1 April–30 September,
- winter period: 1 October–31 March,
- morning peak: 07:00–13:00,
- summer afternoon peak: 19:00–22:00,
- winter afternoon peak: 16:00–21:00,
- remaining hours are off-peak,
- Saturdays, Sundays and Polish public holidays are off-peak all day,
- after a day off, the off-peak period continues until 07:00 on the next workday.

The schedule is editable because the project is intended for many users and future tariff revisions. Three price modes are available:

1. **Components** — energy sale price + variable distribution + other variable fees.
2. **Combined** — one complete gross purchase price for each season and zone.
3. **Entity** — a price supplied by an external Home Assistant sensor.

The bundled `tauron_g13_2026_gross` preset includes the 2026 gross TAURON Dystrybucja variable distribution rates and common regulated variable/fixed fee defaults. Energy sale rates are deliberately zero until the user enters values from their own agreement or price list. See [TAURON G13 configuration](docs/TAURON_G13_PL.md).

Official references used for the initial preset:

- https://www.tauron.pl/dla-domu/prad/taryfa-sprzedawcy/g13
- https://www.tauron-dystrybucja.pl/uslugi-dystrybucyjne/stawki-oplat-dystrybucyjnych

## Normalized sensors

The integration creates entities for:

- home power,
- signed grid power,
- grid import/export power,
- grid import/export energy,
- PV power and today's PV energy,
- signed battery power,
- battery charge/discharge power,
- battery SOC and available energy,
- EV charging power and SOC,
- purchase/sale price,
- live self-sufficiency and PV self-consumption,
- active G13 zone, season and day type,
- G13 energy, distribution, surcharge and total price components,
- monthly fixed tariff charges,
- next G13 zone and minutes to change,
- current grid-import cost per hour.

## PV string splitting

A string can work as one measurement source or be divided into multiple sections.

Example:

```text
String 1 — MPPT 1
├── South roof — 10 panels — 4.5 kWp — 70%
├── Garage — 3 panels — 1.2 kWp — 20%
└── Balcony — 2 panels — 0.8 kWp — 10%
```

A section may have its own sensor. When only a string-level sensor exists, the percentage share remains available for later analytical allocation.

## Appliance controls

Version 0.2 supports generic control buttons for:

- `switch.*`
- `input_boolean.*`
- `light.*`
- `button.*`

Other domains will receive dedicated adapters in later versions.

## Security and privacy

- All configuration stays local.
- Configuration writes and resets require an administrator account.
- There is no telemetry.
- No cloud service is required.
- Automatic energy control is disabled by default.

## Known technical-preview limitations

- Historical charts contain real samples collected while the panel is open; recorder-backed historical charts are planned.
- The tariff engine calculates the active price and live cost rate, but persistent day/month invoice aggregation is not yet implemented.
- Energy prices and fixed fees must be reviewed whenever the user's contract or official tariff changes.
- Automatic inverter, battery and EV control is not executed in v0.2.
- Dynamic per-appliance entities are not created yet; additional appliances are displayed and managed in the panel.
- The GitHub owner placeholders must be replaced before HACS publication.

## Documentation

- [Polish installation guide](docs/INSTALL_PL.md)
- [TAURON G13 configuration (PL)](docs/TAURON_G13_PL.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Status wersji v0.2 (PL)](docs/STATUS_PL.md)
- [Example configuration](docs/example-config.json)

## License

MIT
