"""Constants for Matrix Energy Center."""

from __future__ import annotations

DOMAIN = "matrix_energy_center"
NAME = "Matrix Energy Center"
VERSION = "0.6.2"

PLATFORMS = ["sensor"]

DATA_STORE = "store"
DATA_COORDINATOR = "coordinator"
DATA_ENTRY_ID = "entry_id"
DATA_PANEL_REGISTERED = "panel_registered"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1

PANEL_URL_PATH = "matrix-energy-center"
PANEL_COMPONENT = "matrix-energy-center-panel"
PANEL_STATIC_URL = "/matrix_energy_center_static"
CARD_MODULE_URL = f"{PANEL_STATIC_URL}/matrix-energy-flow-card.js?v={VERSION}"
PANEL_TITLE = "Energy Center"
PANEL_ICON = "mdi:transmission-tower"

CONF_INSTALLATION_NAME = "installation_name"
CONF_CURRENCY = "currency"
CONF_PANEL_TITLE = "panel_title"
CONF_REFRESH_INTERVAL = "refresh_interval"

DEFAULT_INSTALLATION_NAME = "My Energy Center"
DEFAULT_CURRENCY = "PLN"
DEFAULT_PANEL_TITLE = "Energy Center"
DEFAULT_REFRESH_INTERVAL = 5

# Normalized source roles. The frontend groups and filters these roles, while the
# backend keeps one stable mapping dictionary independent of device vendors.
MAPPING_ROLES = (
    # Home
    "home_power",
    "home_energy_today",
    "home_energy_month",
    # Grid
    "grid_power",
    "grid_import_power",
    "grid_export_power",
    "grid_import_energy",
    "grid_export_energy",
    "grid_voltage",
    "grid_current",
    "grid_frequency",
    "grid_power_factor",
    # Photovoltaics
    "pv_power",
    "pv_energy_today",
    "pv_energy_month",
    "pv_energy_total",
    "pv_forecast_today",
    "pv_forecast_tomorrow",
    "inverter_status",
    "inverter_temperature",
    # Battery
    "battery_power",
    "battery_charge_power",
    "battery_discharge_power",
    "battery_soc",
    "battery_energy",
    "battery_capacity",
    "battery_voltage",
    "battery_current",
    "battery_temperature",
    "battery_health",
    "battery_cycles",
    "battery_charge_energy_today",
    "battery_discharge_energy_today",
    "battery_status",
    # EV / charger
    "ev_power",
    "ev_energy_session",
    "ev_energy_today",
    "ev_soc",
    "ev_range",
    "ev_status",
    "ev_current",
    "ev_voltage",
    "ev_charge_switch",
    "ev_target_soc",
    "ev_current_limit",
    # Prices and costs
    "price_buy",
    "price_sell",
    "price_next_hour",
    "price_min_today",
    "price_max_today",
    "cost_today",
    "cost_month",
)

SIGN_GRID_POSITIVE_IMPORT = "grid_positive_is_import"
SIGN_BATTERY_POSITIVE_CHARGE = "battery_positive_is_charge"
