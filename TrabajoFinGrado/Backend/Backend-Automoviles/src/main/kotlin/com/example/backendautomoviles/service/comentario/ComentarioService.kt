package com.example.backendautomoviles.service.comentario


import com.example.backendautomoviles.exceptions.AutomovilesBadRequestException
import com.example.backendautomoviles.exceptions.ComentariosBadRequestException
import com.example.backendautomoviles.exceptions.ComentariosNotFoundException
import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.models.Comentario
import com.example.backendautomoviles.repositories.ComentariosRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service


private val logger = KotlinLogging.logger {}

@Service
class ComentarioService
@Autowired constructor(
    private val repository : ComentariosRepository
){


    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }

    @Cacheable("comentarios")
    suspend fun loadComentarioById(comentarioId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(comentarioId)
            ?: throw ComentariosNotFoundException("No se ha encontrado el comentario con el id $comentarioId")

    }

    suspend fun findAllByCliente(id: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findAllByIdUser(id)
    }

    @Cacheable("comentarios")
    suspend fun loadComentarioByUUID(uuid: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findByUuid(uuid).firstOrNull()
            ?: throw ComentariosNotFoundException("No se ha encontrado el comentario con el uuid $uuid")

    }


    suspend fun save(comentario: Comentario): Comentario = withContext(Dispatchers.IO) {
        logger.info { "Guardando comentario: $comentario" }

        println(comentario)
        try {
            return@withContext repository.save(comentario)
        } catch (e: Exception) {
            throw ComentariosBadRequestException("Error al crear el comentario")
        }
    }

    suspend fun update(comentario: Comentario): Comentario = withContext(Dispatchers.IO) {
        try {
            return@withContext repository.save(comentario)
        } catch (e: Exception) {
            throw ComentariosBadRequestException("Error al actualizar el comentario")
        }
    }


    suspend fun delete(id : String) = withContext(Dispatchers.IO){
        logger.info { "Borrando comentario con id: $id" }

        val comentarioDelete = repository.findById(id)
            ?: throw ComentariosNotFoundException("Error al borrar el comentario, el comentario con id : $id no existe")

        try {
            repository.delete(comentarioDelete)

        }catch (e: Exception) {
            throw ComentariosBadRequestException("Error al borrar el comentario")
        }
    }


}