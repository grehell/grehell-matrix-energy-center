# Matrix Energy Center v0.5.0 — informacje o wydaniu

Wersja 0.5.0 dodaje konfigurowalny przegląd oraz dedykowaną kartę przepływów do ekranów kiosk.

## Nowości

- własne dymki dla dowolnej encji lub atrybutu Home Assistant,
- nazwa, opis, ikona MDI, kolor wartości/obramowania i kolor tła,
- własna jednostka, mnożnik, precyzja, kolejność i miniwykres,
- dodatkowe wykresy liniowe, obszarowe i słupkowe,
- regulowana wysokość, liczba próbek, grubość linii oraz etykiety min/max,
- możliwość ukrycia standardowych dymków,
- podgląd na żywo w zakładce **Widżety**,
- pełnoekranowa karta **Kiosk** z dużym diagramem, zegarem, dymkami i paskiem stanu,
- bezpośredni adres trybu kiosk: `/matrix-energy-center?kiosk=1`,
- automatyczna migracja konfiguracji z wersji 1–4 do schematu 5.

## Aktualizacja

1. Wyeksportuj konfigurację JSON jako kopię bezpieczeństwa.
2. Zainstaluj wydanie `v0.5.0` przez HACS albo podmień katalog integracji.
3. Uruchom ponownie Home Assistant.
4. Wykonaj twarde odświeżenie panelu (`Ctrl+F5`).
5. Otwórz **Widżety**, skonfiguruj dymki/wykresy oraz kartę kiosk.

Dotychczasowe mapowania, taryfa, stringi PV, urządzenia i ustawienia przepływu pozostają zachowane. Nowe listy dymków i wykresów są po migracji puste.

## Ważne

Wykresy w tej wersji zbierają dane podczas otwartej sesji panelu. Zakresy 24 h / 7 dni / 30 dni oparte na Recorder/Statistics są planowane w następnym etapie analitycznym.
