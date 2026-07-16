# Matrix Energy Center v8.0.0 — kiosk bez dolnych pasków

Wersja 8.0.0 wykorzystuje całą wysokość ekranu kiosku. Dolny pasek statusu i
dolna nawigacja nie są już renderowane. Strzałki oraz wskaźniki slajdów znajdują
się pośrodku górnego nagłówka, a okno przepływu wypełnia pozostałe miejsce aż do
dolnej krawędzi ekranu.

## Fonty dymków

W panelu **Ustawienia** po wybraniu dymku można osobno ustawić rozmiar:

- nazwy,
- głównej wartości,
- jednostki,
- opisu lub statusu,
- nazwy, wartości i jednostki każdego dodatkowego pola encji.

Ustawienia dotyczą osobno Podsumowania, Przepływów oraz każdego profilu kiosku.

## Osobny nagłówek każdego slajdu

Po wybraniu kiosku w panelu **Ustawienia** pojawia się sekcja
**Kiosk · nagłówki slajdów**. Osobne ustawienia są dostępne dla Przepływu,
Wykresów, Podsumowania i każdej dodanej strony Home Assistant.

Każdy nagłówek może mieć własny nadtytuł, tytuł, opis, ikonę, wysokość, kolory,
rozmiary tekstów i zegara. Niezależnie można pokazać lub ukryć ikonę, zegar,
nawigację, przycisk pełnego ekranu oraz wyjście.

## Strony z tego samego Home Assistanta

Poprzednia wersja backendu dopuszczała tylko ścieżki zaczynające się od `/`.
Wklejenie pełnego adresu powodowało wyczyszczenie pola podczas zapisu.

W v8.0.0 można podać:

```text
/dashboard-jsbd/deye-kiosk
```

albo pełny adres tej samej instancji:

```text
https://twoj-home-assistant.example/dashboard-jsbd/deye-kiosk
```

Pełny adres jest przed zapisem zamieniany na lokalną ścieżkę z zachowaniem
parametrów i fragmentu. Adres obcej domeny jest odrzucany z komunikatem, zamiast
być po cichu usuwany.

Po aktualizacji uruchom ponownie Home Assistant i wykonaj `Ctrl+F5`.
