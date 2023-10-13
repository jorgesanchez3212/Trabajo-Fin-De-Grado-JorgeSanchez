package com.example.backendautomoviles.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

class AutomovilesException

@ResponseStatus(HttpStatus.NOT_FOUND)
class AutomovilesNotFoundException(message: String) : RuntimeException()


@ResponseStatus(HttpStatus.BAD_REQUEST)
class AutomovilesBadRequestException(message: String) : RuntimeException(message)