# Status projektu v0.5.0

## Najważniejsze zmiany względem v0.4

- nowa zakładka **Widżety** konfiguruje elementy widoczne na przeglądzie,
- dowolna encja albo jej atrybut może zostać pokazany jako własny dymek,
- dymek ma konfigurowalną nazwę, opis, ikonę, kolory, jednostkę, mnożnik, precyzję i kolejność,
- każdy dymek może mieć miniwykres z bieżącej sesji,
- można dodawać wykresy liniowe, obszarowe i słupkowe dla wybranych encji,
- wykres ma konfigurowalny kolor, rozmiar, liczbę próbek, grubość linii oraz etykiety bieżącej/minimalnej/maksymalnej wartości,
- standardowe dymki można pozostawić, ukryć albo połączyć z własnymi,
- edytor zawiera podgląd na żywo i wyszukiwarkę encji Home Assistant,
- nowa karta **Kiosk** pokazuje duży diagram przepływów bez menu administracyjnego,
- karta kiosk może wyświetlać zegar, pasek stanu, standardowe i własne dymki oraz działać na pełnym ekranie,
- konfiguracja jest automatycznie migrowana do schematu v5.

## Nadal gotowe

- instalacja przez HACS lub ręcznie,
- responsywny panel Matrix Blue,
- osobne gałęzie wielu stringów PV,
- dodatkowe źródła, odbiorniki i urządzenia dwukierunkowe,
- konfigurator okna przepływów z podglądem na żywo,
- wyszukiwarka encji pokazująca bieżący stan i jednostkę,
- taryfa TAURON G13 lato/zima, weekendy, święta i własne dni wolne,
- import i eksport konfiguracji,
- diagnostyka źródeł i runtime,
- zapis tylko dla administratora oraz opcjonalny podgląd dla innych użytkowników.

## Świadome ograniczenia v0.5.0

- wykresy pokazują próbki od chwili otwarcia panelu; historia z Recorder/Statistics jest planowana w v0.6,
- pełny ekran wymaga kliknięcia użytkownika, ponieważ przeglądarki blokują jego automatyczne uruchomienie,
- trwały dzienny i miesięczny rejestr kosztów nie jest jeszcze gotowy,
- automatyczne sterowanie falownikiem, magazynem i ładowarką EV pozostaje wyłączone,
- pakiet przechodzi testy statyczne, ale układ należy sprawdzić z rzeczywistymi encjami na docelowym ekranie kiosk.

## Procedura testowa po instalacji

1. Zainstalować wydanie `v0.5.0` i zrestartować Home Assistant.
2. Wykonać `Ctrl+F5` w przeglądarce.
3. Sprawdzić dotychczasowe stringi PV i dodatkowe urządzenia w przepływie.
4. W zakładce **Widżety** dodać dymek z sensorem liczbowym i drugi z encją tekstową.
5. Sprawdzić własną jednostkę, mnożnik, precyzję, opis i oba kolory.
6. Dodać wykres liniowy, obszarowy i słupkowy.
7. Poczekać na zebranie próbek i sprawdzić minimum, maksimum oraz wartość bieżącą.
8. Wyłączyć standardowe dymki i sprawdzić widok z samymi elementami własnymi.
9. Otworzyć kartę kiosk, przetestować trzy wysokości oraz pełny ekran.
10. Sprawdzić panel przy szerokościach desktop, tablet i telefon.
11. Zebrać ewentualne błędy z dziennika Home Assistant i konsoli przeglądarki.
