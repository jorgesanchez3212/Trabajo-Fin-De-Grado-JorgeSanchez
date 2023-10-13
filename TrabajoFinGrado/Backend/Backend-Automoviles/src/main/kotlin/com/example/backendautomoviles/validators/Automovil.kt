package com.example.backendautomoviles.validators

import com.example.backendautomoviles.dto.AutomovilCreateDto
import com.example.backendautomoviles.dto.AutomovilUpdateDto
import com.example.backendautomoviles.dto.UsuarioCreateDto
import com.example.backendautomoviles.exceptions.AutomovilesBadRequestException
import com.example.backendautomoviles.exceptions.UsuariosBadRequestException

fun AutomovilCreateDto.validate(): AutomovilCreateDto {
    if (this.marca.isBlank()) {
        throw AutomovilesBadRequestException("La marca no puede estar vacío")
    } else if (this.modelo.isBlank())
        throw AutomovilesBadRequestException("El modelo no puede estar vacío")
    else if (this.numeroChasis.isBlank())
        throw AutomovilesBadRequestException("El numero de chasis no puede estar vacío")
    else if (this.capacidad.isBlank() || this.capacidad.length < 2)
        throw AutomovilesBadRequestException("La capacidad no puede estar vacía o ser menor de 2 asientos")

    return this
}

fun AutomovilUpdateDto.validate(): AutomovilUpdateDto {
    if (this.marca.isBlank()) {
        throw AutomovilesBadRequestException("La marca no puede estar vacío")
    } else if (this.modelo.isBlank())
        throw AutomovilesBadRequestException("El modelo no puede estar vacío")
    else if (this.color.isBlank())
    throw AutomovilesBadRequestException("El color no puede estar vacío")
    else if (this.capacidad.isBlank() || this.capacidad.length < 2)
        throw AutomovilesBadRequestException("La capacidad no puede estar vacía o ser menor de 2 asientos")
    return this
}