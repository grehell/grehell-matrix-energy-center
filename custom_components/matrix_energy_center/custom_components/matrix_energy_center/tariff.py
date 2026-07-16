"""Tariff engines for Matrix Energy Center.

The first built-in profile implements TAURON G13 for Poland.  The schedule is
configurable, while the shipped defaults follow the official G13 time zones:

* summer: 1 April - 30 September,
* winter: 1 October - 31 March,
* morning peak: 07:00-13:00,
* afternoon peak: 19:00-22:00 in summer and 16:00-21:00 in winter,
* all other hours are off-peak,
* Saturdays, Sundays and statutory public holidays are off-peak all day,
* the off-peak period after a day off continues until 07:00 on the next workday.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, time, timedelta
from typing import Any

ZONE_MORNING = "morning_peak"
ZONE_AFTERNOON = "afternoon_peak"
ZONE_OFFPEAK = "off_peak"

ZONE_NAMES_PL = {
    ZONE_MORNING: "Szczyt przedpołudniowy",
    ZONE_AFTERNOON: "Szczyt popołudniowy",
    ZONE_OFFPEAK: "Pozostałe godziny doby",
}

SEASON_SUMMER = "summer"
SEASON_WINTER = "winter"


def default_tauron_g13_tariff() -> dict[str, Any]:
    """Return a fresh, editable TAURON G13 configuration.

    Energy-sale rates are intentionally left at zero because they depend on the
    user's seller, contract and price list.  The included 2026 distribution
    preset contains gross TAURON Dystrybucja rates and can be freely edited.
    """
    return {
        "enabled": False,
        "provider": "tauron",
        "plan": "g13",
        "profile_name": "TAURON G13",
        "country": "PL",
        "price_mode": "components",  # components | combined | entity
        "use_external_price_if_available": False,
        "prices_include_vat": True,
        "vat_percent": 23.0,
        "effective_from": "2026-01-01",
        "effective_to": "2026-12-31",
        "distribution_preset": "tauron_g13_2026_gross",
        "schedule": {
            "summer_start": "04-01",
            "winter_start": "10-01",
            "morning_start": "07:00",
            "morning_end": "13:00",
            "summer_afternoon_start": "19:00",
            "summer_afternoon_end": "22:00",
            "winter_afternoon_start": "16:00",
            "winter_afternoon_end": "21:00",
            "day_off_all_day_offpeak": True,
            "day_off_carry_until": "07:00",
        },
        "calendar": {
            "include_weekends": True,
            "include_polish_public_holidays": True,
            "custom_holidays": "",
        },
        "energy_prices": {
            SEASON_SUMMER: {
                ZONE_MORNING: 0.0,
                ZONE_AFTERNOON: 0.0,
                ZONE_OFFPEAK: 0.0,
            },
            SEASON_WINTER: {
                ZONE_MORNING: 0.0,
                ZONE_AFTERNOON: 0.0,
                ZONE_OFFPEAK: 0.0,
            },
        },
        "distribution_prices": {
            SEASON_SUMMER: {
                ZONE_MORNING: 0.2710,
                ZONE_AFTERNOON: 0.4795,
                ZONE_OFFPEAK: 0.0482,
            },
            SEASON_WINTER: {
                ZONE_MORNING: 0.2710,
                ZONE_AFTERNOON: 0.4795,
                ZONE_OFFPEAK: 0.0482,
            },
        },
        "combined_prices": {
            SEASON_SUMMER: {
                ZONE_MORNING: 0.0,
                ZONE_AFTERNOON: 0.0,
                ZONE_OFFPEAK: 0.0,
            },
            SEASON_WINTER: {
                ZONE_MORNING: 0.0,
                ZONE_AFTERNOON: 0.0,
                ZONE_OFFPEAK: 0.0,
            },
        },
        "variable_fees": {
            "quality": 0.0408,
            "renewable": 0.0090,
            "cogeneration": 0.0037,
            "excise": 0.0,
            "other": 0.0,
        },
        "fixed_fees": {
            "phase_count": 3,
            "network_monthly_1_phase": 9.08,
            "network_monthly_3_phase": 13.36,
            "subscription_monthly": 5.61,
            "capacity_fee_monthly": 21.13,
            "commercial_monthly": 0.0,
            "other_monthly": 0.0,
        },
    }


@dataclass(frozen=True)
class TariffSnapshot:
    """Computed tariff state for one point in time."""

    enabled: bool
    provider: str
    plan: str
    zone: str
    zone_name: str
    season: str
    day_type: str
    is_day_off: bool
    energy_price: float | None
    distribution_price: float | None
    surcharge_price: float | None
    total_price: float | None
    fixed_monthly: float
    next_zone: str | None
    next_zone_name: str | None
    next_change: str | None
    next_change_minutes: int | None
    schedule_warning: str | None

    def as_dict(self) -> dict[str, Any]:
        """Return JSON-serialisable values."""
        return {
            "enabled": self.enabled,
            "provider": self.provider,
            "plan": self.plan,
            "zone": self.zone,
            "zone_name": self.zone_name,
            "season": self.season,
            "day_type": self.day_type,
            "is_day_off": self.is_day_off,
            "energy_price": self.energy_price,
            "distribution_price": self.distribution_price,
            "surcharge_price": self.surcharge_price,
            "total_price": self.total_price,
            "fixed_monthly": self.fixed_monthly,
            "next_zone": self.next_zone,
            "next_zone_name": self.next_zone_name,
            "next_change": self.next_change,
            "next_change_minutes": self.next_change_minutes,
            "schedule_warning": self.schedule_warning,
        }


def evaluate_tauron_g13(
    moment: datetime,
    config: dict[str, Any],
    *,
    find_next_change: bool = True,
) -> TariffSnapshot:
    """Evaluate the configured TAURON G13 profile at ``moment``."""
    enabled = bool(config.get("enabled", False))
    season = _season(moment.date(), config.get("schedule", {}))
    zone, day_type, day_off = _zone_at(moment, config)

    mode = str(config.get("price_mode", "components"))
    energy: float | None = None
    distribution: float | None = None
    surcharges: float | None = None
    total: float | None = None

    if enabled:
        if mode == "combined":
            total = _rate(config.get("combined_prices"), season, zone)
        elif mode == "entity":
            # The coordinator may inject an external Home Assistant price.
            total = None
        else:
            energy = _rate(config.get("energy_prices"), season, zone)
            distribution = _rate(config.get("distribution_prices"), season, zone)
            fees = config.get("variable_fees", {})
            surcharges = sum(_float(fees.get(key), 0.0) for key in ("quality", "renewable", "cogeneration", "excise", "other"))
            total = energy + distribution + surcharges

        if total is not None and not bool(config.get("prices_include_vat", True)):
            factor = 1.0 + _float(config.get("vat_percent"), 23.0) / 100.0
            total *= factor
            if energy is not None:
                energy *= factor
            if distribution is not None:
                distribution *= factor
            if surcharges is not None:
                surcharges *= factor

    next_zone: str | None = None
    next_change: str | None = None
    next_minutes: int | None = None
    if find_next_change:
        next_change_dt, next_zone = _find_next_change(moment, config, zone)
        if next_change_dt is not None:
            next_change = next_change_dt.isoformat()
            next_minutes = max(0, int((next_change_dt - moment).total_seconds() // 60))

    warnings: list[str] = []
    if enabled and mode == "components" and energy is not None and energy <= 0:
        warnings.append("Uzupełnij cenę zakupu energii czynnej dla aktywnej strefy.")
    elif enabled and mode == "combined" and (total is None or total <= 0):
        warnings.append("Uzupełnij pełną cenę brutto dla aktywnej strefy.")

    effective_from = _parse_iso_date(config.get("effective_from"))
    effective_to = _parse_iso_date(config.get("effective_to"))
    if enabled and effective_from and moment.date() < effective_from:
        warnings.append(f"Stawki profilu obowiązują dopiero od {effective_from.isoformat()}.")
    if enabled and effective_to and moment.date() > effective_to:
        warnings.append(f"Stawki profilu wygasły {effective_to.isoformat()}; zweryfikuj aktualną taryfę.")
    warning = " ".join(warnings) or None

    return TariffSnapshot(
        enabled=enabled,
        provider=str(config.get("provider", "tauron")),
        plan=str(config.get("plan", "g13")),
        zone=zone,
        zone_name=ZONE_NAMES_PL.get(zone, zone),
        season=season,
        day_type=day_type,
        is_day_off=day_off,
        energy_price=_round_or_none(energy),
        distribution_price=_round_or_none(distribution),
        surcharge_price=_round_or_none(surcharges),
        total_price=_round_or_none(total),
        fixed_monthly=round(_fixed_monthly(config.get("fixed_fees", {})), 4),
        next_zone=next_zone,
        next_zone_name=ZONE_NAMES_PL.get(next_zone, next_zone) if next_zone else None,
        next_change=next_change,
        next_change_minutes=next_minutes,
        schedule_warning=warning,
    )


def _zone_at(moment: datetime, config: dict[str, Any]) -> tuple[str, str, bool]:
    schedule = config.get("schedule", {})
    calendar_config = config.get("calendar", {})
    current_date = moment.date()
    current_time = moment.timetz().replace(tzinfo=None)

    day_off = _is_day_off(current_date, calendar_config)
    carry_until = _parse_time(schedule.get("day_off_carry_until"), time(7, 0))
    previous_day_off = _is_day_off(current_date - timedelta(days=1), calendar_config)

    if bool(schedule.get("day_off_all_day_offpeak", True)) and day_off:
        return ZONE_OFFPEAK, "day_off", True

    if previous_day_off and not day_off and current_time < carry_until:
        return ZONE_OFFPEAK, "after_day_off", False

    morning_start = _parse_time(schedule.get("morning_start"), time(7, 0))
    morning_end = _parse_time(schedule.get("morning_end"), time(13, 0))
    if morning_start <= current_time < morning_end:
        return ZONE_MORNING, "workday", False

    season = _season(current_date, schedule)
    if season == SEASON_SUMMER:
        afternoon_start = _parse_time(schedule.get("summer_afternoon_start"), time(19, 0))
        afternoon_end = _parse_time(schedule.get("summer_afternoon_end"), time(22, 0))
    else:
        afternoon_start = _parse_time(schedule.get("winter_afternoon_start"), time(16, 0))
        afternoon_end = _parse_time(schedule.get("winter_afternoon_end"), time(21, 0))

    if afternoon_start <= current_time < afternoon_end:
        return ZONE_AFTERNOON, "workday", False
    return ZONE_OFFPEAK, "workday", False


def _find_next_change(
    moment: datetime,
    config: dict[str, Any],
    current_zone: str,
) -> tuple[datetime | None, str | None]:
    """Find the next zone transition without scanning every minute for days."""
    start = moment.replace(second=0, microsecond=0) + timedelta(minutes=1)
    previous = start
    probe = start
    limit = start + timedelta(days=8)

    while probe <= limit:
        zone, _, _ = _zone_at(probe, config)
        if zone != current_zone:
            low = previous - timedelta(minutes=30)
            if low < start:
                low = start
            high = probe
            while low < high:
                delta_minutes = int((high - low).total_seconds() // 60)
                if delta_minutes <= 0:
                    break
                mid = low + timedelta(minutes=delta_minutes // 2)
                mid = mid.replace(second=0, microsecond=0)
                mid_zone, _, _ = _zone_at(mid, config)
                if mid_zone == current_zone:
                    low = mid + timedelta(minutes=1)
                else:
                    high = mid
            changed_zone, _, _ = _zone_at(high, config)
            return high, changed_zone
        previous = probe
        probe += timedelta(minutes=30)
    return None, None


def _season(day: date, schedule: dict[str, Any]) -> str:
    summer_start = _parse_month_day(schedule.get("summer_start"), (4, 1))
    winter_start = _parse_month_day(schedule.get("winter_start"), (10, 1))
    marker = (day.month, day.day)
    if summer_start <= marker < winter_start:
        return SEASON_SUMMER
    return SEASON_WINTER


def _is_day_off(day: date, config: dict[str, Any]) -> bool:
    if bool(config.get("include_weekends", True)) and day.weekday() >= 5:
        return True
    if bool(config.get("include_polish_public_holidays", True)) and day in polish_public_holidays(day.year):
        return True
    custom = _custom_holiday_dates(config.get("custom_holidays", ""))
    return day in custom


def polish_public_holidays(year: int) -> set[date]:
    """Return statutory public holidays in Poland for ``year``.

    24 December is included from 2025 onward.
    """
    easter = _easter_sunday(year)
    fixed = {
        date(year, 1, 1),
        date(year, 1, 6),
        date(year, 5, 1),
        date(year, 5, 3),
        date(year, 8, 15),
        date(year, 11, 1),
        date(year, 11, 11),
        date(year, 12, 25),
        date(year, 12, 26),
    }
    if year >= 2025:
        fixed.add(date(year, 12, 24))
    fixed.update(
        {
            easter,
            easter + timedelta(days=1),
            easter + timedelta(days=49),
            easter + timedelta(days=60),
        }
    )
    return fixed


def _easter_sunday(year: int) -> date:
    """Anonymous Gregorian algorithm."""
    a = year % 19
    b = year // 100
    c = year % 100
    d = b // 4
    e = b % 4
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i = c // 4
    k = c % 4
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    month = (h + l - 7 * m + 114) // 31
    day = ((h + l - 7 * m + 114) % 31) + 1
    return date(year, month, day)


def _custom_holiday_dates(value: Any) -> set[date]:
    if isinstance(value, list):
        tokens = [str(item) for item in value]
    else:
        tokens = str(value or "").replace(";", ",").replace("\n", ",").split(",")
    result: set[date] = set()
    for token in tokens:
        token = token.strip()
        if not token:
            continue
        try:
            result.add(date.fromisoformat(token))
        except ValueError:
            continue
    return result


def _fixed_monthly(fees: dict[str, Any]) -> float:
    phase = int(_float(fees.get("phase_count"), 3))
    network = _float(
        fees.get("network_monthly_1_phase" if phase == 1 else "network_monthly_3_phase"),
        0.0,
    )
    return network + sum(
        _float(fees.get(key), 0.0)
        for key in ("subscription_monthly", "capacity_fee_monthly", "commercial_monthly", "other_monthly")
    )


def _rate(container: Any, season: str, zone: str) -> float:
    if not isinstance(container, dict):
        return 0.0
    season_values = container.get(season, {})
    if not isinstance(season_values, dict):
        return 0.0
    return _float(season_values.get(zone), 0.0)



def _parse_iso_date(value: Any) -> date | None:
    try:
        return date.fromisoformat(str(value).strip())
    except (TypeError, ValueError):
        return None

def _parse_time(value: Any, default: time) -> time:
    try:
        hour, minute = str(value).strip().split(":", 1)
        return time(int(hour), int(minute))
    except (TypeError, ValueError):
        return default


def _parse_month_day(value: Any, default: tuple[int, int]) -> tuple[int, int]:
    try:
        month, day = str(value).strip().split("-", 1)
        candidate = (int(month), int(day))
        date(2000, candidate[0], candidate[1])
        return candidate
    except (TypeError, ValueError):
        return default


def _float(value: Any, default: float) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return float(default)


def _round_or_none(value: float | None) -> float | None:
    return round(value, 6) if value is not None else None
