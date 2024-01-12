package de.iits.elo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class EloApplication

fun main(args: Array<String>) {
    runApplication<EloApplication>(*args)
}
