package de.iits.elocalculatorbackend.player.model.dto;

import de.iits.elocalculatorbackend.player.model.entity.Player;

public record PlayerCreateOrUpdateRequestDto(
        String username,
        String displayName,
        String email
) {
    public Player toEntity() {
        Player player = new Player();
        player.setUsername(username);
        player.setDisplayName(displayName);
        player.setEmail(email);
        return player;
    }
}
