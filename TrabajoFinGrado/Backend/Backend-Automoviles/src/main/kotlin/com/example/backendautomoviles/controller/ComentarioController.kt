package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.ComentarioCreateDto
import com.example.backendautomoviles.dto.ComentarioDto
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.service.comentario.ComentarioService
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

private val logger = KotlinLogging.logger {}


@RestController
@RequestMapping(APIConfig.API_PATH + "/comentarios")
class ComentarioController

@Autowired constructor(
    private val service: ComentarioService,
){

    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/listaComentarios")
    suspend fun listaComentarios() : ResponseEntity<List<ComentarioDto>> {
        logger.info { "Obteniendo lista de todos los comentarios"}
        return ResponseEntity.ok(service.findAll().toList().map { it.toDto() })
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newComentarios")
    suspend fun new(@Valid @RequestBody entityDto: ComentarioCreateDto): ResponseEntity<ComentarioCreateDto> {
        logger.info { "Creacion de comentario: ${entityDto}" }
        val entity = service.save(entityDto.toModel())
        return ResponseEntity.ok(entityDto)
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{uuid}")
    suspend fun delete(@PathVariable uuid : String): ResponseEntity<ComentarioDto> {
        logger.info { "Borrar automovil con uuid: $uuid" }
        val entity = service.loadComentarioByUUID(uuid)
        service.delete(entity.uuid)
        return ResponseEntity.ok(entity.toDto())
    }



}