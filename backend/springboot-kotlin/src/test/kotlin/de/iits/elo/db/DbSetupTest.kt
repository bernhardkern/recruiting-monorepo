package de.iits.elo.db

import de.iits.elo.testdata.mockuser1
import de.iits.elo.user.User
import de.iits.elo.user.UserRepository
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.repository.findByIdOrNull
import java.util.*

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DbSetupTest {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun canCreateReadEntity() {
        val user = mockuser1
        val updatedUser = user.copy(email = "different@iits-consulting.de")
        userRepository.save(user)
        val userFromDb = userRepository.findByIdOrNull(user.id)
        userFromDb shouldBe user
        userRepository.save(updatedUser)
        val updatedFromDb = userRepository.findByIdOrNull(user.id)
        updatedFromDb shouldBe updatedUser
        userRepository.delete(user)
        val userNotFound = userRepository.findByIdOrNull(user.id)
        userNotFound shouldNotBe null
    }
}
