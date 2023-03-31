import { getLongerRoute } from "./stationsDistance.js";
import { setStopNames } from "./userStopsData.js";
import { getRouteData, insertNewAchievement } from "./queries.js";

var routeData;
var completion;

export async function firstLoggedRouteAchievement(user_id) {
  //*Achievement ID: 1
  routeData = await getRouteData(user_id).catch((err) => {
    //returns false for completion if the number of routes logged is 0
    return { completed: false };
  });
  if (routeData.length > 1) {
    //returns true for completion if the number of routes logged is 0
    return {
      name: "Első utad",
      description: "Rögzíts legalább egy utat",
      completed: true,
      progress: 100,
    };
  } else {
    //returns false for completion if the number of routes logged is 0
    return {
      name: "Első utad",
      description: "Rögzíts legalább egy utat",
      completed: false,
      progress: 0,
    };
  }
}

export async function first500gEmission(user_id) {
  //* 2 id
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
    return {
      name: "Zöldfülű",
      description: "Spórolj meg 500g szén-dioxidot. Mindenki elkezdi valahol!",
      completed: true,
      progress: 100,
    };
  }

  //sends back the current completion if achievement is not done yet
  completion = (emissionSum / 500) * 100;
  return {
    name: "Zöldfülű",
    description: "Spórolj meg 500g szén-dioxidot. Mindenki elkezdi valahol!",
    completed: false,
    progress: completion,
  };
}

export async function atLeastThreeKilometersLoggedAchievement(user_id) {
  //*Achievement ID: 3
  let routeData = await getRouteData(user_id).catch((err) => {
    return { completed: false };
  });

  //The sum of the distance travelled based on the logged routes
  let sum = 0;
  routeData.forEach((route) => {
    sum += route.length;
  });

  //Return true with a 100% progess if the sum is more than 3 kms
  //Return false if the sum is less than 3
  //and also calculate the current progress if the latter is true
  return sum >= 3
    ? {
        name: "Három a magyar igazság",
        description: "Utazz több mint 3 kilométert",
        completed: true,
        progress: 100,
      }
    : {
        name: "Három a magyar igazság",
        description: "Utazz több mint 3 kilométert",
        completed: false,
        progress: (sum / 3.0) * 100,
      };
}

export async function atLeastThreeDifferentTypesTravelledOn(user_id) {
  //*Achievement ID: 4
  const routeData = await getRouteData(user_id);

  //Calculate the number of different types logged
  //The size contains the count of the types of transport
  const types = routeData.reduce((types, obj) => {
    types.add(obj.route_type);
    return types;
  }, new Set());

  //If the size is 3 or more then it returns true for the completed key's value
  //If it is less than that then returns false with the current progress
  return types.size >= 3
    ? {
        name: "Változatosság",
        description: "Utazz három különböző fajta járművön",
        completed: true,
        progress: 100,
      }
    : {
        name: "Változatosság",
        description: "Utazz három különböző fajta járművön",
        completed: false,
        progress: (types.size / 3) * 100,
      };
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
    return {
      name: "Környezet tudatos",
      description: "Spórolj meg legalább 2000g szén-dioxidot",
      completed: true,
      progess: 100,
    };
  }
  completion = (emissionSum / 2000) * 100;
  return {
    name: "Környezet tudatos",
    description: "Spórolj meg legalább 2000g szén-dioxidot",
    completed: false,
    progress: completion,
  };
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
    return {
      name: "Kíváncsi",
      description:
        "Rögzíts egy utat az összes járműtípuson (HÉV, busz, troli, stb.)",
      completed: true,
      progess: 100,
    };
  }

  completion = (vehicleTypes.length / 5) * 100;
  return {
    name: "Kíváncsi",
    description:
      "Rögzíts egy utat az összes járműtípuson (HÉV, busz, troli, stb.)",
    completed: false,
    progress: completion,
  };
}

export async function atLeastTenKilometersInOneLog(user_id) {
  //*Achievement ID: 7
  const routeData = await getRouteData(user_id).catch((err) => {
    return { completed: false };
  });

  //Sets the initial status for the completion which is false
  let completedStatus = {
    name: "Kitartó",
    description: "Tegyél meg több mint 10 kilométert egy utazás alatt",
    completed: false,
    progress: 0,
  };

  routeData.forEach((route) => {
    if (route.length >= 10) {
      //Sets the completion status to true if the route l
      completedStatus = {
        name: "Kitartó",
        description: "Tegyél meg több mint 10 kilométert egy utazás alatt",
        completed: true,
        progress: 100,
      };
    }
  });
  return completedStatus;
}

export async function fromOneEndToAnother(user_id) {
  //*8 id
  routeData = await getRouteData(user_id);
  var linestops;

  let completedStatus = {
    name: "Elkötelezett",
    description: "Menj végig bármelyik vonalon végállomástól végállomásig",
    completed: false,
    progress: 0,
  };

  for (let i = 0; i < routeData.length; i++) {
    linestops = await getLongerRoute(routeData[i].route_id);
    for (let j = 0; j < linestops.length; j++) {
      if (
        (linestops[0].stopname === routeData[i].onstop ||
          linestops[0].stopname === routeData[i].offstop) &&
        (linestops[linestops.length - 1].stopname === routeData[i].onstop ||
          linestops[linestops.length - 1].stopname === routeData[i].offstop)
      ) {
        await insertNewAchievement("8", routeData[0].user_id).catch((err) => {
          throw err;
        });
        return {
          name: "Elkötelezett",
          description:
            "Menj végig bármelyik vonalon végállomástól végállomásig",
          completed: true,
          progess: 100,
        };
      }
    }
  }

  return completedStatus;
}

export async function travelFiftyKilometers(user_id) {
  //*Achievement ID: 9

  const routeData = await getRouteData(user_id).catch((err) => {
    return { completed: false };
  });

  let sum = 0;

  routeData.forEach((route) => {
    sum += route.length;
  });

  //If true the return true for the value of the completed key
  //If not then return false with the current progress
  return sum >= 50
    ? {
        name: "Világjáró",
        description: "Gyűjts össze több mint 50 kilométer távolságot",
        completed: true,
        progress: 100,
      }
    : {
        name: "Világjáró",
        description: "Gyűjts össze több mint 50 kilométer távolságot",
        completed: false,
        progress: (sum / 50) * 100,
      };
}

export async function kingOfTheBudaRiverBank(user_id) {
  //*Achievement ID: 10

  const routeData = await getRouteData(user_id).catch((err) => {
    return { completed: false };
  });

  let getStops;

  for (let i = 0; i < routeData.length; i++) {
    //Get all of the stops for the current line id
    getStops = await getLongerRoute(routeData[i].route_id);

    //Check if the current line is the line 19
    if (routeData[i].route_id === "3190") {
      //Check if the logged get on and off stops are the two ends of the line
      if (
        (getStops[0].stopname === routeData[i].onstop ||
          getStops[0].stopname === routeData[i].offstop) &&
        (getStops[getStops.length - 1].stopname === routeData[i].onstop ||
          getStops[getStops.length - 1].stopname === routeData[i].offstop)
      ) {
        return {
          name: "A budai part királya",
          description: "Menj végig a Duna budai oldalán a 19-es villamossal",
          completed: true,
          progress: 100,
        };
      }
    }
  }

  //Return with the value of false for the completed key
  //if no route is found where the user went from one end of line 19 to the other
  return {
    name: "A budai part királya",
    description: "Menj végig a Duna budai oldalán a 19-es villamossal",
    completed: false,
    progress: 0,
  };
}

export async function kingOfThePestRiverBank(user_id) {
  //*Achievement ID: 11

  const routeData = await getRouteData(user_id).catch((err) => {
    return { completed: false };
  });

  let getStops;

  for (let i = 0; i < routeData.length; i++) {
    //Get all of the stops for the current line id
    getStops = await getLongerRoute(routeData[i].route_id);

    //Check if the current line is the line 2
    if (routeData[i].route_id === "3020") {
      //Check if the logged get on and off stops are the two ends of the line
      if (
        (getStops[0].stopname === routeData[i].onstop ||
          getStops[0].stopname === routeData[i].offstop) &&
        (getStops[getStops.length - 1].stopname === routeData[i].onstop ||
          getStops[getStops.length - 1].stopname === routeData[i].offstop)
      ) {
        return {
          name: "A pesti part királya",
          description: "Menj végig a 2-es villamossal a Duna pesti oldalán",
          completed: true,
          progress: 100,
        };
      }
    }
  }

  //Return with the value of false for the completed key
  //if no route is found where the user went from one end of line 19 to the other
  return {
    name: "A pesti part királya",
    description: "Menj végig a 2-es villamossal a Duna pesti oldalán",
    completed: false,
    progress: 0,
  };
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
    return {
      name: "HÉV kedvelő",
      description: "Utazz az összes héven legalább egyszer",
      completed: true,
      progress: 100,
    };
  } else {
    completion = (hevlist.length / 5) * 100;
    return {
      name: "HÉV kedvelő",
      description: "Utazz az összes héven legalább egyszer",
      completed: false,
      progress: completion,
    };
  }
}
