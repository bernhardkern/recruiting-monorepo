# recruiting-monorepo

*"Ein Repository, sie zu knechten, sie alle zu finden, ins Dunkel zu treiben und ewig zu binden." - J. R. R. Trollkien*

## Beschreibung

Anwendung zum Erfassen und Verfolgen von Spielen zwischen registrierten Personen mit automatischer Berechnung des Skill Niveaus der einzelnen Teilnehmer.

## Anforderungen

- [ ] IDE deiner Wahl
- [ ] Docker
- [ ] Java / .NET
- [ ] node.js

*- nutze immer die aktuellste LTS Version -*

## Aufgaben Backlog

TODO

---

```
Als Spieler möchte ich auch Matches aus der Vergangenheit eingetragen können,
damit ich nicht immer direkt nach dem Spiel die Anwendung bedienen muss.
```
**Kategorie**: *Frontend und Backend*

**Ziel**: *Einstiegsfrage, Datumsformate und Zeitzonen, Testanpassung*

**Mögliche Probleme**:
- *Eintragen von Matches aus der Zukunft*
- *Default Verhalten, wenn kein Datum mitgeliefert wird*
---

```
Als Systemadministrator möchte ich sicherstellen,
dass nur valide Email Adressen für die Spieler eintragen werden können,
um den Nutzer potentiell kontaktieren zu können.
```
**Kategorie**: *Frontend und Backend*

**Ziel**: *PO beraten (formale Anforderung), Validierung*

---

```
Als Spieler möchte ich meinen Nutzername bearbeiten können,
damit ich meinen peinlichen Gaming Namen wechseln kann.
```
**Kategorie**: *Frontend und Backend*

**Ziel**: *Umgang mit Datenbank IDs und Referenzen*

---

```
Als Mitgleid der Buchhaltung möchte ich die Laufzeit der Pipeline minimieren und den Test mit der längsten Laufzeit entfernen,
damit wir Zeit und Geld bei der Entwicklung sparen können.
```
**Kategorie**: *Frontend und Backend*

**Ziel**: *Sinnhaftigkeit von Aufgaben hinterfragen*

**Mögliche Probleme**:
- *Test nicht löschen, sondern Laufzeit verringern*
---

```
Als Produkt Owner möchte ich nach einem Spiel ein neues Elo der Matchteilnehmer berechnen,
damit ein Hauptfeature meiner Anwendung implementiert ist.
```
**Kategorie**: *Backend*

**Ziel**: *Programmstruktur, Algorithmen*

**Mögliche Probleme**:
- *Wenn Matches aus Vergangenheit eingetragen werden können: Elo Berechnung dort nicht möglich*
- *Spielername existiert nicht*
- *Algorithmus zur Berechnung unbekannt*
---

```
Als Spieler möchte ich mögliche Gegner mit ähnlichem Elo finden können,
damit ich faire Matches spielen kann.
```
**Kategorie**: *Frontend und Backend*

**Ziel**: *Performance, Datenbank Queries*

**Mögliche Probleme**:
- *Welche Spanne ist "ähnlich"?* (die 2 nächsten)
---

```
Als Software Entwickler möchte ich die Matchergebnisse nur schrittweise abrufen können,
damit Aufrufe mit großen Datenmengen vermieden werden.
```
**Kategorie**: *Frontend und Backend*

**Ziel**: *Pagination*

**Mögliche Probleme**:
- *Default Size*
- *Attribut zur Sortierung*
---

```
Als Administrator möchte ich beim Bearbeiten eines Spielers die Felder mit den aktuellen Daten vorausgefüllt haben,
damit ich die Felder nicht manuell ausfüllen muss.
```
**Kategorie**: *Frontend*

**Ziel**: *Vue: Router+Props*

---

```
Als Produkt Owner möchte ich regelmäßig an alle Spieler das aktuelle Ranking per Mail schicken können,
damit ein Hauptfeature meiner Anwendung implementiert ist. (Es reicht hier die Konsole)
```
**Kategorie**: *Backend*

**Ziel**: *Scheduled Jobs*

**Mögliche Probleme**:
- *Welche Zeitspanne ist "regelmäßig"?*
- *Mehrere Instanzen der Anwendung*
- *Neustart der Anwendung*