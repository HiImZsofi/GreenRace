package com.example.greenrace


import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


private lateinit var registrationEmail : EditText
    private lateinit var registrationPassword : EditText
    private lateinit var registrationUsername : EditText
    private lateinit var registrationConfirmButton : Button

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        init()

        val response = ServiceBuilder.buildService(ApiInterface::class.java)

        registrationConfirmButton.setOnClickListener {
            val requestModel = RequestModel(registrationUsername.text.toString(), registrationPassword.text.toString(), registrationEmail.text.toString())

            response.sendReq(requestModel).enqueue(
                object : Callback<ResponseModel> {
                    override fun onResponse(
                        call: Call<ResponseModel>,
                        response: Response<ResponseModel>
                    ) {
                        if(response.code() == 500){
                            registrationEmail.setBackgroundResource(R.drawable.email_error)
                            registrationEmail.setError("Ez az e-mail cím már foglalt!")
                            Toast.makeText(this@RegisterActivity,"E-mail cím már foglalt!",Toast.LENGTH_LONG).show()
                        } else{
                            registrationEmail.setBackgroundResource(R.drawable.email_normal)
                        }
                    }

                    override fun onFailure(call: Call<ResponseModel>, t: Throwable) {
                        Toast.makeText(this@RegisterActivity,t.toString(),Toast.LENGTH_LONG).show()
                    }
                }
            )
        }
    }

    fun init(){
        registrationEmail = findViewById(R.id.registrationEmail)
        registrationPassword = findViewById(R.id.registrationPassword)
        registrationConfirmButton = findViewById(R.id.registrationConfirmButton)
        registrationUsername = findViewById(R.id.registrationUsername)
    }
}