package com.example.backendautomoviles.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

class ContactoException

@ResponseStatus(HttpStatus.NOT_FOUND)
class ContactosNotFoundException(message: String) : RuntimeException()


@ResponseStatus(HttpStatus.BAD_REQUEST)
class ContactosBadRequestException(message: String) : RuntimeException(message)