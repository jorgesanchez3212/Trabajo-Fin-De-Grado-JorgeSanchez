val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val cache_version: String by project
val junit_version: String by project
val mockk_version: String by project
val bcrypt_version: String by project
val ktor_swagger_ui_version: String by project



plugins {
    kotlin("jvm") version "1.9.10"
    id("io.ktor.plugin") version "2.3.4"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.8.0"
    id("com.google.devtools.ksp") version "1.8.0-1.0.8"
}

group = "com.example"
version = "0.0.1"

application {
    mainClass.set("com.example.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {

    // Cache 4K
    implementation("io.github.reactivecircus.cache4k:cache4k:$cache_version")

    // JUnit 5
    testImplementation("org.junit.jupiter:junit-jupiter-api:$junit_version")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:$junit_version")

    // MockK
    testImplementation("io.mockk:mockk:$mockk_version")

    // Result Kotlin
    implementation("com.michael-bull.kotlin-result:kotlin-result:1.1.17")
    implementation("com.michael-bull.kotlin-result:kotlin-result-coroutines:1.1.17")

    // KMongo Asincrono
    implementation("org.litote.kmongo:kmongo-async:4.7.2")

    // Corrutinas Mongo
    implementation("org.litote.kmongo:kmongo-coroutine:4.7.2")

    // BCrypt
    implementation("org.mindrot:jbcrypt:$bcrypt_version")

    // Auth JWT
    implementation("io.ktor:ktor-server-auth-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-auth-jwt-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-host-common-jvm:$ktor_version")

    // Result Kotlin
    implementation("com.michael-bull.kotlin-result:kotlin-result:1.1.17")
    implementation("com.michael-bull.kotlin-result:kotlin-result-coroutines:1.1.17")

    // Cors
    implementation("io.ktor:ktor-server-cors-jvm:2.2.2")

    // Swagger
    implementation("io.github.smiley4:ktor-swagger-ui:$ktor_swagger_ui_version")

    // Certificados SSL y TSL
    implementation("io.ktor:ktor-network-tls-certificates:$ktor_version")

    implementation("io.ktor:ktor-server-netty-jvm:$ktor_version")
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktor_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")

}

tasks.test {
    useJUnitPlatform()
}

sourceSets.main {
    java.srcDirs("build/generated/ksp/main/kotlin")
}

val compileKotlin: org.jetbrains.kotlin.gradle.tasks.KotlinCompile by tasks
compileKotlin.kotlinOptions {
    jvmTarget = "1.8"
}
val compileTestKotlin: org.jetbrains.kotlin.gradle.tasks.KotlinCompile by tasks
compileTestKotlin.kotlinOptions {
    jvmTarget = "1.8"
}
