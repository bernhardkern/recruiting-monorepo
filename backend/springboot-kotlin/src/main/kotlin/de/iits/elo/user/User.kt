package de.iits.elo.user

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.*

@Entity
@Table(name = "user")
data class User(
    @Id
    val id: UUID = UUID.randomUUID(),
    @Column(unique=true)
    val username: String,
    val displayName: String,
    val email: String,
    val elo: Int = 1000,
)