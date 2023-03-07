package com.example.greenrace

import com.fasterxml.jackson.annotation.JsonProperty

//user info data model
data class RequestModel(
    @JsonProperty("username") val username: String = "",

    @JsonProperty("password") val password: String = "",

    @JsonProperty("email") val email: String = ""
)

//http response model
data class ResponseModel(
    val message: String
)