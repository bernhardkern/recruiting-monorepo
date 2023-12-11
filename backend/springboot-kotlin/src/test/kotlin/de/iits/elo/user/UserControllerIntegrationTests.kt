package de.iits.elo.user

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.core.extensions.jsonBody
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.fuel.httpPut
import com.github.kittinunf.result.map
import de.iits.elo.testdata.mockuser2
import io.kotest.matchers.equality.shouldBeEqualToComparingFields
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTests {
    @LocalServerPort
    private var port: Int = -1

    val objectMapper = jacksonObjectMapper()

    @Test
    fun getAllUsers() {
        val (_, _, result) = "http://localhost:$port/users".httpGet()
            .header(HttpHeaders.ACCEPT to "application/json")
            .responseString()
        val userDisplayNames = result
            .map { objectMapper.readValue<List<User>>(it) }
            .get()
            .map(User::displayName)
        userDisplayNames shouldBe listOf("Peter", "Paul", "Marry")
    }

    @Test
    fun createUser() {
        val newUser = User(displayName = "I am new", email = "new@iits-consulting.de", username = "i_am_new")
        val (_, _, result) = "http://localhost:$port/users".httpPost()
            .header(HttpHeaders.CONTENT_TYPE to "application/json")
            .jsonBody(objectMapper.writeValueAsString(newUser))
            .responseString()

        val createdUser: User = objectMapper.readValue(result.get())
        createdUser shouldBeEqualToComparingFields newUser.copy(id = createdUser.id)

        val (_, _, resultGet) = "http://localhost:$port/users/${createdUser.username}".httpGet()
            .header(HttpHeaders.ACCEPT to "application/json")
            .responseString()

        val reFetchedUser: User = objectMapper.readValue(resultGet.get())
        reFetchedUser shouldBeEqualToComparingFields newUser.copy(id = createdUser.id)

    }

    @Test
    fun getUserByUsername() {
        val expectedUser = mockuser2

        val (_, _, result) = "http://localhost:$port/users/${expectedUser.username}".httpGet()
            .header(HttpHeaders.ACCEPT to "application/json")
            .responseString()

        val foundUser: User = objectMapper.readValue(result.get())
        foundUser shouldBe expectedUser
    }

    @Test
    fun updateUser() {
        val expectedUser = mockuser2.copy(displayName = "Changed display name")

        val (_, _, resultPut) = "http://localhost:$port/users/${expectedUser.username}".httpPut()
            .header(HttpHeaders.ACCEPT to "application/json")
            .header(HttpHeaders.CONTENT_TYPE to "application/json")
            .body(objectMapper.writeValueAsString(expectedUser))
            .responseString()

        val updatedUser: User = objectMapper.readValue(resultPut.get())
        updatedUser shouldBeEqualToComparingFields expectedUser

        val (_, _, resultGet) = "http://localhost:$port/users/${expectedUser.username}".httpGet()
            .header(HttpHeaders.ACCEPT to "application/json")
            .responseString()
        val reFetchedUser: User = objectMapper.readValue(resultGet.get())
        reFetchedUser shouldBeEqualToComparingFields expectedUser

        // revert db changes
        "http://localhost:$port/users/${expectedUser.username}".httpPut()
            .header(HttpHeaders.ACCEPT to "application/json")
            .header(HttpHeaders.CONTENT_TYPE to "application/json")
            .body(objectMapper.writeValueAsString(expectedUser))
            .responseString()

    }

    @Test
    fun getUserElo() {
        val username = "Peter"
        val (_, _, result) = "http://localhost:$port/users/${username}/elo".httpGet()
            .header(HttpHeaders.ACCEPT to "application/json")
            .responseString()
        result.map { objectMapper.readValue<Int>(it) }
            .get() shouldBe 1001
    }

}
