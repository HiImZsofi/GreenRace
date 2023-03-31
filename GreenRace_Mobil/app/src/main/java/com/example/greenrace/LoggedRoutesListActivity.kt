package com.example.greenrace

import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.example.greenrace.sharedPreferences.TokenUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoggedRoutesListActivity : AppCompatActivity() {
    private lateinit var loggedRoutesView:ListView

    private lateinit var loggedRoutes : List<LoggedRoute>

    //TODO Refactor code readability
    //TODO Fix styling of the date
    //TODO Fix styling of the list
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_logged_routes_list)

        initElements()
        getLoggedRoutesData()
    }

    private fun getLoggedRoutesData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val token: String = TokenUtils(this@LoggedRoutesListActivity).getAccessToken()!!
        response.getLoggedRoutes("Bearer $token").enqueue(
            object : Callback<ResponseModelLoggedRoutes> {
                override fun onResponse(
                    call: Call<ResponseModelLoggedRoutes>,
                    response: Response<ResponseModelLoggedRoutes>
                ) {
                    //Store the achievements
                    loggedRoutes = response.body()!!.loggedRoutes
                    setLoggedRoutesListViewAdapter()
                }

                override fun onFailure(call: Call<ResponseModelLoggedRoutes>, t: Throwable) {
                    Log.e("Error", t.toString())
                }
            }
        )
    }

    private fun setLoggedRoutesListViewAdapter() {
        val adapter = object : ArrayAdapter<LoggedRoute>(
            this@LoggedRoutesListActivity,
            R.layout.logged_routes_list_item,
            loggedRoutes
        ) {
            @RequiresApi(Build.VERSION_CODES.O)
            override fun getView(postion: Int, convertView: View?, parent: ViewGroup): View {
                val view = convertView ?: LayoutInflater.from(context)
                    .inflate(R.layout.logged_routes_list_item, parent, false)
                val item = getItem(postion)


                view.findViewById<TextView>(R.id.loggedRouteLineNumber).text = item?.line
                view.findViewById<TextView>(R.id.loggedRouteDate).text = item?.date.toString()
                view.findViewById<TextView>(R.id.loggedRouteEmission).text = item?.emission.toString()

                return view
            }
        }
        loggedRoutesView.adapter = adapter
    }

    private fun initElements() {
        loggedRoutesView = findViewById(R.id.loggedRoutesList)
    }
}