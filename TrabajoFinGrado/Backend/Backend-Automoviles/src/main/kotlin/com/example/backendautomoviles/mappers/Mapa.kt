package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.MapaCreateDto
import com.example.backendautomoviles.dto.MapaDto
import com.example.backendautomoviles.models.Mapa
import java.util.*



fun Mapa.toDto() : MapaDto {

    return MapaDto(
        id = this.id,
        latitud =this.latitud,
        longitud = this.longitud,

    )

}


fun MapaCreateDto.toModel() : Mapa {

    return Mapa(
        latitud =this.latitud,
        longitud = this.longitud,
    )

}