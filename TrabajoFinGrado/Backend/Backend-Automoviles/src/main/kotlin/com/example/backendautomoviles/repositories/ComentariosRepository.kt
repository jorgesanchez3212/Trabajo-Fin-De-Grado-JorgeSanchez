package com.example.backendautomoviles.repositories

import com.example.backendautomoviles.models.Comentario
import kotlinx.coroutines.flow.Flow
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ComentariosRepository : CoroutineCrudRepository<Comentario, String> {
    fun findByUuid(uuid: String): Flow<Comentario>
    fun findByIdUserAndIdAutomovil(idUser: String, idAutomovil:String): Flow<List<Comentario>>
    fun findByIdUser(idUser: String): Flow<List<Comentario>>
    fun findAllByIdUser(idUser: String) : Flow<Comentario>
    fun findAllByIdAutomovil(idAutomovil: String) : Flow<Comentario>
}