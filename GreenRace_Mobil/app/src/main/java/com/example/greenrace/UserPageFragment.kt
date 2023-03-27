package com.example.greenrace

import android.os.Bundle
import android.text.Html
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment

class UserPageFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_user_page, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val pointsTextView = view.findViewById<TextView>(R.id.ponts_textview)
        var point = 0
        var zpoint = getColoredString("Zöldpont", "#006400");
        pointsTextView.setText(Html.fromHtml(point.toString() + " " + zpoint + "-od van"))
    }

    private fun getColoredString(text: String, color: String): String? {
        return "<font color=$color>$text</font>"
    }
}