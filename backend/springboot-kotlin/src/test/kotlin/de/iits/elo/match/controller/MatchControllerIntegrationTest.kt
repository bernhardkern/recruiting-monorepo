package de.iits.elo.match.controller

import com.fasterxml.jackson.databind.ObjectMapper
import de.iits.elo.match.model.dto.MatchRequestDto
import de.iits.elo.match.model.dto.MatchResponseDto
import de.iits.elo.match.model.dto.toEntity
import de.iits.elo.match.model.entity.Match
import de.iits.elo.match.model.enumeration.Outcome
import de.iits.elo.match.repository.MatchRepository
import io.kotest.matchers.date.shouldNotBeAfter
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class MatchControllerIntegrationTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var matchRepository: MatchRepository

    @Nested
    inner class GetAllMatches {

        @Test
        fun `return all matches from database`() {
            val expectedMatchAsJson = objectMapper.writeValueAsString(matchRepository.findAll())
            val requestResponse = mockMvc.get("/matches")

            requestResponse.andExpectAll {
                status { isOk() }
                content { json(expectedMatchAsJson) }
            }
        }
    }

    @Nested
    inner class CreateMatch {

        @Test
        fun `do not send match for creation`() {
            val requestResponse = mockMvc.post("/matches")

            requestResponse.andExpectAll {
                status { isBadRequest() }
                status { reason("Match required for creation, but no match was found in request body") }
            }
        }

        @Test
        fun `send valid match for creation`() {
            val newMatchRequest = createNewMatchRequest()
            val newMatchRequestAsJson = objectMapper.writeValueAsString(newMatchRequest)
            val requestResponse = mockMvc.post("/matches") {
                contentType = MediaType.APPLICATION_JSON
                content = newMatchRequestAsJson
            }

            val allMatches = matchRepository.findAll()
            allMatches.sortBy(Match::playedOn)
            allMatches.last().id shouldNotBe null
            allMatches.last().whitePlayerUsername shouldBe newMatchRequest.whitePlayerUsername
            allMatches.last().blackPlayerUsername shouldBe newMatchRequest.blackPlayerUsername
            allMatches.last().outcome shouldBe newMatchRequest.outcome
            allMatches.last().playedOn shouldNotBeAfter newMatchRequest.toEntity().playedOn

            requestResponse.andExpectAll { status { isOk() } }
            val responseBody = objectMapper.readValue(requestResponse.andReturn().response.contentAsString, MatchResponseDto::class.java)
            responseBody.id shouldNotBe null
            responseBody.whitePlayerUsername shouldBe newMatchRequest.whitePlayerUsername
            responseBody.blackPlayerUsername shouldBe newMatchRequest.blackPlayerUsername
            responseBody.outcome shouldBe newMatchRequest.outcome
            responseBody.playedOn shouldNotBeAfter newMatchRequest.toEntity().playedOn
        }

        private fun createNewMatchRequest() =
            MatchRequestDto(
                whitePlayerUsername = "Maxi",
                blackPlayerUsername = "Lisa",
                outcome = Outcome.DRAW,
            )
    }
}
