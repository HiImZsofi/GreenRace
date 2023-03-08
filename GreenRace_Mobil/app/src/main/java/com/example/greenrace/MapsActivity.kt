package com.example.greenrace

import android.Manifest
import android.content.pm.PackageManager
import android.location.Location
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions

internal class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private val PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION = 1

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var mLocationPermissionGranted = false

    private lateinit var mMap: GoogleMap

    private lateinit var latitudeTextView: TextView
    private lateinit var longitudeTextView: TextView

    private var lat = 0.0
    private var lng = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)
        latitudeTextView = findViewById(R.id.latitude)
        longitudeTextView = findViewById(R.id.longitude)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment

        getLocationPermission()


        try {
            fusedLocationClient.lastLocation
                .addOnSuccessListener { location: Location? ->
                    // Got last known location. In some rare situations this can be null.
                    if (location != null) {
                        lat = location.latitude
                        lng = location.longitude
                        mapFragment.getMapAsync(this)
                    } else {
                       mapFragment.getMapAsync { mMap->
                           val notSydney = LatLng(47.4980635,19.0472096)
                           mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(notSydney, 10F))
                       }
                    }
                }
        } catch (e: SecurityException) {
            // Handle exception
            Log.e("Security Exception", e.message.toString())
        }
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Add a marker in Sydney and move the camera
        val sydney = LatLng(lat, lng)
        mMap.addMarker(
            MarkerOptions()
                .position(sydney)
                .title("Te most itt vagy")
                .icon(BitmapDescriptorFactory.defaultMarker(140F))
        )?.showInfoWindow()
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sydney, 17F))
    }

    private fun getLocationPermission() {
        if (ContextCompat.checkSelfPermission(
                this.applicationContext,
                Manifest.permission.ACCESS_FINE_LOCATION
            )
            == PackageManager.PERMISSION_GRANTED
        ) {
            mLocationPermissionGranted = true
        } else {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION
            )
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        mLocationPermissionGranted = false
        when (requestCode) {
            PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION -> {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    mLocationPermissionGranted = true
                }
            }
        }
    }


}

      