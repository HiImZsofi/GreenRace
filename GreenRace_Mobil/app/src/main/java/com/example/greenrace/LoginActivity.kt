package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.greenrace.sharedPreferences.TokenUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class LoginActivity : AppCompatActivity() {

    private lateinit var loginEmail : EditText
    private lateinit var loginPassword : EditText
    private lateinit var loginConfirmButton : Button
    private lateinit var loginToReqText : TextView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        init()

        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        loginConfirmButton.setOnClickListener(){
            val requestModelLogin = RequestModelLogin(loginEmail.text.toString(), loginPassword.text.toString())

            response.sendReq(requestModelLogin).enqueue(
                object : Callback<ResponseModel> {
                    override fun onResponse(
                        call: Call<ResponseModel>,
                        response: Response<ResponseModel>,
                    ) {
                        if(response.code() == 401){
                            loginPassword.setBackgroundResource(R.drawable.email_error)
                            loginPassword.error = "A jelszó nem egyezik!"
                        } else if(response.code() == 404) {
                            loginEmail.setBackgroundResource(R.drawable.email_error)
                            loginEmail.error = "Ilyen e-maillel nincs regisztrálva felhasználó!"
                        }
                        else {
                            loginEmail.setBackgroundResource(R.drawable.email_normal)
                            loginPassword.setBackgroundResource(R.drawable.email_normal)
                            val responseBody = response.body()
                            if (responseBody != null) {
                                val jwtToken: String = responseBody.token
                                val tokenUtils = TokenUtils(this@LoginActivity)
                                tokenUtils.saveAccessToken(jwtToken)
                                val logSuccessful =
                                    Intent(this@LoginActivity, MapsActivity::class.java)
                                startActivity(logSuccessful)
                                finish()
                            }
                        }
                    }
                    override fun onFailure(call: Call<ResponseModel>, t: Throwable) {
                        Log.i("Error", t.toString())
                    }
                }
            )
        }

        loginToReqText.setOnClickListener(){
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
            overridePendingTransition(R.transition.slide_in_right, R.transition.slide_out_left);
            finish()
        }
    }

    fun init(){
        loginEmail = findViewById(R.id.loginEmail)
        loginPassword = findViewById(R.id.loginPassword)
        loginConfirmButton = findViewById(R.id.loginConfirmButton)
        loginToReqText = findViewById(R.id.loginToReqText)
    }
}

