package com.example.greenrace

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
    private lateinit var registrationEmail : EditText
    private lateinit var registrationPassword : EditText
    private lateinit var registrationConfirmButton : Button

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        init()


    }

    fun getUserInput(){
        var userEmail = registrationEmail.text.toString()
        var userPassword = registrationPassword.text.toString()
    }

    fun init(){
        registrationEmail = findViewById(R.id.registrationEmail)
        registrationPassword = findViewById(R.id.registrationPassword)
        registrationConfirmButton = findViewById(R.id.registrationConfirmButton)
    }
}