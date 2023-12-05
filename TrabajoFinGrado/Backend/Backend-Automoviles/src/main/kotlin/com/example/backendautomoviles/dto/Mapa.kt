package com.example.backendautomoviles.dto

import java.util.*

data class MapaCreateDto(
    val id: String,
    val latitud : String,
    val longitud : String
) {
}

data class MapaDto(
    val id: String,
    val latitud : String,
    val longitud : String
) {
}


data class MapaUpdateDto(
    val id : String,
    val latitud : String,
    val longitud : String
) {
}