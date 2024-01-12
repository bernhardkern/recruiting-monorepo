package de.iits.elo.ranking.model.dto

import de.iits.elo.player.model.entity.Player

data class RankingResponseDto(
    val rank: Int,
    val player: Player
)
