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
        // Buscar reservas que están dentro del rango de fechas
        val reservas = reservasRepository.findByFechaInicioLessThanEqualAndFechaFinalGreaterThanEqual(fechaInicio, fechaFinal).toList()

        // Extraer IDs de los automóviles reservados
        val automovilesReservadosIds = reservas.map { it.automovilId }.toSet()

        // Buscar automóviles que no están reservados
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
        // Convertir capacidad de String a Int, manejando posibles errores de conversión
        val capacidad = capacidad?.toIntOrNull()

        // Buscar reservas que están dentro del rango de fechas
        val reservas = reservasRepository.findByFechaInicioLessThanEqualAndFechaFinalGreaterThanEqual(fechaInicio, fechaFinal).toList()

        // Extraer IDs de los automóviles reservados
        val automovilesReservadosIds = reservas.map { it.automovilId }.toSet()

        // Buscar automóviles que no están reservados y aplicar filtros adicionales
        return repository.findAll()
            .filterNot { automovilesReservadosIds.contains(it.id) }
            .filter { it.tipo.equals(tipoAutomovil, ignoreCase = true) }
            .filter { capacidad == null || it.capacidad == capacidad }
            .filter { marca == null || it.marca.equals(marca, ignoreCase = true) }
            .filter { color == null || it.color.equals(color, ignoreCase = true) }
            .toList()
    }


    suspend fun findAllFiltros(automovilFilter: AutomovilFilter) = withContext(Dispatchers.IO) {
        var listaFiltros = repository.findAll().toList()

        automovilFilter.numeroChasis?.let {
            listaFiltros = listaFiltros.filter { it.numeroChasis == automovilFilter.numeroChasis }
        }

        automovilFilter.marca?.let {
            listaFiltros = listaFiltros.filter { it.marca == automovilFilter.marca }
        }

        automovilFilter.modelo?.let {
            listaFiltros = listaFiltros.filter { it.modelo == automovilFilter.modelo }
        }

        automovilFilter.capacidad?.let {
            listaFiltros = listaFiltros.filter { it.capacidad == automovilFilter.capacidad }
        }

        automovilFilter.coste?.let {
            listaFiltros = listaFiltros.filter { it.coste == automovilFilter.coste }
        }

        automovilFilter.tipo?.let {
            listaFiltros = listaFiltros.filter { it.tipo == automovilFilter.tipo }
        }

        return@withContext listaFiltros
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