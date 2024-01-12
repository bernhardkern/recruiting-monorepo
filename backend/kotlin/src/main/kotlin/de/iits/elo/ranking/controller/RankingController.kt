package de.iits.elo.ranking.controller

import de.iits.elo.ranking.model.dto.RankingResponseDto
import de.iits.elo.ranking.service.RankingService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class RankingController(
    private val rankingService: RankingService,
) {

    @GetMapping("/rankings")
    fun getRankings(@RequestParam top: Int): ResponseEntity<List<RankingResponseDto>> =
        ResponseEntity.ok(rankingService.getTopPlayers(top))
}
