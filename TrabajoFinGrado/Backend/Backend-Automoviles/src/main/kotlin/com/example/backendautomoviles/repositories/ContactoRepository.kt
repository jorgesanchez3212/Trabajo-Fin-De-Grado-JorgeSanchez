package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Contacto
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ContactoRepository : CoroutineCrudRepository<Contacto, String> {
    fun findAllByIdCliente(idCliente: String): Flow<Contacto>
}