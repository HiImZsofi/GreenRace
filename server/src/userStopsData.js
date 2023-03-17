import mysql from "mysql2";
import fetch from "node-fetch";

//Connect to database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "greenRace",
  port: "3306",
});

var userGivenId = "0050";

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

var routeData = await fetchData();
var routeStops = routeData.data.entry.variants;
var route1 = [];
var route2 = [];
var bothRoutes = [];
routeStops.forEach((element) => {
  bothRoutes.push(element.stopIds);
});

export function getRoutes() {
  route1 = bothRoutes[0];
  route2 = bothRoutes[1];
  console.log(route2);
  if (route1.length > route2.length) {
    return route1;
  } else if (route2.length > route1.length) {
    return route2;
  } else {
    return route1;
  }
}
