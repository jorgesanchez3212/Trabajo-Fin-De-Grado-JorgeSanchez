package com.example.backendautomoviles.service.user

import com.example.backendautomoviles.exceptions.UsuariosBadRequestException
import com.example.backendautomoviles.exceptions.UsuariosNotFoundException
import com.example.backendautomoviles.models.Usuario
import com.example.backendautomoviles.repositories.UsuariosRepository
import com.example.backendautomoviles.service.BcryptService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*

private val logger = KotlinLogging.logger {}


@Service
class UsuarioService
    @Autowired constructor(
        private val repository : UsuariosRepository,
        private val passwordEncoder : PasswordEncoder
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails = runBlocking {
        return@runBlocking repository.findByUsername(username).firstOrNull()
            ?: throw UsuariosNotFoundException("Usuario no encontrado con username: $username")
    }


    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }

    @Cacheable("usuarios")
    suspend fun loadUserById(userId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(userId)
    }

    @Cacheable("usuarios")
    suspend fun loadUserByUuid(uuid: UUID) = withContext(Dispatchers.IO) {
        return@withContext repository.findByUuid(uuid).firstOrNull()
    }



    suspend fun save(user: Usuario, isAdmin: Boolean = false): Usuario = withContext(Dispatchers.IO) {
        logger.info { "Guardando usuario: $user" }

        if (repository.findByUsername(user.username)
                .firstOrNull() != null
        ) {
            logger.info { "El usuario ya existe" }
            throw UsuariosBadRequestException("El username ya existe")
        }
        if (repository.findByEmail(user.email)
                .firstOrNull() != null
        ) {
            logger.info { "El email ya existe" }
            throw UsuariosBadRequestException("El email ya existe")
        }

        logger.info { "El usuario no existe, lo guardamos" }
        var newUser = user.copy(
            uuid = UUID.randomUUID(),
            password = passwordEncoder.encode(user.password),
            rol = Usuario.TipoUsuario.CLIENTE.name,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )
        if (isAdmin)
            newUser = newUser.copy(
                rol = Usuario.TipoUsuario.CLIENTE.name
            )
        println(newUser)
        try {
            return@withContext repository.save(newUser)
        } catch (e: Exception) {
            throw UsuariosBadRequestException("Error al crear el usuario: Nombre de usuario o email ya existen")
        }
    }



    suspend fun update(user: Usuario) = withContext(Dispatchers.IO) {
        logger.info { "Actualizando usuario: $user" }

        var userDB = repository.findByUsername(user.username)
            .firstOrNull()
        if (userDB != null && userDB.id != user.id) {
            throw UsuariosBadRequestException("El username ya existe")
        }

        userDB = repository.findByEmail(user.email)
            .firstOrNull()
        if (userDB != null && userDB.id != user.id) {
            throw UsuariosBadRequestException("El email ya existe")
        }

        logger.info { "El usuario no existe, lo actualizamos" }

        val updtatedUser = user.copy(
            updatedAt = LocalDateTime.now()
        )

        try {
            return@withContext repository.save(updtatedUser)
        } catch (e: Exception) {
            throw UsuariosBadRequestException("Error al actualizar el usuario: Nombre de usuario o email ya existen")
        }


    }


}