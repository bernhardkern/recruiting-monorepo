package de.iits.elocalculatorbackend.ranking.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.iits.elocalculatorbackend.player.model.dto.PlayerResponseDto;
import de.iits.elocalculatorbackend.player.model.entity.Player;
import de.iits.elocalculatorbackend.player.repository.PlayerRepository;
import de.iits.elocalculatorbackend.ranking.model.dto.RankingResponseDto;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class RankingControllerIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    PlayerRepository playerRepository;

    @Nested
    class GetRanking {
        @Test
        void returnTop5Players() throws Exception {
            List<Player> top5Players = playerRepository.findAll()
                    .stream().sorted(Comparator.comparing(Player::getElo).reversed())
                    .limit(5)
                    .toList();
            List<RankingResponseDto> top5PlayersDto = IntStream.range(0, top5Players.size())
                    .mapToObj(index -> new RankingResponseDto(index + 1, new PlayerResponseDto(top5Players.get(index))))
                    .toList();
            String top5PlayersJson = objectMapper.writeValueAsString(top5PlayersDto);

            ResultActions requestResponse = mockMvc.perform(get("/rankings?top=5"));

            requestResponse.andExpectAll(
                    status().isOk(),
                    content().json(top5PlayersJson)
            );
        }

        @Test
        void returnTopPlayer() throws Exception {
            List<Player> topPlayer = playerRepository.findAll()
                    .stream().sorted(Comparator.comparing(Player::getElo).reversed())
                    .limit(1)
                    .toList();
            List<RankingResponseDto> topPlayerDto = IntStream.range(0, topPlayer.size())
                    .mapToObj(index -> new RankingResponseDto(index + 1, new PlayerResponseDto(topPlayer.get(index))))
                    .toList();
            String topPlayerJson = objectMapper.writeValueAsString(topPlayerDto);

            ResultActions requestResponse = mockMvc.perform(get("/rankings?top=1"));

            requestResponse.andExpectAll(
                    status().isOk(),
                    content().json(topPlayerJson)
            );
        }

        @Test
        void dontProvideANumberOfPlayers() throws Exception {
            ResultActions requestResponse = mockMvc.perform(get("/rankings"));

            requestResponse.andExpect(status().isBadRequest());
        }
    }
}
