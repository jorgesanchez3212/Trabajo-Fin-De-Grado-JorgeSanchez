package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.ContactoCreateDto
import com.example.backendautomoviles.dto.ContactoDto
import com.example.backendautomoviles.models.Contacto


fun Contacto.toDto() : ContactoDto {

    return ContactoDto(
        id =this.id,
        descripcion = this.descripcion,
        idCliente = this.idCliente,
    )

}


fun ContactoCreateDto.toModel() : Contacto {

    return Contacto(
        descripcion = this.descripcion,
        idCliente = this.idCliente,

    )

}