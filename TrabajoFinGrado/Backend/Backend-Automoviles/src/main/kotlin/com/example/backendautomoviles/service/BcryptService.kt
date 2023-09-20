package com.example.backendautomoviles.service

import org.springframework.security.crypto.bcrypt.BCrypt
import org.springframework.stereotype.Service


@Service
class BcryptService {
    fun encryptPassword(password: String):String{
        return BCrypt.hashpw(password, BCrypt.gensalt(12))
    }

    fun verifyPassword(password: String, passwordEncrypt:String ):Boolean{
        return BCrypt.checkpw(password, passwordEncrypt)
    }
}