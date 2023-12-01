package com.example.backendautomoviles.dto

import java.time.LocalDateTime
import java.util.*

data class ComentarioCreateDto(
    val descripcion : String,
    val idUser : String,
    val idAutomovil : String,
    val createdAt : LocalDateTime,
    val deleted : Boolean = false
) {
}


data class ComentarioDto(
    val uuid: String,
    val descripcion : String,
    val idUser : String,
    val idAutomovil : String,
    val createdAt : LocalDateTime,
    val deleted : Boolean = false
){}


data class ComentarioUpdateDto(
    val uuid : String? = null,
    val descripcion : String,
){}

