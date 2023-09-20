package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Usuario
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UsuariosRepository : CoroutineCrudRepository<Usuario,String> {
    fun findByUuid(uuid: UUID): Flow<Usuario>
    fun findByUsername(username: String): Flow<Usuario>
    fun findByEmail(email: String): Flow<Usuario>
}