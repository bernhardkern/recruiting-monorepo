package de.iits.elocalculatorbackend.player.controller;

import de.iits.elocalculatorbackend.player.model.resource.RankingResource;
import de.iits.elocalculatorbackend.player.service.RankingService;
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
    public ResponseEntity<List<RankingResource>> getRankings(@RequestParam int top) {
        return ResponseEntity.ok(rankingService.getTopPlayers(top));
    }

}
