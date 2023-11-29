package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.MapaCreateDto
import com.example.backendautomoviles.dto.MapaDto
import com.example.backendautomoviles.models.Mapa
import java.util.*



fun Mapa.toDto() : MapaDto {

    return MapaDto(
        latidud =this.latidud,
        longitud = this.longitud,

    )

}


fun MapaCreateDto.toModel() : Mapa {

    return Mapa(
        uuid = UUID.randomUUID().toString(),
        latidud =this.latidud,
        longitud = this.longitud,
    )

}