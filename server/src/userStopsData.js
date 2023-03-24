import mysql from "mysql2";
import fetch from "node-fetch";
import { getStops } from "./queries.js";
import * as turf from "@turf/turf";

//Connect to database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "greenRace",
  port: "3306",
});

//hardcoded string until I receive actual data
// var userGivenId = "3010";

//fetch data based on route ID from BKK API
async function fetchData(userGivenId) {
  const res = await fetch(
    "https://futar.bkk.hu/api/query/v1/ws/otp/api/where/route-details?routeId=BKK_" +
      userGivenId +
      "&date=20210707&related=false&appVersion=1.1.abc&version=2&includeReferences=true",
    { "Content-Type": "application/json" }
  );
  var userRouteData = await res.json();
  console.log("Data fetched");
  //console.log(userRouteData);
  return userRouteData;
}

//*This function splits the data from the API call into two arrays
//*Then formats the id values of the arrays
//*And pushes the objects with the updated IDs to stops1 and stops2 arrays
async function formatStopArrays(userGivenId) {
	//put API given data into a variable
	var routeData = await fetchData(userGivenId);

	//access stop ids from nested json object
	var routeStops = await routeData.data.entry.variants;
	//console.log(routeStops);

	//push every stop id into an array
	var bothRoutes = [];
	routeStops.forEach((element) => {
		bothRoutes.push(element.stopIds);
	});

	//split the two arrays into two lines
	var route1 = bothRoutes[0];
	var route2 = bothRoutes[1];

	stops1 = [];
	stops2 = [];

	//cut BKK_ from strings so they can actually match with the database
	for (let j = 0; j < route1.length; j++) {
		stops1.push(route1[j].slice(4));
	}
	for (let j = 0; j < route2.length; j++) {
		stops2.push(route2[j].slice(4));
	}
}

var stops1;
var stops2;
var stopNames1;
var stopNames2;

//function for matching the stop_ids with stop names from database
//*The userGivenId is sent from the client when a new line is selected
//*It is used to return the proper stops for the selected line
export async function setStopNames(userGivenId) {
  await formatStopArrays(userGivenId);
  stopNames1 = [];
  stopNames2 = [];
  var queryRes = await getStops().catch((err) => {
    throw err;
  });
  for (let i = 0; i < stops1.length; i++) {
    for (let j = 0; j < queryRes.length; j++) {
      //if id in query matches with id in array push neccessary data into object array
      if (JSON.parse(JSON.stringify(queryRes[j]["stop_id"])) === stops1[i]) {
        stopNames1.push({
          stopname: JSON.parse(JSON.stringify(queryRes[j]["stop_name"])),
          stoplat: JSON.parse(JSON.stringify(queryRes[j]["stop_lat"])),
          stoplon: JSON.parse(JSON.stringify(queryRes[j]["stop_lon"])),
        });
      }
    }
  }
  //console.log(stopNames1);
  for (let i = 0; i < stops2.length; i++) {
    for (let j = 0; j < queryRes.length; j++) {
      if (JSON.parse(JSON.stringify(queryRes[j]["stop_id"])) === stops2[i]) {
        stopNames2.push({
          stopname: JSON.parse(JSON.stringify(queryRes[j]["stop_name"])),
          stoplat: JSON.parse(JSON.stringify(queryRes[j]["stop_lat"])),
          stoplon: JSON.parse(JSON.stringify(queryRes[j]["stop_lon"])),
        });
      }
    }
  }
  return [stopNames1, stopNames2];
}

//setStopNames("3010");
