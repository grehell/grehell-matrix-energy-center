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
    assert manifest["version"] == "0.4.0"


def test_hacs_manifest() -> None:
    hacs = json.loads((ROOT / "hacs.json").read_text())
    assert hacs["name"] == "Matrix Energy Center"


def test_frontend_exists() -> None:
    assert (COMPONENT / "frontend" / "matrix-energy-center-panel.js").is_file()


def test_frontend_v04_features() -> None:
    frontend = (COMPONENT / "frontend" / "matrix-energy-center-panel.js").read_text()
    assert "WYSZUKIWARKA ENCJI HOME ASSISTANT" in frontend
    assert "data-live-rerender" in frontend
    assert "flow-grid" in frontend
    assert "data-flow-link" in frontend
    assert "KONFIGURACJA OKNA PRZEPŁYWÓW" in frontend
    assert "data-flow-string-power" in frontend
    assert "data-flow-device-flow-power" in frontend
    assert "flow-branch-bus" in frontend


def test_configuration_schema_v4() -> None:
    storage = (COMPONENT / "storage.py").read_text()
    assert '"schema_version": 4' in storage
    assert '"status_entity"' in storage
    assert '"show_on_overview"' in storage
    assert '"show_in_flow"' in storage
    assert '"flow_direction"' in storage
    assert '"max_pv_strings"' in storage


def test_example_contains_two_flow_strings_and_device() -> None:
    example = json.loads((ROOT / "docs" / "example-config.json").read_text())
    assert example["schema_version"] == 4
    assert len(example["pv_strings"]) >= 2
    assert all(item["show_in_flow"] for item in example["pv_strings"][:2])
    assert example["devices"][0]["show_in_flow"] is True
    assert example["devices"][0]["flow_direction"] == "consumer"
    assert example["flow"]["show_pv_strings"] is True
    assert example["flow"]["show_devices"] is True
