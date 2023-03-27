package com.example.greenrace

enum class RouteLineType(val type:Int, val printableType:String) {
    Tram(0, "Villamos"),
    Subway(1,"Metró"),
    Bus(3, "Busz"),
    Trolley(11, "Trolibusz"),
    SuburbanRail(109, "HÉV");

    fun toPrintableString():String{
        return printableType
    }

    fun toTypeInt():Int{
        return type
    }

}