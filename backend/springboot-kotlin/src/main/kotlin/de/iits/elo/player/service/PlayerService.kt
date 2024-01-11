package de.iits.elo.player.service

import de.iits.elo.player.model.dto.PlayerRequestDto
import de.iits.elo.player.model.dto.PlayerResponseDto
import de.iits.elo.player.model.dto.toEntity
import de.iits.elo.player.model.entity.Player
import de.iits.elo.player.model.entity.toResponseDto
import de.iits.elo.player.repository.PlayerRepository
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class PlayerService(
    private val playerRepository: PlayerRepository,
) {

    fun findAll(): List<PlayerResponseDto> =
        playerRepository.findAll().map(Player::toResponseDto)

    fun findByUsername(username: String) =
        playerRepository.findById(username).getOrNull()?.toResponseDto()

    @Throws(IllegalArgumentException::class)
    fun update(player: PlayerRequestDto): PlayerResponseDto {
        val databaseObject = playerRepository.findById(player.username)
        check(databaseObject.isPresent) { "No player exists with user name ${player.username}" }
        val updateEntity = player.toEntity().copy(elo = databaseObject.get().elo)
        return playerRepository.save(updateEntity).toResponseDto()
    }

    fun create(player: PlayerRequestDto) =
        playerRepository.save(player.toEntity()).toResponseDto()
}
