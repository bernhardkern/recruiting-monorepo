package de.iits.elo.match

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.util.ProxyUtils
import java.util.*

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

    override fun hashCode(): Int {
        return 71 * id.hashCode()
    }
}
