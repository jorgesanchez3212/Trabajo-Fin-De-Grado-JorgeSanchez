package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.models.Reserva
import kotlinx.coroutines.flow.Flow
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.data.repository.query.Param
import java.time.LocalDate
import java.util.*

interface ReservasRepository : CoroutineCrudRepository<Reserva, String> {
    fun findByUuid(uuid: String): Flow<Reserva>
    fun findAllByFechaInicioAfter(fechaInicio: LocalDate) : Flow<Reserva>
    fun findAllByFechaFinalBefore(fechaFin: LocalDate) : Flow<Reserva>
    fun findAllByClienteId(clienteId : String): Flow<Reserva>

    fun findAllByFechaInicioBetween(fechaInicio : LocalDate, fechaFin : LocalDate): Flow<Reserva>

    @Query("{ 'fechaInicio' : { \$gte : ?0 }, 'fechaFinal' : { \$lte : ?1 } }")
    fun findAllByFechaInicioBetweenAndFechaFinalAfter(
        @Param("fechaInicio") fechaInicio: LocalDate,
        @Param("fechaFin") fechaFin: LocalDate
    ): Flow<Reserva>

    fun findByFechaInicioLessThanEqualAndFechaFinalGreaterThanEqual(fechaFinal: LocalDate, fechaInicio: LocalDate): Flow<Reserva>




}