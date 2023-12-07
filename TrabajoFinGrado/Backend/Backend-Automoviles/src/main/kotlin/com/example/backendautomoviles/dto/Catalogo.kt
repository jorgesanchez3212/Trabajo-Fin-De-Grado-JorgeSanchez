package com.example.backendautomoviles.dto


data class CatalogoDto(
    val tipoAutomovil: String,
    val fechaInicio: String,
    val fechaFinal: String,
    val capacidad : String?,
    val marca:String?,
    val color: String?,
) {
}