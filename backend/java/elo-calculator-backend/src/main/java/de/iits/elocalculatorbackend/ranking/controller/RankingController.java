package de.iits.elocalculatorbackend.ranking.controller;

import de.iits.elocalculatorbackend.ranking.model.dto.RankingResponseDto;
import de.iits.elocalculatorbackend.ranking.service.RankingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class RankingController {

    private RankingService rankingService;

    @GetMapping("/rankings")
    public ResponseEntity<List<RankingResponseDto>> getRankings(@RequestParam int top) {
        return ResponseEntity.ok(rankingService.getTopPlayers(top));
    }

}
