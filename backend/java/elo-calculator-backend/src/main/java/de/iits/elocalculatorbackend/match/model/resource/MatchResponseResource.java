package de.iits.elocalculatorbackend.match.model.resource;

import de.iits.elocalculatorbackend.match.model.enumeration.Outcome;
import de.iits.elocalculatorbackend.match.model.entity.Match;

import java.time.LocalDateTime;
import java.util.UUID;

public record MatchResponseResource(UUID id, String whitePlayerUserName, String blackPlayerUserName, Outcome outcome, LocalDateTime timestamp) {

    public MatchResponseResource(Match matchEntity) {
        this(matchEntity.getId(),
                matchEntity.getWhitePlayerUserName(),
                matchEntity.getBlackPlayerUserName(),
                matchEntity.getOutcome(),
                matchEntity.getDate());
    }
}

