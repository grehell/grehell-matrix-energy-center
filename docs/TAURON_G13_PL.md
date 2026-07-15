# TAURON G13 — konfiguracja i sposób liczenia

## Cel modułu

Moduł G13 ma działać w instalacjach wielu użytkowników. Z tego powodu harmonogram i wszystkie ceny są edytowalne, a wartości sprzedaży energii nie są zaszyte na stałe.

## Domyślny harmonogram

### Okres letni — 1 kwietnia–30 września

- szczyt przedpołudniowy: **07:00–13:00**,
- szczyt popołudniowy: **19:00–22:00**,
- pozostałe godziny: **13:00–19:00 oraz 22:00–07:00**.

### Okres zimowy — 1 października–31 marca

- szczyt przedpołudniowy: **07:00–13:00**,
- szczyt popołudniowy: **16:00–21:00**,
- pozostałe godziny: **13:00–16:00 oraz 21:00–07:00**.

### Dni wolne

Przy domyślnych ustawieniach soboty, niedziele i ustawowe święta w Polsce są zaliczane do strefy „pozostałe godziny” przez całą dobę. Po dniu wolnym strefa pozaszczytowa trwa do godziny 07:00 kolejnego dnia roboczego.

Kalendarz uwzględnia święta ruchome oraz 24 grudnia od 2025 roku. Można również dopisać własne daty wolne, np.:

```text
2026-08-14, 2026-12-31
```

## Trzy tryby ceny

### 1. Składniki

Cena całkowita jest obliczana jako:

```text
cena energii czynnej
+ zmienna stawka dystrybucyjna G13
+ opłata jakościowa
+ opłata OZE
+ opłata kogeneracyjna
+ akcyza i inne własne składniki
```

Dla energii czynnej i dystrybucji można wpisać osobne wartości dla:

- lata — szczyt przedpołudniowy,
- lata — szczyt popołudniowy,
- lata — pozostałe godziny,
- zimy — szczyt przedpołudniowy,
- zimy — szczyt popołudniowy,
- zimy — pozostałe godziny.

To pozwala obsłużyć także niestandardowy cennik, którego ceny sprzedaży zmieniają się między sezonami.

### 2. Pełna cena

Użytkownik wpisuje jedną kompletną cenę brutto za kWh dla każdej strefy i sezonu. Integracja nie dodaje już kolejnych składników.

### 3. Encja Home Assistant

Bieżąca cena pochodzi z encji `sensor.*`, np. z integracji cen dynamicznych. Silnik G13 nadal może pokazywać aktualną strefę i kalendarz, ale koszt godzinowy wykorzystuje wartość sensora.

## Preset TAURON Dystrybucja G13 2026

Wersja v0.5 zachowuje edytowalny preset brutto na okres 1 stycznia–31 grudnia 2026 roku.

### Zmienna stawka sieciowa brutto

| Strefa | PLN/kWh |
|---|---:|
| Szczyt przedpołudniowy | 0,2710 |
| Szczyt popołudniowy | 0,4795 |
| Pozostałe godziny | 0,0482 |

### Pozostałe zmienne opłaty brutto w presecie

| Składnik | PLN/kWh |
|---|---:|
| Jakościowa | 0,0408 |
| OZE | 0,0090 |
| Kogeneracyjna | 0,0037 |

### Domyślne opłaty stałe brutto

| Składnik | Wartość miesięczna |
|---|---:|
| Sieciowa stała — 1 faza | 9,08 PLN |
| Sieciowa stała — 3 fazy | 13,36 PLN |
| Abonament — cykl 1-miesięczny | 5,61 PLN |
| Opłata mocowa — domyślny próg w projekcie | 21,13 PLN |

Opłata mocowa zależy od rocznego zużycia, dlatego wartość należy wybrać zgodnie ze swoją grupą. Projekt pozwala ją dowolnie zmienić. Opłata handlowa również zależy od umowy i domyślnie wynosi `0`.

## Dlaczego cena energii czynnej wynosi domyślnie zero

TAURON Dystrybucja określa opłaty za dystrybucję, natomiast cena sprzedaży energii może zależeć od sprzedawcy, produktu, cennika, umowy i okresu obowiązywania. W projekcie wieloużytkownikowym nie można bezpiecznie przyjąć jednej ceny dla wszystkich.

Po użyciu presetu należy więc wpisać własne ceny energii czynnej albo wybrać tryb pełnej ceny/encji.

## Sensory tworzone przez integrację

- `sensor.matrix_energy_center_active_g13_zone`,
- `sensor.matrix_energy_center_g13_season`,
- `sensor.matrix_energy_center_g13_day_type`,
- `sensor.matrix_energy_center_g13_energy_price_component`,
- `sensor.matrix_energy_center_g13_distribution_price_component`,
- `sensor.matrix_energy_center_g13_variable_fees_component`,
- `sensor.matrix_energy_center_g13_total_purchase_price`,
- `sensor.matrix_energy_center_g13_fixed_monthly_fees`,
- `sensor.matrix_energy_center_next_g13_zone`,
- `sensor.matrix_energy_center_minutes_to_next_g13_zone`,
- `sensor.matrix_energy_center_current_grid_import_cost_per_hour`.

Rzeczywisty identyfikator encji może otrzymać końcówkę, jeżeli w Home Assistant istnieje już encja o tej samej nazwie.

## Koszt pracy urządzeń

Dla każdego dodatkowego urządzenia mającego sensor mocy panel oblicza:

```text
moc urządzenia [kW] × aktualna cena zakupu [PLN/kWh]
```

Wynik pokazuje orientacyjny koszt pracy przez godzinę przy niezmienionej mocy. Nie jest to jeszcze licznik kosztu historycznego.

## Weryfikacja po instalacji

Sprawdź kolejno:

1. środę latem o 12:00 — szczyt przedpołudniowy,
2. środę latem o 14:00 — pozostałe godziny,
3. środę latem o 20:00 — szczyt popołudniowy,
4. środę zimą o 17:00 — szczyt popołudniowy,
5. sobotę o 12:00 — pozostałe godziny,
6. poniedziałek po weekendzie o 06:59 — pozostałe godziny,
7. ten sam poniedziałek o 07:00 — szczyt przedpołudniowy.

## Źródła oficjalne

Harmonogram G13:

- https://www.tauron.pl/dla-domu/prad/taryfa-sprzedawcy/g13

Stawki dystrybucyjne 2026:

- https://www.tauron-dystrybucja.pl/uslugi-dystrybucyjne/stawki-oplat-dystrybucyjnych

Przed użyciem do rozliczeń zawsze porównaj ustawienia z aktualną umową, fakturą i taryfą obowiązującą w danym roku.
