package de.iits.elo.match

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.*

@Entity
@Table(name = "match")
data class Match(

    @Id
    val id: UUID = UUID.randomUUID(),
    @Column(name = "white_player_user_name")
    val whitePlayerUserName: String,
    @Column(name = "black_player_user_name")
    val blackPlayerUserName: String,
    @Column(name = "outcome")
    @Enumerated(EnumType.STRING)
    val outcome: Outcome,
    @Column(name = "timestamp")
    val timestamp: Long = Instant.now().epochSecond,
)