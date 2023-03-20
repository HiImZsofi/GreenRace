package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.greenrace.swipeTouchListener.OnSwipeTouchListener
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import com.example.greenrace.sharedPreferences.PageNum

class MainActivity : AppCompatActivity() {
    private lateinit var myView : LinearLayout
    private lateinit var pageName : TextView
    var menulist: List<String> = listOf("UserPage", "RankPage", "FriendPage")
    var pagenumber: Int = 0
    var fragmentlist: List<Fragment> = listOf(UserPageFragment(),RankPageFragment(),FriendPageFragment())
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        init()
        setter()
        // Set up swipe listener on your view
        val swipeListener = object : OnSwipeTouchListener(this@MainActivity) {
            override fun onSwipeLeft() {
                if(pagenumber<menulist.size-1) { pagenumber++ } else { pagenumber = 0 }
                val pageNum = PageNum(this@MainActivity)
                pageNum.savePageNum(pagenumber)
                val intent = Intent(this@MainActivity, MainActivity::class.java)
                startActivity(intent)
                overridePendingTransition(R.transition.slide_in_right, R.transition.slide_out_left)
                finish()
            }

            override fun onSwipeRight() {
                if(pagenumber > 0) { pagenumber-- } else { pagenumber = menulist.size-1 }
                val pageNum = PageNum(this@MainActivity)
                pageNum.savePageNum(pagenumber)
                val intent = Intent(this@MainActivity, MainActivity::class.java)
                startActivity(intent)
                overridePendingTransition(R.transition.slide_in_left, R.transition.slide_out_right)
                finish()
            }
        }
        myView.setOnTouchListener(swipeListener)
    }
    inline fun FragmentManager.doTransaction(func: FragmentTransaction.() ->
    FragmentTransaction) {
        beginTransaction().func().commit()
    }
    fun AppCompatActivity.replaceFragment(frameId: Int, fragment: Fragment) {
        supportFragmentManager.doTransaction{replace(frameId, fragment)}
    }
    fun setter(){
        pageName.setText(menulist[pagenumber])
        replaceFragment(R.id.fragmentContainerView, fragmentlist[pagenumber])
    }
    fun init() {
        myView = findViewById(R.id.myView)
        pageName = findViewById(R.id.pageName)
        val pageNum = PageNum(this@MainActivity)
        var page = pageNum.getPageNum()
        if(page != null){
            pagenumber = page.toInt()
        }
    }
}