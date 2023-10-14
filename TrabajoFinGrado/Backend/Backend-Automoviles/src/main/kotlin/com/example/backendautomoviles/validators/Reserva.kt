package com.example.backendautomoviles.validators


import com.example.backendautomoviles.dto.ReservaCreateDto
import com.example.backendautomoviles.dto.ReservaUpdateDto
import com.example.backendautomoviles.exceptions.ReservasBadRequestException

fun ReservaCreateDto.validate(): ReservaCreateDto {
    if (this.clienteId.isBlank()) {
        throw ReservasBadRequestException("EL cliente id no puede estar vacío")
    } else if (this.automovilId.isBlank())
        throw ReservasBadRequestException("El automovil id no puede estar vacío")
    else if (this.fechaInicio.isBlank())
        throw ReservasBadRequestException("La fecha de inicio no puede estar vacío")
    else if (this.fechaFin.isBlank())
        throw ReservasBadRequestException("La fecha fin no puede estar vacía o ser menor de 2 asientos")
    else if (this.costo.isBlank())
        throw ReservasBadRequestException("El costo no puede estar vacío")
    return this
}

fun ReservaUpdateDto.validate(): ReservaUpdateDto {
    if (this.clienteId.isBlank()) {
        throw ReservasBadRequestException("EL cliente id no puede estar vacío")
    } else if (this.cocheId.isBlank())
        throw ReservasBadRequestException("El automovil id no puede estar vacío")
    else if (this.fechaInicio.isBlank())
        throw ReservasBadRequestException("La fecha de inicio no puede estar vacío")
    else if (this.fechaFin.isBlank())
        throw ReservasBadRequestException("La fecha fin no puede estar vacía o ser menor de 2 asientos")
    else if (this.costo.isBlank())
        throw ReservasBadRequestException("El costo no puede estar vacío")
    return this
}