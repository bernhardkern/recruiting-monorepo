package de.iits.elo.user

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
class UserControllerIntegrationTests {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var userRepository: UserRepository

    @Nested
    inner class GetAllUsers {

        @Test
        fun `return all users from database`() {
            val expectedUserAsJson = objectMapper.writeValueAsString(userRepository.findAll())
            val requestResponse = mockMvc.get("/users")
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(expectedUserAsJson) }
            }
        }
    }

    @Nested
    inner class UpdateUser {

        @Test
        fun `do not send user for update`() {
            val requestResponse = mockMvc.put("/users")
            requestResponse.andExpectAll {
                status { isBadRequest() }
                status { reason("User required for update, but no user was found in request body") }
            }
        }

        @Test
        fun `send invalid user for update`() {
            val userUpdate = createUserUpdate("John Doe")
            val userUpdateAsJson = objectMapper.writeValueAsString(userUpdate)
            val requestResponse = mockMvc.put("/users") {
                contentType = MediaType.APPLICATION_JSON
                content = userUpdateAsJson
            }
            requestResponse.andExpectAll {
                status { isInternalServerError() }
                status { reason("No user exists with username ${userUpdate.username}") }
            }
            userRepository.findById(userUpdate.username) shouldBe Optional.empty()
        }

        @Test
        fun `send valid user for update`() {
            val userUpdate = createUserUpdate()
            val userUpdateAsJson = objectMapper.writeValueAsString(userUpdate)
            val requestResponse = mockMvc.put("/users") {
                contentType = MediaType.APPLICATION_JSON
                content = userUpdateAsJson
            }
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(userUpdateAsJson) }
            }
            userRepository.findById(userUpdate.username).get() shouldBe userUpdate
        }

        private fun createUserUpdate(username: String = "Max Mustermann") =
            User(
                username = username,
                displayname = "BestMaxEuWest",
                email = "max.mustermann@iits-consulting.de",
                elo = 69,
            )
    }

    @Nested
    inner class CreateUser {

        @Test
        fun `do not send user for creation`() {
            val requestResponse = mockMvc.post("/users")
            requestResponse.andExpectAll {
                status { isBadRequest() }
                status { reason("User required for creation, but no user was found in request body") }
            }
        }

        @Test
        fun `send valid user for creation`() {
            val user = createUser()
            val userAsJson = objectMapper.writeValueAsString(user)
            val requestResponse = mockMvc.post("/users") {
                contentType = MediaType.APPLICATION_JSON
                content = userAsJson
            }
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(userAsJson) }
            }
            userRepository.findById(user.username).get() shouldBe user
        }

        private fun createUser() =
            User(
                username = "Max Mustermann",
                displayname = "BestMaxEuWest",
                email = "max.mustermann@iits-consulting.de",
                elo = 69,
            )
    }

    @Nested
    inner class GetUserByUsername {

        @Test
        fun `forget to query with username`() {
            val requestResponse = mockMvc.get("/users/")
            requestResponse.andExpectAll {
                status { isNotFound() }
            }
        }

        @Test
        fun `query with not existing username`() {
            val givenUsername = null
            val requestResponse = mockMvc.get("/users/$givenUsername")
            requestResponse.andExpectAll {
                status { isNotFound() }
                status { reason("Could not find user with username $givenUsername") }
            }
        }

        @Test
        fun `send valid username`() {
            val userFromDatabase = userRepository.findAll().first()
            val requestResponse = mockMvc.get("/users/${userFromDatabase.username}")
            val userFromDatabaseAsJson = objectMapper.writeValueAsString(userFromDatabase)
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(userFromDatabaseAsJson) }
            }
        }
    }

    @Nested
    inner class GetUserElo {

        @Test
        fun `forget to query with username`() {
            val requestResponse = mockMvc.get("/users//elo")
            requestResponse.andExpectAll {
                status { isNotFound() }
            }
        }

        @Test
        fun `leave out username in path`() {
            val requestResponse = mockMvc.get("/users/elo")
            requestResponse.andExpectAll {
                status { isNotFound() }
            }
        }

        @Test
        fun `query with not existing username`() {
            val givenUsername = null
            val requestResponse = mockMvc.get("/users/$givenUsername/elo")
            requestResponse.andExpectAll {
                status { isInternalServerError() }
                status { reason("Could not find user with username $givenUsername") }
            }
        }

        @Test
        fun `send valid username`() {
            val userFromDatabase = userRepository.findAll().first()
            val requestResponse = mockMvc.get("/users/${userFromDatabase.username}/elo")
            val userEloFromDatabaseAsJson = objectMapper.writeValueAsString(userFromDatabase.elo)
            requestResponse.andExpectAll {
                status { isOk() }
                content { json(userEloFromDatabaseAsJson) }
            }
        }
    }
}
