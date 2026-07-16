# Matrix Energy Center v0.4.0 — informacje o wydaniu

Wersja 0.4.0 rozbudowuje główne okno przepływu o konfigurowalne gałęzie wielu źródeł i odbiorników.

## Najważniejsze nowości

- osobne węzły dla String PV 1, String PV 2 i kolejnych stringów,
- własna moc, stan/MPPT, nazwa, ikona i kolejność każdego stringu,
- możliwość dodania dowolnego skonfigurowanego urządzenia do głównej grafiki,
- role urządzenia: źródło, odbiornik lub dwukierunkowe,
- podgląd diagramu podczas edycji,
- układy automatyczny, kompaktowy i szeroki,
- style zaokrąglony, techniczny i miękki,
- regulacja animacji, odstępów, limitów i widoczności elementów,
- automatyczne ukrywanie nieaktywnych urządzeń,
- migracja konfiguracji do schematu v4 bez kasowania dotychczasowych mapowań.

## Aktualizacja

1. Wykonaj eksport konfiguracji JSON z panelu.
2. Zainstaluj wydanie `v0.4.0` przez HACS albo podmień katalog integracji.
3. Uruchom ponownie Home Assistant.
4. Wykonaj `Ctrl+F5` w przeglądarce.
5. Otwórz **Konfiguracja → Konfiguracja okna przepływów**.
6. W zakładce PV wybierz stringi widoczne w przepływie.
7. W zakładce Urządzenia wybierz dodatkowe źródła i odbiorniki.

Istniejące stringi PV są domyślnie dopuszczone do diagramu. Istniejące dodatkowe urządzenia pozostają domyślnie ukryte, aby aktualizacja nie przeładowała głównego widoku.

## Bezpieczeństwo aktualizacji

Aktualizacja nie usuwa konfiguracji v0.1–v0.3. Backend uzupełnia brakujące pola nowymi wartościami domyślnymi i zapisuje je dopiero po zatwierdzeniu zmian przez administratora.
