package com.example.backendautomoviles.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

class UsuariosException

@ResponseStatus(HttpStatus.NOT_FOUND)
class UsuariosNotFoundException(message: String) : RuntimeException()


@ResponseStatus(HttpStatus.BAD_REQUEST)
class UsuariosBadRequestException(message: String) : RuntimeException(message)