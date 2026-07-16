# Status projektu v8.0.5

## Najważniejsze zmiany v8.0.5

- moduły panelu i karty Lovelace są rejestrowane pod ścieżką zawierającą pełną wersję wydania, np. `/matrix_energy_center_static_v8_0_5/...`,
- Home Assistant nie dodaje już długiego cache do plików frontendowych Matrix,
- zachowano zgodny wstecznie adres `/matrix_energy_center_static/...`, ale również bez długiego cache,
- ręcznie dodany zasób Lovelace nie jest wymagany, ponieważ integracja rejestruje kartę automatycznie,
- zewnętrzny adres przez reverse proxy lub Cloudflare nie powinien już pozostawać na starej wersji po aktualizacji i restarcie Home Assistant.

## Najważniejsze zmiany v8.0.4

- trasy są ponownie liczone na podstawie rzeczywistej szerokości i wysokości sceny po jej wyświetleniu na tablecie,
- router mierzy pełną ramkę każdego dymku razem z paddingiem, obramowaniem i zmianą wielkości tekstu,
- odcinki między sąsiednimi punktami siatki również są sprawdzane pod kątem przecięcia dymku,
- przy braku standardowej trasy używany jest bezpieczny korytarz poza sceną zamiast prostej przecinającej dymki,
- na ciasnych układach odstęp może być automatycznie zmniejszony, ale widoczna ramka dymku nadal pozostaje przeszkodą,
- zmiana wartości i Enter odświeżają tylko diagram, bez przebudowy i przewijania prawego inspektora,
- modal dymku aktualizuje wyłącznie własny podgląd i pozostaje w aktualnym miejscu,

## Funkcje wprowadzone w v8.0.3

- linie przepływu zaczynają się na krawędziach dymków zamiast w ich środku,
- każdy dymek otrzymuje osobne porty dla wielu dochodzących połączeń,
- trasy automatycznie omijają wszystkie pozostałe dymki,
- zajęte odcinki i skrzyżowania mają wysoką karę, dlatego równoległe linie są rozdzielane,
- opis linii jest umieszczany na wolnym odcinku trasy i odsuwany od innych opisów,
- dla każdego pulpitu można ustawić odstęp linii od dymków i odstęp pomiędzy liniami,
- edytor dymku zachowuje przewinięcie, aktywne pole i kursor po zmianie wartości albo naciśnięciu Enter,

- dodawanie i edycja dymku otwierają to samo okno ze szkicem, podglądem i osobnym przyciskiem **ZAPISZ DYMEK**,
- dymki przeglądu i przepływu przyjmują wklejone emoji, np. `🏠`, `🔋`, `☀️`, bez linku do obrazu,
- wybrany kafelek przepływu można kopiować pomiędzy Podsumowaniem, Przepływami i profilami kiosku,
- wklejanie może przenieść sam wygląd i rozmiar albo również pozycję kafelka,
- rozmiar i pogrubienie nazwy, wartości, jednostki i opisu są dostępne w jednym edytorze dymku,

- kiosk nie ma już dolnego paska statusu ani dolnej nawigacji,
- strzałki i wskaźniki slajdów są umieszczone na środku nagłówka,
- Przepływ, Wykresy, Podsumowanie i każda strona HA mają osobny edytowalny nagłówek,
- okno przepływu wykorzystuje pozostałą wysokość aż do dołu ekranu,
- przewijanie i paski przewijania w natywnych slajdach kiosku są wyłączone,
- każdy tekst w dymku przepływu ma niezależny rozmiar,
- pełny adres strony z tego samego HA jest poprawnie normalizowany podczas zapisu,
- konfiguracja profili i dodatkowych pulpitów znajduje się w osobnym panelu **Kiosk**,
- dodatkowe pulpity są nazwanymi zakładkami w górnym nagłówku i obsługują gest także wewnątrz osadzonego widoku HA,
- każda zakładka Lovelace ma własną skalę, przesunięcie, margines, tło i ramkę,
- teksty dymków, dodatkowych pól, linii i nagłówków mają osobne przełączniki pogrubienia,

- stary edytor modalny został zastąpiony nowym panelem głównym **Ustawienia**,
- konfiguracja encji i danych pozostaje w dotychczasowych panelach, a grafika jest edytowana osobno,
- Podsumowanie, Przepływy, kiosk domyślny i każdy nazwany kiosk zapisują własną scenę `flow_scene`,
- edytor i docelowy pulpit korzystają z tego samego renderera,
- wszystkie dymki diagramu można przeciągać, skalować, ukrywać, blokować i ustawiać na osobnych warstwach,
- linie SVG automatycznie podążają za przesuniętymi dymkami i mogą być proste, łukowe albo prowadzone pod kątem prostym,
- każda linia ma osobny kolor dla kierunku A→B, B→A, postoju i braku danych,
- kierunek może wynikać z automatycznego bilansu albo wybranej encji/atrybutu wraz z mnożnikiem i strefą martwą,
- opisy linii można przeciągać oraz ustawiać ich tekst, kolor, tło, ramkę i rozmiar,
- reset działa tylko na aktualnie wybrany pulpit,
- migracja do schematu v8 dodaje nowe sceny i nagłówki bez usuwania istniejących encji, widżetów i profili kiosku.

## Funkcje zachowane z v0.6

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
- pozycje węzłów diagramu edytuje się bez przesuwania siatki,
- wszystkie dymki przepływu mają własny rozmiar, kolory, ramkę, ikonę oraz do 8 dodatkowych pól encji,
- każdy obiekt przepływu może otwierać szczegóły, przełączać encję, nawigować albo wywoływać usługę HA,
- każdy pulpit i profil kiosku zachowuje własny układ,
- profil Galaxy Tab A9 16:9 mieści dolny rząd urządzeń nad nawigacją,
- natywne slajdy kiosku można zmieniać przeciągnięciem ekranu w bok,
- kiosk obsługuje automatyczną rotację widoków, ręczne sterowanie i przyciemnianie nocne,
- konfiguracja jest automatycznie migrowana do schematu v8.

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

## Świadome ograniczenia v8.0.5

- dane historyczne muszą być zachowywane przez Home Assistant Recorder,
- statystyki długoterminowe zależą od metadanych encji, w szczególności zgodnego `state_class`,
- pełny ekran wymaga kliknięcia użytkownika z powodu ograniczeń przeglądarek,
- trwały dzienny i miesięczny rejestr kosztów nie jest jeszcze gotowy,
- automatyczne sterowanie falownikiem, magazynem i ładowarką EV pozostaje wyłączone,
- układ wielu wartości należy sprawdzić na docelowej rozdzielczości ekranu kiosk.
- gest zmiany slajdu nie może rozpocząć się wewnątrz obcego dokumentu `iframe`; należy rozpocząć go na tle lub natywnym slajdzie kiosku.

## Procedura testowa po instalacji

1. Zainstalować wydanie `v8.0.5`, wykonać pełny restart Home Assistant i sprawdzić w źródle strony ścieżkę `/matrix_energy_center_static_v8_0_5/`.
2. Dodać dymek z wartością pomocniczą i dwiema encjami powiązanymi.
3. Sprawdzić kolory progowe i alarm dla wartości testowej.
4. Dodać wykres obu stringów PV jako dwie serie.
5. Sprawdzić zakres sesyjny, 24 h, 7 dni i 30 dni.
6. W panelu **Ustawienia** przeciągnąć dymki i opisy linii, zmienić przebieg połączeń, zapisać i odświeżyć stronę.
7. Sprawdzić cztery stany kolorów linii: przepływ A→B, B→A, postój i brak danych.
8. Zmienić rozmiar, kolory i ikonę dymku, dodać pole encji oraz sprawdzić akcje `more-info`, `toggle`, nawigację i bezpieczną usługę testową.
9. Utworzyć dwa profile kiosk z różnymi pozycjami dymków i kolorami linii.
10. Sprawdzić rotację, gest przeciągnięcia slajdu, porę nocną i pełny ekran.
11. Sprawdzić panel na desktopie, tablecie i telefonie oraz przejrzeć dziennik Home Assistant i konsolę przeglądarki.
