package com.example.backendautomoviles.dto


data class TiendaCreateDto(
    val nombre : String,
    val idMapa : String,
) {
}

data class TiendaDto(
    val uuid: String,
    val nombre : String,
    val idMapa : String,
) {
}
data class TiendaUpdateDto(
    val nombre : String,
    val idMapa : String,
) {
}