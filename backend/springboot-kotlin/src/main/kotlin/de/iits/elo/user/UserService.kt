package de.iits.elo.user

import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class UserService(
    private val userRepository: UserRepository,
) {

    fun findAll(): List<User> =
        userRepository.findAll()

    fun findByUsername(userName: String) =
        userRepository.findById(userName).getOrNull()

    @Throws(IllegalArgumentException::class)
    fun update(user: User): User {
        val databaseObject = userRepository.findById(user.username)
        check(databaseObject.isPresent) { "No user exists with username ${user.username}" }
        return save(user)
    }

    fun save(user: User) =
        userRepository.save(user)

    fun getElo(username: String) =
        findByUsername(username)?.elo ?: throw IllegalStateException("Could not find user with username $username")
}