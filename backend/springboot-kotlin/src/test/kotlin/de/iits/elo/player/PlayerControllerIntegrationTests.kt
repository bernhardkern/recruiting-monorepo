package de.iits.elo.player

import com.fasterxml.jackson.databind.ObjectMapper
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put
import java.util.*

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class PlayerControllerIntegrationTests {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var playerRepository: PlayerRepository

    @Nested
    inner class GetAllUsers {

        @Test
        fun `return all players from database`() {
            val expectedPlayersAsJson = objectMapper.writeValueAsString(playerRepository.findAll())
            val requestResponse = mockMvc.get("/players")
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(expectedPlayersAsJson) }
            }
        }
    }

    @Nested
    inner class UpdatePlayer {

        @Test
        fun `do not send player for update`() {
            val requestResponse = mockMvc.put("/players")
            requestResponse.andExpectAll {
                status { isBadRequest() }
                status { reason("Player required for update, but no player was found in request body") }
            }
        }

        @Test
        fun `send invalid player for update`() {
            val playerUpdate = createPlayerUpdate("John Doe")
            val playerUpdateAsJson = objectMapper.writeValueAsString(playerUpdate)
            val requestResponse = mockMvc.put("/players") {
                contentType = MediaType.APPLICATION_JSON
                content = playerUpdateAsJson
            }
            requestResponse.andExpectAll {
                status { isNotFound() }
                status { reason("No player exists with user name ${playerUpdate.userName}") }
            }
            playerRepository.findById(playerUpdate.userName) shouldBe Optional.empty()
        }

        @Test
        fun `send valid player for update`() {
            val playerUpdate = createPlayerUpdate()
            val playerUpdateAsJson = objectMapper.writeValueAsString(playerUpdate)
            val requestResponse = mockMvc.put("/players") {
                contentType = MediaType.APPLICATION_JSON
                content = playerUpdateAsJson
            }
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(playerUpdateAsJson) }
            }
            playerRepository.findById(playerUpdate.userName).get() shouldBe playerUpdate
        }

        private fun createPlayerUpdate(username: String = "Max Mustermann") =
            Player(
                userName = username,
                displayName = "BestMaxEuWest",
                email = "max.mustermann@iits-consulting.de",
                elo = 69,
            )
    }

    @Nested
    inner class CreatePlayer {

        @Test
        fun `do not send player for creation`() {
            val requestResponse = mockMvc.post("/players")
            requestResponse.andExpectAll {
                status { isBadRequest() }
                status { reason("Player required for creation, but no player was found in request body") }
            }
        }

        @Test
        fun `send valid player for creation`() {
            val player = createPlayer()
            val playerAsJson = objectMapper.writeValueAsString(player)
            val requestResponse = mockMvc.post("/players") {
                contentType = MediaType.APPLICATION_JSON
                content = playerAsJson
            }
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(playerAsJson) }
            }
            playerRepository.findById(player.userName).get() shouldBe player
        }

        private fun createPlayer() =
            Player(
                userName = "Max Mustermann",
                displayName = "BestMaxEuWest",
                email = "max.mustermann@iits-consulting.de",
                elo = 69,
            )
    }

    @Nested
    inner class GetPlayerByUserName {

        @Test
        fun `forget to query with user name`() {
            val requestResponse = mockMvc.get("/players/")
            requestResponse.andExpectAll {
                status { isNotFound() }
            }
        }

        @Test
        fun `query with not existing user name`() {
            val givenUserName = null
            val requestResponse = mockMvc.get("/players/$givenUserName")
            requestResponse.andExpectAll {
                status { isNotFound() }
                status { reason("Could not find player with user name $givenUserName") }
            }
        }

        @Test
        fun `send valid user name`() {
            val playerFromDatabase = playerRepository.findAll().first()
            val requestResponse = mockMvc.get("/players/${playerFromDatabase.userName}")
            val playersFromDatabaseAsJson = objectMapper.writeValueAsString(playerFromDatabase)
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(playersFromDatabaseAsJson) }
            }
        }
    }

    @Nested
    inner class GetPlayerElo {

        @Test
        fun `forget to query with user name`() {
            val requestResponse = mockMvc.get("/players//elo")
            requestResponse.andExpectAll {
                status { isNotFound() }
            }
        }

        @Test
        fun `leave out user name in path`() {
            val requestResponse = mockMvc.get("/players/elo")
            requestResponse.andExpectAll {
                status { isNotFound() }
            }
        }

        @Test
        fun `query with not existing user name`() {
            val givenUserName = null
            val requestResponse = mockMvc.get("/players/$givenUserName/elo")
            requestResponse.andExpectAll {
                status { isNotFound() }
                status { reason("Could not find player with user name $givenUserName") }
            }
        }

        @Test
        fun `send valid user name`() {
            val playerFromDatabase = playerRepository.findAll().first()
            val requestResponse = mockMvc.get("/players/${playerFromDatabase.userName}/elo")
            val playerEloFromDatabaseAsJson = objectMapper.writeValueAsString(playerFromDatabase.elo)
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(playerEloFromDatabaseAsJson) }
            }
        }
    }
}
