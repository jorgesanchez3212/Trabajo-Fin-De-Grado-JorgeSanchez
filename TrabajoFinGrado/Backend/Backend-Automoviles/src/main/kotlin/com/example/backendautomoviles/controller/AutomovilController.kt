package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.*
import com.example.backendautomoviles.filters.AutomovilFilter
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.models.Automovil
import com.example.backendautomoviles.service.automovil.AutomovilService
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping(APIConfig.API_PATH + "/automoviles")
class AutomovilController
@Autowired constructor(
    private val service: AutomovilService,
    ){


    @PostMapping("/catalogo")
    suspend fun listaAutomovilesCatalogo(@Valid @RequestBody catalogoDto: CatalogoDto) : ResponseEntity<List<AutomovilDto>>{
        logger.info { "Obteniendo lista de todos los automoviles $catalogoDto"}
        return ResponseEntity.ok(service.buscarAutomovilesDisponibles(LocalDate.parse(catalogoDto.fechaInicio), LocalDate.parse(catalogoDto.fechaFinal), catalogoDto.tipoAutomovil).map { it.toDto() })
    }

    @PostMapping("/catalogoFiltros")
    suspend fun listaAutomovilesCatalogoFiltros(@Valid @RequestBody catalogoDto: CatalogoDto) : ResponseEntity<List<AutomovilDto>>{
        logger.info { "Obteniendo lista de todos los automoviles $catalogoDto"}
        return ResponseEntity.ok(service.buscarAutomovilesDisponiblesFiltros(LocalDate.parse(catalogoDto.fechaInicio), LocalDate.parse(catalogoDto.fechaFinal), catalogoDto.tipoAutomovil, catalogoDto.capacidad, catalogoDto.marca,catalogoDto.color).map { it.toDto() })
    }

    @GetMapping("/listaAutomoviles")
    suspend fun listaAutomoviles() : ResponseEntity<List<AutomovilDto>>{
        logger.info { "Obteniendo lista de todos los automoviles"}
        return ResponseEntity.ok(service.findAll().toList().map { it.toDto() })
    }


    @PostMapping("/listaAutomovilesFiltro")
    suspend fun listaAutomovilesFiltro(@Valid @RequestBody automovilFilter: AutomovilFilter) : ResponseEntity<List<AutomovilDto>>{
        logger.info { "Obteniendo lista de todos los automoviles"}
        return ResponseEntity.ok(service.findAllFiltros(automovilFilter).map { it.toDto() })
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
            //automovilDto.validate()

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

    @GetMapping("/find/{id}")
    suspend fun findById(@PathVariable id : String) : ResponseEntity<AutomovilDto>{
        logger.info { "Buscando automovil con id ${id}"}
        val auto = service.loadAutomovilById(id)
        return ResponseEntity.ok(auto?.toDto())
    }



    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{numeroChasis}")
    suspend fun delete(@PathVariable numeroChasis : String): ResponseEntity<String> {
        logger.info { "Borrar automovil con numeroChasis: $numeroChasis" }
        service.delete(numeroChasis)
        return ResponseEntity.ok("Borrado")
    }


}