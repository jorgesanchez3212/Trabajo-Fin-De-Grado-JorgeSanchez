package com.example.backendautomoviles.filters


class ReservaFilter(
    val id : String?,
    val clienteId : String?,
    val automovilId : String?,
    val fechaInicio : String?,
    val fechaFinal : String?,
    val costo : Double?,
    val recogidoPorCliente : Boolean?,
) {
}