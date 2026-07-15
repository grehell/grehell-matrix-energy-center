# Matrix Energy Center v0.6.2 — poprawione wydanie HACS

Wersja 0.6.2 ponownie publikuje kompletny kod funkcji przygotowanych dla linii v0.6.
Poprzedni tag `v0.6.1` został utworzony przed wgraniem wszystkich właściwych plików:
zawierał manifest deklarujący v0.5.0 i nie zawierał natywnej karty Lovelace.

Wydanie v0.6.2 zawiera:

- kompletny panel Matrix Energy Center v0.6,
- natywną kartę `custom:matrix-energy-flow-card`,
- konfigurację wielu stringów PV i dodatkowych urządzeń w przepływach,
- konfigurowalne dymki z encjami powiązanymi,
- wykresy z wieloma seriami,
- profile kiosk i poprawiony cache frontendu.

Po instalacji przez HACS należy zrestartować Home Assistant i wykonać pełne
odświeżenie przeglądarki (`Ctrl+F5`).

Przykład karty Lovelace:

```yaml
type: custom:matrix-energy-flow-card
profile: default
title: PRZEPŁYW ENERGII
height: 720
show_header: true
show_bubbles: true
show_custom_bubbles: true
show_pv_strings: true
show_devices: true
```
