package de.iits.elocalculatorbackend.player.model.resource;

import java.util.UUID;

public record PlayerUpsertResource(UUID id, String username, String displayName, String email) {

}
