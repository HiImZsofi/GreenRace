import { setStopNames } from "./userStopsData.js";
import * as turf from "@turf/turf";

//hardcoded user strings until receiving data
var userStop1 = "Kelenföld vasútállomás M";
var userStop2 = "Bécsi út / Vörösvári út";

var stopNames = await setStopNames();

//return with the longer array so every station will be included
function getLongerRoute() {
  if (stopNames[0].length > stopNames[1].length) {
    return stopNames[0];
  } else if (stopNames[0].length < stopNames[1].length) {
    return stopNames[1];
  } else {
    return stopNames[0];
  }
}

var longerRoute = getLongerRoute();
var stationIndexes = [];

console.log(longerRoute);
//get the array index of chosen stations
for (let index = 0; index < longerRoute.length; index++) {
  if (
    longerRoute[index]["stopname"] == userStop1 ||
    longerRoute[index]["stopname"] == userStop2
  ) {
    stationIndexes.push(index);
  }
}

//slice up array and only keep stations between the chosen ones
var stationsBetween = longerRoute.slice(
  stationIndexes[0],
  stationIndexes[1] + 1
);
console.log(stationsBetween);

function getDistance() {
  var distance = 0;
  var from_lat;
  var from_lon;
  var from;
  var to_lat;
  var to_lon;
  var to;
  for (let i = 0; i < stationsBetween.length; i++) {
    if (i + 2 == stationsBetween.length) {
      from_lat = parseFloat(stationsBetween[i].stoplat);
      from_lon = parseFloat(stationsBetween[i].stoplon);
      from = turf.point([from_lon, from_lat]);
      //console.log(from);

      to_lat = parseFloat(stationsBetween[i + 1].stoplat);
      to_lon = parseFloat(stationsBetween[i + 1].stoplon);
      to = turf.point([to_lon, to_lat]);

      //console.log(to_lat);

      distance = distance + turf.distance(from, to);
      return distance;
    }
    from_lat = parseFloat(stationsBetween[i].stoplat);
    from_lon = parseFloat(stationsBetween[i].stoplon);
    from = turf.point([from_lon, from_lat]);
    // console.log(from);

    to_lat = parseFloat(stationsBetween[i + 1].stoplat);
    to_lon = parseFloat(stationsBetween[i + 1].stoplon);
    to = turf.point([to_lon, to_lat]);

    distance = distance + turf.distance(from, to);
  }
}
console.log(getDistance());
