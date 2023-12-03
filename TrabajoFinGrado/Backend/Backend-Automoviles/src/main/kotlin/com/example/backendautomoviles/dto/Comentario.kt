package com.example.backendautomoviles.dto

import java.time.LocalDateTime
import java.util.*

data class ComentarioCreateDto(
    val descripcion : String,
    val idUser : String,
    val idAutomovil : String,
) {
}


data class ComentarioDto(
    val id: String,
    val descripcion : String,
    val idUser : String,
    val idAutomovil : String,
    val createdAt : String,
    val deleted : Boolean = false
){}


data class ComentarioUpdateDto(
    val id : String? = null,
    val descripcion : String,
){}

