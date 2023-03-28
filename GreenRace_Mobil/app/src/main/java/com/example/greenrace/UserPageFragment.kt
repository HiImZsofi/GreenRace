package com.example.greenrace

import android.os.Bundle
import android.text.Html
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.greenrace.sharedPreferences.TokenUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class UserPageFragment : Fragment() {
    private lateinit var pointsText: TextView
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_user_page, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        pointsText = view.findViewById<TextView>(R.id.ponts_textview)
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
                    if (token != null) {
                        val chartdata = response.body()?.userpagechartdata?.chartdata
                        Log.i("chartdata","$chartdata[0]")
                    }
                }
                override fun onFailure(call: Call<ResponseModelUserPageChart>, t: Throwable) {
                    Log.i("Error", t.toString())
                }
            }
        )
    }
}