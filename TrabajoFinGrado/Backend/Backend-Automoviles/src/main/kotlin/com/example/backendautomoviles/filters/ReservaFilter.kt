package com.example.backendautomoviles.filters


data class ReservaFilter(
    val id : String?,
    val clienteId : String?,
    val automovilId : String?,
    val fechaInicio : String?,
    val fechaFin : String?,
    val costo : Double?,
    val recogidoPorCliente : Boolean?,
) {
}