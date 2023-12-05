package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.AutomovilDto
import com.example.backendautomoviles.dto.ReservaCreateDto
import com.example.backendautomoviles.dto.ReservaDto
import com.example.backendautomoviles.dto.ReservaUpdateDto
import com.example.backendautomoviles.filters.ReservaFilter
import com.example.backendautomoviles.filters.UsuarioFilter
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.models.Reserva
import com.example.backendautomoviles.service.reserva.ReservaService
import com.example.backendautomoviles.validators.validate
import jakarta.validation.Valid
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping(APIConfig.API_PATH + "/reservas")
class ReservaController@Autowired constructor(
        private val reservasService: ReservaService,
){

    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/listaReservas")
    suspend fun listaReservas() : ResponseEntity<List<ReservaDto>> {
        logger.info { "Obteniendo lista de todos las reservas"}
        return ResponseEntity.ok(reservasService.findAll().toList().map { it.toDto() })
    }

    @GetMapping("/listaReservasByClienteId/{id}")
    suspend fun findReservasByClienteId(@PathVariable id : String) : ResponseEntity<List<ReservaDto>>{
        logger.info { "Buscando reserva con el  id del cliente ${id}"}
        return ResponseEntity.ok(reservasService.findAllByCliente(id).toList().map { it.toDto() })

    }


    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/listaReservasFiltro")
    suspend fun listaReservasFiltro(@Valid @RequestBody reservaFilter: ReservaFilter) : ResponseEntity<List<ReservaDto>> {
        logger.info { "Obteniendo lista de todos las reservas con filtro"}
        return ResponseEntity.ok(reservasService.findAllFiltros(reservaFilter).toList().map { it.toDto() })

    }


    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newReserva")
    suspend fun new(@Valid @RequestBody reservaDto: ReservaCreateDto): ResponseEntity<ReservaCreateDto> {
        logger.info { "Creacion de  la reserva con uuid: ${reservaDto}" }
        val reserva = reservaDto.validate().toModel()
        reservasService.save(reserva)
        return ResponseEntity.ok(reservaDto)
    }


    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/update")
    suspend fun updateReserva(
        @Valid @RequestBody reservaDto: ReservaUpdateDto
    ): Any {
        logger.info { "Actualizando reserva: ${reservaDto.id}" }
        println(reservaDto)
        val reservaExist : Reserva? = reservasService.loadReservaById(reservaDto.id!!)
        if (reservaExist != null) {
            reservaDto.validate()

            var reservaUpdate = reservaExist.copy(
                clienteId = reservaDto.clienteId,
                automovilId = reservaDto.automovilId,
                fechaInicio = LocalDate.parse(reservaDto.fechaInicio),
                fechaFinal = LocalDate.parse(reservaDto.fechaFin),
                recogidoPorCliente = reservaDto.recogidoPorCliente,
                costo = reservaDto.costo.toDouble()
            )
            println("Update Controlador $reservaUpdate")
            reservasService.update(reservaUpdate)
            return ResponseEntity.ok(reservaUpdate.toDto())

        }else{
            return ResponseEntity.badRequest()

        }
    }


    @GetMapping("/find/{id}")
    suspend fun findById(@PathVariable id : String) : ResponseEntity<ReservaDto>{
        logger.info { "Buscando reserva con id ${id}"}
        val reserva = reservasService.loadReservaById(id)
        return ResponseEntity.ok(reserva?.toDto())
    }


    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{id}")
    suspend fun delete(@PathVariable id : String): ResponseEntity<String> {
        logger.info { "Borrar reserva con id: $id" }
        //val reservas = reservasService.loadReservaById(id)
        //println(reservas)
        reservasService.delete(id)
        return ResponseEntity.ok("reserva borrada")
    }
}