# Matrix Energy Center v8.0.6 — tryb wydajny kiosku

To wydanie optymalizuje wyłącznie pełnoekranowy widok `?kiosk=...`. Zwykły panel Matrix, edytory konfiguracji i natywna karta Lovelace zachowują dotychczasowy wygląd oraz częstotliwość działania.

## Co zmieniono

- W DOM utrzymywany jest tylko aktywny slajd. Nieaktywne diagramy, wykresy i pulpity Lovelace nie renderują się w tle.
- Ramka Lovelace jest tworzona dopiero po wejściu na jej zakładkę i korzysta z ładowania leniwego.
- Zmiany stanów encji nieużywanych w konfiguracji Matrix nie uruchamiają aktualizacji kiosku.
- Widoczne wartości są odświeżane najwyżej raz na sekundę, a miniwykresy najwyżej raz na pięć sekund.
- Historia Recorder jest pobierana tylko wtedy, gdy aktywny jest slajd Wykresy.
- Model sceny przepływów jest buforowany, a aktualizacje geometrii linii są łączone.
- Niepotrzebne zapisy do DOM są pomijane, gdy wyświetlana wartość się nie zmieniła.
- W trybie wydajnym wyłączone są najbardziej kosztowne poświaty, filtry i przejścia, a animacje linii wykonują mniej pracy.

## Włączenie i wyłączenie

Tryb **Tryb wydajny tabletu** jest domyślnie włączony dla kiosku domyślnego, istniejących profili po migracji oraz nowych profili. Ustawienie znajduje się w panelu **Kiosk** osobno dla każdego profilu.

Do jednorazowego wyłączenia trybu bez zapisywania konfiguracji użyj:

```text
/matrix-energy-center?kiosk=salon&performance=0
```

Usunięcie parametru przywraca ustawienie zapisane dla profilu.

## Aktualizacja

1. Zainstaluj paczkę v8.0.6 przez HACS albo podmień katalog `custom_components/matrix_energy_center`.
2. Wykonaj pełny restart Home Assistant.
3. Otwórz dotychczasowy adres kiosku, na przykład `/matrix-energy-center?kiosk=salon`.
4. Jeżeli przeglądarka Fully Kiosk nadal pokazuje poprzedni frontend, jednorazowo wyczyść jej cache i przeładuj stronę.

Po restarcie frontend v8.0.6 jest udostępniany pod wersjonowaną ścieżką `/matrix_energy_center_static_v8_0_6/`.
