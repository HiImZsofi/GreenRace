import mysql from "mysql2";
import fetch from "node-fetch";
import { getStops } from "./queries.js";

//Connect to database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "greenRace",
  port: "3306",
});

//hardcoded string until I receive actual data
var userGivenId = "5200";

//fetch data based on route ID from BKK API
async function fetchData() {
  const res = await fetch(
    "https://futar.bkk.hu/api/query/v1/ws/otp/api/where/route-details?routeId=BKK_" +
      userGivenId +
      "&date=20210707&related=false&appVersion=1.1.abc&version=2&includeReferences=true",
    { "Content-Type": "application/json" }
  );
  var userRouteData = await res.json();
  console.log("Data fetched");
  return userRouteData;
}

//put API given data into a variable
var routeData = await fetchData();

//access stop ids from nested json object
var routeStops = routeData.data.entry.variants;

//push every stop id into an array
var bothRoutes = [];
routeStops.forEach((element) => {
  bothRoutes.push(element.stopIds);
});

//split the two arrays into two lines
var route1 = bothRoutes[0];
var route2 = bothRoutes[1];

var stops1 = [];
var stops2 = [];
var stopNames1 = [];
var stopNames2 = [];

//cut BKK_ from strings so they can actually match with the database
for (let j = 0; j < route1.length; j++) {
  stops1.push(route1[j].slice(4));
}
for (let j = 0; j < route2.length; j++) {
  stops2.push(route2[j].slice(4));
}

//function for matching the stop_ids with stop names from database
export async function setStopNames() {
  var queryRes = await getStops().catch((err) => {
    throw err;
  });
  for (let i = 0; i < queryRes.length; i++) {
    for (let j = 0; j < stops1.length; j++) {
      //if id in query matches with id in array push neccessary data into object array
      if (JSON.parse(JSON.stringify(queryRes[i]["stop_id"])) === stops1[j]) {
        stopNames1.push({
          stopname: JSON.parse(JSON.stringify(queryRes[i]["stop_name"])),
          stoplat: JSON.parse(JSON.stringify(queryRes[i]["stop_lat"])),
          stoplon: JSON.parse(JSON.stringify(queryRes[i]["stop_lon"])),
        });
      }
    }
  }
  //console.log(stopNames1);
  for (let i = 0; i < queryRes.length; i++) {
    for (let j = 0; j < stops2.length; j++) {
      if (JSON.parse(JSON.stringify(queryRes[i]["stop_id"])) === stops2[j]) {
        stopNames2.push({
          stopname: JSON.parse(JSON.stringify(queryRes[i]["stop_name"])),
          stoplat: JSON.parse(JSON.stringify(queryRes[i]["stop_lat"])),
          stoplon: JSON.parse(JSON.stringify(queryRes[i]["stop_lon"])),
        });
      }
    }
  }
  return { stopNames1, stopNames2 };
}