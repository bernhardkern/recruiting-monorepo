package de.iits.elocalculatorbackend.match.model.resource;

import de.iits.elocalculatorbackend.match.model.entity.Match;
import de.iits.elocalculatorbackend.match.model.enumeration.Outcome;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record MatchCreateResource(
        @NotNull String whitePlayerUserName,
        @NotNull String blackPlayerUserName,
        @NotNull Outcome outcome,
        @NotNull LocalDateTime date
        ) {

    public Match toMatch() {
        var match = new Match();
        match.setBlackPlayerUserName(blackPlayerUserName);
        match.setWhitePlayerUserName(whitePlayerUserName);
        match.setOutcome(outcome);
        match.setDate(date);
        return match;
    }
}
