"""WebSocket API for the Matrix Energy Center panel."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import ActiveConnection
from homeassistant.core import HomeAssistant, callback

from .const import DATA_COORDINATOR, DATA_STORE, DOMAIN
from .coordinator import MatrixEnergyCoordinator
from .storage import MatrixEnergyStore


def _runtime(hass: HomeAssistant) -> tuple[MatrixEnergyStore, MatrixEnergyCoordinator | None]:
    domain_data = hass.data.get(DOMAIN, {})
    store = domain_data.get(DATA_STORE)
    if store is None:
        raise RuntimeError("Matrix Energy Center is not initialized")
    coordinator = domain_data.get(DATA_COORDINATOR)
    return store, coordinator


@callback
def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register panel WebSocket commands."""
    websocket_api.async_register_command(hass, websocket_get_config)
    websocket_api.async_register_command(hass, websocket_save_config)
    websocket_api.async_register_command(hass, websocket_get_runtime)
    websocket_api.async_register_command(hass, websocket_reset_config)
    websocket_api.async_register_command(hass, websocket_test_entity)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/config/get"})
@websocket_api.async_response
async def websocket_get_config(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return complete user configuration."""
    store, _ = _runtime(hass)
    connection.send_result(msg["id"], store.config)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/config/save",
        vol.Required("config"): dict,
    }
)
@websocket_api.async_response
async def websocket_save_config(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Validate and save complete user configuration."""
    store, coordinator = _runtime(hass)
    try:
        saved = await store.async_save(msg["config"])
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_config", str(err))
        return
    if coordinator is not None:
        await coordinator.async_request_refresh()
    hass.bus.async_fire(f"{DOMAIN}_configuration_updated", {"revision": saved["revision"]})
    connection.send_result(msg["id"], saved)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/runtime/get"})
@websocket_api.async_response
async def websocket_get_runtime(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return normalized runtime values."""
    _, coordinator = _runtime(hass)
    connection.send_result(msg["id"], coordinator.data if coordinator else {})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/config/reset"})
@websocket_api.async_response
async def websocket_reset_config(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Reset configuration to defaults."""
    store, coordinator = _runtime(hass)
    saved = await store.async_reset()
    if coordinator is not None:
        await coordinator.async_request_refresh()
    connection.send_result(msg["id"], saved)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/entity/test",
        vol.Required("entity_id"): str,
    }
)
@websocket_api.async_response
async def websocket_test_entity(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return source entity diagnostics for the configuration UI."""
    state = hass.states.get(msg["entity_id"])
    if state is None:
        connection.send_error(msg["id"], "not_found", "Entity does not exist")
        return
    connection.send_result(
        msg["id"],
        {
            "entity_id": state.entity_id,
            "state": state.state,
            "attributes": {
                "friendly_name": state.attributes.get("friendly_name"),
                "unit_of_measurement": state.attributes.get("unit_of_measurement"),
                "device_class": state.attributes.get("device_class"),
                "state_class": state.attributes.get("state_class"),
            },
        },
    )
