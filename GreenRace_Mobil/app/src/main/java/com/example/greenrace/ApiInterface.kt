package com.example.greenrace

import retrofit2.Call
import retrofit2.http.*

interface ApiInterface {

    @Headers("Content-Type: application/json")
    @POST("register")
    fun sendReq(@Body requestModelRegistration: RequestModelRegistration) : Call<ResponseModel>

    @Headers("Content-Type: application/json")
    @POST("login")
    fun sendReq(@Body requestModelLogin: RequestModelLogin) : Call<ResponseModel>

    @Headers("Content-Type: application/json")
    @GET("userPage")
    fun sendReqUser(@Header("Authorization") token:String) :Call<ResponseModelUserPage>
}