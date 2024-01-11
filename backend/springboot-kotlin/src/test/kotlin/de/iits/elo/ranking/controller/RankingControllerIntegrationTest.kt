package de.iits.elo.ranking.controller

import com.fasterxml.jackson.databind.ObjectMapper
import de.iits.elo.player.model.entity.Player
import de.iits.elo.player.repository.PlayerRepository
import de.iits.elo.ranking.model.dto.RankingResponseDto
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RankingControllerIntegrationTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var playerRepository: PlayerRepository

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Nested
    inner class GetRankings {

        @Test
        fun `return top 5 players`() {
            val top5players = playerRepository.findAll()
                .sortedBy(Player::elo)
                .reversed()
                .take(5)
                .mapIndexed { index, user -> RankingResponseDto(index + 1, user) }
            val top5playersAsJson = objectMapper.writeValueAsString(top5players)
            val requestResponse = mockMvc.get("/rankings?top=5")

            requestResponse.andExpectAll {
                status { isOk() }
                content { json(top5playersAsJson) }
            }
        }

        @Test
        fun `return top player`() {
            val top5players = playerRepository.findAll()
                .sortedBy(Player::elo)
                .reversed()
                .take(1)
                .mapIndexed { index, user -> RankingResponseDto(index + 1, user) }
            val top5playersAsJson = objectMapper.writeValueAsString(top5players)
            val requestResponse = mockMvc.get("/rankings?top=1")

            requestResponse.andExpectAll {
                status { isOk() }
                content { json(top5playersAsJson) }
            }
        }

        @Test
        fun `dont provide a number of players`() {
            val requestResponse = mockMvc.get("/rankings")

            requestResponse.andExpectAll {
                status { isBadRequest() }
            }
        }
    }
}