package de.iits.elo.ranking

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.map
import de.iits.elo.testdata.mockuser1
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RankingControllerTest {

    @LocalServerPort
    private var port: Int = -1

    private val objectMapper = jacksonObjectMapper()

    @Test
    fun top10Ranking() {
        val expectedRanking = Ranking(
            rank = 1, elo = 1499, player = mockuser1
        )
        val (_, _, result) = "http://localhost:$port/ranking?top=10".httpGet()
            .header(HttpHeaders.ACCEPT to "application/json")
            .responseString()

        result.map { objectMapper.readValue<List<Ranking>>(it) }
            .get()[0] shouldBe expectedRanking
    }

}
