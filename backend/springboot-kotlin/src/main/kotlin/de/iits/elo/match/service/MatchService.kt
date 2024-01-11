package de.iits.elo.match.service

import de.iits.elo.match.model.dto.MatchRequestDto
import de.iits.elo.match.model.dto.MatchResponseDto
import de.iits.elo.match.model.dto.toEntity
import de.iits.elo.match.model.entity.Match
import de.iits.elo.match.model.entity.toResponseDto
import de.iits.elo.match.repository.MatchRepository
import org.springframework.stereotype.Service

@Service
class MatchService(
    private val matchRepository: MatchRepository,
) {

    fun findAll(): List<MatchResponseDto> =
        matchRepository.findAll().map(Match::toResponseDto)

    fun create(match: MatchRequestDto): MatchResponseDto =
        matchRepository.save(match.toEntity()).toResponseDto()
}
