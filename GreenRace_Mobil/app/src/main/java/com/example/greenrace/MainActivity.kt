// Imports
package com.example.greenrace

import android.app.Dialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import com.example.greenrace.sharedPreferences.PageNum
import com.example.greenrace.sharedPreferences.TokenUtils
import com.example.greenrace.swipeTouchListener.OnSwipeTouchListener
import com.google.android.material.navigation.NavigationView
import retrofit2.Call
import retrofit2.Response
import javax.security.auth.callback.Callback
import kotlin.math.log

class MainActivity : AppCompatActivity() {
    // Declare variables and views
    private lateinit var myView: LinearLayout
    private lateinit var pageName: TextView
    private lateinit var drawerLayout: DrawerLayout
    private lateinit var buttonOpenDrawer: ImageButton

    private var menulist: List<String> = listOf("Pontjaim", "Rangsor", "Barátok")
    private var pagenumber: Int = 0
    private var fragmentlist: List<Fragment> = listOf(UserPageFragment(), RankPageFragment(), FriendPageFragment())
    // Override the onCreate method to initialize views and set up the layout
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        init()
        getdata()
        setUpDrawerLayout()
        setUpSwipeListener()
        setter()
    }
    private fun getdata(){
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val tokenUtils = TokenUtils(this@MainActivity)
        val token = tokenUtils.getAccessToken()
        if(token!=null){
        response.sendReqUser("Bearer " + token).enqueue(
           object: retrofit2.Callback<ResponseModelUserPage> {
               override fun onResponse(
                   call: Call<ResponseModelUserPage>,
                   response: Response<ResponseModelUserPage>
               ) {
                   Log.i("Token", token)
               }

               override fun onFailure(call: Call<ResponseModelUserPage>, t: Throwable) {
                   Log.i("Error", t.toString())
               }
           }
        )}

    }
    // Set the page name and replace the fragment
    private fun setter() {
        pageName.text = menulist[pagenumber]
        replaceFragment(R.id.fragmentContainerView, fragmentlist[pagenumber])
    }
    // Replace the current fragment with the fragment at the given frame ID
    private inline fun FragmentManager.doTransaction(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().func().commit()
    }

    private fun AppCompatActivity.replaceFragment(frameId: Int, fragment: Fragment) {
        supportFragmentManager.doTransaction { replace(frameId, fragment) }
    }
    // Set up the swipe listener for the view
    private fun setUpSwipeListener() {
        val swipeListener = object : OnSwipeTouchListener(this@MainActivity) {
            override fun onSwipeLeft() {
                if (pagenumber < menulist.size - 1) {
                    pagenumber++
                } else {
                    pagenumber = 0
                }
                val pageNum = PageNum(this@MainActivity)
                pageNum.savePageNum(pagenumber)
                val intent = Intent(this@MainActivity, MainActivity::class.java)
                startActivity(intent)
                overridePendingTransition(R.transition.slide_in_right, R.transition.slide_out_left)
                finish()
            }

            override fun onSwipeRight() {
                if (pagenumber > 0) {
                    pagenumber--
                } else {
                    pagenumber = menulist.size - 1
                }
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

    // Set up the drawer layout, including open and close drawer methods
    private fun setUpDrawerLayout() {
        buttonOpenDrawer.setOnClickListener {
            openCloseDrawer(buttonOpenDrawer)
        }
        val openDialog = Dialog(this)
        openDialog.setContentView(R.layout.nav_header)
        val closeButton = openDialog.findViewById<ImageButton>(R.id.close_button)
        closeButton.setOnClickListener {
            drawerLayout.closeDrawer(GravityCompat.END)
        }
        val navigationView = findViewById<NavigationView>(R.id.navigation_drawer)
        navigationView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.nav_point -> {
                    val intent = Intent(this@MainActivity, MainActivity::class.java)
                    navigateToPage(0, intent)
                    true
                }
                R.id.nav_rank -> {
                    val intent = Intent(this@MainActivity, MainActivity::class.java)
                    navigateToPage(1, intent)
                    true
                }
                R.id.nav_friend -> {
                    val intent = Intent(this@MainActivity, MainActivity::class.java)
                    navigateToPage(2, intent)
                    true
                }
                R.id.nav_map -> {
                    val intent = Intent(this@MainActivity, MapsActivity::class.java)
                    navigateToPage(null, intent)
                    true
                }
                R.id.nav_profile -> {
                    //TODO redirect to profile picture setter
                    true
                }
                R.id.nav_settings -> {
                    //TODO redirect to settings
                    true
                }
                R.id.nav_logout -> {
                    val tokenUtils = TokenUtils(this@MainActivity)
                    tokenUtils.clearToken()
                    val pageNum = PageNum(this@MainActivity)
                    pageNum.clearPageNum()
                    val intent = Intent(this@MainActivity, LoginActivity::class.java)
                    navigateToPage(null, intent)
                    true
                }
                else -> false
            }
        }

    }

    fun navigateToPage(pageNum: Int?, intent: Intent) {
        if(pageNum != null) {
        val pageNumObj = PageNum(this@MainActivity)
        pageNumObj.savePageNum(pageNum)
        }
        startActivity(intent)
        finish()
    }
    fun openCloseDrawer(view: View){
        if (drawerLayout.isDrawerOpen(GravityCompat.END)) {
            drawerLayout.closeDrawer(GravityCompat.END)
        } else {
            drawerLayout.openDrawer(GravityCompat.END)
        }
    }

    // Initialize views and variables
    fun init() {
        myView = findViewById(R.id.myView)
        pageName = findViewById(R.id.pageName)
        drawerLayout = findViewById(R.id.drawer_layout)
        buttonOpenDrawer = findViewById(R.id.open_button)
        val pageNum = PageNum(this@MainActivity)
        var page = pageNum.getPageNum()

        if(!page.isNullOrEmpty()){
            pagenumber = page.toInt()
        } else {
            pagenumber = 0
        }
    }
}