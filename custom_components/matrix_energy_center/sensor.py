"""Normalized sensors for Matrix Energy Center."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, UnitOfEnergy, UnitOfPower
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DATA_COORDINATOR, DOMAIN, NAME, VERSION
from .coordinator import MatrixEnergyCoordinator


@dataclass(frozen=True, kw_only=True)
class MatrixSensorDescription:
    key: str
    name: str
    icon: str
    native_unit: str | None = None
    device_class: SensorDeviceClass | None = None
    state_class: SensorStateClass | None = None


SENSORS = (
    MatrixSensorDescription(
        key="home_power",
        name="Home power",
        icon="mdi:home-lightning-bolt-outline",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="grid_power",
        name="Grid signed power",
        icon="mdi:transmission-tower",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="grid_import_power",
        name="Grid import power",
        icon="mdi:transmission-tower-import",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="grid_export_power",
        name="Grid export power",
        icon="mdi:transmission-tower-export",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="grid_import_energy",
        name="Grid import energy",
        icon="mdi:transmission-tower-import",
        native_unit=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    MatrixSensorDescription(
        key="grid_export_energy",
        name="Grid export energy",
        icon="mdi:transmission-tower-export",
        native_unit=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    MatrixSensorDescription(
        key="pv_power",
        name="PV power",
        icon="mdi:solar-power-variant",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="pv_energy_today",
        name="PV energy today",
        icon="mdi:solar-power",
        native_unit=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL,
    ),
    MatrixSensorDescription(
        key="battery_power",
        name="Battery signed power",
        icon="mdi:battery-sync",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="battery_charge_power",
        name="Battery charge power",
        icon="mdi:battery-arrow-up",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="battery_discharge_power",
        name="Battery discharge power",
        icon="mdi:battery-arrow-down",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="battery_soc",
        name="Battery state of charge",
        icon="mdi:battery-high",
        native_unit=PERCENTAGE,
        device_class=SensorDeviceClass.BATTERY,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="battery_energy",
        name="Battery available energy",
        icon="mdi:battery-charging-medium",
        native_unit=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY_STORAGE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="ev_power",
        name="EV charging power",
        icon="mdi:ev-station",
        native_unit=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="ev_soc",
        name="EV state of charge",
        icon="mdi:car-electric",
        native_unit=PERCENTAGE,
        device_class=SensorDeviceClass.BATTERY,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="price_buy",
        name="Energy purchase price",
        icon="mdi:currency-usd",
    ),
    MatrixSensorDescription(
        key="price_sell",
        name="Energy sale price",
        icon="mdi:cash-plus",
    ),

    MatrixSensorDescription(
        key="tariff_zone",
        name="Active G13 zone",
        icon="mdi:clock-time-four-outline",
    ),
    MatrixSensorDescription(
        key="tariff_season",
        name="G13 season",
        icon="mdi:calendar-range",
    ),
    MatrixSensorDescription(
        key="tariff_day_type",
        name="G13 day type",
        icon="mdi:calendar-today-outline",
    ),
    MatrixSensorDescription(
        key="tariff_price_energy",
        name="G13 energy price component",
        icon="mdi:lightning-bolt",
    ),
    MatrixSensorDescription(
        key="tariff_price_distribution",
        name="G13 distribution price component",
        icon="mdi:transmission-tower",
    ),
    MatrixSensorDescription(
        key="tariff_price_surcharges",
        name="G13 variable fees component",
        icon="mdi:receipt-text-outline",
    ),
    MatrixSensorDescription(
        key="tariff_price_total",
        name="G13 total purchase price",
        icon="mdi:cash-multiple",
    ),
    MatrixSensorDescription(
        key="tariff_fixed_monthly",
        name="G13 fixed monthly fees",
        icon="mdi:calendar-cash-outline",
    ),
    MatrixSensorDescription(
        key="tariff_next_zone",
        name="Next G13 zone",
        icon="mdi:clock-forward",
    ),
    MatrixSensorDescription(
        key="tariff_next_change_minutes",
        name="Minutes to next G13 zone",
        icon="mdi:timer-sand",
        native_unit="min",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="grid_import_cost_per_hour",
        name="Current grid import cost per hour",
        icon="mdi:cash-clock",
    ),

    MatrixSensorDescription(
        key="self_sufficiency_live",
        name="Live self-sufficiency",
        icon="mdi:home-percent",
        native_unit=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    MatrixSensorDescription(
        key="self_consumption_live",
        name="Live PV self-consumption",
        icon="mdi:solar-power-variant-outline",
        native_unit=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Matrix Energy Center sensors."""
    coordinator: MatrixEnergyCoordinator = hass.data[DOMAIN][entry.entry_id][DATA_COORDINATOR]
    async_add_entities(
        MatrixEnergySensor(coordinator, entry, description) for description in SENSORS
    )


class MatrixEnergySensor(CoordinatorEntity[MatrixEnergyCoordinator], SensorEntity):
    """A normalized Matrix Energy Center sensor."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: MatrixEnergyCoordinator,
        entry: ConfigEntry,
        description: MatrixSensorDescription,
    ) -> None:
        super().__init__(coordinator)
        self._description = description
        self._attr_unique_id = f"{entry.entry_id}_{description.key}"
        self._attr_name = description.name
        self._attr_icon = description.icon
        self._attr_native_unit_of_measurement = description.native_unit
        currency = coordinator.store.config["general"]["currency"]
        if description.key in {"price_buy", "price_sell", "tariff_price_energy", "tariff_price_distribution", "tariff_price_surcharges", "tariff_price_total"}:
            self._attr_native_unit_of_measurement = f"{currency}/kWh"
        elif description.key == "tariff_fixed_monthly":
            self._attr_native_unit_of_measurement = f"{currency}/month"
        elif description.key == "grid_import_cost_per_hour":
            self._attr_native_unit_of_measurement = f"{currency}/h"
        self._attr_device_class = description.device_class
        self._attr_state_class = description.state_class
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=NAME,
            manufacturer="Matrix Energy Center Community",
            model="Virtual energy controller",
            sw_version=VERSION,
        )

    @property
    def native_value(self) -> Any:
        """Return the current normalized value."""
        if not self.coordinator.data:
            return None
        value = self.coordinator.data.get(self._description.key)
        return round(value, 3) if isinstance(value, float) else value

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return source diagnostic metadata."""
        if not self.coordinator.data:
            return None
        if self._description.key in {
            "price_buy", "price_sell", "tariff_price_energy",
            "tariff_price_distribution", "tariff_price_surcharges",
            "tariff_price_total", "tariff_fixed_monthly",
            "tariff_zone", "tariff_season", "tariff_day_type",
            "tariff_next_zone", "tariff_next_change_minutes",
            "grid_import_cost_per_hour",
        }:
            currency = self.coordinator.store.config["general"]["currency"]
            tariff = self.coordinator.data.get("tariff", {})
            return {"currency": currency, "tariff": tariff}
        source = self.coordinator.data.get("source_status", {}).get(self._description.key)
        return {"source": source} if source else None
