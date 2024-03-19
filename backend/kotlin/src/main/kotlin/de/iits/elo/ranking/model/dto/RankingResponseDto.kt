package de.iits.elo.ranking.model.dto

import de.iits.elo.player.model.dto.PlayerResponseDto

data class RankingResponseDto(
    val rank: Int,
    val player: PlayerResponseDto
)
