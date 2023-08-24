package de.iits.elo.user

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
class UserApi(
    private val userRepository: UserRepository,
) {

    companion object {
        const val SAMPLE_USER_ELO = 1001
    }

    @GetMapping("/users", produces = ["application/json"])
    fun getAllUsers(): ResponseEntity<Iterable<User>> = ResponseEntity.ok(userRepository.findAll())

    @GetMapping("/users/{username}", produces = ["application/json"])
    fun getUserByUsername(@PathVariable username: String?): ResponseEntity<User> {
        if (username.isNullOrBlank()) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Cannot look for user without a username"
            )
        }
        val foundUser = userRepository.findUserByUsername(username)
            ?: throw ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Could not find user with username $username"
            )
        return ResponseEntity.ok(
            foundUser
        )
    }

    @GetMapping("/users/{username}/elo", produces = ["application/json"])
    fun getUserElo(@PathVariable username: String?): ResponseEntity<Int> {
        requireNotNull(username)
        return ResponseEntity.ok(SAMPLE_USER_ELO)
    }

    @PutMapping("/users/{username}", consumes = ["application/json"], produces = ["application/json"])
    fun updateUser(@PathVariable username: String?, @RequestBody user: User?): ResponseEntity<User> {
        if (null == user) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Need user for update, but no user was found in request body"
            )
        }

        val userFromDb = getUserByUsername(username).body!!
        if (user.id == userFromDb.id && user.username == userFromDb.username) userRepository.save(user)
        return ResponseEntity.ok(user)
    }

    @PostMapping("/users", consumes = ["application/json"], produces = ["application/json"])
    fun createUser(@RequestBody user: User?): ResponseEntity<User> {
        if (null == user) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Need user for update, but no user was found in request body"
            )
        }
        return ResponseEntity.ok(userRepository.save(user))
    }
}
