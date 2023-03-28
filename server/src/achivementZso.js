import { getRouteData, insertNewAchievement } from "./queries.js";

var routeData = await getRouteData("1"); //!remove hardcoded string

// console.log(routeData);

export async function first500gEmission() {
  var emissionSum = 0;
  for (let i = 0; i < routeData.length; i++) {
    emissionSum += routeData[i].emission;
  }

  if (emissionSum >= 500) {
    await insertNewAchievement("1", routeData[0].user_id).catch((err) => {
      throw err;
    });
    return { completed: true };
  }
  return { completed: false };
}

console.log(first500gEmission());
