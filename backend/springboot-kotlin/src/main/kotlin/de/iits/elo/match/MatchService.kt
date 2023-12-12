package de.iits.elo.match

import org.springframework.stereotype.Service

@Service
class MatchService(
    private val matchRepository: MatchRepository
) {

    fun findAll(): List<Match> =
        matchRepository.findAll()

    fun create(match: Match): Match =
         matchRepository.save(match)
}
