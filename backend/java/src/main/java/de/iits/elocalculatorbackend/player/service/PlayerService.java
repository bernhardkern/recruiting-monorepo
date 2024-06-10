package de.iits.elocalculatorbackend.player.service;

import de.iits.elocalculatorbackend.player.model.dto.PlayerCreateOrUpdateRequestDto;
import de.iits.elocalculatorbackend.player.model.dto.PlayerResponseDto;
import de.iits.elocalculatorbackend.player.model.entity.Player;
import de.iits.elocalculatorbackend.player.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PlayerService {

    private PlayerRepository repository;

    public PlayerResponseDto createPlayer(PlayerCreateOrUpdateRequestDto playerUpsertResource) {
        return new PlayerResponseDto(repository.save(playerUpsertResource.toEntity()));
    }

    public List<PlayerResponseDto> findAll() {
        return repository.findAll()
                .stream()
                .map(PlayerResponseDto::new)
                .toList();
    }

    public Optional<PlayerResponseDto> findByUsername(String username) {
        return repository.findById(username)
                .map(PlayerResponseDto::new);
    }

    @Transactional
    public PlayerResponseDto updatePlayer(PlayerCreateOrUpdateRequestDto playerUpsertResource) {
        Player playerToUpdate = repository
                .findById(playerUpsertResource.username())
                .orElseThrow(() -> new IllegalStateException(String.format("No player exists with user name " + playerUpsertResource.username())));

        update(playerToUpdate, playerUpsertResource);
        return new PlayerResponseDto(repository.save(playerToUpdate));
    }

    private void update(Player player, PlayerCreateOrUpdateRequestDto upsertResource) {
        player.setDisplayName(upsertResource.displayName());
        player.setEmail(upsertResource.email());
        player.setUsername(upsertResource.username());
    }

}
