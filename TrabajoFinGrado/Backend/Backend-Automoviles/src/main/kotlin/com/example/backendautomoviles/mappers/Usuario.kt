package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.UsuarioCreateDto
import com.example.backendautomoviles.dto.UsuarioDto
import com.example.backendautomoviles.models.Usuario


fun Usuario.toDto(): UsuarioDto {
    return UsuarioDto(
        id=this.id,
        uuid = this.uuid,
        nombre = this.nombre,
        email = this.email,
        descripcion = this.description,
        username = this.username,
        image = this.image,
        rol = this.rol.split(",").map { it.trim() }.toSet(),
        metadata = UsuarioDto.MetaData(
            createdAt = this.createdAt,
            updatedAt = this.updatedAt,
            deleted = this.deleted
        )
    )
}

fun UsuarioCreateDto.toModel(): Usuario {
    return Usuario(
        nombre = this.nombre,
        email = this.email,
        username = this.username,
        password = this.password,
        image = this.image ?: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
        rol = this.rol,
        description = this.descripcion
    )
}