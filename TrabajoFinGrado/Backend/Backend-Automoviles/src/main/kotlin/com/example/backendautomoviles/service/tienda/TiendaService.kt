package com.example.backendautomoviles.service.tienda

import com.example.backendautomoviles.exceptions.AutomovilesBadRequestException
import com.example.backendautomoviles.exceptions.TiendasBadRequestException
import com.example.backendautomoviles.exceptions.TiendasNotFoundException
import com.example.backendautomoviles.models.Tienda
import com.example.backendautomoviles.repositories.TiendasRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

private val logger = KotlinLogging.logger {}


@Service
class TiendaService
@Autowired constructor(
    private val repository : TiendasRepository
) {

    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }

    @Cacheable("tiendas")
    suspend fun loadTiendasById(tiendaId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(tiendaId)
            ?: throw TiendasBadRequestException("No se ha encontrado la tienda con el id $tiendaId")

    }

    @Cacheable("tiendas")
    suspend fun loadTiendasByUUID(uuid: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findByUuid(uuid).firstOrNull()
            ?: throw TiendasBadRequestException("No se ha encontrado la tienda con el uuid $uuid")

    }


    suspend fun save(tienda: Tienda): Tienda = withContext(Dispatchers.IO) {
        logger.info { "Guardando tienda: $tienda" }

        println(tienda)
        try {
            return@withContext repository.save(tienda)
        } catch (e: Exception) {
            throw TiendasBadRequestException("Error al crear la tienda")
        }
    }

    suspend fun update(tienda: Tienda): Tienda = withContext(Dispatchers.IO) {

        try {
            return@withContext repository.save(tienda)
        } catch (e: Exception) {
            throw AutomovilesBadRequestException("Error al actualizar la tienda")
        }
    }


    suspend fun delete(uuid: String) = withContext(Dispatchers.IO) {
        logger.info { "Borrando tienda con uuid: $uuid" }

        val tiendaDelete = repository.findByUuid(uuid).firstOrNull()
            ?: throw TiendasNotFoundException("Error al borrar la tienda, la tienda con uuid : $uuid no existe")

        try {
            repository.delete(tiendaDelete)

        } catch (e: Exception) {
            throw TiendasBadRequestException("Error al borrar la tienda")
        }
    }

}