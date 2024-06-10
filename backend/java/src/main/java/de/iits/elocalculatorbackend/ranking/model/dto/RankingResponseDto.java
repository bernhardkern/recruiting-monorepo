package de.iits.elocalculatorbackend.ranking.model.dto;

import de.iits.elocalculatorbackend.player.model.dto.PlayerResponseDto;

public record RankingResponseDto(int rank, PlayerResponseDto player) {
}
