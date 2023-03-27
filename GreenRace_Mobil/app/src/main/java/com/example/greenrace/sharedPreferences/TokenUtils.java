package com.example.greenrace.sharedPreferences;

import android.content.Context;
import android.content.SharedPreferences;

public class TokenUtils {
    private final SharedPreferences sharedPreferences;

    public TokenUtils(Context context){
        sharedPreferences = context.getSharedPreferences("mySharedPreferences", Context.MODE_PRIVATE);
    }

    public void saveAccessToken(String token){
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("key", token);
        editor.apply();
    }

    public String getAccessToken() {
        return sharedPreferences.getString("key", null);
    }

    public void clearToken() {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.remove("key");
        editor.apply();
    }
}
