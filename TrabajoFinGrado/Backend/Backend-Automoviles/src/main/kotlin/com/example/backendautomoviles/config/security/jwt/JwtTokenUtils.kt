package com.example.backendautomoviles.config.security.jwt

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import com.example.backendautomoviles.exceptions.TokenInvalidException
import com.example.backendautomoviles.models.Usuario
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

private val logger = KotlinLogging.logger {}


@Component
class JwtTokenUtils {

    @Value("\${jwt.secret}")
    private val jwtSecreto: String? = null

    @Value("\${jwt.token-expiration}")
    private val jwtDuracionTokenEnSegundos = 0

    fun generateToken(user: Usuario): String {
        logger.info { "Generando token para el usuario: ${user.username}" }
        val tokenExpirationDate = Date(System.currentTimeMillis() + jwtDuracionTokenEnSegundos * 1000)

        return JWT.create()
            .withSubject(user.uuid.toString())
            .withHeader(mapOf("typ" to TOKEN_TYPE))
            .withIssuedAt(Date())
            .withExpiresAt(tokenExpirationDate)
            .withClaim("username", user.username)
            .withClaim("nombre", user.nombre)
            .withClaim("roles", user.rol.split(",").toSet().toString())
            .sign(Algorithm.HMAC512(jwtSecreto))
    }

    fun getUserIdFromJwt(token: String?): String {
        logger.info { "Obteniendo el ID del usuario: $token" }
        return validateToken(token!!)!!.subject
    }

    fun validateToken(authToken: String): DecodedJWT? {
        logger.info { "Validando el token: ${authToken}" }

        try {
            return JWT.require(Algorithm.HMAC512(jwtSecreto)).build().verify(authToken)
        } catch (e: Exception) {
            throw TokenInvalidException("Token no válido o expirado")
        }
    }

    private fun getClaimsFromJwt(token: String) =
        validateToken(token)?.claims

    fun getUsernameFromJwt(token: String): String {
        logger.info { "Obteniendo el nombre de usuario del token: ${token}" }

        val claims = getClaimsFromJwt(token)
        return claims!!["username"]!!.asString()
    }

    fun getRolesFromJwt(token: String): String {
        logger.info { "Obteniendo los roles del token: ${token}" }

        val claims = getClaimsFromJwt(token)
        return claims!!["roles"]!!.asString()
    }

    fun isTokenValid(token: String): Boolean {
        logger.info { "Comprobando si el token es válido: ${token}" }

        val claims = getClaimsFromJwt(token)!!
        val expirationDate = claims["exp"]!!.asDate()
        val now = Date(System.currentTimeMillis())
        return now.before(expirationDate)
    }


    companion object {
        const val TOKEN_HEADER = "Authorization"
        const val TOKEN_PREFIX = "Bearer "
        const val TOKEN_TYPE = "JWT"
    }

}