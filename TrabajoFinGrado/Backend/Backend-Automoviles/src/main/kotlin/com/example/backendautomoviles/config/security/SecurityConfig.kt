package com.example.backendautomoviles.config.security

import com.example.backendautomoviles.config.security.jwt.JwtAuthenticationFilter
import com.example.backendautomoviles.config.security.jwt.JwtAuthorizationFilter
import com.example.backendautomoviles.config.security.jwt.JwtTokenUtils
import com.example.backendautomoviles.service.user.UsuarioService
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
            .authorizeHttpRequests()
            .requestMatchers("/error/**").permitAll()
            .requestMatchers("/api/**")
            .permitAll()
            .requestMatchers("users/login", "users/register").permitAll()
            .requestMatchers("/user/me").hasAnyRole("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/user/list").hasRole("ADMIN")
            .anyRequest().authenticated()
            .and()
            .addFilter(JwtAuthenticationFilter(jwtTokenUtils, authenticationManager))
            .addFilter(JwtAuthorizationFilter(jwtTokenUtils, userService, authenticationManager))

        return http.build()
    }
}