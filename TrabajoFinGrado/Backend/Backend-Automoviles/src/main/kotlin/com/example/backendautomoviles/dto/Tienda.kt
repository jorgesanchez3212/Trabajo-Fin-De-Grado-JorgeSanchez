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
    val uuid: String? = null,
    val nombre : String,
    val idMapa : String,
) {
}