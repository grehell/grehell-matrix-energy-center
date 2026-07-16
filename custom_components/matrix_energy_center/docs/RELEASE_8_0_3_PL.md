# Matrix Energy Center v8.0.3 — linie omijające dymki

Wersja 8.0.3 zmienia sposób rysowania wszystkich połączeń w oknie przepływu.
Dotyczy to panelu **Podsumowanie**, **Przepływy**, kiosku domyślnego i każdego
osobnego profilu kiosku.

## Automatyczne trasowanie

- linia wychodzi z odpowiedniej krawędzi dymku, a nie z jego środka,
- wiele linii otrzymuje osobne punkty przyłączenia na tej samej krawędzi,
- każdy dymek jest przeszkodą, której trasa nie może przeciąć,
- wcześniej zajęte odcinki i skrzyżowania są omijane,
- łuki są zaokrąglane dopiero po wyznaczeniu bezpiecznej trasy,
- opisy są umieszczane na możliwie długim, wolnym odcinku i nie dostają tego
  samego punktu co wcześniejszy opis.

W panelu **Ustawienia** dla każdego pulpitu są dwa nowe parametry:

- **Odstęp od dymków** — wolna przestrzeń pomiędzy ramką dymku a trasą,
- **Odstęp między liniami** — rozdzielczość osobnych torów połączeń.

Opcja **Automatycznie omijaj dymki** jest nowym ustawieniem domyślnym. Tryb
prostej pozostaje dostępny, ale prosta jest używana tylko wtedy, gdy nie
przecina dymku ani wcześniejszego połączenia.

## Edytor dymków

Okno edycji zapamiętuje pozycję przewinięcia, aktywne pole oraz położenie
kursora. Zmiana liczby, koloru, checkboxa albo naciśnięcie Enter nie przenosi
już edytora na początek formularza.

## Aktualizacja

Po wgraniu `v8.0.3` uruchom ponownie Home Assistant i wykonaj `Ctrl+F5`, aby
przeglądarka pobrała nowy moduł frontendowy.
