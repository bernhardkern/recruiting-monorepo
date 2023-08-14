package de.iits.elo.match

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class MatchApi(private val matchRepository: MatchRepository) {
    @GetMapping("/matches")
    fun getAllMatches(): ResponseEntity<Iterable<Match>> {
        return ResponseEntity.ok(
                matchRepository.findAll()
        )
    }

    @PostMapping("/matches")
    fun postMatch(@RequestBody newMatch: Match): ResponseEntity<Match> {
        return ResponseEntity.ok(matchRepository.save(newMatch))
    }
}
