package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.AutomovilCreateDto
import com.example.backendautomoviles.dto.AutomovilDto
import com.example.backendautomoviles.dto.AutomovilUpdateDto
import com.example.backendautomoviles.dto.UsuarioDto
import com.example.backendautomoviles.filters.AutomovilFilter
import com.example.backendautomoviles.filters.UsuarioFilter
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.models.Usuario
import com.example.backendautomoviles.service.automovil.AutomovilService
import com.example.backendautomoviles.validators.validate
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping(APIConfig.API_PATH + "/automoviles")
class AutomovilController
@Autowired constructor(
    private val service: AutomovilService,
    ){


    @GetMapping("/listaAutomoviles")
    suspend fun listaAutomoviles() : ResponseEntity<List<AutomovilDto>>{
        logger.info { "Obteniendo lista de todos los automoviles"}
        return ResponseEntity.ok(service.findAll().toList().map { it.toDto() })
    }


    @PostMapping("/listaAutomovilesFiltro")
    suspend fun listaAutomovilesFiltro(automovilFilter: AutomovilFilter) : ResponseEntity<List<AutomovilDto>>{
        logger.info { "Obteniendo lista de todos los automoviles"}
        return ResponseEntity.ok(service.findAllFiltros(automovilFilter).toList().map { it.toDto() })
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newAutomovil")
    suspend fun new(@Valid @RequestBody automovilDto: AutomovilCreateDto): ResponseEntity<AutomovilCreateDto> {
        logger.info { "Creacion de automovil: ${automovilDto.numeroChasis}" }
        //val automovil = automovilDto.validate().toModel()
        println(automovilDto)
        println(automovilDto.toModel())
        val automovilSaved = service.save(automovilDto.toModel())
        return ResponseEntity.ok(automovilDto)
    }



    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/update")
    suspend fun updateMe(@Valid @RequestBody automovilDto: AutomovilUpdateDto): Any {
        logger.info { "Actualizando automovil con numero de chasis: ${automovilDto.numeroChasis}" }

        val automovilExist : Automovil? = service.loadAutomovilByNumeroChasis(automovilDto.numeroChasis!!)
        if (automovilExist != null) {
            automovilDto.validate()

            var automovilUpdated = automovilExist.copy(
                numeroChasis = automovilDto.numeroChasis,
                marca = automovilDto.marca,
                modelo = automovilDto.modelo,
                color = automovilDto.color,
                capacidad = automovilDto.capacidad.toInt(),
                coste = automovilDto.coste.toDouble(),
            )
            service.update(automovilUpdated)
            return ResponseEntity.ok(automovilUpdated.toDto())

        }else{
            return ResponseEntity.badRequest()

        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/find/{id}")
    suspend fun findById(@PathVariable id : String) : ResponseEntity<AutomovilDto>{
        logger.info { "Buscando usuario con id ${id}"}
        val auto = service.loadAutomovilById(id)
        return ResponseEntity.ok(auto?.toDto())
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