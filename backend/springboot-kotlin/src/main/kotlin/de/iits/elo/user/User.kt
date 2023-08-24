package de.iits.elo.user

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.util.ProxyUtils
import java.util.*

// @Tom: ich würde nicht data class und Entity mischen. Meiner Meinung nach ein Antipattern.
// eine dataclass muss bei == auch alle Werte im Konstruktor vergleichen und nicht nur Id, was für Hibernate erforderlich ist.
// https://www.baeldung.com/kotlin/jpa: As opposed to what comes naturally here, using data classes as JPA entities is generally discouraged
// Es gibt dazu zahlreiche Diskussionen im Netz

@Entity
@Table(name = "users")
data class User(
    @Id
    val id: UUID = UUID.randomUUID(),
    val username: String,
    val displayName: String,
    val email: String,
) {
    override fun equals(other: Any?): Boolean {
        other ?: return false
        if (this === other) return true
        if (javaClass != ProxyUtils.getUserClass(other)) return false
        other as User
        return id == other.id
    }

    override fun hashCode(): Int = 71 * id.hashCode()
}
