package com.example.backendautomoviles.dto

import java.util.*

data class MapaCreateDto(
    val latidud : String,
    val longitud : String
) {
}

data class MapaDto(
    val uuid: String = UUID.randomUUID().toString(),
    val latidud : String,
    val longitud : String
) {
}


data class MapaUpdateDto(
    val latidud : String,
    val longitud : String
) {
}