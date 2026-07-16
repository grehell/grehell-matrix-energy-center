# Matrix Energy Center v0.6.4 — swobodny kiosk i widoki Lovelace

Wersja 0.6.4 usuwa sztywne elementy z kiosku. Standardowe dymki Dom, PV, Sieć,
Magazyn, EV i Cena można wybierać oddzielnie. Dymek magazynu nie jest domyślnie
włączony. Na slajdzie podsumowania oddzielne przełączniki sterują cenami,
odbiornikami, wskaźnikiem magazynu oraz samowystarczalnością; oba okrągłe
wskaźniki są domyślnie wyłączone.

Administrator może nacisnąć **EDYTUJ UKŁAD** bezpośrednio w kiosku. W trybie
edycji:

- pomarańczowy uchwyt przesuwa dymek,
- uchwyt w prawym dolnym rogu zmienia jego szerokość,
- uchwyt **PRZESUŃ DIAGRAM** przesuwa cały diagram przepływów,
- przycisk **ZAPISZ UKŁAD** zapisuje pozycje w aktywnym profilu.

W konfiguracji profilu dostępne są również wartości numeryczne: wysokość obszaru
dymków, położenie diagramu X/Y, skala diagramu oraz reset układu.

Do jednego profilu można dodać do 12 lokalnych widoków Lovelace. Przykładowa
ścieżka:

```text
/dashboard-jsbd/deye-kiosk
```

Każdy aktywny widok staje się osobnym slajdem i uczestniczy w ręcznej nawigacji
oraz automatycznej rotacji. Dla osadzanego pulpitu warto włączyć Kiosk Mode,
aby wewnątrz slajdu nie było nagłówka i panelu bocznego Home Assistant.

Tryb kiosku zawsze zajmuje cały dostępny viewport. Opcja automatycznego pełnego
ekranu uruchamia Fullscreen API przy pierwszym dotknięciu, ponieważ zwykła
przeglądarka nie pozwala stronie samodzielnie ukryć swoich pasków bez gestu
użytkownika. Fully Kiosk Browser może wejść w tryb immersyjny od razu.
