package de.iits.elocalculatorbackend.player.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.iits.elocalculatorbackend.player.model.dto.PlayerCreateOrUpdateRequestDto;
import de.iits.elocalculatorbackend.player.model.dto.PlayerResponseDto;
import de.iits.elocalculatorbackend.player.model.entity.Player;
import de.iits.elocalculatorbackend.player.repository.PlayerRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class PlayerControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    PlayerRepository playerRepository;

    @Nested
    class GetAllPlayers {
        @Test
        void returnAllPlayersFromDatabase() throws Exception {
            List<PlayerResponseDto> expectedPlayers = playerRepository.findAll().stream().map(PlayerResponseDto::new).toList();
            String expectedJson = objectMapper.writeValueAsString(expectedPlayers);
            ResultActions requestResponse = mockMvc.perform(get("/players"));

            requestResponse.andExpectAll(
                    status().isOk(),
                    content().json(expectedJson)
            );
        }
    }

    @Nested
    class UpdatePlayer {
        @Test
        void doNotSendPlayerForUpdate() throws Exception {
            ResultActions requestResponse = mockMvc.perform(put("/players"));

            requestResponse.andExpectAll(
                    status().isBadRequest(),
                    status().reason("Player required for update, but no player was found in request body"));
        }

        @Test
        void sendInvalidPlayerForUpdate() throws Exception {
            PlayerCreateOrUpdateRequestDto playerUpdate = createPlayerUpdateRequest("John Doe");
            String playerUpdateJson = objectMapper.writeValueAsString(playerUpdate);
            ResultActions requestResponse = mockMvc.perform(put("/players")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(playerUpdateJson)
            );

            assertThat(playerRepository.findById(playerUpdate.username())).isEqualTo(Optional.empty());

            requestResponse.andExpectAll(
                    status().isNotFound(),
                    status().reason("No player exists with user name " + playerUpdate.username())
            );
        }

        @Test
        void sendValidPlayerForUpdate() throws Exception {
            PlayerCreateOrUpdateRequestDto playerUpdate = createPlayerUpdateRequest("Max Mustermann");
            String playerUpdateJson = objectMapper.writeValueAsString(playerUpdate);
            ResultActions requestResponse = mockMvc.perform(put("/players")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(playerUpdateJson)
            );

            int playerElo = playerRepository.findById(playerUpdate.username()).get().getElo();
            Player playerUpdateEntity = playerUpdate.toEntity();
            playerUpdateEntity.setElo(playerElo);
            Player entityInDb = playerRepository.findById(playerUpdate.username()).get();
            assertThat(playerUpdateEntity.getDisplayName()).isEqualTo(entityInDb.getDisplayName());
            assertThat(playerUpdateEntity.getUsername()).isEqualTo(entityInDb.getUsername());
            assertThat(playerUpdateEntity.getEmail()).isEqualTo(entityInDb.getEmail());

            String playerUpdateResponseJson = objectMapper.writeValueAsString(new PlayerResponseDto(playerUpdateEntity));
            requestResponse.andExpectAll(
                    status().isOk(),
                    content().json(playerUpdateResponseJson)
            );
        }

        PlayerCreateOrUpdateRequestDto createPlayerUpdateRequest(String username) {
            return new PlayerCreateOrUpdateRequestDto(username, "BestMaxEuWest", "max.mustermann@iits-consulting.de");
        }
    }

    @Nested
    class CreatePlayer {
        @Test
        void toNotSendPlayerForCreation() throws Exception {
            ResultActions requestResponse = mockMvc.perform(post("/players"));

            requestResponse.andExpectAll(
                    status().isBadRequest(),
                    status().reason("Player required for creation, but no player was found in request body")
            );
        }

        @Test
        void sendValidPlayerForCreation() throws Exception {
            PlayerCreateOrUpdateRequestDto playerCreate = createPlayerCreateRequest();
            String playerCreateJson = objectMapper.writeValueAsString(playerCreate);
            ResultActions requestResponse = mockMvc.perform(post("/players")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(playerCreateJson)
            );

            Player playerEntity = playerCreate.toEntity();
            Player entityInDb = playerRepository.findById(playerCreate.username()).get();
            assertThat(playerEntity.getDisplayName()).isEqualTo(entityInDb.getDisplayName());
            assertThat(playerEntity.getUsername()).isEqualTo(entityInDb.getUsername());
            assertThat(playerEntity.getEmail()).isEqualTo(entityInDb.getEmail());

            String playerCreateResponseJson = objectMapper.writeValueAsString(new PlayerResponseDto(playerEntity));
            requestResponse.andExpectAll(
                    status().isOk(),
                    content().json(playerCreateResponseJson)
            );
        }

        PlayerCreateOrUpdateRequestDto createPlayerCreateRequest() {
            return new PlayerCreateOrUpdateRequestDto("Max Mustermann", "BestMaxEuWest", "max.mustermann@iits-consulting.de");
        }
    }

    @Nested
    class GetPlayerByUsername {
        @Test
        void forgetToQueryWithUsername () throws Exception {
            ResultActions requestResponse = mockMvc.perform(get("/players/"));

            requestResponse.andExpectAll(
                    status().isNotFound()
            );
        }

        @Test
        void queryWithNotExistingUsername () throws Exception {
            ResultActions requestResponse = mockMvc.perform(get("/players/noone"));

            requestResponse.andExpectAll(
                    status().isNotFound(),
                    status().reason("Could not find player with user name noone")
            );
        }

        @Test
        void sendValidUsername() throws Exception {
            Player player = playerRepository.findAll().get(0);
            ResultActions requestResponse = mockMvc.perform(get("/players/" + player.getUsername()));

            String expectedJson = objectMapper.writeValueAsString(new PlayerResponseDto(player));
            requestResponse.andExpectAll(
                    status().isOk(),
                    content().json(expectedJson)
            );
        }
    }
}
