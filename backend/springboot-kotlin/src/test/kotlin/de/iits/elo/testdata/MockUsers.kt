package de.iits.elo.testdata

import de.iits.elo.user.User
import java.util.*


//@Tom: 1. Ich finde es besser, wenn man User flexibel anlegt und innerhalb der Tests speichert. Testaufbau, Testdurchführung, Testverifikation.
// Zentrale Testdaten, die vorher geseedet werden sind am Anfang bequem, führen aber bei Varianten zu komplizierteren Tests. Lieber ganz flexible
// Funktionen, die die Daten innerhalb des Tests anlegen.
fun createSampleUser(
    id: UUID = UUID.fromString("11111111-58cc-4372-a567-0e02b2c3d479"),
    username: String = "peterUser",
    displayName: String = "Peter",
    email: String = "peter@iits-consulting.de",
) = User(
    id = id,
    username = username,
    displayName = displayName,
    email = email,
)


val mockuser1 =
    User(
        id = UUID.fromString("11111111-58cc-4372-a567-0e02b2c3d479"),
        username = "peterUser",
        displayName = "Peter",
        email = "peter@iits-consulting.de"
    )

val mockuser2 =
    User(
        id = UUID.fromString("22222222-58cc-4372-a567-0e02b2c3d479"),
        username = "paulUser",
        displayName = "Paul",
        email = "paul@iits-consulting.de"
    )

