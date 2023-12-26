package de.iits.elocalculatorbackend.player.model.resource;

import de.iits.elocalculatorbackend.player.model.entity.Player;

import java.util.UUID;

public record PlayerResponseResource(UUID id, String username, String displayName, String email, int elo) {

    public PlayerResponseResource(Player entity) {
        this(entity.getId(), entity.getUsername(), entity.getDisplayName(), entity.getEmail(), entity.getElo());
    }
}
