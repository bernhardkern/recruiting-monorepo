package de.iits.elo.user

import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
) {

    fun findAll(): MutableList<User> =
        userRepository.findAll()

    fun findByUsername(userName: String) =
        userRepository.findUserByUsername(userName)

    fun update(user: User): User {
        val databaseObject = userRepository.findById(user.id)
        check(databaseObject.isPresent) { "No user exists with id ${user.id}" }
        return save(user)
    }

    fun save(user: User) =
        userRepository.save(user)

    fun getElo(username: String) =
        findByUsername(username)?.elo ?: throw IllegalStateException("Could not find user with username $username")
}