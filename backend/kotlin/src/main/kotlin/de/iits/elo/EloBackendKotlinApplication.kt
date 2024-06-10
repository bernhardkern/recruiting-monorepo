package de.iits.elo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class EloBackendKotlinApplication

fun main(args: Array<String>) {
    runApplication<EloBackendKotlinApplication>(*args)
}
