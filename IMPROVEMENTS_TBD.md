# Improvements

Hier sind Verbesserungsvorschläge, über die wir diskutieren können.

## Aufgaben

Die bisherigen Aufgaben sind telweise schwer für ein Interview. Generell sollten wir evtl. eine eigene Readme nur für die Aufgaben anlegen. Der bisherige Mix aus Aufgaben und Schwierigkeiten führt dazu, dass der Bewerber das auch lesen kann.

Außerdem sind die Aufgaben für eine Bewerbungsituation frustrieren (Algorithmus fehlt, Macht keinen Sinn) oder ziemlich schwer (Id username ändern, Referenzen teilweise mit foreign key, teilweise nicht, man braucht eigentlich einen eigenen Endpunkt dafür).

Gute Aufgaben aus den bisherigen Aufgaben sind z.B:

- Finde Spieler mit ähnlichem Elo. EloIntervall soll vom Client mitgegeben werden.
- Matches aus der Vergangenheit eintragen (update erweitern)

Man könnte das z.B. auch direkt als roten Test implementieren.
restClient.get(/api/players/similar-elo?eloRange=50)

