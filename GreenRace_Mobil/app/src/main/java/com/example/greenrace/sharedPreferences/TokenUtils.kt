package com.example.greenrace.sharedPreferences

import android.content.Context
import android.content.SharedPreferences

class TokenUtils(context: Context) {
    private val sharedPreferences: SharedPreferences = context.getSharedPreferences("mySharedPreferences", Context.MODE_PRIVATE)

    fun saveAccessToken(token: String) {
        val editor = sharedPreferences.edit()
        editor.putString("key", token)
        editor.apply()
    }

    fun getAccessToken(): String? {
        return sharedPreferences.getString("key", null)
    }

    fun clearToken() {
        val editor = sharedPreferences.edit()
        editor.remove("key")
        editor.apply()
    }
}