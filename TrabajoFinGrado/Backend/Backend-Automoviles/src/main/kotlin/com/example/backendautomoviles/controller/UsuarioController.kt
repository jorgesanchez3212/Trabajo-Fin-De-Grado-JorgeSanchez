package com.example.backendautomoviles.controller

import com.example.backendautomoviles.config.APIConfig
import com.example.backendautomoviles.config.security.jwt.JwtTokenUtils
import com.example.backendautomoviles.dto.*
import com.example.backendautomoviles.mappers.toDto
import com.example.backendautomoviles.mappers.toModel
import com.example.backendautomoviles.models.Usuario
import com.example.backendautomoviles.service.user.UsuarioService
import com.example.backendautomoviles.validators.validate
import jakarta.validation.Valid
import kotlinx.coroutines.flow.toList
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

private val logger = KotlinLogging.logger {}


@RestController
@RequestMapping(APIConfig.API_PATH + "/users")
class UsuarioController
    @Autowired constructor(
        private val usuariosService: UsuarioService,
        private val authenticationManager: AuthenticationManager,
        private val jwtTokenUtil: JwtTokenUtils,
        // Lo utilizaremos para el avatar(la imagen) mas adelante
        //private val storageService: StorageService
    ) {

    @PostMapping("/login")
    fun login(@Valid @RequestBody logingDto: UsuarioLoginDto): ResponseEntity<UserWithTokenDto> {
        logger.info { "Login de usuario: ${logingDto.username}" }

        val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                logingDto.username,
                logingDto.password
            )
        )
        SecurityContextHolder.getContext().authentication = authentication
        val user = authentication.principal as Usuario
        val jwtToken: String = jwtTokenUtil.generateToken(user)
        logger.info { "Token de usuario: ${jwtToken}" }
        val userWithToken = UserWithTokenDto(user.toDto(), jwtToken)
        return ResponseEntity.ok(userWithToken)
    }


    @PostMapping("/register")
    suspend fun register(@Valid @RequestBody usuarioDto: UsuarioCreateDto): ResponseEntity<UserWithTokenDto> {
        logger.info { "Registro de usuario: ${usuarioDto.username}" }

        val user = usuarioDto.validate().toModel()
        user.rol.forEach { println(it) }
        val userSaved = usuariosService.save(user)
        val jwtToken: String = jwtTokenUtil.generateToken(userSaved)
        logger.info { "Token de usuario: ${jwtToken}" }
        return ResponseEntity.ok(UserWithTokenDto(userSaved.toDto(), jwtToken))
    }


    @PostMapping("/añadir")
    suspend fun añadirUsuario(@AuthenticationPrincipal usuario : Usuario, @Valid @RequestBody usuarioDto: UsuarioCreateDto): ResponseEntity<UsuarioDto> {
        logger.info { "Añadir usuario por parte del administrador: ${usuarioDto.username}" }

        val user = usuarioDto.validate().toModel()
        user.rol.forEach { println(it) }
        val userSaved = usuariosService.save(user, true)
        return ResponseEntity.ok(userSaved.toDto())
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/me")
    fun meGet(@AuthenticationPrincipal usuario : Usuario) : ResponseEntity<UsuarioDto>{
        logger.info { "Obteniendo informacion de usuario: ${usuario.username}"}
        return ResponseEntity.ok(usuario.toDto())
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/listaUsuarios")
    suspend fun listaUsuarios(@AuthenticationPrincipal usuario : Usuario) : ResponseEntity<List<UsuarioDto>>{
        logger.info { "Obteniendo lista de todos los usuarios"}
        return ResponseEntity.ok(usuariosService.findAll().toList().map { it.toDto() })
    }


    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/delete/{id}")
    suspend fun deleteUsuario(@AuthenticationPrincipal usuario : Usuario, @PathVariable id : String) : ResponseEntity<Boolean>{
        logger.info { "Borradno usuario con id ${id}"}
        usuariosService.deleteById(id)
        return ResponseEntity.ok(true)
    }

    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/find/{id}")
    suspend fun findById(@AuthenticationPrincipal usuario : Usuario, @PathVariable id : String) : ResponseEntity<UsuarioDto>{
        logger.info { "Buscando usuario con id ${id}"}
        val user = usuariosService.loadUserById(id)
        return ResponseEntity.ok(user?.toDto())
    }


    @PutMapping("/updateMe")
    suspend fun updateMe(
        @AuthenticationPrincipal user: Usuario,
        @Valid @RequestBody usuarioDto: UsuarioUpdateDto
    ): ResponseEntity<UsuarioDto> {
        logger.info { "Actualizando usuario: ${user.username}" }

        usuarioDto.validate()
        var userUpdated = user.copy(
            nombre = usuarioDto.nombre,
            username = usuarioDto.username,
            email = usuarioDto.email,
            description = usuarioDto.descripcion
        )

        userUpdated = usuariosService.update(userUpdated)
        return ResponseEntity.ok(userUpdated.toDto())
    }

    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/update")
    suspend fun updateUsuario(
        @AuthenticationPrincipal user: Usuario,
        @Valid @RequestBody usuarioDto: UsuarioUpdateDto
    ): ResponseEntity<UsuarioDto> {
        logger.info { "Actualizando usuario: ${user.username}" }

        usuarioDto.validate()

        var userUpdated = user.copy(
            nombre = usuarioDto.nombre,
            username = usuarioDto.username,
            email = usuarioDto.email,
            description = usuarioDto.descripcion,
            rol = usuarioDto.rol
        )

        userUpdated = usuariosService.update(userUpdated)
        return ResponseEntity.ok(userUpdated.toDto())
    }

}

