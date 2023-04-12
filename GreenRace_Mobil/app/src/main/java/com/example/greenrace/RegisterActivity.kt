package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.greenrace.swipeTouchListener.OnSwipeTouchListener
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
    private lateinit var myView : LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        init()
        // Set up swipe listener on your view
        val swipeListener = object : OnSwipeTouchListener(this@RegisterActivity) {
            override fun onSwipeRight() {
                // Change to new page here
                val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
                startActivity(intent)
                overridePendingTransition(R.transition.slide_in_left, R.transition.slide_out_right)
                finish()
            }
        }
        myView.setOnTouchListener(swipeListener)

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
                    object : Callback<RegistrationResponseModel> {
                        //callback for a response
                        override fun onResponse(
                            call: Call<RegistrationResponseModel>,
                            response: Response<RegistrationResponseModel>
                        ) {
                            //if email is already taken catch 500 response code
                            if (response.code() == 500) {
                                //change background resource to red
                                registrationEmail.setBackgroundResource(R.drawable.email_error)
                                registrationEmail.error = "Ez az e-mail cím már foglalt!"
                            } else if(response.code() == 204) {
                                registrationPassword.setBackgroundResource(R.drawable.email_error)
                                registrationPassword.error = "Jelszó nem lehet üres!"
                                } else {
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
                        override fun onFailure(call: Call<RegistrationResponseModel>, t: Throwable) {
                            Log.i("Error", t.toString())
                        }
                    }

                )
            }
        }

        regToLoginText.setOnClickListener() {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            overridePendingTransition(R.transition.slide_in_left, R.transition.slide_out_right);
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
        myView = findViewById(R.id.myView)
    }
}