package com.example.backendautomoviles.controller


import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class IndexController {

    @GetMapping("/")
    fun index(): ResponseEntity<Resource> {
        val resource = ClassPathResource("static/index.html")
        return ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(resource)
    }
}