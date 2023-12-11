package com.example.backendautomoviles.config.security

import com.example.backendautomoviles.config.security.jwt.JwtAuthenticationFilter
import com.example.backendautomoviles.config.security.jwt.JwtAuthorizationFilter
import com.example.backendautomoviles.config.security.jwt.JwtTokenUtils
import com.example.backendautomoviles.service.user.UsuarioService
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
class SecurityConfig @Autowired constructor(
    private val userService: UsuarioService,
    private val jwtTokenUtils: JwtTokenUtils
) {

    @Bean
    fun authManager(http: HttpSecurity): AuthenticationManager {
        val authenticationManagerBuilder = http.getSharedObject(
            AuthenticationManagerBuilder::class.java
        )
        authenticationManagerBuilder.userDetailsService(userService)
        return authenticationManagerBuilder.build()
    }



    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        val authenticationManager = authManager(http)

        http
            .csrf()
            .disable()
            .exceptionHandling()
            .and()
            .authenticationManager(authenticationManager)
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilter(JwtAuthenticationFilter(jwtTokenUtils, authenticationManager))
            .addFilter(JwtAuthorizationFilter(jwtTokenUtils, userService, authenticationManager))
            .exceptionHandling()
            .authenticationEntryPoint { request, response, e ->
                response.contentType = "application/json;charset=UTF-8"
                response.status = HttpServletResponse.SC_FORBIDDEN
                // Loggeando el error
                println("Access denied: "+ e.toString())
                println("Request details: " + request.toString())

            } .and()
            .authorizeHttpRequests()
            .requestMatchers("/error/**").permitAll()
            .requestMatchers("/assets/*","/","/svg/", "/index.html", "/static/", ".css", "*.js").permitAll()
            .requestMatchers("/api/**").permitAll()
            .requestMatchers("/**").permitAll()
            .requestMatchers( "/api/users/register").permitAll()
            .requestMatchers( "/api/users/login").permitAll()
            .requestMatchers("/static/**").permitAll()

        return http.build()
    }

}