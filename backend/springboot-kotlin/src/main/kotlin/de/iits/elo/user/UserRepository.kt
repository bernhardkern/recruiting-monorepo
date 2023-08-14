package de.iits.elo.user

import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface UserRepository : CrudRepository<User, UUID> {
    fun findUserByUsername(username: String): User?
}
