package com.example.backendautomoviles.models

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

@Document("reservas")
data class Reserva(
        @Id
        val id : String = ObjectId.get().toString(),
        val uuid: UUID = UUID.randomUUID(),
        val clienteId : String,
        val automovilId : String,
        val fechaInicio : LocalDate,
        val fechaFinal : LocalDate,
        val costo : Double,
        val createdAt: LocalDateTime = LocalDateTime.now(),
        val updatedAt: LocalDateTime = LocalDateTime.now(),
        val deleted: Boolean = false,
) {
}