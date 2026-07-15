# Status projektu v0.4.0

## Najważniejsze zmiany względem v0.3

- główne okno przepływu obsługuje teraz osobne węzły dla wielu stringów PV,
- każdy string pokazuje własną moc, stan/MPPT, nazwę i ikonę,
- dowolne dodatkowe urządzenie może zostać pokazane jako źródło, odbiornik albo element dwukierunkowy,
- kierunek oraz aktywność animacji dodatkowych urządzeń wynikają z ich roli, znaku mocy i progu pracy,
- źródła korzystają z górnej magistrali, a EV i odbiorniki z dolnej magistrali połączonej z domem,
- każdy string i urządzenie ma osobne ustawienie widoczności, kolejności oraz nazwy w przepływie,
- konfiguracja ma nową sekcję **Konfiguracja okna przepływów** z podglądem na żywo,
- dostępne są układy automatyczny, kompaktowy i szeroki oraz trzy style węzłów,
- można zmieniać szybkość animacji, odstęp gałęzi, limity elementów oraz widoczność wartości, stanów i linii,
- urządzenia nieaktywne mogą być automatycznie ukrywane,
- konfiguracja jest automatycznie migrowana do schematu v4.

## Nadal gotowe

- instalacja przez HACS lub ręcznie,
- konfigurator integracji,
- pełnoekranowy panel Matrix Blue,
- responsywny diagram dla komputera, tabletu i telefonu,
- wyszukiwarka encji Home Assistant pokazująca bieżący stan i jednostkę,
- taryfa TAURON G13 lato/zima, weekendy, święta i własne dni wolne,
- ceny składowe, pełne albo z zewnętrznej encji,
- dowolna liczba stringów, sekcji i urządzeń w konfiguracji,
- import i eksport konfiguracji,
- diagnostyka źródeł i runtime,
- zapis tylko dla administratora oraz opcjonalny podgląd dla innych użytkowników.

## Świadome ograniczenia v0.4.0

- pakiet przeszedł testy statyczne i testy repozytorium, ale finalny wygląd trzeba zweryfikować z rzeczywistymi encjami na używanych rozdzielczościach,
- limity widocznych stringów i urządzeń dotyczą diagramu, a nie liczby elementów przechowywanych w konfiguracji,
- wykresy pokazują próbki od chwili otwarcia panelu; historia z Recorder/Statistics jest planowana,
- nie ma jeszcze trwałego dziennego i miesięcznego rejestru kosztów,
- automatyczne sterowanie falownikiem, magazynem i ładowarką EV pozostaje wyłączone,
- pole języka zapisuje preferencję, ale pełne tłumaczenie całego panelu zostanie domknięte później.

## Procedura testowa po instalacji

1. Zaktualizować repozytorium GitHub do v0.4.0.
2. Poczekać na zielone HACS validation i Hassfest.
3. Opublikować release `v0.4.0`.
4. Zaktualizować integrację w HACS i zrestartować Home Assistant.
5. Wykonać `Ctrl+F5` w przeglądarce.
6. Włączyć moduł PV i dodać dwa stringi z osobnymi sensorami mocy.
7. Zaznaczyć **Pokaż w przepływie** dla obu stringów i sprawdzić osobne wartości.
8. Dodać urządzenie jako odbiornik, źródło i element dwukierunkowy oraz sprawdzić animacje.
9. Przetestować układy automatyczny, kompaktowy i szeroki.
10. Sprawdzić diagram przy szerokościach desktop, tablet i telefon.
11. Zebrać ewentualne błędy z dziennika Home Assistant i konsoli przeglądarki.
