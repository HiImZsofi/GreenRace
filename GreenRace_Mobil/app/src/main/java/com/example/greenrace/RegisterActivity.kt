package com.example.greenrace


import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.async

    private lateinit var registrationEmail : EditText
    private lateinit var registrationPassword : EditText
    private lateinit var registrationUsername : EditText
    private lateinit var registrationConfirmButton : Button

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        init()

    }

    @OptIn(DelicateCoroutinesApi::class)
    fun testHttpRequest() = GlobalScope.async{
        val client = HttpClient(CIO){
            expectSuccess = true
        }
        /*val status = HttpClient().use { client ->

        }*/
        val response: HttpResponse = client.request("http://localhost:3001/register") {
            method = HttpMethod.Post
            headers {
                append(HttpHeaders.Accept, "application/json")
                //append(HttpHeaders.Authorization, "abc123")
            }
            setBody()
        }
    }

    fun getUserInput(){
        var userEmail = registrationEmail.text.toString()
        var userPassword = registrationPassword.text.toString()
    }

    fun init(){
        registrationEmail = findViewById(R.id.registrationEmail)
        registrationPassword = findViewById(R.id.registrationPassword)
        registrationConfirmButton = findViewById(R.id.registrationConfirmButton)
        registrationUsername = findViewById(R.id.registrationUsername)
    }
}