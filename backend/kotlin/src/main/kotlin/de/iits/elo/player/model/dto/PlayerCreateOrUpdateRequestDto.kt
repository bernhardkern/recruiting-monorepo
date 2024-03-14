package de.iits.elo.player.model.dto

import de.iits.elo.player.model.entity.Player

data class PlayerCreateOrUpdateRequestDto(

    val username: String,
    val displayName: String,
    val email: String?,
)

fun PlayerCreateOrUpdateRequestDto.toEntity() =
    Player(
        username = username,
        displayName = displayName,
        email = email,
    )
