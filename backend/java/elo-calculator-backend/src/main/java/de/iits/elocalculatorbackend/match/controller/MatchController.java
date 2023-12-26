package de.iits.elocalculatorbackend.match.controller;

import de.iits.elocalculatorbackend.match.model.resource.MatchCreateResource;
import de.iits.elocalculatorbackend.match.model.resource.MatchResponseResource;
import de.iits.elocalculatorbackend.match.service.MatchService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class MatchController {

    private MatchService matchService;

    @GetMapping(path = "matches")
    public ResponseEntity<List<MatchResponseResource>> getAllMatches() {
        return ResponseEntity.ok(matchService.getAllMatches());
    }

    @PostMapping(path = "matches")
    public ResponseEntity<MatchResponseResource> createMatch(@RequestBody @Valid MatchCreateResource createResource) {
        return ResponseEntity.ok(matchService.createMatch(createResource));
    }


}
