package com.example.greenrace

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.google.gson.annotations.Expose

import com.google.gson.annotations.SerializedName
import java.util.Objects


//user info data model

class RequestModelRegistration(username: String, password: String, email: String) {
    @get:JsonCreator
    @JsonProperty("username")
    val username: String = username

    @JsonProperty("password")
    val password: String = password

    @JsonProperty("email")
    val email: String = email
}

class RequestModelLogin(email: String, password: String) {
    @get:JsonCreator
    @JsonProperty("email")
    val email: String = email

    @JsonProperty("password")
    val password: String = password
}

//http response model
data class ResponseModel(
    @JsonProperty("result") val message: String?
)

//class RouteData(){
//    @get:JsonCreator
//    @get:JsonProperty("routeData")
//    private val routeData: ArrayList<Route>
//        get() {
//            return routeData
//        }
//}

class RouteData @JsonCreator constructor(
    @JsonProperty("routeData") val routeData: Any
)

class Route @JsonCreator constructor(routeShortName: String, routeType: Int) {
    @JsonProperty("route_short_name")
    val routeShortName: String = routeShortName
    @JsonProperty("route_type")
    val routeType: Int = routeType
}
