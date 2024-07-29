package de.iits.elocalculatorbackend.match.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.iits.elocalculatorbackend.match.model.dto.MatchRequestDto;
import de.iits.elocalculatorbackend.match.model.entity.Match;
import de.iits.elocalculatorbackend.match.model.enumeration.Outcome;
import de.iits.elocalculatorbackend.match.repository.MatchRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Comparator;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class MatchControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MatchRepository matchRepository;

    @Nested
    class GetAllMatches {
        @Test
        void returnAllMatchesFromDatabase() throws Exception {
            String expectedMatchAsJson = objectMapper.writeValueAsString(matchRepository.findAll());
            ResultActions requestResponse = mockMvc.perform(get("/matches"));

            requestResponse.andExpectAll(
                    status().isOk(),
                    content().json(expectedMatchAsJson)
            );
        }
    }

    @Nested
    class CreateMatch {
        @Test
        void doNotSendMatchForCreation() throws Exception {
            ResultActions requestResponse = mockMvc.perform(post("/matches"));

            requestResponse.andExpectAll(
                    status().isBadRequest(),
                    status().reason("Match required for creation, but no match was found in request body")
            );
        }

        @Test
        void sendMatchForCreation() throws Exception {
            MatchRequestDto newMatchResult = createNewMatchResult();
            String newMatchResultAsJson = objectMapper.writeValueAsString(newMatchResult);
            ResultActions requestResponse = mockMvc.perform(post("/matches")
                    .contentType("application/json")
                    .content(newMatchResultAsJson));

            List<Match> allMatches = matchRepository.findAll();
            allMatches.sort(Comparator.comparing(Match::getPlayedOn));
            Match lastMatch = allMatches.get(allMatches.size() - 1);
            assertThat(lastMatch.getId()).isNotNull();
            assertThat(lastMatch.getWhitePlayerUsername()).isEqualTo(newMatchResult.whitePlayerUsername());
            assertThat(lastMatch.getBlackPlayerUsername()).isEqualTo(newMatchResult.blackPlayerUsername());
            assertThat(lastMatch.getOutcome()).isEqualTo(newMatchResult.outcome());
            assertThat(newMatchResult.toEntity().getPlayedOn()).isAfterOrEqualTo(lastMatch.getPlayedOn());

            requestResponse.andExpectAll(status().isOk());
            Match responseBody = objectMapper.readValue(requestResponse.andReturn().getResponse().getContentAsString(), Match.class);
            assertThat(responseBody.getId()).isNotNull();
            assertThat(responseBody.getWhitePlayerUsername()).isEqualTo(newMatchResult.whitePlayerUsername());
            assertThat(responseBody.getBlackPlayerUsername()).isEqualTo(newMatchResult.blackPlayerUsername());
            assertThat(responseBody.getOutcome()).isEqualTo(newMatchResult.outcome());
            assertThat(newMatchResult.toEntity().getPlayedOn()).isAfterOrEqualTo(responseBody.getPlayedOn());
        }

        MatchRequestDto createNewMatchResult() {
            String whitePlayerUsername = "Maxi";
            String blackPlayerUsername = "Lisa";
            Outcome outcome = Outcome.DRAW;
            return new MatchRequestDto(whitePlayerUsername, blackPlayerUsername, outcome);
        }
    }
}
