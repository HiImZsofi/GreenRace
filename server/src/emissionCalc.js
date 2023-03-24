import { parse } from "path";
import { getDistance } from "./stationsDistance.js";

//*average car emission is 133g/km
//*average emission for buses is 7.44g/km if we distribute it to one person
//*trolley, tram, metro and suburban railway is 0g

//console.log(distance);

//what type of vehicle, route_id, first stop and last stop
export async function getFinalEmission(type, lineId, getOnStop, getOffStop) {
  //average numbers
  const CAR_EMISSION = 133;
  const BUS_EMISSION = 7.44;
  var distance = await getDistance(lineId, getOnStop, getOffStop);
  //only calculating two data if the vehicle type is bus
  if (type == 3) {
    var carEmission = parseInt(distance) * CAR_EMISSION;
    var busEmission = parseInt(distance) * BUS_EMISSION;
    var finalEmission = carEmission - busEmission;
    //console.log(finalEmission);
    return { finalEmission: finalEmission, distance: distance };
  } else {
    var carEmission = parseInt(distance) * CAR_EMISSION;
    return { finalEmission: carEmission, distance: distance };
  }
}
// console.log(
//   await getFinalEmission(
//     "3",
//     "3010",
//     "Kelenföld vasútállomás M",
//     "Bécsi út / Vörösvári út"
//   )
// );
