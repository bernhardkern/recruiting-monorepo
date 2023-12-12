package de.iits.elo.match

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ObjectNode
import io.kotest.matchers.longs.shouldBeGreaterThanOrEqual
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
class MatchControllerTest {

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
            val newMatch = createNewMatch()
            val newMatchAsJson = getJsonRequestContent(newMatch)
            val requestResponse = mockMvc.post("/matches") {
                contentType = MediaType.APPLICATION_JSON
                content = newMatchAsJson
            }
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(newMatchAsJson) }
            }
            val allMatches = matchRepository.findAll()
            allMatches.sortBy(Match::timestamp)
            allMatches.last().id shouldNotBe null
            allMatches.last().timestamp shouldBeGreaterThanOrEqual (newMatch.timestamp)
        }

        private fun createNewMatch() =
            Match(
                whitePlayerUsername = "Maxi",
                blackPlayerUsername = "Lisa",
                outcome = Outcome.DRAW,
            )

        private fun getJsonRequestContent(newMatch: Match): String {
            val newMatchAsJson = objectMapper.writeValueAsString(newMatch)
            val objectNode = objectMapper.readTree(newMatchAsJson) as ObjectNode
            objectNode.remove("id")
            objectNode.remove("timestamp")
            return objectMapper.writeValueAsString(objectNode)
        }
    }

}
