"""Config flow for Matrix Energy Center."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.config_entries import ConfigFlowResult, OptionsFlow
from homeassistant.const import CONF_NAME
from homeassistant.core import callback

from .const import (
    CONF_CURRENCY,
    CONF_INSTALLATION_NAME,
    CONF_PANEL_TITLE,
    CONF_REFRESH_INTERVAL,
    DEFAULT_CURRENCY,
    DEFAULT_INSTALLATION_NAME,
    DEFAULT_PANEL_TITLE,
    DEFAULT_REFRESH_INTERVAL,
    DOMAIN,
)


class MatrixEnergyCenterConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Matrix Energy Center."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create the single Matrix Energy Center installation."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            title = str(user_input[CONF_INSTALLATION_NAME]).strip()
            return self.async_create_entry(title=title, data=user_input)

        schema = vol.Schema(
            {
                vol.Required(
                    CONF_INSTALLATION_NAME,
                    default=DEFAULT_INSTALLATION_NAME,
                ): str,
                vol.Required(CONF_PANEL_TITLE, default=DEFAULT_PANEL_TITLE): str,
                vol.Required(CONF_CURRENCY, default=DEFAULT_CURRENCY): str,
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: config_entries.ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return MatrixEnergyOptionsFlow()


class MatrixEnergyOptionsFlow(OptionsFlow):
    """Options flow for technical settings."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage technical options."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)

        current = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_REFRESH_INTERVAL,
                    default=current.get(CONF_REFRESH_INTERVAL, DEFAULT_REFRESH_INTERVAL),
                ): vol.All(vol.Coerce(int), vol.Range(min=2, max=60)),
                vol.Optional(
                    CONF_NAME,
                    default=current.get(CONF_NAME, self.config_entry.title),
                ): str,
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
