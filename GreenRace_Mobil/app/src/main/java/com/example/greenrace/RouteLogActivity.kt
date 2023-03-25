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


    //TODO global stops variable
    private lateinit var lineNumberList: List<Route>
    private lateinit var lineStopVariants: Array<List<Stop>>

    private lateinit var currentLine: String
    private lateinit var currentGetOnStop: Stop
    private lateinit var currentGetOffStop: Stop

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
                }
            }
        )
    }

    //GET HTTP request to /get/routeData endpoint
    //Which returns the two arrays of stops for the current line
    private fun getStopsData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val requestModelStopsData = RequestModelStopsData(currentLine)
        response.getStopsData(requestModelStopsData).enqueue(
            object : Callback<StopsData> {
                override fun onResponse(call: Call<StopsData>, response: Response<StopsData>) {
                    //Array list of lines with the route types
                    lineStopVariants = response.body()!!.stopNamesList
                    setGetOnStopSpinnerAdapter()
                }

                override fun onFailure(call: Call<StopsData>, t: Throwable) {
                    Log.e("Error", t.toString())
                }
            }
        )
    }

    //Set the list for getOnStopSpinner
    private fun setGetOnStopSpinnerAdapter() {
        val summedStops: List<Stop>
        //TODO Fix the bug where the current get off stop is still in the get on stop list when it's first loaded
        //TODO It should be filtered out as well
        if(this@RouteLogActivity::currentGetOffStop.isInitialized){
            summedStops=getSummedStopList().filter { stop -> stop!=currentGetOffStop }
        }else {
            summedStops = getSummedStopList()
        }
        val getOnStops: List<String> = setGetOnStopList(summedStops)
        //Set list with the line numbers
        //For the line spinner adapter
        val adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_dropdown_item,
            getOnStops
        )

        getOnStopSpinner.adapter = adapter

        getOnStopSpinner.onItemSelectedListener =
            object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {
                    // handle item selection here
                    val selectedItem = getOnStops[position]
                    Toast.makeText(
                        this@RouteLogActivity,
                        "Selected item: $selectedItem",
                        Toast.LENGTH_SHORT
                    ).show()
                    currentGetOnStop = summedStops[position]
                    getOffStopSpinner.isEnabled = true
                    setGetOffStopSpinnerAdapter()
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {
                    // handle case where no item is selected
                    getOnStopSpinner.isEnabled = false
                }
            }
    }

    //Get a combined of the stops in a Stop typed List
    private fun getSummedStopList(): List<Stop> {
        return lineStopVariants[0].plus(lineStopVariants[1])
            .distinctBy { stop -> stop.stopName } as ArrayList<Stop>
    }

    //Make list of available getOnStops
    //TODO Make one function that converts class typed lists to String lists
    private fun setGetOnStopList(summedStops: List<Stop>): List<String> {
        val summedGetOnStopList: ArrayList<String> = ArrayList()

        summedStops.forEach { element ->
            summedGetOnStopList.add(element.stopName)
        }

        return summedGetOnStopList
    }

    //TODO Add setGetOffStop adapter function
    //TODO Add filtered getOffStop list with the currentGetOnStop being filtered out

    private fun setGetOffStopSpinnerAdapter(){
        //Filters out the currently selected get on stop
        val filteredSummedStops: List<Stop> = getSummedStopList().filter { stop -> stop != currentGetOnStop }
        val getOffStops: List<String> = setGetOnStopList(filteredSummedStops)
        //Set list with the line numbers
        //For the line spinner adapter
        val adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_dropdown_item,
            getOffStops
        )

        getOffStopSpinner.adapter = adapter

        getOffStopSpinner.onItemSelectedListener =
            object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {
                    // handle item selection here
                    val selectedItem = getOffStops[position]
                    Toast.makeText(
                        this@RouteLogActivity,
                        "Selected item: $selectedItem",
                        Toast.LENGTH_SHORT
                    ).show()
                    currentGetOffStop = filteredSummedStops[position]
                    logRouteButton.isEnabled = true
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {
                    // handle case where no item is selected
                    logRouteButton.isEnabled = false
                }
            }
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
                    currentLine =
                        lineNumberList.filter { route -> route.routeShortName == selectedItem }[0].routeId
                    getStopsData()
                    if (this@RouteLogActivity::lineStopVariants.isInitialized) {
                        setGetOnStopSpinnerAdapter()
                    }
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {
                    // handle case where no item is selected
                    getOnStopSpinner.isEnabled = false
                }
            }
    }

    //Returns a list of the lines filtered by the transportation type
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
                    getStopsData()
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // handle case where no item is selected
                lineNumberSpinner.isEnabled = false
            }
        }
    }
}