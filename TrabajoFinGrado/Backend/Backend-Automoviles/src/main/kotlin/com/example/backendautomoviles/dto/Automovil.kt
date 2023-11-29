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
    val reservas : List<String>,
    val tipo : String = Automovil.TipoAutomovil.COCHE.name,
){}


data class AutomovilDto(
    val uuid: String? = null,
    val numeroChasis: String,
    val marca : String,
    val modelo : String,
    val color : String,
    val capacidad : String,
    val coste : Double,
    val reservas : List<String>,
    val tipo : String = Automovil.TipoAutomovil.COCHE.name,
    val metadata: MetaData? = null,
) {
    data class MetaData(
        val createdAt: LocalDateTime? = LocalDateTime.now(),
        val updatedAt: LocalDateTime? = LocalDateTime.now(),
        val deleted: Boolean = false
    )
}


data class AutomovilUpdateDto(
    @NotEmpty(message = "El numeroChasis no puede estar vacío")
    val numeroChasis: String,
    @Email(message = "El marca debe ser válido")
    val marca : String,
    @NotEmpty(message = "El modelo no puede estar vacío")
    val modelo: String,
    @NotEmpty(message = "La color no puede estar vacío")
    val color : String,
    @NotEmpty(message = "El capacidad no puede estar vacío")
    val capacidad: String,
    @NotEmpty(message = "El coste debe ser válido")
    val coste : String,

)
