import { setStopNames } from "./userStopsData.js";

//hardcoded user strings until receiving data
var userStop1 = "Mikó utca";
var userStop2 = "Pasaréti tér";

var stopNames = await setStopNames();

//return with the longer array so every station will be included
function getLongerRoute() {
  if (stopNames["stopNames1"].length > stopNames["stopNames2"].length) {
    return stopNames["stopNames1"];
  } else if (stopNames["stopNames1"].length < stopNames["stopNames2"].length) {
    return stopNames["stopNames2"];
  } else {
    return stopNames["stopNames1"];
  }
}

var longerRoute = getLongerRoute();
var stationIndexes = [];

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
//console.log(stationsBetween);
