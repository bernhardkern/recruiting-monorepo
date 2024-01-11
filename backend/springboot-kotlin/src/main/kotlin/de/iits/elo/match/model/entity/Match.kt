package de.iits.elo.match.model.entity

import de.iits.elo.match.model.dto.MatchResponseDto
import de.iits.elo.match.model.enumeration.Outcome
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "match")
data class Match(

    @Id
    val id: UUID = UUID.randomUUID(),
    @Column(name = "white_player_username")
    val whitePlayerUsername: String,
    @Column(name = "black_player_username")
    val blackPlayerUsername: String,
    @Column(name = "outcome")
    @Enumerated(EnumType.STRING)
    val outcome: Outcome,
    @Column(name = "played_on")
    val playedOn: LocalDateTime = LocalDateTime.now(),
)

fun Match.toResponseDto() =
    MatchResponseDto(
        id = id,
        whitePlayerUsername = whitePlayerUsername,
        blackPlayerUsername = blackPlayerUsername,
        outcome = outcome,
        playedOn = playedOn,
    )
