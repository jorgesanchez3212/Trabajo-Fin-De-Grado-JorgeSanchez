package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.*
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.models.Mapa
import com.example.backendautomoviles.service.mapa.MapaService
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

private val logger = KotlinLogging.logger {}


@RestController
@RequestMapping(APIConfig.API_PATH + "/mapas")
class MapaController
@Autowired constructor(
    private val service: MapaService,
)
{



    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/listaMapas")
    suspend fun listaComentarios() : ResponseEntity<List<MapaDto>> {
        logger.info { "Obteniendo lista de todos las mapas"}
        return ResponseEntity.ok(service.findAll().toList().map { it.toDto() })
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newMapas")
    suspend fun new(@Valid @RequestBody entityDto: MapaCreateDto): ResponseEntity<MapaCreateDto> {
        logger.info { "Creacion de mapa: ${entityDto}" }
        val entity = service.save(entityDto.toModel())
        return ResponseEntity.ok(entityDto)
    }



    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/update")
    suspend fun updateMe(@Valid @RequestBody mapaDto: MapaUpdateDto): Any {
        logger.info { "Actualizando mapa con uuid: ${mapaDto.uuid}" }

        val mapaExists : Mapa? = service.loadMapaByUUID(mapaDto.uuid!!)
        if (mapaExists != null) {

            var mapaUpdated = mapaExists.copy(
                latidud = mapaDto.latidud,
                longitud = mapaDto.longitud
            )
            service.update(mapaUpdated)
            return ResponseEntity.ok(mapaUpdated.toDto())

        }else{
            return ResponseEntity.badRequest()

        }
    }








    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{uuid}")
    suspend fun delete(@PathVariable uuid : String): ResponseEntity<MapaDto> {
        logger.info { "Borrar mapa con uuid: $uuid" }
        val entity = service.loadMapaByUUID(uuid)
        service.delete(entity.uuid)
        return ResponseEntity.ok(entity.toDto())
    }
}