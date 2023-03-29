import { getRouteData, insertNewAchievement } from "./queries.js";

var routeData = await getRouteData("1"); //!remove hardcoded string
var completion;

// console.log(routeData);

export async function first500gEmission(user_id) {
  //* 1 id
  var emissionSum = 0;
  for (let i = 0; i < routeData.length; i++) {
    emissionSum += routeData[i].emission;
  }

  if (emissionSum >= 500) {
    await insertNewAchievement(user_id, routeData[0].user_id).catch((err) => {
      throw err;
    });
    return { completed: true, completion: "100" };
  }
  completion = (emissionSum / 500) * 100;
  return { completed: false, completion: completion };
}
