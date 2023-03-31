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

class AchievementsActivity : AppCompatActivity() {
    private lateinit var achievementsView: ListView
    private lateinit var achievement: LinearLayout

    private lateinit var achievementsList: List<Achievement>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_achievements)

        initElements()
        getAchievementData()
    }

    private fun getAchievementData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val token: String = TokenUtils(this@AchievementsActivity).getAccessToken()!!
        response.getAchievements(token).enqueue(
            object : Callback<ResponseModelAchievements> {
                override fun onResponse(
                    call: Call<ResponseModelAchievements>,
                    response: Response<ResponseModelAchievements>
                ) {
                    achievementsList = response.body()!!.achievements
                    setAchievementsListViewAdapter()
                }

                override fun onFailure(call: Call<ResponseModelAchievements>, t: Throwable) {
                    Log.e("Error", t.toString())
                }
            }
        )
    }

    private fun setAchievementsListViewAdapter() {
        val adapter = object : ArrayAdapter<Achievement>(
            this@AchievementsActivity,
            R.layout.achievement_list_item,
            achievementsList
        ) {
            @RequiresApi(Build.VERSION_CODES.O)
            override fun getView(postion: Int, convertView: View?, parent: ViewGroup): View {
                val view = convertView ?: LayoutInflater.from(context)
                    .inflate(R.layout.achievement_list_item, parent, false)
                val item = getItem(postion)

                view.findViewById<LinearLayout>(R.id.achievementListItem).tooltipText =
                    item!!.description
                view.findViewById<TextView>(R.id.achievementName).text = item?.name
                view.findViewById<ProgressBar>(R.id.achievementProgress).progress = item!!.progress
                view.findViewById<CheckBox>(R.id.achievementCompletion).isChecked = item.completed

                return view
            }
        }
        achievementsView.adapter = adapter
    }

    private fun initElements() {
        achievementsView = findViewById(R.id.achievementList)
    }
}