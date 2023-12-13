package de.iits.elo.ranking

import com.fasterxml.jackson.databind.ObjectMapper
import de.iits.elo.user.User
import de.iits.elo.user.UserRepository
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RankingControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Nested
    inner class GetRanking {

        @Test
        fun `return top 5 players`() {
            val top5players = userRepository.findAll()
                .sortedBy(User::elo)
                .reversed()
                .take(5)
                .mapIndexed { index, user -> Ranking(index + 1, user) }
            val top5playersAsJson = objectMapper.writeValueAsString(top5players)
            val requestResponse = mockMvc.get("/ranking?top=5")
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(top5playersAsJson) }
            }
        }

        @Test
        fun `return top player`() {
            val top5players = userRepository.findAll()
                .sortedBy(User::elo)
                .reversed()
                .take(1)
                .mapIndexed { index, user -> Ranking(index + 1, user) }
            val top5playersAsJson = objectMapper.writeValueAsString(top5players)
            val requestResponse = mockMvc.get("/ranking?top=1")
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(top5playersAsJson) }
            }
        }
    }
}