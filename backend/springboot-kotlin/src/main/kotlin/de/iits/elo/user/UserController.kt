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
class UserController(
    private val userService: UserService,
) {

    @GetMapping("/users")
    fun getAllUsers(): ResponseEntity<List<User>> =
        ResponseEntity.ok(userService.findAll())

    @PutMapping("/users")
    fun updateUser(@RequestBody user: User?): ResponseEntity<User> {
        user ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "User required for update, but no user was found in request body")
        val update = try {
            userService.update(user)
        } catch (exception: IllegalStateException) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, exception.message)
        }
        return ResponseEntity.ok(update)
    }

    @PostMapping("/users")
    fun createUser(@RequestBody user: User?): ResponseEntity<User> {
        user ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "User required for creation, but no user was found in request body")
        return ResponseEntity.ok(userService.save(user))
    }

    @GetMapping("/users/{username}")
    fun getUserByUsername(@PathVariable username: String): ResponseEntity<User> {
        val requestedUser = userService.findByUsername(username)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find user with username $username")
        return ResponseEntity.ok(requestedUser)
    }

    @GetMapping("/users/{username}/elo")
    fun getUserElo(@PathVariable username: String): ResponseEntity<Int> =
        try {
            ResponseEntity.ok(userService.getElo(username))
        } catch (exception: IllegalStateException) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, exception.message)
        }

}
