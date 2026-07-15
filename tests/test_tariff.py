from __future__ import annotations

from datetime import datetime
import importlib.util
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "custom_components" / "matrix_energy_center" / "tariff.py"
SPEC = importlib.util.spec_from_file_location("matrix_energy_tariff_test", MODULE_PATH)
assert SPEC and SPEC.loader
TARIFF = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = TARIFF
SPEC.loader.exec_module(TARIFF)


def config():
    value = TARIFF.default_tauron_g13_tariff()
    value["enabled"] = True
    return value


def test_g13_summer_workday_zones():
    cfg = config()
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 12, 0), cfg).zone == "morning_peak"
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 14, 0), cfg).zone == "off_peak"
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 20, 0), cfg).zone == "afternoon_peak"
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 23, 0), cfg).zone == "off_peak"


def test_g13_winter_workday_zones():
    cfg = config()
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 1, 14, 12, 0), cfg).zone == "morning_peak"
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 1, 14, 14, 0), cfg).zone == "off_peak"
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 1, 14, 17, 0), cfg).zone == "afternoon_peak"
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 1, 14, 22, 0), cfg).zone == "off_peak"


def test_weekend_and_next_workday_until_0700_are_offpeak():
    cfg = config()
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 7, 18, 12, 0), cfg).zone == "off_peak"  # Saturday
    before = TARIFF.evaluate_tauron_g13(datetime(2026, 7, 20, 6, 59), cfg)
    after = TARIFF.evaluate_tauron_g13(datetime(2026, 7, 20, 7, 0), cfg)
    assert before.zone == "off_peak"
    assert before.day_type == "after_day_off"
    assert after.zone == "morning_peak"


def test_polish_public_holiday_and_christmas_eve():
    cfg = config()
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 5, 1, 12, 0), cfg).zone == "off_peak"
    assert TARIFF.evaluate_tauron_g13(datetime(2026, 12, 24, 12, 0), cfg).zone == "off_peak"


def test_2026_distribution_components_and_fixed_fees():
    cfg = config()
    morning = TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 12, 0), cfg)
    offpeak = TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 14, 0), cfg)
    assert morning.total_price == 0.3245
    assert offpeak.total_price == 0.1017
    assert morning.fixed_monthly == 40.10


def test_separate_summer_and_winter_energy_prices_are_selected():
    cfg = config()
    cfg["energy_prices"]["summer"]["morning_peak"] = 0.50
    cfg["energy_prices"]["winter"]["morning_peak"] = 0.80
    summer = TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 12, 0), cfg)
    winter = TARIFF.evaluate_tauron_g13(datetime(2026, 1, 14, 12, 0), cfg)
    assert summer.energy_price == 0.50
    assert winter.energy_price == 0.80
    assert summer.total_price == 0.8245
    assert winter.total_price == 1.1245


def test_combined_price_mode_does_not_add_distribution_again():
    cfg = config()
    cfg["price_mode"] = "combined"
    cfg["combined_prices"]["summer"]["afternoon_peak"] = 1.2345
    snapshot = TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 20, 0), cfg)
    assert snapshot.total_price == 1.2345
    assert snapshot.energy_price is None
    assert snapshot.distribution_price is None


def test_custom_holiday_is_offpeak():
    cfg = config()
    cfg["calendar"]["custom_holidays"] = "2026-07-15"
    snapshot = TARIFF.evaluate_tauron_g13(datetime(2026, 7, 15, 12, 0), cfg)
    assert snapshot.zone == "off_peak"
    assert snapshot.day_type == "day_off"


def test_expired_preset_warns_user_to_review_rates():
    cfg = config()
    cfg["energy_prices"]["winter"]["morning_peak"] = 0.7
    snapshot = TARIFF.evaluate_tauron_g13(datetime(2027, 1, 13, 12, 0), cfg)
    assert "wygasły 2026-12-31" in (snapshot.schedule_warning or "")
