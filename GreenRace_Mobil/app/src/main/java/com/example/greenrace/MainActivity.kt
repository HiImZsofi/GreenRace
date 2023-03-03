package com.example.greenrace

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class MainActivity : AppCompatActivity() {
    private lateinit var registerButton : Button;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        init()

        registerButton.setOnClickListener(){
            navigateToRegistry()
        }

    }
    fun navigateToRegistry(){
        val intent = Intent(this, RegisterActivity::class.java)
        startActivity(intent)
    }


    fun init() {
        registerButton = findViewById(R.id.registerButton)
    }
}