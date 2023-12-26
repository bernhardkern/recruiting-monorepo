package de.iits.elocalculatorbackend.player.controller;

import de.iits.elocalculatorbackend.player.model.resource.PlayerResponseResource;
import de.iits.elocalculatorbackend.player.model.resource.PlayerUpsertResource;
import de.iits.elocalculatorbackend.player.service.PlayerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@AllArgsConstructor
public class PlayerController {

    private PlayerService playerService;

    @GetMapping("/players")
    public ResponseEntity<List<PlayerResponseResource>> getAllPlayers() {
        return ResponseEntity.ok(playerService.findAll());
    }

    @PutMapping("/players")
    public ResponseEntity<PlayerResponseResource> updatePlayer(@RequestBody @Valid PlayerUpsertResource playerUpsertResource) {
        if (!playerService.existsById(playerUpsertResource.id())) {
            return ResponseEntity.notFound().build();
        }
        PlayerResponseResource updatedPlayer = playerService.updatePlayer(playerUpsertResource);
        return ResponseEntity.ok(updatedPlayer);
    }

    @PostMapping("/players")
    public ResponseEntity<PlayerResponseResource> createNewPlayer(@RequestBody @Valid PlayerUpsertResource playerUpsertResource) {
        return ResponseEntity.ok(playerService.createPlayer(playerUpsertResource));
    }

    @GetMapping("/players/{username}")
    public ResponseEntity<PlayerResponseResource> getPlayerByUsername(@PathVariable String username) {
        PlayerResponseResource player = playerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ResponseEntity.ok(player);
    }

    @GetMapping("/players/{username}/elo")
    public ResponseEntity<Integer> getEloByUsername(@PathVariable String username) {
        PlayerResponseResource player = playerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ResponseEntity.ok(player.elo());
    }
}
