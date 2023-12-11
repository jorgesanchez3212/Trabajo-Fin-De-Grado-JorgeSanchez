package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Automovil
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository
import java.awt.Color
import java.util.*
import kotlin.collections.List

@Repository
interface AutomovilesRepository : CoroutineCrudRepository<Automovil, String> {
    fun findByUuid(uuid: UUID): Flow<Automovil>
    fun findByNumeroChasis(numeroChasis: String): Flow<Automovil>
    fun findByMarca(marca: String): Flow<List<Automovil>>
    fun findByColor(color: String): Flow<List<Automovil>>
    fun findAllByTipo(tipo: String): Flow<Automovil>



}