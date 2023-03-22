package com.example.greenrace

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST

interface ApiInterface {

    @Headers("Content-Type: application/json")
    @POST("register")
    fun sendReq(@Body requestModelRegistration: RequestModelRegistration) : Call<ResponseModel>

    @Headers("Content-Type: application/json")
    @POST("login")
    fun sendReq(@Body requestModelLogin: RequestModelLogin) : Call<ResponseModel>

    @Headers("Content-Type: application/json")
    @GET("logRoute")
    fun getData(): Call<RouteData>

    @Headers("Content-Type: application/json")
    @GET("get/routeData")
    fun getStopsData(): Call<StopsData>


}