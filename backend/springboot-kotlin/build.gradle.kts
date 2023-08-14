import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.1.2"
    id("io.spring.dependency-management") version "1.1.2"
    kotlin("jvm") version "1.8.22"
    kotlin("plugin.spring") version "1.8.22"
    kotlin("plugin.jpa") version "1.8.22"
}

group = "de.iits"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.h2database:h2:2.2.220")
    implementation("org.flywaydb:flyway-core:9.21.1")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    testImplementation("org.junit.jupiter:junit-jupiter:5.9.0")
    testImplementation("io.kotest:kotest-assertions-core-jvm:5.5.0")
    testImplementation("io.mockk:mockk:1.13.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude("org.junit.vintage")
        exclude("org.assertj")
        exclude("org.mockito")
    }
    testImplementation("com.github.kittinunf.fuel:fuel:2.3.1")


}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.getByName<Jar>("jar") {
    enabled = false
}

tasks.withType<Test> {
    useJUnitPlatform()
}
