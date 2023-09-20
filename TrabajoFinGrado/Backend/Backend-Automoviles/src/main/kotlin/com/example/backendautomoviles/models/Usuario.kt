package com.example.backendautomoviles.models

import kotlinx.serialization.Serializable
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

@Document("usuarios")
data class Usuario(
    @Id
    val id : String = ObjectId.get().toString(),
    val uuid: UUID = UUID.randomUUID(),
    var nombre : String,
    val rol : String = TipoUsuario.CLIENTE.name,
    var email : String,
    @get:JvmName("passwordBackingField")
    var password : String,
    @get:JvmName("usernameBackingField")
    var username : String,
    var description : String,
    var image : String? = null,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now(),
    val deleted: Boolean = false,
    ) : UserDetails {
    enum class TipoUsuario{
        ADMINISTRADOR, CLIENTE
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return rol.split(",").map { SimpleGrantedAuthority("ROLE_${it.trim()}") }.toMutableList()
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

}