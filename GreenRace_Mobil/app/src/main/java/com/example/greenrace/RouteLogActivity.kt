package com.example.greenrace

import android.os.Bundle
import android.widget.ArrayAdapter
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

    private fun getLineRouteData(){
        // Array of choices
        val colors =
            arrayOf("Red", "Blue", "White", "Yellow", "Black", "Green", "Purple", "Orange", "Grey")
        // Application of the Array to the Spinner
        val spinnerArrayAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, colors)
        spinnerArrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // The drop down view

        vehicleTypeSpinner.adapter = spinnerArrayAdapter

        //TODO GET request to the backend

    }
}