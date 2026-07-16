# Matrix Energy Center v8.0.2 — wspólny edytor dymków i schowek kafelków

Wersja 8.0.2 porządkuje konfigurację dymków. Kliknięcie **Dodaj dymek** albo
**Edytuj** otwiera to samo okno ze szkicem i podglądem. Zmiana zostaje wysłana
do Home Assistant dopiero po użyciu przycisku **ZAPISZ DYMEK**; anulowanie nie
modyfikuje zapisanej konfiguracji.

## Emoji bez linku

W sekcji ikony wybierz **Emoji**, a następnie wklej znak, np. `🏠`, `🔋`, `☀️`
lub `⚡`. Nie trzeba przygotowywać pliku ani podawać adresu obrazu. Opcja działa
dla własnych dymków przeglądu, wszystkich dymków przepływu oraz natywnej karty
Lovelace. Ikony `mdi:...` pozostają dostępne.

## Kopiowanie kafelka między pulpitami

W panelu **Ustawienia** wybierz pulpit i dymek, a następnie użyj sekcji
**Schowek kafelka**:

1. **Kopiuj** zapisuje wygląd, rozmiar, pola dodatkowe i akcję wybranego dymku.
2. Przełącz zakładkę Podsumowanie, Przepływy albo wybrany profil kiosku.
3. Wybierz dymek docelowy.
4. **Wklej wygląd** zachowuje jego pozycję, a **Wklej z pozycją** kopiuje także
   współrzędne i warstwę.
5. Kliknij główny przycisk zapisania ustawień.

## Aktualizacja

Po wgraniu `v8.0.2` uruchom ponownie Home Assistant i wykonaj `Ctrl+F5`.
Numer wersji jest częścią adresu modułu frontendowego, dlatego eliminuje użycie
starego pliku JavaScript z pamięci podręcznej.
