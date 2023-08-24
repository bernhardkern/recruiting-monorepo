package de.iits.elo.match

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class MatchCreateOrUpdateService(private val matchRepository: MatchRepository) {

    private val log: Logger = LoggerFactory.getLogger(javaClass)

    fun create(match: Match): Match {
        log.info("creating new match ${match.id}")
        return matchRepository.save(match)
    }

    fun udpate(match: Match): Match {
        log.info("updating match ${match.id}")
        return matchRepository.save(match)
    }
}
