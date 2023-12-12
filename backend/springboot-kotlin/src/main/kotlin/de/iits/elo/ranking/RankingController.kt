package de.iits.elo.ranking

import de.iits.elo.user.User
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class RankingController {

    @GetMapping("/ranking")
    fun ranking(@RequestParam top: Int): ResponseEntity<List<Ranking>> {
        return ResponseEntity.ok(
            List(top) { sequence ->
                Ranking(
                    rank = sequence + 1,
                    elo = 1499,
                    player = User(
                        username = "Peter",
                        displayname = "Der Peter",
                        email = "peter@elo.com"
                    )
                )
            }
        )
    }
}
