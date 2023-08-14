package de.iits.elo.user

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.util.ProxyUtils
import java.util.*

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

    override fun hashCode(): Int {
        return 71 * id.hashCode()
    }
}
