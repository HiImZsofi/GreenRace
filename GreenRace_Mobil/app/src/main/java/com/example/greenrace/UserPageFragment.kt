package com.example.greenrace

import android.graphics.Color
import android.os.Bundle
import android.text.Html
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.example.greenrace.sharedPreferences.TokenUtils
import com.github.mikephil.charting.data.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class UserPageFragment : Fragment() {
    private lateinit var pointsText: TextView
    private lateinit var barChart: com.github.mikephil.charting.charts.BarChart
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_user_page, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        pointsText = view.findViewById(R.id.ponts_textview)
        barChart = view.findViewById(R.id.user_barChart)
        getData()
        getChartData()
    }

    private fun getColoredString(text: String, color: String): String? {
        return "<font color=$color>$text</font>"
    }
    private fun updateUserInfo(points: Int?){
        var zpoint = getColoredString("Zöldpont", "#006400");
        pointsText.setText(Html.fromHtml(points.toString() + " " + zpoint + "-od van"))
    }

    private fun getData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val tokenUtils = TokenUtils(requireContext())
        val token = tokenUtils.getAccessToken()
        val requestUserData = "Bearer $token"

        response.sendReqUser(requestUserData).enqueue(
            object : Callback<ResponseModelUserPage> {
                override fun onResponse(
                    call: Call<ResponseModelUserPage>,
                    response: Response<ResponseModelUserPage>
                ) {
                    if (token != null) {
                        val points = response.body()?.userpagedata?.points

                        // Update UI
                        updateUserInfo(points)
                    }
                }

                override fun onFailure(call: Call<ResponseModelUserPage>, t: Throwable) {
                    Log.i("Error", t.toString())
                }
            }
        )
    }
    //No function yet
    private fun getChartData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val tokenUtils = TokenUtils(requireContext())
        val token = tokenUtils.getAccessToken()
        val requestChartData = "Bearer $token"

        response.sendReqChartData(requestChartData).enqueue(
            object : Callback<ResponseModelUserPageChart>{
                override fun onResponse(
                    call: Call<ResponseModelUserPageChart>,
                    response: Response<ResponseModelUserPageChart>
                ){
                    val chartdata = response.body()?.userpagechartdata
                    if (chartdata != null) {
                        val chartlist = fillChartList(chartdata)
                        setChartData(chartlist)
                    }
                }
                override fun onFailure(call: Call<ResponseModelUserPageChart>, t: Throwable) {
                    Log.e("Error", t.toString())
                }
            }
        )
    }
    private fun setChartData(chartdata: List<Number>){
        // Create a new data set and add the values to it
        val data = ArrayList<BarEntry>()
        for (i in 0 until chartdata.size) {
            data.add(BarEntry(i.toFloat(), chartdata[i].toFloat()))
        }

        val dataSet = BarDataSet(data, "Pontok")
        dataSet.color = ContextCompat.getColor(requireContext(), R.color.teal_700)

        val barData = BarData(dataSet)
        barChart.data = barData
        barChart.setFitBars(true)
        barChart.invalidate()
    }
    private fun fillChartList(source: List<ChartData>): List<Double> {
        val target = mutableListOf<Double>()
        for (i in 0 until 10) {
            if (i < source.size) {
                target.add(source[i].emission)
            } else {
                target.add(0.0)
            }
        }
        return target
    }
    private fun getEntryList(chartdata: List<Number>): List<Entry> {
        val entries = mutableListOf<Entry>()
        for ((index, value) in chartdata.withIndex()) {
            entries.add(Entry(index.toFloat(), value.toFloat()))
        }
        return entries
    }
}