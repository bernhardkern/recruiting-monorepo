package de.iits.elo.player.model.dto

import de.iits.elo.player.model.entity.Player

data class PlayerRequestDto(

    val username: String,
    val displayName: String,
    val email: String?,
)

fun PlayerRequestDto.toEntity() =
    Player(
        username = username,
        displayName = displayName,
        email = email,
    )
