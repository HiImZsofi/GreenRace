package com.example.greenrace

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import com.google.gson.annotations.SerializedName


//user info data model

class RequestModelRegistration(username: String, password: String, email: String) {
    @get:JsonCreator
    @JsonProperty("username")
    val username: String = username

    @JsonProperty("password")
    val password: String = password

    @JsonProperty("email")
    val email: String = email
}

class RequestModelLogin(email: String, password: String) {
    @get:JsonCreator
    @JsonProperty("email")
    val email: String = email

    @JsonProperty("password")
    val password: String = password
}

//http response model
data class ResponseModel(
    @JsonProperty("result") val message: String?
)

//class RouteData(){
//    @get:JsonCreator
//    @get:JsonProperty("routeData")
//    private val routeData: ArrayList<Route>
//        get() {
//            return routeData
//        }
//}

class RouteData @JsonCreator constructor(
    @JsonProperty("routeData") val routeData: List<Route>
)

class Route @JsonCreator constructor(
    @JsonProperty("route_id") routeId :String,
    @JsonProperty("route_short_name") routeShortName: String,
    @JsonProperty("route_type") routeType: Int
) {
    @JsonProperty("route_id")
    @SerializedName("route_id")
    val routeId:String = routeId

    @JsonProperty("route_short_name")
    @SerializedName("route_short_name")
    val routeShortName: String = routeShortName

    @JsonProperty("route_type")
    @SerializedName("route_type")
    val routeType: Int = routeType
}

class RequestModelStopsData @JsonCreator constructor(lineId: String){
    @JsonProperty("lineid")
    @SerializedName("lineid")
    val lineId:String = lineId
}

//It's value is set to the result of the GET request to /get/routeData
class StopsData @JsonCreator constructor(
    @JsonProperty("stopNames") val stopNamesList: Array<List<Stop>>
)

//Handles a stop object
//Used when the line is selected and an two arrays of stops are returned
class Stop @JsonCreator constructor(
    @JsonProperty("stopname") stopName: String,
    @JsonProperty("stoplat") stopLat: String,
    @JsonProperty("stoplon") stopLon: String
) {
    @JsonProperty("stopname")
    @SerializedName("stopname")
    val stopName: String = stopName

    @JsonProperty("stoplat")
    @SerializedName("stoplat")
    val stopLat: String = stopLat

    @JsonProperty("stoplon")
    @SerializedName("stoplon")
    val stopLon: String = stopLon

}
