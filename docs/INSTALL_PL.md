# Instalacja Matrix Energy Center — instrukcja PL

## Wymagania

- Home Assistant 2025.12 lub nowszy,
- aktywny frontend Home Assistant,
- konto administratora do pierwszej konfiguracji,
- HACS tylko przy instalacji z repozytorium.

Projekt nie wymaga Mushroom, card-mod, layout-card ani innych kart Lovelace. Panel jest dostarczany razem z integracją.

## Instalacja ręczna

1. Rozpakuj paczkę.
2. Skopiuj katalog:

   ```text
   custom_components/matrix_energy_center
   ```

   do:

   ```text
   /config/custom_components/matrix_energy_center
   ```

3. Uruchom ponownie Home Assistant.
4. Wejdź w **Ustawienia → Urządzenia i usługi**.
5. Wybierz **Dodaj integrację**.
6. Wyszukaj **Matrix Energy Center**.
7. Podaj nazwę instalacji, nazwę panelu w pasku bocznym i walutę.
8. Otwórz panel **Energy Center** z lewego menu.
9. Wejdź w **Konfiguracja** i przypisz encje.

## Pierwsza konfiguracja

Minimalny wariant bez PV:

- pobór domu lub dwukierunkowa moc sieci,
- energia pobrana z sieci,
- profil taryfowy albo opcjonalna cena zakupu z sensora.

Wariant PV:

- łączna moc PV albo sensory mocy poszczególnych stringów,
- produkcja PV dzisiaj,
- import i eksport sieci.

Wariant magazynu:

- dwukierunkowa moc baterii,
- SOC,
- dostępna energia.

Wariant EV:

- moc ładowania,
- SOC samochodu,
- opcjonalna encja sterowania ładowarką jako dodatkowe urządzenie.

## Konfiguracja TAURON G13

1. Otwórz widok **Ceny / G13**.
2. Włącz profil taryfy.
3. Wybierz **Preset G13 2026**, aby załadować domyślny harmonogram oraz wartości dystrybucyjne.
4. Wybierz sposób liczenia ceny:
   - **Składniki** — osobno energia, dystrybucja i pozostałe opłaty zmienne,
   - **Pełna cena** — jedna cena brutto dla każdej strefy i sezonu,
   - **Encja** — cena dostarczana przez sensor Home Assistant.
5. W trybie składników wpisz ceny energii czynnej ze swojej umowy dla:
   - lata: szczyt przedpołudniowy, szczyt popołudniowy, pozostałe godziny,
   - zimy: szczyt przedpołudniowy, szczyt popołudniowy, pozostałe godziny.
6. Zweryfikuj opłaty dystrybucyjne, zmienne i stałe.
7. Ustaw liczbę faz oraz właściwą miesięczną opłatę mocową.
8. W razie potrzeby dodaj własne dni wolne w formacie `RRRR-MM-DD`, oddzielone przecinkiem.
9. Zapisz zmiany.

Domyślny harmonogram:

| Okres | Szczyt przedpołudniowy | Szczyt popołudniowy | Pozostałe godziny |
|---|---|---|---|
| 1 kwietnia–30 września | 07:00–13:00 | 19:00–22:00 | 13:00–19:00 i 22:00–07:00 |
| 1 października–31 marca | 07:00–13:00 | 16:00–21:00 | 13:00–16:00 i 21:00–07:00 |

Soboty, niedziele i święta są domyślnie zaliczane do pozostałych godzin przez całą dobę. Po dniu wolnym ta strefa trwa do 07:00 kolejnego dnia roboczego.

Szczegóły i opis wszystkich opłat: [TAURON_G13_PL.md](TAURON_G13_PL.md).


## Wyszukiwanie encji w v0.3

Każde pole mapowania otwiera wyszukiwarkę korzystającą z aktualnych stanów Home Assistant. Lista pokazuje:

- nazwę przyjazną,
- pełny `entity_id`,
- bieżący stan razem z jednostką,
- `device_class`,
- urządzenie, obszar i integrację źródłową,
- informację, czy encja pasuje do rodzaju pola.

Domyślnie wyświetlane są encje zgodne z polem, np. sensory mocy dla pola mocy. Przycisk **Wszystkie encje** wyłącza filtr zgodności. Po wybraniu encji jej bieżący stan jest widoczny bezpośrednio w konfiguracji.

## Widoczność modułów

Checkboxy w **Konfiguracja → Aktywne moduły** natychmiast przebudowują nawigację, podsumowanie i diagram przepływów. Zmiana jest podglądana od razu, ale musi zostać zatwierdzona przyciskiem **Zapisz zmiany**, aby przetrwała przeładowanie panelu.

## Znaki przepływu

Dwa przełączniki określają interpretację sensorów dwukierunkowych:

- **Dodatnia moc sieci oznacza import**,
- **Dodatnia moc baterii oznacza ładowanie**.

Wyłącz odpowiednią opcję, jeżeli urządzenie raportuje przeciwny znak.

## Stringi PV i sekcje

1. Przejdź do zakładki **PV**.
2. Wybierz **Dodaj string**.
3. Podaj nazwę, opis i moc szczytową.
4. Przypisz sensor mocy całego stringu, jeżeli istnieje.
5. Dodaj sekcje, np.:
   - połać południowa,
   - garaż,
   - balkon,
   - wschód,
   - zachód.
6. Każdej sekcji możesz przypisać osobny sensor albo procentowy udział w stringu.
7. Zapisz zmiany.

## Dodatkowe urządzenia

W zakładce **Urządzenia** można dodać dowolny odbiornik. Każde urządzenie ma:

- nazwę,
- kategorię,
- obszar,
- opis,
- ikonę MDI,
- kolor akcentu,
- sensor mocy,
- sensor energii,
- opcjonalną encję sterowania.

Przycisk sterowania w v0.3 obsługuje `switch`, `input_boolean`, `light` i `button`.

Bieżący koszt pracy urządzenia na godzinę jest obliczany na podstawie jego mocy oraz aktywnej ceny zakupu.

## Aktualizacja do v0.3

1. Zrób eksport konfiguracji JSON z panelu.
2. Podmień katalog integracji albo wykonaj aktualizację przez HACS.
3. Uruchom ponownie Home Assistant.
4. Otwórz panel i skonfiguruj nową zakładkę **Ceny / G13**.

Dane z v0.1 i v0.2 są automatycznie uzupełniane do schematu v3. Nie usuwaj pliku `.storage/matrix_energy_center`. Po aktualizacji wykonaj pełny restart Home Assistant oraz twarde odświeżenie panelu (`Ctrl+F5`), ponieważ v0.3 zawiera nowy plik frontendowy.

## Usuwanie

1. Usuń wpis integracji w **Ustawienia → Urządzenia i usługi**.
2. Usuń integrację w HACS albo katalog `custom_components/matrix_energy_center`.
3. Uruchom ponownie Home Assistant.

Reset konfiguracji jest dostępny jako akcja administratora:

```text
matrix_energy_center.reset_configuration
```

Uwaga: reset usuwa mapowania, stringi, taryfę i dodatkowe urządzenia.
