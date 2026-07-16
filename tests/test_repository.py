"""Lightweight repository checks which do not require Home Assistant."""

from __future__ import annotations

import json
from pathlib import Path
import shutil
import subprocess

import pytest

ROOT = Path(__file__).resolve().parents[1]
COMPONENT = ROOT / "custom_components" / "matrix_energy_center"


def test_manifest() -> None:
    manifest = json.loads((COMPONENT / "manifest.json").read_text())
    assert manifest["domain"] == "matrix_energy_center"
    assert manifest["config_flow"] is True
    assert manifest["version"] == "0.7.0"


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
    assert "flow_element_styles" in frontend
    assert "flow_node_positions" in frontend
    assert "data-flow-action" in frontend
    assert 'callService("homeassistant", "toggle"' in frontend
    assert "flow-custom-image" in frontend
    assert "flow-extra-fields" in frontend


def test_frontend_features() -> None:
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
    assert "open-bubble-layout-editor" in frontend
    assert "data-flow-layout-element" in frontend
    assert "flow-layout-editing" in frontend
    assert "layout-editor-fixed-background" in frontend
    assert "branch-bus-line" in frontend
    assert "label_grid" in frontend
    assert "wire_ev" in frontend
    assert "_bindKioskSwipe" in frontend
    assert "touch-action:pan-y" in frontend
    assert "flow_element_styles" in frontend
    assert "flow-node-custom-image" in frontend
    assert "data-flow-custom-field" in frontend
    assert "data-flow-action-element" in frontend
    assert 'callService("homeassistant", "toggle"' in frontend
    assert "add-flow-extra-field" in frontend
    assert "appearance_enabled" in frontend
    assert "select-flow-layout-element" in frontend
    assert "height:calc(100% - 32px)!important" in frontend
    assert "overflow:visible;pointer-events:none;background:transparent" in frontend
    assert "toggle-kiosk-builtin" in frontend
    assert "kiosk-lovelace-slide" in frontend
    assert "auto_fullscreen" in frontend
    assert "tap_action" in frontend
    assert "NOWY EDYTOR V0.7" in frontend
    assert "data-flow-scene" in frontend
    assert "scene-connection-flow" in frontend
    assert "_sceneConnectionState" in frontend
    assert "_bindSettingsSceneEditor" in frontend
    assert "data-settings-target" in frontend
    assert "reset-settings-scene" in frontend
    assert "label_background" in frontend
    assert "forward_color" in frontend
    assert "reverse_color" in frontend
    assert "unavailable_color" in frontend


def test_configuration_schema_v7() -> None:
    storage = (COMPONENT / "storage.py").read_text()
    assert '"schema_version": 7' in storage
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
    assert '"bubble_positions"' in storage
    assert '"flow_node_positions"' in storage
    assert '"flow_element_styles"' in storage
    assert '"appearance_enabled"' in storage
    assert '"tap_action"' in storage
    assert '"extra_fields"' in storage
    assert 'image_url.startswith("/local/")' in storage
    assert '"show_battery_gauge": False' in storage
    assert '"show_self_sufficiency_gauge": False' in storage
    assert '"lovelace_views": []' in storage
    assert '"auto_fullscreen": True' in storage
    assert '"flow_scene"' in storage
    assert '"forward_color"' in storage
    assert '"reverse_color"' in storage
    assert '"direction_source"' in storage
    assert '"label_background"' in storage


def test_example_contains_flows_widgets_and_kiosk() -> None:
    example = json.loads((ROOT / "docs" / "example-config.json").read_text())
    assert example["schema_version"] == 7
    assert len(example["pv_strings"]) >= 2
    assert all(item["show_in_flow"] for item in example["pv_strings"][:2])
    assert example["devices"][0]["show_in_flow"] is True
    assert example["devices"][0]["flow_direction"] == "consumer"
    assert "flow_element_styles" in example["flow"]
    assert "flow_element_styles" in example["overview"]
    assert "flow_element_styles" in example["kiosk"]
    assert "flow_element_styles" in example["kiosk_profiles"][0]
    assert "flow_scene" in example["flow"]
    assert "flow_scene" in example["overview"]
    assert "flow_scene" in example["kiosk"]
    assert "flow_scene" in example["kiosk_profiles"][0]
    assert example["flow"]["show_pv_strings"] is True
    assert example["flow"]["show_devices"] is True
    assert example["flow"]["flow_node_positions"] == {}
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
    assert example["kiosk"]["builtin_bubble_ids"] == ["home", "pv", "grid"]
    assert example["kiosk"]["bubble_layout"] == "free"
    assert example["kiosk"]["flow_node_positions"] == {}
    assert example["kiosk"]["flow_offset_y"] == -30
    assert example["kiosk"]["show_battery_gauge"] is False
    assert example["kiosk"]["show_self_sufficiency_gauge"] is False
    assert example["kiosk"]["auto_fullscreen"] is True
    assert example["kiosk"]["lovelace_views"][0]["path"].startswith("/")
    assert example["overview_bubbles"][0]["border_radius"] == 16
    assert example["overview_bubbles"][0]["border_width"] == 2
    assert example["overview_bubbles"][0]["value_color"] == "#b8ff3d"
    assert example["overview_bubbles"][0]["related_entities"][0]["value_size"] == 10
    assert example["kiosk_profiles"][0]["id"] == "salon"


def test_flow_scene_runtime_rules() -> None:
    node = shutil.which("node")
    if not node:
        pytest.skip("node is unavailable")
    result = subprocess.run(
        [node, "tests/flow_scene_smoke.js"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    assert "flow scene rules ok" in result.stdout
