package com.example.backendautomoviles.dto

import com.example.backendautomoviles.models.Usuario
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty
import java.time.LocalDateTime
import java.util.*


data class UsuarioCreateDto(
    @NotEmpty(message = "El nombre no puede estar vacío")
    val nombre: String,
    @Email(message = "El email debe ser válido")
    val email: String,
    @NotEmpty(message = "El username no puede estar vacío")
    val username: String,
    val image: String? = null,
    val rol: String,
    @NotEmpty(message = "El password no puede estar vacío")
    val password: String,
    val description: String

)

data class UsuarioLoginDto(
    @NotEmpty(message = "El username no puede estar vacío")
    val username: String,
    @NotEmpty(message = "El password no puede estar vacío")
    val password: String
)


data class UsuarioDto(
    val uuid: UUID? = null,
    val nombre: String,
    val username: String,
    val email: String,
    val image: String?,
    val rol: Set<String> = setOf(Usuario.TipoUsuario.CLIENTE.name),
    val metadata: MetaData? = null,
) {
    data class MetaData(
        val createdAt: LocalDateTime? = LocalDateTime.now(),
        val updatedAt: LocalDateTime? = LocalDateTime.now(),
        val deleted: Boolean = false
    )
}

data class UsuarioUpdateDto(
    @NotEmpty(message = "El nombre no puede estar vacío")
    val nombre: String,
    @Email(message = "El email debe ser válido")
    val email: String,
    @NotEmpty(message = "El username no puede estar vacío")
    val username: String,
    @NotEmpty(message = "La descripcion no puede estar vacío")
    val descripcion : String
)

data class UserWithTokenDto(
    val user: UsuarioDto,
    val token: String
)
