package de.iits.elo.player.model.entity

import de.iits.elo.player.model.dto.PlayerResponseDto
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "player")
data class Player(

    @Id
    @Column(name = "username")
    val username: String,
    @Column(name = "display_name")
    val displayName: String,
    @Column(name = "email")
    val email: String?,
    @Column(name = "elo")
    val elo: Int = 1000,
)

fun Player.toResponseDto() =
    PlayerResponseDto(
        username = username,
        displayName = displayName,
        email = email,
        elo = elo,
    )
