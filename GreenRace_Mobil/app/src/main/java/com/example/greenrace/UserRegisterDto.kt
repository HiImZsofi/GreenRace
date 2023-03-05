package com.example.greenrace

import android.provider.ContactsContract.CommonDataKinds.Email

data class UserRegisterDto(val name: String, val password: String, val email: String)