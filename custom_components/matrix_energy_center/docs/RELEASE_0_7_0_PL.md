# Matrix Energy Center v0.7.0 — nowy edytor scen przepływu

Wersja 0.7.0 buduje edycję okna **Przepływy na żywo** od nowa. Stary edytor
modalny nie jest już wyświetlany. W głównej nawigacji znajduje się osobny panel
**Ustawienia**, przeznaczony wyłącznie do układu i wyglądu grafiki. Encje,
stringi PV, urządzenia, dymki danych i wykresy nadal konfiguruje się w ich
dotychczasowych sekcjach.

## Osobne sceny

Niezależny układ jest zapisywany dla:

- Podsumowania,
- panelu Przepływy,
- kiosku domyślnego,
- każdego nazwanego profilu kiosku.

Zmiana położenia dymku w kiosku nie zmienia jego położenia na Podsumowaniu.
Przycisk resetu czyści tylko aktualnie wybraną scenę. Migracja schematu v7
zachowuje wcześniejsze mapowania encji, stringi, urządzenia, widżety i profile.

## Dymki i połączenia

Każdy dymek DOM, SIEĆ, PV, MAGAZYN, EV, string PV i dodatkowe urządzenie można
przeciągać bez poruszania tła. Można też zmieniać jego rozmiar, warstwę,
widoczność, blokadę położenia, ikonę MDI lub obraz, kolory, ramkę, zaokrąglenie,
nazwę oraz do ośmiu dodatkowych pól encji lub atrybutów.

Połączenia są rysowane w SVG i zawsze obliczane z aktualnych pozycji dymków.
Dlatego po przesunięciu obiektu linia, animacja oraz jej wartość nie pozostają
w starym miejscu. Dostępny jest przebieg prosty, łukowy i ortogonalny.

## Kolory zależne od kierunku

Każda linia ma cztery niezależne kolory:

- przepływ A → B,
- przepływ B → A,
- postój w ustawionej strefie martwej,
- brak lub niedostępność danych.

Dla sieci i magazynu domyślna reguła korzysta z bilansu import/eksport oraz
ładowanie/rozładowanie. Regułę można zastąpić dowolną encją Home Assistanta lub
jej atrybutem, ustawić mnożnik, kierunek wartości dodatniej i strefę postoju.
Opis linii można przeciągnąć oraz osobno ustawić jego tekst, kolor, tło, ramkę i
rozmiar.

## Weryfikacja

Repozytorium zawiera wykonywany test JavaScript sprawdzający import, eksport,
ładowanie, rozładowanie, postój, brak danych, odwrócenie znaku, zmianę geometrii
po przesunięciu węzła oraz niezależność scen. Pełny zestaw testów repozytorium
przechodzi przed zbudowaniem paczek wydania.

Po aktualizacji zrestartuj Home Assistant i wykonaj twarde odświeżenie
przeglądarki (`Ctrl+F5`), ponieważ moduł panelu jest buforowany przez frontend.
