package de.iits.elo.player.controller

import com.fasterxml.jackson.databind.ObjectMapper
import de.iits.elo.player.model.dto.PlayerCreateOrUpdateRequestDto
import de.iits.elo.player.model.dto.toEntity
import de.iits.elo.player.model.entity.Player
import de.iits.elo.player.model.entity.toResponseDto
import de.iits.elo.player.persistence.PlayerRepository
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
import kotlin.jvm.optionals.getOrNull

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class PlayerControllerIntegrationTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var playerRepository: PlayerRepository

    @Nested
    inner class GetAllPlayers {

        @Test
        fun `return all players from database`() {
            val expectedPlayers = playerRepository.findAll().map(Player::toResponseDto)
            val expectedPlayersAsJson = objectMapper.writeValueAsString(expectedPlayers)
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
            val playerUpdate = createPlayerUpdateRequest("John Doe")
            val playerUpdateAsJson = objectMapper.writeValueAsString(playerUpdate)
            val requestResponse = mockMvc.put("/players") {
                contentType = MediaType.APPLICATION_JSON
                content = playerUpdateAsJson
            }

            playerRepository.findById(playerUpdate.username) shouldBe Optional.empty()

            requestResponse.andExpectAll {
                status { isNotFound() }
                status { reason("No player exists with user name ${playerUpdate.username}") }
            }
        }

        @Test
        fun `send valid player for update`() {
            val playerUpdateRequest = createPlayerUpdateRequest()
            val playerUpdateRequestAsJson = objectMapper.writeValueAsString(playerUpdateRequest)
            val requestResponse = mockMvc.put("/players") {
                contentType = MediaType.APPLICATION_JSON
                content = playerUpdateRequestAsJson
            }

            val playerElo = playerRepository.findById(playerUpdateRequest.username).get().elo
            val playerUpdateEntity = playerUpdateRequest.toEntity().copy(elo = playerElo)
            playerRepository.findById(playerUpdateRequest.username).get() shouldBe playerUpdateEntity

            val playerUpdateResponseAsJson = objectMapper.writeValueAsString(playerUpdateEntity.toResponseDto())
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(playerUpdateResponseAsJson) }
            }
        }

        private fun createPlayerUpdateRequest(username: String = "Max Mustermann") =
            PlayerCreateOrUpdateRequestDto(
                username = username,
                displayName = "BestMaxEuWest",
                email = "max.mustermann@iits-consulting.de",
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
            val playerRequest = createPlayerRequest()
            val playerRequestAsJson = objectMapper.writeValueAsString(playerRequest)
            val requestResponse = mockMvc.post("/players") {
                contentType = MediaType.APPLICATION_JSON
                content = playerRequestAsJson
            }

            val playerEntity = playerRequest.toEntity()
            playerRepository.findById(playerRequest.username).get() shouldBe playerEntity

            val playerResponseAsJson = objectMapper.writeValueAsString(playerEntity.toResponseDto())
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(playerResponseAsJson) }
            }
        }

        private fun createPlayerRequest() =
            PlayerCreateOrUpdateRequestDto(
                username = "Max Mustermann",
                displayName = "BestMaxEuWest",
                email = "max.mustermann@iits-consulting.de",
            )
    }

    @Nested
    inner class GetPlayerByUsername {

        @Test
        fun `forget to query with username`() {
            val requestResponse = mockMvc.get("/players/")

            requestResponse.andExpectAll {
                status { isNotFound() }
            }
        }

        @Test
        fun `query with not given username`() {
            val givenUsername = null
            val requestResponse = mockMvc.get("/players/$givenUsername")

            requestResponse.andExpectAll {
                status { isNotFound() }
                status { reason("Could not find player with user name $givenUsername") }
            }
        }

        @Test
        fun `query with not existing username`() {
            val givenUsername = "null"
            val requestResponse = mockMvc.get("/players/$givenUsername")

            playerRepository.findById(givenUsername).getOrNull() shouldBe null

            requestResponse.andExpectAll {
                status { isNotFound() }
                status { reason("Could not find player with user name $givenUsername") }
            }
        }

        @Test
        fun `send valid username`() {
            val playerFromDatabase = playerRepository.findAll().first().toResponseDto()
            val requestResponse = mockMvc.get("/players/${playerFromDatabase.username}")

            val playersFromDatabaseAsJson = objectMapper.writeValueAsString(playerFromDatabase)
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(playersFromDatabaseAsJson) }
            }
        }
    }
}
