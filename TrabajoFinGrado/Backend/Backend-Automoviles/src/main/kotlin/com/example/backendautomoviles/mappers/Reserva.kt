package com.example.backendautomoviles.mappers

import com.example.backendautomoviles.dto.AutomovilCreateDto
import com.example.backendautomoviles.dto.AutomovilDto
import com.example.backendautomoviles.dto.ReservaCreateDto
import com.example.backendautomoviles.dto.ReservaDto
import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.models.Reserva
import java.time.LocalDate

fun Reserva.toDto() : ReservaDto {
    return ReservaDto(
            uuid = this.uuid,
            automovilId = this.automovilId,
            clienteId = this.clienteId,
            fechaInicio = this.fechaInicio.toString(),
            fechaFin = this.fechaFinal.toString(),
            costo = this.costo.toString(),
            recogidoPorCliente = this.recogidoPorCliente,
            metadata = ReservaDto.MetaData(
                    createdAt = this.createdAt,
                    updatedAt = this.updatedAt,
                    deleted = this.deleted
            )
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
    )

}