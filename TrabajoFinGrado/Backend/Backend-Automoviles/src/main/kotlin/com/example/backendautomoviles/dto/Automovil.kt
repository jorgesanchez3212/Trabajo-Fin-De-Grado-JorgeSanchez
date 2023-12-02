package com.example.backendautomoviles.dto

import com.example.backendautomoviles.models.Automovil
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty
import java.time.LocalDateTime
import java.util.*

data class AutomovilCreateDto(
    val numeroChasis: String,
    val marca : String,
    val modelo : String,
    val color : String,
    val capacidad : String,
    val coste : Double,
    val image: String?,
    val reservas : List<String>?,
    val tipo : String = Automovil.TipoAutomovil.COCHE.name,
){}


data class AutomovilDto(
    val id: String? = null,
    val numeroChasis: String,
    val marca : String,
    val modelo : String,
    val color : String,
    val capacidad : String,
    val coste : Double,
    val image: String?,
    val reservas : List<String>?,
    val tipo : String ,
) {

}


data class AutomovilUpdateDto(
    val numeroChasis: String,
    val marca : String,
    val modelo : String,
    val color : String,
    val capacidad : String,
    val coste : Double,
    val image: String?,
    val reservas : List<String>?,
    val tipo : String,

)
