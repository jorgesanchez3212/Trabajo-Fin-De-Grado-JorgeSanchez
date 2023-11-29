package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.TiendaCreateDto
import com.example.backendautomoviles.dto.TiendaDto
import com.example.backendautomoviles.models.Tienda

fun Tienda.toDto() : TiendaDto {

    return TiendaDto(
        uuid = this.uuid,
        nombre =this.nombre,
        idMapa = this.idMapa,

        )

}


fun TiendaCreateDto.toModel() : Tienda {

    return Tienda(
        nombre =this.nombre,
        idMapa = this.idMapa,
    )

}