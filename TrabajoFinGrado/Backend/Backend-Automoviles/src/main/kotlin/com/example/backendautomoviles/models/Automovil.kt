package com.example.backendautomoviles.models

import kotlinx.serialization.Serializable
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.*


@Document("automoviles")
data class Automovil(
    @Id
    val id : String = ObjectId.get().toString(),
    val uuid: String = UUID.randomUUID().toString(),
    val numeroChasis : String,
    val marca : String,
    val modelo : String,
    val color : String,
    val capacidad : Int,
    val coste : Double,
    val tipo : String = TipoAutomovil.COCHE.name,
    val image: String?,
    val reservas : List<String>?,
    val deleted: Boolean = false,
) {
    enum class TipoAutomovil{
        COCHE, FURGONETA, CAMION, MOTO
    }
}