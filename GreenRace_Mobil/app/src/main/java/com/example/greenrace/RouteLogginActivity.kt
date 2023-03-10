package com.example.greenrace

import android.os.Bundle
import android.util.Log
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class routeType(shortName: String, type: Int){
    val shortName : String = shortName
    val type: Int = type
}

class RouteLogginActivity : AppCompatActivity(){

    private lateinit var spinner : Spinner
    private lateinit var routes: ArrayList<routeType>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_routeloggingtest)
        init()

        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        response.getData().enqueue(
            object : Callback<RouteData> {
                override fun onResponse(call: Call<RouteData>, response: Response<RouteData>) {
                    val data = response.body()?.routeData //TODO szar
                }

                override fun onFailure(call: Call<RouteData>, t: Throwable) {
                    Log.e("Error", t.toString())
                }
            }
        )
    }

    fun init(){
        spinner = findViewById(R.id.spinner)
    }
}