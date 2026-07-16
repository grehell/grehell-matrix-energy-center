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
        "schema_version": 6,
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
        "flow": {
            "title": "PRZEPŁYW ENERGII — NA ŻYWO",
            "layout": "automatic",
            "node_style": "rounded",
            "animation_speed": "normal",
            "show_pv_strings": True,
            "show_devices": True,
            "show_labels": True,
            "show_values": True,
            "show_status": True,
            "show_connectors": True,
            "hide_inactive_devices": False,
            "max_pv_strings": 6,
            "max_devices": 6,
            "branch_gap": 12,
        },
        "overview": {
            "show_builtin_bubbles": True,
            "show_custom_bubbles": True,
            "show_custom_charts": True,
            "bubble_size": "medium",
            "chart_columns": 2,
        },
        "kiosk": {
            "title": "PRZEPŁYW ENERGII",
            "display_preset": "tablet_16_9",
            "compact_header": True,
            "max_bubbles": 6,
            "chart_columns": 2,
            "builtin_bubble_ids": ["home", "pv", "grid"],
            "bubble_layout": "free",
            "bubble_stage_height": 96,
            "bubble_positions": {},
            "flow_offset_x": 0,
            "flow_offset_y": -30,
            "flow_scale": 100,
            "show_price_panel": True,
            "show_consumers_panel": True,
            "show_battery_gauge": False,
            "show_self_sufficiency_gauge": False,
            "auto_fullscreen": True,
            "lovelace_views": [],
            "show_clock": True,
            "show_builtin_bubbles": True,
            "show_custom_bubbles": True,
            "show_status": True,
            "flow_height": "tall",
            "show_charts": True,
            "bubble_selection": "all",
            "bubble_ids": [],
            "chart_selection": "all",
            "chart_ids": [],
            "rotation_enabled": False,
            "rotation_seconds": 20,
            "rotate_flow": True,
            "rotate_charts": True,
            "rotate_overview": True,
            "night_enabled": False,
            "night_start": "22:00",
            "night_end": "06:00",
            "night_brightness": 30,
        },
        "mappings": {role: "" for role in MAPPING_ROLES},
        "pv_strings": [],
        "devices": [],
        "overview_bubbles": [],
        "overview_charts": [],
        "kiosk_profiles": [],
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
            "flow",
            "overview",
            "kiosk",
        ):
            value = loaded.get(section)
            if isinstance(value, dict):
                base[section].update(value)
        for section in (
            "pv_strings",
            "devices",
            "overview_bubbles",
            "overview_charts",
            "kiosk_profiles",
            "tariffs",
        ):
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
        config["schema_version"] = 6
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

        flow = raw.get("flow", {})
        if not isinstance(flow, dict):
            raise ValueError("flow must be an object")
        config["flow"].update(
            {
                "title": self._text(flow.get("title"), "PRZEPŁYW ENERGII — NA ŻYWO", 100),
                "layout": self._choice(
                    flow.get("layout"), "automatic", {"automatic", "compact", "wide"}
                ),
                "node_style": self._choice(
                    flow.get("node_style"), "rounded", {"rounded", "technical", "soft"}
                ),
                "animation_speed": self._choice(
                    flow.get("animation_speed"), "normal", {"slow", "normal", "fast"}
                ),
                "show_pv_strings": bool(flow.get("show_pv_strings", True)),
                "show_devices": bool(flow.get("show_devices", True)),
                "show_labels": bool(flow.get("show_labels", True)),
                "show_values": bool(flow.get("show_values", True)),
                "show_status": bool(flow.get("show_status", True)),
                "show_connectors": bool(flow.get("show_connectors", True)),
                "hide_inactive_devices": bool(flow.get("hide_inactive_devices", False)),
                "max_pv_strings": int(self._number(flow.get("max_pv_strings"), 6, 0, 16)),
                "max_devices": int(self._number(flow.get("max_devices"), 6, 0, 24)),
                "branch_gap": int(self._number(flow.get("branch_gap"), 12, 4, 40)),
            }
        )

        overview = raw.get("overview", {})
        if not isinstance(overview, dict):
            raise ValueError("overview must be an object")
        config["overview"].update(
            {
                "show_builtin_bubbles": bool(overview.get("show_builtin_bubbles", True)),
                "show_custom_bubbles": bool(overview.get("show_custom_bubbles", True)),
                "show_custom_charts": bool(overview.get("show_custom_charts", True)),
                "bubble_size": self._choice(
                    overview.get("bubble_size"), "medium", {"compact", "medium", "large"}
                ),
                "chart_columns": int(self._number(overview.get("chart_columns"), 2, 1, 4)),
            }
        )

        kiosk = raw.get("kiosk", {})
        if not isinstance(kiosk, dict):
            raise ValueError("kiosk must be an object")
        config["kiosk"].update(
            {
                "title": self._text(kiosk.get("title"), "PRZEPŁYW ENERGII", 100),
                "display_preset": self._choice(
                    kiosk.get("display_preset"),
                    "tablet_16_9",
                    {"auto", "tablet_16_9", "desktop"},
                ),
                "compact_header": bool(kiosk.get("compact_header", True)),
                "max_bubbles": int(self._number(kiosk.get("max_bubbles"), 6, 1, 16)),
                "chart_columns": int(self._number(kiosk.get("chart_columns"), 2, 1, 4)),
                "builtin_bubble_ids": [
                    item
                    for item in self._identifier_list(
                        kiosk.get("builtin_bubble_ids", ["home", "pv", "grid"]), 6
                    )
                    if item in {"home", "pv", "grid", "battery", "ev", "price"}
                ],
                "bubble_layout": self._choice(
                    kiosk.get("bubble_layout"), "free", {"grid", "free"}
                ),
                "bubble_stage_height": int(
                    self._number(kiosk.get("bubble_stage_height"), 96, 76, 400)
                ),
                "bubble_positions": self._validate_bubble_positions(
                    kiosk.get("bubble_positions", {})
                ),
                "flow_offset_x": int(
                    self._number(kiosk.get("flow_offset_x"), 0, -400, 400)
                ),
                "flow_offset_y": int(
                    self._number(kiosk.get("flow_offset_y"), -30, -400, 400)
                ),
                "flow_scale": int(
                    self._number(kiosk.get("flow_scale"), 100, 60, 140)
                ),
                "show_price_panel": bool(kiosk.get("show_price_panel", True)),
                "show_consumers_panel": bool(kiosk.get("show_consumers_panel", True)),
                "show_battery_gauge": bool(kiosk.get("show_battery_gauge", False)),
                "show_self_sufficiency_gauge": bool(
                    kiosk.get("show_self_sufficiency_gauge", False)
                ),
                "auto_fullscreen": bool(kiosk.get("auto_fullscreen", True)),
                "lovelace_views": self._validate_kiosk_lovelace_views(
                    kiosk.get("lovelace_views", [])
                ),
                "show_clock": bool(kiosk.get("show_clock", True)),
                "show_builtin_bubbles": bool(kiosk.get("show_builtin_bubbles", True)),
                "show_custom_bubbles": bool(kiosk.get("show_custom_bubbles", True)),
                "show_status": bool(kiosk.get("show_status", True)),
                "flow_height": self._choice(
                    kiosk.get("flow_height"), "tall", {"standard", "tall", "full"}
                ),
                "show_charts": bool(kiosk.get("show_charts", True)),
                "bubble_selection": self._choice(
                    kiosk.get("bubble_selection"), "all", {"all", "selected"}
                ),
                "bubble_ids": self._identifier_list(kiosk.get("bubble_ids"), 64),
                "chart_selection": self._choice(
                    kiosk.get("chart_selection"), "all", {"all", "selected"}
                ),
                "chart_ids": self._identifier_list(kiosk.get("chart_ids"), 32),
                "rotation_enabled": bool(kiosk.get("rotation_enabled", False)),
                "rotation_seconds": int(
                    self._number(kiosk.get("rotation_seconds"), 20, 5, 3600)
                ),
                "rotate_flow": bool(kiosk.get("rotate_flow", True)),
                "rotate_charts": bool(kiosk.get("rotate_charts", True)),
                "rotate_overview": bool(kiosk.get("rotate_overview", True)),
                "night_enabled": bool(kiosk.get("night_enabled", False)),
                "night_start": self._time_text(kiosk.get("night_start"), "22:00"),
                "night_end": self._time_text(kiosk.get("night_end"), "06:00"),
                "night_brightness": int(
                    self._number(kiosk.get("night_brightness"), 30, 5, 100)
                ),
            }
        )

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
        config["overview_bubbles"] = self._validate_overview_bubbles(raw.get("overview_bubbles", []))
        config["overview_charts"] = self._validate_overview_charts(raw.get("overview_charts", []))
        config["kiosk_profiles"] = self._validate_kiosk_profiles(raw.get("kiosk_profiles", []))
        config["tariffs"] = self._validate_tariffs(raw.get("tariffs", []))
        config["tariff"] = self._validate_tariff(raw.get("tariff", {}))
        return config

    def _validate_overview_bubbles(self, raw: Any) -> list[dict[str, Any]]:
        if not isinstance(raw, list):
            raise ValueError("overview_bubbles must be a list")
        result: list[dict[str, Any]] = []
        seen: set[str] = set()
        for index, item in enumerate(raw[:64]):
            if not isinstance(item, dict):
                continue
            item_id = self._identifier(item.get("id"), f"bubble_{index + 1}")
            if item_id in seen:
                item_id = f"{item_id}_{index + 1}"
            seen.add(item_id)
            related_raw = item.get("related_entities", [])
            if not isinstance(related_raw, list):
                related_raw = []
            related_entities: list[dict[str, Any]] = []
            related_seen: set[str] = set()
            for related_index, related in enumerate(related_raw[:8]):
                if not isinstance(related, dict):
                    continue
                related_id = self._identifier(
                    related.get("id"), f"related_{related_index + 1}"
                )
                if related_id in related_seen:
                    related_id = f"{related_id}_{related_index + 1}"
                related_seen.add(related_id)
                related_entities.append(
                    {
                        "id": related_id,
                        "name": self._text(
                            related.get("name"), f"Wartość {related_index + 1}", 80
                        ),
                        "entity_id": self._entity_id(related.get("entity_id", "")),
                        "attribute": self._text(related.get("attribute"), "", 80),
                        "unit": self._text(related.get("unit"), "", 30),
                        "decimals": int(
                            self._number(related.get("decimals"), 1, 0, 6)
                        ),
                        "multiplier": self._number(
                            related.get("multiplier"), 1, -1_000_000, 1_000_000
                        ),
                        "color": self._color(related.get("color"), "#8eb5c3"),
                        "label_color": self._color(
                            related.get("label_color"), "#7195a2"
                        ),
                        "unit_color": self._color(
                            related.get("unit_color"), "#7898a4"
                        ),
                        "value_size": int(
                            self._number(related.get("value_size"), 10, 7, 24)
                        ),
                        "enabled": bool(related.get("enabled", True)),
                    }
                )
            result.append(
                {
                    "id": item_id,
                    "name": self._text(item.get("name"), f"Dymek {index + 1}", 80),
                    "description": self._text(item.get("description"), "", 250),
                    "entity_id": self._entity_id(item.get("entity_id", "")),
                    "attribute": self._text(item.get("attribute"), "", 80),
                    "show_secondary": bool(item.get("show_secondary", False)),
                    "secondary_name": self._text(item.get("secondary_name"), "", 80),
                    "secondary_entity_id": self._entity_id(item.get("secondary_entity_id", "")),
                    "secondary_attribute": self._text(item.get("secondary_attribute"), "", 80),
                    "secondary_unit": self._text(item.get("secondary_unit"), "", 30),
                    "secondary_decimals": int(
                        self._number(item.get("secondary_decimals"), 1, 0, 6)
                    ),
                    "secondary_multiplier": self._number(
                        item.get("secondary_multiplier"), 1, -1_000_000, 1_000_000
                    ),
                    "secondary_color": self._color(
                        item.get("secondary_color"), self._color(item.get("color"), "#20eaff")
                    ),
                    "secondary_label_color": self._color(
                        item.get("secondary_label_color"), "#88afbd"
                    ),
                    "secondary_unit_color": self._color(
                        item.get("secondary_unit_color"), "#7898a4"
                    ),
                    "secondary_value_size": int(
                        self._number(item.get("secondary_value_size"), 11, 7, 28)
                    ),
                    "related_entities": related_entities,
                    "icon": self._text(item.get("icon"), "mdi:information-outline", 80),
                    "color": self._color(item.get("color"), "#20eaff"),
                    "background_color": self._color(item.get("background_color"), "#031426"),
                    "icon_color": self._color(
                        item.get("icon_color"), self._color(item.get("color"), "#20eaff")
                    ),
                    "name_color": self._color(item.get("name_color"), "#8eb5c3"),
                    "value_color": self._color(
                        item.get("value_color"), self._color(item.get("color"), "#20eaff")
                    ),
                    "unit_color": self._color(item.get("unit_color"), "#8eb3c0"),
                    "description_color": self._color(
                        item.get("description_color"), "#6e96a5"
                    ),
                    "border_color": self._color(
                        item.get("border_color"), self._color(item.get("color"), "#20eaff")
                    ),
                    "border_width": int(
                        self._number(item.get("border_width"), 1, 1, 6)
                    ),
                    "border_radius": int(
                        self._number(item.get("border_radius"), 14, 0, 40)
                    ),
                    "icon_size": int(self._number(item.get("icon_size"), 22, 12, 48)),
                    "value_size": int(self._number(item.get("value_size"), 24, 12, 48)),
                    "padding": int(self._number(item.get("padding"), 13, 4, 28)),
                    "text_align": self._choice(
                        item.get("text_align"), "left", {"left", "center", "right"}
                    ),
                    "show_icon": bool(item.get("show_icon", True)),
                    "show_name": bool(item.get("show_name", True)),
                    "show_unit": bool(item.get("show_unit", True)),
                    "show_description": bool(item.get("show_description", True)),
                    "color_mode": self._choice(
                        item.get("color_mode"), "fixed", {"fixed", "threshold"}
                    ),
                    "low_threshold": self._number(
                        item.get("low_threshold"), 0, -1_000_000_000, 1_000_000_000
                    ),
                    "high_threshold": self._number(
                        item.get("high_threshold"), 100, -1_000_000_000, 1_000_000_000
                    ),
                    "low_color": self._color(item.get("low_color"), "#008cff"),
                    "normal_color": self._color(
                        item.get("normal_color"), self._color(item.get("color"), "#20eaff")
                    ),
                    "high_color": self._color(item.get("high_color"), "#ff4d6d"),
                    "unavailable_color": self._color(
                        item.get("unavailable_color"), "#6d7d86"
                    ),
                    "alert_enabled": bool(item.get("alert_enabled", False)),
                    "alert_condition": self._choice(
                        item.get("alert_condition"), "above", {"above", "below", "outside"}
                    ),
                    "alert_low": self._number(
                        item.get("alert_low"), 0, -1_000_000_000, 1_000_000_000
                    ),
                    "alert_high": self._number(
                        item.get("alert_high"), 100, -1_000_000_000, 1_000_000_000
                    ),
                    "alert_color": self._color(item.get("alert_color"), "#ff335f"),
                    "alert_text": self._text(item.get("alert_text"), "ALARM", 80),
                    "unit": self._text(item.get("unit"), "", 30),
                    "decimals": int(self._number(item.get("decimals"), 1, 0, 6)),
                    "multiplier": self._number(item.get("multiplier"), 1, -1_000_000, 1_000_000),
                    "order": int(self._number(item.get("order"), index + 1, 0, 10000)),
                    "enabled": bool(item.get("enabled", True)),
                    "show_sparkline": bool(item.get("show_sparkline", True)),
                    "tap_action": self._choice(
                        item.get("tap_action"), "more_info", {"none", "more_info", "navigate", "service"}
                    ),
                    "navigation_path": self._text(item.get("navigation_path"), "", 500),
                    "service": self._text(item.get("service"), "", 120),
                    "service_data": self._text(item.get("service_data"), "{}", 4000),
                }
            )
        return result

    def _validate_overview_charts(self, raw: Any) -> list[dict[str, Any]]:
        if not isinstance(raw, list):
            raise ValueError("overview_charts must be a list")
        result: list[dict[str, Any]] = []
        seen: set[str] = set()
        for index, item in enumerate(raw[:32]):
            if not isinstance(item, dict):
                continue
            item_id = self._identifier(item.get("id"), f"chart_{index + 1}")
            if item_id in seen:
                item_id = f"{item_id}_{index + 1}"
            seen.add(item_id)
            series_raw = item.get("series", [])
            if not isinstance(series_raw, list):
                series_raw = []
            series: list[dict[str, Any]] = []
            series_seen: set[str] = set()
            for series_index, series_item in enumerate(series_raw[:8]):
                if not isinstance(series_item, dict):
                    continue
                series_id = self._identifier(
                    series_item.get("id"), f"series_{series_index + 1}"
                )
                if series_id in series_seen:
                    series_id = f"{series_id}_{series_index + 1}"
                series_seen.add(series_id)
                series.append(
                    {
                        "id": series_id,
                        "name": self._text(
                            series_item.get("name"), f"Seria {series_index + 2}", 80
                        ),
                        "entity_id": self._entity_id(series_item.get("entity_id", "")),
                        "attribute": self._text(series_item.get("attribute"), "", 80),
                        "color": self._color(series_item.get("color"), "#52ff62"),
                        "unit": self._text(series_item.get("unit"), "", 30),
                        "decimals": int(
                            self._number(series_item.get("decimals"), 1, 0, 6)
                        ),
                        "multiplier": self._number(
                            series_item.get("multiplier"), 1, -1_000_000, 1_000_000
                        ),
                        "enabled": bool(series_item.get("enabled", True)),
                    }
                )
            result.append(
                {
                    "id": item_id,
                    "name": self._text(item.get("name"), f"Wykres {index + 1}", 80),
                    "description": self._text(item.get("description"), "", 250),
                    "entity_id": self._entity_id(item.get("entity_id", "")),
                    "attribute": self._text(item.get("attribute"), "", 80),
                    "icon": self._text(item.get("icon"), "mdi:chart-line", 80),
                    "color": self._color(item.get("color"), "#20eaff"),
                    "unit": self._text(item.get("unit"), "", 30),
                    "decimals": int(self._number(item.get("decimals"), 1, 0, 6)),
                    "multiplier": self._number(item.get("multiplier"), 1, -1_000_000, 1_000_000),
                    "graph_type": self._choice(
                        item.get("graph_type"), "line", {"line", "area", "bar"}
                    ),
                    "height": self._choice(
                        item.get("height"), "medium", {"small", "medium", "large"}
                    ),
                    "points": int(self._number(item.get("points"), 90, 12, 720)),
                    "history_range": self._choice(
                        item.get("history_range"), "session", {"session", "24h", "7d", "30d"}
                    ),
                    "line_width": self._number(item.get("line_width"), 2, 1, 8),
                    "series": series,
                    "order": int(self._number(item.get("order"), index + 1, 0, 10000)),
                    "enabled": bool(item.get("enabled", True)),
                    "show_current": bool(item.get("show_current", True)),
                    "show_min_max": bool(item.get("show_min_max", True)),
                    "tap_action": self._choice(
                        item.get("tap_action"), "more_info", {"none", "more_info", "navigate", "service"}
                    ),
                    "navigation_path": self._text(item.get("navigation_path"), "", 500),
                    "service": self._text(item.get("service"), "", 120),
                    "service_data": self._text(item.get("service_data"), "{}", 4000),
                }
            )
        return result

    def _validate_kiosk_profiles(self, raw: Any) -> list[dict[str, Any]]:
        if not isinstance(raw, list):
            raise ValueError("kiosk_profiles must be a list")
        result: list[dict[str, Any]] = []
        seen: set[str] = set()
        for index, item in enumerate(raw[:24]):
            if not isinstance(item, dict):
                continue
            item_id = self._identifier(item.get("id"), f"kiosk_{index + 1}")
            if item_id in seen:
                item_id = f"{item_id}_{index + 1}"
            seen.add(item_id)
            result.append(
                {
                    "id": item_id,
                    "name": self._text(item.get("name"), f"Kiosk {index + 1}", 80),
                    "description": self._text(item.get("description"), "", 250),
                    "title": self._text(item.get("title"), "PRZEPŁYW ENERGII", 100),
                    "display_preset": self._choice(
                        item.get("display_preset"),
                        "tablet_16_9",
                        {"auto", "tablet_16_9", "desktop"},
                    ),
                    "compact_header": bool(item.get("compact_header", True)),
                    "max_bubbles": int(
                        self._number(item.get("max_bubbles"), 6, 1, 16)
                    ),
                    "chart_columns": int(
                        self._number(item.get("chart_columns"), 2, 1, 4)
                    ),
                    "builtin_bubble_ids": [
                        bubble_id
                        for bubble_id in self._identifier_list(
                            item.get("builtin_bubble_ids", ["home", "pv", "grid"]), 6
                        )
                        if bubble_id
                        in {"home", "pv", "grid", "battery", "ev", "price"}
                    ],
                    "bubble_layout": self._choice(
                        item.get("bubble_layout"), "free", {"grid", "free"}
                    ),
                    "bubble_stage_height": int(
                        self._number(item.get("bubble_stage_height"), 96, 76, 400)
                    ),
                    "bubble_positions": self._validate_bubble_positions(
                        item.get("bubble_positions", {})
                    ),
                    "flow_offset_x": int(
                        self._number(item.get("flow_offset_x"), 0, -400, 400)
                    ),
                    "flow_offset_y": int(
                        self._number(item.get("flow_offset_y"), -30, -400, 400)
                    ),
                    "flow_scale": int(
                        self._number(item.get("flow_scale"), 100, 60, 140)
                    ),
                    "show_price_panel": bool(item.get("show_price_panel", True)),
                    "show_consumers_panel": bool(
                        item.get("show_consumers_panel", True)
                    ),
                    "show_battery_gauge": bool(
                        item.get("show_battery_gauge", False)
                    ),
                    "show_self_sufficiency_gauge": bool(
                        item.get("show_self_sufficiency_gauge", False)
                    ),
                    "auto_fullscreen": bool(item.get("auto_fullscreen", True)),
                    "lovelace_views": self._validate_kiosk_lovelace_views(
                        item.get("lovelace_views", [])
                    ),
                    "show_clock": bool(item.get("show_clock", True)),
                    "show_builtin_bubbles": bool(item.get("show_builtin_bubbles", True)),
                    "show_custom_bubbles": bool(item.get("show_custom_bubbles", True)),
                    "show_status": bool(item.get("show_status", True)),
                    "flow_height": self._choice(
                        item.get("flow_height"), "tall", {"standard", "tall", "full"}
                    ),
                    "show_charts": bool(item.get("show_charts", True)),
                    "bubble_selection": self._choice(
                        item.get("bubble_selection"), "all", {"all", "selected"}
                    ),
                    "bubble_ids": self._identifier_list(item.get("bubble_ids"), 64),
                    "chart_selection": self._choice(
                        item.get("chart_selection"), "all", {"all", "selected"}
                    ),
                    "chart_ids": self._identifier_list(item.get("chart_ids"), 32),
                    "rotation_enabled": bool(item.get("rotation_enabled", False)),
                    "rotation_seconds": int(
                        self._number(item.get("rotation_seconds"), 20, 5, 3600)
                    ),
                    "rotate_flow": bool(item.get("rotate_flow", True)),
                    "rotate_charts": bool(item.get("rotate_charts", True)),
                    "rotate_overview": bool(item.get("rotate_overview", True)),
                    "night_enabled": bool(item.get("night_enabled", False)),
                    "night_start": self._time_text(item.get("night_start"), "22:00"),
                    "night_end": self._time_text(item.get("night_end"), "06:00"),
                    "night_brightness": int(
                        self._number(item.get("night_brightness"), 30, 5, 100)
                    ),
                    "enabled": bool(item.get("enabled", True)),
                }
            )
        return result

    def _validate_bubble_positions(self, raw: Any) -> dict[str, dict[str, float]]:
        """Validate free-layout bubble positions stored per kiosk profile."""
        if not isinstance(raw, dict):
            return {}
        result: dict[str, dict[str, float]] = {}
        for index, (raw_key, value) in enumerate(raw.items()):
            if index >= 64 or not isinstance(value, dict):
                break
            key = self._identifier(raw_key, f"bubble_{index + 1}")
            result[key] = {
                "x": round(self._number(value.get("x"), 0, 0, 92), 2),
                "y": round(self._number(value.get("y"), 0, 0, 360), 2),
                "width": round(self._number(value.get("width"), 16, 8, 60), 2),
            }
        return result

    def _validate_kiosk_lovelace_views(self, raw: Any) -> list[dict[str, Any]]:
        """Validate same-origin Lovelace views embedded as kiosk slides."""
        if not isinstance(raw, list):
            return []
        result: list[dict[str, Any]] = []
        seen: set[str] = set()
        for index, item in enumerate(raw[:12]):
            if not isinstance(item, dict):
                continue
            item_id = self._identifier(item.get("id"), f"lovelace_{index + 1}")
            if item_id in seen:
                item_id = f"{item_id}_{index + 1}"
            seen.add(item_id)
            path = self._text(item.get("path"), "", 500)
            if path and (not path.startswith("/") or "://" in path):
                path = ""
            result.append(
                {
                    "id": item_id,
                    "name": self._text(
                        item.get("name"), f"Lovelace {index + 1}", 80
                    ),
                    "path": path,
                    "enabled": bool(item.get("enabled", True)),
                }
            )
        return result

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
                    "show_in_flow": bool(item.get("show_in_flow", True)),
                    "flow_order": int(self._number(item.get("flow_order"), index + 1, 0, 10000)),
                    "flow_label": self._text(item.get("flow_label"), "", 80),
                    "flow_icon": self._text(item.get("flow_icon"), "mdi:solar-panel-large", 80),
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
                    "show_in_flow": bool(item.get("show_in_flow", False)),
                    "flow_direction": self._choice(
                        item.get("flow_direction"),
                        "consumer",
                        {"consumer", "source", "bidirectional"},
                    ),
                    "flow_order": int(
                        self._number(item.get("flow_order"), item.get("priority", index + 1), 0, 10000)
                    ),
                    "flow_label": self._text(item.get("flow_label"), "", 80),
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
    def _identifier_list(value: Any, maximum: int) -> list[str]:
        if not isinstance(value, list):
            return []
        result: list[str] = []
        for raw in value[:maximum]:
            candidate = str(raw or "").strip().lower()
            safe = "".join(char if char.isalnum() or char == "_" else "_" for char in candidate)
            safe = safe.strip("_")
            if safe and safe not in result:
                result.append(safe)
        return result

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
    def _color(value: Any, default: str) -> str:
        """Return a normalized hexadecimal CSS color."""
        candidate = str(value or default).strip()
        if not candidate.startswith("#") or len(candidate) not in (4, 7, 9):
            return default
        if any(char not in "0123456789abcdefABCDEF" for char in candidate[1:]):
            return default
        if len(candidate) == 4:
            candidate = "#" + "".join(char * 2 for char in candidate[1:])
        return candidate.lower()

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
