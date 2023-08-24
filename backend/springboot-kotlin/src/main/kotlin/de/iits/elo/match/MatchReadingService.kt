package de.iits.elo.match

import org.springframework.stereotype.Service

@Service
class MatchReadingService(private val matchRepository: MatchRepository) {

    fun findAll() = matchRepository.findAll()
}
