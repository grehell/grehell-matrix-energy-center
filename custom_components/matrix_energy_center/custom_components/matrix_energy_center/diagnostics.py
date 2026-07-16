"""Diagnostics support for Matrix Energy Center."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DATA_COORDINATOR, DATA_STORE, DOMAIN


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> dict[str, Any]:
    """Return diagnostics without secrets or external credentials."""
    domain_data = hass.data[DOMAIN]
    store = domain_data[DATA_STORE]
    coordinator = domain_data.get(DATA_COORDINATOR)
    config = store.config
    # Installation label is user text and is not needed to diagnose mappings.
    config["general"]["installation_name"] = "REDACTED"
    return {
        "entry": {
            "title": entry.title,
            "version": entry.version,
            "options": dict(entry.options),
        },
        "configuration": config,
        "runtime": coordinator.data if coordinator else None,
    }
