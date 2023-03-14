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
        getLineRouteData()
        while (vehicleTypeSpinner.selectedItem!=null){
            //TODO Fill line number spinner with the appropriate type of lines
            lineNumberSpinner.isEnabled=true
            while (lineNumberSpinner.selectedItem!=null){
                //TODO Make all stops of the line available
                getOnStopSpinner.isEnabled=true
                while (getOffStopSpinner.selectedItem!=null){
                    //TODO Pass the same array with the selected getOnStop filtered out to the adapter
                    logRouteButton.isEnabled=true
                }
            }
        }

    }

    private fun initElements(){
        //Initialize user input elements
        vehicleTypeSpinner=findViewById(R.id.vehicleTypeSpinner)
        lineNumberSpinner=findViewById(R.id.lineNumberSpinner)
        getOnStopSpinner=findViewById(R.id.getOnStopSpinner)
        getOffStopSpinner=findViewById(R.id.getOffStopSpinner)
        logRouteButton=findViewById(R.id.logRouteButton)

        //Disable input fields and submit button
        //So the user has to fill them in one by one from the top down
        lineNumberSpinner.isEnabled=false
        getOnStopSpinner.isEnabled=false
        getOffStopSpinner.isEnabled=false
        logRouteButton.isEnabled=false
    }

    private fun getLineRouteData(){
        // Array of choices
        val colors =
            arrayOf("Red", "Blue", "White", "Yellow", "Black", "Green", "Purple", "Orange", "Grey")
        // Application of the Array to the Spinner
        val spinnerArrayAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, colors)
        spinnerArrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // The drop down view

        val spinnerArrayAdapter2 = ArrayAdapter(this, android.R.layout.simple_spinner_item, colors)
        spinnerArrayAdapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // The drop down view

        val spinnerArrayAdapter3 = ArrayAdapter(this, android.R.layout.simple_spinner_item, colors)
        spinnerArrayAdapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // The drop down view

        val spinnerArrayAdapter4 = ArrayAdapter(this, android.R.layout.simple_spinner_item, colors)
        spinnerArrayAdapter4.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // The drop down view

        vehicleTypeSpinner.adapter = spinnerArrayAdapter
        lineNumberSpinner.adapter = spinnerArrayAdapter2
        getOnStopSpinner.adapter = spinnerArrayAdapter3
        getOffStopSpinner.adapter = spinnerArrayAdapter4

        //TODO GET request to the backend

    }
}