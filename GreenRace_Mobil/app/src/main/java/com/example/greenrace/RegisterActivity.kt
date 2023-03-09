package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.fasterxml.jackson.databind.exc.MismatchedInputException
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class RegisterActivity : AppCompatActivity() {

    private lateinit var registrationEmail: EditText
    private lateinit var registrationPassword: EditText
    private lateinit var registrationUsername: EditText
    private lateinit var registrationConfirmButton: Button
    private lateinit var regToLoginText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        init()

        //http service builder
        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        registrationConfirmButton.setOnClickListener {

            //putting user info into the request model class
            val requestModelRegistration = RequestModelRegistration(
                registrationUsername.text.toString(),
                registrationPassword.text.toString(),
                registrationEmail.text.toString()
            )

            if (isValidEmail(registrationEmail.text.toString()) == false) {
                registrationEmail.setBackgroundResource(R.drawable.email_error)
                registrationEmail.error = "Az e-mail cím nem megfelelő formátumú!"
            } else {
                registrationEmail.setBackgroundResource(R.drawable.email_normal)
                registrationPassword.setBackgroundResource(R.drawable.email_normal)
                registrationUsername.setBackgroundResource(R.drawable.email_normal)

                response.sendReq(requestModelRegistration).enqueue(
                    object : Callback<ResponseModel> {
                        //callback for a response
                        override fun onResponse(
                            call: Call<ResponseModel>,
                            response: Response<ResponseModel>
                        ) {
                            //if email is already taken catch 500 response code
                            if (response.code() == 500) {
                                //change background resource to red
                                registrationEmail.setBackgroundResource(R.drawable.email_error)
                                registrationEmail.error = "Ez az e-mail cím már foglalt!"
                            } /*else if(response.code() == 200) {
                                    startActivity(regSuccessful)
                                    finish()
                                }*/ else {
                                val regSuccessful =
                                    Intent(this@RegisterActivity, LoginActivity::class.java)

                                startActivity(regSuccessful)
                                finish()
                                registrationEmail.setBackgroundResource(R.drawable.email_normal)
                                registrationPassword.setBackgroundResource(R.drawable.email_normal)
                                registrationUsername.setBackgroundResource(R.drawable.email_normal)
                            }
                        }

                        //response failure call
                        override fun onFailure(call: Call<ResponseModel>, t: Throwable) {
                            /*startActivity(regSuccessful)
                                finish()
                                registrationEmail.setBackgroundResource(R.drawable.email_normal)
                                registrationPassword.setBackgroundResource(R.drawable.email_normal)
                                registrationUsername.setBackgroundResource(R.drawable.email_normal)*/
                            Log.i("Error", t.toString())
                        }
                    }

                )
            }
        }

        regToLoginText.setOnClickListener() {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    fun isValidEmail(target: CharSequence?): Boolean {
        return !TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches()
    }

    fun init() {
        registrationEmail = findViewById(R.id.registrationEmail)
        registrationPassword = findViewById(R.id.registrationPassword)
        registrationConfirmButton = findViewById(R.id.registrationConfirmButton)
        registrationUsername = findViewById(R.id.registrationUsername)
        regToLoginText = findViewById(R.id.regToLoginText)
    }
}