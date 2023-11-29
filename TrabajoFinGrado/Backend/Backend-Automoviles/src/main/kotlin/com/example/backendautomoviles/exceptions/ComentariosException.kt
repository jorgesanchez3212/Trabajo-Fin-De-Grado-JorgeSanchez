package com.example.backendautomoviles.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

class ComentariosException

@ResponseStatus(HttpStatus.NOT_FOUND)
class ComentariosNotFoundException(message: String) : RuntimeException()


@ResponseStatus(HttpStatus.BAD_REQUEST)
class ComentariosBadRequestException(message: String) : RuntimeException(message)