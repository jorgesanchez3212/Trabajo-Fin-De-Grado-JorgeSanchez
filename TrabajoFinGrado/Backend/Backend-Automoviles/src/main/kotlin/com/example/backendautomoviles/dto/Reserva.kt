package com.example.backendautomoviles.dto

import com.example.backendautomoviles.models.Automovil
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty
import java.time.LocalDateTime
import java.util.*

data class ReservaCreateDto(
        val clienteId: String,
        val automovilId : String,
        val fechaInicio : String,
        val fechaFin : String,
        val recogidoPorCliente : Boolean,
        val costo : String
){}


data class ReservaDto(
        val id: String? = null,
        val automovilId:String,
        val clienteId: String,
        val fechaInicio : String,
        val fechaFin : String,
        val costo : String,
        val recogidoPorCliente : Boolean,


) {
}

data class ReservaUpdateDto(
        val id: String? = null,
        @NotEmpty(message = "El clienteId no puede estar vacío")
        val clienteId: String,
        @Email(message = "El cocheId debe ser válido")
        val automovilId : String,
        @NotEmpty(message = "La fechaInicio no puede estar vacío")
        val fechaInicio: String,
        @NotEmpty(message = "La fechaFin no puede estar vacío")
        val fechaFin : String,
        val recogidoPorCliente : Boolean,
        @NotEmpty(message = "El costo no puede estar vacío")
        val costo : String,
        )


