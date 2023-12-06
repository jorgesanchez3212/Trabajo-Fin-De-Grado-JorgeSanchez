package com.example.backendautomoviles.models

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("contactos")
data class Contacto(
    @Id
    val id : String = ObjectId.get().toString(),
    val descripcion : String,
    val idCliente : String,
) {
}