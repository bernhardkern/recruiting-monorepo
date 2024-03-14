package de.iits.elo.player.service

import de.iits.elo.player.model.dto.PlayerCreateOrUpdateRequestDto
import de.iits.elo.player.model.dto.PlayerResponseDto
import de.iits.elo.player.model.dto.toEntity
import de.iits.elo.player.model.entity.Player
import de.iits.elo.player.model.entity.toResponseDto
import de.iits.elo.player.persistence.PlayerRepository
import org.springframework.data.repository.findByIdOrNull
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

    fun update(playerUpdateRequest: PlayerCreateOrUpdateRequestDto): PlayerResponseDto {
        val player = playerRepository.findByIdOrNull(playerUpdateRequest.username)
        checkNotNull(player) { "No player exists with user name ${playerUpdateRequest.username}" }
        val updateEntity = playerUpdateRequest.toEntity().copy(elo = player.elo)
        return playerRepository.save(updateEntity).toResponseDto()
    }

    fun create(playerCreateRequest: PlayerCreateOrUpdateRequestDto) =
        playerRepository.save(playerCreateRequest.toEntity()).toResponseDto()
}
