package com.example.backendautomoviles.service.contacto

import com.example.backendautomoviles.exceptions.ComentariosBadRequestException
import com.example.backendautomoviles.exceptions.ComentariosNotFoundException
import com.example.backendautomoviles.models.Contacto
import com.example.backendautomoviles.repositories.ContactoRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

private val logger = KotlinLogging.logger {}

@Service
class ContactoService@Autowired constructor(
    private val repository : ContactoRepository
) {
    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }

    @Cacheable("contactos")
    suspend fun loadContactoById(id: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(id)
            ?: throw ComentariosNotFoundException("No se ha encontrado el contacto con el id $id")

    }

    suspend fun findAllByCliente(id: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findAllByIdCliente(id)
    }




    suspend fun save(contacto: Contacto): Contacto = withContext(Dispatchers.IO) {
        logger.info { "Guardando contacto: $contacto" }

        println(contacto)
        try {
            return@withContext repository.save(contacto)
        } catch (e: Exception) {
            throw ComentariosBadRequestException("Error al crear el contacto")
        }
    }

    suspend fun update(contacto: Contacto): Contacto = withContext(Dispatchers.IO) {
        try {
            return@withContext repository.save(contacto)
        } catch (e: Exception) {
            throw ComentariosBadRequestException("Error al actualizar el contacto")
        }
    }


    suspend fun delete(id : String) = withContext(Dispatchers.IO){
        logger.info { "Borrando contacto con id: $id" }

        val comentarioDelete = repository.findById(id)
            ?: throw ComentariosNotFoundException("Error al borrar el contacto, el contacto con id : $id no existe")

        try {
            repository.delete(comentarioDelete)

        }catch (e: Exception) {
            throw ComentariosBadRequestException("Error al borrar el contacto")
        }
    }

}