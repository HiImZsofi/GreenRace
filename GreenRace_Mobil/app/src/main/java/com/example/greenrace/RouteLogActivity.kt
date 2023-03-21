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

    private lateinit var lineNumberList: List<Route>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_route_log)

        initElements()
        getData()
        setVehicleTypeAdapter()
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
        getOnStopSpinner.isEnabled = false
        getOffStopSpinner.isEnabled = false
        logRouteButton.isEnabled = false
    }

    //Gets BKK line data from the backend
    private fun getData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        response.getData().enqueue(
            object : Callback<RouteData> {
                override fun onResponse(call: Call<RouteData>, response: Response<RouteData>) {
                    //Array list of lines with the route types
                    lineNumberList = response.body()!!.routeData
                    setLineSpinnerAdapter()
                }

                override fun onFailure(call: Call<RouteData>, t: Throwable) {
                    Log.e("Error", t.toString())
                    lineNumberList = ArrayList()
                }
            }
        )
    }

    //Updates the lines list
    //With the type appropriate data
    private fun setLineSpinnerAdapter() {
        val lines: ArrayList<String> = setLineList()
        //Set list with the line numbers
        //For the line spinner adapter
        val adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_dropdown_item,
            lines
        )

        lineNumberSpinner.adapter = adapter

        lineNumberSpinner.onItemSelectedListener =
            object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {
                    // handle item selection here
                    val selectedItem = lines[position]
                    Toast.makeText(
                        this@RouteLogActivity,
                        "Selected item: $selectedItem",
                        Toast.LENGTH_SHORT
                    ).show()
                    getOnStopSpinner.isEnabled = true
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {
                    // handle case where no item is selected
                    getOnStopSpinner.isEnabled = false
                }
            }
    }

    private fun setLineList(): ArrayList<String> {
        val lines: ArrayList<String> = ArrayList()
        val currentType = vehicleTypeSpinner.selectedItem
        var currentTypeCode = -1

        //Check the currently selected type
        //And set currentTypeCode to the appropriate type code from the RouteLineType enum class
        when (currentType) {
            RouteLineType.Tram.printableType -> currentTypeCode = RouteLineType.Tram.type
            RouteLineType.Subway.printableType -> currentTypeCode = RouteLineType.Subway.type
            RouteLineType.Bus.printableType -> currentTypeCode = RouteLineType.Bus.type
            RouteLineType.Trolley.printableType -> currentTypeCode = RouteLineType.Trolley.type
            RouteLineType.SuburbanRail.printableType -> currentTypeCode =
                RouteLineType.SuburbanRail.type
        }
        lineNumberList.forEach { element ->
            if (element.routeType == currentTypeCode) {
                lines.add(element.routeShortName)
            }
        }
        return lines
    }

    private fun setVehicleTypeAdapter() {
        val types = RouteLineType.values().map { it.printableType }
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, types)
        vehicleTypeSpinner.adapter = adapter

        vehicleTypeSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                // handle item selection here
                val selectedItem = types[position]
                Toast.makeText(
                    this@RouteLogActivity,
                    "Selected item: $selectedItem",
                    Toast.LENGTH_SHORT
                ).show()
                lineNumberSpinner.isEnabled = true

                //Check if the lineNumberList if initialized
                //If yes then reload the ArrayAdapter of the lineNumberSpinner
                if (this@RouteLogActivity::lineNumberList.isInitialized) {
                    setLineSpinnerAdapter()
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // handle case where no item is selected
                lineNumberSpinner.isEnabled = false
            }
        }
    }
}