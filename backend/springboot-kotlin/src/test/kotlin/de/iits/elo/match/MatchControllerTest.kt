package de.iits.elo.match

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.result.map
import de.iits.elo.testdata.mockuser1
import de.iits.elo.testdata.mockuser2
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders
import java.util.*


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MatchControllerTest {
    @LocalServerPort
    private var port: Int = -1

    val objectMapper = jacksonObjectMapper()

    @Test
    fun getAllMatches() {
        val blackUser = mockuser1
        val whiteUser = mockuser2
        val expectedMatch = Match(
                id = UUID.fromString("13632e28-e531-41a4-b395-6a06e4f8b39c"),
                blackPlayer = blackUser.id,
                whitePlayer = whiteUser.id,
                outcome = Outcome.DRAW,
                playedOn = "2023-07-21T17:56:50Z"
        )
        val (_, _, result) = "http://localhost:$port/matches".httpGet()
                .header(HttpHeaders.ACCEPT to "application/json")
                .responseString()
        val foundMatches = result
                .map { objectMapper.readValue<List<Match>>(it) }
                .get()
        foundMatches[0] shouldBe expectedMatch
    }

    @Test
    fun postMatch() {
        val expectedMatch = Match(
                blackPlayer = UUID.fromString("11111111-58cc-4372-a567-0e02b2c3d479"),
                whitePlayer = UUID.fromString("22222222-58cc-4372-a567-0e02b2c3d479"),
                outcome = Outcome.DRAW,
                playedOn = "2023-07-21T17:56:50Z"
        )
        val (_, _, result) = "http://localhost:$port/matches".httpPost()
                .header(HttpHeaders.ACCEPT to "application/json")
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
                .body(objectMapper.writeValueAsString(expectedMatch))
                .responseString()

        result.map { objectMapper.readValue<Match>(it) }
                .get() shouldBe expectedMatch

    }

}
