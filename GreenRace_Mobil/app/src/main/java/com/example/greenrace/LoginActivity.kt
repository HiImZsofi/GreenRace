package com.example.greenrace

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var loginEmail : EditText
    private lateinit var loginPassword : EditText
    private lateinit var loginConfirmButton : Button
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
                        response: Response<ResponseModel>
                    ) {
                        if(response.code() == 401){
                            loginEmail.setBackgroundResource(R.drawable.email_error)
                            loginPassword.setBackgroundResource(R.drawable.email_error)
                            loginEmail.error = "Az e-mail cím vagy a jelszó nem egyezik!"
                            loginPassword.error = "Az e-mail cím vagy a jelszó nem egyezik!"
                        } else if(response.code() == 404) {
                            loginEmail.setBackgroundResource(R.drawable.email_error)
                            loginEmail.error = "Ilyen e-maillel nincs regisztrálva felhasználó!"
                        }
                        else {
                            loginEmail.setBackgroundResource(R.drawable.email_normal)
                            loginPassword.setBackgroundResource(R.drawable.email_normal)
                        }
                    }
                    override fun onFailure(call: Call<ResponseModel>, t: Throwable) {
                        Log.i("Error", t.toString())
                    }
                }
            )
        }
    }

    fun init(){
        loginEmail = findViewById(R.id.loginEmail)
        loginPassword = findViewById(R.id.loginPassword)
        loginConfirmButton = findViewById(R.id.loginConfirmButton)
    }
}