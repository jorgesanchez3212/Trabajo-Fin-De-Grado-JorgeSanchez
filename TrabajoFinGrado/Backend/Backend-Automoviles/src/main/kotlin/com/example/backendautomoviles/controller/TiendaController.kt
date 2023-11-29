package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.TiendaCreateDto
import com.example.backendautomoviles.dto.TiendaDto
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.service.tienda.TiendaService
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*


private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping(APIConfig.API_PATH + "/tiendas")
class TiendaController
@Autowired constructor(
    private val service: TiendaService,
){



    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/listaTiendas")
    suspend fun listaComentarios() : ResponseEntity<List<TiendaDto>> {
        logger.info { "Obteniendo lista de todos las tiendas"}
        return ResponseEntity.ok(service.findAll().toList().map { it.toDto() })
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newTiendas")
    suspend fun new(@Valid @RequestBody entityDto: TiendaCreateDto): ResponseEntity<TiendaCreateDto> {
        logger.info { "Creacion de tienda: ${entityDto}" }
        val entity = service.save(entityDto.toModel())
        return ResponseEntity.ok(entityDto)
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{uuid}")
    suspend fun delete(@PathVariable uuid : String): ResponseEntity<TiendaDto> {
        logger.info { "Borrar tienda con uuid: $uuid" }
        val entity = service.loadTiendasByUUID(uuid)
        service.delete(entity.uuid)
        return ResponseEntity.ok(entity.toDto())
    }
}