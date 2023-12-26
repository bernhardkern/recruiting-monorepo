package de.iits.elocalculatorbackend.player.service;

import de.iits.elocalculatorbackend.player.model.entity.Player;
import de.iits.elocalculatorbackend.player.model.resource.PlayerResponseResource;
import de.iits.elocalculatorbackend.player.model.resource.PlayerUpsertResource;
import de.iits.elocalculatorbackend.player.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PlayerService {

    private PlayerRepository repository;

    public PlayerResponseResource createPlayer(PlayerUpsertResource playerUpsertResource) {
        Player player = new Player();
        update(player, playerUpsertResource);
        return new PlayerResponseResource(repository.save(player));
    }

    public List<PlayerResponseResource> findAll() {
        return repository.findAll()
                .stream()
                .map(PlayerResponseResource::new)
                .toList();
    }

    public Optional<PlayerResponseResource> findByUsername(String username) {
        return repository.findByUsername(username)
                .map(PlayerResponseResource::new);
    }

    @Transactional
    public PlayerResponseResource updatePlayer(PlayerUpsertResource playerUpsertResource) {
        Player playerToUpdate = repository
                .findById(playerUpsertResource.id())
                .orElseThrow(() -> new IllegalStateException(String.format("no playerUpsertResource with id %s found",
                        playerUpsertResource.id())));

        update(playerToUpdate, playerUpsertResource);
        return new PlayerResponseResource(playerToUpdate);
    }

    public boolean existsById(UUID playerId) {
        return repository.existsById(playerId);
    }

    private void update(Player player, PlayerUpsertResource upsertResource) {
        player.setDisplayName(upsertResource.displayName());
        player.setEmail(upsertResource.email());
        player.setUsername(upsertResource.username());
    }

}
