package de.iits.elocalculatorbackend.match.model.dto;

import de.iits.elocalculatorbackend.match.model.entity.Match;
import de.iits.elocalculatorbackend.match.model.enumeration.Outcome;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record MatchRequestDto (
    @NotNull String whitePlayerUsername,
    @NotNull String blackPlayerUsername,
    @NotNull Outcome outcome
) {

    public Match toEntity() {
        var match = new Match();
        match.setBlackPlayerUsername(blackPlayerUsername);
        match.setWhitePlayerUsername(whitePlayerUsername);
        match.setOutcome(outcome);
        match.setPlayedOn(LocalDateTime.now());
        return match;
    }
}
