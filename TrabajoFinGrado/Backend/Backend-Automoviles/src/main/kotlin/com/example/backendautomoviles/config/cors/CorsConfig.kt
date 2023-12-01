package com.example.backendautomoviles.config.cors

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class CorsConfig {
    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedHeaders("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .maxAge(3600)
            }
        }
    }
}

/*
    @Bean
    fun corsConfigurerSSL(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/rest/**")
                    .allowedOrigins("http://localhost:6963")
                    .allowedHeaders("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .maxAge(3600)
            }
        }
    }

}

 */