# Matrix Energy Center v0.3.0 — informacje o wydaniu

Wersja v0.3.0 przebudowuje warstwę konfiguracji i frontend panelu.

## Najważniejsze

- poprawiony, responsywny diagram przepływów,
- natychmiastowa widoczność modułów zależna od checkboxów,
- rozbudowana konfiguracja wszystkich źródeł i odbiorników,
- wyszukiwarka encji oparta na bieżących stanach Home Assistant,
- stan encji widoczny w wynikach i po wybraniu,
- dodatkowe dane stringów PV, magazynu, EV i urządzeń,
- automatyczna migracja konfiguracji v0.1/v0.2 do schematu v3.

## Aktualizacja przez HACS

Po wgraniu plików do GitHub i utworzeniu release `v0.3.0`:

1. Otwórz HACS → Matrix Energy Center.
2. Wybierz aktualizację do v0.3.0.
3. Uruchom ponownie Home Assistant.
4. Wykonaj twarde odświeżenie panelu: `Ctrl+F5`.

Dotychczasowe mapowania i konfiguracja taryfy są zachowywane. Zalecany jest wcześniejszy eksport konfiguracji JSON z panelu.
