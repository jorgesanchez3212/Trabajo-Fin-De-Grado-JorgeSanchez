package com.example.backendautomoviles.filters

import java.time.LocalDate

class ReservaFilter(
    val id : String,
    val clienteId : String,
    val automovilId : String,
    val fechaInicio : LocalDate,
    val fechaFinal : LocalDate,
    val costo : Double,
    val recogidoPorCliente : Boolean,
) {
}