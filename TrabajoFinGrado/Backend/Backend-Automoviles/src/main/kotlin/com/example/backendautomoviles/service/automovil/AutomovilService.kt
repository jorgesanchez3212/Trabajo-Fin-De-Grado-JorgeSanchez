package com.example.backendautomoviles.service.automovil


import com.example.backendautomoviles.exceptions.AutomovilesBadRequestException
import com.example.backendautomoviles.exceptions.AutomovilesNotFoundException
import com.example.backendautomoviles.filters.AutomovilFilter
import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.repositories.AutomovilesRepository
import com.example.backendautomoviles.repositories.ReservasRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.filterNot
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.time.LocalDate

private val logger = KotlinLogging.logger {}

@Service
class AutomovilService
@Autowired constructor(
    private val repository : AutomovilesRepository,
    private val reservasRepository: ReservasRepository
){
    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }


    suspend fun buscarAutomovilesDisponibles(fechaInicio: LocalDate, fechaFinal: LocalDate, tipoAutomovil : String): List<Automovil> {
        val reservas = reservasRepository.findByFechaInicioLessThanEqualAndFechaFinalGreaterThanEqual(fechaInicio, fechaFinal).toList()

        val automovilesReservadosIds = reservas.map { it.automovilId }.toSet()

        return repository.findAll().filterNot { automovilesReservadosIds.contains(it.id) }
            .filter { it.tipo.equals(tipoAutomovil, ignoreCase = true) }
            .toList()
    }


    suspend fun buscarAutomovilesDisponiblesFiltros(
        fechaInicio: LocalDate,
        fechaFinal: LocalDate,
        tipoAutomovil: String,
        capacidad: String?,
        marca: String?,
        color: String?
    ): List<Automovil> {
        val capacidad = capacidad?.toIntOrNull()

        val reservas = reservasRepository.findByFechaInicioLessThanEqualAndFechaFinalGreaterThanEqual(fechaInicio, fechaFinal).toList()

        val automovilesReservadosIds = reservas.map { it.automovilId }.toSet()

        return repository.findAll()
            .filterNot { automovilesReservadosIds.contains(it.id) }
            .filter { it.tipo.equals(tipoAutomovil, ignoreCase = true) }
            .filter { capacidad == null || it.capacidad == capacidad }
            .filter { marca == null || it.marca.equals(marca, ignoreCase = true) }
            .filter { color == null || it.color.equals(color, ignoreCase = true) }
            .toList()
    }


    suspend fun findAllFiltros(automovilFilter: AutomovilFilter) :List<Automovil> {
        println(automovilFilter)
        return repository.findAll()
            .filter { automovilFilter.numeroChasis == null || it.numeroChasis == automovilFilter.numeroChasis }
            .filter { automovilFilter.capacidad == null || it.capacidad == automovilFilter.capacidad }
            .filter { automovilFilter.marca == null || it.marca.equals(automovilFilter.marca, ignoreCase = true) }
            .filter { automovilFilter.color == null || it.color.equals(automovilFilter.color, ignoreCase = true) }.toList()
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

        try {
            return@withContext repository.save(automovil)
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