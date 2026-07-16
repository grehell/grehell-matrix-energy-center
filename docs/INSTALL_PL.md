# Instalacja Matrix Energy Center — instrukcja PL

## Wymagania

- Home Assistant 2025.12 lub nowszy,
- aktywny frontend Home Assistant,
- konto administratora do pierwszej konfiguracji,
- HACS tylko przy instalacji z repozytorium.

Projekt nie wymaga Mushroom, card-mod, layout-card ani innych kart Lovelace. Panel jest dostarczany razem z integracją.

Od v0.6.1 integracja dostarcza również natywną kartę Lovelace. Nie należy osadzać panelu Matrix Energy Center przez `iframe`.

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


## Wyszukiwanie encji w v0.6

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

### Nowy edytor grafiki v0.7

Ustawienia wyglądu nie są już wykonywane w starym oknie modalnym. Otwórz główny panel **Ustawienia** i wybierz u góry scenę:

- **Podsumowanie**,
- **Przepływy**,
- **Kiosk domyślny**,
- nazwany profil kiosku.

Przeciągnij cały dymek, aby zmienić jego pozycję. Uchwyt w prawym dolnym rogu zmienia rozmiar. Siatka pozostaje nieruchoma, a wszystkie połączenia podążają za dymkiem automatycznie. Kliknij linię albo jej opis, aby ustawić przebieg, grubość, szybkość animacji i osobne kolory dla obu kierunków, postoju oraz braku danych. Opis linii również można przeciągać.

Zmiany trzeba zatwierdzić przyciskiem **Zapisz zmiany**. Każda z wymienionych scen jest zapisywana osobno. **Resetuj ten układ** dotyczy wyłącznie aktualnie wybranej sceny i usuwa także jej własne style oraz akcje.

Właściwości wybranego dymku zawierają osobne rozmiary fontów nazwy, wartości, jednostki i opisu/statusu. Dodatkowe pola encji mają własne rozmiary nazwy, wartości oraz jednostki.

Po wybraniu kiosku na dole panelu **Ustawienia** znajduje się sekcja **Kiosk · nagłówki slajdów**. Rozwiń Przepływ, Wykresy, Podsumowanie albo nazwę dodanej strony HA, aby ustawić jej własny tytuł, opis, ikonę, wysokość, kolory, fonty, zegar i przyciski.

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

Przycisk sterowania w v0.6 obsługuje `switch`, `input_boolean`, `light` i `button`.

Bieżący koszt pracy urządzenia na godzinę jest obliczany na podstawie jego mocy oraz aktywnej ceny zakupu.

## Dymki i wykresy na przeglądzie

1. Otwórz zakładkę **Widżety**.
2. Zdecyduj, czy standardowe dymki domu, PV, sieci, magazynu, EV i ceny mają pozostać widoczne.
3. Wybierz **Dodaj dymek** i przypisz dowolną encję Home Assistant.
4. Jeżeli wartość znajduje się w atrybucie encji, wpisz jego nazwę, np. `current_temperature`.
5. Ustaw nazwę, opis, ikonę MDI, kolor wartości i obramowania, kolor tła oraz opcjonalną własną jednostkę.
6. Opcjonalnie włącz drugą wartość, np. moc + energia dzisiaj.
7. W sekcji **Encje powiązane w dymku** dodaj do 8 kolejnych stanów. Każdy ma własną nazwę, encję/atrybut, jednostkę, precyzję, mnożnik i kolor.
8. Wybierz kolor stały albo progi niski/normalny/wysoki. Alarm może reagować na wartość poniżej, powyżej lub poza zakresem.
9. Wybierz akcję kliknięcia: szczegóły encji, nawigacja, usługa Home Assistant albo brak akcji.
10. Wybierz **Dodaj wykres**, przypisz serię główną i dodaj do 8 powiązanych serii na tej samej osi czasu.
11. Dla każdej serii ustaw nazwę, kolor, encję/atrybut, jednostkę, precyzję i mnożnik.
12. Wybierz typ: linia, obszar albo grupowane słupki, a następnie historię: sesja, 24 h, 7 dni lub 30 dni.
13. Przeciągnij całe karty dymków i wykresów, aby zmienić kolejność.
14. Sprawdź podgląd na żywo i zapisz zmiany.

Zakres **Sesja** przechowuje próbki tylko w bieżącej karcie przeglądarki. Zakresy 24 h, 7 dni i 30 dni pobierają dane z Home Assistant Recorder. Dłuższe zakresy próbują najpierw statystyk długoterminowych, dlatego encje z prawidłowym `state_class` działają najwydajniej. Jeżeli statystyki nie są dostępne, panel korzysta ze zwykłej historii Recorder.

## Karta przepływów w trybie kiosk

### Natywna karta Lovelace v8.0.4

Po instalacji lub aktualizacji uruchom ponownie Home Assistant i wykonaj `Ctrl+F5`. Następnie:

1. Otwórz docelowy pulpit i wybierz **Edytuj pulpit**.
2. Dodaj kartę **Ręcznie**.
3. Wklej konfigurację:

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

4. Aby wykorzystać profil skonfigurowany w panelu, zmień `profile: default` na przykład na `profile: salon`.
5. Dla pełnego ekranu ustaw układ widoku Lovelace na **Panel (jedna karta)**.

Konfigurację `type: custom:matrix-energy-flow-card` wkleja się w edytorze **karty**, nie w oknie **Konfiguracja widoku**. Karta korzysta bezpośrednio z zalogowanej sesji Home Assistant oraz poleceń WebSocket integracji; nie wymaga adresu URL.

W osobnym panelu **Kiosk** można ustawić konfigurację domyślną oraz osobne profile ekranów. Nie dodawaj do pulpitu HA karty Matrix tylko po to, aby uzyskać kolejną zakładkę kiosku. W sekcji **Dodatkowe zakładki z Home Assistant / Lovelace** wklej adres istniejącego pulpitu lub widoku. Każdy profil obsługuje:

- tytuł karty,
- zegar z datą,
- standardowe dymki,
- własne dymki i wykresy albo tylko wskazane elementy,
- osobny nagłówek każdego slajdu z edycją tekstów, ikon, kolorów, wysokości i rozmiarów fontów,
- standardową, wysoką albo pełną wysokość diagramu,
- automatyczną rotację widoku przepływów, wykresów i podsumowania,
- czas rotacji oraz ręczne przełączanie slajdów,
- nazwane zakładki w górnym nagłówku i zmianę ekranu gestem w poziomie,
- kolejność, skalę, przesunięcie, margines, tło i ramkę każdego osadzonego pulpitu Lovelace,
- harmonogram nocny i jasność nocną.

Przycisk **Otwórz kartę kiosk** przełącza panel na widok monitoringu bez głównego menu, bocznego paska, dolnego paska statusu i pasków przewijania. Nawigacja slajdów znajduje się w edytowalnym nagłówku. Przycisk **Pełny ekran** uruchamia przeglądarkowy tryb pełnoekranowy. **Wyjdź** wraca do podsumowania i opuszcza pełny ekran. Widok kiosk korzysta z tej samej konfiguracji stringów PV, urządzeń, kolorów i przepływów co główny panel.

Do profilu kiosku można dodać inne strony z tego samego Home Assistanta. W panelu **Kiosk**, w wybranym profilu, kliknij **Dodaj zakładkę do tego kiosku**. W polu adresu wpisz na przykład `/dashboard-jsbd/deye-kiosk` albo pełny adres `https://grehell.ovh/dashboard-jsbd/deye-kiosk`, włącz zakładkę i zapisz. Pełny adres zostanie zapisany jako ścieżka lokalna. Adres z innej domeny jest celowo odrzucany, ponieważ sesja Home Assistant i osadzanie strony nie byłyby bezpieczne ani niezawodne.

Na stałym ekranie można otworzyć kiosk bezpośrednio adresem:

```text
/matrix-energy-center?kiosk=salon
```

Przeglądarka nadal wymaga jednego kliknięcia przycisku **Pełny ekran** po uruchomieniu lub restarcie urządzenia.

## Aktualizacja do v8.0.4

1. Zrób eksport konfiguracji JSON z panelu.
2. Podmień katalog integracji albo wykonaj aktualizację przez HACS.
3. Uruchom ponownie Home Assistant.
4. Otwórz **Konfiguracja → Konfiguracja okna przepływów** i sprawdź dotychczasowy diagram.
5. W zakładce **PV** wybierz stringi widoczne w przepływie.
6. W zakładce **Urządzenia** wybierz dodatkowe źródła i odbiorniki widoczne w przepływie.
7. Otwórz **Widżety**, sprawdź dymki i wykresy, a następnie otwórz osobny panel **Kiosk** i skonfiguruj zakładki profili.

Dane z wcześniejszych wersji są automatycznie uzupełniane do schematu v8. Dotychczasowe encje, dymki, wykresy i profile kiosku zachowują konfigurację. Nie usuwaj pliku `.storage/matrix_energy_center`. Po aktualizacji wykonaj pełny restart Home Assistant oraz twarde odświeżenie panelu (`Ctrl+F5`), ponieważ v8.0.4 zawiera poprawiony plik frontendowy i nowy klucz pamięci podręcznej. Linie są przeliczane po wyrenderowaniu oraz zmianie rozmiaru ekranu, a edycja pól nie przewija już prawego inspektora ani okna dymku na początek.

## Usuwanie

1. Usuń wpis integracji w **Ustawienia → Urządzenia i usługi**.
2. Usuń integrację w HACS albo katalog `custom_components/matrix_energy_center`.
3. Uruchom ponownie Home Assistant.

Reset konfiguracji jest dostępny jako akcja administratora:

```text
matrix_energy_center.reset_configuration
```

Uwaga: reset usuwa mapowania, stringi, taryfę, dodatkowe urządzenia, własne dymki, wykresy i ustawienia karty kiosk.
