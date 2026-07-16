# Matrix Energy Center v0.6.6 — pełna edycja przepływu i interakcji

Wersja 0.6.6 rozszerza centralny edytor układu na wszystkie obiekty diagramu
przepływu energii. Ustawienia są oddzielne dla głównego przeglądu, pulpitu
**Przepływy**, domyślnego kiosku i każdego nazwanego profilu kiosku.

W edytorze można niezależnie przesuwać:

- dymki DOM, SIEĆ, PV, MAGAZYN i EV,
- dymki stringów PV i dodatkowych urządzeń,
- główne linie przepływu i ich opisy z wartościami,
- magistrale ŹRÓDŁA i ODBIORNIKI,
- pionowe przewody każdego dodatkowego urządzenia.

Kliknięcie obiektu bez przeciągania wybiera go w panelu właściwości. Siatka tła
pozostaje nieruchoma. Zmienione dymki nie są już chowane przez własny rząd,
magistralę ani ramę diagramu.

Każdy dymek przepływu może mieć własną szerokość, wysokość, grubość i kolor
ramki, promień narożników, tło, kolory nazwy/wartości/jednostki, kolor i rozmiar
ikony oraz własną nazwę. Ikoną może być `mdi:...` albo bezpieczny obraz z
`/local/`, `/media/`, `/api/image/serve/` lub adresu HTTPS.

Do każdego dymku można dodać do ośmiu pól z dowolnych encji Home Assistanta lub
ich atrybutów. Każde pole ma nazwę, jednostkę, precyzję, mnożnik i kolor.

Każdy obiekt diagramu może wykonywać po dotknięciu jedną z akcji:

- brak akcji,
- okno szczegółów encji,
- ogólne `homeassistant.toggle`,
- przejście do lokalnej ścieżki Home Assistanta,
- wywołanie dowolnej usługi HA z danymi JSON.

Natywna karta Lovelace `custom:matrix-energy-flow-card` odczytuje pozycje,
wygląd, pola i akcje z profilu kiosku wskazanego przez opcję `profile`.

Kiosk obsługuje również zmianę natywnych slajdów gestem przeciągnięcia w lewo
lub w prawo. Kontrolki, przyciski i osadzone widoki Lovelace nie przechwytują
tego gestu, dzięki czemu zachowują własną interakcję.

Po instalacji należy zrestartować Home Assistant i wykonać twarde odświeżenie
przeglądarki (`Ctrl+F5`).
