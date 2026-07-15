"""Coordinator for normalized Matrix Energy Center values."""

from __future__ import annotations

from datetime import timedelta
import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, State
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

from .const import DOMAIN
from .storage import MatrixEnergyStore
from .tariff import evaluate_tauron_g13

_LOGGER = logging.getLogger(__name__)

POWER_KEYS = {
    "home_power",
    "grid_power",
    "grid_import_power",
    "grid_export_power",
    "pv_power",
    "battery_power",
    "battery_charge_power",
    "battery_discharge_power",
    "ev_power",
}
ENERGY_KEYS = {
    "home_energy_today",
    "home_energy_month",
    "grid_import_energy",
    "grid_export_energy",
    "pv_energy_today",
    "pv_energy_month",
    "pv_energy_total",
    "pv_forecast_today",
    "pv_forecast_tomorrow",
    "battery_energy",
    "battery_capacity",
    "battery_charge_energy_today",
    "battery_discharge_energy_today",
    "ev_energy_session",
    "ev_energy_today",
}
PERCENTAGE_KEYS = {
    "battery_soc",
    "battery_health",
    "ev_soc",
    "ev_target_soc",
    "grid_power_factor",
}
PRICE_KEYS = {
    "price_buy",
    "price_sell",
    "price_next_hour",
    "price_min_today",
    "price_max_today",
    "cost_today",
    "cost_month",
}
TEXT_KEYS = {
    "inverter_status",
    "battery_status",
    "ev_status",
    "ev_charge_switch",
}


class MatrixEnergyCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Read source entities and expose normalized values."""

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
        store: MatrixEnergyStore,
    ) -> None:
        refresh = int(entry.options.get("refresh_interval", 5))
        super().__init__(
            hass,
            logger=_LOGGER,
            name=DOMAIN,
            update_interval=timedelta(seconds=max(2, min(refresh, 60))),
        )
        self.entry = entry
        self.store = store

    async def _async_update_data(self) -> dict[str, Any]:
        config = self.store.config
        mappings = config["mappings"]
        values: dict[str, Any] = {}
        source_status: dict[str, dict[str, Any]] = {}

        for key, entity_id in mappings.items():
            state = self.hass.states.get(entity_id) if entity_id else None
            source_status[key] = self._state_diagnostics(entity_id, state)
            values[key] = self._normalize_value(key, state)

        tariff_snapshot = evaluate_tauron_g13(dt_util.now(), config.get("tariff", {}))
        tariff = tariff_snapshot.as_dict()

        external_buy_price = values.get("price_buy")
        tariff_config = config.get("tariff", {})
        price_mode = str(tariff_config.get("price_mode", "components"))
        use_external = bool(tariff_config.get("use_external_price_if_available", False))
        if tariff_snapshot.enabled:
            if price_mode == "entity" or (use_external and external_buy_price is not None):
                tariff["total_price"] = external_buy_price
                tariff["schedule_warning"] = (
                    tariff.get("schedule_warning")
                    if external_buy_price is not None
                    else "Tryb ceny z encji jest aktywny, ale nie przypisano poprawnej encji ceny zakupu."
                )
                values["price_buy"] = external_buy_price
            else:
                values["price_buy"] = tariff.get("total_price")

        values.update(
            {
                "tariff_zone": tariff.get("zone_name"),
                "tariff_zone_key": tariff.get("zone"),
                "tariff_season": "Lato" if tariff.get("season") == "summer" else "Zima",
                "tariff_day_type": self._day_type_name(tariff.get("day_type")),
                "tariff_price_energy": tariff.get("energy_price"),
                "tariff_price_distribution": tariff.get("distribution_price"),
                "tariff_price_surcharges": tariff.get("surcharge_price"),
                "tariff_price_total": tariff.get("total_price"),
                "tariff_fixed_monthly": tariff.get("fixed_monthly"),
                "tariff_next_zone": tariff.get("next_zone_name"),
                "tariff_next_change_minutes": tariff.get("next_change_minutes"),
            }
        )

        pv_power = values.get("pv_power")
        if pv_power is None:
            pv_power = self._sum_pv_string_power(config)
            values["pv_power"] = pv_power

        grid_import_power, grid_export_power = self._grid_flows(values, config)
        battery_charge_power, battery_discharge_power = self._battery_flows(values, config)

        home_power = values.get("home_power")
        if home_power is None:
            home_power = max(
                0.0,
                (pv_power or 0.0)
                + grid_import_power
                + battery_discharge_power
                - grid_export_power
                - battery_charge_power,
            )
            values["home_power"] = home_power

        pv_available = max(pv_power or 0.0, 0.0)
        self_consumed_pv = max(pv_available - grid_export_power, 0.0)
        autarky = (
            max(0.0, min(100.0, (1 - grid_import_power / home_power) * 100))
            if home_power and home_power > 0
            else None
        )
        self_consumption = (
            max(0.0, min(100.0, self_consumed_pv / pv_available * 100))
            if pv_available > 0
            else None
        )

        current_price = values.get("price_buy")
        if current_price is None:
            current_price = tariff.get("total_price")
            values["price_buy"] = current_price
        grid_import_cost_per_hour = (
            grid_import_power / 1000.0 * current_price
            if current_price is not None
            else None
        )

        appliance_values = []
        for device in config["devices"]:
            power_state = self._get_state(device.get("power_entity", ""))
            energy_state = self._get_state(device.get("energy_entity", ""))
            device_power = self._convert_power(power_state)
            threshold = float(device.get("active_threshold_w", 10))
            is_active = device_power is not None and device_power >= threshold
            status_state = self._raw_state(device.get("status_entity", ""))
            appliance_values.append(
                {
                    **device,
                    "power": device_power,
                    "energy": self._convert_energy(energy_state),
                    "status_state": status_state,
                    "cycle_state": self._raw_state(device.get("cycle_entity", "")),
                    "control_state": self._raw_state(device.get("control_entity", "")),
                    "is_active": is_active,
                    "display_description": (
                        device.get("active_description")
                        if is_active
                        else device.get("idle_description")
                    ),
                    "cost_per_hour": (
                        device_power / 1000.0 * current_price
                        if device_power is not None and current_price is not None
                        else None
                    ),
                }
            )

        return {
            **values,
            "grid_import_power": grid_import_power,
            "grid_export_power": grid_export_power,
            "grid_import_cost_per_hour": grid_import_cost_per_hour,
            "battery_charge_power": battery_charge_power,
            "battery_discharge_power": battery_discharge_power,
            "self_sufficiency_live": autarky,
            "self_consumption_live": self_consumption,
            "appliances": appliance_values,
            "pv_strings": self._pv_string_runtime(config),
            "source_status": source_status,
            "tariff": tariff,
            "revision": config.get("revision", 0),
        }

    def _grid_flows(
        self, values: dict[str, Any], config: dict[str, Any]
    ) -> tuple[float, float]:
        separate_import = values.get("grid_import_power")
        separate_export = values.get("grid_export_power")
        if separate_import is not None or separate_export is not None:
            return max(separate_import or 0.0, 0.0), max(separate_export or 0.0, 0.0)

        signed = values.get("grid_power")
        if signed is None:
            return 0.0, 0.0
        if bool(config["signs"]["grid_positive_is_import"]):
            return max(signed, 0.0), max(-signed, 0.0)
        return max(-signed, 0.0), max(signed, 0.0)

    def _battery_flows(
        self, values: dict[str, Any], config: dict[str, Any]
    ) -> tuple[float, float]:
        separate_charge = values.get("battery_charge_power")
        separate_discharge = values.get("battery_discharge_power")
        if separate_charge is not None or separate_discharge is not None:
            return max(separate_charge or 0.0, 0.0), max(separate_discharge or 0.0, 0.0)

        signed = values.get("battery_power")
        if signed is None:
            return 0.0, 0.0
        if bool(config["signs"]["battery_positive_is_charge"]):
            return max(signed, 0.0), max(-signed, 0.0)
        return max(-signed, 0.0), max(signed, 0.0)

    def _sum_pv_string_power(self, config: dict[str, Any]) -> float | None:
        total = 0.0
        found = False
        for string in config["pv_strings"]:
            if not string.get("enabled", True):
                continue
            entity_id = string.get("power_entity")
            if entity_id:
                value = self._convert_power(self.hass.states.get(entity_id))
                if value is not None:
                    total += value
                    found = True
                    continue
            for section in string.get("sections", []):
                if not section.get("enabled", True):
                    continue
                section_entity = section.get("power_entity")
                if not section_entity:
                    continue
                value = self._convert_power(self.hass.states.get(section_entity))
                if value is not None:
                    total += value
                    found = True
        return total if found else None

    def _pv_string_runtime(self, config: dict[str, Any]) -> list[dict[str, Any]]:
        result: list[dict[str, Any]] = []
        for string in config.get("pv_strings", []):
            power = self._convert_power(self._get_state(string.get("power_entity", "")))
            if power is None:
                section_values = [
                    self._convert_power(self._get_state(section.get("power_entity", "")))
                    for section in string.get("sections", [])
                    if section.get("enabled", True)
                ]
                valid = [value for value in section_values if value is not None]
                power = sum(valid) if valid else None
            result.append(
                {
                    **string,
                    "power": power,
                    "energy": self._convert_energy(self._get_state(string.get("energy_entity", ""))),
                    "voltage": self._float_state(self._get_state(string.get("voltage_entity", ""))),
                    "current": self._float_state(self._get_state(string.get("current_entity", ""))),
                    "status": self._raw_state(string.get("status_entity", "")),
                }
            )
        return result

    def _normalize_value(self, key: str, state: State | None) -> Any:
        if key in POWER_KEYS:
            return self._convert_power(state)
        if key in ENERGY_KEYS:
            return self._convert_energy(state)
        if key in PERCENTAGE_KEYS or key in PRICE_KEYS:
            return self._float_state(state)
        if key in TEXT_KEYS:
            return state.state if state else None
        return self._float_state(state) if state else None

    def _get_state(self, entity_id: str | None) -> State | None:
        return self.hass.states.get(entity_id) if entity_id else None

    @staticmethod
    def _float_state(state: State | None) -> float | None:
        if state is None or state.state in {"unknown", "unavailable", "none", ""}:
            return None
        try:
            return float(state.state)
        except (TypeError, ValueError):
            return None

    def _convert_power(self, state: State | None) -> float | None:
        value = self._float_state(state)
        if value is None or state is None:
            return None
        unit = str(state.attributes.get("unit_of_measurement", "W")).lower()
        if unit == "kw":
            return value * 1000
        if unit == "mw":
            return value * 1_000_000
        return value

    def _convert_energy(self, state: State | None) -> float | None:
        value = self._float_state(state)
        if value is None or state is None:
            return None
        unit = str(state.attributes.get("unit_of_measurement", "kWh")).lower()
        if unit == "wh":
            return value / 1000
        if unit == "mwh":
            return value * 1000
        return value

    def _raw_state(self, entity_id: str | None) -> str | None:
        state = self._get_state(entity_id)
        return state.state if state else None

    @staticmethod
    def _day_type_name(value: Any) -> str | None:
        return {
            "workday": "Dzień roboczy",
            "day_off": "Dzień wolny",
            "after_day_off": "Po dniu wolnym — do 07:00",
        }.get(str(value), str(value) if value else None)

    @staticmethod
    def _state_diagnostics(entity_id: str, state: State | None) -> dict[str, Any]:
        if not entity_id:
            return {"entity_id": "", "status": "not_configured"}
        if state is None:
            return {"entity_id": entity_id, "status": "missing"}
        return {
            "entity_id": entity_id,
            "status": "ok" if state.state not in {"unknown", "unavailable"} else state.state,
            "state": state.state,
            "friendly_name": state.attributes.get("friendly_name"),
            "unit": state.attributes.get("unit_of_measurement"),
            "device_class": state.attributes.get("device_class"),
            "state_class": state.attributes.get("state_class"),
        }
