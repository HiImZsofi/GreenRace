package com.example.greenrace

import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.jackson.JacksonConverterFactory


object ServiceBuilder {
    private val client = OkHttpClient.Builder().build()


    private val retrofit = Retrofit.Builder()
        .baseUrl("http://10.0.2.2:3001")
        .addConverterFactory(JacksonConverterFactory.create())
        .client(client)
        .build()

    fun <T> buildService (service: Class<T>): T{
        return retrofit.create(service)
    }
}