// Imports
package com.example.greenrace

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
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
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    private lateinit var myView: LinearLayout
    private lateinit var pageName: TextView
    private lateinit var drawerLayout: DrawerLayout
    private lateinit var buttonOpenDrawer: ImageButton

    private var menulist: List<String> = listOf("Pontjaim", "Rangsor", "Utak")
    private var pagenumber: Int = 0
    private var fragmentlist: List<Fragment> =
        listOf(UserPageFragment(), RankPageFragment(), RouteLogedPageFragment())

    private var username: String? = null
    private var email: String? = null
    private var picfilepath: String? = null

    // Override the onCreate method to initialize views and set up the layout
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        init()
        getData { username, email, picfilepath ->
            this@MainActivity.username = username
            this@MainActivity.email = email
            this@MainActivity.picfilepath = picfilepath
            setData()
            setUpDrawer()
        }
        setUpSwiper()

    }

    // Initialize views and variables
    fun init() {
        myView = findViewById(R.id.myView)
        pageName = findViewById(R.id.pageName)
        drawerLayout = findViewById(R.id.drawer_layout)
        buttonOpenDrawer = findViewById(R.id.open_button)

        val pageNum = PageNum(this@MainActivity)
        val page = pageNum.getPageNum()
        pagenumber = if (!page.isNullOrEmpty()) {
            page.toInt()
        } else {
            0
        }
    }

    // Get data from database
    private fun getData(callback: (username: String?, email: String?, picfilepath: String?) -> Unit) {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val tokenUtils = TokenUtils(this@MainActivity)
        val token = tokenUtils.getAccessToken()
        val requestUserData = "Bearer " + token

        response.sendReqUser(requestUserData).enqueue(
            object : Callback<ResponseModelUserPage> {
                override fun onResponse(
                    call: Call<ResponseModelUserPage>,
                    response: Response<ResponseModelUserPage>
                ) {
                    if (token != null) {
                        Log.i("Token", token)
                        val username = response.body()?.userpagedata?.username
                        val email = response.body()?.userpagedata?.email
                        val picfilepath = response.body()?.userpagedata?.picfilepath
                        callback(username, email, picfilepath)
                    }
                }

                override fun onFailure(call: Call<ResponseModelUserPage>, t: Throwable) {
                    Log.i("Error", t.toString())
                }
            }
        )
    }

    // Set up the drawer layout, including open and close drawer methods
    private fun setUpDrawer() {
        buttonOpenDrawer.setOnClickListener {
            openCloseDrawer(buttonOpenDrawer)
        }
        val navigationView = findViewById<NavigationView>(R.id.navigation_drawer)
        val headerDialog: View = navigationView.getHeaderView(0)
        val closeButton = headerDialog.findViewById<ImageButton>(R.id.close_button)
        val usernameHeader = headerDialog.findViewById<TextView>(R.id.nav_username)
        val emailHeader = headerDialog.findViewById<TextView>(R.id.nav_email)
        val profilepicHeader = headerDialog.findViewById<ImageView>(R.id.nav_profilepic)
        closeButton.setOnClickListener {
            drawerLayout.closeDrawer(GravityCompat.END)
        }
        usernameHeader?.text = username.toString()
        emailHeader?.text = email.toString()
        if (picfilepath != null) {
            val drawableResId =
                resources.getIdentifier(picfilepath?.split(".")?.get(0), "drawable", packageName)
            profilepicHeader?.setImageResource(drawableResId)
        } else {
            profilepicHeader?.setImageResource(R.drawable.npic)
        }
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
                R.id.nav_logged_routes -> {
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
                    val intent = Intent(this@MainActivity, ProfpicSetterActivity::class.java)
                    navigateToPage(null, intent)
                    true
                }
                R.id.nav_settings -> {
                    val settingsIntent = Intent(this@MainActivity, SettingsActivity::class.java)
                    navigateToPage(null, settingsIntent)
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
        if (pageNum != null) {
            val pageNumObj = PageNum(this@MainActivity)
            pageNumObj.savePageNum(pageNum)
        }
        startActivity(intent)
        finish()
    }

    fun openCloseDrawer(view: View) {
        if (drawerLayout.isDrawerOpen(GravityCompat.END)) {
            drawerLayout.closeDrawer(GravityCompat.END)
        } else {
            drawerLayout.openDrawer(GravityCompat.END)
        }
    }

    // Set up the swipe listener for the view
    private fun setUpSwiper() {
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

    // Set the page name, replace the fragment and set data values
    private fun setData() {
        pageName.text = menulist[pagenumber]
        replaceFragment(R.id.fragmentContainerView, fragmentlist[pagenumber])
    }

    // Replace the current fragment with the fragment at the given frame ID
    private inline fun FragmentManager.doTransaction(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().func().commit()
    }

    private fun AppCompatActivity.replaceFragment(frameId: Int, fragment: Fragment) {
        supportFragmentManager.doTransaction {  replace(frameId, fragment) }
    }
}