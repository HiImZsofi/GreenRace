package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.widget.Button

class RedirectActivity : AppCompatActivity() {
    private lateinit var registerButton : Button
    private lateinit var loginButton : Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val intent = Intent(this@RedirectActivity, MapsActivity::class.java)
        startActivity(intent)

        init()

        registerButton.setOnClickListener {
            navigateToRegistry()
        }

        loginButton.setOnClickListener {
            navigateToLogin()
        }

    }
    //create intent for navigation
    fun navigateToRegistry(){
        val intent = Intent(this@RedirectActivity, RegisterActivity::class.java)
        startActivity(intent)
        finish()
    }
    fun navigateToLogin(){
        val intent = Intent(this@RedirectActivity, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }


    fun init() {
        registerButton = findViewById(R.id.registerButton)
        loginButton = findViewById(R.id.loginButton)
    }
}