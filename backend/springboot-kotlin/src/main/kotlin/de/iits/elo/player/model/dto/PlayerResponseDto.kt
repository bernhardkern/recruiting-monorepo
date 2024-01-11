package de.iits.elo.player.model.dto

data class PlayerResponseDto(

    val username: String,
    val displayName: String,
    val email: String?,
    val elo: Int,
)
