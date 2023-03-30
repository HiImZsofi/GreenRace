import { getRouteData } from "./queries.js";
import { getLongerRoute } from "./stationsDistance.js";

//First logged route achievement
export async function firstLoggedRouteAchievement(user_id) {
	//*Achievement ID: 1
	var getUserLoggedRoutes = await getRouteData(user_id).catch((err) => {
		//returns false for completion if the number of routes logged is 0
		return { completed: false };
	});
	if (getUserLoggedRoutes.length > 1) {
		//returns true for completion if the number of routes logged is 0
		return { completed: true, progress: 100 };
	} else {
		//returns false for completion if the number of routes logged is 0
		return { completed: false, progress: 0 };
	}
}

//At least 3 kilometers of travel logged
export async function atLeastThreeKilometersLoggedAchievement(user_id) {
	//*Achievement ID: 3
	let getUserLoggedRoutes = await getRouteData(user_id).catch((err) => {
		return { completed: false };
	});

	//The sum of the distance travelled based on the logged routes
	let sum = 0;
	getUserLoggedRoutes.forEach((element) => {
		sum += element.length;
	});

	//Return true with a 100% progess if the sum is more than 3 kms
	//Return false if the sum is less than 3
	//and also calculate the current progress if the latter is true
	return sum >= 3
		? { completed: true, progress: 100 }
		: { completed: false, progress: (sum / 3.0) * 100 };
}

//Is awarded when the user has logged routes with at least 3 different vehicle types
export async function atLeastThreeDifferentTypesTravelledOn(user_id) {
	//*Achievement ID: 4
	const getUserLoggedRoutes = await getRouteData(user_id);

	//Calculate the number of different types logged
	//The size contains the count of the types of transport
	const types = getUserLoggedRoutes.reduce((types, obj) => {
		types.add(obj.route_type);
		return types;
	}, new Set());

	//If the size is 3 or more then it returns true for the completed key's value
	//If it is less than that then returns false with the current progress
	return types.size >= 3
		? { completed: true, progress: 100 }
		: { completed: false, progress: (types.size / 3) * 100 };
}

//Is awarded when the user logs a route where the travelled distance is at least 10 kms
export async function atLeastTenKilometersInOneLog(user_id) {
	//*Achievement ID: 7
	const getUserLoggedRoutes = await getRouteData(user_id).catch((err) => {
		return { completed: false };
	});

	//Sets the initial status for the completion which is false
	let completedStatus = { completed: false, progress: 0 };

	getUserLoggedRoutes.forEach((route) => {
		if (route.length >= 10) {
			//Sets the completion status to true if the route l
			completedStatus = { completed: true, progress: 100 };
		}
	});
	return completedStatus;
}

//?Maybe turn it into one function with 3kms travelled function
//Awarded when the user's sum of logged routes totals up to 50 or more
export async function travelFiftyKilometers(user_id) {
	//*Achievement ID: 9

	const getUserLoggedRoutes = await getRouteData(user_id).catch((err) => {
		return { completed: false };
	});

	let sum = 0;

	getUserLoggedRoutes.forEach((route) => {
		sum += route.length;
	});

	//If true the return true for the value of the completed key
	//If not then return false with the current progress
	return sum >= 50
		? { completed: true, progress: 100 }
		: { completed: false, progress: (sum / 50) * 100 };
}

//Is awarded when the user logged a route where they went from one end of line 19 to the other
export async function kingOfTheBudaRiverBank(user_id) {
	//*Achievement ID: 10

	const getUserLoggedRoutes = await getRouteData(user_id).catch((err) => {
		return { completed: false };
	});

	let getStops;

	for (let i = 0; i < getUserLoggedRoutes.length; i++) {
		//Get all of the stops for the current line id
		getStops = await getLongerRoute(getUserLoggedRoutes[i].route_id);

		//Check if the current line is the line 19
		if (getUserLoggedRoutes[i].route_id === "3190") {
			//Check if the logged get on and off stops are the two ends of the line
			if (
				(getStops[0].stopname === getUserLoggedRoutes[i].onstop ||
					getStops[0].stopname === getUserLoggedRoutes[i].offstop) &&
				(getStops[getStops.length - 1].stopname ===
					getUserLoggedRoutes[i].onstop ||
					getStops[getStops.length - 1].stopname ===
						getUserLoggedRoutes[i].offstop)
			) {
				return { completed: true, progress: 100 };
			}
		}
	}

	//Return with the value of false for the completed key
	//if no route is found where the user went from one end of line 19 to the other
	return { completed: false, progress: 0 };
}

kingOfTheBudaRiverBank(1);

//?Maybe combine with the kingOfTheBudaRiverBank function with params
//Is awarded when the user logged a route where they went from one end of line 2 to the other
export async function kingOfThePestRiverBank(user_id) {
	//*Achievement ID: 11

	const getUserLoggedRoutes = await getRouteData(user_id).catch((err) => {
		return { completed: false };
	});

	let getStops;

	for (let i = 0; i < getUserLoggedRoutes.length; i++) {
		//Get all of the stops for the current line id
		getStops = await getLongerRoute(getUserLoggedRoutes[i].route_id);

		//Check if the current line is the line 2
		if (getUserLoggedRoutes[i].route_id === "3020") {
			//Check if the logged get on and off stops are the two ends of the line
			if (
				(getStops[0].stopname === getUserLoggedRoutes[i].onstop ||
					getStops[0].stopname === getUserLoggedRoutes[i].offstop) &&
				(getStops[getStops.length - 1].stopname ===
					getUserLoggedRoutes[i].onstop ||
					getStops[getStops.length - 1].stopname ===
						getUserLoggedRoutes[i].offstop)
			) {
				return { completed: true, progress: 100 };
			}
		}
	}

	//Return with the value of false for the completed key
	//if no route is found where the user went from one end of line 19 to the other
	return { completed: false, progress: 0 };
}
