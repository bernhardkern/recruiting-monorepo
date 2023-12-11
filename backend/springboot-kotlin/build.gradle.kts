import io.gitlab.arturbosch.detekt.extensions.DetektExtension
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

group = "de.iits"
version = "0.0.1-SNAPSHOT"

plugins {
    val kotlinVersion = "1.9.21"
    val springBootVersion = "3.1.4"
    val springDependencyManagementVersion = "1.1.3"
    val detektVersion = "1.23.1"

    kotlin("jvm") version kotlinVersion
    kotlin("plugin.spring") version kotlinVersion
    kotlin("plugin.jpa") version kotlinVersion

    id("org.springframework.boot") version springBootVersion
    id("io.spring.dependency-management") version springDependencyManagementVersion
    id("io.gitlab.arturbosch.detekt") version detektVersion
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

val h2Version = "2.2.224"
val detektVersion = "1.23.1"
val kotestVersion = "5.8.0"
val mockKVersion = "1.13.8"
val testcontainersPostgresVersion = "1.19.3"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.h2database:h2:$h2Version")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    detektPlugins("io.gitlab.arturbosch.detekt:detekt-formatting:$detektVersion")

    testImplementation("io.kotest:kotest-runner-junit5:$kotestVersion")
    testImplementation("io.kotest:kotest-assertions-core-jvm:$kotestVersion")
    testImplementation("io.mockk:mockk:$mockKVersion")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude("org.junit.vintage")
        exclude("org.assertj")
        exclude("org.mockito")
    }
}

repositories(RepositoryHandler::mavenCentral)

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = java.sourceCompatibility.toString()
    }
}

tasks.withType<Test>(Test::useJUnitPlatform)

detekt {
    toolVersion = detektVersion
    source.setFrom(DetektExtension.DEFAULT_SRC_DIR_KOTLIN)
    config.setFrom("$projectDir/config/detekt.yml")
    buildUponDefaultConfig = true
    allRules = false
    autoCorrect = true
}
