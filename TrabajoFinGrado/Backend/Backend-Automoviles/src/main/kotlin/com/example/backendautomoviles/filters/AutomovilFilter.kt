package com.example.backendautomoviles.filters


data class AutomovilFilter (
    val id : String?,
    val numeroChasis : String?,
    val marca : String?,
    val modelo : String?,
    val color : String?,
    val capacidad : Int?,
    val coste : Double?,
    val tipo : String?,
){}