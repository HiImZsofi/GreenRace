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
    @JsonProperty("result") val message: String?,
    @JsonProperty("Authorization") val token: String
)

data class RegistrationResponseModel(
    @JsonProperty("result") val message: String?,
)

class RouteData @JsonCreator constructor(
    @JsonProperty("routeData") val routeData: List<Route>
)

class Route @JsonCreator constructor(
    @JsonProperty("route_id") routeId: String,
    @JsonProperty("route_short_name") routeShortName: String,
    @JsonProperty("route_type") routeType: Int
) {
    @JsonProperty("route_id")
    @SerializedName("route_id")
    val routeId: String = routeId

    @JsonProperty("route_short_name")
    @SerializedName("route_short_name")
    val routeShortName: String = routeShortName

    @JsonProperty("route_type")
    @SerializedName("route_type")
    val routeType: Int = routeType
}

class RequestModelStopsData @JsonCreator constructor(lineId: String) {
    @JsonProperty("lineid")
    @SerializedName("lineid")
    val lineId: String = lineId
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

//This objects is used to store the data entered by the user
//And when he clicks the log route button this object is sent to the server to store it in the database
class RequestModelLogRoute @JsonCreator constructor(
    token: String,
    routeType: Int,
    routeId: String,
    getOnStop: String,
    getOffStop: String
) {
    @JsonProperty("token")
    @SerializedName("token")
    val token: String = token

    @JsonProperty("routeType")
    @SerializedName("routeType")
    val routeType: Int = routeType

    @JsonProperty("route_id")
    @SerializedName("route_id")
    val routeId: String = routeId

    @JsonProperty("onStop")
    @SerializedName("onStop")
    val getOnStop: String = getOnStop

    @JsonProperty("offStop")
    @SerializedName("offStop")
    val getOffStop: String = getOffStop
}

class ResponseModelLogRoute @JsonCreator constructor(@JsonProperty("emission") val emission: Emission)

//Stores the two values that the client gets from the server when they log a route
class Emission @JsonCreator constructor(
    @JsonProperty("finalEmission") finalEmission: Double,
    @JsonProperty("distance") distance: Double
) {
    @JsonProperty("finalEmission")
    @SerializedName("finalEmission")
    val finalEmission: Double = finalEmission

    @JsonProperty("distance")
    @SerializedName("distance")
    val distance: Double = distance
}

class RequestModelUserPage @JsonCreator constructor(authorization: String) {
    @JsonProperty("Authorization")
    val authorization: String = authorization
}

class ResponseModelUserPage @JsonCreator constructor(@JsonProperty("userData") val userpagedata: UserPage)
class ResponseModelUserPageChart @JsonCreator constructor(@JsonProperty("chartdata") val userpagechartdata: List<ChartData>)

class ResponseModelRankList @JsonCreator constructor(@JsonProperty("userData") val rankpagedata: List<RankItem>)

class ChartData @JsonCreator constructor(
    @JsonProperty("emission") emission: Double
){
    @JsonProperty("emission")
    @SerializedName("emission")
    val emission: Double = emission
}
class UserPage @JsonCreator constructor(
    @JsonProperty("username") username: String,
    @JsonProperty("picfilepath") picfilepath: String?,
    @JsonProperty("points") points: Int,
    @JsonProperty("email") email: String
) {
    @JsonProperty("username")
    @SerializedName("username")
    val username: String = username

    @JsonProperty("picfilepath")
    @SerializedName("picfilepath")
    val picfilepath: String? = picfilepath

    @JsonProperty("points")
    @SerializedName("points")
    val points: Int = points

    @JsonProperty("email")
    @SerializedName("email")
    val email: String = email
}

class ResponseModelAchievements @JsonCreator constructor(@JsonProperty("achievements") val achievements: List<Achievement>)

class Achievement @JsonCreator constructor(
    @JsonProperty("name") name: String,
    @JsonProperty("description") description: String,
    @JsonProperty("completed") completed: Boolean,
    @JsonProperty("progress") progress: Int
) {
    @JsonProperty("name")
    @SerializedName("name")
    val name: String = name

    @JsonProperty("description")
    @SerializedName("description")
    val description: String = description

    @JsonProperty("completed")
    @SerializedName("completed")
    val completed: Boolean = completed

    @JsonProperty("progress")
    @SerializedName("progress")
    val progress: Int = progress

}

class RankItem @JsonCreator constructor(
    @JsonProperty("username") username: String,
    @JsonProperty("picfilepath") picfilepath: String?,
    @JsonProperty("points") points: Int,
) {
    @JsonProperty("username")
    @SerializedName("username")
    val username: String = username
    @JsonProperty("picfilepath")
    @SerializedName("picfilepath")
    val picfilepath: String? = picfilepath
    @JsonProperty("points")
    @SerializedName("points")
    val points: Int = points
}
