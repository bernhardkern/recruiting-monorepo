package de.iits.elo.match

import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface MatchRepository: CrudRepository<Match, UUID>
