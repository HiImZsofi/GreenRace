package com.example.greenrace

import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatSpinner
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class RouteLogActivity : AppCompatActivity() {
    private lateinit var vehicleTypeSpinner: AppCompatSpinner
    private lateinit var lineNumberSpinner: AppCompatSpinner
    private lateinit var getOnStopSpinner: AppCompatSpinner
    private lateinit var getOffStopSpinner: AppCompatSpinner
    private lateinit var logRouteButton: Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_route_log)

        getData()
        initElements()
        //TODO Fix surface invalid error
        //setAdapters()


        while (vehicleTypeSpinner.selectedItem != null) {
            //TODO Fill line number spinner with the appropriate type of lines
            lineNumberSpinner.isEnabled = true
            while (lineNumberSpinner.selectedItem != null) {
                //TODO Make all stops of the line available
                getOnStopSpinner.isEnabled = true
                while (getOffStopSpinner.selectedItem != null) {
                    //TODO Pass the same array with the selected getOnStop filtered out to the adapter
                    logRouteButton.isEnabled = true
                }
            }
        }

    }

    //Gets BKK line data from the backend
    private fun getData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        response.getData().enqueue(
            object : Callback<RouteData> {
                override fun onResponse(call: Call<RouteData>, response: Response<RouteData>) {
                    //Array list of lines with the route types
                    val data = response.body()?.routeData?.forEach { element ->
                        element.routeShortName
                        //TODO set adapters
                    }
                }

                override fun onFailure(call: Call<RouteData>, t: Throwable) {
                    Log.e("Error", t.toString())
                }
            }
        )
    }

    private fun initElements() {
        //Initialize user input elements
        vehicleTypeSpinner = findViewById(R.id.vehicleTypeSpinner)
        lineNumberSpinner = findViewById(R.id.lineNumberSpinner)
        getOnStopSpinner = findViewById(R.id.getOnStopSpinner)
        getOffStopSpinner = findViewById(R.id.getOffStopSpinner)
        logRouteButton = findViewById(R.id.logRouteButton)

        //Disable input fields and submit button
        //So the user has to fill them in one by one from the top down
        lineNumberSpinner.isEnabled = false
        getOnStopSpinner.isEnabled = false
        getOffStopSpinner.isEnabled = false
        logRouteButton.isEnabled = false
    }

    private fun setAdapters() {

        // Array of choices
        val colors =
            arrayOf("Red", "Blue", "White", "Yellow", "Black", "Green", "Purple", "Orange", "Grey")
        // Application of the Array to the Spinner
        val spinnerArrayAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, colors)
        spinnerArrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item) // The drop down view


        try {
            //!! The app crasher if this is executed
            vehicleTypeSpinner.adapter = spinnerArrayAdapter
        }catch (e:Exception){
            Log.e("Surface szar", e.message.toString())
            recreate()
        }

        //TODO GET request to the backend


    }

}