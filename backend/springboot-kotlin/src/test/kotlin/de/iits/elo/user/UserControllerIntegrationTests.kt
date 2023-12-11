package de.iits.elo.user

import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserControllerIntegrationTests {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Nested
    inner class GetAllUsers {

        @Test
        fun `dasd`() {
            val requestResponse = mockMvc.get("/users")
            requestResponse.andExpect {
                status { isAccepted() }
            }
        }
    }
}
