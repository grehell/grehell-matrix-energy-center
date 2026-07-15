# Status projektu v0.2.0

## Gotowe w prototypie

- instalacja jako niestandardowa integracja Home Assistant,
- kreator pierwszej konfiguracji w interfejsie HA,
- pełnoekranowy panel w pasku bocznym,
- stylistyka Matrix Blue z dodatkowymi kolorami funkcjonalnymi,
- mapowanie encji sieci, domu, PV, magazynu i EV,
- dowolna liczba stringów PV,
- podział każdego stringu na dowolne sekcje/pozycje,
- dowolna liczba urządzeń dodatkowych,
- nazwy, opisy, obszary, ikony i kolory urządzeń,
- osobne encje mocy, energii i sterowania urządzeń,
- ujednolicone sensory wynikowe,
- import i eksport konfiguracji JSON,
- diagnostyka oraz test wskazanej encji,
- wersja polska i angielska,
- paczka repozytorium oraz paczka instalacji ręcznej.

## Silnik TAURON G13

- automatyczne rozpoznawanie sezonu letniego i zimowego,
- szczyt przedpołudniowy 07:00–13:00,
- szczyt popołudniowy latem 19:00–22:00,
- szczyt popołudniowy zimą 16:00–21:00,
- pozostałe godziny jako strefa pozaszczytowa,
- soboty, niedziele i polskie święta ustawowe jako strefa pozaszczytowa przez całą dobę,
- przedłużenie taniej strefy po dniu wolnym do 07:00 następnego dnia roboczego,
- możliwość dopisywania własnych dni wolnych,
- osobne ceny energii dla trzech stref i obu sezonów,
- osobne ceny dystrybucji dla trzech stref i obu sezonów,
- osobne opłaty jakościowe, OZE, kogeneracyjne, akcyzowe i własne,
- opłaty stałe zależne od liczby faz oraz pozostałe miesięczne składniki,
- tryb ceny składowej, pełnej ceny brutto albo ceny z encji Home Assistant,
- podgląd aktywnej strefy, kolejnej strefy i czasu do zmiany,
- wyliczanie bieżącego kosztu importu z sieci oraz kosztu pracy urządzeń na godzinę,
- gotowy, edytowalny preset dystrybucyjny TAURON G13 na 2026 rok.

Cena energii czynnej nie jest narzucona. Użytkownik wpisuje ceny ze swojej umowy lub mapuje zewnętrzny sensor ceny, ponieważ stawki sprzedaży mogą zależeć od sprzedawcy, cennika i okresu obowiązywania.

## Świadome ograniczenia v0.2.0

- prototyp przeszedł walidację statyczną i testy jednostkowe, ale nadal wymaga testu na rzeczywistej instancji Home Assistant,
- wykresy w panelu korzystają obecnie z próbek zebranych od chwili otwarcia panelu; podłączenie do Recorder/Statistics jest zaplanowane,
- silnik pokazuje bieżącą cenę i koszt godzinowy, ale nie zapisuje jeszcze kompletnego rozliczenia dziennego i miesięcznego,
- użytkownik musi zweryfikować stawki energii, dystrybucji oraz opłaty stałe według własnej umowy i aktualnej taryfy,
- automatyczne sterowanie falownikiem, magazynem i ładowarką EV jest celowo wyłączone,
- adaptery producentów będą dodawane po sprawdzeniu rzeczywistych zestawów encji,
- przed publikacją repozytorium trzeba zmienić `YOUR_GITHUB_USER` w `manifest.json`.

## Najbliższy test

1. Skopiować integrację do `/config/custom_components/matrix_energy_center`.
2. Uruchomić ponownie Home Assistant.
3. Dodać integrację „Matrix Energy Center”.
4. Otworzyć zakładkę **Ceny / G13**.
5. Włączyć profil TAURON G13 i użyć presetu 2026.
6. Wprowadzić własne ceny energii czynnej dla wszystkich stref.
7. Sprawdzić aktywną strefę w dni robocze, weekend oraz święto.
8. Przypisać podstawowe encje i zapisać konfigurację.
9. Zebrać błędy z dziennika i konsoli przeglądarki.
