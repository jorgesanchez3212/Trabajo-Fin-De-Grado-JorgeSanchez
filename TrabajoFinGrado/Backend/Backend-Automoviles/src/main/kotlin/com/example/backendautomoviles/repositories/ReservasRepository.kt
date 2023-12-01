package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.models.Reserva
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.util.*

interface ReservasRepository : CoroutineCrudRepository<Reserva, String> {
    fun findByUuid(uuid: String): Flow<Reserva>

}