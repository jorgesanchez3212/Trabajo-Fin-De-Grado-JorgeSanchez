package com.example.backendautomoviles.dto


data class ContactoCreateDto(
    val descripcion : String,
    val idCliente : String,
) {
}


data class ContactoDto(
    val id: String,
    val descripcion : String,
    val idCliente : String,
){}


data class ContactoUpdateDto(
    val id: String,
    val descripcion : String,
    val idCliente : String,
){}
