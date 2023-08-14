package de.iits.elo.ranking

import de.iits.elo.user.User
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class RankingApi {

    @GetMapping("/ranking")
    fun ranking(@RequestParam top: Int): ResponseEntity<List<Ranking>> {
        return ResponseEntity.ok(
            listOf(
                Ranking(
                    rank = 1, elo = 1499, player = User(
                        username = "Peter",
                        displayName = "Der Peter",
                        email = "peter@elo.com"
                    )
                )
            )
        )
    }
}
