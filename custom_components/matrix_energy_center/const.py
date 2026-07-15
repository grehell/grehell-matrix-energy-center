"""Constants for Matrix Energy Center."""

from __future__ import annotations

DOMAIN = "matrix_energy_center"
NAME = "Matrix Energy Center"
VERSION = "0.2.0"

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

ROLE_HOME_POWER = "home_power"
ROLE_GRID_POWER = "grid_power"
ROLE_GRID_IMPORT_ENERGY = "grid_import_energy"
ROLE_GRID_EXPORT_ENERGY = "grid_export_energy"
ROLE_PV_POWER = "pv_power"
ROLE_PV_ENERGY_TODAY = "pv_energy_today"
ROLE_BATTERY_POWER = "battery_power"
ROLE_BATTERY_SOC = "battery_soc"
ROLE_BATTERY_ENERGY = "battery_energy"
ROLE_EV_POWER = "ev_power"
ROLE_EV_SOC = "ev_soc"
ROLE_PRICE_BUY = "price_buy"
ROLE_PRICE_SELL = "price_sell"

MAPPING_ROLES = (
    ROLE_HOME_POWER,
    ROLE_GRID_POWER,
    ROLE_GRID_IMPORT_ENERGY,
    ROLE_GRID_EXPORT_ENERGY,
    ROLE_PV_POWER,
    ROLE_PV_ENERGY_TODAY,
    ROLE_BATTERY_POWER,
    ROLE_BATTERY_SOC,
    ROLE_BATTERY_ENERGY,
    ROLE_EV_POWER,
    ROLE_EV_SOC,
    ROLE_PRICE_BUY,
    ROLE_PRICE_SELL,
)

SIGN_GRID_POSITIVE_IMPORT = "grid_positive_is_import"
SIGN_BATTERY_POSITIVE_CHARGE = "battery_positive_is_charge"
