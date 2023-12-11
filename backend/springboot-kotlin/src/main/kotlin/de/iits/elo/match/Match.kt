package de.iits.elo.match

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.*

@Entity
@Table(name = "match")
data class Match(
    @Id
    val id: UUID = UUID.randomUUID(),
    val whitePlayer: UUID,
    val blackPlayer: UUID,
    @Enumerated(EnumType.STRING)
    val outcome: Outcome,
    val playedOn: String,
)