import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.1.3"
    id("io.spring.dependency-management") version "1.1.3"
    /*
    El plugin org.graalvm.buildtools.native está relacionado con GraalVM y su capacidad de compilar aplicaciones Java y Kotlin en ejecutables nativos a través de la herramienta native-image. Estos son algunos de los puntos clave acerca de este plugin y por qué podrías considerar su uso:

Ejecutables Nativos: GraalVM permite compilar tu aplicación en un ejecutable nativo. Esto significa que no necesitas una JVM para ejecutar la aplicación; en su lugar, la aplicación se ejecuta directamente en el sistema operativo, lo que puede llevar a tiempos de inicio increíblemente rápidos.

Tiempos de Inicio Rápidos: Una de las ventajas más significativas de compilar tu aplicación a un ejecutable nativo es el tiempo de inicio. Las aplicaciones compiladas con native-image suelen tener tiempos de inicio mucho más rápidos que las ejecutadas en una JVM tradicional. Esto es particularmente beneficioso para aplicaciones que necesitan escalar rápidamente o microservicios que se inician y detienen con frecuencia.

Consumo de Memoria: Los ejecutables nativos a menudo tienen un menor consumo de memoria en comparación con las aplicaciones que se ejecutan en una JVM.

Limitaciones: Mientras que compilar tu aplicación a un ejecutable nativo tiene ventajas, también hay limitaciones. No todas las bibliotecas y características de Java o Spring son compatibles con native-image. Además, el proceso de compilación puede ser largo y consumir muchos recursos.
     */
    id("org.graalvm.buildtools.native") version "0.9.18"
    kotlin("jvm") version "1.8.22"
    kotlin("plugin.spring") version "1.8.22"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {

    // Spring Data MongoDB Reactivo para integrar MongoDB en un contexto reactiva
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb-reactive")
    // Dependencias de Seguridad
    implementation("org.springframework.boot:spring-boot-starter-security")
    // Validaciones de Spring Boot
    implementation("org.springframework.boot:spring-boot-starter-validation")
    // Webflux y Reactividad
    /*
    Spring WebFlux es el módulo dentro de Spring que permite desarrollar aplicaciones web reactivas. Vamos a detallar un poco más por qué usarlo:
    Naturaleza Reactiva: MongoDB ofrece controladores reactivos, lo que significa que puedes interactuar con MongoDB de manera no bloqueante y así
    aprovechar al máximo el paradigma reactivo. Para construir una API que aproveche este comportamiento no bloqueante desde la base de datos hasta
    el cliente, necesitas un framework web que también sea reactivo. Spring WebFlux es precisamente ese framework dentro del ecosistema de Spring.
     */
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    // Websocket
    implementation("org.springframework.boot:spring-boot-starter-websocket")
    // Cache
    implementation("org.springframework.boot:spring-boot-starter-cache")

    // Kotlin
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    // Kotlin Corutinas
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")

    // Corrutinas
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")


    // JWT
    implementation("com.auth0:java-jwt:4.2.1")

    // Test Corrutinas
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.6.4")

    // Logger
    implementation("io.github.microutils:kotlin-logging-jvm:3.0.4")
    implementation("ch.qos.logback:logback-classic:1.4.4")


    // Serializacion JSON
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.4.1")


    // BCrypt
    implementation("org.mindrot:jbcrypt:0.4")

    // Swagger
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2")

    // Test
    implementation("junit:junit:4.13.1")
    implementation("org.junit.jupiter:junit-jupiter:5.8.1")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.projectreactor:reactor-test")

}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
