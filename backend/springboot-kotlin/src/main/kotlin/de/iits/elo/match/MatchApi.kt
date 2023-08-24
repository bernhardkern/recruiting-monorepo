package de.iits.elo.match

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class MatchApi(
    private val matchCreateOrUpdateService: MatchCreateOrUpdateService,
    private val matchReadingService: MatchReadingService,
) {
    @GetMapping("/matches")
    fun getAllMatches(): ResponseEntity<Iterable<Match>> = ResponseEntity.ok(matchReadingService.findAll())

    @PostMapping("/matches")
    fun createMatch(@RequestBody newMatch: Match): ResponseEntity<Match> = ResponseEntity.ok(matchCreateOrUpdateService.create(newMatch))
}
