package com.example.greenrace

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty

//user info data model

class RequestModelRegistration(username:String, password:String, email:String) {
    @get:JsonCreator
    @JsonProperty("username") val username: String = username

    @JsonProperty("password") val password: String = password

    @JsonProperty("email") val email: String = email
}

class RequestModelLogin(email: String,password: String){
    @get:JsonCreator
    @JsonProperty("email") val email: String = email

    @JsonProperty("password") val password: String = password
}

//http response model
data class ResponseModel(
    @JsonProperty("result") val message: String?,
    @JsonProperty("Authorization") val token: String
)

