package com.example.greenrace

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class MainActivity : AppCompatActivity() {
    private lateinit var registerButton : Button
    private lateinit var loginButton : Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        init()

        registerButton.setOnClickListener(){
            navigateToRegistry()
        }

        loginButton.setOnClickListener(){
            navigateToLogin()
        }

    }
    //create intent for navigation
    fun navigateToRegistry(){
        val intent = Intent(this, RegisterActivity::class.java)
        startActivity(intent)
    }
    fun navigateToLogin(){
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
    }


    fun init() {
        registerButton = findViewById(R.id.registerButton)
        loginButton = findViewById(R.id.loginButton)
    }
}