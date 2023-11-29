package com.example.backendautomoviles.service.mapa

import com.example.backendautomoviles.exceptions.MapasBadRequestException
import com.example.backendautomoviles.exceptions.MapasNotFoundException
import com.example.backendautomoviles.models.Mapa
import com.example.backendautomoviles.repositories.MapasRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

private val logger = KotlinLogging.logger {}


@Service
class MapaService
@Autowired constructor(
    private val repository : MapasRepository
) {

    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }

    @Cacheable("mapas")
    suspend fun loadMapasById(mapaId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(mapaId)
            ?: throw MapasBadRequestException("No se ha encontrado el mapa con el id $mapaId")

    }

    @Cacheable("mapas")
    suspend fun loadMapaByUUID(uuid: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findByUuid(uuid).firstOrNull()
            ?: throw MapasBadRequestException("No se ha encontrado el mapa con el uuid $uuid")

    }


    suspend fun save(mapa: Mapa): Mapa = withContext(Dispatchers.IO) {
        logger.info { "Guardando mapa: $mapa" }

        println(mapa)
        try {
            return@withContext repository.save(mapa)
        } catch (e: Exception) {
            throw MapasBadRequestException("Error al crear el mapa")
        }
    }

//TODO: Arreglar
//    suspend fun update(mapa: Mapa): Mapa = withContext(Dispatchers.IO) {
//        logger.info { "Actualizando mapa: $mapa" }
//
//        val comentarioFind = repository.findByUuid(comentario.uuid).firstOrNull()
//            ?: throw ComentariosNotFoundException("Error al actualizar el comentario, el comentario a actualizar no existe")
//
//        try {
//            return@withContext repository.save(comentarioFind)
//        } catch (e: Exception) {
//            throw MapasBadRequestException("Error al actualizar el automovil")
//        }
//    }


    suspend fun delete(uuid: String) = withContext(Dispatchers.IO) {
        logger.info { "Borrando mapa con uuid: $uuid" }

        val mapaDelete = repository.findByUuid(uuid).firstOrNull()
            ?: throw MapasNotFoundException("Error al borrar el mapa, el mapa con uuid : $uuid no existe")

        try {
            repository.delete(mapaDelete)

        } catch (e: Exception) {
            throw MapasBadRequestException("Error al borrar el mapa")
        }
    }
}
