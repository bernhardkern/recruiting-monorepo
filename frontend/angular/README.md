# Elo manager frontend

This project serves as a tool for coding interviews, featuring a user interface for managing chess Elo ratings. It supports integration with various backends or can be used with a mock server. The presence of bugs, code requiring refactoring, or any missing or malfunctioning tests is by design, serving as concealed exercises meant for identification and resolution by the user.

## Development server

First install all dependencies with the package tool of your choice. E.g. `yarn install` or `npm install`

Run `yarn run start` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

You can proxy to every backend. Just use these commands for the different beackends
- `yarn run start:mock` -> Mock Server Backend (this is the default Backend)
- `yarn run start:spring:kotlin` -> Spring Boot Kotlin Backend
- `yarn run start:spring:java` -> Spring Boot Java Backend
- `yarn run start:csharp` -> C# Backend


- `npm run start:mock` -> Mock Server Backend (this is the default Backend)
- `npm run start:spring:kotlin` -> Spring Boot Kotlin Backend
- `npm run start:spring:java` -> Spring Boot Java Backend
- `npm run start:csharp` -> C# Backend

## Specific angular exercises


```
Bitte überprüfe, warum die Bearbeitung eines Players nicht funktioniert, und identifiziere und behebe die Ursache des Problems.
```

---

```
Bitte implementiere eine grundlegende Validierungsfunktion, um sicherzustellen, dass nur gültige E-Mail-Adressen eingegeben werden können. Eine einfache Lösung ist vorerst ausreichend.
```

---

```
Bitte ergänze eine Datumeingabekomponente aus dem material-Framework beim Speichern eines 'Match', sodass ein Datum an das Backend übergeben werden kann. Setze das heutige Datum als Standardwert.
```

---

```
Schau dir die Datei 'match-form.component.html' an. Erstelle eine wiederverwendbare Komponente für die Auswahl von Spielern und verwende sie sowohl für den weißen als auch für den schwarzen Spieler.
```

---

