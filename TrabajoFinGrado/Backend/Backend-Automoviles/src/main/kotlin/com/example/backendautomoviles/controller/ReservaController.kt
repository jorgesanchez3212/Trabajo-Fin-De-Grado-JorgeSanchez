package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.ReservaCreateDto
import com.example.backendautomoviles.dto.ReservaDto
import com.example.backendautomoviles.dto.ReservaUpdateDto
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

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/listaReservas")
    suspend fun listaReservas() : ResponseEntity<List<ReservaDto>> {
        logger.info { "Obteniendo lista de todos las reservas"}
        return ResponseEntity.ok(reservasService.findAll().toList().map { it.toDto() })
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newReserva")
    suspend fun new(@Valid @RequestBody reservaDto: ReservaCreateDto): ResponseEntity<ReservaCreateDto> {
        logger.info { "Creacion de  la reserva con uuid: ${reservaDto}" }
        val reserva = reservaDto.validate().toModel()
        reservasService.save(reserva)
        return ResponseEntity.ok(reservaDto)
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/update")
    suspend fun updateReserva(
        @Valid @RequestBody reservaDto: ReservaUpdateDto
    ): Any {
        logger.info { "Actualizando reserva: ${reservaDto.uuid}" }
        val reservaExist : Reserva? = reservasService.loadReservaByUUID(reservaDto.uuid!!).firstOrNull()
        if (reservaExist != null) {
            reservaDto.validate()

            var reservaUpdate = reservaExist.copy(
                clienteId = reservaDto.clienteId,
                automovilId = reservaDto.cocheId,
                fechaInicio = LocalDate.parse(reservaDto.fechaInicio),
                fechaFinal = LocalDate.parse(reservaDto.fechaFin),
                costo = reservaDto.costo.toDouble()
            )
            reservasService.update(reservaUpdate)
            return ResponseEntity.ok(reservaUpdate.toDto())

        }else{
            return ResponseEntity.badRequest()

        }
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{id}")
    suspend fun delete(@PathVariable id : String): ResponseEntity<ReservaDto> {
        logger.info { "Borrar reserva con uuid: $id" }
        val reservas = reservasService.loadReservaById(id)
        reservasService.delete(id)
        return ResponseEntity.ok(reservas.toDto())
    }
}