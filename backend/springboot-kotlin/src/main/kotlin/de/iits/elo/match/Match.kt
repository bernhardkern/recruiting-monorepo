package de.iits.elo.match

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.util.ProxyUtils
import java.util.*

// @Tom: ich würde nicht data class und Entity mischen. Meiner Meinung nach ein Antipattern.
// eine dataclass muss bei == auch alle Werte im Konstruktor vergleichen und nicht nur Id, was für Hibernate erforderlich ist.
// https://www.baeldung.com/kotlin/jpa: As opposed to what comes naturally here, using data classes as JPA entities is generally discouraged
// Es gibt dazu zahlreiche Diskussionen im Netz

// Noch eine Frage: Warum heißt das Match? Ist das nicht das Ergebnis eines Matches?

@Entity
@Table(name = "match")
data class Match(
    @Id
    val id: UUID = UUID.randomUUID(),
    val whitePlayer: UUID,
    val blackPlayer: UUID,
    @Enumerated(EnumType.STRING)
    val outcome: Outcome,
    val playedOn: String,
) {
    override fun equals(other: Any?): Boolean {
        other ?: return false
        if (this === other) return true
        if (javaClass != ProxyUtils.getUserClass(other)) return false
        other as Match
        return this.id == other.id
    }

    override fun hashCode(): Int = 71 * id.hashCode()
}
