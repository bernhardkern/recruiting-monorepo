package de.iits.elo.player

import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class PlayerService(
    private val playerRepository: PlayerRepository,
) {

    fun findAll(): List<Player> =
        playerRepository.findAll()

    fun findByUserName(userName: String) =
        playerRepository.findById(userName).getOrNull()

    @Throws(IllegalArgumentException::class)
    fun update(player: Player): Player {
        val databaseObject = playerRepository.findById(player.userName)
        check(databaseObject.isPresent) { "No player exists with user name ${player.userName}" }
        return save(player)
    }

    fun save(player: Player) =
        playerRepository.save(player)

    fun getElo(username: String) =
        findByUserName(username)?.elo ?: throw IllegalStateException("Could not find player with user name $username")
}