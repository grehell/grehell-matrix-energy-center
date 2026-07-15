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


## Wyszukiwanie encji w v0.5

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
7. Zaznacz **Pokaż w przepływie**, aby string pojawił się jako osobny węzeł nad głównym węzłem PV.
8. Ustaw opcjonalną nazwę, ikonę i kolejność w diagramie.
9. Zapisz zmiany.

## Konfiguracja głównego okna przepływów

W zakładce **Konfiguracja** znajduje się sekcja **Konfiguracja okna przepływów** z podglądem na żywo. Można tam ustawić:

- układ automatyczny, kompaktowy albo szeroki,
- wielkość diagramu i styl węzłów,
- szybkość animacji i odstępy między gałęziami,
- maksymalną liczbę widocznych stringów PV i urządzeń,
- widoczność wartości, stanów i linii połączeń,
- automatyczne ukrywanie urządzeń poniżej ich progu pracy.

Stringi PV są łączone z głównym węzłem PV. Urządzenia oznaczone jako źródło trafiają na górną magistralę, a odbiorniki i urządzenia dwukierunkowe na dolną magistralę połączoną z domem.

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

Dodatkowo każde urządzenie może być pokazane w głównym przepływie. Ustaw wtedy:

- **Pokaż w przepływie**,
- rolę: **odbiornik**, **źródło** albo **dwukierunkowe**,
- kolejność oraz opcjonalną krótszą nazwę w diagramie.

Przycisk sterowania w v0.5 obsługuje `switch`, `input_boolean`, `light` i `button`.

Bieżący koszt pracy urządzenia na godzinę jest obliczany na podstawie jego mocy oraz aktywnej ceny zakupu.

## Dymki i wykresy na przeglądzie

1. Otwórz zakładkę **Widżety**.
2. Zdecyduj, czy standardowe dymki domu, PV, sieci, magazynu, EV i ceny mają pozostać widoczne.
3. Wybierz **Dodaj dymek** i przypisz dowolną encję Home Assistant.
4. Jeżeli wartość znajduje się w atrybucie encji, wpisz jego nazwę, np. `current_temperature`.
5. Ustaw nazwę, opis, ikonę MDI, kolor wartości i obramowania, kolor tła oraz opcjonalną własną jednostkę.
6. W razie potrzeby ustaw mnożnik, liczbę miejsc dziesiętnych, kolejność i miniwykres.
7. Wybierz **Dodaj wykres**, przypisz encję lub atrybut i wybierz typ: linia, obszar albo słupki.
8. Ustaw kolor, wysokość, liczbę próbek, grubość linii oraz widoczność wartości bieżącej i minimum/maksimum.
9. Sprawdź podgląd na żywo i zapisz zmiany.

Wykresy i miniwykresy w v0.5 przechowują próbki z bieżącej sesji przeglądarki. Po przeładowaniu strony zaczynają zbierać dane od nowa. Integracja z historią Recorder jest zaplanowana na następną wersję analityczną.

## Karta przepływów w trybie kiosk

W zakładce **Widżety → Karta kiosk** można ustawić:

- tytuł karty,
- zegar z datą,
- standardowe dymki,
- własne dymki,
- pasek stanu,
- standardową, wysoką albo pełną wysokość diagramu.

Przycisk **Otwórz kartę kiosk** przełącza panel na widok monitoringu bez górnego menu, bocznego paska i standardowej stopki. Przycisk **Pełny ekran** uruchamia przeglądarkowy tryb pełnoekranowy. **Wyjdź** wraca do podsumowania i opuszcza pełny ekran. Widok kiosk korzysta z tej samej konfiguracji stringów PV, urządzeń, kolorów i przepływów co główny panel.

Na stałym ekranie można otworzyć kiosk bezpośrednio adresem:

```text
/matrix-energy-center?kiosk=1
```

Przeglądarka nadal wymaga jednego kliknięcia przycisku **Pełny ekran** po uruchomieniu lub restarcie urządzenia.

## Aktualizacja do v0.5

1. Zrób eksport konfiguracji JSON z panelu.
2. Podmień katalog integracji albo wykonaj aktualizację przez HACS.
3. Uruchom ponownie Home Assistant.
4. Otwórz **Konfiguracja → Konfiguracja okna przepływów** i sprawdź dotychczasowy diagram.
5. W zakładce **PV** wybierz stringi widoczne w przepływie.
6. W zakładce **Urządzenia** wybierz dodatkowe źródła i odbiorniki widoczne w przepływie.
7. Otwórz **Widżety**, dodaj własne dymki i wykresy oraz skonfiguruj kartę kiosk.

Dane z v0.1–v0.4 są automatycznie uzupełniane do schematu v5. Nowe listy dymków i wykresów są początkowo puste, więc dotychczasowy przegląd nie zmienia wyglądu. Nie usuwaj pliku `.storage/matrix_energy_center`. Po aktualizacji wykonaj pełny restart Home Assistant oraz twarde odświeżenie panelu (`Ctrl+F5`), ponieważ v0.5 zawiera nowy plik frontendowy.

## Usuwanie

1. Usuń wpis integracji w **Ustawienia → Urządzenia i usługi**.
2. Usuń integrację w HACS albo katalog `custom_components/matrix_energy_center`.
3. Uruchom ponownie Home Assistant.

Reset konfiguracji jest dostępny jako akcja administratora:

```text
matrix_energy_center.reset_configuration
```

Uwaga: reset usuwa mapowania, stringi, taryfę, dodatkowe urządzenia, własne dymki, wykresy i ustawienia karty kiosk.
