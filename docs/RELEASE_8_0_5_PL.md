# Matrix Energy Center v8.0.5 — poprawne aktualizacje przez Cloudflare

Wersja 8.0.5 usuwa przyczynę sytuacji, w której lokalny adres Home Assistant pokazywał nowszy Matrix Energy Center, a adres zewnętrzny nadal uruchamiał poprzednią wersję.

## Co zostało poprawione

- panel używa modułu `/matrix_energy_center_static_v8_0_5/matrix-energy-center-panel.js`,
- karta Lovelace używa modułu `/matrix_energy_center_static_v8_0_5/matrix-energy-flow-card.js`,
- wersja nie jest już przekazywana wyłącznie jako parametr `?v=...`, który mógł być pomijany w kluczu cache reverse proxy,
- dla plików frontendowych Matrix wyłączono długie nagłówki cache Home Assistant,
- stary adres `/matrix_energy_center_static/...` nadal działa dla zgodności, ale także nie otrzymuje długiego cache,
- karta `custom:matrix-energy-flow-card` pozostaje rejestrowana automatycznie przez integrację.

## Aktualizacja

1. Wgraj zawartość paczki repozytorium v8.0.5 na gałąź `main`.
2. Utwórz tag i wydanie GitHub `v8.0.5` z tego samego commita.
3. W HACS odśwież informacje o repozytorium i zainstaluj v8.0.5.
4. Wykonaj pełny restart Home Assistant — samo przeładowanie integracji nie przeładuje modułów Pythona ani zarejestrowanych tras HTTP.
5. Otwórz `/matrix-energy-center`. W narzędziach przeglądarki powinien być widoczny plik ze ścieżki zawierającej `_v8_0_5`.

Jeśli wcześniej dodano w **Ustawienia → Pulpity → Zasoby** ręczny wpis Matrix, należy go usunąć. Brak Matrix na liście zasobów jest prawidłowy: integracja dodaje moduł programowo i nie tworzy wpisu w bazie zasobów Lovelace.

Zmiana nie usuwa ani nie resetuje konfiguracji `.storage/matrix_energy_center`.
