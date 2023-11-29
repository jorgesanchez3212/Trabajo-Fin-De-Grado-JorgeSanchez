package com.example.backendautomoviles.models

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*


@Document("tiendas")
data class Tienda (
    @Id
    val id : String = ObjectId.get().toString(),
    val uuid: String = UUID.randomUUID().toString(),
    val nombre : String,
    val idMapa : String,
){
}