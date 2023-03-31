package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.greenrace.sharedPreferences.TokenUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SettingsActivity: AppCompatActivity() {

    private lateinit var settingsNewUsername: EditText
    private lateinit var settingsNewPassword: EditText
    private lateinit var settingsCurrentPassword: EditText
    private lateinit var settingsBack: TextView
    private lateinit var settingsConfirmButton: Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)
        init()

        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        settingsConfirmButton.setOnClickListener{
            settingsDataHandler(response)
        }

        settingsBack.setOnClickListener{
            cancelIntent()
        }
    }

    private fun settingsDataHandler(response: ApiInterface) {
        val settingsPageRequest = RequestModelSettingsPage(
            settingsNewUsername.text.toString(),
            settingsNewPassword.text.toString(),
            settingsCurrentPassword.text.toString()
        )
        val tokenUtils = TokenUtils(this)
        val token = tokenUtils.getAccessToken()
        val requestToken = "Bearer $token"

        response.sendSettings(requestToken, settingsPageRequest).enqueue(
            object : Callback<RegistrationResponseModel> {
                override fun onResponse(
                    call: Call<RegistrationResponseModel>,
                    response: Response<RegistrationResponseModel>
                ) {
                    if (response.code() == 404) {
                        val tokenInvalid = Intent(this@SettingsActivity, LoginActivity::class.java)
                        startActivity(tokenInvalid)
                        finish()
                    } else if (response.code() == 500) {
                        settingsNewPassword.setBackgroundResource(R.drawable.email_error)
                        settingsCurrentPassword.setBackgroundResource(R.drawable.email_error)
                        Toast.makeText(
                            this@SettingsActivity,
                            "Hiba történt a kérés feldolgozása során.",
                            Toast.LENGTH_SHORT
                        ).show()
                    } else if (response.code() == 200) {
                        Toast.makeText(
                            this@SettingsActivity,
                            "A felhasználói fiók sikeresen frissítve!",
                            Toast.LENGTH_SHORT
                        ).show()
                        cancelIntent()
                    }
                }

                override fun onFailure(call: Call<RegistrationResponseModel>, t: Throwable) {
                    Log.i("Error", t.toString())
                }
            }
        )
    }

    private fun cancelIntent() {
        val returnIntent = Intent(this@SettingsActivity, MainActivity::class.java)
        startActivity(returnIntent)
        finish()
    }

    fun init() {
        settingsNewUsername = findViewById(R.id.settingsNewUsername)
        settingsNewPassword = findViewById(R.id.settingsNewPassword)
        settingsCurrentPassword = findViewById(R.id.settingsCurrentPassword)
        settingsBack = findViewById(R.id.settingsBack)
        settingsConfirmButton = findViewById(R.id.settingsConfirmButton)
    }
}