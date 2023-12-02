package com.example.backendautomoviles.service.reserva

import com.example.backendautomoviles.exceptions.AutomovilesBadRequestException
import com.example.backendautomoviles.exceptions.AutomovilesNotFoundException
import com.example.backendautomoviles.exceptions.ReservasBadRequestException
import com.example.backendautomoviles.exceptions.ReservasNotFoundException
import com.example.backendautomoviles.filters.ReservaFilter
import com.example.backendautomoviles.models.Reserva
import com.example.backendautomoviles.repositories.ReservasRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.withContext
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.time.LocalDateTime

private val logger = KotlinLogging.logger {}


@Service
class ReservaService @Autowired constructor(
        private val repository : ReservasRepository,
){
    suspend fun findAll() = withContext(Dispatchers.IO) {
        return@withContext repository.findAll()
    }



    suspend fun findAllFiltros(reservaFilter: ReservaFilter) = withContext(Dispatchers.IO) {
        var listaFiltros = repository.findAll().toList()

        reservaFilter.id?.let {
            listaFiltros = listaFiltros.filter { it.id == reservaFilter.id }
        }

        reservaFilter.clienteId?.let {
            listaFiltros = listaFiltros.filter { it.clienteId == reservaFilter.clienteId }
        }


        reservaFilter.automovilId?.let {
            listaFiltros = listaFiltros.filter { it.automovilId == reservaFilter.automovilId }
        }
        //TODO Arregar estos filtros no van a funcionar

        reservaFilter.fechaInicio?.let {
            listaFiltros = listaFiltros.filter { it.fechaInicio == reservaFilter.fechaInicio }
        }
        reservaFilter.fechaInicio?.let {
            listaFiltros = listaFiltros.filter { it.fechaFinal == reservaFilter.fechaFinal }
        }

        reservaFilter.costo?.let {
            listaFiltros = listaFiltros.filter { it.costo == reservaFilter.costo }
        }

        reservaFilter.recogidoPorCliente?.let {
            listaFiltros = listaFiltros.filter { it.recogidoPorCliente == reservaFilter.recogidoPorCliente }
        }


        return@withContext listaFiltros
    }









    @Cacheable("reservas")
    suspend fun loadReservaById(reservaId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findById(reservaId)
                ?: throw AutomovilesNotFoundException("No se ha encontrado la reserva con el id $reservaId")

    }

    @Cacheable("reservas")
    suspend fun loadReservaByUUID(reservaId: String) = withContext(Dispatchers.IO) {
        return@withContext repository.findByUuid(reservaId)

    }

    suspend fun save(reserva: Reserva): Reserva = withContext(Dispatchers.IO) {
        logger.info { "Guardando reserva: $reserva" }

        println(reserva)
        try {
            return@withContext repository.save(reserva)
        } catch (e: Exception) {
            throw ReservasBadRequestException("Error al crear la reserva")
        }
    }


    suspend fun update(reserva: Reserva): Reserva = withContext(Dispatchers.IO) {
        logger.info { "Actualizando reserva: $reserva" }

        val reservaFind = repository.findById(reserva.id)
                ?: throw ReservasNotFoundException("Error al actualizar la reserva, la reserva a actualizar no existe")
        val reservaUpdate = reservaFind.copy(
                updatedAt = LocalDateTime.now()
        )

        println(reserva)
        try {
            return@withContext repository.save(reservaUpdate)
        } catch (e: Exception) {
            throw AutomovilesBadRequestException("Error al actualizar la reserva")
        }
    }

    suspend fun delete(id : String) = withContext(Dispatchers.IO){
        logger.info { "Borrando reserva con numero de id: $id" }

        val reservaDelete = repository.findById(id)
                ?: throw ReservasNotFoundException("Error al borrar la reserva, la reserva con id : $id no existe")

        try {
            repository.delete(reservaDelete)

        }catch (e: Exception) {
            throw AutomovilesBadRequestException("Error al borrar la reserva")
        }
    }
}