"""Persistent configuration storage for Matrix Energy Center."""

from __future__ import annotations

from copy import deepcopy
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import (
    DEFAULT_CURRENCY,
    DEFAULT_INSTALLATION_NAME,
    DEFAULT_PANEL_TITLE,
    MAPPING_ROLES,
    STORAGE_KEY,
    STORAGE_VERSION,
)
from .tariff import (
    SEASON_SUMMER,
    SEASON_WINTER,
    ZONE_AFTERNOON,
    ZONE_MORNING,
    ZONE_OFFPEAK,
    default_tauron_g13_tariff,
)


def default_configuration() -> dict[str, Any]:
    """Return a new default configuration document."""
    return {
        "schema_version": 3,
        "revision": 0,
        "general": {
            "installation_name": DEFAULT_INSTALLATION_NAME,
            "panel_title": DEFAULT_PANEL_TITLE,
            "currency": DEFAULT_CURRENCY,
            "language": "auto",
            "theme": "matrix_blue",
            "accent": "cyan",
        },
        "features": {
            "grid": True,
            "pv": False,
            "battery": False,
            "ev": False,
            "prices": False,
            "appliances": True,
            "automation": False,
        },
        "signs": {
            "grid_positive_is_import": True,
            "battery_positive_is_charge": True,
        },
        "appearance": {
            "show_grid_background": True,
            "enable_animations": True,
            "compact_header": False,
            "show_status_bar": True,
            "show_unconfigured_cards": True,
            "flow_density": "comfortable",
        },
        "mappings": {role: "" for role in MAPPING_ROLES},
        "pv_strings": [],
        "devices": [],
        "tariffs": [],  # legacy/free-form definitions retained for compatibility
        "tariff": default_tauron_g13_tariff(),
        "automation": {
            "enabled": False,
            "mode": "monitor_only",
            "minimum_battery_soc": 20,
            "ev_surplus_start_w": 1800,
            "ev_surplus_stop_w": 500,
            "decision_delay_seconds": 180,
        },
        "permissions": {
            "show_configuration_to_non_admin": False,
            "allow_non_admin_control": False,
        },
    }


class MatrixEnergyStore:
    """Store and validate the user-managed Matrix Energy Center configuration."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._config: dict[str, Any] = default_configuration()

    @property
    def config(self) -> dict[str, Any]:
        """Return a defensive copy of the current configuration."""
        return deepcopy(self._config)

    async def async_load(self) -> dict[str, Any]:
        """Load configuration from Home Assistant storage."""
        loaded = await self._store.async_load()
        if isinstance(loaded, dict):
            self._config = self._merge_defaults(loaded)
        else:
            self._config = default_configuration()
            await self._store.async_save(self._config)
        return self.config

    async def async_save(self, new_config: dict[str, Any]) -> dict[str, Any]:
        """Validate and persist a complete configuration document."""
        validated = self._validate(new_config)
        validated["revision"] = int(self._config.get("revision", 0)) + 1
        self._config = validated
        await self._store.async_save(self._config)
        return self.config

    async def async_reset(self) -> dict[str, Any]:
        """Reset to defaults."""
        self._config = default_configuration()
        await self._store.async_save(self._config)
        return self.config

    def _merge_defaults(self, loaded: dict[str, Any]) -> dict[str, Any]:
        base = default_configuration()
        for key in ("schema_version", "revision"):
            if key in loaded:
                base[key] = loaded[key]
        for section in (
            "general",
            "features",
            "signs",
            "mappings",
            "automation",
            "permissions",
            "appearance",
        ):
            value = loaded.get(section)
            if isinstance(value, dict):
                base[section].update(value)
        for section in ("pv_strings", "devices", "tariffs"):
            value = loaded.get(section)
            if isinstance(value, list):
                base[section] = value
        if isinstance(loaded.get("tariff"), dict):
            base["tariff"] = self._deep_merge(base["tariff"], loaded["tariff"])
        return self._validate(base)

    def _validate(self, raw: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(raw, dict):
            raise ValueError("Configuration must be an object")

        config = default_configuration()
        config["schema_version"] = 3
        config["revision"] = int(raw.get("revision", 0))

        general = raw.get("general", {})
        if not isinstance(general, dict):
            raise ValueError("general must be an object")
        config["general"].update(
            {
                "installation_name": self._text(general.get("installation_name"), DEFAULT_INSTALLATION_NAME, 80),
                "panel_title": self._text(general.get("panel_title"), DEFAULT_PANEL_TITLE, 80),
                "currency": self._text(general.get("currency"), DEFAULT_CURRENCY, 12).upper(),
                "language": self._text(general.get("language"), "auto", 12),
                "theme": self._text(general.get("theme"), "matrix_blue", 32),
                "accent": self._text(general.get("accent"), "cyan", 20),
            }
        )

        for section in ("features", "signs", "permissions", "appearance"):
            incoming = raw.get(section, {})
            if not isinstance(incoming, dict):
                raise ValueError(f"{section} must be an object")
            for key in config[section]:
                if key not in incoming:
                    continue
                if section == "appearance" and key == "flow_density":
                    config[section][key] = self._choice(
                        incoming[key], "comfortable", {"compact", "comfortable", "spacious"}
                    )
                else:
                    config[section][key] = bool(incoming[key])

        mappings = raw.get("mappings", {})
        if not isinstance(mappings, dict):
            raise ValueError("mappings must be an object")
        for role in MAPPING_ROLES:
            config["mappings"][role] = self._entity_id(mappings.get(role, ""))

        automation = raw.get("automation", {})
        if not isinstance(automation, dict):
            raise ValueError("automation must be an object")
        config["automation"].update(
            {
                "enabled": bool(automation.get("enabled", False)),
                "mode": self._text(automation.get("mode"), "monitor_only", 40),
                "minimum_battery_soc": self._number(automation.get("minimum_battery_soc"), 20, 0, 100),
                "ev_surplus_start_w": self._number(automation.get("ev_surplus_start_w"), 1800, 0, 100000),
                "ev_surplus_stop_w": self._number(automation.get("ev_surplus_stop_w"), 500, 0, 100000),
                "decision_delay_seconds": self._number(automation.get("decision_delay_seconds"), 180, 0, 86400),
            }
        )

        config["pv_strings"] = self._validate_pv_strings(raw.get("pv_strings", []))
        config["devices"] = self._validate_devices(raw.get("devices", []))
        config["tariffs"] = self._validate_tariffs(raw.get("tariffs", []))
        config["tariff"] = self._validate_tariff(raw.get("tariff", {}))
        return config

    def _validate_tariff(self, raw: Any) -> dict[str, Any]:
        defaults = default_tauron_g13_tariff()
        if not isinstance(raw, dict):
            raw = {}
        merged = self._deep_merge(defaults, raw)

        result = default_tauron_g13_tariff()
        result.update(
            {
                "enabled": bool(merged.get("enabled", False)),
                "provider": self._text(merged.get("provider"), "tauron", 40),
                "plan": self._text(merged.get("plan"), "g13", 40),
                "profile_name": self._text(merged.get("profile_name"), "TAURON G13", 80),
                "country": self._text(merged.get("country"), "PL", 8).upper(),
                "price_mode": self._choice(merged.get("price_mode"), "components", {"components", "combined", "entity"}),
                "use_external_price_if_available": bool(merged.get("use_external_price_if_available", False)),
                "prices_include_vat": bool(merged.get("prices_include_vat", True)),
                "vat_percent": self._number(merged.get("vat_percent"), 23, 0, 100),
                "effective_from": self._date_text(merged.get("effective_from"), "2026-01-01"),
                "effective_to": self._date_text(merged.get("effective_to"), "2026-12-31"),
                "distribution_preset": self._text(merged.get("distribution_preset"), "tauron_g13_2026_gross", 80),
            }
        )

        schedule = merged.get("schedule", {}) if isinstance(merged.get("schedule"), dict) else {}
        result["schedule"] = {
            "summer_start": self._month_day(schedule.get("summer_start"), "04-01"),
            "winter_start": self._month_day(schedule.get("winter_start"), "10-01"),
            "morning_start": self._time_text(schedule.get("morning_start"), "07:00"),
            "morning_end": self._time_text(schedule.get("morning_end"), "13:00"),
            "summer_afternoon_start": self._time_text(schedule.get("summer_afternoon_start"), "19:00"),
            "summer_afternoon_end": self._time_text(schedule.get("summer_afternoon_end"), "22:00"),
            "winter_afternoon_start": self._time_text(schedule.get("winter_afternoon_start"), "16:00"),
            "winter_afternoon_end": self._time_text(schedule.get("winter_afternoon_end"), "21:00"),
            "day_off_all_day_offpeak": bool(schedule.get("day_off_all_day_offpeak", True)),
            "day_off_carry_until": self._time_text(schedule.get("day_off_carry_until"), "07:00"),
        }

        calendar = merged.get("calendar", {}) if isinstance(merged.get("calendar"), dict) else {}
        result["calendar"] = {
            "include_weekends": bool(calendar.get("include_weekends", True)),
            "include_polish_public_holidays": bool(calendar.get("include_polish_public_holidays", True)),
            "custom_holidays": self._text(calendar.get("custom_holidays"), "", 4000),
        }

        for section in ("energy_prices", "distribution_prices", "combined_prices"):
            result[section] = self._validate_zone_prices(merged.get(section), defaults[section])

        variable = merged.get("variable_fees", {}) if isinstance(merged.get("variable_fees"), dict) else {}
        result["variable_fees"] = {
            key: self._number(variable.get(key), defaults["variable_fees"][key], 0, 1000)
            for key in defaults["variable_fees"]
        }

        fixed = merged.get("fixed_fees", {}) if isinstance(merged.get("fixed_fees"), dict) else {}
        result["fixed_fees"] = {
            "phase_count": int(self._number(fixed.get("phase_count"), 3, 1, 3)),
            "network_monthly_1_phase": self._number(fixed.get("network_monthly_1_phase"), 9.08, 0, 100000),
            "network_monthly_3_phase": self._number(fixed.get("network_monthly_3_phase"), 13.36, 0, 100000),
            "subscription_monthly": self._number(fixed.get("subscription_monthly"), 5.61, 0, 100000),
            "capacity_fee_monthly": self._number(fixed.get("capacity_fee_monthly"), 21.13, 0, 100000),
            "commercial_monthly": self._number(fixed.get("commercial_monthly"), 0, 0, 100000),
            "other_monthly": self._number(fixed.get("other_monthly"), 0, 0, 100000),
        }
        return result

    def _validate_zone_prices(self, raw: Any, defaults: dict[str, Any]) -> dict[str, Any]:
        raw = raw if isinstance(raw, dict) else {}
        result: dict[str, Any] = {}
        for season in (SEASON_SUMMER, SEASON_WINTER):
            season_raw = raw.get(season, {}) if isinstance(raw.get(season), dict) else {}
            result[season] = {
                zone: self._number(season_raw.get(zone), defaults[season][zone], 0, 10000)
                for zone in (ZONE_MORNING, ZONE_AFTERNOON, ZONE_OFFPEAK)
            }
        return result

    def _validate_pv_strings(self, raw: Any) -> list[dict[str, Any]]:
        if not isinstance(raw, list):
            raise ValueError("pv_strings must be a list")
        result: list[dict[str, Any]] = []
        seen: set[str] = set()
        for index, item in enumerate(raw[:64]):
            if not isinstance(item, dict):
                continue
            item_id = self._identifier(item.get("id"), f"string_{index + 1}")
            if item_id in seen:
                item_id = f"{item_id}_{index + 1}"
            seen.add(item_id)
            sections: list[dict[str, Any]] = []
            for section_index, section in enumerate(item.get("sections", [])[:64]):
                if not isinstance(section, dict):
                    continue
                sections.append(
                    {
                        "id": self._identifier(section.get("id"), f"section_{section_index + 1}"),
                        "name": self._text(section.get("name"), f"Section {section_index + 1}", 80),
                        "description": self._text(section.get("description"), "", 1000),
                        "area": self._text(section.get("area"), "", 80),
                        "orientation": self._text(section.get("orientation"), "unknown", 32),
                        "tilt": self._number(section.get("tilt"), 0, 0, 90),
                        "panel_count": int(self._number(section.get("panel_count"), 0, 0, 10000)),
                        "peak_power_kw": self._number(section.get("peak_power_kw"), 0, 0, 100000),
                        "share_percent": self._number(section.get("share_percent"), 0, 0, 100),
                        "power_entity": self._entity_id(section.get("power_entity", "")),
                        "energy_entity": self._entity_id(section.get("energy_entity", "")),
                        "voltage_entity": self._entity_id(section.get("voltage_entity", "")),
                        "current_entity": self._entity_id(section.get("current_entity", "")),
                        "status_entity": self._entity_id(section.get("status_entity", "")),
                        "enabled": bool(section.get("enabled", True)),
                        "show_on_overview": bool(section.get("show_on_overview", True)),
                    }
                )
            result.append(
                {
                    "id": item_id,
                    "name": self._text(item.get("name"), f"String {index + 1}", 80),
                    "description": self._text(item.get("description"), "", 1000),
                    "mppt": self._text(item.get("mppt"), f"MPPT {index + 1}", 80),
                    "power_entity": self._entity_id(item.get("power_entity", "")),
                    "energy_entity": self._entity_id(item.get("energy_entity", "")),
                    "voltage_entity": self._entity_id(item.get("voltage_entity", "")),
                    "current_entity": self._entity_id(item.get("current_entity", "")),
                    "status_entity": self._entity_id(item.get("status_entity", "")),
                    "capacity_kw": self._number(item.get("capacity_kw"), 0, 0, 100000),
                    "enabled": bool(item.get("enabled", True)),
                    "show_on_overview": bool(item.get("show_on_overview", True)),
                    "sections": sections,
                }
            )
        return result

    def _validate_devices(self, raw: Any) -> list[dict[str, Any]]:
        if not isinstance(raw, list):
            raise ValueError("devices must be a list")
        result: list[dict[str, Any]] = []
        seen: set[str] = set()
        for index, item in enumerate(raw[:256]):
            if not isinstance(item, dict):
                continue
            item_id = self._identifier(item.get("id"), f"device_{index + 1}")
            if item_id in seen:
                item_id = f"{item_id}_{index + 1}"
            seen.add(item_id)
            result.append(
                {
                    "id": item_id,
                    "name": self._text(item.get("name"), f"Device {index + 1}", 80),
                    "description": self._text(item.get("description"), "", 1000),
                    "category": self._text(item.get("category"), "other", 40),
                    "area": self._text(item.get("area"), "", 80),
                    "icon": self._text(item.get("icon"), "mdi:flash", 80),
                    "accent": self._text(item.get("accent"), "cyan", 24),
                    "power_entity": self._entity_id(item.get("power_entity", "")),
                    "energy_entity": self._entity_id(item.get("energy_entity", "")),
                    "status_entity": self._entity_id(item.get("status_entity", "")),
                    "cycle_entity": self._entity_id(item.get("cycle_entity", "")),
                    "control_entity": self._entity_id(item.get("control_entity", "")),
                    "active_threshold_w": self._number(item.get("active_threshold_w"), 10, 0, 1_000_000),
                    "standby_threshold_w": self._number(item.get("standby_threshold_w"), 2, 0, 1_000_000),
                    "priority": int(self._number(item.get("priority"), index + 1, 0, 10000)),
                    "active_description": self._text(item.get("active_description"), "Urządzenie pracuje", 250),
                    "idle_description": self._text(item.get("idle_description"), "Urządzenie nie pracuje", 250),
                    "enabled": bool(item.get("enabled", True)),
                    "show_on_overview": bool(item.get("show_on_overview", True)),
                    "include_in_home_total": bool(item.get("include_in_home_total", True)),
                }
            )
        return result

    def _validate_tariffs(self, raw: Any) -> list[dict[str, Any]]:
        if not isinstance(raw, list):
            raise ValueError("tariffs must be a list")
        result: list[dict[str, Any]] = []
        for index, item in enumerate(raw[:64]):
            if not isinstance(item, dict):
                continue
            result.append(
                {
                    "id": self._identifier(item.get("id"), f"tariff_{index + 1}"),
                    "name": self._text(item.get("name"), f"Tariff {index + 1}", 80),
                    "description": self._text(item.get("description"), "", 500),
                    "price_entity": self._entity_id(item.get("price_entity", "")),
                    "active_entity": self._entity_id(item.get("active_entity", "")),
                }
            )
        return result

    @staticmethod
    def _deep_merge(base: dict[str, Any], incoming: dict[str, Any]) -> dict[str, Any]:
        merged = deepcopy(base)
        for key, value in incoming.items():
            if isinstance(value, dict) and isinstance(merged.get(key), dict):
                merged[key] = MatrixEnergyStore._deep_merge(merged[key], value)
            else:
                merged[key] = deepcopy(value)
        return merged

    @staticmethod
    def _text(value: Any, default: str, maximum: int) -> str:
        if value is None:
            return default
        return str(value).strip()[:maximum]

    @staticmethod
    def _identifier(value: Any, default: str) -> str:
        candidate = str(value or default).strip().lower()
        safe = "".join(char if char.isalnum() or char == "_" else "_" for char in candidate)
        safe = safe.strip("_")
        return safe or default

    @staticmethod
    def _entity_id(value: Any) -> str:
        candidate = str(value or "").strip().lower()
        if not candidate:
            return ""
        if "." not in candidate or " " in candidate:
            raise ValueError(f"Invalid entity id: {candidate}")
        return candidate[:255]

    @staticmethod
    def _number(value: Any, default: float, minimum: float, maximum: float) -> float:
        try:
            number = float(value)
        except (TypeError, ValueError):
            number = float(default)
        return min(max(number, minimum), maximum)

    @staticmethod
    def _choice(value: Any, default: str, allowed: set[str]) -> str:
        candidate = str(value or default)
        return candidate if candidate in allowed else default

    @staticmethod
    def _time_text(value: Any, default: str) -> str:
        candidate = str(value or default).strip()
        try:
            hour, minute = candidate.split(":", 1)
            hour_i, minute_i = int(hour), int(minute)
            if not (0 <= hour_i <= 23 and 0 <= minute_i <= 59):
                raise ValueError
            return f"{hour_i:02d}:{minute_i:02d}"
        except (ValueError, TypeError):
            return default

    @staticmethod
    def _month_day(value: Any, default: str) -> str:
        candidate = str(value or default).strip()
        try:
            month, day = candidate.split("-", 1)
            month_i, day_i = int(month), int(day)
            from datetime import date

            date(2000, month_i, day_i)
            return f"{month_i:02d}-{day_i:02d}"
        except (ValueError, TypeError):
            return default

    @staticmethod
    def _date_text(value: Any, default: str) -> str:
        candidate = str(value or default).strip()
        try:
            from datetime import date

            return date.fromisoformat(candidate).isoformat()
        except ValueError:
            return default
