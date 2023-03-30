import { setStopNames } from "./userStopsData.js";
import * as turf from "@turf/turf";

var longerRoute;
var stationIndexes;
var stationsBetween;

//return with the longer array so every station will be included
export async function getLongerRoute(userGivenId) {
  var stopNames = await setStopNames(userGivenId);
  if (stopNames[0].length > stopNames[1].length) {
    return stopNames[0];
  } else if (stopNames[0].length < stopNames[1].length) {
    return stopNames[1];
  } else {
    return stopNames[0];
  }
}

function setStationIndexes(firstStop, secondStop) {
  //get the array index of chosen stations
  for (let index = 0; index < longerRoute.length; index++) {
    if (
      longerRoute[index]["stopname"] == firstStop ||
      longerRoute[index]["stopname"] == secondStop
    ) {
      stationIndexes.push(index);
    }
  }

  //slice up array and only keep stations between the chosen ones
  stationsBetween = longerRoute.slice(stationIndexes[0], stationIndexes[1] + 1);
}

export async function getDistance(userGivenId, firstStop, secondStop) {
  longerRoute = await getLongerRoute(userGivenId);
  stationIndexes = [];
  setStationIndexes(firstStop, secondStop);
  var distance = 0;
  var from_lat;
  var from_lon;
  var from;
  var to_lat;
  var to_lon;
  var to;
  for (let i = 0; i < stationsBetween.length; i++) {
    //return distance variable so the loop wont throw an index out of bounds exception
    if (i + 2 == stationsBetween.length) {
      from_lat = parseFloat(stationsBetween[i].stoplat);
      from_lon = parseFloat(stationsBetween[i].stoplon);
      from = turf.point([from_lon, from_lat]);

      to_lat = parseFloat(stationsBetween[i + 1].stoplat);
      to_lon = parseFloat(stationsBetween[i + 1].stoplon);
      to = turf.point([to_lon, to_lat]);

      distance = distance + turf.distance(from, to);
      return distance;
    }
    //split coordinates into latitude and longitude then parse them
    from_lat = parseFloat(stationsBetween[i].stoplat);
    from_lon = parseFloat(stationsBetween[i].stoplon);
    from = turf.point([from_lon, from_lat]);

    to_lat = parseFloat(stationsBetween[i + 1].stoplat);
    to_lon = parseFloat(stationsBetween[i + 1].stoplon);

    //convert floats into actual coordinates for turf
    to = turf.point([to_lon, to_lat]);

    //summarize distances between stations
    distance = distance + turf.distance(from, to);
  }
}
