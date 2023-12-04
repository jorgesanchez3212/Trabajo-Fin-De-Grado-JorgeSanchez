package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.ReservaCreateDto
import com.example.backendautomoviles.dto.ReservaDto
import com.example.backendautomoviles.models.Reserva
import java.time.LocalDate
import java.time.LocalDateTime

fun Reserva.toDto() : ReservaDto {
    return ReservaDto(
            id = this.id,
            automovilId = this.automovilId,
            clienteId = this.clienteId,
            fechaInicio = this.fechaInicio.toString(),
            fechaFin = this.fechaFinal.toString(),
            costo = this.costo.toString(),
            recogidoPorCliente = this.recogidoPorCliente,
    )

}

fun ReservaCreateDto.toModel() : Reserva{
    return Reserva(
            automovilId = this.automovilId,
            clienteId = this.clienteId,
            fechaInicio = LocalDate.parse(this.fechaInicio),
            fechaFinal = LocalDate.parse(this.fechaFin),
            recogidoPorCliente = this.recogidoPorCliente,
            costo = this.costo.toDouble(),
            createdAt = LocalDateTime.now(),
            deleted = false
    )

}