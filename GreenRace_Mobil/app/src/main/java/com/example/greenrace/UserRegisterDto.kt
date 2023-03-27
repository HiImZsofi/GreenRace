package com.example.greenrace

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import com.google.gson.annotations.SerializedName

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
    @JsonProperty("result") val message: String?,
    @JsonProperty("Authorization") val token: String
)

class RequestModelUserPage @JsonCreator constructor(authorization: String) {
    @JsonProperty("Authorization")
    val authorization: String = authorization
}

class ResponseModelUserPage @JsonCreator constructor(@JsonProperty("userData") val userpagedata: UserPage)

class UserPage @JsonCreator constructor(
    @JsonProperty("username") username: String,
    @JsonProperty("picfilepath") picfilepath: String?,
    @JsonProperty("points") points: Int
) {
    @JsonProperty("username")
    @SerializedName("username")
    val username: String = username
    @JsonProperty("picfilepath")
    @SerializedName("picfilepath")
    val picfilepath: String? = picfilepath
    @JsonProperty("points")
    @SerializedName("points")
    val points: Int = points
}

