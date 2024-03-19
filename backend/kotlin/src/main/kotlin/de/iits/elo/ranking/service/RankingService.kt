package de.iits.elo.ranking.service

import de.iits.elo.player.model.entity.toResponseDto
import de.iits.elo.player.persistence.PlayerRepository
import de.iits.elo.ranking.model.dto.RankingResponseDto
import org.springframework.data.domain.Limit
import org.springframework.stereotype.Service

@Service
class RankingService(
    private val playerRepository: PlayerRepository,
) {

    fun getTopPlayers(number: Int) =
        playerRepository.findByOrderByEloDesc(Limit.of(number))
            .mapIndexed { index, user -> RankingResponseDto(rank = index + 1, player = user.toResponseDto()) }
}
