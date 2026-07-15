# Architecture

## Layers

### 1. Config entry

The standard Home Assistant config flow creates one installation entry. It contains only bootstrap values such as installation name, sidebar title and currency.

### 2. Local project storage

`MatrixEnergyStore` uses Home Assistant `Store` and maintains a versioned JSON document:

- general settings,
- enabled modules,
- sign conventions,
- source entity mappings,
- PV strings and sections,
- arbitrary appliances,
- the structured tariff profile,
- automation policy placeholders,
- panel permissions.

Configuration schema version 2 adds the full tariff object. Existing schema-v1 data is deep-merged with the new defaults during load. The backend validates entity IDs, text lengths, dates, time values, numeric ranges and list sizes before saving.

### 3. Tariff engine

`tariff.py` contains the provider-independent tariff result structure and the first built-in profile: TAURON G13.

It calculates:

- summer or winter season,
- active tariff zone,
- workday/day-off state,
- the special off-peak carry to 07:00 after a day off,
- energy, distribution and surcharge components,
- complete purchase price,
- monthly fixed charges,
- next zone and time to transition.

The schedule and every price component remain editable. The tariff engine does not contact TAURON or any external cloud.

### 4. Normalization coordinator

`MatrixEnergyCoordinator` reads existing Home Assistant states. It converts:

- kW and MW to W,
- Wh and MWh to kWh,
- signed grid power into import/export,
- signed battery power into charge/discharge.

When the home-power source is not configured, the coordinator calculates a live energy balance. It evaluates the configured tariff in the Home Assistant timezone and calculates live grid-import and appliance cost rates.

### 5. Sensor platform

The integration exposes stable entities independent of vendor naming. Future automations and dashboards can depend on these normalized entities rather than direct Deye, Sunsynk, Huawei, Pstryk, OCPP, TAURON or vehicle entities.

The tariff sensor group includes active zone, season, day type, price components, monthly fixed fees, next transition and current grid-import cost per hour.

### 6. WebSocket API

The custom panel communicates with the backend through authenticated WebSocket commands:

- `matrix_energy_center/config/get`
- `matrix_energy_center/config/save`
- `matrix_energy_center/config/reset`
- `matrix_energy_center/runtime/get`
- `matrix_energy_center/entity/test`

Write, reset and entity-test commands require administrator access.

### 7. Custom panel

The integration serves one dependency-free JavaScript Web Component. It uses the Home Assistant object supplied to custom panels, so states and service calls remain local and authenticated.

The dedicated **Ceny / G13** view edits the structured tariff object and displays current backend calculations. The frontend never decides the authoritative tariff zone; the backend result is the source of truth.

## Future adapter model

Vendor adapters will not replace the generic mapping layer. They will only propose or automatically create mappings.

```text
Deye / Sunsynk / Huawei / Victron / OCPP / Pstryk
                         ↓
                    adapter profile
                         ↓
               generic Matrix roles
```

## Safety model

Monitoring is the default mode. Future automatic actions must include:

- explicit opt-in,
- device capability validation,
- configurable limits,
- cooldowns and decision delays,
- dry-run simulation,
- action log and decision reason,
- manual override,
- failsafe on missing/unavailable entities.
