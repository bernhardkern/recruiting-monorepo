package de.iits.elocalculatorbackend.match.controller;

import de.iits.elocalculatorbackend.match.model.dto.MatchRequestDto;
import de.iits.elocalculatorbackend.match.model.dto.MatchResponseDto;
import de.iits.elocalculatorbackend.match.service.MatchService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@AllArgsConstructor
public class MatchController {

    private MatchService matchService;

    @GetMapping(path = "matches")
    public ResponseEntity<List<MatchResponseDto>> getAllMatches() {
        return ResponseEntity.ok(matchService.getAllMatches());
    }

    @PostMapping(path = "matches")
    public ResponseEntity<MatchResponseDto> createMatch(@RequestBody(required = false) @Valid MatchRequestDto createMatch) {
        if (createMatch == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Match required for creation, but no match was found in request body");
        }
        return ResponseEntity.ok(matchService.createMatch(createMatch));
    }


}
