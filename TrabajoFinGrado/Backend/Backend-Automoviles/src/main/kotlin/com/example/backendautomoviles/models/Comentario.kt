package com.example.backendautomoviles.models

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.*


@Document("comentarios")
data class Comentario (
    @Id
    val id : String = ObjectId.get().toString(),
    val uuid: String = UUID.randomUUID().toString(),
    val descripcion : String,
    val idUser : String,
    val idAutomovil : String,
    val createdAt : LocalDateTime,
    val deleted : Boolean = false
){
}