package de.iits.elo.match.model.dto

import de.iits.elo.match.model.enumeration.Outcome
import java.time.LocalDateTime
import java.util.*

data class MatchResponseDto(

    val id: UUID,
    val whitePlayerUsername: String,
    val blackPlayerUsername: String,
    val outcome: Outcome,
    val playedOn: LocalDateTime,
)
