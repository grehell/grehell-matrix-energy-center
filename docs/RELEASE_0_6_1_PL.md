# Matrix Energy Center v0.6.1 — natywna karta Lovelace

Wersja 0.6.1 poprawia obsługę ekranów kiosk w pulpitach Lovelace. Panelu Home Assistant nie trzeba już osadzać przez `iframe`.

Po restarcie Home Assistant integracja automatycznie rejestruje kartę:

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

Pole `profile` przyjmuje `default`, `1` albo identyfikator profilu utworzonego w konfiguratorze, np. `salon`.

Ważne: powyższy YAML należy wkleić przez **Dodaj kartę → Ręcznie**. Nie należy wklejać go do okna **Konfiguracja widoku**.

Karta pobiera konfigurację i znormalizowane wartości bezpośrednio z integracji, wyświetla podstawowe przepływy, wiele stringów PV, dodatkowe urządzenia oraz standardowe i własne dymki.
