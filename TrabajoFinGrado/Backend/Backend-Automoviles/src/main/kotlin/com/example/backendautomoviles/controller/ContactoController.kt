package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.dto.ComentarioUpdateDto
import com.example.backendautomoviles.dto.ContactoCreateDto
import com.example.backendautomoviles.dto.ContactoDto
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.models.Comentario
import com.example.backendautomoviles.models.Contacto
import com.example.backendautomoviles.service.contacto.ContactoService
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

private val logger = KotlinLogging.logger {}


@RestController
@RequestMapping(APIConfig.API_PATH + "/contactos")
class ContactoController
@Autowired constructor(
    private val service: ContactoService,
) {

    //@PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/listaContactos")
    suspend fun listaContactos() : ResponseEntity<List<ContactoDto>> {
        logger.info { "Obteniendo lista de todos los contactos"}
        val lista = service.findAll().toList().map { it.toDto() }
        println(lista)
        return ResponseEntity.ok(service.findAll().toList().map { it.toDto() })
    }

    @GetMapping("/listaContactosByClienteId/{id}")
    suspend fun findContactosByClienteId(@PathVariable id : String) : ResponseEntity<List<ContactoDto>> {
        logger.info { "Buscando contacto con el  id del cliente ${id}"}
        return ResponseEntity.ok(service.findAllByCliente(id).toList().map { it.toDto() })

    }



    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/newContactos")
    suspend fun new(@Valid @RequestBody entityDto: ContactoCreateDto): ResponseEntity<ContactoCreateDto> {
        logger.info { "Creacion de contacto: ${entityDto}" }
        val entity = service.save(entityDto.toModel())
        return ResponseEntity.ok(entityDto)
    }


    @GetMapping("/find/{id}")
    suspend fun findById(@PathVariable id : String) : ResponseEntity<ContactoDto>{
        logger.info { "Buscando contacto con id ${id}"}
        val contacto = service.loadContactoById(id)
        return ResponseEntity.ok(contacto?.toDto())
    }


    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/update")
    suspend fun updateMe(@Valid @RequestBody contactoDto: ComentarioUpdateDto): Any {
        logger.info { "Actualizando contacto con id: ${contactoDto.id}" }

        val comentarioExists : Contacto? = service.loadContactoById(contactoDto.id!!)
        if (comentarioExists != null) {

            var contactoUpdated = comentarioExists.copy(
                descripcion = contactoDto.descripcion
            )
            service.update(contactoUpdated)
            return ResponseEntity.ok(contactoUpdated.toDto())

        }else{
            return ResponseEntity.badRequest()

        }
    }




    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{id}")
    suspend fun delete(@PathVariable id : String): ResponseEntity<String> {
        logger.info { "Borrar contacto con id: $id" }
        service.delete(id)
        return ResponseEntity.ok("Borrado")
    }
}