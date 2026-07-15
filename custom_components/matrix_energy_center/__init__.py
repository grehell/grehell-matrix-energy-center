"""Matrix Energy Center integration."""

from __future__ import annotations

from pathlib import Path

import voluptuous as vol

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv, service
from homeassistant.helpers.typing import ConfigType

from .const import (
    CONF_CURRENCY,
    CONF_INSTALLATION_NAME,
    CONF_PANEL_TITLE,
    DATA_COORDINATOR,
    DATA_ENTRY_ID,
    DATA_PANEL_REGISTERED,
    DATA_STORE,
    DOMAIN,
    PANEL_COMPONENT,
    PANEL_ICON,
    PANEL_STATIC_URL,
    PANEL_TITLE,
    PANEL_URL_PATH,
    PLATFORMS,
)
from .coordinator import MatrixEnergyCoordinator
from .storage import MatrixEnergyStore
from .websocket_api import async_register_websocket_commands

SERVICE_RELOAD = "reload_configuration"
SERVICE_RESET = "reset_configuration"

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up integration-level resources."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Matrix Energy Center from a config entry."""
    domain_data = hass.data.setdefault(DOMAIN, {})

    store = MatrixEnergyStore(hass)
    current = await store.async_load()

    # Seed first-run labels from config flow without overwriting later panel edits.
    if current.get("revision", 0) == 0:
        current["general"].update(
            {
                "installation_name": entry.data.get(
                    CONF_INSTALLATION_NAME, current["general"]["installation_name"]
                ),
                "panel_title": entry.data.get(
                    CONF_PANEL_TITLE, current["general"]["panel_title"]
                ),
                "currency": entry.data.get(
                    CONF_CURRENCY, current["general"]["currency"]
                ),
            }
        )
        await store.async_save(current)

    coordinator = MatrixEnergyCoordinator(hass, entry, store)
    await coordinator.async_config_entry_first_refresh()

    domain_data[DATA_STORE] = store
    domain_data[DATA_COORDINATOR] = coordinator
    domain_data[DATA_ENTRY_ID] = entry.entry_id
    domain_data[entry.entry_id] = {
        DATA_STORE: store,
        DATA_COORDINATOR: coordinator,
    }

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    await _async_register_frontend(hass, store)

    if not domain_data.get("websocket_registered"):
        async_register_websocket_commands(hass)
        domain_data["websocket_registered"] = True

    if not domain_data.get("services_registered"):
        _register_services(hass)
        domain_data["services_registered"] = True

    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        domain_data = hass.data.get(DOMAIN, {})
        domain_data.pop(entry.entry_id, None)
        frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
        domain_data[DATA_PANEL_REGISTERED] = False
    return unloaded


async def _async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload when technical options change."""
    await hass.config_entries.async_reload(entry.entry_id)


async def _async_register_frontend(
    hass: HomeAssistant,
    store: MatrixEnergyStore,
) -> None:
    """Serve and register the Matrix Energy Center custom panel."""
    domain_data = hass.data[DOMAIN]
    if domain_data.get(DATA_PANEL_REGISTERED):
        return

    frontend_dir = Path(__file__).parent / "frontend"
    if not domain_data.get("static_registered"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(PANEL_STATIC_URL, str(frontend_dir), True)]
        )
        domain_data["static_registered"] = True

    config = store.config
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=config["general"].get("panel_title", PANEL_TITLE),
        sidebar_icon=PANEL_ICON,
        module_url=f"{PANEL_STATIC_URL}/matrix-energy-center-panel.js?v=0.5.0",
        embed_iframe=False,
        require_admin=False,
        config={"domain": DOMAIN},
        config_panel_domain=DOMAIN,
    )
    domain_data[DATA_PANEL_REGISTERED] = True


def _register_services(hass: HomeAssistant) -> None:
    """Register administrative service actions."""

    async def handle_reload(call: ServiceCall) -> None:
        entry_id = hass.data[DOMAIN].get(DATA_ENTRY_ID)
        if entry_id:
            await hass.config_entries.async_reload(entry_id)

    async def handle_reset(call: ServiceCall) -> None:
        store: MatrixEnergyStore = hass.data[DOMAIN][DATA_STORE]
        await store.async_reset()
        coordinator: MatrixEnergyCoordinator = hass.data[DOMAIN][DATA_COORDINATOR]
        await coordinator.async_request_refresh()

    service.async_register_admin_service(
        hass,
        DOMAIN,
        SERVICE_RELOAD,
        handle_reload,
        vol.Schema({}),
    )
    service.async_register_admin_service(
        hass,
        DOMAIN,
        SERVICE_RESET,
        handle_reset,
        vol.Schema({}),
    )
