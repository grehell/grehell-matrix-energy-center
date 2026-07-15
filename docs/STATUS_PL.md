# Status projektu v0.3.0

## Najważniejsze zmiany względem v0.2

- przebudowany diagram przepływów oparty na jednej responsywnej siatce CSS,
- linie przepływu pozostają połączone z właściwymi węzłami na komputerze, tablecie i telefonie,
- kierunek animacji sieci i magazynu zmienia się zgodnie z importem/eksportem oraz ładowaniem/rozładowaniem,
- checkboxy modułów natychmiast pokazują albo ukrywają pozycje menu, karty podsumowania, węzły przepływu i sekcje konfiguracji,
- opcje wyglądu mają podgląd na żywo,
- nowe wyszukiwanie encji działa na aktualnym rejestrze stanów Home Assistant,
- wynik wyszukiwania pokazuje nazwę, `entity_id`, stan, jednostkę, `device_class`, urządzenie, obszar i integrację źródłową,
- wybrana encja pokazuje swój aktualny sformatowany stan bezpośrednio w polu,
- znacznie rozszerzone mapowanie domu, sieci, PV, falownika, BMS, EV oraz cen,
- osobne sensory importu/eksportu i ładowania/rozładowania mają pierwszeństwo przed sensorami ze znakiem,
- stringi i sekcje PV mają dodatkowe pola MPPT, napięcia, prądu, stanu i widoczności,
- urządzenia dodatkowe mają stan, program/cykl, progi pracy i czuwania, kolejność oraz osobne opisy stanu,
- konfiguracja jest automatycznie migrowana do schematu v3.

## Nadal gotowe

- instalacja przez HACS lub ręcznie,
- konfigurator integracji,
- pełnoekranowy panel Matrix Blue,
- taryfa TAURON G13 lato/zima, weekendy, święta i własne dni wolne,
- ceny składowe, pełne albo z zewnętrznej encji,
- dowolna liczba stringów, sekcji i urządzeń,
- import i eksport konfiguracji,
- diagnostyka źródeł i runtime,
- administrator-only zapis oraz opcjonalny podgląd dla innych użytkowników.

## Świadome ograniczenia v0.3.0

- pakiet przeszedł testy statyczne i jednostkowe, ale nowy układ wymaga sprawdzenia na rzeczywistych rozdzielczościach Home Assistant,
- wykresy nadal pokazują próbki od chwili otwarcia panelu; Recorder/Statistics jest planowany na następną wersję,
- nie ma jeszcze trwałego dziennego i miesięcznego rejestru kosztów,
- automatyczne sterowanie falownikiem, magazynem i ładowarką EV pozostaje wyłączone,
- pole języka zapisuje preferencję, ale pełne tłumaczenie całego panelu zostanie domknięte później,
- wyszukiwarka encji korzysta ze stanów dostępnych zalogowanemu użytkownikowi; nie pokazuje encji, do których użytkownik nie ma dostępu.

## Procedura testowa

1. Zaktualizować repozytorium GitHub do v0.3.0.
2. Poczekać na zielone HACS validation i Hassfest.
3. Opublikować release `v0.3.0`.
4. Zaktualizować integrację w HACS i zrestartować Home Assistant.
5. Wykonać `Ctrl+F5` w przeglądarce.
6. Sprawdzić przełączanie każdego modułu i zapisywanie ustawień.
7. Otworzyć każde pole encji i zweryfikować filtrowanie oraz wyświetlanie stanu.
8. Sprawdzić diagram przy szerokościach desktop, tablet i telefon.
9. Zebrać błędy z dziennika Home Assistant i konsoli przeglądarki.
