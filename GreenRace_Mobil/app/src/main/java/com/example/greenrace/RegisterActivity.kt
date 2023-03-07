package com.example.greenrace

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.fasterxml.jackson.databind.exc.MismatchedInputException
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    private lateinit var registrationEmail : EditText
    private lateinit var registrationPassword : EditText
    private lateinit var registrationUsername : EditText
    private lateinit var registrationConfirmButton : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        init()

        //http service builder
        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        registrationConfirmButton.setOnClickListener {

            //putting user info into the request model class
            val requestModel = RequestModel(registrationUsername.text.toString(), registrationPassword.text.toString(), registrationEmail.text.toString())

            try{
                response.sendReq(requestModel).enqueue(
                    object : Callback<ResponseModel> {

                        //callback for a response
                        override fun onResponse(
                            call: Call<ResponseModel>,
                            response: Response<ResponseModel>
                        ) {
                            //if email is already taken catch 500 response code
                            if(response.code() == 500){
                                //change background resource to red
                                registrationEmail.setBackgroundResource(R.drawable.email_error)
                                registrationEmail.setError("Ez az e-mail cím már foglalt!")
                            } else{
                                registrationEmail.setBackgroundResource(R.drawable.email_normal)
                            }
                        }
                        //response failure call
                        override fun onFailure(call: Call<ResponseModel>, t: Throwable) {
                            Log.i("Error", t.toString())
                        }
                    }
                )
            }catch (e: MismatchedInputException){//TODO correct this error
                Log.e("Error", e.message.toString())
            }

        }
    }

    fun init(){
        registrationEmail = findViewById(R.id.registrationEmail)
        registrationPassword = findViewById(R.id.registrationPassword)
        registrationConfirmButton = findViewById(R.id.registrationConfirmButton)
        registrationUsername = findViewById(R.id.registrationUsername)
    }
}