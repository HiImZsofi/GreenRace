package com.example.greenrace

import android.provider.ContactsContract.CommonDataKinds.Email
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder
import com.google.gson.annotations.SerializedName

data class RequestModel(
    @JsonProperty("username") val username: String,

    @JsonProperty("password") val password: String,

    @JsonProperty("email") val email: String
    )

data class ResponseModel(
    val message: String
)