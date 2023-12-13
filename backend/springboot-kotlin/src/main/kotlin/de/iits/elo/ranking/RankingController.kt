package de.iits.elo.ranking

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class RankingController(
    private val rankingService: RankingService,
) {

    @GetMapping("/rankings")
    fun getRankings(@RequestParam top: Int): ResponseEntity<List<Ranking>> =
        ResponseEntity.ok(rankingService.getTopPlayers(top))
}
