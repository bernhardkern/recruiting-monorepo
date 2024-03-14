package de.iits.elo.player.controller

import de.iits.elo.player.model.dto.PlayerCreateOrUpdateRequestDto
import de.iits.elo.player.model.dto.PlayerResponseDto
import de.iits.elo.player.service.PlayerService
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
    fun getAllPlayers(): ResponseEntity<List<PlayerResponseDto>> =
        ResponseEntity.ok(playerService.findAll())

    @PutMapping("/players")
    @Suppress("SwallowedException") // exception message is delegated
    fun updatePlayer(@RequestBody player: PlayerCreateOrUpdateRequestDto?): ResponseEntity<PlayerResponseDto> {
        player ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Player required for update, but no player was found in request body")
        val update = try {
            playerService.update(player)
        } catch (exception: IllegalStateException) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, exception.message)
        }
        return ResponseEntity.ok(update)
    }

    @PostMapping("/players")
    fun createNewPlayer(@RequestBody player: PlayerCreateOrUpdateRequestDto?): ResponseEntity<PlayerResponseDto> {
        player ?: throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Player required for creation, but no player was found in request body")
        return ResponseEntity.ok(playerService.create(player))
    }

    @GetMapping("/players/{username}")
    fun getPlayerByUserName(@PathVariable username: String): ResponseEntity<PlayerResponseDto> {
        val requestedUser = playerService.findByUsername(username)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find player with user name $username")
        return ResponseEntity.ok(requestedUser)
    }
}
