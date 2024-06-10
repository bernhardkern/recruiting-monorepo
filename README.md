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

Die Aufgaben können in beliebiger Reihenfolge gestellt und bearbeitet werden.
In den Testinterviews hat sich gezeigt, dass man durch die zeitliche Limitierung nur 1-2 Aufgaben coden kann.
Die restlichen Aufgaben lassen sich aber dennoch theoretisch abfragen.

Die Nummerierung gibt keine Reihenfolge vor, sondern dient nur für uns zur Orientierung.

---
### Aufgabe 1

```
Als Spieler möchte ich auch Matches aus der Vergangenheit eingetragen können,
damit ich nicht immer direkt nach dem Spiel die Anwendung bedienen muss.
```
**Level**: *Junior, Mid, Senior*

**Kategorie**: *Frontend und Backend*

**Ziel**: *Einstiegsfrage, Datumsformate und Zeitzonen, Testanpassung*

**Mögliche Ansätze/Probleme**:
- *Eintragen von Matches aus der Zukunft*
- *Default Verhalten, wenn kein Datum mitgeliefert wird*
---
### Aufgabe 2

```
Als Systemadministrator möchte ich sicherstellen,
dass nur valide Email Adressen für die Spieler eintragen werden können,
um den Nutzer potentiell kontaktieren zu können.
```
**Level**: *Junior, Mid, Senior*

**Kategorie**: *Frontend und Backend*

**Ziel**: *PO beraten (formale Anforderung), Validierung*

---
### Aufgabe 3

```
Als Spieler möchte ich meinen Nutzername bearbeiten können,
damit ich meinen peinlichen Gaming Namen wechseln kann.
```
**Level**: *Junior, Mid, Senior*

**Kategorie**: *Frontend und Backend*

**Ziel**: *Umgang mit Datenbank IDs und Referenzen*

---
### Aufgabe 4

```
Als Mitglied der Buchhaltung möchte ich die Laufzeit der Pipeline minimieren und den Test mit der längsten Laufzeit entfernen,
damit wir Zeit und Geld bei der Entwicklung sparen können.
```
**Level**: *Junior, Mid, Senior*

**Kategorie**: *Frontend und Backend*

**Ziel**: *Sinnhaftigkeit von Aufgaben hinterfragen*

**Mögliche Ansätze/Probleme**:
- *Test nicht löschen, sondern Laufzeit verringern*
---
### Aufgabe 5

```
Als Produkt Owner möchte ich nach einem Spiel ein neues Elo der Matchteilnehmer berechnen,
damit ein Hauptfeature meiner Anwendung implementiert ist.
```
**Level**: *Junior, Mid, Senior*

**Kategorie**: *Backend*

**Ziel**: *Programmstruktur, Algorithmen*

**Mögliche Ansätze/Probleme**:
- *Wenn Matches aus Vergangenheit eingetragen werden können: Elo Berechnung dort nicht möglich*
- *Spielername existiert nicht*
- *Algorithmus zur Berechnung unbekannt*
---
### Aufgabe 6

```
Als Spieler möchte ich mögliche Gegner mit ähnlichem Elo finden können,
damit ich faire Matches spielen kann.
```
**Level**: *Junior, Mid, Senior*

**Kategorie**: *Frontend und Backend*

**Ziel**: *Performance, Datenbank Queries*

**Mögliche Ansätze/Probleme**:
- *Welche Spanne ist "ähnlich"?* (die 2 nächsten)
---
### Aufgabe 7

```
Als Software Entwickler möchte ich die Matchergebnisse nur schrittweise abrufen können,
damit Aufrufe mit großen Datenmengen vermieden werden.
```
**Level**: *Mid, Senior*

**Kategorie**: *Frontend und Backend*

**Ziel**: *Pagination*

**Mögliche Ansätze/Probleme**:
- *Default Size*
- *Attribut zur Sortierung*
---
### Aufgabe 8

```
Als Administrator möchte ich beim Bearbeiten eines Spielers die Felder mit den aktuellen Daten vorausgefüllt haben,
damit ich die Felder nicht manuell ausfüllen muss.
```
**Level**: *Junior, Mid, Senior*

**Kategorie**: *Frontend*

**Ziel**: *Vue: Router+Props*

---
### Aufgabe 9

```
Als Produkt Owner möchte ich regelmäßig an alle Spieler das aktuelle Ranking per Mail schicken können,
damit ein Hauptfeature meiner Anwendung implementiert ist. (Es reicht hier die Konsole)
```
**Level**: *Mid, Senior*

**Kategorie**: *Backend*

**Ziel**: *Scheduled Jobs*

**Mögliche Ansätze/Probleme**:
- *Welche Zeitspanne ist "regelmäßig"?*
- *Mehrere Instanzen der Anwendung*
- *Neustart der Anwendung*


---
### Aufgabe 10

```
Als Softwareentwickler möchte ich Code-Duplizierungen vermeiden,
damit Änderungen möglichst nur an einer Stelle vorgenommen werden brauchen.
```
**Level**: *Mid, Senior*

**Kategorie**: *Frontend*

**Ziel**: *Refactoring, Unit Tests*

**Mögliche Ansätze/Probleme**:
- *Vue: Datei 'components/matches/MatchForm.vue': Erstelle eine wiederverwendbare Komponente für die Auswahl von Spielern und verwende sie sowohl für den weißen als auch für den schwarzen Spieler.*
