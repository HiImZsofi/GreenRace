import { getRouteData } from "./queries.js";

var routeData = await getRouteData("1"); //!remove hardcoded string

// console.log(routeData);

export function first500gEmission() {
  var emissionSum = 0;
  for (let i = 0; i < routeData.length; i++) {
    emissionSum += routeData[i].emission;
  }

  if (emissionSum >= 500) {
    //TODO insert into achivement table
    return { completed: true };
  }

  return { completed: false };
}
