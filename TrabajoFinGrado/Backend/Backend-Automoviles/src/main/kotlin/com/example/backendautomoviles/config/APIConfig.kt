package com.example.backendautomoviles.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration

@Configuration
class APIConfig {
    companion object {
        @Value("\${api.path}")
        const val API_PATH = "/api"

        @Value("\${api.version}")
        const val API_VERSION = "1.0"

        @Value("\${project.name}")
        const val PROJECT_NAME = "Automoviles API REST Spring Boot"

        @Value("\${spring.profiles.active}")
        const val PROFILE = "dev"

    }
}