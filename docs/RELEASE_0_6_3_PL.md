# Matrix Energy Center v0.6.3 — kiosk dla tabletu 16:9

Wersja 0.6.3 dodaje profil wyświetlania przygotowany dla tabletu Samsung Galaxy
Tab A9 używanego poziomo jako ekran kiosk 16:9.

W konfiguracji profilu kiosk wybierz:

- **Format ekranu:** Samsung Galaxy Tab A9 · poziomo 16:9,
- **Kompaktowy nagłówek:** włączony,
- **Maksymalna liczba dymków:** 6,
- **Kolumny wykresów:** 2,
- **Wysokość diagramu:** wysoka.

Preset korzysta z dynamicznej wysokości ekranu, blokuje przewijanie całej strony,
zmniejsza nagłówek i węzły przepływu oraz dopasowuje dymki, wykresy, podsumowanie,
nawigację i pasek statusu do poziomego viewportu. Poszczególne slajdy nadal mogą
przewijać własną zawartość, jeżeli użytkownik skonfiguruje więcej wykresów niż
mieści się jednocześnie na ekranie.

Wszystkie dymki w górnym pasku mają ramki z zaokrąglonymi rogami. Dla każdego
własnego dymku można niezależnie ustawić kolory ramki, tła, ikony, nazwy,
wartości, jednostki i opisu, a także grubość ramki, promień narożników, rozmiar
ikony i wartości, odstęp wewnętrzny, wyrównanie oraz widoczność poszczególnych
elementów. Druga wartość i encje powiązane mają własne kolory oraz rozmiary.

Adres domyślnego profilu pozostaje bez zmian:

```text
/matrix-energy-center?kiosk=1
```
