package com.example.backendautomoviles.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

class ReservasException

@ResponseStatus(HttpStatus.NOT_FOUND)
class ReservasNotFoundException(message: String) : RuntimeException()


@ResponseStatus(HttpStatus.BAD_REQUEST)
class ReservasBadRequestException(message: String) : RuntimeException(message)