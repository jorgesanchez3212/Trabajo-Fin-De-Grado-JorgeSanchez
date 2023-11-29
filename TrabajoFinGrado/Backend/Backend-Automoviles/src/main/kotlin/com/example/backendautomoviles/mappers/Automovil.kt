package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.AutomovilCreateDto
import com.example.backendautomoviles.dto.AutomovilDto
import com.example.backendautomoviles.dto.UsuarioDto
import com.example.backendautomoviles.models.Automovil
import java.time.LocalDateTime

fun Automovil.toDto() : AutomovilDto{


    val reservass : ArrayList<String>? = null
    this.reservas.forEach{item ->
        reservass?.add(item.toString())
    }
    return AutomovilDto(
        uuid = this.uuid,
        numeroChasis = this.numeroChasis,
        marca = this.marca,
        modelo = this.modelo,
        color = this.color,
        capacidad = this.capacidad.toString(),
        coste = this.coste,
        reservas = reservass!!.toList(),
        tipo = this.tipo.trim(),
        metadata = AutomovilDto.MetaData(
            createdAt = this.createdAt,
            updatedAt = this.updatedAt,
            deleted = this.deleted
        )
    )

}


fun AutomovilCreateDto.toModel() : Automovil{

    val reservass : ArrayList<LocalDateTime>? = null
    this.reservas.forEach{item ->
        reservass?.add(LocalDateTime.parse(item))
    }
    return Automovil(
        numeroChasis = this.numeroChasis,
        marca = this.marca,
        modelo = this.modelo,
        color = this.color,
        capacidad = this.capacidad.toInt(),
        coste = this.coste,
        reservas = reservass!!.toList(),
        tipo = this.tipo.trim()
    )

}