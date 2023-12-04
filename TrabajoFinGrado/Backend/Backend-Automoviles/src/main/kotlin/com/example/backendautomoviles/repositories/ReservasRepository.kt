package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.models.Reserva
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.time.LocalDate
import java.util.*

interface ReservasRepository : CoroutineCrudRepository<Reserva, String> {
    fun findByUuid(uuid: String): Flow<Reserva>
    fun findAllByFechaInicioAfterAndFechaFinalBefore(fechaInicio : LocalDate, fechaFinal : LocalDate): List<Reserva>
    fun findAllByFechaInicioAfter(fechaInicio: LocalDate) : List<Reserva>
    fun findAllByFechaFinalBefore(fechaFinal: LocalDate) : List<Reserva>


}