# Matrix Energy Center v8.0.1 — zakładki Lovelace wewnątrz kiosku

Wersja 8.0.1 naprawia sposób dodawania dodatkowych pulpitów Home Assistant.
Panel **Kiosk** jest teraz osobnym konfiguratorem. Dodany w nim pulpit lub widok
Lovelace staje się osobną, nazwaną zakładką tylko w wybranym profilu kiosku.

## Nawigacja

- nazwy wszystkich ekranów są widoczne pośrodku górnego nagłówka,
- dostępne są strzałki poprzedni/następny oraz bezpośredni wybór zakładki,
- gest w lewo lub w prawo działa na ekranach Matrix,
- dla strony z tego samego Home Assistanta gest działa również wewnątrz iframe.

## Edycja dodatkowego pulpitu

Dla każdej zakładki Lovelace można ustawić nazwę, widoczność, kolejność, skalę,
przesunięcie X/Y, margines, kolor tła, kolor ramki i zaokrąglenie. Przycisk
podglądu otwiera źródłowy pulpit w nowej karcie. Układ jego wewnętrznych kart
pozostaje edytowany standardowym edytorem Lovelace.

## Czcionki i pogrubienie

Rozmiar i pogrubienie można ustawić niezależnie dla nazwy, wartości, jednostki
i opisu/statusu każdego dymku przepływu, pól dodatkowych, opisów linii oraz
tekstów i zegara w nagłówkach zakładek kiosku.

## Aktualizacja

Zainstaluj nowe wydanie `v8.0.1`, uruchom ponownie Home Assistant i wykonaj
`Ctrl+F5`. Nowy numer wydania zmienia adres modułu frontendowego, dlatego
przeglądarka nie powinna użyć pliku JavaScript z wersji 8.0.0.
