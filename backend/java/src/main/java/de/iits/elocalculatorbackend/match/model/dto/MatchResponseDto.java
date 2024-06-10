package de.iits.elocalculatorbackend.match.model.dto;

import de.iits.elocalculatorbackend.match.model.entity.Match;
import de.iits.elocalculatorbackend.match.model.enumeration.Outcome;

import java.time.LocalDateTime;
import java.util.UUID;

public record MatchResponseDto (
    UUID id,
    String whitePlayerUsername,
    String blackPlayerUsername,
    Outcome outcome,
    LocalDateTime playedOn
) {
    public MatchResponseDto(Match matchEntity) {
        this(matchEntity.getId(),
                matchEntity.getWhitePlayerUsername(),
                matchEntity.getBlackPlayerUsername(),
                matchEntity.getOutcome(),
                matchEntity.getPlayedOn());
    }
}