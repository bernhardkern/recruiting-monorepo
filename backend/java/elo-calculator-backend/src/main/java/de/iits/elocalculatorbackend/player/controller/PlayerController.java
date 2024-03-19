package de.iits.elocalculatorbackend.player.controller;

import de.iits.elocalculatorbackend.player.model.dto.PlayerCreateOrUpdateRequestDto;
import de.iits.elocalculatorbackend.player.model.dto.PlayerResponseDto;
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
    public ResponseEntity<List<PlayerResponseDto>> getAllPlayers() {
        return ResponseEntity.ok(playerService.findAll());
    }

    @PutMapping("/players")
    public ResponseEntity<PlayerResponseDto> updatePlayer(@RequestBody(required = false) @Valid PlayerCreateOrUpdateRequestDto playerUpsertResource) {
        if (playerUpsertResource == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Player required for update, but no player was found in request body");
        }
        try {
            return ResponseEntity.ok(playerService.updatePlayer(playerUpsertResource));
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/players")
    public ResponseEntity<PlayerResponseDto> createNewPlayer(@RequestBody(required = false) @Valid PlayerCreateOrUpdateRequestDto playerUpsertResource) {
        if (playerUpsertResource == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Player required for creation, but no player was found in request body");
        }
        return ResponseEntity.ok(playerService.createPlayer(playerUpsertResource));
    }

    @GetMapping("/players/{username}")
    public ResponseEntity<PlayerResponseDto> getPlayerByUsername(@PathVariable String username) {
        PlayerResponseDto player = playerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find player with user name " + username));

        return ResponseEntity.ok(player);
    }
}
