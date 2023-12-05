package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Mapa
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface MapasRepository : CoroutineCrudRepository<Mapa, String>{
    fun findByUuid(uuid: String): Flow<Mapa>
    fun findByLatitudAndLongitud(latitud: String, longitud:String): Flow<Mapa>
}