import { getRouteData, insertNewAchievement } from "./queries.js";
import { setStopNames } from "./userStopsData.js";
import { getLongerRoute } from "./stationsDistance.js";

var routeData;
var completion;

// console.log(routeData);

export async function first500gEmission(user_id) {
  //* 1 id
  routeData = await getRouteData(user_id);
  var emissionSum = 0;

  //sum up the emission of every route the user registered
  for (let i = 0; i < routeData.length; i++) {
    emissionSum += routeData[i].emission;
  }

  if (emissionSum >= 500) {
    await insertNewAchievement("1", routeData[0].user_id).catch((err) => {
      throw err;
    });
    return { completed: true, progress: "100" };
  }

  //sends back the current completion if achievement is not done yet
  completion = (emissionSum / 500) * 100;
  return { completed: false, progress: completion };
}

export async function atLeast2kgEmission(user_id) {
  //*5 id
  routeData = await getRouteData(user_id);
  var emissionSum = 0;

  for (let i = 0; i < routeData.length; i++) {
    emissionSum += routeData[i].emission;
  }

  if (emissionSum >= 2000) {
    await insertNewAchievement("5", routeData[0].user_id).catch((err) => {
      throw err;
    });
    return { completed: true, progess: "100" };
  }
  completion = (emissionSum / 2000) * 100;
  return { completed: false, progress: completion };
}

export async function onceOnEveryVehicleType(user_id) {
  //*6 id
  routeData = await getRouteData(user_id);
  var vehicleTypes = [];

  //push every type of vehicle the user travelled on into array
  for (let i = 0; i < routeData.length; i++) {
    if (!vehicleTypes.includes(routeData[i].route_type)) {
      vehicleTypes.push(routeData[i].route_type);
    }
  }

  //5 is the max number of vehicles
  if (vehicleTypes.length == 5) {
    await insertNewAchievement("6", routeData[0].user_id).catch((err) => {
      throw err;
    });
    return { completed: true, progess: "100" };
  }

  completion = (vehicleTypes.length / 5) * 100;
  return { completed: false, progress: completion };
}

export async function fromOneEndToAnother(user_id) {
  //*8 id
  routeData = await getRouteData(user_id);
  var linestops;

  let completedStatus = { completed: false, progress: "0" };

  for (let i = 0; i < routeData.length; i++) {
    linestops = await getLongerRoute(routeData[i].route_id);
    for (let j = 0; j < linestops.length; j++) {
      if (
        routeData[i].onstop == linestops[0].stopname &&
        routeData[i].offstop == linestops[linestops.length - 1].stopname
      ) {
        await insertNewAchievement("8", routeData[0].user_id).catch((err) => {
          throw err;
        });
        return { completed: true, progess: "100" };
      }
    }
  }

  return completedStatus;
}

export async function suburbanRailwayTraveller(user_id) {
  //*12 id
  routeData = await getRouteData(user_id);
  var hevlist = [];

  for (let i = 0; i < routeData.length; i++) {
    if (routeData[i].route_type === 109) {
      if (!hevlist.includes(routeData[i].route_id)) {
        hevlist.push(routeData[i].route_id);
      }
    }
  }

  if (hevlist.length == 5) {
    return { completed: true, progress: "100" };
  } else {
    completion = (hevlist.length / 5) * 100;
    return { completed: false, progress: completion };
  }
}
