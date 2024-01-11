package de.iits.elo.ranking.service

import de.iits.elo.player.repository.PlayerRepository
import de.iits.elo.ranking.model.dto.RankingResponseDto
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class RankingService(
    private val playerRepository: PlayerRepository,
) {

    fun getTopPlayers(number: Int) =
        playerRepository.findByOrderByEloDesc(PageRequest.of(0, number))
            .mapIndexed { index, user -> RankingResponseDto(rank = index + 1, player = user) }
}
