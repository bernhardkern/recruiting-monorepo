package de.iits.elo.player

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "player")
data class Player(

    @Id
    @Column(name = "user_name")
    val userName: String,
    @Column(name = "display_name")
    val displayName: String,
    @Column(name = "email")
    val email: String?,
    @Column(name = "elo")
    val elo: Int = 1000,
)