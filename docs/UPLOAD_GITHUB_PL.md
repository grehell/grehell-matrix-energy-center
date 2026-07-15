# Jak poprawnie opublikować v0.6.3 na GitHub

1. Rozpakuj `matrix-energy-center-repository-v0.6.3.zip` na komputerze.
2. Otwórz znajdujący się w środku katalog `matrix-energy-center`.
3. Wgraj **zawartość tego katalogu** do głównego katalogu repozytorium GitHub.
   Nie wgrywaj samego pliku ZIP jako pliku w repozytorium.
4. Zatwierdź wszystkie pliki jednym commitem, np. `Release v0.6.3`.
5. Sprawdź na gałęzi `main`, czy plik
   `custom_components/matrix_energy_center/manifest.json` ma wersję `0.6.3`
   oraz czy istnieje plik
   `custom_components/matrix_energy_center/frontend/matrix-energy-flow-card.js`.
6. Dopiero po tym utwórz nowy tag i wydanie GitHub `v0.6.3` z bieżącej gałęzi
   `main`. Nie wskazuj wcześniejszego commita.
7. W HACS wybierz ponowne pobranie informacji o repozytorium, zainstaluj v0.6.3,
   zrestartuj Home Assistant i wykonaj `Ctrl+F5`.

Tag `v0.6.1` może pozostać jako historyczny, ale nie należy go ponownie
wykorzystywać ani przesuwać.
