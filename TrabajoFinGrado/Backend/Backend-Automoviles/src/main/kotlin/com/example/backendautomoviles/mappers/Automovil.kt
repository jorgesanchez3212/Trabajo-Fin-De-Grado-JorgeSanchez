package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.AutomovilCreateDto
import com.example.backendautomoviles.dto.AutomovilDto
import com.example.backendautomoviles.dto.UsuarioDto
import com.example.backendautomoviles.models.Automovil
import java.time.LocalDateTime

fun Automovil.toDto() : AutomovilDto{


    val reservass : ArrayList<String>? = null
    this.reservas?.forEach{item ->
        reservass?.add(item.toString())
    }
    return AutomovilDto(
        id = this.id,
        numeroChasis = this.numeroChasis,
        marca = this.marca,
        modelo = this.modelo,
        color = this.color,
        capacidad = this.capacidad.toString(),
        coste = this.coste,
        image= this.image,
        reservas = reservass?.toList(),
        tipo = this.tipo.trim()
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
        image= this.image,
        reservas = this.reservas?.toList(),
        tipo = this.tipo.trim()
    )

}