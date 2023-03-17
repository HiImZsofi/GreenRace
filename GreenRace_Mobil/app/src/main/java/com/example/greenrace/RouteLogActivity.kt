package com.example.greenrace

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class RouteLogActivity : AppCompatActivity() {
    private lateinit var vehicleTypeSpinner: Spinner
    private lateinit var lineNumberSpinner: Spinner
    private lateinit var getOnStopSpinner: Spinner
    private lateinit var getOffStopSpinner: Spinner
    private lateinit var logRouteButton: Button

    private val check:Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_route_log)

        initElements()
        setVehicleTypeAdapter()
    }

    private fun setVehicleTypeAdapter() {
        val items = listOf("Item 1", "Item 2", "Item 3") // example list of items
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, items)
        adapter.setDropDownViewResource(android.R.layout.simple_dropdown_item_1line)
        vehicleTypeSpinner.adapter = adapter

        vehicleTypeSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                // handle item selection here
                val selectedItem = items[position]
                Toast.makeText(
                    this@RouteLogActivity,
                    "Selected item: $selectedItem",
                    Toast.LENGTH_SHORT
                ).show()
                lineNumberSpinner.isEnabled = true
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // handle case where no item is selected
                lineNumberSpinner.isEnabled = false
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
//        lineNumberSpinner.isEnabled = false
        getOnStopSpinner.isEnabled = false
        getOffStopSpinner.isEnabled = false
        logRouteButton.isEnabled = false
    }
}