package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.ComentarioCreateDto
import com.example.backendautomoviles.dto.ComentarioDto
import com.example.backendautomoviles.models.Comentario
import java.time.LocalDateTime
import java.util.*


fun Comentario.toDto() : ComentarioDto {

    return ComentarioDto(
        id =this.id,
        descripcion = this.descripcion,
        idUser = this.idUser,
        idAutomovil = this.idAutomovil,
        createdAt = this.createdAt,
        deleted = this.deleted,
    )

}


fun ComentarioCreateDto.toModel() : Comentario {

    return Comentario(
        uuid = UUID.randomUUID().toString(),
        descripcion = this.descripcion,
        idUser = this.idUser,
        idAutomovil = this.idAutomovil,
        createdAt = LocalDateTime.now().toString(),
        deleted = false,
    )

}