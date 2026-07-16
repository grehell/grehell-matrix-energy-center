# Matrix Energy Center v8.0.4 — stabilny edytor i trasy na tablecie

Wersja 8.0.4 poprawia dwa błędy widoczne na nagraniu z panelu **Ustawienia**:
uciekanie prawego inspektora po zmianie wartości oraz prowadzenie linii pod
dymkami na ekranie tabletu.

## Edytor pozostaje w miejscu

Zmiana liczby, koloru, tekstu, checkboxa albo naciśnięcie Enter nie przebudowuje
już całej strony. W panelu **Ustawienia** odświeża się wyłącznie lewy podgląd
diagramu. W oknie dodawania lub edycji dymku odświeża się wyłącznie karta
podglądu. Pole, fokus i pozycja przewinięcia prawego panelu pozostają bez zmian.

## Linie omijają rzeczywisty dymek

Router nie zakłada już, że scena zawsze ma 1000 pikseli szerokości. Po
wyrenderowaniu i przy każdej zmianie rozmiaru ekranu pobiera rzeczywistą
szerokość i wysokość sceny. Dodatkowo mierzy pełny prostokąt każdego dymku,
łącznie z paddingiem i ramką. Dzięki temu powiększony dymek lub wąski ekran
Galaxy Tab A9 nie są zaniżane w obliczeniach.

Sprawdzane są całe odcinki trasy, a nie tylko punkty siatki. Jeżeli typowy
korytarz jest zablokowany, router szuka obejścia również poza krawędzią sceny;
nie wraca już po cichu do prostej przecinającej dymek. W bardzo ciasnym układzie
może zmniejszyć dodatkowy margines, lecz nie może przeciąć widocznej ramki.

## Aktualizacja

1. Wgraj zawartość paczki repozytorium `v8.0.4` do głównego katalogu GitHub.
2. Utwórz tag i wydanie `v8.0.4` z aktualnej gałęzi `main`.
3. Zaktualizuj integrację przez HACS i uruchom ponownie Home Assistant.
4. Wykonaj `Ctrl+F5` albo wyczyść pamięć podręczną WebView na tablecie.

Konfiguracja pozostaje w schemacie v8 i nie wymaga usuwania pliku
`.storage/matrix_energy_center`.
