package de.iits.elo.player

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
class PlayerController(
    private val playerService: PlayerService,
) {

    @GetMapping("/players")
    fun getAllPlayers(): ResponseEntity<List<Player>> =
        ResponseEntity.ok(playerService.findAll())

    @PutMapping("/players")
    fun updatePlayer(@RequestBody player: Player?): ResponseEntity<Player> {
        player ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Player required for update, but no player was found in request body")
        val update = try {
            playerService.update(player)
        } catch (exception: IllegalStateException) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, exception.message)
        }
        return ResponseEntity.ok(update)
    }

    @PostMapping("/players")
    fun createNewPlayer(@RequestBody player: Player?): ResponseEntity<Player> {
        player ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Player required for creation, but no player was found in request body")
        return ResponseEntity.ok(playerService.save(player))
    }

    @GetMapping("/players/{userName}")
    fun getPlayerByUserName(@PathVariable userName: String): ResponseEntity<Player> {
        val requestedUser = playerService.findByUserName(userName)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find player with user name $userName")
        return ResponseEntity.ok(requestedUser)
    }

    @GetMapping("/players/{userName}/elo")
    fun getPlayerElo(@PathVariable userName: String): ResponseEntity<Int> =
        try {
            ResponseEntity.ok(playerService.getElo(userName))
        } catch (exception: IllegalStateException) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, exception.message)
        }
}
