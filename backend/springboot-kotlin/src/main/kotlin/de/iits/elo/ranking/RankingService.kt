package de.iits.elo.ranking

import de.iits.elo.user.UserRepository
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class RankingService(
    private val userRepository: UserRepository,
) {

    fun getTopPlayers(number: Int) =
        userRepository.findByOrderByEloDesc(PageRequest.of(0, number))
            .mapIndexed { index, user -> Ranking(rank = index + 1, player = user) }
}