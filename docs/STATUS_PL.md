# Status projektu v0.6.1

## Najważniejsze zmiany względem v0.5

- natywna karta Lovelace `custom:matrix-energy-flow-card` zastępuje niedziałające osadzanie panelu przez iframe,
- moduł karty jest rejestrowany automatycznie przez integrację,
- jeden dymek może pokazywać wartość główną, pomocniczą i do 8 powiązanych encji,
- każda wartość powiązana ma własną nazwę, jednostkę, kolor, precyzję i mnożnik,
- dymki obsługują kolory progowe, kolor braku danych oraz alarm wizualny,
- jeden wykres może zawierać serię główną i do 8 powiązanych serii z legendą,
- wykresy mają zakres sesyjny, 24 h, 7 dni lub 30 dni i korzystają z Recorder/Statistics,
- dymki i wykresy obsługują szczegóły encji, nawigację i wywołanie usługi,
- kolejność kart można zmieniać przeciąganiem,
- można tworzyć wiele profili kiosk z własnym wyborem dymków i wykresów,
- kiosk obsługuje automatyczną rotację widoków, ręczne sterowanie i przyciemnianie nocne,
- konfiguracja jest automatycznie migrowana do schematu v6.

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

## Świadome ograniczenia v0.6.1

- dane historyczne muszą być zachowywane przez Home Assistant Recorder,
- statystyki długoterminowe zależą od metadanych encji, w szczególności zgodnego `state_class`,
- pełny ekran wymaga kliknięcia użytkownika z powodu ograniczeń przeglądarek,
- trwały dzienny i miesięczny rejestr kosztów nie jest jeszcze gotowy,
- automatyczne sterowanie falownikiem, magazynem i ładowarką EV pozostaje wyłączone,
- układ wielu wartości należy sprawdzić na docelowej rozdzielczości ekranu kiosk.

## Procedura testowa po instalacji

1. Zainstalować wydanie `v0.6.1`, zrestartować Home Assistant i wykonać `Ctrl+F5`.
2. Dodać dymek z wartością pomocniczą i dwiema encjami powiązanymi.
3. Sprawdzić kolory progowe i alarm dla wartości testowej.
4. Dodać wykres obu stringów PV jako dwie serie.
5. Sprawdzić zakres sesyjny, 24 h, 7 dni i 30 dni.
6. Przeciągnąć dymki i wykresy, zapisać i odświeżyć stronę.
7. Sprawdzić akcje szczegółów, nawigacji i bezpieczną usługę testową.
8. Utworzyć dwa profile kiosk z różnymi elementami.
9. Sprawdzić rotację, sterowanie slajdami, porę nocną i pełny ekran.
10. Sprawdzić panel na desktopie, tablecie i telefonie oraz przejrzeć dziennik Home Assistant i konsolę przeglądarki.
