package com.example.backendautomoviles.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

class MapasException

@ResponseStatus(HttpStatus.NOT_FOUND)
class MapasNotFoundException(message: String) : RuntimeException()


@ResponseStatus(HttpStatus.BAD_REQUEST)
class MapasBadRequestException(message: String) : RuntimeException(message)