package com.example.greenrace

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

interface ApiInterface {

    @Headers("Content-Type: application/json")
    @POST("register")
    fun sendReq(@Body requestModelRegistration: RequestModelRegistration) : Call<ResponseModel>

    @Headers("Content-Type: application/json")
    @POST("login")
    fun sendReq(@Body requestModelLogin: RequestModelLogin) : Call<ResponseModel>
}