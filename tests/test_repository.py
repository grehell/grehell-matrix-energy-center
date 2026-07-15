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
    assert manifest["version"] == "0.2.0"


def test_hacs_manifest() -> None:
    hacs = json.loads((ROOT / "hacs.json").read_text())
    assert hacs["name"] == "Matrix Energy Center"


def test_frontend_exists() -> None:
    assert (COMPONENT / "frontend" / "matrix-energy-center-panel.js").is_file()
