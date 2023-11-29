package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Mapa
import com.example.backendautomoviles.models.Tienda
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TiendasRepository : CoroutineCrudRepository<Tienda, String>{
    fun findByUuid(uuid: String): Flow<Tienda>
    fun findByNombre(nombre:String): Flow<Tienda>
}