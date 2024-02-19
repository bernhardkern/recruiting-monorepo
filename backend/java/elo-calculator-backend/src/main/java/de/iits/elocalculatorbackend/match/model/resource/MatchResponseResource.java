package de.iits.elocalculatorbackend.match.model.resource;

import de.iits.elocalculatorbackend.match.model.enumeration.Outcome;
import de.iits.elocalculatorbackend.match.model.entity.Match;

import java.time.LocalDateTime;
import java.util.UUID;

public record MatchResponseResource(UUID id, String whitePlayerUsername, String blackPlayerUsername, Outcome outcome, LocalDateTime timestamp) {

    public MatchResponseResource(Match matchEntity) {
        this(matchEntity.getId(),
                matchEntity.getWhitePlayerUsername(),
                matchEntity.getBlackPlayerUsername(),
                matchEntity.getOutcome(),
                matchEntity.getDate());
    }
}

