package com.example.greenrace

import android.content.Context
import android.icu.text.SimpleDateFormat
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.util.TypedValue
import android.view.Gravity
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.core.view.marginTop
import com.example.greenrace.sharedPreferences.TokenUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class RouteLogedPageFragment : Fragment() {
    private lateinit var loggedRoutesView: ListView

    private lateinit var loggedRoutes: List<LoggedRoute>
    private lateinit var mContext: Context
    override fun onAttach(context: Context) {
        super.onAttach(context)
        mContext = context
    }
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_routeloged_page, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        loggedRoutesView = view.findViewById(R.id.loggedRoutesList)
        getLoggedRoutesData()
    }

    //Get list of the logged routes of the current user
    //Then store it in a LoggedRoute type list
    private fun getLoggedRoutesData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val token: String = TokenUtils(requireContext()).getAccessToken()!!
        response.getLoggedRoutes("Bearer $token").enqueue(
            object : Callback<ResponseModelLoggedRoutes> {
                override fun onResponse(
                    call: Call<ResponseModelLoggedRoutes>,
                    response: Response<ResponseModelLoggedRoutes>
                ) {
                    if(response.body()?.loggedRoutes == null){
                        val parentView = loggedRoutesView.parent as ViewGroup
                        val marginInPixels = 20
                        val replaceTextView = TextView(requireContext())
                        replaceTextView.text = "Még nincs regisztráld utad."
                        replaceTextView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20F)
                        replaceTextView.setTextColor(
                            ContextCompat.getColor(
                                requireContext(),
                                R.color.warning
                            )
                        )
                        replaceTextView.gravity = Gravity.CENTER


                        val listViewIndex = parentView.indexOfChild(loggedRoutesView)
                        parentView.removeView(loggedRoutesView)
                        parentView.addView(replaceTextView, listViewIndex)
                    } else {
                        //Store the achievements
                        loggedRoutes = response.body()!!.loggedRoutes!!
                        setLoggedRoutesListViewAdapter()
                    }
                }

                override fun onFailure(call: Call<ResponseModelLoggedRoutes>, t: Throwable) {
                    Log.e("Error", t.toString())
                }
            }
        )
    }

    //Set the list as an adapter for the list view
    private fun setLoggedRoutesListViewAdapter() {
        val simpleDateFormat = SimpleDateFormat("yyyy.MM.dd")

        val adapter = object : ArrayAdapter<LoggedRoute>(
            requireContext(),
            R.layout.logged_routes_list_item,
            loggedRoutes
        ) {
            @RequiresApi(Build.VERSION_CODES.O)
            override fun getView(postion: Int, convertView: View?, parent: ViewGroup): View {
                val view = convertView ?: LayoutInflater.from(context)
                    .inflate(R.layout.logged_routes_list_item, parent, false)
                val item = getItem(postion)


                view.findViewById<TextView>(R.id.loggedRouteDate).text =
                    simpleDateFormat.format(item?.date)
                view.findViewById<TextView>(R.id.loggedRouteLineNumber).text = item?.line
                view.findViewById<TextView>(R.id.loggedRouteEmission).text =
                    "${item?.emission.toString()} gramm"

                return view
            }
        }

        //Add a header view to the listview to mark the names of the columns
        //It uses the logged_routes_list_item with hardcoded strings
        // so the formatting matches the list items
        val headerView = LayoutInflater.from(requireContext())
            .inflate(R.layout.logged_routes_list_item, null)
        loggedRoutesView.addHeaderView(headerView)

        loggedRoutesView.adapter = adapter
    }
}