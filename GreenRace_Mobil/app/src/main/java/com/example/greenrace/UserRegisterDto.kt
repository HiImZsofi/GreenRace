package com.example.greenrace

import com.fasterxml.jackson.annotation.JsonProperty

//user info data model
data class RequestModelRegistration(
    @JsonProperty("username") val username: String = "",

    @JsonProperty("password") val password: String = "",

    @JsonProperty("email") val email: String = ""
)

data class RequestModelLogin(
    @JsonProperty("email") val email: String = "",

    @JsonProperty("password") val password: String = ""
)

//http response model
data class ResponseModel(
    val message: String
)