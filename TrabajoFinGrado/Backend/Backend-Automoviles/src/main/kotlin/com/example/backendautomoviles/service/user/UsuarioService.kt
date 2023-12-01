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
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
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


    suspend fun deleteById(id : String) = withContext(Dispatchers.IO) {
        return@withContext repository.deleteById(id)
    }
    @Cacheable("usuarios")
    suspend fun loadUserById(userId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(userId)
    }

    @Cacheable("usuarios")
    suspend fun loadUserByUuid(uuid: String) = withContext(Dispatchers.IO) {
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
            uuid = UUID.randomUUID().toString(),
            password = passwordEncoder.encode(user.password),
            rol = Usuario.TipoUsuario.CLIENTE.name,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )
        if (isAdmin)
            newUser = newUser.copy(
                rol = user.rol
            )
        println(newUser)
        try {
            return@withContext repository.save(newUser)
        } catch (e: Exception) {
            throw UsuariosBadRequestException("Error al crear el usuario: Nombre de usuario o email ya existen")
        }
    }

    suspend fun saveUserWithImage(file: MultipartFile, user : Usuario, isAdmin: Boolean = false ): Usuario = withContext(Dispatchers.IO) {
        // Convertir MultipartFile a Base64
        val imageString = try {
            val bytes = file.bytes
            Base64.getEncoder().encodeToString(bytes)
        } catch (e: IOException) {
            throw RuntimeException("Error al procesar el archivo", e)
        }

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
            uuid = UUID.randomUUID().toString(),
            password = passwordEncoder.encode(user.password),
            rol = Usuario.TipoUsuario.CLIENTE.name,
            image = imageString,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )
        if (isAdmin)
            newUser = newUser.copy(
                rol = user.rol
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
        try {
            return@withContext repository.save(user)
        } catch (e: Exception) {
            throw UsuariosBadRequestException("Error al actualizar el usuario: Nombre de usuario o email ya existen")
        }


    }


}