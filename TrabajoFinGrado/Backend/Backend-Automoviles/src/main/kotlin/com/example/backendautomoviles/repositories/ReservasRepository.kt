package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.models.Reserva
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.time.LocalDate
import java.util.*

interface ReservasRepository : CoroutineCrudRepository<Reserva, String> {
    fun findByUuid(uuid: String): Flow<Reserva>
    fun findAllByFechaInicioBeforeAndFechaFinalAfter(fechaInicio : LocalDate, fechaFin : LocalDate): Flow<Reserva>
    fun findAllByFechaInicioBefore(fechaInicio: LocalDate) : Flow<Reserva>
    fun findAllByFechaFinalAfter(fechaFin: LocalDate) : Flow<Reserva>



}