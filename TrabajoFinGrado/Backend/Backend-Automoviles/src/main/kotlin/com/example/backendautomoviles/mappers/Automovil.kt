package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.AutomovilCreateDto
import com.example.backendautomoviles.dto.AutomovilDto
import com.example.backendautomoviles.dto.UsuarioDto
import com.example.backendautomoviles.models.Automovil

fun Automovil.toDto() : AutomovilDto{
    return AutomovilDto(
        uuid = this.uuid,
        numeroChasis = this.numeroChasis,
        marca = this.marca,
        modelo = this.modelo,
        color = this.color,
        capacidad = this.capacidad.toString(),
        coste = this.coste,
        tipo = this.tipo.trim(),
        metadata = AutomovilDto.MetaData(
            createdAt = this.createdAt,
            updatedAt = this.updatedAt,
            deleted = this.deleted
        )
    )

}


fun AutomovilCreateDto.toModel() : Automovil{
    return Automovil(
        numeroChasis = this.numeroChasis,
        marca = this.marca,
        modelo = this.modelo,
        color = this.color,
        capacidad = this.capacidad.toInt(),
        coste = this.coste,
        tipo = this.tipo.trim()
    )

}