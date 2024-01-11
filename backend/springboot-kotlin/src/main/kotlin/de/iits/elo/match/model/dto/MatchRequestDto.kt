package de.iits.elo.match.model.dto

import de.iits.elo.match.model.entity.Match
import de.iits.elo.match.model.enumeration.Outcome

data class MatchRequestDto(

    val whitePlayerUsername: String,
    val blackPlayerUsername: String,
    val outcome: Outcome,
)

fun MatchRequestDto.toEntity() =
    Match(
        whitePlayerUsername = whitePlayerUsername,
        blackPlayerUsername = blackPlayerUsername,
        outcome = outcome,
    )
