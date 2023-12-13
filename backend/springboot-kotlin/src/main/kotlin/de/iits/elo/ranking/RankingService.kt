package de.iits.elo.ranking

import de.iits.elo.player.PlayerRepository
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class RankingService(
    private val playerRepository: PlayerRepository,
) {

    fun getTopPlayers(number: Int) =
        playerRepository.findByOrderByEloDesc(PageRequest.of(0, number))
            .mapIndexed { index, user -> Ranking(rank = index + 1, player = user) }
}