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
    assert manifest["version"] == "0.5.0"


def test_hacs_manifest() -> None:
    hacs = json.loads((ROOT / "hacs.json").read_text())
    assert hacs["name"] == "Matrix Energy Center"


def test_frontend_exists() -> None:
    assert (COMPONENT / "frontend" / "matrix-energy-center-panel.js").is_file()


def test_frontend_v05_features() -> None:
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
    assert 'get("kiosk") === "1"' in frontend


def test_configuration_schema_v5() -> None:
    storage = (COMPONENT / "storage.py").read_text()
    assert '"schema_version": 5' in storage
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


def test_example_contains_flows_widgets_and_kiosk() -> None:
    example = json.loads((ROOT / "docs" / "example-config.json").read_text())
    assert example["schema_version"] == 5
    assert len(example["pv_strings"]) >= 2
    assert all(item["show_in_flow"] for item in example["pv_strings"][:2])
    assert example["devices"][0]["show_in_flow"] is True
    assert example["devices"][0]["flow_direction"] == "consumer"
    assert example["flow"]["show_pv_strings"] is True
    assert example["flow"]["show_devices"] is True
    assert len(example["overview_bubbles"]) >= 2
    assert len(example["overview_charts"]) >= 2
    assert example["overview_charts"][0]["graph_type"] in {"line", "area", "bar"}
    assert example["kiosk"]["show_custom_bubbles"] is True
