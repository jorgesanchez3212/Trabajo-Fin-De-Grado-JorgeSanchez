package com.example.backendautomoviles.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

class TiendasException

@ResponseStatus(HttpStatus.NOT_FOUND)
class TiendasNotFoundException(message: String) : RuntimeException()


@ResponseStatus(HttpStatus.BAD_REQUEST)
class TiendasBadRequestException(message: String) : RuntimeException(message)