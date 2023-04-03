package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.greenrace.sharedPreferences.TokenUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ProfpicSetterActivity: AppCompatActivity() {
    private lateinit var profpicImage : ImageView
    private lateinit var nextButton: ImageButton
    private lateinit var backButton : ImageButton
    private lateinit var backText : TextView
    private lateinit var saveButton : Button

    private var profpicNameList : List<String> = listOf("npic.png", "profpic_male.jpg", "profpic_female.jpg","golden.png")
    private var picCounter : Int = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profpicsetter)
        init()

        backText.setOnClickListener {
            returnMainPage()
        }

        backButton.setOnClickListener {
            profpicChangeHandler(false)
        }

        nextButton.setOnClickListener {
            profpicChangeHandler(true)
        }

        saveButton.setOnClickListener {
            savepicHandler()
        }
    }
    fun init() {
        profpicImage = findViewById(R.id.profilepic)
        nextButton = findViewById(R.id.next)
        backButton = findViewById(R.id.back)
        backText = findViewById(R.id.profpicBack)
        saveButton = findViewById(R.id.profpicSave)
    }
    private fun profpicChangeHandler(direction:Boolean){
        if (direction) {
            picCounter = (picCounter + 1) % profpicNameList.size
        } else {
            picCounter = (picCounter - 1 + profpicNameList.size) % profpicNameList.size
        }
        val drawableResId = resources.getIdentifier(profpicNameList[picCounter]?.split(".")?.get(0), "drawable", packageName)
        profpicImage?.setImageResource(drawableResId)
    }

    private fun returnMainPage(){
        val returnIntent = Intent(this@ProfpicSetterActivity, MainActivity::class.java)
        startActivity(returnIntent)
        finish()
    }

    private fun savepicHandler(){
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val profilepicSetterRequest = RequestModelProfilepicSetter(
            profpicNameList[picCounter]
        )
        val tokenUtils = TokenUtils(this)
        val token = tokenUtils.getAccessToken()
        val requestToken = "Bearer $token"
        response.sendProfilepic(requestToken, profilepicSetterRequest).enqueue(
            object : Callback<RegistrationResponseModel> {
                override fun onResponse(
                    call: Call<RegistrationResponseModel>,
                    response: Response<RegistrationResponseModel>
                ) {
                    if (response.code() == 404) {
                        val tokenInvalid = Intent(this@ProfpicSetterActivity, LoginActivity::class.java)
                        startActivity(tokenInvalid)
                        finish()
                    }   else if (response.code() == 500) {
                        Toast.makeText(
                            this@ProfpicSetterActivity,
                            "Hiba történt a Profilkép beálítása során.",
                            Toast.LENGTH_SHORT
                        ).show()
                    } else if (response.code() == 200) {
                        Toast.makeText(
                            this@ProfpicSetterActivity,
                            "Profilkép sikeresen beálítva!",
                            Toast.LENGTH_SHORT
                        ).show()
                        returnMainPage()
                    }
                }
                override fun onFailure(call: Call<RegistrationResponseModel>, t: Throwable) {
                    Log.i("Error", t.toString())
                }
            }
        )
    }
}