package com.example.greenrace.sharedPreferences

import android.content.Context
import android.content.SharedPreferences

class PageNum(context: Context) {
    private val sharedPreferences: SharedPreferences = context.getSharedPreferences("mySharedPreferences", Context.MODE_PRIVATE)

    fun savePageNum(pageNum: Int) {
        val editor = sharedPreferences.edit()
        editor.putString("page", pageNum.toString())
        editor.apply()
    }

    fun getPageNum() :String? {
        return sharedPreferences.getString("page", null)
    }

    fun clearPageNum() {
        val editor = sharedPreferences.edit()
        editor.remove("page")
        editor.apply()
    }
}