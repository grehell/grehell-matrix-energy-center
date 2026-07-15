"""Lightweight repository checks which do not require Home Assistant."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMPONENT = ROOT / "custom_components" / "matrix_energy_center"


def test_manifest() -> None:
    manifest = json.loads((COMPONENT / "manifest.json").read_text())
    assert manifest["domain"] == "matrix_energy_center"
    assert manifest["config_flow"] is True
    assert manifest["version"] == "0.6.3"


def test_hacs_manifest() -> None:
    hacs = json.loads((ROOT / "hacs.json").read_text())
    assert hacs["name"] == "Matrix Energy Center"


def test_frontend_exists() -> None:
    assert (COMPONENT / "frontend" / "matrix-energy-center-panel.js").is_file()
    assert (COMPONENT / "frontend" / "matrix-energy-flow-card.js").is_file()


def test_native_lovelace_flow_card() -> None:
    frontend = (COMPONENT / "frontend" / "matrix-energy-flow-card.js").read_text()
    integration = (COMPONENT / "__init__.py").read_text()
    assert 'customElements.define("matrix-energy-flow-card"' in frontend
    assert 'type: "matrix-energy-flow-card"' in frontend
    assert "getGridOptions" in frontend
    assert "matrix_energy_center/config/get" not in frontend
    assert "`${MATRIX_DOMAIN}/config/get`" in frontend
    assert "add_extra_js_url(hass, CARD_MODULE_URL)" in integration
    assert "remove_extra_js_url(hass, card_url)" in integration
    assert 'module_url=f"{PANEL_STATIC_URL}/matrix-energy-center-panel.js?v={VERSION}"' in integration


def test_frontend_v06_features() -> None:
    frontend = (COMPONENT / "frontend" / "matrix-energy-center-panel.js").read_text()
    assert "WYSZUKIWARKA ENCJI HOME ASSISTANT" in frontend
    assert "data-live-rerender" in frontend
    assert "flow-grid" in frontend
    assert "data-flow-link" in frontend
    assert "KONFIGURACJA OKNA PRZEPŁYWÓW" in frontend
    assert "data-flow-string-power" in frontend
    assert "data-flow-device-flow-power" in frontend
    assert "flow-branch-bus" in frontend
    assert "KONFIGURATOR PRZEGLĄDU" in frontend
    assert "data-overview-bubble-value" in frontend
    assert "data-custom-chart" in frontend
    assert "graph-area" in frontend
    assert "KARTA KIOSK" in frontend
    assert "toggle-fullscreen" in frontend
    assert 'get("kiosk")' in frontend
    assert "POWIĄZANE SERIE NA JEDNYM WYKRESIE" in frontend
    assert "ENCJE POWIĄZANE W DYMKU" in frontend
    assert "data-overview-bubble-related" in frontend
    assert "data-series-index" in frontend
    assert "recorder/statistics_during_period" in frontend
    assert "add-kiosk-profile" in frontend
    assert "rotation_seconds" in frontend
    assert "night_brightness" in frontend
    assert "tablet_16_9" in frontend
    assert "display-tablet_16_9" in frontend
    assert "max_bubbles" in frontend
    assert "chart_columns" in frontend
    assert "border_radius" in frontend
    assert "border_color" in frontend
    assert "value_color" in frontend
    assert "icon_color" in frontend
    assert "tap_action" in frontend


def test_configuration_schema_v6() -> None:
    storage = (COMPONENT / "storage.py").read_text()
    assert '"schema_version": 6' in storage
    assert '"status_entity"' in storage
    assert '"show_on_overview"' in storage
    assert '"show_in_flow"' in storage
    assert '"flow_direction"' in storage
    assert '"max_pv_strings"' in storage
    assert '"overview_bubbles"' in storage
    assert '"overview_charts"' in storage
    assert '"background_color"' in storage
    assert '"graph_type"' in storage
    assert '"flow_height"' in storage
    assert '"related_entities"' in storage
    assert '"series"' in storage
    assert '"history_range"' in storage
    assert '"kiosk_profiles"' in storage
    assert '"display_preset": "tablet_16_9"' in storage
    assert '"max_bubbles": 6' in storage
    assert '"chart_columns": 2' in storage
    assert '"border_radius"' in storage
    assert '"border_width"' in storage
    assert '"value_color"' in storage
    assert '"description_color"' in storage


def test_example_contains_flows_widgets_and_kiosk() -> None:
    example = json.loads((ROOT / "docs" / "example-config.json").read_text())
    assert example["schema_version"] == 6
    assert len(example["pv_strings"]) >= 2
    assert all(item["show_in_flow"] for item in example["pv_strings"][:2])
    assert example["devices"][0]["show_in_flow"] is True
    assert example["devices"][0]["flow_direction"] == "consumer"
    assert example["flow"]["show_pv_strings"] is True
    assert example["flow"]["show_devices"] is True
    assert len(example["overview_bubbles"]) >= 2
    assert len(example["overview_charts"]) >= 2
    assert example["overview_charts"][0]["graph_type"] in {"line", "area", "bar"}
    assert len(example["overview_charts"][0]["series"]) >= 1
    assert example["overview_charts"][0]["history_range"] in {"session", "24h", "7d", "30d"}
    assert len(example["overview_bubbles"][0]["related_entities"]) >= 2
    assert example["kiosk"]["show_custom_bubbles"] is True
    assert example["kiosk"]["rotation_enabled"] is True
    assert example["kiosk"]["night_enabled"] is True
    assert example["kiosk"]["display_preset"] == "tablet_16_9"
    assert example["kiosk"]["max_bubbles"] == 6
    assert example["kiosk"]["chart_columns"] == 2
    assert example["overview_bubbles"][0]["border_radius"] == 16
    assert example["overview_bubbles"][0]["border_width"] == 2
    assert example["overview_bubbles"][0]["value_color"] == "#b8ff3d"
    assert example["overview_bubbles"][0]["related_entities"][0]["value_size"] == 10
    assert example["kiosk_profiles"][0]["id"] == "salon"
