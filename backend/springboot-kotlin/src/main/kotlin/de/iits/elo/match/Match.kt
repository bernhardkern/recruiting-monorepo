package de.iits.elo.match

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

    val whitePlayerUsername: String,

    val blackPlayerUsername: String,

    @Enumerated(EnumType.STRING)
    val outcome: Outcome,

    val timestamp: Long = Instant.now().epochSecond,
)