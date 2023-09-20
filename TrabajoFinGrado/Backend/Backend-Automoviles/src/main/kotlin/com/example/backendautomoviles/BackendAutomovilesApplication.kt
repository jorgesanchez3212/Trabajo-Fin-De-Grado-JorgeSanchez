package com.example.backendautomoviles

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@SpringBootApplication
@EnableCaching
class BackendAutomovilesApplication

fun main(args: Array<String>) {
    runApplication<BackendAutomovilesApplication>(*args)
}
