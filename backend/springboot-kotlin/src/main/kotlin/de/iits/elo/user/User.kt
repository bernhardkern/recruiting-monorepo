package de.iits.elo.user

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "user")
data class User(

    @Id
    val username: String,
    val displayName: String,
    val email: String,
    val elo: Int = 1000,
)