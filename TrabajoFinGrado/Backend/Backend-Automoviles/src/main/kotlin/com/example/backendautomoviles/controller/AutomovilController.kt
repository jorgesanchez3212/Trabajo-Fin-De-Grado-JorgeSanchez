package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.AutomovilCreateDto
import com.example.backendautomoviles.dto.AutomovilDto
import com.example.backendautomoviles.dto.AutomovilUpdateDto
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.service.automovil.AutomovilService
import com.example.backendautomoviles.validators.validate
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping(APIConfig.API_PATH + "/automoviles")
class AutomovilController
@Autowired constructor(
    private val service: AutomovilService,
    ){


    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/listaAutomoviles")
    suspend fun listaAutomoviles() : ResponseEntity<List<AutomovilDto>>{
        logger.info { "Obteniendo lista de todos los automoviles"}
        return ResponseEntity.ok(service.findAll().toList().map { it.toDto() })
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newAutomovil")
    suspend fun new(@Valid @RequestBody automovilDto: AutomovilCreateDto): ResponseEntity<AutomovilCreateDto> {
        logger.info { "Creacion de automovil: ${automovilDto.numeroChasis}" }
        val automovil = automovilDto.validate().toModel()
        val automovilSaved = service.save(automovil)
        return ResponseEntity.ok(automovilDto)
    }



    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/update/{numeroChasis}")
    suspend fun updateMe(@Valid @RequestBody automovilDto: AutomovilUpdateDto): ResponseEntity<AutomovilDto> {
        logger.info { "Actualizando automovil con numero de chasis: ${automovilDto.numeroChasis}" }

        automovilDto.validate()
        val automovil = service.loadAutomovilByNumeroChasis(automovilDto.numeroChasis )
        var automovilUpdated = automovil.copy(
                marca = automovilDto.marca,
                modelo = automovilDto.modelo,
                color = automovilDto.color,
                capacidad = automovilDto.capacidad.toInt(),
                coste = automovilDto.coste.toDouble()
        )

        automovilUpdated = service.update(automovilUpdated)
        return ResponseEntity.ok(automovilUpdated.toDto())
    }



    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{numeroChasis}")
    suspend fun delete(@PathVariable numeroChasis : String): ResponseEntity<AutomovilDto> {
        logger.info { "Borrar automovil con numeroChasis: $numeroChasis" }
        val automovil = service.loadAutomovilByNumeroChasis(numeroChasis)
        service.delete(numeroChasis)
        return ResponseEntity.ok(automovil.toDto())
    }


}