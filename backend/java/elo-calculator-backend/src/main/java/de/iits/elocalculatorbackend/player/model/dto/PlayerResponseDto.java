package de.iits.elocalculatorbackend.player.model.dto;

import de.iits.elocalculatorbackend.player.model.entity.Player;

public record PlayerResponseDto(
        String username,
        String displayName,
        String email,
        int elo
) {
    public PlayerResponseDto(Player player) {
        this(
            player.getUsername(),
            player.getDisplayName(),
            player.getEmail(),
            player.getElo()
        );
    }
}
