# Matrix Energy Center v0.6.0 — informacje o wydaniu

Wersja 0.6.0 rozwija przegląd w konfigurowalny pulpit wieloencjowy i dodaje kompletne profile ekranów kiosk.

## Dymki

- wartość główna i opcjonalna wartość pomocnicza,
- do 8 powiązanych encji w tym samym dymku,
- osobna nazwa, jednostka, kolor, precyzja i mnożnik dla każdej wartości,
- kolory stałe lub zależne od progów,
- alarm poniżej, powyżej albo poza zakresem,
- akcja: szczegóły encji, nawigacja lub usługa Home Assistant.

## Wykresy

- seria główna i do 8 dodatkowych serii na jednej osi czasu,
- osobne kolory i bieżące wartości w legendzie,
- linie, obszary i grupowane słupki,
- historia sesji, 24 h, 7 dni i 30 dni,
- dłuższe zakresy korzystają najpierw z Recorder Statistics, a następnie ze zwykłej historii,
- ręczne odświeżenie historii i automatyczny cache na 5 minut.

## Kiosk

- wiele nazwanych profili, np. salon, kuchnia i kotłownia,
- wybór dymków i wykresów dla każdego ekranu,
- bezpośredni adres `/matrix-energy-center?kiosk=<id_profilu>`,
- automatyczna rotacja przepływów, wykresów i podsumowania,
- przyciski poprzedni/następny i wskaźniki slajdów,
- harmonogram przyciemnienia nocnego z regulowaną jasnością.

## Aktualizacja

1. Wykonaj eksport konfiguracji JSON.
2. Zainstaluj v0.6.0 przez HACS albo podmień katalog integracji.
3. Uruchom ponownie Home Assistant.
4. Wykonaj twarde odświeżenie panelu (`Ctrl+F5`).
5. Otwórz **Widżety** i zapisz konfigurację, aby utrwalić schemat v6.

Konfiguracje v0.1–v0.5 są migrowane automatycznie. Istniejące dymki i wykresy zachowują ustawienia; nowe serie, powiązane encje i profile kiosk zaczynają jako puste listy.
