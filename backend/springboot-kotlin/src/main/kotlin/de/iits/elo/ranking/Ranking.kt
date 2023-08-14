package de.iits.elo.ranking

import de.iits.elo.user.User

data class Ranking(
    val rank: Int,
    val elo: Int,
    val player: User
)
