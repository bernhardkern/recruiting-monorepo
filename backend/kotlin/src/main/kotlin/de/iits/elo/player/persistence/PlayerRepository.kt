package de.iits.elo.player.persistence

import de.iits.elo.player.model.entity.Player
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PlayerRepository : JpaRepository<Player, String> {

    fun findByOrderByEloDesc(pageable: Pageable): List<Player>
}
