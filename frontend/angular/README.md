# Elo manager frontend

This project serves as a tool for coding interviews, featuring a user interface for managing chess Elo ratings. It supports integration with various backends or can be used with a mock server. The presence of bugs, code requiring refactoring, or any missing or malfunctioning tests is by design, serving as concealed exercises meant for identification and resolution by the user.

## Development server

Run `yarn run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

You can proxy to every backend. Just use these commands for the different beackends
- `yarn run start:mock` -> Mock Server Backend
- `yarn run start:spring:kotlin` -> Spring Boot Kotlin Backend
- `yarn run start:spring:java` -> Spring Boot Java Backend
- `yarn run start:csharp` -> C# Backend

## Specific angular exercises


```
Das Bearbeiten eines Players geht nicht. Finde raus was das Problem ist.
```

---

```
Beim speichern eines 'Match' wird ein leerer String als Datum übergeben. Füge eine Möglichkeit hinzu, ein Datum einzugeben. Der Standardwert soll heute sein.
```

---

```
Betrachte 'match-form.component.html'. Schreibe eine Komponente für die Spielerauswahl und benutze sie für den weißen und den schwarzen Spieler.∆
```

---
```
Es können ungültige Emails eingegeben werden. Füge eine Validierung hinzu. (Simple Umsetzung reicht erst einmal)
```
