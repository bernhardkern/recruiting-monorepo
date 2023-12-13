package de.iits.elo.user

import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, String> {

    fun findByOrderByEloDesc(pageable: Pageable): List<User>
}
