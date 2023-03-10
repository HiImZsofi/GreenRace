package com.example.greenrace

import android.os.Bundle
import android.widget.Button
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity

class RouteLogActivity : AppCompatActivity() {
    private lateinit var vehicleTypeSpinner: Spinner
    private lateinit var lineNumberSpinner: Spinner
    private lateinit var getOnStopSpinner: Spinner
    private lateinit var getOffStopSpinner: Spinner
    private lateinit var logRouteButton: Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_route_log)

        initElements()

    }

    private fun initElements(){
        vehicleTypeSpinner=findViewById(R.id.vehicleTypeSpinner)
        lineNumberSpinner=findViewById(R.id.lineNumberSpinner)
        getOnStopSpinner=findViewById(R.id.getOnStopSpinner)
        getOffStopSpinner=findViewById(R.id.getOffStopSpinner)
        logRouteButton=findViewById(R.id.logRouteButton)
    }
}