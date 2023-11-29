package com.example.backendautomoviles.service.automovil


import com.example.backendautomoviles.exceptions.AutomovilesBadRequestException
import com.example.backendautomoviles.exceptions.AutomovilesNotFoundException
import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.repositories.AutomovilesRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.time.LocalDateTime

private val logger = KotlinLogging.logger {}

@Service
class AutomovilService
@Autowired constructor(
    private val repository : AutomovilesRepository,
){
    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }

    @Cacheable("automoviles")
    suspend fun loadAutomovilById(automovilId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(automovilId)
                ?: throw AutomovilesNotFoundException("No se ha encontrado el automovil con el id $automovilId")

    }

    @Cacheable("automoviles")
    suspend fun loadAutomovilByNumeroChasis(numeroChasis: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findByNumeroChasis(numeroChasis).firstOrNull()
                ?: throw AutomovilesNotFoundException("No se ha encontrado el automovil con el numero de chasis $numeroChasis")

    }


    suspend fun save(automovil: Automovil): Automovil = withContext(Dispatchers.IO) {
        logger.info { "Guardando automovil: $automovil" }

        println(automovil)
        try {
            return@withContext repository.save(automovil)
        } catch (e: Exception) {
            throw AutomovilesBadRequestException("Error al crear el automovil")
        }
    }

    suspend fun update(automovil: Automovil): Automovil = withContext(Dispatchers.IO) {
        logger.info { "Actualizando automovil: $automovil" }

        val automovilFind = repository.findByNumeroChasis(automovil.numeroChasis).firstOrNull()
            ?: throw AutomovilesNotFoundException("Error al actualizar el automovil, el automovil a actualizar no existe")
        val autoUpdate = automovilFind.copy(
            updatedAt = LocalDateTime.now()
        )

        println(automovil)
        try {
            return@withContext repository.save(autoUpdate)
        } catch (e: Exception) {
            throw AutomovilesBadRequestException("Error al actualizar el automovil")
        }
    }


    suspend fun delete(numeroChasis : String) = withContext(Dispatchers.IO){
        logger.info { "Borrando automovil con numero de chasis: $numeroChasis" }

        val automovilDelete = repository.findByNumeroChasis(numeroChasis).firstOrNull()
        ?: throw AutomovilesNotFoundException("Error al borrar el automovil, el automovil con numero de chasis : $numeroChasis no existe")

        try {
            repository.delete(automovilDelete)

        }catch (e: Exception) {
            throw AutomovilesBadRequestException("Error al borrar el automovil")
        }
    }



}